import React, { Component } from "react";
import { Modal, Header, Segment, Icon, Grid, Message } from 'semantic-ui-react';
import { PrimaryButton } from '../../components/common/buttons';
import { performVasRuleCheck } from '../../redux/actions/configuration';


const VASItem = ({ vas, compact, handleVASChange }) => {
	const {vasName, defaultInd, checked} = vas;
	const vasWrapper={
		border: checked?'2px solid #293895':'2px solid #4E4E4E',
		borderRadius: 5,
		height: compact?'auto':70,
		padding: 5,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	};
	const iconStyle = {
		color: '#293895'
	}
	const labelNormal = {
		color: '#4E4E4E',
		fontWeight: 'bold',
	}
	const labelSelected = {
		fontWeight: 'bold',
		color: '#293895'
	}
	return (
		<Grid.Column width={5} onClick={defaultInd==='1'?void(0):handleVASChange}>
			<Segment basic style={vasWrapper}>
				<label style={checked?labelSelected:labelNormal}>{vasName}</label>
				{checked &&<Icon style={iconStyle} name={defaultInd==='1'?'check circle':'check'}/>}				
			</Segment>
		</Grid.Column>
	)
}
const VASGroup = ({ title, vasItems, handleVASChange, compact }) => {
	return (
		<React.Fragment>
			<Grid.Row>
				<Grid.Column>
					<Header style={{ color: '#293895' }} as='h4'>{title}</Header>
				</Grid.Column>
			</Grid.Row>
			{(vasItems !== null && vasItems !=='') && vasItems.map((vasItem, rowKey) => {
					return (
						<Grid.Row key={rowKey} style={{paddingTop: 5, paddingBottom: 5}}>
							{vasItem.map((vas, colKey) => 
								<VASItem 
									key={colKey} 
									vas={vas} 
									compact={compact}
									handleVASChange={()=>handleVASChange(title, rowKey, colKey)}/>
							)}						
						</Grid.Row>
					)
				})
			}
		</React.Fragment>	
	)
}

class AddVas extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			vasOptionals: [],
			vasMandatory: [],
			vasContracts: [],
			vasIddCountries: [],
			checkedIDDCountries: [],
			checkedVAS:[],
			iddList:[],
			strVasIds:'',
			ratePlanId:''
		}
	}

	show(vasOptionals, vasMandatory, vasContracts, vasIddCountries, ratePlanId) {
		this.setState({ 
			vasOptionals: vasOptionals, 
			vasMandatory: vasMandatory, 
			vasContracts: vasContracts, 
			vasIddCountries: vasIddCountries,
			ratePlanId: ratePlanId,
			open: true })
	}

	save = () => {
		const { vasOptionals, vasIddCountries, vasContracts, vasMandatory, ratePlanId } = this.state;
		let checkedVAS = '';
		let strVasIds=null;
		for (let i = 0; i < vasMandatory.length; i++) {
			for (let j = 0; j < vasMandatory[i].length; j++) {
				if (vasMandatory[i][j].checked) {
					let vasId = vasMandatory[i][j].vasId;
					checkedVAS = [...checkedVAS, { vasId: vasId, newComponentId: vasMandatory[i][j].componentId, newPackageId: vasMandatory[i][j].packageId}];
					if(strVasIds!=null){
							strVasIds=strVasIds+','+vasId;
					}
					else{
							strVasIds=vasId;
					}
				}
			}
		}
		for (let i = 0; i < vasOptionals.length; i++) {
			for (let j = 0; j < vasOptionals[i].length; j++) {
				if (vasOptionals[i][j].checked) {
					let vasId = vasOptionals[i][j].vasId;
					checkedVAS = [...checkedVAS, { vasId: vasId, newComponentId: vasOptionals[i][j].componentId, newPackageId: vasOptionals[i][j].packageId}];
					strVasIds=strVasIds+','+vasId;
				}
			}
		}
		if(vasContracts!==null && vasContracts.length>0){
			for (let i = 0; i < vasContracts.length; i++) {
				for (let j = 0; j < vasContracts[i].length; j++) {
					if (vasContracts[i][j].checked) {
						let vasId = vasContracts[i][j].vasId;
						checkedVAS = [...checkedVAS, { vasId: vasId, newComponentId: vasContracts[i][j].componentId, newPackageId: vasContracts[i][j].packageId}];
						strVasIds=strVasIds+','+vasId;
					}
				}
			}
		}
		let iddList = [];
		for (let i = 0; i < vasIddCountries.length; i++) {
			for (let j = 0; j < vasIddCountries[i].length; j++) {
				if (vasIddCountries[i][j].checked) {
					let countryId = vasIddCountries[i][j].countryId;
					iddList = [...iddList, { countryId }];
				}
			}
		}
		this.setState({checkedVAS:checkedVAS,iddList:iddList, saveClicked:true});

		this.props.onSave(ratePlanId, strVasIds);
		//this.props.onClose(checkedVAS, iddList);
		//this.setState({ open: false });
	}

	close= () =>{
		console.log('checkedvas',this.state.checkedVAS);
		if(this.state.saveClicked){
			if(this.props.isValidVAS){
				this.props.onClose(this.state.checkedVAS, this.state.iddList, 'Valid');
				this.setState({ open: false });
			}
			else{
				this.props.onClose(null, null, 'Invalid');
				this.setState({ open: false });
			}
		}
		else{
				this.props.onClose(null, null, 'noActionPerformed');
				this.setState({ open: false });
		}
		
	}

	handleVASChange = (title, row, key) => {

		let vasItems = title==='Mandatory VAS'?this.state.vasMandatory:title==='Optional VAS'?this.state.vasOptionals:title==='Contract VAS'?this.state.vasContracts:this.state.vasIddCountries;
		vasItems[row][key].checked = !vasItems[row][key].checked;
		this.setState({
			[title==='Mandatory VAS'?'vasMandatory':title==='Optional VAS'?'vasOptionals':title==='Contract VAS'?'vasContracts':'vasIddCountries']: vasItems
		})
	}

	render() {
		const { open, dimmer, mobileNo, vasOptionals, vasMandatory, vasContracts, vasIddCountries } = this.state
		return (
			<Modal dimmer={dimmer}
				open={open}
				onClose={this.close}
				closeOnEscape={false}
				closeOnRootNodeClick={false} style={{ marginTop: 0 }}>
				<Modal.Content >
					{
					(this.props.vasRule.status==='FAILURE')&&
					<Message negative compact size='small' style={{minWidth: 400}} onDismiss={this.props.onDismiss}>
						<Message.Header>We have encountered below errors:</Message.Header>
						<p>{this.props.vasRule.message}</p>
					</Message>
					}
					{
					(this.props.vasRule.status==='SUCCESS')&&
					<Message positive compact size='small' style={{minWidth: 400}} onDismiss={this.props.onDismiss}>
						<p>{this.props.vasRule.message}</p>
					</Message>
					}
					<Grid style={{ height: 400, overflow: 'auto' }}>						
						
						<VASGroup 
							title='Mandatory VAS' 
							vasItems={vasMandatory} 
							handleVASChange={this.handleVASChange}/>

						<VASGroup 
							title='Optional VAS' 
							vasItems={vasOptionals} 
							handleVASChange={this.handleVASChange}/>

						<VASGroup 
							title='Contract VAS' 
							vasItems={vasContracts} 
							handleVASChange={this.handleVASChange}/>

						<VASGroup 
							title='IDD Countries VAS' 
							vasItems={vasIddCountries} 
							compact={true}
							handleVASChange={this.handleVASChange}/>

					</Grid>
				</Modal.Content>
				<Modal.Actions>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<PrimaryButton value='SAVE' onClick={this.save} />
					<div style={{ padding: 20 }} />
					<PrimaryButton value='CLOSE' onClick={this.close} />
				</Segment>
				</Modal.Actions>
			</Modal>
		)
	}
}

export default AddVas
