import React from 'react';
import { Grid, Input, Icon } from "semantic-ui-react";

const DeliveryDetails = ({ mode,data, validateResult,validateMultipleEmailsCommaSeparated, handleChange,isAlphaNumeric}) => {

    return (
        <Grid style={{ paddingBottom:0,paddingTop:5,paddingLeft: 10 }}>
           <Grid.Row style={{ paddingBottom:5,paddingTop:10 }}>
                <Grid.Column><label className='heading' style={{ color: '#293895' }}>Delivery Address</label> </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid.Column width={2} style={{ paddingTop: 0, paddingRight: 0 }}>
                    Primary Contact Name
                    {(validateResult.status === 'FAILURE' && validateResult.missingContactName) && <Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>
                    <Input placeholder='Primary Contact Name'
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        value={data.contactName}
                        name='contactName' fluid 
                        disabled = {mode==='Approval'}/>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={2} style={{ paddingTop: 0 }}>
                    Primary Contact IC
                    {(validateResult.status === 'FAILURE' && validateResult.missingContactIC) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={4}>
                    <Input
                    placeholder='Primary Contact IC'
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        value={data.contactIC} name='contactIC' fluid
                        disabled = {mode==='Approval'}
                        onBlur = {(e) => isAlphaNumeric(e.target.name,e.target.value)} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid.Column width={2} style={{ paddingRight: 0, paddingTop: 0 }}>
                    Primary Contact Phone No
                    {(validateResult.status === 'FAILURE' && validateResult.missingContactPhoneNo) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5} >
                    <Input
                        placeholder='601XXXX'
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        value={data.contactPhoneNo} 
                        name='contactPhoneNo' fluid 
                        disabled = {mode==='Approval'}/>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={2} style={{ paddingTop: 0, paddingRight: 0 }}>
                    Primary Contact Fix No
                    {(validateResult.status === 'FAILURE' && validateResult.missingContactFixNo) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={4}>
                    <Input
                        placeholder='Primary Contact Fix No'
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        value={data.contactFixNo} name='contactFixNo' fluid
                        disabled = {mode==='Approval'} />
                </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid.Column width={2} style={{ paddingTop: 0, paddingRight: 0 }}>
                    Primary Contact Email
                    {(validateResult.status === 'FAILURE' && validateResult.missingPrimaryContactEmail) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>
                    <Input
                        placeholder='Primary Contact Email'
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        onBlur = {(e) => validateMultipleEmailsCommaSeparated(e.target.name,e.target.value)}
                        value={data.contactEmail} name='contactEmail' fluid
                        disabled = {mode==='Approval'} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )


}

export default DeliveryDetails;