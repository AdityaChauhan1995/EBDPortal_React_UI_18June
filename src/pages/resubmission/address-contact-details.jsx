import React, { Component } from 'react';
import {
	Grid, Checkbox, Segment, Container, Form, Message
} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock5,StaticBlock9,StaticBlock8 } from '../../components/common/dumb-component';
import AddressDetailsComp from '../../components/address-contact-details/address-details';
import PicDetails from '../../components/address-contact-details/pic-details';
import DeliveryDetails from '../../components/address-contact-details/delivery-details';
import { connect } from 'react-redux';
import { setAddressContactDetails } from '../../redux/actions/order';
import { validateAddressContactDetails } from '../../helpers/submission-helper';
import { PleaseWait } from '../../components/common/dimmer';
import SecondaryPICDetails from '../../components/address-contact-details/secondary-pic-details';

class AddressContactDetails extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		
		let postCodeHintBillingTemp = '';
		if(this.props.billingAddress.city === null  ){
			postCodeHintBillingTemp = this.props.billingAddress.postCode + ',' + this.props.billingAddress.state
		}else if(this.props.billingAddress.state ===  null){
			postCodeHintBillingTemp  = this.props.billingAddress.postCode + ',' + this.props.billingAddress.city
		}else{
			postCodeHintBillingTemp = this.props.billingAddress.postCode + ',' + this.props.billingAddress.city + ',' + this.props.billingAddress.state
		}
		let postCodeHintDeliveryTemp = '';
		if(this.props.billingAddress.city === null  ){
			postCodeHintDeliveryTemp = this.props.deliveryAddress.postCode + ',' + this.props.deliveryAddress.state
		}else if(this.props.billingAddress.state ===  null){
			postCodeHintDeliveryTemp = this.props.deliveryAddress.postCode + ',' + this.props.deliveryAddress.city
		}else{
			postCodeHintDeliveryTemp = this.props.deliveryAddress.postCode + ',' + this.props.deliveryAddress.city + ',' + this.props.deliveryAddress.state
		}
		let tempNextUrl = null;
        if(this.props.groupName === 'MAXIS' || this.props.groupName === 'Zerolution'){
            tempNextUrl = url.substring(0, url.lastIndexOf("/")) + "/product-order-combinedSubsidy?mode=Resubmission"
        }else if(this.props.groupName ==='Business Postpaid with Fibre Option'){
		tempNextUrl = url.substring(0, url.lastIndexOf("/")) + "/product-order-obs?mode=Resubmission"
		}else{
            tempNextUrl = url.substring(0, url.lastIndexOf("/")) + "/product-order?mode=Resubmission"
        }
		this.state = {
			nextUrl: tempNextUrl,
			validateResult: {},
			message: 'Missing required attributes.',
			billingAddress: {
				...props.billingAddress,
				postCodeHint: postCodeHintBillingTemp
			},
			deliveryAddress: {
				...props.deliveryAddress,
				postCodeHint: postCodeHintDeliveryTemp
			},
			picDetails: props.picDetails,
			secondaryPicDetails: props.secondaryPicDetails,
			showDimmer: false,
		};
	}
	isAlphaNumeric = (name, value) => {
		
			   var Exp = /^[0-9a-zA-Z]+$/;
			   if(Exp.test(value) === false){
				   this.setState({ validateResult: {
					   status: 'FAILURE',
					   message:'Only Alpha Numeric Values are allowed !'
					   } })
			   }else{
				this.setState({ validateResult: {status: 'SUCCESS'} })
			   }
			}

	next = () => {
		var result = false;
		//console.log(this.state.billingAddress, this.state.deliveryAddress, this.state.picDetails);
		let validateResult = validateAddressContactDetails(
			this.state.billingAddress,
			this.state.deliveryAddress,
			this.state.picDetails,
		this.state.secondaryPicDetails);
		if (validateResult.status === 'SUCCESS') {
				result = this.validateMultipleEmailsCommaSeparated(';','picEMail',this.state.picDetails.picEMail);
			if(result === true)
				result = this.validateMultipleEmailsCommaSeparated(';','contactEmail',this.state.deliveryAddress.contactEmail);
			if(result === true){
				result = this.validateMultipleEmailsCommaSeparated(';','secondaryPicEMail',this.state.secondaryPicDetails.secondaryPicEMail);
			}
			if(result === true){
				result = this.validateMultipleEmailsCommaSeparatedPICEmail(';','notificationEmail',this.state.picDetails.notificationEmail);
			}
			if(result === true){
			this.props.setAddressContactDetails(
				this.state.billingAddress,
				this.state.deliveryAddress,
				this.state.picDetails,
			    this.state.secondaryPicDetails);
		}
	} else {
		this.setState({ validateResult: validateResult });
	}
}
	componentWillReceiveProps(nextProps) {
		// TODO: postcode status update
		if (this.props.FETCH_POST_CODE_HINT_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_POST_CODE_HINT_STATUS === 'SUCCESS') {
			// component ready
		}
		else if (this.props.SET_ADDRESS_CONTACT_DETAILS_STATUS !== 'SUCCESS' &&
			nextProps.SET_ADDRESS_CONTACT_DETAILS_STATUS === 'SUCCESS') {
				let tempNextURL=this.state.nextUrl;
				tempNextURL+="&action=rejected&easMasterRegId="+this.props.easMasterRegId;
				this.props.history.push(tempNextURL);
		}
	}
	previous = () => {
		this.props.history.goBack();
	}

	handlePostCodeChange = (group, name, value) => {
		let postCodeHint = value.split(",");
		let postCode = postCodeHint[0];
		let city = postCodeHint[1];
		let state = postCodeHint[2];
		switch (group) {
			case "BILLING":
				if (this.state.useBillingAddress) {
					this.setState({
						billingAddress: {
							...this.state.billingAddress,
							postCodeHint: value,
							postCode: postCode,
							city: city,
							state: state
						},
						deliveryAddress: {
							...this.state.deliveryAddress,
							postCodeHint: value,
							postCode: postCode,
							city: city,
							state: state
						},
					});
				} else {
					this.setState({
						billingAddress: {
							...this.state.billingAddress,
							postCodeHint: value,
							postCode: postCode,
							city: city,
							state: state
						}
					});
				}

				break;
			case "DELIVERY":
				this.setState({
					deliveryAddress: {
						...this.state.deliveryAddress,
						postCodeHint: value,
						postCode: postCode,
						city: city,
						state: state
					}
				});
				break;
			default:
				break;
		}
	}

	checkIsNumeric= (value) => {
		if(value !== undefined && value !== null && value !== ''){
			var regex = /^[0-9]+$/;
			return (regex.test(value)) ? true:false;
		}else{
			return true;
		}
		
	}
	handleChange = (group, name, value) => {
		if(name=== 'address1'||name=== 'address2'||name=== 'contactName'||name=== 'picName' || name==='secondaryPicName'){
			value = value.toUpperCase();
		}
		if (name === 'postCodeHint') {
			this.handlePostCodeChange(group, name, value);
			return;
		}
		switch (group) {
			case "BILLING":
				if (this.state.useBillingAddress) {
					this.setState({
						billingAddress: { ...this.state.billingAddress, [name]: value },
						deliveryAddress: {
							...this.state.deliveryAddress, [name]: value
						}
					});
				} else {
					this.setState({
						billingAddress: { ...this.state.billingAddress, [name]: value }
					});
				}

				break;
			case "DELIVERY":
			var checkNum = false;
			if(name==='contactPhoneNo'||name==='contactFixNo')
			{
				checkNum = this.checkIsNumeric(value);
				if(checkNum){
				if(value.length<8){
					if(name==='contactPhoneNo'){
						this.setState({
							validateResult: {
								status: 'FAILURE',
								message:'Please enter min 8 digit contact phone no.!'
							}
						});
					}
					else if(name==='contactFixNo'){
						this.setState({
							validateResult: {
								status: 'FAILURE',
								message:'Please enter min 8 digit contact fix no.!'
							}
						});

					}

				}else{
					this.setState({
						validateResult: {
							status: 'SUCCESS',
						}
					});
				}
			}
			}
			if(name ==='contactIC'){
				if(value.length <4){
					this.setState({
						validateResult: {
							status: 'FAILURE',
							message:'	Please enter more than 4 digit contact IC !'
						}
					});
				}else{
					this.setState({
						validateResult: {
							status: 'SUCCESS',
						}
					});
				}

			}
			if(name !== 'contactPhoneNo' && name !== 'contactFixNo')
			{ 
				this.setState({
					deliveryAddress: { ...this.state.deliveryAddress, [name]: value }
				});
			
			}else if((name === 'contactPhoneNo' || name === 'contactFixNo') && checkNum){
				
				this.setState({
					deliveryAddress: { ...this.state.deliveryAddress, [name]: value }
				});
				
			}else if((name === 'contactPhoneNo' || name === 'contactFixNo') && !checkNum && value.length===1){
				this.setState({
					deliveryAddress: { ...this.state.deliveryAddress, [name]: '' }
				});
			}
				break;
			case "PIC":
			var checkValNumeric = false;
			if(name==='picContactNumber')
				{
					checkValNumeric = this.checkIsNumeric(value);
				if(checkValNumeric){
					if(value.length<8){
						this.setState({
							validateResult: {
								status: 'FAILURE',
								message:'Please enter min 8 digit contact phone no.!'
							}
						});
					}else{
						this.setState({
							validateResult: {
								status: 'SUCCESS',
							}
						});
					}
				}
			}
			if(name !== 'picContactNumber'){
				this.setState({
					picDetails: { ...this.state.picDetails, [name]: value },

				});
			}else if(name === 'picContactNumber' && checkValNumeric){
				this.setState({
					picDetails: { ...this.state.picDetails, [name]: value },

				});
			}

				break;
				case "SecondaryPIC":
				var checkValNumeric = false;
			  if(name==='secondaryPicContactNumber'||name==='secondaryPicIc'||name==='secondaryPicContactFixedNo')
			  {
				  checkValNumeric = this.checkIsNumeric(value);

				  if(checkValNumeric){
				  if(value.length<8){
						if(name==='secondaryPicContactNumber'){
					  this.setState({
						  validateResult: {
							  status: 'FAILURE',
							  message:'Please enter min 8 digit contact phone no.!'
						  }
					  });
					}
						else if(name==='secondaryPicIc'){
							this.setState({
								validateResult: {
									status: 'FAILURE',
									message:'Please enter min 8 digit contact Ic.!'
								}
							});
						}
						else if(name==='secondaryPicContactFixedNo'){
							this.setState({
								validateResult: {
									status: 'FAILURE',
									message:'Please enter min 8 digit contact Fixed No.!'
								}
							});
						}
				  }else{
					  this.setState({
						  validateResult: {
							  status: 'SUCCESS',
						  }
					  });
				  }
			  }
			  }
				  if(name !== 'secondaryPicContactNumber'||name !== 'secondaryPicIc'||name !== 'secondaryPicContactFixedNo'){
					  this.setState({
						  secondaryPicDetails: { ...this.state.secondaryPicDetails, [name]: value },

					  });
				  }else if(name === 'secondaryPicContactNumber'||name === 'secondaryPicIc'||name === 'secondaryPicContactFixedNo' && checkValNumeric){
					  this.setState({
						  secondaryPicDetails: { ...this.state.secondaryPicDetails, [name]: value },

					  });
				  }


				break;
			default:
				break;
		}
	}
	validateMultipleEmailsCommaSeparated(seperator, name, value) {
	 if (value !== null && value !== '') {
	 var result = value.split(seperator);
	 for (var i = 0; i < result.length; i++) {
	 if (result[i] !== '') {
	 if (!this.validateEmail1(result[i])) {
		this.setState({ validateResult: {
							status: 'FAILURE',
							message:'Please check,\'' + result[i] + '\' email addresses not valid!'
		} });
	 return false;}
	 }
	 }
	 }
	 this.setState({ validateResult: {status: 'SUCCESS'}});
	 return true;
}
	validateMultipleEmailsCommaSeparatedPICEmail = (seperator, name, value) => {
		if (value !== null && value !== '') {
	 var result = value.split(seperator);

	 for (var i = 0; i < result.length; i++) {
	 if (result[i] !== '') {
	 if (!this.validateEmail1(result[i])) {
		this.setState({ validateResult: {
							status: 'FAILURE',
							message:'Please check,\'' + result[i] + '\' email addresses not valid!'
		} });
	 return false;
	 }
	 }
	 }
	 if(result.length>5){
		this.setState({ validateResult: {
							status: 'FAILURE',
							message:'Maximum Email ids entered for PIC Email should be less than 5'
		} })
		 return false;
	 }}
	 this.setState({ validateResult: {status: 'SUCCESS'}})
	 return true;
	 }
	

	validateEmail1(field) {
	 var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
	 return (regex.test(field)) ? true : false;
	}
	
	useSameAddress = () => {
		if (this.state.useBillingAddress) {
			// just toggle it off
			this.setState({
				useBillingAddress: !this.state.useBillingAddress,
				deliveryAddress: {
					...this.state.deliveryAddress,
					address1:'' ,
					address2: '',
					postCodeHint: '',
					postCode: '',
					city: '',
					state: '',
				}
			});
		} else {
			// use same address and copy
			this.setState({
				useBillingAddress: !this.state.useBillingAddress,
				deliveryAddress: {
					...this.state.deliveryAddress,
					address1: this.state.billingAddress.address1,
					address2: this.state.billingAddress.address2,
					postCodeHint: this.state.billingAddress.postCodeHint,
					postCode: this.state.billingAddress.postCode,
					city: this.state.billingAddress.city,
					state: this.state.billingAddress.state,
				}
			});
		}
	}

	render() {
		let { billingAddress, deliveryAddress, picDetails,secondaryPicDetails, useBillingAddress, validateResult, showDimmer } = this.state;
		let { brn, orderCategory, selectedVSN, allPostCodes, companyName } = this.props;
		let { custBrnNo, brnInfo,masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName,totalMembers,totalMemberString,lineCount, maxLineCount,prodCatName,groupName}=this.props.registrationDetails;
		return (
			<Container fluid>
				<PleaseWait active={showDimmer} />
				<Navigation index={3} group={groupName} />
				<Segment basic style={{ padding: 0, margin: 0, flex: 1 }}>
					<Form size='small'>
						<Grid style={{ paddingLeft: 10, paddingTop: 20, paddingBottom: 0 }}>
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
						</Grid>
						<Grid style={{ paddingLeft: 25, paddingTop: 0 }}>
							<Grid.Row >
								<Grid.Column style={{ paddingLeft: 0, paddingTop: 5, paddingBottom: 0 }}>
									<label className='heading' style={{ color: '#293895' }}>Address</label>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<AddressDetailsComp
							data={billingAddress}
							postCodes={[]}
							allPostCodes={allPostCodes}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('BILLING', name, value)}
							type='BILLING' />

						<Grid>
							<Grid.Row style={{ paddingBottom: 5, paddingTop: 10, paddingLeft: 10 }}>
								<Grid.Column width={16}>
									<Checkbox
										label={<label style={{ fontSize: 13 }}>Use the same address as above</label>}
										checked={useBillingAddress}
										onChange={this.useSameAddress} />
								</Grid.Column>
							</Grid.Row>
						</Grid>

						<DeliveryDetails
							data={deliveryAddress}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('DELIVERY', name, value)}
							validateMultipleEmailsCommaSeparated=
												{(name, value) => this.validateMultipleEmailsCommaSeparated(';', name, value)}
							isAlphaNumeric={(name, value) => this.isAlphaNumeric(name, value)}
							/>

						<AddressDetailsComp
							data={deliveryAddress}
							postCodes={[]}
							allPostCodes={allPostCodes}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('DELIVERY', name, value)}
							validateMultipleEmailsCommaSeparatedPICEmail=
												{(name, value) => this.validateMultipleEmailsCommaSeparatedPICEmail(';', name, value)}
							type='DELIVERY'/>

							<SecondaryPICDetails data={secondaryPicDetails}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('SecondaryPIC', name, value)}
							validateMultipleEmailsCommaSeparatedPICEmail=
							{(name, value) => this.validateMultipleEmailsCommaSeparatedPICEmail(';', name, value)}
							isAlphaNumeric={(name, value) => this.isAlphaNumeric(name, value)}
							/>

						<PicDetails data={picDetails}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('PIC', name, value)} 
							validateMultipleEmailsCommaSeparatedPICEmail=
												{(name, value) => this.validateMultipleEmailsCommaSeparatedPICEmail(';', name, value)}
							validateMultipleEmailsCommaSeparated=
												{(name, value) => this.validateMultipleEmailsCommaSeparated(';', name, value)}					
												/>
						{
							(this.state.validateResult.status === 'FAILURE') &&
							<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
								onDismiss={() => this.setState({ validateResult: {} })}>
								<Message.Header>We have encounted an error.</Message.Header>
								<p>{(this.state.validateResult.message)}</p>
							</Message>
						}
					</Form>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
		allPostCodes: state.configuration.data.postCodeHint,
		billingAddress: state.order.data.brnInfo.addrInfo.billingAddress,
		deliveryAddress: state.order.data.brnInfo.addrInfo.deliveryAddress,
		picDetails: state.order.data.brnInfo.addrInfo.picDetails,
		companyName: state.order.data.brnInfo.portalCustInfo.companyName,
		brn: state.order.data.brn,
		orderCategory: state.order.data.orderCategory,
		selectedVSN: state.order.data.selectedVSN,
		SET_ADDRESS_CONTACT_DETAILS_STATUS: state.order.meta.SET_ADDRESS_CONTACT_DETAILS_STATUS,
		easMasterRegId:state.order.data.registrationDetails.masterRegId,
		registrationDetails: state.order.data.registrationDetails,
		groupName:state.order.data.registrationDetails.groupName,
		secondaryPicDetails: state.order.data.brnInfo.addrInfo.secondaryPicDetails,
	}
}

const mapDispatchToProps = {
	setAddressContactDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressContactDetails)
