import React, { Component } from 'react';
import { Grid, Label, Input, Button, Checkbox, Segment, Container, Dimmer, Icon, Header,Form,Message} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { connect } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock9,DynamicHeader123,StaticBlock5,StaticBlock8 } from '../../components/common/dumb-component';
import {  getDeviceFundContracts,getPostCodes,getAccountManagerDetails,getVSNDetails,
			getSupportingCenter, getEASConfigurationData, getExistingShareableLineCount} from '../../redux/actions/configuration';
import {  getRegistrationDetails, getMsisdnDetails,getMsisdnDetailsERF,setResubmissionRegistrationInfo,getMsisdnDetailsOBS} from '../../redux/actions/order';
import { isChangedToSuccess, isChangedToRejected } from '../../helpers/utils';
import { PleaseWait } from '../../components/common/dimmer';

 class RegistrationType extends Component {
	constructor(props) {
	  super(props);
	  const { url } = this.props.match;	
	  this.state={
		nextUrl: url.substring(0, url.lastIndexOf("/")) + "/company-information?mode=Resubmission",
		showDimmer: false,
			deposit :props.registrationDetails.deposit,
			advPayment : props.registrationDetails.advPayment,
			changeSubsriptionCount:0,
	
		validationResult: {
			status: 'SUCCESS',
			message: '',
		  }
	  }
	}

	componentDidMount() {
		if(this.props.FETCH_REGISTRATION_DETAILS_STATUS !== 'SUCCESS')
		{
		let easMasterRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
		if(this.props.SET_RESUBMISSION_REGISTRATION_INFO_STATUS !== 'SUCCESS'){
		this.setState({showDimmer:true});
		this.props.getRegistrationDetails(easMasterRegId, 'RESUBMISSION_MODE');
			this.props.getPostCodes()
		}
	  }
	 this.props.getEASConfigurationData();
		
	}
	componentWillReceiveProps(nextProps)
	{
		if (isChangedToSuccess(this.props.FETCH_REGISTRATION_DETAILS_STATUS, nextProps.FETCH_REGISTRATION_DETAILS_STATUS) ) 
		{
			if( this.props.SET_COMPANY_INFORMATION_STATUS !== 'SUCCESS'){
				//this.props.getMsisdnDetails(nextProps.registrationDetails.masterRegId,'RESUBMISSION_MODE');
				if(nextProps.registrationDetails.groupName === 'MAXIS'){
					this.props.getMsisdnDetailsERF(nextProps.registrationDetails.masterRegId,'RESUBMISSION_MODE');
				}else if(nextProps.registrationDetails.groupName === 'Business Postpaid with Fibre Option')
			
				{
                    this.props.getMsisdnDetailsOBS(nextProps.registrationDetails.masterRegId,'RESUBMISSION_MODE', nextProps.isZerolutionRTF);
                    if(nextProps.registrationDetails.virtualServiceNo !== null && nextProps.registrationDetails.virtualServiceNo  !== 'New - Not Available Yet'){
                    	this.props.getExistingShareableLineCount(nextProps.registrationDetails.virtualServiceNo);
                    }
				}
				else{
					this.props.getMsisdnDetails(nextProps.registrationDetails.masterRegId,'RESUBMISSION_MODE');
				}
				this.setState({ showDimmer: true });
				this.props.getDeviceFundContracts(nextProps.registrationDetails.masterRegId, '34');
				this.props.getAccountManagerDetails();
				this.props.getSupportingCenter();
			}
			let {deposit,advPayment} = nextProps.registrationDetails;
			if(deposit === 'on'){this.setState({ deposit: true })};
			if(deposit === 'off'){this.setState({ deposit: false })};
			if(advPayment === 'on'){this.setState({ advPayment: true })};
			if(advPayment === 'off'){this.setState({ advPayment: false })};
		}
		else if (isChangedToRejected(this.props.FETCH_REGISTRATION_DETAILS_STATUS, nextProps.FETCH_REGISTRATION_DETAILS_STATUS)) {
			this.setState({ validationResult: { status: 'FAILURE', message: 'Faced some issue in fetching data' } });
		}else if(isChangedToSuccess(this.props.SET_RESUBMISSION_REGISTRATION_INFO_STATUS, nextProps.SET_RESUBMISSION_REGISTRATION_INFO_STATUS)){
			let easMasterRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
			let tempNextURL = this.state.nextUrl;
			tempNextURL += "&action=rejected&easMasterRegId=" + easMasterRegId;
			this.props.history.push(tempNextURL);
		}else if(isChangedToSuccess(this.props.FETCH_LINE_DETAILS_STATUS, nextProps.FETCH_LINE_DETAILS_STATUS)){
			this.setState({ showDimmer: false });
	}
}

	handleChange = (e, { type, name, value }) => {
		if(value === 'on'){
			this.setState({ [name] : true});
		}
		if (value === 'off'){
			this.setState({ [name] : false});
		}
		this.setState((prevState) => {
			return { [name]: !prevState[name] };
		  });
	}

    next = () =>{
		let easMasterRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
		let tempNextURL = this.state.nextUrl;
		tempNextURL += "&action=rejected&easMasterRegId=" + easMasterRegId;
		if(this.props.registrationDetails.groupName === 'MAXIS'){
			this.props.history.push(tempNextURL);
		}
		else{	
		this.props.setResubmissionRegistrationInfo(this.state.deposit,this.state.advPayment);
		}
	}
	render() {
		let { custBrnNo, brnInfo,masterRegId,masterRegStatus,groupName,
			customerType,dealerRemarks,bpuRemarks,dealerName,deposit,advPayment,lineCount,
			supportingCenterName,virtualServiceNo,easPackageName,totalMembers,totalMemberString,
		    maxLineCount,contactMode,prodCatName } = this.props.registrationDetails;
		let {showDimmer}=this.state;	
		let { status, message } = this.state.validationResult;
		return (
			<Container fluid >
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
							 totalMembers={totalMembers}
							 totalMemberString={totalMemberString}
							 maxLineCount={maxLineCount}
								lineCount={lineCount}
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
				 {groupName==='MAXIS' &&	
				 	<React.Fragment>
					<Grid.Row style={{ padding: 0, paddingTop: 30 }}>
						<Grid.Column width={16}>
							<Checkbox disabled label={<label style={{ fontSize: 12 }}>Advance Payment</label>} name='advancePayment'
							          checked={advPayment=='on'?true:false} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ paddingTop: 5 }}>
						<Grid.Column width={16}>
							<Checkbox disabled label={<label style={{ fontSize: 12 }}>Deposit</label>} name='companyDeposit' checked={deposit}
							checked={deposit=='on'?true:false} />
						</Grid.Column>
					</Grid.Row>
					</React.Fragment>}
					
					 {groupName!=='MAXIS' &&	
				 	<React.Fragment>
				<Grid.Row style={{ padding: 0, paddingTop: 30 }}>
								<Grid.Column width={16}>
									<Checkbox label={<label style={{ fontSize: 12 }}>Foreigner Company Deposit</label>} name='deposit' onChange={this.handleChange} checked={deposit} />
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ paddingTop: 5 }}>
								<Grid.Column width={16}>
									<Checkbox label={<label style={{ fontSize: 12 }}>Plan Advance Payment</label>} name='advPayment'  onChange={this.handleChange} checked={advPayment} />
								</Grid.Column>
							</Grid.Row>
					</React.Fragment>}
				</Grid>
			</Form>
					{
					  (status === 'FAILURE') &&
					  <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
					    onDismiss={() => this.setState({ validationResult: {} })}>
					    <Message.Header>We have encounted some errors.</Message.Header>
					    <p>{message}</p>
					  </Message>
					}
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				{/* <SecondaryButton value='Previous' onClick={this.prev}/>
						<div style={{ padding: 20 }} /> */}
						<PrimaryButton value='NEXT' onClick={this.next}/>
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
		SET_COMPANY_INFORMATION_STATUS:state.order.meta.SET_COMPANY_INFORMATION_STATUS,
		SET_RESUBMISSION_REGISTRATION_INFO_STATUS:state.order.meta.SET_RESUBMISSION_REGISTRATION_INFO_STATUS,
		FETCH_LINE_DETAILS_STATUS:state.order.meta.FETCH_LINE_DETAILS_STATUS,
		msisdnList:state.order.data.msisdnList,
		isZerolutionRTF: state.order.data.isZerolutionRTF
	}
}

const mapDispatchToProps = {
	getRegistrationDetails,
	getMsisdnDetails,
	getDeviceFundContracts,
	setResubmissionRegistrationInfo,
	getPostCodes,
	getAccountManagerDetails,
	getSupportingCenter,
	getMsisdnDetailsERF,
	getVSNDetails,
	getMsisdnDetailsOBS,
	getEASConfigurationData,
	getExistingShareableLineCount
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationType)

