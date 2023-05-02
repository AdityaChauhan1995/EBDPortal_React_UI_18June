import React from "react";
import { Route } from 'react-router-dom';
import ProductOrderDealerSearch from '../../pages/dealerSearch/product-order-dealer-search';

const TradePartnerSearch  = ({...props}) => {
	return (
			<React.Fragment>
		        <Route exact path={`${props.match.url}/product-order-dealer-search`} component={ProductOrderDealerSearch} />
			</React.Fragment>
		)
}

export default TradePartnerSearch;


