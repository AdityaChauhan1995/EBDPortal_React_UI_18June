import React, { Component } from "react";
import { Modal, Grid, Input, Segment, Message } from 'semantic-ui-react';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';


class FundOverride extends Component {
	constructor(props) {
	  super(props);
	  this.state = { 
	  	open: false,
	  	deviceFund:{},
	  	overrideFund:'',
	  	status:'DEFAULT',
	  	message:''
	  }
	}
	show(deviceFund){
		this.setState({deviceFund, open: true })
	}
	close = () => {
		const {overrideFund, deviceFund} = this.state;
		if(parseFloat(overrideFund)<=parseFloat(deviceFund.maxFundAmount) && 
		   parseFloat(overrideFund)>=parseFloat(deviceFund.minFundAmount)
		  )
		{
			this.props.onClose(deviceFund,parseFloat(overrideFund));
			this.setState({ open: false })
		}
		else{
				let message="Min Amount: "+deviceFund.minFundAmount+" Max Amount: "+deviceFund.maxFundAmount;
				this.setState({ status: 'FAILURE', message: message })
		}
		
	}
	checkIsNumeric= (value) => {
		if(value !== undefined && value !== null && value !== ''){
			var regex = /^[0-9]+$/;
			return (regex.test(value)) ? true:false;
		}else{
			return true;
		}
		
	}
	handleChange = (e, { name, value }) => {
		if(name ==='overrideFund')
		{
			var checkIsNumeric=this.checkIsNumeric(value);
			if(checkIsNumeric)
			this.setState({[name]: value});
		}
		else{
		this.setState({[name]: value});
		}
	}

	reset = () => {
		this.setState({overrideFund: ''})
	}
	componentDidMount(){

	}
	// 
	render(){
		const { open, dimmer, overrideFund, status, message} = this.state
	  	return(	  		
	  		<Modal dimmer={dimmer} 
	  			open={open} 
	  			onClose={this.close} 
	  			closeOnEscape={false}
          		closeOnRootNodeClick={false} style={{marginTop:0}}>
	          <Modal.Header style={{fontSize:13}}>
	          	<label style={{color:'#4E4E4E'}}>Override Fund Amount</label>
	          </Modal.Header>
	          <Modal.Content style={{minHeight: 100}}>
	          			{
	          			(status==='FAILURE')&&
	          			<Message negative compact size='small' style={{minWidth: 400, marginLeft: 10}} onDismiss={()=>this.setState({status: 'DEFAULT'})}>

	          				<Message.Header>Allowed limit for Override Device fund  Amount is:</Message.Header>
	          				<p>{message}</p>
	          			</Message>
	          			}
	          			<Grid>
	          				<Grid.Row>
	          					<Grid.Column width='8'>	
	          						<label>Contract</label>
	          					</Grid.Column>
	          					<Grid.Column width='8'>
	          						{this.state.deviceFund.contractName}
	          					</Grid.Column>
	          				</Grid.Row>
	          				<Grid.Row>
	          					<Grid.Column width='8'>	
	          						<label>Current Fund Amount(RM)</label>
	          					</Grid.Column>
	          					<Grid.Column width='8'>
	          						{this.state.deviceFund.fundAmount}
	          					</Grid.Column>
	          				</Grid.Row>
	          				<Grid.Row>
	          					<Grid.Column width='8'>	
	          						<label>Override Fund Amount(RM)</label>
	          					</Grid.Column>
	          					<Grid.Column width='8'>
	          						<Input type='text' placeholder='Enter Amount' value={overrideFund} name='overrideFund' onChange={this.handleChange} />
	          					</Grid.Column>
	          				</Grid.Row>
	          			</Grid>
	          </Modal.Content>
	          <Modal.Actions>
	            
				<Segment basic  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:20}}>
					<SecondaryButton value='RESET' onClick={this.reset}/>
					<div style={{padding:20}}/>
					<PrimaryButton value='SAVE' onClick={this.close}/>
				</Segment>

	          </Modal.Actions>
	        </Modal>
	  	)
	  }
}


export default FundOverride
