import React, { Component } from "react";
import { Modal, Grid,  Segment, Table, Radio, Message, Checkbox } from 'semantic-ui-react';
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
	  	regType: ''
	  }
	}
	show(vasList, msisdnNo, ratePlanName, commonList, uncommonList, type, prematurePenalty, regType  ){
		if(type==='VIEW'){
			this.setState({vasList:vasList, ratePlanName:ratePlanName , mobileNo:msisdnNo, 
			commonList:commonList, uncommonList:uncommonList, type:type, isPendingActionDone:false, disabled:true,validationResult:{},prematurePenalty:prematurePenalty,open: true, regType:regType })
		}
		else{
			this.setState({vasList:vasList, ratePlanName:ratePlanName , mobileNo:msisdnNo, 
			commonList:commonList, uncommonList:uncommonList, type:type, isPendingActionDone:false,disabled:false,validationResult:{},prematurePenalty:prematurePenalty, open: true, regType:regType })
		}
		
	}
	close = () => {
		let{ type, commonList, mobileNo, isPendingActionDone, prematurePenalty}=this.state;
		this.props.onClose(type:type, commonList:commonList, mobileNo:mobileNo, isPendingActionDone:isPendingActionDone, prematurePenalty:prematurePenalty );
		this.setState({ open: false })
	}

	save = () => {
		let { commonList, prematurePenalty, regType }=this.state;
		let allActionChecked=true;
		let isTerminateChecked=false;
		let isRemoveChecked=false;
		commonList.filter((currentRow) => {
			if(currentRow.fs2Action===null){
				allActionChecked=false;
			}
			if(currentRow.contractInfo!==null && currentRow.fs2Action==='Terminate'){
				isTerminateChecked=true;
			}
			if(currentRow.contractInfo!==null && currentRow.fs2Action==='Remove'){
				isRemoveChecked=true;
			}
			return ;
		})
		if(!allActionChecked){
			if(regType !== null && regType === 'Contract Renewal'){
				this.setState({validationResult:{
					status:'FAILURE',
					message:'You need to choose Keep/Terminate/Remove action for all Contracts and Vas'
				}});
			}else{
				this.setState({validationResult:{
					status:'FAILURE',
					message:'You need to choose Keep/Terminate action for all Contracts and Vas'
				}});
			}
			
		}
		else{
			if(prematurePenalty){
				if(!(isTerminateChecked ||isRemoveChecked)){
					this.setState({validationResult:{status: 'FAILURE',message: 'You need to terminate atleast one contract to select premature component'},
				 		  });
					return;
				}
			}
			this.setState({validationResult:{status: 'SAVED',message: 'Data has been saved successfully'},
				 		    isPendingActionDone:true
				 		  });
		}
	}

	componentDidMount(){

	}
	handleChange = (e, { name, value }) => {
		let { commonList }=this.state;
		let rowNo=name.split('?')[1];
		let tempCommonList=commonList.map((currentRow,key)=>{
			if(key==rowNo){
				return {
					...currentRow,
					fs2Action:value
				}
			}
			return currentRow;
		})
		this.setState({ [name]: value, commonList:tempCommonList });
	}

	handleCheckboxChange = (e, { type, name, value,checked }) => {
			this.setState({ [name]: checked });
	}
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
	          				{
	          					(status === 'FAILURE') &&
	          					<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
	          						onDismiss={() => this.setState({ validationResult: {} })}>
	          						<Message.Header>We have encounted some errors.</Message.Header>
	          						<p>{message}</p>
	          					</Message>
	          				}
	          				{
	          					(status === 'SAVED') &&
	          					<Message positive compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
	          						onDismiss={() => this.setState({ validationResult: {} })}>
	          						<p>{message}</p>
	          					</Message>
	          				}
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
		          													        <Table.Cell>{regType === 'Contract Renewal'?lineCommonList.componentDesc:lineCommonList.productType}</Table.Cell>
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
		          													       {(lineCommonList.componentId!==null && lineCommonList.componentId!==undefined && lineCommonList.componentId==='42357') &&
		          													       		  <Table.Cell>
			          													        	  <Radio
																			            label='Keep'
																			            name={lineCommonList.radioAction}
																			            value='Keep'
																			            checked={lineCommonList.fs2Action === 'Keep'}
																			            disabled={true}
																			          />
																			           <Radio
																			            label='Terminate'
																			            name={lineCommonList.radioAction}
																			            value='Terminate'
																			             checked={lineCommonList.fs2Action === 'Terminate'}
																			             disabled={true}
																		          />
		          													       		</Table.Cell>
		          													       }
		          													       {(lineCommonList.componentId!==null && lineCommonList.componentId!==undefined && lineCommonList.componentId!=='42357') &&
		          													       		  <Table.Cell style={{fontSize:'1px'}}>
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
		          													       }
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
				{ (type==='PENDING ACTION' || type==='RESET ACTION') && 
					<React.Fragment>
						<PrimaryButton value='SAVE' onClick={this.save} />
						<div style={{ padding: 20 }} />
						<PrimaryButton value='CLOSE' onClick={this.close}/>
					</React.Fragment>
				}
				{ (type==='VIEW') && 
					<PrimaryButton value='CLOSE' onClick={this.close}/>
				}
				</Segment>
	          </Modal.Actions>
	        </Modal>
	  	)
	  }
}


export default VasAction
