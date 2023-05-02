import React from "react";
import { Route } from 'react-router-dom';
import ZerolutionDevicesReport from '../../pages/report/zerolutionDevicesReport';
import AutomatedReport from '../../pages/report/automatedreport';


const ReportFlow = ({...props}) => {
	return (
		<React.Fragment>
			<Route exact path={`${props.match.url}/automatedreport`} component={AutomatedReport} />
	        <Route exact  path={`${props.match.url}/zerolutionDeviceReport`} component={ZerolutionDevicesReport} />
    	</React.Fragment>
	)
}


export default ReportFlow;
