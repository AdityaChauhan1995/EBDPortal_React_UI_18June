import React from 'react';
import { Grid } from "semantic-ui-react";


const submissionHeader = ({ header }) => {
    return (
            <Grid.Row style={{ paddingBottom: 0, paddingLeft: 0, paddingTop: 10 }}>
                <Grid.Column width='5'  >
                    <label style={{ color: '#293895' }} className='heading'>{header}</label>
                </Grid.Column>
            </Grid.Row>
    )
}

export default submissionHeader;