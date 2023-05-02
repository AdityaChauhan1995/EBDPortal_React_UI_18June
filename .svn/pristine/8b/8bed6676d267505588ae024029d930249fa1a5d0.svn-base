import React from "react";
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { history } from '../../redux/store/index';
import SubmissionFlow from './submission';
import ReSubmissionFlow from './resubmission';
import ApprovalFlow from './approval';
import ViewFlow from './view';
import SearchFlow from './search';
import ChangeStatusFlow from './status';
import TradePartnerSearch from './tradePartnerSearch';
import AutomatedReport from '../../pages/report/automatedreport';
import ReportFlow from './report';

import BulkSim from './bulkSim';


const routes = (    
    <Router history={history}>
        <React.Fragment>
            <Route path="/bundle/submission" component={ SubmissionFlow }/>
            <Route path="/bundle/approval" component={ ApprovalFlow }/>
            <Route path="/bundle/view" component={ ViewFlow }/>
            <Route path="/bundle/resubmission" component={ ReSubmissionFlow }/>
            <Route path="/bundle/search" component={ SearchFlow }/>
	        <Route path="/bundle/status" component={ ChangeStatusFlow }/>
            <Route path="/dealerSearch" component={ TradePartnerSearch }/>
	        <Route path="/operations/" component={ ReportFlow }/>
            <Route path="/bundle/bulkSim" component={ BulkSim }/>
        </React.Fragment>
    </Router>
)

export default routes;
