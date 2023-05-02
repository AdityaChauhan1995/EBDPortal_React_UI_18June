import React from 'react';
import { Grid, Input, Icon,TextArea } from "semantic-ui-react";

const SecondaryPICDetails = ({mode, data, validateResult, handleChange ,validateMultipleEmailsCommaSeparatedPICEmail,validateMultipleEmailsCommaSeparated,isAlphaNumeric}) => {
console.log('data',data)
    return (
        <Grid style={{ paddingBottom:0,paddingTop:10,paddingLeft: 10 }} >
            <Grid.Row style={{ paddingBottom:5 ,paddingTop:5}} >

            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid.Column width={2} style={{ paddingTop: 0 }}>
                Secondary Contact Name

                </Grid.Column>
                <Grid.Column width={5}>

                    <Input
                        name='secondaryPicName'
                        placeholder='Secondary Contact Name'
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        value={data.secondaryPicName} fluid
                        disabled = {mode==='Approval'} />

                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={2} style={{ paddingTop: 0 }}>
                Secondary Contact IC
                {((data.secondaryPicName !== null ||data.secondaryPicName !== undefined || data.secondaryPicName !== '') && validateResult.status === 'FAILURE' && validateResult.missingSecondaryPicIc) && <Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={4}>

                    <Input
                        name='secondaryPicIc'
                        placeholder='Secondary Contact IC'
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        value={data.secondaryPicIc}  fluid
                        disabled = {mode==='Approval'}  
                        onBlur = {(e) => isAlphaNumeric(e.target.name,e.target.value)}/>

                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid.Column width={2} style={{ paddingTop: 0 }}>
                Secondary Contact PhoneNo
                {(validateResult.status === 'FAILURE' && validateResult.missingSecondaryPicContactNumber) && <Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>

                    <Input
                        type='number'
                        placeholder='6012XXX'
                        name='secondaryPicContactNumber'
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        value={data.secondaryPicContactNumber} fluid
                        disabled = {mode==='Approval'} />

                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={2} style={{ paddingTop: 0 }} >
                    Secondary Contact Fixed No

                </Grid.Column>
                <Grid.Column width={4}>

                    <Input
                        type='number'
                        name='secondaryPicContactFixedNo'
                        placeholder='Secondary Contact Fixed No'
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        value={data.secondaryPicContactFixedNo} fluid
                        disabled = {mode==='Approval'} />

                </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid.Column width={2} style={{ paddingTop: 0 }} >
                    Secondary Contact Mail
                {(validateResult.status === 'FAILURE' && validateResult.missingSecondaryPicEMail) && <Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>

                    <Input
                        placeholder='Secondary Contact Mail'
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        onBlur = {(e) => validateMultipleEmailsCommaSeparatedPICEmail(e.target.name,e.target.value)}
                        value={data.secondaryPicEMail}
                        name='secondaryPicEMail' fluid
                        disabled = {mode==='Approval'} />

                </Grid.Column>
            </Grid.Row>
        </Grid>
    )


}

export default SecondaryPICDetails;
