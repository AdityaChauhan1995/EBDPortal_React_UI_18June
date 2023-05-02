import React from "react";
import { Route } from 'react-router-dom';
import RegistrationType from '../../pages/submission/registration-type';
import CompanyInformation from '../../pages/submission/company-information'
import AddressContactDetails from '../../pages/submission/address-contact-details'
import Submission from '../../pages/submission/submission'
import ProductOrder from '../../pages/submission/product-order'
import DeviceFund from '../../pages/submission/device-fund'
import PostSubmission from '../../pages/submission/post-submission'
import ProductOrderCombinedSubsidy from '../../pages/submission/product-order-combinedSubsidy'
import ProductOrderOBS from '../../pages/submission/product-order-obs'


const SubmissionFlow = ({...props}) => {
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

export default SubmissionFlow;
