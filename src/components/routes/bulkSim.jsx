import React from "react";
import { Route } from 'react-router-dom';
import BulkSimSubmission from '../../pages/bulkSim/bulkSimSubmission';
import BulkRegistration from '../../pages/bulkSim/bulkRegistration';
import StatusUpdation from '../../pages/bulkSim/statusUpdation';
const BulkSim = ({...props}) =>{
    return(
        <React.Fragment>
            <Route exact path={`${props.match.url}/bulk-sim-submission`} component={BulkSimSubmission}/>
            <Route path={`${props.match.url}/bulk-registration`} component={ BulkRegistration }/>
            <Route path={`${props.match.url}/status-updation`} component={ StatusUpdation }/>
        </React.Fragment>

    )
    
}
export default BulkSim;

