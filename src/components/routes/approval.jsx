import React from "react";
import { Route } from 'react-router-dom';
import RegistrationType from '../../pages/approval/registration-type';
import CompanyInformation from '../../pages/approval/company-information'
import AddressContactDetails from '../../pages/approval/address-contact-details'
import Submission from '../../pages/approval/submission'
import ProductOrder from '../../pages/approval/product-order'
import DeviceFund from '../../pages/approval/device-fund'
import PostSubmission from '../../pages/approval/post-submission'
import ProductOrderCombinedSubsidy from '../../pages/approval/product-order-combinedSubsidy'
import ProductOrderOBS from '../../pages/approval/product-order-obs'

const ApprovalFlow = ({...props}) => {
	return (
		 <React.Fragment>
	            <Route exact path={`${props.match.url}/registration-type`} component={RegistrationType} />
	      	    <Route path={`${props.match.url}/company-information`} component={ CompanyInformation }/>
	      	    <Route path={`${props.match.url}/address-contact-details`} component={ AddressContactDetails }/>
	      	    <Route path={`${props.match.url}/product-order`} component={ ProductOrder }/>
                <Route path={`${props.match.url}/product-order-combinedSubsidy`} component={ ProductOrderCombinedSubsidy }/>
				<Route path={`${props.match.url}/product-order-obs`} component={ ProductOrderOBS }/>
	      	    <Route path={`${props.match.url}/device-fund`} component={ DeviceFund }/>
	      	    <Route path={`${props.match.url}/order-submission`} component={ Submission }/>
	      	    <Route path={`${props.match.url}/order-submitted`} component={ PostSubmission }/>
    	 </React.Fragment>
	)
}

export default ApprovalFlow;
