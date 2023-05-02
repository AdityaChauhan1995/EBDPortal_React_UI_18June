import React, { Component } from 'react';
import { Grid, Segment, Container, Message,} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { PleaseWait ,FileUploadWait} from '../../components/common/dimmer';
import CompanyInfo from '../../components/company-information/company-info';
import Attachments from '../../components/company-information/attachments';
import AuthorisedSignatory from '../../components/company-information/authorised-signatory';
import { StaticBlock1,  StaticBlock7} from '../../components/common/dumb-component';

import { sendFile, getUploadedFile } from '../../redux/actions/configuration';
import { connect } from 'react-redux';

class CompanyInformation extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/address-contact-details",
			// only get the documents apart from CMSS document
			documentUploadItems: props.documentUploadItems
				.filter(function (doc) { return doc.documentCode !== process.env.REACT_APP_CMSS_DOC_CODE })
				.map(item => {
					return {
						...item,
						ref: React.createRef()
					}
				}),
			showerror: false,
			message: 'Missing required attributes.',
			authorizeSignatoryDealer: {
				authName: "Confidential",
				authIcNo: "Confidential",
				authFixedNo: "Confidential",
				authFaxNo: "Confidential",
				authMobileNo: "Confidential",
				authEmail: "Confidential"
			},
			masterRegId : "New - Not Available Yet",
			downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
			},
			showDimmer: false,
		};
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.SEND_FILE_STATUS !== 'SUCCESS' &&
			nextProps.SEND_FILE_STATUS === 'SUCCESS') {
			let { documentUploadItems } = this.state
			this.setState({
				documentUploadItems: documentUploadItems.map(item => {
					if (item.documentDesc === nextProps.uploadedDocDetails.tempDocumentDesc) {
						return {
							...item,
							regId: nextProps.uploadedDocDetails.documentRegId,

						}
							;
					}
					return item
				}),
				showFileDimmer: false,
			});

		}
		else if (this.props.GET_UPLOADED_FILE_STATUS !== 'SUCCESS' &&
			nextProps.GET_UPLOADED_FILE_STATUS === 'SUCCESS') {
			const url = window.URL.createObjectURL(new Blob([nextProps.regDoc]))
			this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } }, () => this.state.downloadedFile.ref.current.click());

		}
	}
	next = () => {
		let{documentUploadItems} = this.props;
		let addedumRegId = null;
		documentUploadItems.map(item => {
					if (item.documentDesc === 'Addendum') {
						addedumRegId = 	item.regId
					}
				})
		if (addedumRegId !== null) {
			this.props.history.push(this.state.nextUrl);
		} else {
			this.setState({ showerror: true })
		}
	}
	previous = () => {
		this.props.history.goBack();
	}

	selectFile(selectedItems, file) {
		if(file.name!==null && file.name!==undefined && file.name.length>30){
			this.setState({showerror:true,message:'File name cannot be greater than 30 characters'});
			return;
		}
		if(file.size!==null && file.size!==undefined && file.size>5242880){
			this.setState({showerror:true,message:'File size cannot be greater than 5 MB'});
			return;
		}
		this.setState({ showFileDimmer: true });
		if (selectedItems.compulsory ) {
			this.setState({ showerror: false })
		}
		const { documentUploadItems } = this.state;
		let data = new FormData()
		data.append('file', file)
		data.append('fileName', file.name)
		data.append('filesize', file.size)
		if (selectedItems.regId !== 0 && selectedItems.regId !== 1) {
			data.append('tempUploadRegId', selectedItems.regId)
		}
		else {
			data.append('tempUploadRegId', null)
		}
		data.append('documentdesc', selectedItems.documentDesc)
		data.append('documentCode', selectedItems.documentCode)
		data.append('documentSourceInd', selectedItems.sourceInd)
		data.append('documentType', selectedItems.documentType)
		data.append('sNo', selectedItems.sNo)
		this.props.sendFile(data);
		this.setState({
			documentUploadItems: documentUploadItems.map(item => {
				if (item.documentDesc === selectedItems.documentDesc) {
					return {
						...item,
						fileName: file.name,
						file: file
					}
				}

				return item
			})
		});
	}
	downloadFile(item) {
		let docAlreadyExists = 'No'

		let { downloadedFile } = this.state
		let newDownloadedFile = {
			...downloadedFile,
			fileName: item.fileName
		}
		this.setState({ downloadedFile: newDownloadedFile })
		this.props.getUploadedFile(item.regId, item.sNo, item.documentCode, docAlreadyExists)
	}

	render() {

		let { documentUploadItems, showerror, message, authorizeSignatoryDealer, showDimmer , showFileDimmer,masterRegId} = this.state;

		let { portalCustInfo, userRole, brn, orderCategory, selectedVSN, mode ,bundleType,authorizedSignatory} = this.props;
		return (
			<Container fluid style={{ padding: 0, margin: 0 }}>
				<PleaseWait active={showDimmer} />
				<FileUploadWait active={showFileDimmer}/>
				<Navigation index={2} group={bundleType} />
				<Segment basic style={{ padding: 0, paddingTop: 15, paddingLeft: 10 }}>
					<Grid style={{ paddingLeft: 15 }}>
					{bundleType !='MAXIS' &&
						<StaticBlock1 brn={brn} orderCategory={orderCategory} selectedVSN={selectedVSN} companyName={portalCustInfo.companyName} />
					}
					{bundleType==='MAXIS' &&
					<StaticBlock7 brn={brn} orderCategory={orderCategory} masterRegId={masterRegId} companyName={portalCustInfo.companyName} />
					}
					</Grid>
					<CompanyInfo companyInfo={portalCustInfo} />
					{userRole === 'Dealer' &&
						<AuthorisedSignatory authorizeredSignatory={authorizeSignatoryDealer} />
					}
					{bundleType==='MAXIS' &&
						<AuthorisedSignatory authorizeredSignatory={authorizedSignatory} />
					}
					<Segment basic style={{ padding: 0, paddingBottom: 10, paddingTop: 20 }}>
						<label className='heading'>Documents Attached</label>
					</Segment>
					<Attachments mode={mode} attachments={documentUploadItems} selectFile={this.selectFile.bind(this)} downloadFile={this.downloadFile.bind(this)} showerror={showerror} />
					<a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
					{
						(showerror) &&
						<Message negative compact size='small' style={{ minWidth: 400, marginTop: 20 }}
							onDismiss={() => this.setState({ showerror: false })}>
							<Message.Header>We have encounted an error.</Message.Header>
							<p>{message}</p>
						</Message>
					}
				</Segment>

				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<SecondaryButton value='BACK' onClick={this.previous} />
					<div style={{ padding: 20 }} />
					<PrimaryButton value='NEXT' onClick={this.next} />
				</Segment>
			</Container>
		)
	}
}
const mapStateToProps = (state) => {

	return {
		mode: 'submission',
		userRole: state.user.data.userRole,
		brn: state.order.data.brn,
		orderCategory: state.order.data.orderCategory,
		selectedVSN: state.order.data.selectedVSN,
		portalCustInfo: state.order.data.brnInfo.portalCustInfo,
		documentUploadItems: state.order.data.brnInfo.documentUploadItems,
		authorizedSignatory: state.order.data.brnInfo.authorizedSignatory,
		uploadedDocDetails: state.configuration.data.uploadedDocDetails,
		regDoc: state.configuration.data.regDoc,
		bundleType: state.order.data.bundleType,
		SEND_FILE_STATUS: state.configuration.meta.SEND_FILE_STATUS,
		GET_UPLOADED_FILE_STATUS: state.configuration.meta.GET_UPLOADED_FILE_STATUS,
		SET_COMPANY_INFO_STATUS: state.order.meta.SET_COMPANY_INFO_STATUS,
	}
}

const mapDispatchToProps = {

	sendFile,
	getUploadedFile
}

//export default Step3;
export default connect(mapStateToProps, mapDispatchToProps)(CompanyInformation)
