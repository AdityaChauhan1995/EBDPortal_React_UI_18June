import React, { Component } from 'react';
import {Grid, Segment, Container, Form
} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock5,StaticBlock8 } from '../../components/common/dumb-component';
import AddressDetailsComp from '../../components/address-contact-details/address-details';
import PicDetails from '../../components/address-contact-details/pic-details';
import DeliveryDetails from '../../components/address-contact-details/delivery-details';
import { connect } from 'react-redux';
import { setAddressContactDetails } from '../../redux/actions/order';
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
            tempNextUrl = url.substring(0, url.lastIndexOf("/")) + "/product-order-combinedSubsidy?mode=Approval"
    	}else if(this.props.groupName === 'Business Postpaid with Fibre Option'){
		tempNextUrl = url.substring(0, url.lastIndexOf("/")) + "/product-order-obs?mode=Approval"
        }else{
            tempNextUrl = url.substring(0, url.lastIndexOf("/")) + "/product-order?mode=Approval"
        }

        this.state = {
			nextUrl: tempNextUrl,
			processingUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
			validateResult: {},
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
			mode:'Approval',
			showDimmer: false,
			validationResult: {
			  status: 'SUCCESS',
			  message: '',
			},
		  };
	}

	next = () => {
		let tempNextURL=this.state.nextUrl;
			tempNextURL+="&action=approved&easMasterRegId="+this.props.easMasterRegId;
			this.props.history.push(tempNextURL);
	}
	processing=()=>{
		let tempNextURL=this.state.processingUrl;
		tempNextURL+="&action=processing&easMasterRegId="+this.props.easMasterRegId;
		this.props.history.push(tempNextURL);
	}

	previous = () => {
		this.props.history.goBack();
	}

	handleChange = (group, name, value) => {

	}



	render() {
		let { billingAddress, deliveryAddress, picDetails, validateResult, mode, showDimmer,secondaryPicDetails } = this.state;
		let {    allPostCodes, portalCustInfo } = this.props;
		let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo,
			easPackageName,totalMembers, maxLineCount,prodCatName,totalMemberString, groupName}=this.props.registrationDetails;

		return (
			<Container fluid>
				<PleaseWait active={showDimmer} />
				<Navigation index={3} group={groupName} />
				<Segment basic style={{ padding: 0, margin: 0, flex: 1 }}>
					<Form size='small'>
						<Grid style={{paddingLeft: 10,paddingTop: 30}}>
						 	{groupName!=='MAXIS' &&
								<StaticBlock5 custBrnNo={custBrnNo} companyName={portalCustInfo.companyName} masterRegId={masterRegId}
						 			virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={totalMemberString}
						 			maxLineCount={maxLineCount}  contactMode={contactMode} masterRegStatus={masterRegStatus}
								 	prodCatName={prodCatName}/>
							 }
							 {groupName==='MAXIS' &&
							 	<StaticBlock8
								 	custBrnNo={custBrnNo}
								 	companyName={portalCustInfo.companyName}
								 	masterRegId={masterRegId}
									masterRegStatus={masterRegStatus}
									prodCatName={prodCatName} />
								}
						</Grid>
						<Grid style={{ paddingBottom:3,paddingTop:10,paddingLeft: 10 }}>
						<Grid.Row style={{ paddingBottom:0,paddingTop:3 }}>
                			<Grid.Column><label className='heading' style={{ color: '#293895' }}>Address</label> </Grid.Column>
           				 </Grid.Row>
						</Grid>
						<AddressDetailsComp
							data={billingAddress}
							postCodes={[]}
							allPostCodes={allPostCodes}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('BILLING', name, value)}
							mode={mode} />

						<DeliveryDetails
							data={deliveryAddress}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('DELIVERY', name, value)}
							mode={mode} />

						<AddressDetailsComp
							data={deliveryAddress}
							postCodes={[]}
							allPostCodes={allPostCodes}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('DELIVERY', name, value)}
							mode={mode} />

							<SecondaryPICDetails data={secondaryPicDetails}
								validateResult={validateResult}
								handleChange={(name, value) => this.handleChange('SecondaryPIC', name, value)}
								mode={mode}
													/>

							<PicDetails data={picDetails}
							validateResult={validateResult}
							handleChange={(name, value) => this.handleChange('PIC', name, value)}
							mode={mode}/>
					</Form>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<SecondaryButton value='BACK' onClick={this.previous} />
					<div style={{ padding: 20 }} />
					<PrimaryButton value='NEXT' onClick={this.next} />
					<div style={{padding:20}}/>
					{(!this.props.orderInPMP) &&
					<SecondaryButton value='PROCESSING' onClick={this.processing}/>
					}
				</Segment>

			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		billingAddress: state.order.data.brnInfo.addrInfo.billingAddress,
		deliveryAddress: state.order.data.brnInfo.addrInfo.deliveryAddress,
		picDetails: state.order.data.brnInfo.addrInfo.picDetails,
		portalCustInfo:state.order.data.brnInfo.portalCustInfo,
		brn: state.order.data.brn,
		registrationDetails: state.order.data.registrationDetails,
		easMasterRegId:state.order.data.easMasterRegId,
		groupName:state.order.data.registrationDetails.groupName,
		orderInPMP: state.order.data.orderInPMP,
		secondaryPicDetails: state.order.data.brnInfo.addrInfo.secondaryPicDetails,
	}
};

const mapDispatchToProps = {
	setAddressContactDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressContactDetails)
