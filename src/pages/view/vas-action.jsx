import React, { Component } from "react";
import { Modal, Grid,  Segment, Table, Checkbox, Radio } from 'semantic-ui-react';
import { PrimaryButton } from '../../components/common/buttons';


class VasAction extends Component {
	constructor(props) {
	  super(props);
	  this.state = { 
	  	open: false,
	  	status:'DEFAULT',
	  	message:'',
	  	vasList:[],
	  	ratePlanName:'',
	  	mobileNo:'',
	  	commonList:[],
	  	uncommonList:[],
	  	type:'',
	  	isPendingActionDone:false,
	  	disabled:false,
	  	prematurePenalty:false,
	  	validationResult: {
	  		status: 'SUCCESS',
	  		message: '',
	  	},
	  	regType:''
	  }
	}
	show(vasList, msisdnNo, ratePlanName, commonList, uncommonList, type, prematurePenalty, regType  ){
			this.setState({vasList:vasList, ratePlanName:ratePlanName , mobileNo:msisdnNo, 
			commonList:commonList, uncommonList:uncommonList, type:type, isPendingActionDone:false, disabled:true,validationResult:{},prematurePenalty:prematurePenalty,open: true, regType: regType })
	}
	close = () => {
		this.setState({ open: false })
	}

	componentDidMount(){

	}
	// 
// 
	render(){
		const { open, dimmer, vasList, ratePlanName,  mobileNo, commonList, uncommonList, type, disabled, prematurePenalty, regType } = this.state
		let { status, message } = this.state.validationResult;
	  	return(	  		
	  		<Modal dimmer={dimmer} 
	  			open={open} 
	  			onClose={this.close} 
	  			closeOnEscape={false}
          		closeOnRootNodeClick={false} style={{marginTop:0}}>
	          <Modal.Header style={{fontSize:13}}>
	          	<label style={{color:'#4E4E4E'}}>VAS/Contract -Add/Remove/Keep Action</label>
	          </Modal.Header>
	          <Modal.Content style={{minHeight: 100}}>
	          			<Grid style={{ height: 400, overflow: 'auto' }}>
	          				<Grid.Row>
	          					<Grid.Column width='8'>	
	          						<label style={{color:'#293895'}} className='heading'>Mobile No:</label>
	          					</Grid.Column>
	          					<Grid.Column width='8'>
	          						<label>{mobileNo}</label>
	          					</Grid.Column>
	          				</Grid.Row>
	          				<Grid.Row>
	          					<Grid.Column width='8'>	
	          						<label style={{color:'#293895'}} className='heading'>Ordered Rate Plan:</label>
	          					</Grid.Column>
	          					<Grid.Column width='8'>
	          						<label>{ratePlanName}</label>
	          					</Grid.Column>
	          				</Grid.Row>
	          				<Grid.Row>
	          					<Grid.Column width='8'>	
	          						<label style={{color:'#293895'}} className='heading'>{regType === 'Contract Renewal'?'New Contract':'VAS Ordered'}</label>
	          					</Grid.Column>
	          				</Grid.Row>
	          				<Grid.Row style={{paddingTop:0}}>
	          								<Grid.Column width='16'>
	          									    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
	          										    <Table.Header>
	          										      <Table.Row>
	          										        <Table.HeaderCell style={{paddingLeft:0}}>No</Table.HeaderCell>
	          										        <Table.HeaderCell>Package</Table.HeaderCell>
	          										        <Table.HeaderCell>Component</Table.HeaderCell>
	          										      </Table.Row>
	          										    </Table.Header>
	          										    <Table.Body style={{height:150}}>
	          										    	{vasList.map((vasList,key) => {          
	          							              				return (
	          													      <Table.Row key={key}>
	          													        <Table.Cell style={{paddingLeft:0}}>{key+1}</Table.Cell>
	          													        <Table.Cell></Table.Cell>
	          													        <Table.Cell>{vasList.componentDesc}</Table.Cell>
	          														   </Table.Row>
	          													    )
	          												    })
	          											    }
	          										    </Table.Body>
	          										  </Table>
	          								</Grid.Column>	
	          				</Grid.Row>
	          				{(commonList!== null) && 
	          					<React.Fragment>
	          					<Grid.Row>
	          						<Grid.Column width='8'>	
	          							<label style={{color:'#293895'}} className='heading'>{regType === 'Contract Renewal'?'Existing Contracts':'Existing VAS and Contract -Allowed for carry over'}</label>
	          						</Grid.Column>
	          					</Grid.Row>
	          					<Grid.Row style={{padding:0, paddingBottom:10}}>
	          						<Grid.Column width='14' style={{padding:0}} textAlign='right'>	
	          						<label style={{color:'#293895', fontSize: 12 }}  className='heading'>Penalty Contract Premature Waiver (Not applicable for K2/Zerolution/Femtocell)</label>
	          						</Grid.Column>
	          						<Grid.Column width='2' style={{padding:0, paddingLeft:10}}>	
	          							<Checkbox onClick={this.handleCheckboxChange} name='prematurePenalty' value={prematurePenalty} checked={prematurePenalty} disabled={disabled}/>
	          						</Grid.Column>
	          					</Grid.Row>
		          				<Grid.Row style={{paddingTop:0}}>
		          								<Grid.Column width='16'>
		          									    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
		          										    <Table.Header>
		          										      <Table.Row>
		          										        <Table.HeaderCell style={{paddingLeft:0}}>No</Table.HeaderCell>
		          										        <Table.HeaderCell>Product Type</Table.HeaderCell>
		          										        <Table.HeaderCell>Package</Table.HeaderCell>
		          										        <Table.HeaderCell>Product Name</Table.HeaderCell>
		          										        <Table.HeaderCell>Contract Info</Table.HeaderCell>
		          										        <Table.HeaderCell>Action</Table.HeaderCell>
		          										      </Table.Row>
		          										    </Table.Header>
		          										    <Table.Body style={{height:150}}>
		          										    	{commonList.map((lineCommonList,key) => {          
		          							              				return (
		          													      <Table.Row key={key}>
		          													        <Table.Cell style={{paddingLeft:0}}>{key+1}</Table.Cell>
		          													        <Table.Cell>{lineCommonList.productType}</Table.Cell>
		          													        <Table.Cell>{lineCommonList.packageDesc}</Table.Cell>
		          													        <Table.Cell>{lineCommonList.componentDesc}</Table.Cell>
		          													        {(lineCommonList.contractInfo!==null) && 
		          													        	<Table.Cell>
		          													        		<div>Start Date:{lineCommonList.contractInfo.split(':')[0]}</div>
		          													        		<div>End Date:{lineCommonList.contractInfo.split(':')[1]}</div>
		          													        		<div>Remaining Duration:{lineCommonList.contractInfo.split(':')[2]}</div>
		          													        		<div>Penalty:{lineCommonList.contractInfo.split(':')[3]}</div>
		          													        	</Table.Cell>
		          													        }
		          													       {(lineCommonList.contractInfo===null) && 
		          													       	<Table.Cell>
		          													       		<div>Start Date:</div>
		          													       		<div>End Date:</div>
		          													       		<div>Remaining Duration:</div>
		          													       		<div>Penalty:</div>
		          													       	</Table.Cell>
		          													       }
		          													        <Table.Cell>
		          													        	  <Radio
																		            label='Keep'
																		            name={lineCommonList.radioAction}
																		            value='Keep'
																		            checked={lineCommonList.fs2Action === 'Keep'}
																		            onChange={this.handleChange}
																		            disabled={disabled}
																		          />
																		           <Radio
																		            label='Terminate'
																		            name={lineCommonList.radioAction}
																		            value='Terminate'
																		             checked={lineCommonList.fs2Action === 'Terminate'}
																		            onChange={this.handleChange}
																		             disabled={disabled}
																		          />
																		          { ( regType !== null && regType === 'Contract Renewal') &&
																		          		 <Radio
																		          		  label='Remove'
																		          		  name={lineCommonList.radioAction}
																		          		  value='Remove'
																		          		   checked={lineCommonList.fs2Action === 'Remove'}
																		          		  onChange={this.handleChange}
																		          		   disabled={disabled}
																		          		/>
																		          }
		          													        </Table.Cell>
		          														   </Table.Row>
		          													    )
		          												    })
		          											    }
		          										    </Table.Body>
		          										  </Table>
		          								</Grid.Column>	
		          				</Grid.Row>
		          				</React.Fragment>
	          				}
	          			
	          				{(uncommonList!== null && regType !== 'Contract Renewal') && 
	          					<React.Fragment>
	          					<Grid.Row>
	          						<Grid.Column width='8'>	
	          							<label style={{color:'#293895'}} className='heading'>Existing VAS and Contract -Not Allowed for carry over</label>
	          						</Grid.Column>
	          					</Grid.Row>
	          					<Grid.Row style={{paddingTop:0}}>
	          									<Grid.Column width='16'>
	          										    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
	          											    <Table.Header>
	          											      <Table.Row>
	          											        <Table.HeaderCell style={{paddingLeft:0}}>No</Table.HeaderCell>
	          											        <Table.HeaderCell>Product Type</Table.HeaderCell>
	          											        <Table.HeaderCell>Package</Table.HeaderCell>
	          											        <Table.HeaderCell>Product Name</Table.HeaderCell>
	          											        <Table.HeaderCell>Action</Table.HeaderCell>
	          											      </Table.Row>
	          											    </Table.Header>
	          											    <Table.Body style={{height:150}}>
	          											    	{uncommonList.map((lineUncommonList,key) => {          
	          								              				return (
	          														      <Table.Row key={key}>
	          														        <Table.Cell style={{paddingLeft:0}}>{key+1}</Table.Cell>
	          														        <Table.Cell>VAS</Table.Cell>
	          														        <Table.Cell>{lineUncommonList.packageName}</Table.Cell>
	          														        <Table.Cell>{lineUncommonList.vasName}</Table.Cell>
	          														       	<Table.Cell>{regType !== null && regType === 'Contract Renewal' ? 'Remove': 'Terminate' }</Table.Cell>
	          															   </Table.Row>
	          														    )
	          													    })
	          												    }
	          											    </Table.Body>
	          											  </Table>
	          									</Grid.Column>	
	          					</Grid.Row>
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


export default VasAction