import React, { Component } from 'react';
import { Grid, Segment, Container, Message } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import CompanyInfo from '../../components/company-information/company-info';
import Attachments from '../../components/company-information/attachments';
import AuthorisedSignatory from '../../components/company-information/authorised-signatory';
import { StaticBlock5, StaticBlock8 } from '../../components/common/dumb-component';
import { getCompanyInformation, getUploadedFile, sendFile, getUploadedFileERF } from '../../redux/actions/configuration';
import { setCompanyInformation, setCompanyInformationPrev } from '../../redux/actions/order';
import { connect } from 'react-redux';
import { PleaseWait, FileUploadWait } from '../../components/common/dimmer';
import { isChangedToSuccess } from '../../helpers/utils';
class CompanyInformation extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/address-contact-details?mode=Resubmission",
			mode: 'Resubmission',
			documentUploadItems: props.documentUploadItems
				.map(item => {
					return {
						...item,
						ref: React.createRef()
					}
				}),
			downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
			},
			showDimmer: false,
			showerror: false,
			message: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log(this.state.documentUploadItems,
			this.props.SET_COMPANY_INFORMATION_STATUS,
			nextProps.SET_COMPANY_INFORMATION_STATUS)
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
		else if (this.props.SET_COMPANY_INFORMATION_STATUS !== 'SUCCESS' &&
			nextProps.SET_COMPANY_INFORMATION_STATUS === 'SUCCESS') {
			let tempNextURL = this.state.nextUrl;
			tempNextURL += "&action=rejected&easMasterRegId=" + this.props.easMasterRegId;
			this.props.history.push(tempNextURL);
		}
		else if (this.props.SET_COMPANY_INFORMATION_PREV_STATUS !== 'SUCCESS' &&
			nextProps.SET_COMPANY_INFORMATION_PREV_STATUS === 'SUCCESS') {
			this.props.history.goBack();
		}
	}

	next = () => {
		let tempCrpLineCount = 0;
		this.props.msisdnList.map((x) => {
			if (x.regType === 'Change Subscription' || x.regType === 'Group Level Add-On' || x.regType === 'Member Level Add-VAS') {
				tempCrpLineCount = tempCrpLineCount + 1;
			}
		});

		if (this.props.registrationDetails.prodCatName === 'Existing Group' || this.props.registrationDetails.prodCatName === 'Existing Group- Add VAS') {
			if (this.props.SET_COMPANY_INFORMATION_STATUS === 'DEFAULT') {
				this.props.setCompanyInformation(this.state.documentUploadItems,
					this.props.lineCount - this.props.msisdnList.length + tempCrpLineCount, tempCrpLineCount);
			} else {
				this.props.setCompanyInformation(this.state.documentUploadItems,
					this.props.lineCount, this.props.crpLineCount);
			}
		}
		else if (this.props.registrationDetails.prodCatName === 'New Group') {
			this.props.setCompanyInformation(this.state.documentUploadItems, 0, 0);
		}
		else{
			this.props.setCompanyInformation(this.state.documentUploadItems,this.props.lineCount,tempCrpLineCount);
		}


	}
	previous = () => {
		this.props.setCompanyInformationPrev(this.state.documentUploadItems,
			this.props.lineCount, this.props.crpLineCount);

	}

	selectFile(selectedItems, file) {
		if (file.name !== null && file.name !== undefined && file.name.length > 30) {
			this.setState({ showerror: true, message: 'File name cannot be greater than 30 characters' });
			return;
		}
		this.setState({ showFileDimmer: true });
		if (selectedItems.compulsory) {
			this.setState({ showerror: false })
		}
		console.log(selectedItems.regId, this.props.easMasterRegId, selectedItems.regId === this.props.easMasterRegId)
		const { documentUploadItems } = this.state;
		let data = new FormData()
		data.append('file', file)
		data.append('fileName', file.name)
		data.append('filesize', file.size)
		if (selectedItems.regId === parseInt(this.props.easMasterRegId)) {
			data.append('tempUploadRegId', null)
		} else {
			if (selectedItems.regId !== 0 && selectedItems.regId !== 1) {
				data.append('tempUploadRegId', selectedItems.regId)
			}
			else {
				data.append('tempUploadRegId', null)
			}
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
		let docAlreadyExists = 'No';
		if (item.regId === parseInt(this.props.registrationDetails.masterRegId)) {
			docAlreadyExists = 'Yes'
		}
		let { downloadedFile } = this.state
		let newDownloadedFile = {
			...downloadedFile,
			fileName: item.fileName
		}
		this.setState({ downloadedFile: newDownloadedFile })
		console.log(item.regId, parseInt(this.props.registrationDetails.masterRegId), item.regId !== parseInt(this.props.registrationDetails.masterRegId));
		if (this.props.registrationDetails.externalOrderId === null || item.regId !== parseInt(this.props.registrationDetails.masterRegId)) {
			this.props.getUploadedFile(item.regId, item.sNo, item.documentCode, docAlreadyExists)
		} else {
			this.props.getUploadedFileERF(item.filePath)
		}
	}

	render() {
		let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName, totalMembers, totalMemberString, maxLineCount, prodCatName, groupName, lineCount } = this.props.registrationDetails;
		let { portalCustInfo, authorizedSignatory, brnInfo } = this.props;

		let { mode, showDimmer, documentUploadItems, showFileDimmer, showerror, message } = this.state;
		return (
			<Container fluid style={{ padding: 0, margin: 0 }}>
				<PleaseWait active={showDimmer} />
				<FileUploadWait active={showFileDimmer} />
				<Navigation index={2} group={groupName} />
				<Segment basic style={{ padding: 0, paddingTop: 15, paddingLeft: 10, flex: 1 }}>
					<Grid>
						{groupName != 'MAXIS' &&
							<StaticBlock5
								custBrnNo={custBrnNo}
								companyName={brnInfo.portalCustInfo.companyName}
								masterRegId={masterRegId}
								virtualServiceNo={virtualServiceNo}
								easPackageName={easPackageName}
								totalMembers={totalMembers}
								totalMemberString={totalMemberString}
								maxLineCount={maxLineCount}
								lineCount={lineCount}
								contactMode={contactMode}
								masterRegStatus={masterRegStatus}
								prodCatName={prodCatName} />
						}
						{groupName === 'MAXIS' &&
							<StaticBlock8
								custBrnNo={custBrnNo}
								companyName={brnInfo.portalCustInfo.companyName}
								masterRegId={masterRegId}
								masterRegStatus={masterRegStatus}
								prodCatName={prodCatName} />
						}
					</Grid>
					<CompanyInfo companyInfo={portalCustInfo} />

					<AuthorisedSignatory authorizeredSignatory={authorizedSignatory} />

					<Segment basic style={{ padding: 0, paddingBottom: 10, paddingTop: 15 }}>
						<label className='heading' style={{ color: '#293895' }}>Documents Attached</label>
					</Segment>
					<Attachments mode={mode} attachments={documentUploadItems} selectFile={this.selectFile.bind(this)} downloadFile={this.downloadFile.bind(this)} />
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
		);
	}
}
const mapStateToProps = (state) => {

	return {
		registrationDetails: state.order.data.registrationDetails,
		portalCustInfo: state.order.data.registrationDetails.brnInfo.portalCustInfo,
		brnInfo: state.order.data.registrationDetails.brnInfo,
		documentUploadItems: state.order.data.registrationDetails.brnInfo.documentUploadItems,
		authorizedSignatory: state.order.data.registrationDetails.brnInfo.authorizedSignatory,
		GET_UPLOADED_FILE_STATUS: state.configuration.meta.GET_UPLOADED_FILE_STATUS,
		easMasterRegId: state.order.data.easMasterRegId,
		regDoc: state.configuration.data.regDoc,
		SEND_FILE_STATUS: state.configuration.meta.SEND_FILE_STATUS,
		uploadedDocDetails: state.configuration.data.uploadedDocDetails,
		SET_COMPANY_INFORMATION_STATUS: state.order.meta.SET_COMPANY_INFORMATION_STATUS,
		lineCount: state.order.data.registrationDetails.lineCount,
		msisdnList: state.order.data.msisdnList,
		SET_PRODUCT_ORDER_PREVIOUS_STATUS: state.order.meta.SET_PRODUCT_ORDER_PREVIOUS_STATUS,
		crpLineCount: state.order.data.crpLineCount,
		todos: state.order.data.todos,
		SET_COMPANY_INFORMATION_PREV_STATUS: state.order.meta.SET_COMPANY_INFORMATION_PREV_STATUS
	}
}

const mapDispatchToProps = {
	getCompanyInformation,
	getUploadedFile,
	sendFile,
	setCompanyInformation,
	setCompanyInformationPrev,
	getUploadedFileERF
}


export default connect(mapStateToProps, mapDispatchToProps)(CompanyInformation)
