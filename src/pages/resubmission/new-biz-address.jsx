import React, { Component } from "react";
import { Modal, Segment, Grid, Message } from 'semantic-ui-react';
import { PrimaryButton,SecondaryButton } from '../../components/common/buttons';
import AddressInstallation from '../../components/address-contact-details/installation-address'


class NewBizAddress extends Component {
    constructor(props){
        super(props);
        this.state ={
            open: false,
            validateResult: {},
            installationAddress:props.installationAddress!=null?props.installationAddress: {
                address1: '',
                address2: '',
                postCodeHint: '',
                postCode: '',
                city: '',
                state: '',
                country:''
            }
        }
    }
    show(installationAddress) {
             this.setState({
                open: true, 
            })
    };
    save = () => {
        this.setState({installationAddress:{
                                             ...this.state.installationAddress
                                            }
                                        },()=>{
                                            this.props.onSaveInsAddress(this.state.installationAddress);
                                        })
                                        
    }
	close = () => {
			//this.props.onClose(null, null, 'Invalid');
			this.setState({ open: false });
        }
        
    handleChange = (group, name, value) => {
            if(name=== 'address1'||name=== 'address2'){
                value = value.toUpperCase();
            }
            if (name === 'postCodeHint') {
                this.handlePostCodeChange(group, name, value);
                return;
            }
            switch (group) {
                case "INSTALLATION":
                if(name !== 'contactPhoneNo' && name !== 'contactFixNo')
                { 
                    this.setState({
                        installationAddress: { ...this.state.installationAddress, [name]: value }
                    });          
                }   
                break;
                default:
                    break;
            }
        }
       
        handlePostCodeChange = (group, name, value) => {
            console.log("valueas",value)
            let postCodeHint = value.split(",");
            let postCode = postCodeHint[0];
            let city = postCodeHint[1];
            let state = postCodeHint[2];
            switch (group) {
                case "INSTALLATION":
                    this.setState({
                        installationAddress: {
                            ...this.state.installationAddress,
                            postCodeHint: value,
                            postCode: postCode,
                            city: city,
                            state: state,
                            country:'MALAYSIA'
                        }
                    });
                    break;
                default:
                    break;
            }
        }

        handleClickTMPortal = () => {
            window.open('https://wholesale.tm.com.my/premium')
        }
        handleClickSACOFAPortal = () => {
            window.open('http://10.200.52.222:9090/EBDPortal/')
        }
        handleClickMAPITPortal = () => {
            window.open('http://maxis.mapit.my/login')
        }    
    render() {
        const { open, dimmer,installationAddress } = this.state;
        console.log('postcodes',this.props.allPostCodes);
		return (
           
			<Modal dimmer={dimmer}
				open={open}
				onClose={this.close}
				closeOnEscape={false}
				closeOnRootNodeClick={false} style={{ marginTop: 0 }}>
                <Modal.Header style={{fontSize: 15}}>                    
                    <label style={{color: '#4E4E4E',textAlign:'center'}}>Installation Address</label>
                </Modal.Header>
                {
					(this.props.instMessage.status==='FAILURE')&&
					<Message negative compact size='small' style={{minWidth: 400}} onDismiss={this.props.onDismiss}>
						<Message.Header>We have encountered below errors:</Message.Header>
						<p>{this.props.instMessage.message}</p>
					</Message>
					}
					{
					(this.props.instMessage.status==='SUCCESS')&&
					<Message positive compact size='small' style={{minWidth: 400}} onDismiss={this.props.onDismiss}>
						<p>{this.props.instMessage.message}</p>
					</Message>
					}
				<Modal.Content >
                    <Grid>                     
                        <AddressInstallation 
                            data={installationAddress}
							postCodes={[]}
							allPostCodes={this.props.allPostCodes}
							validateResult={this.state.validateResult}
							handleChange={(name, value) => this.handleChange('INSTALLATION', name, value)}
							type='INSTALLATION'/>
                    </Grid>
				</Modal.Content>
				<Modal.Actions>
					<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
						<PrimaryButton value='SAVE' onClick={this.save} />
						<div style={{ padding: 20 }} />
						<PrimaryButton value='CLOSE' onClick={this.close} />
					</Segment>
                    <Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
						<SecondaryButton value='TMPortal' onClick={this.handleClickTMPortal} />
						<div style={{paddingLeft: 250 }} />
						<SecondaryButton value='SACOFAPortal' onClick={this.handleClickSACOFAPortal} />
                        <div style={{ paddingLeft: 250 }} />
						<SecondaryButton value='MAPITPortal' onClick={this.handleClickMAPITPortal} />
					</Segment>
				</Modal.Actions>
			</Modal>
		)
	}
}

export default NewBizAddress