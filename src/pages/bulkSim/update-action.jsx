import React, { Component } from "react";
import { Modal, Header, Segment, Icon, Grid, Message,Input,Dropdown,Checkbox } from 'semantic-ui-react';
import { PrimaryButton } from '../../components/common/buttons';
import { performVasRuleCheck } from '../../redux/actions/configuration';

class UpdateAction extends Component {
	constructor(props) {
		super(props);

		this.state = {
			statusList:[],
			bulkUsers:[],
			open: false,
			bulkRegId:'',
			msisdnChecked:false,
			msisdn:'',
			simType:'',
			newSimNo:'',
			reason:'',
			suspensionRequired:false,
			validationResult: {
				status: 'SUCCESS',
				message: '',
			  },
		}
	}

	show(msisdn,statusList,bulkUsers) {
		this.setState({ 
			msisdnToEdit:msisdn,
			statusList:statusList,
			bulkUsers:bulkUsers,
			open: true })
	}

	update = () =>{
		const { msisdn, simType, newSimNo, reason,msisdnToEdit,suspensionRequired,validateStatus,message} = this.state;
		if(msisdn === undefined || msisdn===null ||  msisdn ===""){
           this.setState({validationResult:{
			status: 'FAILURE',
			message:'MSISDN Cannot be blank'
		}});
		}
		else if(newSimNo === undefined || newSimNo===null ||  newSimNo ===""){
			this.setState({validationResult:{
			 status: 'FAILURE',
			 message:'SIM No Cannot be blank'
		 }});
		 }
		 else if(simType === undefined || simType===null ||  simType ===""){
			this.setState({validationResult:{
			 status: 'FAILURE',
			 message:'SIM TYPE Cannot be blank'
		 }});
		 }
		 else if(reason === undefined || reason===null ||  reason ===""){
			this.setState({validationResult:{
			 status: 'FAILURE',
			 message:'Reason Cannot be blank'
		 }});
		 }		
    else{
		this.props.onSave(msisdn,simType,newSimNo,reason,msisdnToEdit,suspensionRequired);
}
	}

	close = () => {
		this.setState({ open: false , msisdn:'',simType:'',newSimNo:'', reason:'' , validationResult: {}});	
	}

	dismiss = () =>{
		this.props.onDismiss()
	}

	handleChange = (e, { type, name, value, checked,key }) => {
		if (name==='msisdn') {
			this.setState({ [name]: value });
		  }
		 if(name==='simType'){
			this.setState({ [name]: value});
		}  
		if(name==='newSimNo'){
			this.setState({ [name]: value });
		}
		if(name==='reason'){
			this.setState({ [name]: value });
		}
		if(name==='suspensionRequired'){
			this.setState({ [name]: checked ,suspensionRequired: checked });
		}


	}
	render() {
		const { open, dimmer ,bulkUsers,statusList,msisdn,simType,newSimNo,reason,suspensionRequired} = this.state
		let { status, message } = this.state.validationResult;
		
		return (
			<Modal dimmer={dimmer}
				open={open}
				onClose={this.close}
				closeOnEscape={false}
				closeOnRootNodeClick={false} style={{ marginTop: 0 }}>
				<Modal.Content >
				{
                  (status === 'FAILURE') &&
                  <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
                    onDismiss={() => this.setState({ validationResult: {} })}>
                    <Message.Header></Message.Header>
                    <p>{message}</p>
                  </Message>
                }
				{
										(this.props.status=== 'SUCCESS') &&
										<Message positive compact size='small' style={{ minWidth: 400 }}
											onDismiss={this.dismiss}>
										{/* onDismiss={() => this.setState({validationResult: {}})}> */}
											<Message.Header></Message.Header>
											<p>LINE UPDATED SUCCESSFULLY</p>
										</Message>
									}

{
										(this.props.status=== 'FAILURE') &&
										<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
											onDismiss={this.dismiss}>
											{/* onDismiss={() => this.setState({validationResult: {}})}> */}
											<Message.Header></Message.Header>
											<p>LINE UPDATION FAILED</p>
										</Message>
									}
					<Grid style={{ height: 300, overflow: 'auto' }}>
						
						<Grid.Row>
						<Grid.Column width={6}>
								<label className='heading' >Mobile No</label>
								<label className='heading'>(6012×××××××)</label>
								<Input placeholder='MSISDN'
                                                type ='Number'
												fluid
												name='msisdn'
												value={msisdn}
												onChange={this.handleChange} />

							</Grid.Column>
							<Grid.Column width={6}>
								<label className='heading' >SIM TYPE</label>
								<Dropdown placeholder='Please select' 
								size='small' 
								selection options={bulkUsers} 
								onChange={this.handleChange} 
								value={simType} 
								name='simType' 
								fluid />

							</Grid.Column>
								
                            </Grid.Row>
							<Grid.Row style={{ padding: 0, paddingTop: 0}}>
							<Grid.Column width={6}>
								<label className='heading' >New SIM No</label>
								<Input placeholder='New SIM No' 
								fluid name="newSimNo" 
								value={newSimNo} 
								onChange={this.handleChange} 
								/>

							</Grid.Column>
							<Grid.Column width={6}>
								<label className='heading' >SIM Replacement Reason</label>
								<Dropdown placeholder='Please select' 
								size='small' 
								selection options={statusList} 
								onChange={this.handleChange} 
								value={reason} 
								name='reason' 
								fluid />

							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ padding: 0, paddingTop: 0}}>
						<Grid.Column width='4' style={{ paddingTop: 5, paddingLeft: 5 }}>
						<label className='heading' >Suspend Upon Fulfilment</label>
						<Checkbox style={{ padding: 5 }} onClick={this.handleChange} name='suspensionRequired' checked={suspensionRequired} />
						</Grid.Column>
                        </Grid.Row>

					</Grid>
				</Modal.Content>
				<Modal.Actions>
					<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
						<PrimaryButton value='Update' onClick={this.update} />
						<div style={{ padding: 20 }} />
						<PrimaryButton value='Cancel' onClick={this.close} />
					</Segment>
				</Modal.Actions>
			</Modal>
		)
	}
}

export default UpdateAction