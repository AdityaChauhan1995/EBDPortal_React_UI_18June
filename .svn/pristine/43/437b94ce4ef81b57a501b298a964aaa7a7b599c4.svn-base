import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { Modal, Grid,  Segment, Table, Checkbox, Radio } from 'semantic-ui-react';
import { PrimaryButton } from '../../components/common/buttons';


class ContractInfoAction extends Component {
	constructor(props) {
	  super(props);
	  this.state = { 
	  	open: false,
	  	status:'DEFAULT',
	  	message:'',
	  	mobileNo:'',
	  	validationResult: {
	  		status: 'SUCCESS',
	  		message: '',
	  	},
		  regType:'',
		  contractInfoDataCR:[],
		  ratePlan:''
	  }
	}
	show(regType,msisdn,ratePlan,contractInfoDataCR ){
			this.setState({open: true,regType:regType,mobileNo:msisdn,ratePlan:ratePlan,contractInfoDataCR:contractInfoDataCR})
	}
	close = () => {
		this.setState({ open: false })
	}

	componentDidMount(){

	}
	
	render(){
		const { open, dimmer, regType,  mobileNo, contractInfoDataCR,ratePlan } = this.state
		let { status, message } = this.state.validationResult;

		const TableHeaderNMTContracts = () => {
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<label className='heading'>MSISDN</label>
					</Grid.Column>
					<Grid.Column width={7} style={{ paddingRight: 0 }}>
						<label className='heading'>Contract Info.</label>
					</Grid.Column>
				</Grid.Row>
			)
		}
		const TableRowNMTContracts = ({ line }) => {
			const {contractType, contractDuration, contractRemainingMonth, contractTotalPenalty, contractTotalPenaltyLeft, msisdn} = line;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{msisdn}</div>
					</Grid.Column>
					<Grid.Column width={7} style={{ paddingRight: 0 }}>
						<div>Contract: {contractType}</div>
						<div>Remaining Tenure: {contractRemainingMonth}</div>
						<div>Penalty Amount (approx): {contractTotalPenalty}</div>
					</Grid.Column>
				</Grid.Row>
			)
		}
	  	return(	  		
	  		<Modal dimmer={dimmer} 
				  open={open}
				  size={'small'} 
	  			  onClose={this.close} 
	  			  closeOnEscape={false}
          		  closeOnRootNodeClick={false} style={{marginTop:0}}>
	          <Modal.Header style={{fontSize:13}}>
	          	<label style={{color:'#4E4E4E'}}></label>
	          </Modal.Header>
	          <Modal.Content style={{minHeight: 100}}>
			  <Grid style={{ fontSize: 11, padding: 10,paddingLeft: 25 }}>
						{(contractInfoDataCR!=undefined && contractInfoDataCR!==null && contractInfoDataCR.length>0) &&
							<React.Fragment>
							<TableHeaderNMTContracts/>
							{contractInfoDataCR.map((line, key) => {
								return (
									<TableRowNMTContracts key={key} line={line}/>
								)
							})}
							</React.Fragment>
						}
						
					</Grid>
	          </Modal.Content>
	          <Modal.Actions>
				<Segment basic  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:20}}>
					<PrimaryButton value='CLOSE' onClick={this.close}/>
				</Segment>
	          </Modal.Actions>
	        </Modal>
	  	)
	  }
}


export default ContractInfoAction