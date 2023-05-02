import React from "react";
import { Route } from 'react-router-dom';
import SearchCorpAccount from '../../pages/searchCorp/searchCorpAccount';


const SearchFlow = ({...props}) => {
	return (
		 <React.Fragment>
	        <Route exact path={`${props.match.url}/searchCorpAccount`} component={SearchCorpAccount} />
    	 </React.Fragment>
	)
}

export default SearchFlow;