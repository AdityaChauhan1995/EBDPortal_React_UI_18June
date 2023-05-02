import React from 'react';
import { Grid, Input,  Dropdown, Icon } from "semantic-ui-react";

const _search = (options, query) => {
    if (query.length >= 3) {
        var re = new RegExp(query);
        return options.filter(opt => re.test(opt.text))
    } else {
        return [];
    }

}

const addressInstallation = ({ mode,data, validateResult, postCodes, allPostCodes, handleChange, type}) => {
    return (
        <Grid style={{ paddingBottom:0,paddingTop:2,paddingLeft: 10 }} >
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }} columns={4}>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                    <label>Address 1</label>
                    {(validateResult.status === 'FAILURE' && (type === 'INSTALLATION' && validateResult.missingdeliveryaddress1)) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={6}>
                    <Input placeholder='Address Line 1'
                        value={data.address1}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        name='address1'
                        maxLength={50} fluid 
                        disabled = {mode==='Approval' || mode==='View'}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 2 }} columns={4}>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                        <label>Address 2</label>
                        {(validateResult.status === 'FAILURE' && (type === 'INSTALLATION' && validateResult.missingdeliveryaddress2)) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={6}>
                    <Input placeholder='Address Line 2'
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        value={data.address2}
                        name='address2'
                        maxLength={50} fluid 
                        disabled = {mode==='Approval' || mode==='View'}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }} columns={4}>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                    <label>Postcode Hint</label>
                        {(validateResult.status === 'FAILURE' && (type === 'INSTALLATION' && validateResult.missingPostCodeDeliveryValue)) && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />}
                </Grid.Column>
                <Grid.Column width={5}>
                    <Dropdown placeholder='Search a Postcode...'
                        selection
                        options={[{ key: 1, value: data.postCodeHint, text: data.postCodeHint }]}
                        search={(options, query) => _search(allPostCodes, query)}
                        onChange={(e, {name, value }) => handleChange(name, value)}
                        value={data.postCodeHint} name='postCodeHint' fluid 
                        disabled = {mode==='Approval' || mode==='View'}/>
                </Grid.Column>

            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 2 }} columns={4}>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                        <label>PostCode</label>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Input placeholder='postCode'
                        value={data.postCode} fluid 
                        disabled />
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                        <label>City</label>
                </Grid.Column>
                <Grid.Column width={4} style={{ paddingBottom: 0, paddingTop: 2 }}>
                    <Input placeholder='City'
                        value={data.city} fluid 
                        disabled />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0, paddingTop: 2 }} columns={4}>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                        <label>State</label>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Input placeholder='State'
                        value={data.state} fluid 
                        disabled />
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={2} style={{ paddingTop: 8 }}>
                        <label>Country</label>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Input placeholder='Country'
                        value='MALAYSIA' fluid 
                        disabled />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )


}

export default addressInstallation;
