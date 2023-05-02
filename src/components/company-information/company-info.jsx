import React from 'react';
import { Grid } from 'semantic-ui-react'

const CompanyInfo = ({ companyInfo }) => {
    return (

        <Grid style={{ padding: 0 }}>
            <Grid.Row>
                <Grid.Column width={4}><label className='heading' style={{ color: '#293895' }}>Company Information</label></Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Business Registration No.</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{companyInfo.custBrnNo}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Company Name</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{companyInfo.companyName}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Type of Companies</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{companyInfo.companyCodeName}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Nature of Business</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{companyInfo.businessName}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Number of Employees</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{companyInfo.staffStrength}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>PUC</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{companyInfo.custPuc}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Final Justification</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{companyInfo.custFinalRemark}</label>
                </Grid.Column>
            </Grid.Row>


        </Grid>


    )
}

export default CompanyInfo;