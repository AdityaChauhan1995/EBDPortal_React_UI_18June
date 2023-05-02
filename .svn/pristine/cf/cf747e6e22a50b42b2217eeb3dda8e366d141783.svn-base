import React from 'react';
import { Dimmer, Header, Icon } from 'semantic-ui-react';

export const PleaseWait = ({
    ...props
}) => {

    return (
        <Dimmer active={props.active} page={true}>
            <Header as='h4' icon inverted>
                <Icon name='spinner' loading={true} />
                Please wait, we are processing your request..
		    </Header>
        </Dimmer>
    )
}


export const FileUploadWait = ({
    ...props
}) => {

    return (
        <Dimmer active={props.active} page={true}>
            <Header as='h4' icon inverted>
                <Icon name='spinner' loading={true} />
                Please wait, your file is being uploaded
		    </Header>
        </Dimmer>
    )
}

export const ValidateMsisdn = ({
    ...props
}) => {

    return (
        <Dimmer active={props.active} page={true}>
            <Header as='h4' icon inverted>
                <Icon name='spinner' loading={true} />
                Please wait, we are validating initial line(s)..
		    </Header>
        </Dimmer>
    )
}

export const DataLoad = ({
    ...props
}) => {

    return (
        <Dimmer inverted active={props.active}>
            <Header as='h4' icon inverted>
                <Icon name='spinner' loading={true} />
                Please wait, data is being refreshed..
            </Header>
        </Dimmer>
    )
}