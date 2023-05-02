import React from "react";
import { Route } from 'react-router-dom';
import RegistrationType from '../../pages/resubmission/registration-type';
import CompanyInformation from '../../pages/resubmission/company-information'
import AddressContactDetails from '../../pages/resubmission/address-contact-details'
import Submission from '../../pages/resubmission/submission'
import ProductOrder from '../../pages/resubmission/product-order'
import DeviceFund from '../../pages/resubmission/device-fund'
import PostSubmission from '../../pages/resubmission/post-submission'
import ProductOrderCombinedSubsidy from '../../pages/resubmission/product-order-combinedSubsidy'
import ProductOrderOBS from '../../pages/resubmission/product-order-obs'

const ReSubmissionFlow = ({...props}) => {
	return (
		 <React.Fragment>
	          	<Route path={`${props.match.url}/registration-type`} component={RegistrationType} />
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

export default ReSubmissionFlow;
