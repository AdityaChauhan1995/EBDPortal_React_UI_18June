import React from "react";
import { Route } from 'react-router-dom';
import RegistrationType from '../../pages/view/registration-type';
import CompanyInformation from '../../pages/view/company-information'
import AddressContactDetails from '../../pages/view/address-contact-details'
import Submission from '../../pages/view/submission'
import ProductOrder from '../../pages/view/product-order'
import DeviceFund from '../../pages/view/device-fund'
import ProductOrderCombinedSubsidy from '../../pages/view/product-order-combinedSubsidy'
import ProductOrderOBS from '../../pages/view/product-order-obs'

const ViewFlow = ({...props}) => {
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
    	 </React.Fragment>
	)
}

export default ViewFlow;
