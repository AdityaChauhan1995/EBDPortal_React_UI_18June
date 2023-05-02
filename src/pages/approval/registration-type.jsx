import React, { Component } from 'react';
import { Grid, Checkbox, Segment, Container, Form, Message } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { connect } from 'react-redux';
import { StaticBlock5,StaticBlock8 } from '../../components/common/dumb-component';
import {  getDeviceFundContracts } from '../../redux/actions/configuration';
import {  getRegistrationDetails, getMsisdnDetails,getMsisdnDetailsERF,getMsisdnDetailsOBS } from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';
import { isChangedToSuccess, isChangedToRejected } from '../../helpers/utils';


class RegistrationType extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/company-information?mode=Approval",
			processingUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
			showDimmer: false,
		};
	}
	componentDidMount() {
		this.setState({ showDimmer: true });
		let easMasterRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
		this.props.getRegistrationDetails(easMasterRegId, 'APPROVAL_MODE');
	}
	next = () => {

		//this.props.setApprovalRegistrationDetails(tempRegistrationDetails);
		let easMasterRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
		let tempNextURL = this.state.nextUrl;
		tempNextURL += "&action=approved&easMasterRegId=" + easMasterRegId;
		this.props.history.push(tempNextURL);
	}
	processing = () => {
	/*	let tempRegistrationDetails = this.props.registrationDetails;
		tempRegistrationDetails = { ...tempRegistrationDetails, action: 'processing' }*/
		//this.props.setApprovalRegistrationDetails(tempRegistrationDetails);
		let easMasterRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
		let tempNextURL = this.state.processingUrl;
		tempNextURL += "&action=processing&easMasterRegId=" + easMasterRegId;
		this.props.history.push(tempNextURL);
	}
	componentWillReceiveProps(nextProps) {
		if (isChangedToSuccess(this.props.FETCH_REGISTRATION_DETAILS_STATUS, nextProps.FETCH_REGISTRATION_DETAILS_STATUS)) {
			if(nextProps.registrationDetails.groupName === 'MAXIS'){
				this.props.getMsisdnDetailsERF(nextProps.registrationDetails.masterRegId,'APPROVAL_MODE');
			}else if(nextProps.registrationDetails.groupName ==='Business Postpaid with Fibre Option')
			{
				this.props.getMsisdnDetailsOBS(nextProps.registrationDetails.masterRegId,'APPROVAL_MODE', nextProps.isZerolutionRTF)
			}
			else{
				this.props.getMsisdnDetails(nextProps.registrationDetails.masterRegId,'APPROVAL_MODE');
			}
			this.setState({ showDimmer: true });
			this.props.getDeviceFundContracts(nextProps.registrationDetails.masterRegId, '34');
		}
		else if (isChangedToRejected(this.props.FETCH_REGISTRATION_DETAILS_STATUS, nextProps.FETCH_REGISTRATION_DETAILS_STATUS)) {
			this.setState({ validationResult: { status: 'FAILURE', message: 'Faced some issue in fetching data' } });
		}
		else if(isChangedToSuccess(this.props.FETCH_LINE_DETAILS_STATUS, nextProps.FETCH_LINE_DETAILS_STATUS)){
			this.setState({ showDimmer: false });
	}
	/*	else if (this.props.SET_APPROVAL_REG_TYPE_STATUS !== 'SUCCESS' &&
			nextProps.SET_APPROVAL_REG_TYPE_STATUS === 'SUCCESS' && nextProps.action === 'approved') {
			let tempNextURL = this.state.nextUrl;
			tempNextURL += "&action=approved&easMasterRegId=" + nextProps.easMasterRegId;
			this.props.history.push(tempNextURL);
		}
		else if (this.props.SET_APPROVAL_REG_TYPE_STATUS !== 'SUCCESS' &&
			nextProps.SET_APPROVAL_REG_TYPE_STATUS === 'SUCCESS' && nextProps.action === 'processing') {

		}
		else if (this.props.SET_APPROVAL_REG_TYPE_STATUS !== 'SUCCESS' &&
			nextProps.SET_APPROVAL_REG_TYPE_STATUS === 'SUCCESS' && nextProps.action === 'rejected') {
			let tempNextURL = this.state.processingUrl;
			tempNextURL += "&action=rejected&easMasterRegId=" + nextProps.easMasterRegId;
			this.props.history.push(tempNextURL);
		}*/
	}
	render() {

		let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName,
			maxLineCount, dealerRemarks, bpuRemarks, customerType, dealerName,deposit,
			brnInfo, prodCatName, supportingCenterName, totalMemberString ,advPayment, groupName} = this.props.registrationDetails;

		let { showDimmer } = this.state;

		return (
			<Container fluid>
				<PleaseWait active={showDimmer} />
				<Navigation index={1} group={groupName} />
				<Segment basic style={{ padding: 0, paddingTop: 15, flex: 1 }}>
					<Form size='small'>
						<Grid style={{ paddingLeft: 10 }}>
							{groupName!='MAXIS' &&
								<StaticBlock5
									custBrnNo={custBrnNo}
									companyName={brnInfo.portalCustInfo.companyName}
									masterRegId={masterRegId}
									virtualServiceNo={virtualServiceNo}
									easPackageName={easPackageName}
									totalMemberString={totalMemberString}
									maxLineCount={maxLineCount}
									contactMode={contactMode}
									masterRegStatus={masterRegStatus}
									prodCatName={prodCatName} />
							}
							{groupName==='MAXIS' &&
 						 		<StaticBlock8
 							 	custBrnNo={custBrnNo}
 							 	companyName={brnInfo.portalCustInfo.companyName}
 							 	masterRegId={masterRegId}
 								masterRegStatus={masterRegStatus}
 								prodCatName={prodCatName} />
 							}
							<Grid.Row style={{ padding: 0, paddingTop: 30 }}>
								<Grid.Column width={4} >
									<label className='heading'>Type Of Customer:</label>
								</Grid.Column>
								<Grid.Column width={12} textAlign='left'>
									<label>{customerType}</label>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ padding: 0 }}>
								<Grid.Column width={4} >
									<label className='heading'>Dealer Name:</label>
								</Grid.Column>
								<Grid.Column width={12} textAlign='left'>
									<label>{dealerName}</label>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ padding: 0 }}>
								<Grid.Column width={4} >
									<label className='heading'>Bpu Remarks</label>
								</Grid.Column>
								<Grid.Column width={12} textAlign='left'>
									<label>{bpuRemarks}</label>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ padding: 0 }}>
								<Grid.Column width={4} >
									<label className='heading'>Dealer Remarks</label>
								</Grid.Column>
								<Grid.Column width={12} textAlign='left' className='dangerText'>
									<label>{dealerRemarks}</label>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ padding: 0 }}>
								<Grid.Column width={4} >
									<label className='heading'>Supporting centre</label>
								</Grid.Column>
								<Grid.Column width={12} textAlign='left'>
									<label>{supportingCenterName}</label>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ padding: 0, paddingTop: 30 }}>
								<Grid.Column width={16}>
									<Checkbox label={<label style={{ fontSize: 12 }}>Foreigner Company Deposit</label>} name='companyDeposit' checked={deposit === 'on'} />
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ paddingTop: 5 }}>
								<Grid.Column width={16}>
									<Checkbox label={<label style={{ fontSize: 12 }}>Plan Advance Payment</label>} name='advancePayment' checked={advPayment === 'on'} />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
						<PrimaryButton value='NEXT' onClick={this.next} />
						<div style={{ padding: 20 }} />
						<SecondaryButton value='PROCESSING' onClick={this.processing} />
				</Segment>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		registrationDetails: state.order.data.registrationDetails,
		easMasterRegId: state.order.data.easMasterRegId,
		action: state.order.data.action,
		FETCH_REGISTRATION_DETAILS_STATUS: state.order.meta.FETCH_REGISTRATION_DETAILS_STATUS,
		SET_APPROVAL_REG_TYPE_STATUS: state.order.meta.SET_APPROVAL_REG_TYPE_STATUS,
		FETCH_LINE_DETAILS_STATUS:state.order.meta.FETCH_LINE_DETAILS_STATUS,
		isZerolutionRTF: state.order.data.isZerolutionRTF
	}
}

const mapDispatchToProps = {
	getRegistrationDetails,
	/*setApprovalRegistrationDetails,*/
	getMsisdnDetails,
	getDeviceFundContracts,
	getMsisdnDetailsERF,
	getMsisdnDetailsOBS
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationType)
