import React, { Component } from 'react';
import {
	Grid, Message, Input, Select, Checkbox, Segment, Container, Icon, Form, Dropdown,
	Confirm
} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { PleaseWait } from '../../components/common/dimmer';
import { validateRegTypeInfo } from '../../helpers/submission-helper';
import { connect } from 'react-redux';
import {
	getEASConfigurationData,
	getAccountManagerDetails,
	getSupportingCenter,
	searchVsnByBRN,
	searchVsnByMsisdnVsn,
	getCompanyInformation,
	getPostCodes,
	getVSNDetails,
	validateOBSVsnByBRN, 
	getExistingShareableLineCount
} from '../../redux/actions/configuration';

import { isChangedToSuccess, isChangedToRejected } from '../../helpers/utils';

import { setRegistrationTypeInfo, unsetOrderData, checkEligibilityForFundDevice } from '../../redux/actions/order';

class RegistrationType extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/company-information",
			bundleType: props.bundleType,
			orderCategory: props.orderCategory,
			brn: props.brn,
			isMsisdnVsn: props.isMsisdnVsn,
			msisdnVsn: props.msisdnVsn,
			selectedVSN: props.selectedVSN,
			companyDeposit: props.companyDeposit,
			advancePayment: props.advancePayment,
			validationResult: {},
			open: false,
			deleteSavedData: false,
			showDimmer: false,
			isValidVSN:props.isValidVSN,
			prevMessage: '',
			brnByVsn:props.brnByVsn,
			checkEligibilityforFundDeviceCounter:0,
			noOfLinesBcc: props.noOfLinesBcc,
			bccEligibilityChecked:props.bccEligibilityChecked
		};
	}

	componentDidMount() {

		// let tempBundleType = [
		// 	{ "key": "1", "text": "Business Postpaid", "value": "Business Postpaid" },
		// 	{ "key": "2", "text": "MAXIS", "value": "MAXIS" }
		// ]

		this.setState({ showDimmer: true });
		this.props.getEASConfigurationData();
		// async calls for other page data goes below
		this.props.getAccountManagerDetails();
		this.props.getSupportingCenter();
		this.props.getPostCodes();
	}

	componentWillReceiveProps(nextProps) {

		let { validationResult, orderCategory, bundleType, selectedVSN } = this.state;
		if(isChangedToSuccess(this.props.GET_JWT_TOKEN_STATUS, nextProps.GET_JWT_TOKEN_STATUS)){
			this.props.getEASConfigurationData(nextProps.token);
			// async calls for other page data goes below
			this.props.getAccountManagerDetails(nextProps.token);
			this.props.getSupportingCenter(nextProps.token);
			this.props.getPostCodes(nextProps.token);
			this.setState({ showDimmer: false });
		}
		else if(isChangedToRejected(this.props.GET_JWT_TOKEN_STATUS, nextProps.GET_JWT_TOKEN_STATUS)){
			this.setState({ showDimmer: false, validationResult: { ...validationResult, status: 'FAILURE', message: ['Some issue in fetching token'] } });
		}
		else if(isChangedToSuccess(this.props.UNSET_ORDER_DATA_STATUS, nextProps.UNSET_ORDER_DATA_STATUS)){
			this.setState({ showDimmer: false });
		}
		else if(isChangedToSuccess(this.props.GET_EAS_CONFIGURATION_DATA_STATUS, nextProps.GET_EAS_CONFIGURATION_DATA_STATUS)){
			this.setState({ showDimmer: false });
		}
		else if(isChangedToRejected(this.props.GET_EAS_CONFIGURATION_DATA_STATUS, nextProps.GET_EAS_CONFIGURATION_DATA_STATUS)){
			this.setState({ showDimmer: false, validationResult: { ...validationResult, status: 'FAILURE', message: ['Seems like server is down'] } });
		}
		else if(isChangedToSuccess(this.props.VSN_SEARCH_BY_BRN_STATUS, nextProps.VSN_SEARCH_BY_BRN_STATUS)){
			this.setState({ showDimmer: false, selectedVSN:null });
		}
		else if(isChangedToSuccess(this.props.VSN_OBS_SEARCH_BY_BRN_STATUS, nextProps.VSN_OBS_SEARCH_BY_BRN_STATUS)){
			if (validationResult.status === 'SUCCESS') {
			this.props.setRegistrationTypeInfo(this.state.bundleType,
					this.state.orderCategory,
					this.state.brn,
					this.state.isMsisdnVsn,
					this.state.msisdnVsn,
					this.state.selectedVSN,
					this.state.companyDeposit,
					this.state.advancePayment, nextProps.brnInfo,
					this.state.noOfLinesBcc
				);
			}
			this.setState({ showDimmer: false, status:nextProps.errorMessage });
			//this.props.history.push(this.state.nextUrl);
		}
		else if(isChangedToSuccess(this.props.VSN_SEARCH_BY_MSISDN_VSN_STATUS, nextProps.VSN_SEARCH_BY_MSISDN_VSN_STATUS)){
			this.setState({ showDimmer: false, selectedVSN:null });
		}
		else if(isChangedToRejected(this.props.VSN_SEARCH_BY_MSISDN_VSN_STATUS, nextProps.VSN_SEARCH_BY_MSISDN_VSN_STATUS)){
			this.setState({ showDimmer: false,  validationResult: { ...validationResult, status: 'FAILURE', message: nextProps.errorMessage }, prevMessage: nextProps.errorMessage, selectedVSN:null});
		}
		else if(isChangedToSuccess(this.props.GET_VSN_DETAILS_STATUS,nextProps.GET_VSN_DETAILS_STATUS)){
			this.setState({ lineCount:nextProps.lineCount, maxLineCount:nextProps.maxLineCount, isValidVSN:true,brnByVsn:nextProps.brnByVsn});
			this.props.getExistingShareableLineCount(selectedVSN);
		}
		else if(isChangedToRejected(this.props.GET_VSN_DETAILS_STATUS,nextProps.GET_VSN_DETAILS_STATUS)){
			this.setState({ showDimmer: false, validationResult: { ...validationResult, status: 'FAILURE', message: nextProps.errorMessage }, prevMessage: nextProps.errorMessage, isValidVSN:false});
		}else if(isChangedToRejected(this.props.VSN_OBS_SEARCH_BY_BRN_STATUS,nextProps.VSN_OBS_SEARCH_BY_BRN_STATUS)){
			this.setState({ showDimmer: false, validationResult: { ...validationResult, status: 'FAILURE', message:nextProps.errorMessage}});
		}
		else if(isChangedToSuccess(this.props.COMPANY_INFO_BY_BRN_STATUS, nextProps.COMPANY_INFO_BY_BRN_STATUS)){
			if (validationResult.status === 'SUCCESS') {
				let {orderCategory,brn,bundleType} = this.state;
				//if condition is commented for  MobileRevamp UCR 
	//if(bundleType==='Business Postpaid with Fibre Option' && orderCategory!==undefined && orderCategory === 'New Group'){	
				//this.props.validateOBSVsnByBRN(brn);
					//}else{
						this.props.setRegistrationTypeInfo(this.state.bundleType,
							this.state.orderCategory,
							this.state.brn,
							this.state.isMsisdnVsn,
							this.state.msisdnVsn,
							this.state.selectedVSN,
							this.state.companyDeposit,
							this.state.advancePayment, nextProps.brnInfo,
							this.state.noOfLinesBcc);
					//}
					this.setState({status:nextProps.errorMessage });
					}
				}
		else if(isChangedToRejected(this.props.COMPANY_INFO_BY_BRN_STATUS, nextProps.COMPANY_INFO_BY_BRN_STATUS)){
			this.setState({
				validationResult: { ...validationResult, status: 'FAILURE', message: nextProps.errorMessage },
				showDimmer: false,
				bccEligibilityChecked:nextProps.bccEligibilityChecked
			});
		}
		else if (isChangedToSuccess(this.props.SET_REG_TYPE_STATUS, nextProps.SET_REG_TYPE_STATUS)) {
			// all ok to proceed
			this.setState({ showDimmer: false });
		
		}
		else if(this.props.SET_ELIGIBILITY_CHECK_STATUS !== 'SUCCESS' && nextProps.SET_ELIGIBILITY_CHECK_STATUS === 'SUCCESS'){
				if(nextProps.checkEligibilityforFundDevice!==null && nextProps.checkEligibilityforFundDevice!==undefined && nextProps.checkEligibilityforFundDevice!==''){
					let { brn, orderCategory, isValidVSN, prevMessage,brnByVsn, selectedVSN, checkEligibilityforFundDeviceCounter,noOfLinesBcc,bccEligibilityChecked} = this.state;
					let tempCounter=checkEligibilityforFundDeviceCounter+1;
					if(!nextProps.checkEligibilityforFundDevice){
						this.setState({checkEligibilityforFundDeviceCounter:tempCounter,validationResult: { ...validationResult, status: 'FAILURE', message: 'Seems like your previous devices are still not processed, first previous devices need to be delievered then only new Fund Device can be taken.' }});
					}
					if(nextProps.checkEligibilityforFundDevice || tempCounter>1){
						let { userRole,userId } = this.props;
						console.log('order cat',orderCategory);
						if(orderCategory!==undefined && ((orderCategory === 'Existing Group') || (orderCategory === 'Existing Group- Add VAS'))){
							if(!isValidVSN){
								this.setState({validationResult: { ...validationResult, status: 'FAILURE', message: prevMessage }});
								return;
							}
							if(brnByVsn.trim() !== brn.trim() ){
								this.setState({validationResult: { ...validationResult, status: 'FAILURE', message: 'Entered BRN does not match with the BRN attached to this VSN'}});
								return;
							}

						}
						let validationResult = validateRegTypeInfo(this.state.bundleType,
							this.state.orderCategory,
							this.state.brn,
							this.state.isMsisdnVsn,
							this.state.msisdnVsn,
							this.state.selectedVSN,
							this.state.companyDeposit,
							this.state.advancePayment);
							console.log('hi',validationResult);
						if (validationResult.status === 'SUCCESS') {
							this.setState({ validationResult: validationResult, showDimmer: true });
							if(this.props.SET_REG_TYPE_STATUS === 'DEFAULT' || this.state.noOfLinesBcc !== this.props.noOfLinesBcc){
							//this.props.getCompanyInformation(brn,noOfLinesBcc, userRole);
							if(noOfLinesBcc !== '' && (
								bccEligibilityChecked === undefined || bccEligibilityChecked === null ||  !bccEligibilityChecked)){
								this.props.getCompanyInformation(brn,noOfLinesBcc, userRole);
							}
							else {
								this.props.getCompanyInformation(brn,'Test', userRole);
							}
							}else{
								this.setState({ showDimmer: false });
							
								this.props.history.push(this.state.nextUrl);
								
							    // this.props.history.push(this.state.nextUrl);
							}
						} else {
							this.setState({ validationResult: validationResult });
						}
					}
			}
		}
		else if(isChangedToRejected(this.props.SET_ELIGIBILITY_CHECK_STATUS, nextProps.SET_ELIGIBILITY_CHECK_STATUS)){
			this.setState({status:'FAILURE',message:nextProps.vasValidateErrorMessage , showDimmer: false});
		}
		else if(isChangedToSuccess(this.props.EXISTING_SHAREABLE_LINES_COUNT_STATUS,nextProps.EXISTING_SHAREABLE_LINES_COUNT_STATUS)){
			this.setState({ showDimmer: false});
		}
		else if(isChangedToRejected(this.props.EXISTING_SHAREABLE_LINES_COUNT_STATUS,nextProps.EXISTING_SHAREABLE_LINES_COUNT_STATUS)){
			this.setState({ showDimmer: false, validationResult: { ...validationResult, status: 'FAILURE', message: 'Error in fetching Shareable Line Details for VSN' }});
		}
	}
	reset = () => {
		this.setState({
			bundleType: null,
			orderCategory: null,
			brn: '',
			isMsisdnVsn: null,
			msisdnVsn: null,
			selectedVSN: null,
			companyDeposit: false,
			advancePayment: false
		});
	}

	next = () => {
		//localStorage.removeItem('persist:ebdportal');
		let { brn, orderCategory, isValidVSN, prevMessage,brnByVsn, selectedVSN, bundleType,noOfLinesBcc,bccEligibilityChecked} = this.state;
		if(orderCategory==='Existing Group'){
			this.props.checkEligibilityForFundDevice(selectedVSN, 'Existing Group');
		}
		else{
			let { userRole,userId } = this.props;
			console.log('order cat',orderCategory);
			if(orderCategory!==undefined && ((orderCategory === 'Existing Group') || (orderCategory === 'Existing Group- Add VAS'))){
				if(!isValidVSN){
					this.setState({validationResult: { ...validationResult, status: 'FAILURE', message: prevMessage }});
					return;
				}
				if(brnByVsn.trim() !== brn.trim() ){
					this.setState({validationResult: { ...validationResult, status: 'FAILURE', message: 'Entered BRN does not match with the BRN attached to this VSN'}});
					return;
				}

			}
			let validationResult = validateRegTypeInfo(this.state.bundleType,
				this.state.orderCategory,
				this.state.brn,
				this.state.isMsisdnVsn,
				this.state.msisdnVsn,
				this.state.selectedVSN,
				this.state.companyDeposit,
				this.state.advancePayment);
				console.log('hi',validationResult);
			if (validationResult.status === 'SUCCESS') {
				this.setState({ validationResult: validationResult, showDimmer: true });
				if(this.props.SET_REG_TYPE_STATUS === 'DEFAULT' || this.state.noOfLinesBcc !== this.props.noOfLinesBcc){
				if(noOfLinesBcc !== '' && (
					bccEligibilityChecked === undefined || bccEligibilityChecked === null ||  !bccEligibilityChecked)){
					this.props.getCompanyInformation(brn,noOfLinesBcc, userRole);
				}
				else {
					this.props.getCompanyInformation(brn,'Test', userRole);
				}
				}else{
					this.setState({ showDimmer: false });
				
					this.props.history.push(this.state.nextUrl);
					
					// this.props.history.push(this.state.nextUrl);
				}
			} else {
				this.setState({ validationResult: validationResult });
			}
		}
	}
	checkIsNumeric = (value) => {
		if (value !== undefined && value !== null && value !== ''){
			var regex = /^[0-9]+$/;
			return (regex.test(value)) ? true : false;
		}else{
			return true;
		}
	}

	handleChange = (e, { type, name, value, checked }) => {
		// if BRN is set in props which means BRN is validated and data is changing, this is not allowed
    if(name === 'noOfLinesBcc'){
			var checkIsNumeric = this.checkIsNumeric(value);
			if(!checkIsNumeric){
				return;
			}
		}
		if (this.props.brn && this.state[name] !== value && name !== 'noOfLinesBcc') {
			console.log('order info is set, change not allowed');
			return;
		}
		else{
			if(name==='orderCategory' && value==='New Group'){
				this.setState({isMsisdnVsn:false});
			}
			if (type === 'checkbox') {
				this.setState({ [name]: checked });
			  }else{
				this.setState({ [name]: value });
			  }
			if(name==='selectedVSN' && value!==null && value !==''){
				this.setState({showDimmer: true});
				this.props.getVSNDetails(value,this.state.bundleType);
			}
			if(name==='bundleType' && value === 'MAXIS'){
				this.setState({orderCategory:'Normal'});
			}
			if(name === 'noOfLinesBcc'){
				this.setState({bccEligibilityChecked:false});
			}
		}

	}

	searchVSNforBRN() {
		let { brn, bundleType, validationResult } = this.state;
		if(brn === '' || brn === null || brn === undefined){
			this.setState({ showDimmer: false, validationResult: { ...validationResult, status: 'FAILURE', message: ['Please enter BRN first'] } });
			return;
		}else{
			if(bundleType.trim() === 'MAXIS' || bundleType.trim() === 'Maxis'){
				this.setState({ showDimmer: false, validationResult: { ...validationResult, status: 'FAILURE', message: ['Please select Bundle Type First'] } });
				return;
			}else{
				this.setState({validationResult:{}, showDimmer: true});
				this.props.searchVsnByBRN(brn, bundleType);
			}
		}
	}

	searchVSNForMsisdnVsn() {
		let { msisdnVsn } = this.state;
		this.setState({validationResult:{}, showDimmer: true });
		this.props.searchVsnByMsisdnVsn(msisdnVsn);
	}

	open = () => {
		this.setState({ open: true })
	}

	close(goForDelete) {
		if (goForDelete === 'yes') {
			this.setState({ open: false, showDimmer: true ,bundleType: null,
			noOfLinesBcc:'',
			orderCategory: null,
			brn: '',
			isMsisdnVsn: null,
			msisdnVsn: null,
			selectedVSN: null,
			companyDeposit: false,
			advancePayment: false, validationResult:{}
			});
			this.props.unsetOrderData({});

		}
		else {
			this.setState({ open: false })
		}
	}

	render() {

		let { orderCategory, bundleType, isMsisdnVsn, brn, msisdnVsn, selectedVSN, advancePayment,
			companyDeposit, showDimmer,noOfLinesBcc} = this.state;
		let { orderCategories,
			  bundleTypes,
			   vsnServices } = this.props;

		let { status, message, missingBundleType,
			missingOrderCategory, missingBrn, missingVsn } = this.state.validationResult;

		return (
			<Container fluid>
				<PleaseWait active={showDimmer} />
				<Navigation index={1} group={bundleType} />
				<Segment basic style={{ padding: 0, paddingTop: 15 }}>
					<Form size='small'>
						<Grid style={{ paddingLeft: 10 }}>
							<Grid.Row style={{ padding: 0, paddingTop: 15 }}>
								<Grid.Column width={6}>
									<label className='heading'>Bundle Type</label>
									{(status === 'FAILURE' && missingBundleType) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
								</Grid.Column>
								{ this.state.bundleType !== 'MAXIS' &&
								<Grid.Column width={6} textAlign='left'>
									<label className='heading'>Order Category</label>
									{(status === 'FAILURE' && missingOrderCategory) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
								</Grid.Column>}
							</Grid.Row>
							<Grid.Row style={{ padding: 0, paddingTop: 3 }}>
								<Grid.Column width={6}>
									<Select placeholder='Please select' options={bundleTypes} onChange={this.handleChange} value={bundleType} name='bundleType' fluid />
								</Grid.Column>
								{ this.state.bundleType !== 'MAXIS' &&
								<Grid.Column width={6}>
									<Dropdown placeholder='Please select' size='small' selection options={orderCategories} onChange={this.handleChange} value={orderCategory} name='orderCategory' fluid />
								</Grid.Column>}
							</Grid.Row>
							<Grid.Row style={{ padding: 0, paddingTop: 15 }}>
								<Grid.Column width={6}>
									<label className='heading'>BRN</label>
									{(status === 'FAILURE' && missingBrn) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
								</Grid.Column>
								{((orderCategory === 'Existing Group') || (orderCategory === 'Existing Group- Add VAS')) && (
									<React.Fragment>
										<Grid.Column width={4} textAlign='left'>
											<label className='heading'>
												MSISDN/Registered Service No
														</label>
										</Grid.Column>
										<Grid.Column width={2} style={{ paddingLeft: 23 }}>
											<Checkbox style={{ padding: 5 }} onClick={this.handleChange} name='isMsisdnVsn' checked={isMsisdnVsn} value={isMsisdnVsn} />
										</Grid.Column>
									</React.Fragment>
								)
								}
							</Grid.Row>
							<Grid.Row style={{ padding: 0, paddingTop: 3 }}>
								<Grid.Column width={4}>
									<Input placeholder='BRN'
										fluid
										name="brn"
										value={brn}
										onChange={this.handleChange} />
								</Grid.Column>
								{((orderCategory === 'Existing Group') || (orderCategory === 'Existing Group- Add VAS')) && (
									<Grid.Column width={2} style={{ paddingLeft: 10 }}>
										<SecondaryButton value='SEARCH' onClick={() => this.searchVSNforBRN()} />
									</Grid.Column>
								)
								}
								{(isMsisdnVsn) && (
									<React.Fragment>
										<Grid.Column width={4}>
											<Input placeholder='VSN'
												fluid
												name='msisdnVsn'
												value={msisdnVsn}
												onChange={this.handleChange} />
										</Grid.Column>
										<Grid.Column width={2} style={{ paddingLeft: 10 }}>
											<SecondaryButton value='SEARCH' onClick={() => this.searchVSNForMsisdnVsn()} />
										</Grid.Column>
									</React.Fragment>)
								}
							</Grid.Row>
							 { 
							
							<React.Fragment>
							<Grid.Row style={{ padding: 0, paddingTop: 15 }}>
								<Grid.Column width={6}>
									<label className='heading'>No of Lines</label>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ padding: 0, paddingTop: 3 }}>
								<Grid.Column width={4}>
									<Input placeholder='No of lines'
                    name='noOfLinesBcc'
										value={noOfLinesBcc}
                    onChange={this.handleChange}
										maxLength='6'
										/>
								</Grid.Column>
							</Grid.Row>

							</React.Fragment>}
							{((orderCategory === 'Existing Group') || (orderCategory === 'Existing Group- Add VAS') )&& (
								<React.Fragment>
									<Grid.Row style={{ padding: 0, paddingTop: 15 }}>
										<Grid.Column width={16}>
											<label className='heading'>Virtual Service Number</label>
											{(status === 'FAILURE' && missingVsn) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
										</Grid.Column>
									</Grid.Row>
									<Grid.Row style={{ padding: 0, paddingTop: 3 }}>
										<Grid.Column width={6}>
											<Dropdown placeholder='Please select' search size='small' selection options={vsnServices} onChange={this.handleChange} name='selectedVSN' value={selectedVSN} fluid />
										</Grid.Column>
										<Grid.Column width={4}>
										</Grid.Column>
									</Grid.Row>
									{(selectedVSN !== null && selectedVSN  !== 'New - Not Available Yet') && (
										<React.Fragment>
											<Grid.Row style={{ padding: 0}}>
												<Grid.Column width={12} style={{ textAlign: 'right', fontWeight: 'bold' }}>
													Shared Member Allowed:<span style={{ paddingLeft: 3 }}>{this.props.totalAllowed}</span>
												</Grid.Column>
											</Grid.Row>
											<Grid.Row style={{ padding: 0 }}>
												<Grid.Column width={12} style={{ textAlign: 'right', fontWeight: 'bold' }}>
													Shared Member Subscribed:<span style={{ paddingLeft: 3 }}>{this.props.totalSubscribed}</span>
												</Grid.Column>
											</Grid.Row>
											<Grid.Row style={{ padding: 0}}>
												<Grid.Column width={12} style={{ textAlign: 'right', fontWeight: 'bold' }}>
													Remainder Share Member Allowed To Subscribe:<span style={{ paddingLeft: 3}}>{this.props.remainderAllowed}</span>
												</Grid.Column>
											</Grid.Row>
										</React.Fragment>
										)
									}
									
								</React.Fragment>
							)
							}
							<Grid.Row style={{ padding: 0, paddingTop: 20 }}>
								<Grid.Column width={16}>
									Please tick if applicable and attach soft copy of bank in/cheque
										</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ paddingBottom: 0 }}>
								<Grid.Column width={16}>
									<Checkbox label={<label style={{ fontSize: 12 }}>Foreigner Company Deposit</label>} onChange={this.handleChange} name='companyDeposit'checked={companyDeposit} />
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ paddingTop: 5 }}>
								<Grid.Column width={16}>
									<Checkbox label={<label style={{ fontSize: 12 }}>Plan Advance Payment</label>} onChange={this.handleChange} name='advancePayment' checked={advancePayment} />
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<Confirm
							cancelButton='NO'
							confirmButton="YES"
							open={this.state.open}
							header='Are you sure?'
							content='This will reset entire order data'
							onCancel={() => this.close('no')}
							onConfirm={() => this.close('yes')} />

						{
							(status === 'FAILURE') &&
							<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
								onDismiss={() => this.setState({ validationResult: {} })}>
                {(!this.state.bccEligibilityChecked) &&
								<Message.Header>We have encounted an error.</Message.Header>}
								<p>{message}</p>
							</Message>

						}
					</Form>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<SecondaryButton value='RESET' onClick={this.open} />
					<div style={{ padding: 20 }} />
					<PrimaryButton value='NEXT' onClick={this.next} />
				</Segment>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderCategories: state.configuration.data.orderCategories,
		bundleTypes: state.configuration.data.bundleTypes,
		vsnServices: state.configuration.data.vsnServices,
		orderCategory: state.order.data.orderCategory,
		bundleType: state.order.data.bundleType,
		companyDeposit: state.order.data.companyDeposit,
		advancePayment: state.order.data.advancePayment,
		isMsisdnVsn: state.order.data.isMsisdnVsn,
		brn: state.order.data.brn,
		selectedVSN: state.order.data.selectedVSN,
		msisdnVsn: state.order.data.msisdnVsn,
		userRole: state.user.data.userRole,
		brnInfo: state.configuration.data.brnInfo,
		errorMessage: state.configuration.data.errorMessage,
		COMPANY_INFO_BY_BRN_STATUS: state.configuration.meta.COMPANY_INFO_BY_BRN_STATUS,
		GET_EAS_CONFIGURATION_DATA_STATUS: state.configuration.meta.GET_EAS_CONFIGURATION_DATA_STATUS,
		VSN_SEARCH_BY_BRN_STATUS: state.configuration.meta.VSN_SEARCH_BY_BRN_STATUS,
		VSN_SEARCH_BY_MSISDN_VSN_STATUS: state.configuration.meta.VSN_SEARCH_BY_MSISDN_VSN_STATUS,
		SET_REG_TYPE_STATUS: state.order.meta.SET_REG_TYPE_STATUS,
		GET_VSN_DETAILS_STATUS:state.configuration.meta.GET_VSN_DETAILS_STATUS,
		UNSET_ORDER_DATA_STATUS: state.order.meta.UNSET_ORDER_DATA_STATUS,
		lineCount: state.configuration.data.lineCount,
		maxLineCount: state.configuration.data.maxLineCount,
		brnByVsn: state.configuration.data.brnByVsn,
		isValidVSN:state.configuration.data.isValidVSN,
		GET_JWT_TOKEN_STATUS:state.order.meta.GET_JWT_TOKEN_STATUS,
		token:state.order.data.token,
		SET_ELIGIBILITY_CHECK_STATUS:state.order.meta.SET_ELIGIBILITY_CHECK_STATUS,
		checkEligibilityforFundDevice:state.order.data.checkEligibilityforFundDevice,
		userId:state.user.data.userId,
		VSN_OBS_SEARCH_BY_BRN_STATUS:state.configuration.meta.VSN_OBS_SEARCH_BY_BRN_STATUS,
		noOfLinesBcc:state.order.data.noOfLinesBcc,
		bccEligibilityChecked:state.configuration.data.bccEligibilityChecked,
		EXISTING_SHAREABLE_LINES_COUNT_STATUS: state.configuration.meta.EXISTING_SHAREABLE_LINES_COUNT_STATUS,
		totalAllowed:state.configuration.data.totalAllowed,
		totalSubscribed:state.configuration.data.totalSubscribed,
		remainderAllowed:state.configuration.data.remainderAllowed
	}
}

const mapDispatchToProps = {
	getEASConfigurationData,
	setRegistrationTypeInfo,
	searchVsnByBRN,
	searchVsnByMsisdnVsn,
	getCompanyInformation,
	unsetOrderData,
	getAccountManagerDetails,
	getSupportingCenter,
	getPostCodes,
	getVSNDetails,
	checkEligibilityForFundDevice,
	validateOBSVsnByBRN,
	getExistingShareableLineCount
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationType)
