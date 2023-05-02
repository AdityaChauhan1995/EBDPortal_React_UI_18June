import React, { Component } from 'react';
import { Grid,  Checkbox, Segment, Container,  Form, Message} from "semantic-ui-react";
import  Navigation  from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { connect } from 'react-redux';
import { StaticBlock5, StaticBlock8 } from '../../components/common/dumb-component';
import {  getRegistrationDetails, getMsisdnDetails ,setOrderInPMP,getMsisdnDetailsERF,getMsisdnDetailsOBS} from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';
import { isChangedToSuccess, isChangedToRejected } from '../../helpers/utils';




class RegistrationType extends Component {
	constructor(props) {
	  super(props);
	  const {url} = this.props.match;
	  this.state = {
		  	url:url,
	  		nextUrl: url.substring(0, url.lastIndexOf("/")) + "/company-information?mode=View",
	  		showDimmer: false,
	  		validationResult: {
	  		  status: 'SUCCESS',
	  		  message: '',
	  		},
	  };
	}
	componentDidMount(){
		this.setState({ showDimmer: true });
		let easMasterRegId=this.props.location.search.substring(this.props.location.search.lastIndexOf("=")+1,this.props.location.search.length);
		this.props.getRegistrationDetails(easMasterRegId, 'VIEW_MODE');
	}
	next=()=>{
		if(this.props.location.search.includes('BPU')){
			let orderInPMP = false;
			this.props.msisdnList.map((msisdn) => {
				if(msisdn.regStatus === 'Pending Manual Provisioning'){
					orderInPMP = true;
				}
			});
			if(orderInPMP){
				this.setState({showDimmer:true});
				this.props.setOrderInPMP(orderInPMP);
			}else{
				let tempNextURL=this.state.nextUrl;
				let easMasterRegId=this.props.location.search.substring(this.props.location.search.lastIndexOf("=")+1,this.props.location.search.length);
				tempNextURL+="&easMasterRegId="+easMasterRegId;
				this.props.history.push(tempNextURL);
			}
		}
		else{
			let tempNextURL=this.state.nextUrl;
			let easMasterRegId=this.props.location.search.substring(this.props.location.search.lastIndexOf("=")+1,this.props.location.search.length);
			tempNextURL+="&easMasterRegId="+easMasterRegId;
			this.props.history.push(tempNextURL);
		}
		

	}

	componentWillReceiveProps(nextProps){
			if(isChangedToSuccess(this.props.FETCH_REGISTRATION_DETAILS_STATUS,nextProps.FETCH_REGISTRATION_DETAILS_STATUS)){
				//this.props.getMsisdnDetails(nextProps.registrationDetails.masterRegId,'VIEW_MODE');
				if(nextProps.registrationDetails.groupName === 'MAXIS'){
					this.props.getMsisdnDetailsERF(nextProps.registrationDetails.masterRegId,'VIEW_MODE');
				}else if(nextProps.registrationDetails.groupName === 'Business Postpaid with Fibre Option'){
				
					this.props.getMsisdnDetailsOBS(nextProps.registrationDetails.masterRegId,'VIEW_MODE', nextProps.isZerolutionRTF);
				}
				else{
					this.props.getMsisdnDetails(nextProps.registrationDetails.masterRegId,'VIEW_MODE');
				}
			}
			else if(isChangedToRejected(this.props.FETCH_REGISTRATION_DETAILS_STATUS,nextProps.FETCH_REGISTRATION_DETAILS_STATUS)){
				this.setState({showDimmer:false});
				this.setState({ validationResult: {status:'FAILURE', message:'Faced some issue in fetching data'} });
			}else if(isChangedToSuccess(this.props.FETCH_LINE_DETAILS_STATUS,nextProps.FETCH_LINE_DETAILS_STATUS)){
				this.setState({showDimmer:false});
			}else if(isChangedToRejected(this.props.FETCH_LINE_DETAILS_STATUS,nextProps.FETCH_LINE_DETAILS_STATUS)){
				this.setState({showDimmer:false});
				this.setState({ validationResult: {status:'FAILURE', message:'Faced some issue in fetching data'} });
			}else if(isChangedToSuccess(this.props.SET_ORDER_PMP_STATUS,nextProps.SET_ORDER_PMP_STATUS)){
				this.setState({showDimmer:false});
				let tempNextURL= "/bundle/approval/company-information?mode=Approval&action=approved";
				
				let easMasterRegId=this.props.location.search.substring(this.props.location.search.lastIndexOf("=")+1,this.props.location.search.length);
				tempNextURL+="&easMasterRegId="+easMasterRegId;
				this.props.history.push(tempNextURL);
			}
			
	}
	render() {
		let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName,
		  maxLineCount, dealerRemarks, bpuRemarks, customerType, dealerName,deposit
		 , brnInfo,prodCatName,supportingCenterName,totalMemberString,advPayment,groupName,accountNo}=this.props.registrationDetails;
		 let { status, message } = this.state.validationResult;
		 let { showDimmer }=this.state;
		return (
				<Container fluid>
				<PleaseWait active={showDimmer} />
				<Navigation index={1} group={groupName}/>
				<Segment basic style={{padding:0, paddingTop:15, flex: 1}}>
					<Form size='small'>
						<Grid style={{paddingLeft:10}}>
							 {groupName!='MAXIS' &&
								<StaticBlock5 custBrnNo={custBrnNo} companyName={brnInfo.portalCustInfo.companyName} masterRegId={masterRegId}
								 virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMemberString={totalMemberString}
								 maxLineCount={maxLineCount} contactMode={contactMode} masterRegStatus={masterRegStatus}
								 prodCatName={prodCatName} accountNo={accountNo} toShowAccountNo = {true}/>
							}
							 {groupName==='MAXIS' &&
               					<StaticBlock8
             					     custBrnNo={custBrnNo}
            					     companyName={brnInfo.portalCustInfo.companyName}
            					     masterRegId={masterRegId}
               					 	 masterRegStatus={masterRegStatus}
                					 prodCatName={prodCatName} />
              				 }
							<Grid.Row style={{paddingBottom:0, paddingTop:30}}>
									<Grid.Column width={4} >
										<label className='heading'>Type Of Customer:</label>
									</Grid.Column>
									<Grid.Column width={12} textAlign='left'>
											{customerType}
									</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{paddingBottom:0}}>
									<Grid.Column width={4} >
										<label className='heading'>Dealer Name:</label>
									</Grid.Column>
									<Grid.Column width={12} textAlign='left'>
										 	{dealerName}
									</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{paddingBottom:0}}>
									<Grid.Column width={4} >
										<label className='heading'>Bpu Remarks</label>
									</Grid.Column>
									<Grid.Column width={12} textAlign='left'>
										{bpuRemarks}
									</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{paddingBottom:0}}>
									<Grid.Column width={4} >
										<label className='heading'>Dealer Remarks</label>
									</Grid.Column>
									<Grid.Column width={12} textAlign='left' className='dangerText'>
										{dealerRemarks}
									</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{paddingBottom:0}}>
									<Grid.Column width={4} >
										<label className='heading'>Supporting centre</label>
									</Grid.Column>
									<Grid.Column width={12} textAlign='left'>
										{supportingCenterName}
									</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{paddingBottom:0, paddingTop:30}}>
									<Grid.Column width={4}>
										 Advance Payment
									</Grid.Column>
									<Grid.Column width={12}>
										 	<Checkbox style={{padding:5}} checked={advPayment === 'on'} disabled/>
									</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{paddingBottom:0}}>
									<Grid.Column width={4}>
										Foreign Company Deposit
									</Grid.Column>
									<Grid.Column width={12}>
										<Checkbox style={{padding:5}} checked={deposit === 'on'}  disabled/>
									</Grid.Column>
							</Grid.Row>
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
				<Segment basic style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:20}}>
					<PrimaryButton value='NEXT' onClick={this.next}/>
				</Segment>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		registrationDetails: state.order.data.registrationDetails,
		msisdnList:state.order.data.msisdnList,
		active:state.configuration.meta.active,
	 	SET_APPROVAL_REG_TYPE_STATUS: state.order.meta.SET_APPROVAL_REG_TYPE_STATUS,
		easMasterRegId:state.order.data.easMasterRegId,
		action:state.order.data.action,
		FETCH_REGISTRATION_DETAILS_STATUS:state.order.meta.FETCH_REGISTRATION_DETAILS_STATUS,
		FETCH_LINE_DETAILS_STATUS:state.order.meta.FETCH_LINE_DETAILS_STATUS,
		SET_ORDER_PMP_STATUS:state.order.meta.SET_ORDER_PMP_STATUS,
		isZerolutionRTF: state.order.data.isZerolutionRTF
	}
}

const mapDispatchToProps = {
	getRegistrationDetails,
	getMsisdnDetails,
	setOrderInPMP,
	getMsisdnDetailsERF,
	getMsisdnDetailsOBS
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationType)
