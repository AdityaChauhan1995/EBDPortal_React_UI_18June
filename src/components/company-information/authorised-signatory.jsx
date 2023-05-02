import React from 'react';
import { Grid } from 'semantic-ui-react'

const AuthorisedSignatory = ({ authorizeredSignatory }) => {
    return (

        <Grid style={{ padding: 0 }}>
            <Grid.Row>
                <Grid.Column width={4}><label className='heading' style={{ color: '#293895' }}>Authorized Signatory</label></Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Authorized Signatory</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{authorizeredSignatory.authName}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>No. IC or Passport</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{authorizeredSignatory.authIcNo}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Contact No.(Fixed Line)</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{authorizeredSignatory.authFixedNo}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Fax No.</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{authorizeredSignatory.authFaxNo}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Contact No.(Mobile)</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{authorizeredSignatory.authMobileNo}</label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={4}><label>Email</label></Grid.Column>
                <Grid.Column width={12}>
                    <label>{authorizeredSignatory.authEmail}</label>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default AuthorisedSignatory;