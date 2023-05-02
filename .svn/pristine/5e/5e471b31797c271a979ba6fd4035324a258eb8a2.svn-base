import React from 'react';
import { Grid, Input, Icon,TextArea } from "semantic-ui-react";

const PICDetails = ({mode, data, validateResult, handleChange ,validateMultipleEmailsCommaSeparatedPICEmail,validateMultipleEmailsCommaSeparated}) => {

    return (
        <Grid style={{ paddingBottom:0,paddingTop:10,paddingLeft: 10 }} >
            <Grid.Row style={{ paddingBottom:5 ,paddingTop:5}} >
                <Grid.Column><label className='heading' style={{ color: '#293895' }}>PIC Details</label> </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                    PIC Name
                    {(validateResult.status === 'FAILURE' && validateResult.missingPicName)&&<Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>
                
                    <Input 
                        name='picName'
                        placeholder='PIC Name' 
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        value={data.picName} fluid
                        disabled = {mode==='Approval'} />

                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>

                <Grid.Column width={3} style={{ paddingTop: 6 }}>
                    PIC Contact Number
                    {(validateResult.status === 'FAILURE' && validateResult.missingPicContactNo)&&<Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column style={{ marginTop: '-5px', marginLeft: '-30px', width: "225px" }}>

                    <Input 
                        type='number'
                        name='picContactNumber'
                        placeholder='PIC Contact Number' 
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        value={data.picContactNumber}  fluid
                        disabled = {mode==='Approval'} />

                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 5 }}>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                    PIC Email
                    {(validateResult.status === 'FAILURE' && validateResult.missingPicEmail) && <Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>

                    <Input 
                        placeholder='PIC Email' 
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        onBlur = {(e) => validateMultipleEmailsCommaSeparatedPICEmail(e.target.name,e.target.value)}
                        value={data.picEMail} 
                        name='picEMail' fluid
                        disabled = {mode==='Approval'} />

                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 5 }}>
                <Grid.Column width={2} >
                    Notification Email
                    {(validateResult.status === 'FAILURE' && validateResult.missingNotificationEmail) && <Icon style={{ paddingLeft: 2 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>

                    <TextArea 
                        name='notificationEmail'
                        placeholder='Notification Email' cols="35" rows="5" 
                        onChange={(e, { name, value }) => handleChange(name, value)}
                        onBlur = {(e) => validateMultipleEmailsCommaSeparated(e.target.name,e.target.value)}
                        value={data.notificationEmail}
                        disabled = {mode==='Approval'} />

                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 5 }}>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={8}>
                    <label style={{ opacity: 0.5 }}>
                        Note: Please use semicolon(;) as a saparator for entering multiple email ids
                </label>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )


}

export default PICDetails;