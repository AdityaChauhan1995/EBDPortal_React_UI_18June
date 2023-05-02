import React, { Component } from 'react';
import { Grid, Segment, Container } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import CompanyInfo from '../../components/company-information/company-info';
import Attachments from '../../components/company-information/attachments';
import AuthorisedSignatory from '../../components/company-information/authorised-signatory';
import { StaticBlock5,StaticBlock8 } from '../../components/common/dumb-component';
import { getCompanyInformation, getUploadedFile,getUploadedFileERF } from '../../redux/actions/configuration';
import { connect } from 'react-redux';
import { PleaseWait } from '../../components/common/dimmer';
import { isChangedToSuccess } from '../../helpers/utils';
class CompanyInformation extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/address-contact-details?mode=View",
			mode:'Approval',
			downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
			},
			showDimmer: false,
			validationResult: {
			  status: 'SUCCESS',
			  message: '',
			},
		};
	}

	componentWillReceiveProps(nextProps) {


		if (this.props.GET_UPLOADED_FILE_STATUS !== 'SUCCESS' &&
			nextProps.GET_UPLOADED_FILE_STATUS === 'SUCCESS') {
			const url = window.URL.createObjectURL(new Blob([nextProps.regDoc]))
			this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } }, () => this.state.downloadedFile.ref.current.click());

		}

	}
	next = () => {

			let tempNextURL=this.state.nextUrl;
			tempNextURL+="&action=approved&easMasterRegId="+this.props.easMasterRegId;
			this.props.history.push(tempNextURL);


	}
	previous = () => {
		this.props.history.goBack();
	}


	downloadFile(item) {
		let docAlreadyExists='Yes';
		let { downloadedFile } = this.state
		let newDownloadedFile = {
			...downloadedFile,
			fileName: item.fileName
		}
		this.setState({ downloadedFile: newDownloadedFile })
		if(this.props.registrationDetails.externalOrderId === null){
			this.props.getUploadedFile(this.props.easMasterRegId, item.sNo, item.documentCode, docAlreadyExists)
		}else{
			this.props.getUploadedFileERF(item.filePath)
		}}
	render() {
		let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName,totalMembers,totalMemberString, maxLineCount,prodCatName,groupName}=this.props.registrationDetails;
		let { portalCustInfo, authorizedSignatory, brnInfo, documentUploadItems }=this.props;

		let {   mode,  showDimmer } = this.state;
		return (
			<Container fluid style={{ padding: 0, margin: 0 }}>
	         	<PleaseWait active={showDimmer} />
				<Navigation index={2} group={groupName}/>
				<Segment basic style={{ padding: 0, paddingTop: 15, paddingLeft: 10, flex: 1 }}>
					<Grid>
						{groupName!='MAXIS' &&
							<StaticBlock5 custBrnNo={custBrnNo} companyName={brnInfo.portalCustInfo.companyName} masterRegId={masterRegId}
						 		virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={totalMemberString}
						 		maxLineCount={maxLineCount}  contactMode={contactMode} masterRegStatus={masterRegStatus} prodCatName={prodCatName} />
					 }
					 {groupName==='MAXIS' &&
					 		<StaticBlock8 custBrnNo={custBrnNo} companyName={brnInfo.portalCustInfo.companyName} masterRegId={masterRegId}
								masterRegStatus={masterRegStatus} prodCatName={prodCatName} />
							}
					</Grid>
					<CompanyInfo companyInfo={portalCustInfo}/>

					<AuthorisedSignatory authorizeredSignatory={authorizedSignatory} />

					<Segment basic style={{ padding: 0, paddingBottom: 10, paddingTop: 15 }}>
						<label className='heading' style={{ color: '#293895' }}>Documents Attached</label>
					</Segment>
					<Attachments mode={mode} attachments={documentUploadItems}  downloadFile={this.downloadFile.bind(this)}/>
					<a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
				</Segment>

				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
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
		registrationDetails: state.order.data.registrationDetails,
		portalCustInfo: state.order.data.brnInfo.portalCustInfo,
		brnInfo: state.order.data.brnInfo,
		documentUploadItems: state.order.data.registrationDetails.brnInfo.documentUploadItems,
		authorizedSignatory: state.order.data.registrationDetails.brnInfo.authorizedSignatory,
		GET_UPLOADED_FILE_STATUS: state.configuration.meta.GET_UPLOADED_FILE_STATUS,
		easMasterRegId:state.order.data.easMasterRegId,
		regDoc: state.configuration.data.regDoc
	}
}

const mapDispatchToProps = {

	getCompanyInformation,
	getUploadedFile,
	getUploadedFileERF
}

//export default Step3;
export default connect(mapStateToProps, mapDispatchToProps)(CompanyInformation)
