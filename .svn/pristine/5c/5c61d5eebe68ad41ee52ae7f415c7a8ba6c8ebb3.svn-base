import React, { Component } from 'react';
import { Grid, Input, Button, Checkbox, Segment, Container, Icon, Form, Dropdown, Message, Confirm } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock5 } from '../../components/common/dumb-component';
import AddVas from './add-vas';
import { connect } from 'react-redux';
import { getRegTypes, getRateplans, getSimTypes, getDonorTypes, getZerolutionDevices, getZerolutionDeviceInfo, getVasPopupData, validateLine, fetchDeviceFundContracts, performVasRuleCheck, contractCheck,checkingBccValidation } from '../../redux/actions/configuration';
import { setProductOrderInfo, setLineDetails, getFundAmount,validateOldMsidns,setProductOrderInfoPrev, getRatePlanData, setRatePlanBlank } from '../../redux/actions/order';
import { ValidateMsisdn } from '../../components/common/dimmer';
import { isChangedToRejected } from '../../helpers/utils';

const PlanSelection = ({ regTypes, ratePlans, deviceContracts, deviceContract, regType, ratePlan, handleChange, openModal, orderCategory, addOnVal, addOnLimit, onClickIncrease, onClickDecrease }) => {
	return (
		<Grid.Row >
			<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
				<Form.Field>
					<label>Type of Registration</label>
					<Dropdown placeholder='Please select' size='small' selection options={regTypes} onChange={handleChange} value={regType} name='regType' />
				</Form.Field>
			</Grid.Column>
			{(orderCategory!=='Existing Group- Add VAS' && regType !=='Contract Renewal') && (
					<Grid.Column width='6' style={{ paddingRight: 0 }}>
						<Form.Field>
							<label>Rate Plan</label>
							<Dropdown placeholder='Please select' size='small' search selection options={ratePlans} onChange={handleChange} value={ratePlan} name='ratePlan' />
						</Form.Field>
					</Grid.Column>
				)
			}
			{(orderCategory==='Existing Group- Add VAS') && (
						<Grid.Column width='6' style={{ paddingRight: 0 }}>
							<Form.Field>
								<label>Rate Plan</label>
								<Input placeholder='Rate Plan' value={ratePlan} name='ratePlan' disabled={true} />
							</Form.Field>
						</Grid.Column>
					)
			}
			{ ( regType !== 'Change Subscription' && orderCategory!=='Existing Group- Add VAS' && regType !=='Contract Renewal') && (
				<React.Fragment>
					<Grid.Column width='3' style={{ paddingRight: 0 }}>
						<Form.Field >
							<label>Device Contract</label>
							<Dropdown placeholder='Please select' size='small' selection options={deviceContracts} onChange={handleChange} value={deviceContract} name='deviceContract' fluid />
						</Form.Field>
					</Grid.Column>
					<Grid.Column width='3' style={{ paddingRight: 0 }}>
						<Form.Field style={{ paddingTop: 10 }}>
							<p></p>
							<Button compact onClick={openModal} style={{ height: 32 }}>VAS</Button>
						</Form.Field>
					</Grid.Column>
				</React.Fragment>
				)
			}
			{ ( orderCategory==='Existing Group- Add VAS' && regType === 'Member Level Add-VAS') && (
				<React.Fragment>
					<Grid.Column width='3' style={{ paddingRight: 0 }}>
						<Form.Field style={{ paddingTop: 10 }}>
							<p></p>
							<Button compact onClick={openModal} style={{ height: 32 }}>VAS</Button>
						</Form.Field>
					</Grid.Column>
				</React.Fragment>
				)
			}
			{(regType==='Group Level Add-On') && (
					<AddOnVasInfo 
						addOnVal={addOnVal}
						addOnLimit={addOnLimit} 
						onClickIncrease={onClickIncrease}
						onClickDecrease={onClickDecrease}/>
				)
			}	
		</Grid.Row>
	)
}

const DeviceInfo = ({ regType, simCardNo, simTypes, simType, mobileNumber, deviceContract, zerolutionDevices, phoneModel, handleChange, handleChangeCheckBox, contractCheck, fetchRatePlanDetails, ratePlans, ratePlan }) => {
	return (
		<React.Fragment>
			<Grid.Row style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
				{(regType === 'Normal Registration' || regType === 'MNP Port In' || regType === 'Non Member Transfer' || regType === 'Change Subscription' || regType === 'Member Transfer' || regType === 'Member Level Add-VAS' || regType === 'Contract Renewal') && (
					<Grid.Column width='3' style={{ padding: 0 }} >
						<Form.Field >
							<label>Mobile Number</label>
							<Input placeholder='Mobile Number' value={mobileNumber} name='mobileNumber' onChange={handleChange}  />
						</Form.Field>
					</Grid.Column>
				)
				}
				{( regType === 'Member Level Add-VAS') && (
					<Grid.Column width='3' style={{ paddingTop:24 }} >
						<Form.Field >
								<SecondaryButton
									compact
									value='Fetch RatePlan'
									onClick={fetchRatePlanDetails}
									/>
						</Form.Field>
					</Grid.Column>
				)
				}
				{(regType === 'Non Member Transfer' || regType === 'Member Transfer' || regType ==='Contract Renewal' ) && (
					<Grid.Column width='3' style={{ paddingTop: 24 }} >
						<Form.Field >
							<SecondaryButton
								compact
								value='Contract Check'
								onClick={contractCheck} />
						</Form.Field>
					</Grid.Column>
				)
				}
				{(regType ==='Contract Renewal') && (
						<Grid.Column width='6' style={{ paddingRight: 0 }}>
							<Form.Field>
								<label>New Contract</label>
								<Dropdown placeholder='Please select' size='small' search selection options={ratePlans} onChange={handleChange} value={ratePlan} name='ratePlan'/>
							</Form.Field>
						</Grid.Column>
					)
				}
				{(regType === 'Normal Registration' || regType === 'MNP Port In') && (
					<React.Fragment>
						<Grid.Column width='3' style={{ paddingRight: 0 }}>
							<Form.Field >
								<label>Sim Card No.</label>
								<Input placeholder='Sim Card No' value={simCardNo} onChange={handleChange} name='simCardNo'  />
							</Form.Field>
						</Grid.Column>
						<Grid.Column width='3'>
							<Form.Field >
								<label>Sim Type</label>
								<Dropdown placeholder='Sim Type' size='small' selection options={simTypes} onChange={handleChange} value={simType} name='simType' fluid />
							</Form.Field>
						</Grid.Column>
					</React.Fragment>)

				}
				{(deviceContract === 'Zerolution') && (
					<React.Fragment>
						<Grid.Column width='1' style={{ padding: 0 }}>
							<Form.Field >
								<label>Safe Device</label>
								<Checkbox style={{ padding: 5 }} onClick={handleChangeCheckBox} name='safeDevice' />
							</Form.Field>
						</Grid.Column>

						<Grid.Column width='5'>
							<Form.Field >
								<label>Phone Model</label>
								<Dropdown placeholder='Phone Model' size='small' search selection options={zerolutionDevices} onChange={handleChange} value={phoneModel} name='phoneModel' />
							</Form.Field>
						</Grid.Column>

					</React.Fragment>
				)}
			</Grid.Row>
			<Grid.Row style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
		{(regType === 'Normal Registration' || regType === 'MNP Port In' || regType === 'Non Member Transfer' || regType === 'Member Transfer' ) && 
					<Grid.Column width='16' style={{ padding: 0 }}>
						<label>*Termination of zerolution will incur remaining balance charge base upon RRP/24 x No of Remaining Installments</label>
					</Grid.Column>
				}
			</Grid.Row>
		</React.Fragment>
	)
}

const MNPInfo = ({ donorTypes, donorType, donorAccountNo, handleChange }) => {
	return (
		<Grid.Row style={{ padding: 0 }}>
			<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
				<Form.Field >
					<label>Donor</label>
					<Dropdown placeholder='Please select' size='small' selection options={donorTypes} onChange={handleChange} value={donorType} name='donorType' />
				</Form.Field>
			</Grid.Column>
			<Grid.Column width='3' style={{ paddingRight: 0 }}>
				<Form.Field >
					<label>Donor Account No</label>
					<Input placeholder='Donor Account No' value={donorAccountNo} onChange={handleChange} name='donorAccountNo' fluid  />
				</Form.Field>
			</Grid.Column>
		</Grid.Row>
	)
}

const AddOnVasInfo = ({ addOnVal,  addOnLimit, onClickIncrease, onClickDecrease}) => {
	return (
		<React.Fragment>
			<Grid.Column width={1} style={{ paddingRight: 0, paddingTop: 24 }}>
				<Button compact icon='add circle' onClick={onClickIncrease}/>
			</Grid.Column>
			<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
				<Form.Field >
					<label>Add On Vas</label>
					<Input  value={addOnVal}  name='addOnVal' disabled={true} />
				</Form.Field>
			</Grid.Column>
			<Grid.Column width={1} style={{ paddingRight: 0, paddingTop: 24 }}>
				<Button compact icon='minus circle' onClick={onClickDecrease}/>
			</Grid.Column>
		</React.Fragment>
	)
}

class ProductOrder extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			deviceContracts: [
				{ key: '0', text: 'Normal', value: 'Normal' },
				{ key: '1', text: 'Zerolution', value: 'Zerolution' },
			],
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/device-fund?mode=Resubmission",
			nextUrlAddVas: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Resubmission",
			searchStatus: '',
			todos: props.todos,
			currentPage: 1,
			todosPerPage: 10,
			lastPage: null,
			regType: props.regType,
			regTypeId: props.regTypeId,
			ratePlan: props.ratePlan,
			deviceContract: props.deviceContract,
			mobileNumber: props.mobileNumber,
			simCardNo: props.simCardNo,
			simType: props.simType,
			phoneModel: props.phoneModel,
			safeDevice: false,
			donorType: props.donorType,
			donorAccountNo: props.donorAccountNo,
			vasList: props.vasList,
			iddList: props.iddList,
			indexOfLastTodo: null,
			indexOfFirstTodo: null,
			currentTodos: null,
			pageNumbers: [],
			firstIndexCurrentPage: 1,
			status: 'SUCCESS',
			flexiFundContractTaken: props.flexiFundContractTaken,
			byodContractTaken: props.byodContractTaken,
			message: '',
			ratePlanId: props.ratePlanId,
			lineDeviceInfo: props.lineDeviceInfo,
			deviceId: '',
			msisdnList: props.msisdnList,
			showDimmer: false,
			vasRule: '',
			isValidVAS: true,
			msisdnContracts: [],
			mobileNoValidSubscriber: true,
			lineCount: props.lineCount,
			maxLineCount: props.maxLineCount,
			open: false,
			validateOldMsisdn: props.validateOldMsisdn,
			validateOldMsisdnCount:0,
			//initialTodos:[],
			counter:0,
			crpLineCount:props.crpLineCount,
			initialAddition:props.initialAddition,
			pendingOldMsisdnList:[],
			addOnVal:props.addOnVal,
			addOnLimit:props.addOnLimit,
			isaddMemberCheckValid:false,
			deviceFulfillmentoptions:props.deviceFulfillmentoptions,
			deviceFulfillment : props.deviceFulfillment,
			topupByDealer:props.topupByDealer,
			validateDevice:props.validateDevice,
			tempMaxLineCount:props.tempMaxLineCount,
			ratePlanPkgId:'',
			isActiveKenanContractPresent:false,
			activeKenanContractCount:0,
			vasIdsSelected:''
		};
		this.addVas = React.createRef();
	}
	handleClick(type) {
		let { currentPage, todos, todosPerPage } = this.state;
		if (todos.length > 0) {
			if (type === 'First') {
				currentPage = 1
			}
			else if (type === 'Next' && currentPage < Math.ceil(todos.length / todosPerPage)) {
				currentPage += 1
			}
			else if (type === 'Prev' && currentPage > 1) {
				currentPage -= 1
			}
			else if (type === 'Last') {
				currentPage = Math.ceil(todos.length / todosPerPage);
			}
			this.setState({
				currentPage: Number(currentPage),
				lastPage: Number(Math.ceil(todos.length / todosPerPage)),
				firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage + 1,
			});
		}
	}
	componentDidMount() {
		this.setState({ showDimmer: true });
		let { todos } = this.state;
		let { orderCategory, selectedVSN } = this.props;
		this.props.getRegTypes(this.props.orderCategory);
		let { masterRegId }=this.props.registrationDetails;
		if(this.props.msisdnList !== undefined && this.props.msisdnList !== null &&
			this.props.msisdnList.length >0 &&
			this.props.msisdnList[0].fulfillmentbyTradePartner == true)
		{
             this.setState({deviceFulfillment:'Fulfillment by Trade Partner'});
		}else{
			this.setState({deviceFulfillment:'Device delivery by Brightstar'});
		}
		if (orderCategory === 'Existing Group') {
			if(this.props.GET_FUND_AMOUNT_STATUS !== 'SUCCESS'){
				this.props.getFundAmount(selectedVSN,parseInt(masterRegId),'RESUBMISSION_MODE');
			}
		}
		if (todos === undefined) {
			this.setState({ todos: [] });
		}

		if(todos!== undefined && todos!==null){
			let contractCount=0;
			todos.map((currentTodo)=>{
				if(currentTodo!==null && currentTodo.isActiveKenanContractPresent){
					contractCount++;
				}
			})
			this.setState({activeKenanContractCount:contractCount})
			}
		this.setState({
			mobileNo: '',
			simCardNo: '',
			regType: '',
			ratePlan: '',
			deviceContract: '',
			simType: ''
		});
		if (this.state.validateOldMsisdn === 'PENDING' && this.state.initialAddition === false) {
			let tempCrpLineCount =this.state.crpLineCount;
			this.setState({
				showDimmer:true,
				todos: this.props.msisdnList.map(currentLine => {
					var tempLineDeviceInfo = null;
					var tempDeviceStatus = null;
					var tempByodContractTaken = false;
					var tempFlexiFundContractTaken = false;
					var tempComponentPackageInfoList = [];

					if (currentLine.lineDeviceInfo.deviceId !== null || currentLine.lineDeviceInfo.phoneModel !== null) {
						tempLineDeviceInfo = currentLine.lineDeviceInfo
					}
					if (tempLineDeviceInfo !== null) {
						tempDeviceStatus = 'Rejected'
					}
					if(currentLine.ratePlanName!==null && currentLine.ratePlanName.indexOf("BYOD") !== -1){
						tempByodContractTaken = true;
					}
					if(currentLine.pendingActionContracts.componentPackageInfoList != null){
						tempComponentPackageInfoList = currentLine.pendingActionContracts.componentPackageInfoList
					}
					if(currentLine.ratePlanName!==null && currentLine.ratePlanName.indexOf("Contract") !== -1){
						tempFlexiFundContractTaken = true;
					}
					// if(currentLine.regType==='Change Subscription'){
					// 	 tempCrpLineCount=tempCrpLineCount+1;
					// 	this.setState({crpLineCount:tempCrpLineCount});
					// }
					return {
						regId: currentLine.regId,
						regType: currentLine.regType,
						regTypeId: currentLine.regTypeId,
						deliveryNo: currentLine.deliveryNumber,
						msisdn: currentLine.mobileInfo.mobileNo,
						simNo: currentLine.mobileInfo.sim,
						simType: currentLine.mobileInfo.simType,
						donorType: currentLine.mobileInfo.donorType,
						donorAccountNo: currentLine.mobileInfo.donorAccountNo,
						ratePlan: currentLine.ratePlanName,
						lineDeviceInfo: tempLineDeviceInfo,
						lineStatus: currentLine.lineStatus,
						iddList: currentLine.iddList,
						ratePlanId: currentLine.ratplan,
						flexiFundContractTaken: tempFlexiFundContractTaken,
						topupByDealer:currentLine.topupByDealer,
						vasList: tempComponentPackageInfoList.map(temp => {
							return {
								newComponentId: temp.componentId,
								newPackageId: temp.packageId,
								vasId: temp.vasId
							}
						}),
						deviceStatus: tempDeviceStatus,
						byodContractTaken:tempByodContractTaken

					}
				}),
				
			},() =>{
					this.setState({validateOldMsisdn:'ONGOING',pendingOldMsisdnList:this.state.todos});
					if(this.state.todos.length >0){
					this.validatingOldMsisdn(this.state.todos[0]);
					}else{
						this.setState({showDimmer:false});
					}
				//this.setState({ initialTodos:this.state.todos});
			});
		}else if(this.state.validateOldMsisdn === 'PENDING' && this.state.initialAddition === true){
			this.setState({pendingOldMsisdnList:this.state.todos,validateOldMsisdn :'FAILURE',showDimmer: false});
		}



	}

	componentWillReceiveProps(nextProps) {
		if (this.props.FETCH_REG_TYPES_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_REG_TYPES_STATUS === 'SUCCESS') {
			// set configuration
			this.props.getSimTypes();
			if(this.state.validateOldMsisdn === 'SUCCESS'){
				this.setState({ showDimmer: false });
			}
		}
		else if (this.props.FETCH_SIM_TYPES_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_SIM_TYPES_STATUS === 'SUCCESS') {

		}
		else if (this.props.FETCH_VAS_POPUP_DATA_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_VAS_POPUP_DATA_STATUS === 'SUCCESS') {
			const { vasOptionals, vasIddCountries, vasContracts, vasMandatory } = nextProps;
			this.setState({ showDimmer: false });
			let checkedVAS = '';
			for (let i = 0; i < vasOptionals.length; i++) {
				for (let j = 0; j < vasOptionals[i].length; j++) {
					if (vasOptionals[i][j].checked) {
						let vasId = vasOptionals[i][j].vasId;
						checkedVAS = [...checkedVAS, { vasId: vasId, newComponentId: vasOptionals[i][j].componentId, newPackageId: vasOptionals[i][j].packageId }];
					}
				}
			}
			for (let i = 0; i < vasMandatory.length; i++) {
				for (let j = 0; j < vasMandatory[i].length; j++) {
					if (vasMandatory[i][j].checked) {
						let vasId = vasMandatory[i][j].vasId;
						checkedVAS = [...checkedVAS, { vasId: vasId, newComponentId: vasMandatory[i][j].componentId, newPackageId: vasMandatory[i][j].packageId }];
					}
				}
			}
			if (vasContracts !== null && vasContracts.length > 0) {
				for (let i = 0; i < vasContracts.length; i++) {
					for (let j = 0; j < vasContracts[i].length; j++) {
						if (vasContracts[i][j].checked) {
							let vasId = vasContracts[i][j].vasId;
							checkedVAS = [...checkedVAS, { vasId: vasId, newComponentId: vasContracts[i][j].componentId, newPackageId: vasContracts[i][j].packageId }];
						}
					}
				}
			}
			let iddList = [];
			if(vasIddCountries != null && vasIddCountries.length>0){
				for (let i = 0; i < vasIddCountries.length; i++) {
					for (let j = 0; j < vasIddCountries[i].length; j++) {
						if (vasIddCountries[i][j].checked) {
							let countryId = vasIddCountries[i][j].countryId;
							iddList = [...iddList, { countryId }];
						}
					}
				}
			}
			
			if ( this.state.deviceContract === 'Zerolution' ) {
				this.setState( { showDimmer: true} )
					this.props.getZerolutionDevices(this.state.ratePlanPkgId);
			}
			this.setState({ flexiFundContractTaken: nextProps.flexiFundContractTaken, vasList: checkedVAS, iddList: iddList, byodContractTaken: nextProps.byodContractTaken });
		}
		else if (this.props.VAS_RULE_CHECK_STATUS !== 'SUCCESS' && nextProps.VAS_RULE_CHECK_STATUS === 'SUCCESS') {
			let tempVasRule = {
				status: 'SUCCESS',
				message: 'Vas selected successfully'
			}
			this.setState({ vasRule: tempVasRule, isValidVAS: true });
		}
		else if (this.props.VAS_RULE_CHECK_STATUS !== 'FAILED' && nextProps.VAS_RULE_CHECK_STATUS === 'FAILED') {
			let tempVasRule = {
				status: 'FAILURE',
				message: nextProps.vasMessage
			}

			this.setState({ vasRule: tempVasRule, isValidVAS: false });
		}
		else if (this.props.FETCH_ZEROLUTION_DEVICE_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_ZEROLUTION_DEVICE_STATUS === 'SUCCESS') {
			this.setState({ lineDeviceInfo: nextProps.lineDeviceInfo, showDimmer: false });
		}
		else if (this.props.CONTRACT_CHECK_STATUS !== 'SUCCESS' && nextProps.CONTRACT_CHECK_STATUS === 'SUCCESS') {

			let { regType, mobileNumber} = this.state;

			let {orderCategory} = this.props;
			if(orderCategory!==undefined && orderCategory!==null && regType!==undefined && regType!==null && 
				orderCategory==='Existing Group' && regType === 'Contract Renewal'){
				let isActiveKenanContract=false;
				if( nextProps.msisdnContracts !== undefined && nextProps.msisdnContracts!==null && nextProps.msisdnContracts!==''){
					nextProps.msisdnContracts.map((currentMsisdnContract) => {
						if(currentMsisdnContract!==null && currentMsisdnContract.contractType !==null 
							&& currentMsisdnContract.contractType!==''  ){
								isActiveKenanContract=true;
						}
						
					})
				}
				this.props.getRateplans(regType, mobileNumber);
				this.setState({ mobileNoValidSubscriber: true, msisdnContracts: nextProps.msisdnContracts, showDimmer: true, isContractCheckDone: true,isActiveKenanContractPresent:isActiveKenanContract });
			
				if(regType === 'Contract Renewal'){
					let contractRemainingMonths=0;
					if( nextProps.msisdnContracts !== undefined && nextProps.msisdnContracts!==null && nextProps.msisdnContracts!==''){
					nextProps.msisdnContracts.map((currentContract) => {
						if(currentContract.contractRemainingMonth!==null){
					contractRemainingMonths = [...contractRemainingMonths, {
						contractRemainingMonths: parseInt(currentContract.contractRemainingMonth),
					}]
					}
					})
				}

				if( contractRemainingMonths!== undefined && contractRemainingMonths!==null && contractRemainingMonths!==0){
					var remainingMonth=contractRemainingMonths[0];
					if(remainingMonth.contractRemainingMonths>4){
					
						this.setState({ status:'FAILURE', message:'The MSISDN entered has remaining months greater than 4 Months, please attach document requesting for approval before submitting order', showDimmer: false	 });
					
					}
				}
				this.setState({mobileNoValidSubscriber:true, msisdnContracts:nextProps.msisdnContracts, showDimmer: false, isContractCheckDone:true,isActiveKenanContractPresent:isActiveKenanContract});
				}
				
			}else{
				this.setState({ mobileNoValidSubscriber: true, msisdnContracts: nextProps.msisdnContracts, showDimmer: false, isContractCheckDone: true });
			}
		}
		else if (this.props.CONTRACT_CHECK_STATUS !== 'FAILED' && nextProps.CONTRACT_CHECK_STATUS === 'FAILED') {
			this.setState({ status: 'FAILURE', message: 'Invalid Subscriber', showDimmer: false, mobileNoValidSubscriber: false, isContractCheckDone: true,isActiveKenanContractPresent:false});
		}
		else if (this.props.VALIDATE_LINE_STATUS !== 'SUCCESS' &&
			nextProps.VALIDATE_LINE_STATUS === 'SUCCESS') {
			let { todos, regType, mobileNumber, ratePlan, currentPage, simCardNo, simType, donorAccountNo, lineDeviceInfo,
				 donorType, flexiFundContractTaken, ratePlanId, regTypeId, vasList, iddList, byodContractTaken, crpLineCount, addOnVal,topupByDealer,isActiveKenanContractPresent} = this.state;
			let templineDeviceInfo = null;
			if (flexiFundContractTaken) {
				templineDeviceInfo = 'Device Contract'
			}
			else if (byodContractTaken) {
				templineDeviceInfo = 'BYOD Contract'
			}
			else {
				if (this.state.deviceContract === 'Zerolution') {
					templineDeviceInfo = lineDeviceInfo;
				}
				else {
					templineDeviceInfo = null;
				}
			}
			if (iddList === '') {
				iddList = [];
			}
			var tempDeviceStatus = null;
			if (this.state.deviceContract === 'Zerolution') {
				tempDeviceStatus = 'Pending Approval'
			}

			//console.log('Inside nextProps.VALIDATE_LINE_STATUS -- validateOldMsisdn',this.state.validateOldMsisdn);
			if(this.state.validateOldMsisdn !== 'ONGOING'){
				
				this.setState({
					todos: [...todos, {
						regId: '[Not Available]',
						regType: regType,
						regTypeId: regTypeId,
						deliveryNo: '',
						msisdn: mobileNumber,
						simNo: simCardNo,
						simType: simType,
						donorType: donorType,
						donorAccountNo: donorAccountNo,
						ratePlan: ratePlan,
						lineDeviceInfo: templineDeviceInfo,
						lineStatus: 'Pending Approval',
						deviceStatus: tempDeviceStatus,
						vasList: vasList,
						iddList: iddList,
						ratePlanId: ratePlanId,
						flexiFundContractTaken: flexiFundContractTaken,
						byodContractTaken: byodContractTaken,
						addOnVal: addOnVal,
						topupByDealer:topupByDealer,
						isActiveKenanContractPresent:isActiveKenanContractPresent
					}],
					firstIndexCurrentPage: currentPage,
					showDimmer: false,
					status: 'SUCCESS',
					mobileNumber: '',
					simCardNo: '',
					mobileNoValidSubscriber: true,
					msisdnContracts: [],
					isContractCheckDone: false,
					isaddMemberCheckValid:false,
					validateDevice:false
				});
				let temptodos = [...todos, {
					regId: '[Not Available]',
					regType: regType,
					regTypeId: regTypeId,
					deliveryNo: '',
					msisdn: mobileNumber,
					simNo: simCardNo,
					simType: simType,
					donorType: donorType,
					donorAccountNo: donorAccountNo,
					ratePlan: ratePlan,
					lineDeviceInfo: templineDeviceInfo,
					lineStatus: 'Pending Approval',
					deviceStatus: tempDeviceStatus,
					vasList: vasList,
					iddList: iddList,
					ratePlanId: ratePlanId,
					flexiFundContractTaken: flexiFundContractTaken,
					byodContractTaken: byodContractTaken,
					addOnVal: addOnVal,
					topupByDealer:topupByDealer,
					isActiveKenanContractPresent:isActiveKenanContractPresent
					
				}];

				if(temptodos!== undefined && temptodos!==null){
					let contractCount=0;
					temptodos.map((currentTodo)=>{
						if(currentTodo!==null && currentTodo.isActiveKenanContractPresent){
							contractCount++;
						}
					})
					this.setState({activeKenanContractCount:contractCount})
					}
				let { orderCategory }=this.props;
				if(orderCategory==='Existing Group- Add VAS'){
					this.props.setRatePlanBlank('');
				}
				if(orderCategory==='Existing Group- Add VAS' && regType=== "Member Level Add-VAS")
				{
				this.setState({ratePlan:''});
				}
				this.props.setLineDetails(temptodos, crpLineCount);
			}
			if(this.state.validateOldMsisdn === 'ONGOING'){
					this.setState({
							validateOldMsisdnCount : this.state.validateOldMsisdnCount +1
					},()=>{
						if(this.state.pendingOldMsisdnList.length > this.state.validateOldMsisdnCount)
						{
							//console.log('calling validating old msisdn list method');
						this.validatingOldMsisdn(this.state.pendingOldMsisdnList[this.state.validateOldMsisdnCount]);
						}else{
							this.props.validateOldMsidns('SUCCESS',this.state.todos);
							this.setState({ validateOldMsisdn :'SUCCESS',showDimmer:false ,pendingOldMsisdnList:'EMPTY',status:'SUCCESS'}
						);
						}
					});
					
			}

		}
		else if (this.props.VALIDATE_LINE_STATUS !== 'FAILED' &&
			nextProps.VALIDATE_LINE_STATUS === 'FAILED') {
				if(this.state.validateOldMsisdn === 'ONGOING'){
					this.setState({
						pendingOldMsisdnList:this.state.pendingOldMsisdnList.slice(this.state.validateOldMsisdnCount,this.state.pendingOldMsisdnList.length)});
					this.setState({ status: 'FAILURE', validateOldMsisdn :'FAILURE',
					 message: nextProps.validateErrorMessage+' for Msisdn: ' + this.state.pendingOldMsisdnList[this.state.validateOldMsisdnCount].msisdn , showDimmer: false });
				}
				else{
					this.setState({ status: 'FAILURE', message: nextProps.validateErrorMessage, showDimmer: false });
				}
		}
		else if (this.props.SET_PRODUCT_ORDER_STATUS !== 'SUCCESS' &&
			nextProps.SET_PRODUCT_ORDER_STATUS === 'SUCCESS') {
			// all ok to proceed
			let deivceContractInfo = [];
			if(nextProps.msisdnList != []){
			nextProps.msisdnList.map((currentMsisdn) => {
				deivceContractInfo = [...deivceContractInfo, {
					msisdn: currentMsisdn.mobileInfo.mobileNo,
					regType: currentMsisdn.regType,
					ratePlanId: currentMsisdn.ratplan,
					isFlexiFundContractTaken: currentMsisdn.flexiFundContractTaken
				}]
			})
			if(this.props.orderCategory === 'Existing Group- Add VAS'){
				let tempNextURL = this.state.nextUrlAddVas;
				tempNextURL += "&action=rejected&easMasterRegId=" + this.props.registrationDetails.masterRegId;
				this.props.history.push(tempNextURL);
			}
			else{
				this.setState({ showDimmer: true });
				this.props.fetchDeviceFundContracts({ fundDetailsParam: deivceContractInfo });
			}
			}else{
					if(this.props.orderCategory === 'Existing Group- Add VAS'){
						let tempNextURL = this.state.nextUrlAddVas;
						tempNextURL += "&action=rejected&easMasterRegId=" + this.props.registrationDetails.masterRegId;
						this.props.history.push(tempNextURL);
					}
					else{
						let tempNextURL = this.state.nextUrl;
						tempNextURL += "&action=rejected&easMasterRegId=" + this.props.registrationDetails.masterRegId;
						this.props.history.push(tempNextURL);
					}
			}
		}
		else if (this.props.FETCH_DEVICE_FUND_CONTRACTS_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_DEVICE_FUND_CONTRACTS_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false });
			  let tempNextURL = this.state.nextUrl;
			  tempNextURL += "&action=rejected&easMasterRegId=" + this.props.registrationDetails.masterRegId;
			  this.props.history.push(tempNextURL);
		}
		else if (isChangedToRejected(this.props.FETCH_DEVICE_FUND_CONTRACTS_STATUS, nextProps.FETCH_DEVICE_FUND_CONTRACTS_STATUS)) {
			this.setState({ status: 'FAILURE', message: 'Some Error occurred while fetching data' });
		}else if(this.props.SET_PRODUCT_ORDER_PREVIOUS_STATUS !== 'SUCCESS' &&
								nextProps.SET_PRODUCT_ORDER_PREVIOUS_STATUS === 'SUCCESS'){
					this.props.history.goBack();
		}
		else if(this.props.GET_ADD_ON_DATA_VSN_STATUS !== 'SUCCESS' &&
			nextProps.GET_ADD_ON_DATA_VSN_STATUS === 'SUCCESS'){
			this.setState({showDimmer:false, ratePlanId:nextProps.ratePlanId, ratePlan:nextProps.ratePlan, addOnDataBlock:nextProps.addOnDataBlock, addOnLimit:nextProps.addOnLimit, addOnVal:nextProps.addOnVal});
			if(this.state.regType=== 'Member Level Add-VAS'){
					this.props.getVasPopupData(nextProps.ratePlanId, 'Member Level Add-VAS', this.state.mobileNumber);
			}
		}
		else if(isChangedToRejected(this.props.GET_ADD_ON_DATA_VSN_STATUS, nextProps.GET_ADD_ON_DATA_VSN_STATUS)){
			this.setState({status:'FAILURE',message:nextProps.vasValidateErrorMessage , showDimmer: false});
		}
		else if(this.props.GET_BCC_VALIDATION_STATUS !== 'SUCCESS' &&
		nextProps.GET_BCC_VALIDATION_STATUS === 'SUCCESS')
		{
			let {bccValidationFailed,bccErrorMessage}=nextProps;
			if(bccValidationFailed)
			{
				this.setState({status:'FAILURE',message:bccErrorMessage , showDimmer: false});
			}
			else {
			this.props.setProductOrderInfo(this.state.regType,
			this.state.regTypeId,
			this.state.ratePlan,
			this.state.deviceContract,
			this.state.mobileNumber,
			this.state.simCardNo,
			this.state.simType,
			this.state.phoneModel,
			this.state.donorType,
			this.state.donorAccountNo,
			this.state.todos,
			this.state.msisdnList,
			this.state.ratePlanId,
			this.state.vasList,
			this.state.iddList,
			this.state.crpLineCount,
			this.state.validateDevice
		)
	}
		}
	else if(isChangedToRejected(this.props.GET_BCC_VALIDATION_STATUS, nextProps.GET_BCC_VALIDATION_STATUS)){
		this.setState({status:'FAILURE',message:nextProps.bccErrorMessage , showDimmer: false});
	}else if (this.props.FETCH_ZEROLUTION_DEVICES_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_ZEROLUTION_DEVICES_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false, phoneModel: ''	 });
		}else if (isChangedToRejected(this.props.FETCH_ZEROLUTION_DEVICES_STATUS, nextProps.FETCH_ZEROLUTION_DEVICES_STATUS)) {
			this.setState({ status:'FAILURE', message:'Error in fetching devices from server', showDimmer: false	 });
		}
	}

	validatingOldMsisdn(list) {
		let { todos, regType, mobileNumber, ratePlan,
			simCardNo, simType, donorAccountNo, donorType, deviceContract,
			flexiFundContractTaken, ratePlanId, mobileNoValidSubscriber, isContractCheckDone, byodContractTaken } = this.state;


				//console.log('list.size',list.size,list.length,list);
				regType = list.regType,
				mobileNumber = list.msisdn,
				simCardNo = list.simNo,
				simType = list.simType,
				donorType = list.donorType,
				donorAccountNo = list.donorAccountNo,
				ratePlan = list.ratePlan,
				deviceContract = list.deviceContract,
				ratePlanId = list.ratePlanId,
				flexiFundContractTaken = list.flexiFundContractTaken
				if(list.ratePlan!==null && list.ratePlan.indexOf("BYOD") !== -1){
					byodContractTaken = true;
				}

			if (ratePlan === undefined || ratePlan !== undefined && ratePlan !== null && ratePlan.trim() === '') {
				this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
				return;
			}
			if ((regType !== undefined && regType.trim() !== 'Upgrade' && regType !== null && regType.trim() !== 'Downgrade') && mobileNumber.trim() === '') {
				this.setState({ status: 'FAILURE', message: 'Msisdn is mandatory', isMsisdnMissing: true })
				return;
			}
			else if ((regType !== undefined && regType !== null && regType.trim() === 'MNP Port In' || regType.trim() === 'Normal Registration') && simCardNo.trim() === '') {
				this.setState({ status: 'FAILURE', message: 'SIM Serial Number is mandatory', isSimNoissing: true })
				return;
			}
			else if ((regType !== undefined && regType !== null && regType.trim() === 'MNP Port In' || regType.trim() === 'Normal Registration') &&
				simType !== undefined && simType.trim() === '') {
				this.setState({ status: 'FAILURE', message: 'SIM Type is mandatory', isSimTypeMissing: true })
				return;
			}
			else if ((regType !== undefined && regType !== null && regType.trim() === 'MNP Port In') && ((donorType === undefined) || (donorType !== undefined && donorType !== null && donorType.trim() === ''))) {
				this.setState({ status: 'FAILURE', message: 'Donor Type is mandatory', isDonorTypeMissing: true })
				return;
			}
			else if ((regType !== undefined && regType !== null && regType.trim() === 'MNP Port In') && donorAccountNo !== undefined && donorAccountNo !== null && donorAccountNo.trim() === '') {
				this.setState({ status: 'FAILURE', message: 'Donor Account No is mandatory', isDonorAccountNoMissing: true })
				return;
			}
		if (deviceContract === 'Zerolution' && (flexiFundContractTaken || byodContractTaken)) {
			this.setState({ status: 'FAILURE', message: 'Cannot take zerolution device with Fund Contract/ BYOD Contract', deviceContractCheckFail: true })
			return;
		}
			if (mobileNumber.trim() !== '') {
				if (mobileNumber.length < 11) {
					this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number. Length is less than 11.', isMsisdnMissing: true })
					return;
				}
				else if (mobileNumber.slice(0, 2) !== '60') {
					this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number .  Please enter a valid number that starts with 60', isMsisdnMissing: true })
					return;
				}
			}
			if (simCardNo !== null && simCardNo.trim() !== '') {
				if (simCardNo.length < 19) {
					this.setState({ status: 'FAILURE', message: 'Invalid SIM Card number. Length is less than 19.', isSimNoissing: true })
					return;
				}
			}


			if (mobileNoValidSubscriber || (regType != null || regType != '')) {
				this.setState({ showDimmer: true });
				let tempSimCardNo = null;
				let tempVSN = this.props.selectedVSN;
				if (regType === 'Non Member Transfer' || regType === 'Member Transfer' || regType === 'Contract Renewal' ) {
					tempSimCardNo = 'test';
				}
				else if(regType==='Change Subscription'){
					tempVSN = this.props.registrationDetails.virtualServiceNo;
					tempSimCardNo = 'test';
				}
				else {
					tempSimCardNo = simCardNo;
				}
				//console.log(this.props.registrationDetails.virtualServiceNo);
				//console.log(mobileNumber, tempSimCardNo, regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId);
				
				if ((this.props.orderCategory==='Existing Group' && regType ==='Contract Renewal' && ratePlanId===null) ) {
					 this.props.validateLine(mobileNumber, tempSimCardNo, regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', 0,null,  this.state.ratePlanPkgId, this.props.orderCategory);
					}else{
			   		this.props.validateLine(mobileNumber, tempSimCardNo, regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId,null,  this.state.ratePlanPkgId, this.props.orderCategory);
				}
			}
			else {
				this.setState({ status: 'FAILURE', message: 'Not a valid subscriber' });
				return;
			}

		
	  }
	
	next = () => {
		console.log("tempmaxlinecount"+ this.state.tempMaxLineCount);
		let { todos, status, lineCount, counter } = this.state;
		let { orderCategory,brn }=this.props;
		let tempDataFor48=[];
		tempDataFor48=todos.filter((currentRow)=>{
			if(currentRow.ratePlan!==null)
			return currentRow.ratePlan.includes(' 48 ')
		})
		let tempCrpLineCount=0;
		for (var i = 0; i < todos.length; i++) {
			if(todos[i].regType!== null && todos[i].regType!==undefined  && (todos[i].regType==='Change Subscription' || todos[i].regType==='Group Level Add-On' || todos[i].regType==='Member Level Add-VAS')) {
					tempCrpLineCount=tempCrpLineCount+1;
			} 
		}
		this.setState({ crpLineCount: tempCrpLineCount });
		if(todos===null || todos===undefined || todos.length===0){
			if(orderCategory==='New Group'){
				this.setState({ status: 'FAILURE', message: 'You must select mininum of 5 lines apart from offers with 48 Plan to proceed & max '+this.state.tempMaxLineCount+' lines can be selected' });
				return;
			}
			else {

			}

		}
		if (orderCategory !== undefined && orderCategory === 'New Group') {
			if ((todos.length - tempDataFor48.length < 5 || todos.length > this.state.tempMaxLineCount) && todos.length !== tempDataFor48.length) {
				this.setState({ status: 'FAILURE', message: 'You must select mininum of 5 lines apart from offers with 48 Plan to proceed & max '+this.state.tempMaxLineCount+' lines can be selected' });
				return;
			}
		}
		else if(orderCategory==='Existing Group'){
			if(todos.length!==0 && (todos.length-tempDataFor48.length-tempCrpLineCount+lineCount)<5 && counter===0){
				//console.log('todos',todos,'tempDataFor48',tempDataFor48,'tempCrpLineCount',tempCrpLineCount,'lineCount',lineCount,todos.length-tempDataFor48.length-tempCrpLineCount+lineCount);
				this.setState({ status: 'FAILURE', message: 'You must select mininum of 5 lines apart from offers with 48 Plan to proceed & max '+this.state.tempMaxLineCount+' lines can be selected', counter:1 });
				return;
			}
			if(((todos.length+lineCount-tempCrpLineCount)>this.state.tempMaxLineCount)){
				this.setState({ status: 'FAILURE', message: 'Max of '+this.state.tempMaxLineCount+' lines can be selected' });
				return;
			}
			if (todos.length === 0) {
				this.setState({ open: true });
				return;
			}
		}

		let bccLineValueList=[];
		for (var i = 0; i < todos.length; i++) {
			if((orderCategory==='New Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In' || todos[i].regType === 'Member Transfer') || 
			   (orderCategory==='Existing Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In' || todos[i].regType === 'Member Transfer' || todos[i].regType ==='Contract Renewal' )){
				let arrVasIds=[];
			  	 todos[i].vasList.map((currentVas,key)=>{
					arrVasIds.push(currentVas.vasId);
				})
				let bccLineValue={
					regType:todos[i].regType,
					msisdn :todos[i].msisdn,
					vasIds :arrVasIds
				}
				bccLineValueList.push(bccLineValue);
			}
			}
		
		let totalRequestingLine = 0;
		for (var i = 0; i < todos.length; i++) {
			if((orderCategory==='New Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In' || todos[i].regType === 'Member Transfer') || 
			   (orderCategory==='Existing Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In' || todos[i].regType === 'Member Transfer' || todos[i].regType === 'Contract Renewal'))
			   if(orderCategory==='Existing Group' && todos[i].regType ==='Contract Renewal'){
				  if(!todos[i].isActiveKenanContractPresent){
					totalRequestingLine += 1;;
				} 
			   }else{
			   totalRequestingLine += 1;;
			   }
		}

		let bccRequestData = {
			brn:brn,
			totalRequestingLine:totalRequestingLine,
			groupName:'Business Postpaid',
			
			bccLineValueList:bccLineValueList};

		let msisdnList = '';
		//console.log('Initial validateOldMsisdn', this.state.validateOldMsisdn)
		let tempValidateoldMsisdns = true;
		if(this.state.pendingOldMsisdnList !== [] && this.state.pendingOldMsisdnList.length >0 && this.state.validateOldMsisdn === 'FAILURE'){
			tempValidateoldMsisdns = false;
			//console.log('pendingOldMsisdnList',this.state.pendingOldMsisdnList);
			this.setState({validateOldMsisdn:'ONGOING',validateOldMsisdnCount:0,showDimmer:true,status:'FAILURE'},
			() => {
				//console.log(this.state.validateOldMsisdn,'validateOldMsisdnCount',this.state.validateOldMsisdnCount);
				if(this.state.pendingOldMsisdnList.length >0){
			    this.validatingOldMsisdn(this.state.pendingOldMsisdnList[0]);
			}
			});
			
		}
		//console.log(this.state.status);
		if (status === 'SUCCESS' && tempValidateoldMsisdns) {
			

			todos.map((currentLine) => {
				let tempLineDeviceInfo = null;
				if (currentLine.lineDeviceInfo === 'Device Contract') {
					tempLineDeviceInfo = null;
				}
				else if (currentLine.lineDeviceInfo === '') {
					tempLineDeviceInfo = null;
				}
				else if (currentLine.lineDeviceInfo === 'BYOD Contract') {
					tempLineDeviceInfo = null;
				}
				else {
					tempLineDeviceInfo = currentLine.lineDeviceInfo;
				}
				let fulfillmentbyTradePartner=false;
				if(this.state.deviceFulfillment === 'Fulfillment by Trade Partner') 
				{
					fulfillmentbyTradePartner=true;
				}

				msisdnList = [...msisdnList,
				{
					regId: '',
					regType: currentLine.regType,
					regTypeId: currentLine.regTypeId,
					ratplan: currentLine.ratePlanId,
					deviceContract: '',
					deliveryNumber: currentLine.deliveryNo,
					mobileInfo: { mobileNo: currentLine.msisdn, sim: currentLine.simNo, simType: currentLine.simType, donorAccountNo: currentLine.donorAccountNo, donorType: currentLine.donorType },
					lineDeviceInfo: tempLineDeviceInfo,
					contractInfo: [],
					lineStatus: currentLine.lineStatus,
					fundAmount: '',
					consumedAmount: '',
					balanceAmount: '',
					fundStatus: '',
					oldComponentList: [],
					vasList: currentLine.vasList,
					iddList: currentLine.iddList,
					flexiFundContractTaken: currentLine.flexiFundContractTaken,
					byodContractTaken: currentLine.byodContractTaken,
					topupByDealer:parseFloat(currentLine.topupByDealer),
					fulfillmentbyTradePartner:fulfillmentbyTradePartner
				}
				]
			})

			this.setState({ showDimmer: true,msisdnList:msisdnList });
			//this.props.checkingBccValidation(brn,totalRequestingLine,strVasIds);
			this.props.checkingBccValidation(bccRequestData);
		}
	}
	previous = () => {
		let {todos,crpLineCount,lineCount} = this.state;
		let { orderCategory }=this.props;
		if(orderCategory==='Existing Group- Add VAS'){
			this.props.setRatePlanBlank('');
		}
		this.props.setProductOrderInfoPrev(todos.length-crpLineCount+lineCount);
		
	}
	openModal = () => {
		let { vasOptionals, vasMandatory, vasContracts, vasIddCountries } = this.props;
		let { ratePlanId } = this.state;
		if (ratePlanId === null || ratePlanId === '') {
			this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
			return;
		}
		this.addVas.current.show(vasOptionals, vasMandatory, vasContracts, vasIddCountries, ratePlanId);
	}
	addLine = () => {
		let { todos, regType, mobileNumber, ratePlan,
			simCardNo, simType, donorAccountNo, donorType, deviceContract,
			flexiFundContractTaken, ratePlanId, mobileNoValidSubscriber, isContractCheckDone, byodContractTaken, crpLineCount, isaddMemberCheckValid,vasIdsSelected } = this.state;
		if(regType === undefined || regType === '' || regType === null){
			this.setState({ status: 'FAILURE', message: 'Please select reg type first' });
			return;
		}
		if( regType === "Member Level Add-VAS" && (mobileNumber === '' || mobileNumber === undefined || mobileNumber === null)){
			this.setState({ status: 'FAILURE', message: 'Please select msisdn first'})
			return;
		}	
		if (ratePlan === undefined || ratePlan !== undefined && ratePlan.trim() === '') {
			if(regType ==='Contract Renewal'){
				if(ratePlanId===null){
					this.setState({ ratePlanId: 0,ratePlan:'0'});
					  return;
			  }
	  
			}else{
				this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
				return;
			}
		}
		if(regType === 'Member Level Add-VAS' && !isaddMemberCheckValid){
			this.setState({status:'FAILURE',message:'You are choosing same vas which is already there, try using some other vases apart from existing ones', showDimmer: false});
			return;
		}
		if ((regType !== undefined && regType.trim() !== 'Upgrade' && regType.trim() !== 'Downgrade' && regType.trim() !== 'Group Level Add-On') && mobileNumber.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'Msisdn is mandatory', isMsisdnMissing: true })
			return;
		}
		else if (regType !== 'Group Level Add-On' && (regType !== undefined && regType.trim() === 'MNP Port In' || regType.trim() === 'Normal Registration') && simCardNo.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'SIM Serial Number is mandatory', isSimNoissing: true })
			return;
		}
		else if (regType !== 'Group Level Add-On' && (regType !== undefined &&  regType.trim() === 'MNP Port In' || regType.trim() === 'Normal Registration') &&
			simType !== undefined && simType.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'SIM Type is mandatory', isSimTypeMissing: true })
			return;
		}
		else if (regType !== 'Group Level Add-On' && (regType !== undefined && regType.trim() === 'MNP Port In') && ((donorType === undefined) || (donorType !== undefined && donorType.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Donor Type is mandatory', isDonorTypeMissing: true })
			return;
		}
		else if (regType !== 'Group Level Add-On' && (regType !== undefined && regType.trim() === 'MNP Port In') && donorAccountNo !== undefined && donorAccountNo.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'Donor Account No is mandatory', isDonorAccountNoMissing: true })
			return;
		}
		if (deviceContract === 'Zerolution' && (flexiFundContractTaken || byodContractTaken)) {
			this.setState({ status: 'FAILURE', message: 'Cannot take zerolution device with Fund Contract/ BYOD Contract', deviceContractCheckFail: true })
			return;
		}
		/*else if(){
			rate plan check
		}*/
		if (regType !== 'Group Level Add-On' && mobileNumber.trim() !== '') {
			if (mobileNumber.length < 11) {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number. Length is less than 11.', isMsisdnMissing: true })
				return;
			}
			else if (regType !== 'Group Level Add-On' && mobileNumber.slice(0, 2) !== '60') {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number .  Please enter a valid number that starts with 60', isMsisdnMissing: true })
				return;
			}
		}

		if (regType !== 'Group Level Add-On' &&  regType !=='Contract Renewal' && simCardNo.trim() !== '') {
			if (simCardNo.length < 19) {
				this.setState({ status: 'FAILURE', message: 'Invalid SIM Card number. Length is less than 19.', isSimNoissing: true })
				return;
			}
		}
		if(this.props.orderCategory!==null && this.props.orderCategory!==undefined && this.props.orderCategory!=='Existing Group- Add VAS' && regType !== 'Change Subscription' && regType !=='Contract Renewal'){
				if(deviceContract===undefined || deviceContract===null || deviceContract===''){
					this.setState({ status: 'FAILURE', message: '', isSimNoissing: true })
					return;
				}
		}
		let tempRegType='';
		console.log(regType);
		if(this.props.orderCategory==='Existing Group- Add VAS'){
		for (var i = 0; i < todos.length; i++) {
			console.log(i,todos[0].regType);
			if(i===0 && (todos[0].regType ==='Group Level Add-On' || todos[0].regType ==='Member Level Add-VAS' )){
				tempRegType=todos[0].regType;
			}
			if(regType !== 'Group Level Add-On' ){
					if (todos[i].msisdn.trim() === mobileNumber || ((todos[i].simNo !== null && todos[i].simNo !== '') && todos[i].simNo.trim() === simCardNo)) {
				                this.setState({ status: 'FAILURE', message: 'Mobile Number & SIM you have choosen is already there in the order' });
				                return;
				      } 
					if(tempRegType!==regType){
									this.setState({ status: 'FAILURE', message: 'This Type of action is not allowed. Ony one tye of registrtion is allowed for Add VAs'});
									return;
					}
			}
			else{
					if(tempRegType!==regType){
									this.setState({ status: 'FAILURE', message: 'This Type of action is not allowed. Ony one tye of registrtion is allowed for Add VAs'});
									return;
					}
					if (todos[i].regType ==='Group Level Add-On') {
				                this.setState({ status: 'FAILURE', message: 'Multiple opeartions of Vas are not allowed on Group Level Add-On registration type'});
				                return;
				    }
					else if(i>0){
						if(tempRegType!==todos[i].regType){
									this.setState({ status: 'FAILURE', message: 'This Type of action is not allowed. Ony one tye of registrtion is allowed for Add VAs'});
									return;
						}
					}
			}
		}
	}else{
			for (var i = 0; i < todos.length; i++) {
			if (todos[i].msisdn.trim() === mobileNumber || ((todos[i].simNo !== null && todos[i].simNo !== '') && todos[i].simNo.trim() === simCardNo)) {
				                this.setState({ status: 'FAILURE', message: 'Mobile Number & SIM you have choosen is already there in the order' });
				                return;
				       } 
			}
		}
		let tempSimCardNo=null;
		let tempVSN = this.props.selectedVSN;
		if(regType==='Non Member Transfer' || regType === 'Member Transfer' || regType ==='Contract Renewal'){
			if(!isContractCheckDone){
				this.setState({ status: 'FAILURE', message: 'Please click Contract Check button first' });
				return;
			}
			tempSimCardNo='test';
		}
		else if(regType==='Change Subscription'  || regType==='Group Level Add-On' || regType==='Member Level Add-VAS'){
			tempSimCardNo='test';
			let tempCrpLineCount=crpLineCount+1;
			tempVSN = this.props.registrationDetails.virtualServiceNo;
			this.setState({crpLineCount:tempCrpLineCount});
		}
		else{
			if(regType !== 'Group Level Add-On' && regType !== 'Member Level Add-VAS'){
				tempSimCardNo=simCardNo;
			}
		}
		this.setState({ showDimmer: true });
		//this.props.validateLine(mobileNumber, tempSimCardNo, regType, 'kf', this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId);
		if (mobileNoValidSubscriber) {
			this.setState({ showDimmer: true });
			console.log('vasSelected:',vasIdsSelected);
			if(vasIdsSelected==undefined || vasIdsSelected=='')
				vasIdsSelected=null;
			this.props.validateLine(mobileNumber, tempSimCardNo, regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId,vasIdsSelected, this.state.ratePlanPkgId, this.props.orderCategory);
		}
		else {
			this.setState({ status: 'FAILURE', message: 'Not a valid subscriber' });
			return;
		}
		this.setState({isContractCheckDone:false})
	}

	contractCheck = () => {
		this.setState({ status: 'SUCCESS', msisdnContracts: [], showDimmer: true });
		this.props.contractCheck(this.state.mobileNumber);
	}
	removeRow(row) {
		let { todos, currentPage, todosPerPage ,pendingOldMsisdnList,validateOldMsisdn, crpLineCount} = this.state;
		let tempToDos = null;
		let tempCrpLineCount=0;
		tempToDos= todos.filter((x) => {
			return x.msisdn !== row.msisdn
		});

		tempToDos.map((x) => {
			if(x.regType==='Change Subscription' || x.regType==='Group Level Add-On' || x.regType==='Member Level Add-VAS'){
				tempCrpLineCount=tempCrpLineCount+1;
			}		
		});
		if(tempToDos!== undefined && tempToDos!==null){
			let contractCount=0;
			tempToDos.map((currentTodo)=>{
				if(currentTodo!==null && currentTodo.isActiveKenanContractPresent){
					contractCount++;
				}
			})
			this.setState({activeKenanContractCount:contractCount})
			}
		this.setState({
			todos: tempToDos,
			firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage,
			crpLineCount:tempCrpLineCount,
			validateDevice:false
		});
		//console.log('initialTodos',initialTodos,'validateOldMsisdn',validateOldMsisdn);
		if(pendingOldMsisdnList !== [] && validateOldMsisdn === 'FAILURE'){
			this.setState({
				pendingOldMsisdnList: pendingOldMsisdnList.filter((x) => {
					return x.msisdn !== row.msisdn
				}),
			});
		}

		this.props.setLineDetails(tempToDos, tempCrpLineCount);
	}

	checkIsNumeric= (value) => {
		if(value !== undefined && value !== null && value !== ''){
			var regex = /^[0-9]+$/;
			return (regex.test(value)) ? true:false;
		}else{
			return true;
		}
		
	}
	handleDeviceFulfillment = ( name, value ) =>{
		
		if(name.includes('topupByDealer')){
			
			const tempMobileNo = name.substring(13,name.length);
			console.log('name',name,name.indexOf('topupByDealer'),name.length, name.substring(13,name.length));
			let tempTodos = this.state.todos;
			tempTodos.map((x) => {
				if(x.msisdn===tempMobileNo){
					x.topupByDealer = value;
				}		
			});
			console.log('tempTodos',tempTodos);
			this.setState({todos:tempTodos});
		}
	}
	handleChange = (e, { name, value }) => {

		let { ratePlanPkgId, ratePlan } = this.state;

		if ((name ==='mobileNumber' || name ==='simCardNo' || name ==='donorAccountNo' ) ) {
			var checkIsNumeric=this.checkIsNumeric(value);
			if(checkIsNumeric)
			this.setState({ [name]: value });
		}
		else{
			if(name ==='ratePlan'){
					if(this.state.regType!==undefined && this.state.regType!==null && this.state.regType==='Member Transfer' && this.state.mobileNumber!==undefined && (this.state.mobileNumber===null || this.state.mobileNumber==='')){
						this.setState({status:'FAILURE',message:'Please enter Msisdn No first & validate its contract check'});
						return;
					}
					else if(this.state.regType!==undefined && this.state.regType!==null && this.state.regType==='Member Transfer' && (this.state.isContractCheckDone===undefined || this.state.isContractCheckDone===false)){
						this.setState({status:'FAILURE',message:'Please click Contract Check button first'});
						return;
					}
					else if(this.state.regType!==undefined && this.state.regType!==null && this.state.regType==='Member Transfer' && this.state.mobileNoValidSubscriber===false){
						this.setState({status:'FAILURE',message:'Msisdno you entered is invalid subscriber'});
						return;
					}
			}
			this.setState({ [name]: value });
		}
		
		if (name === 'regType') {
			if(value !== 'Group Level Add-On' && value !== 'Member Level Add-VAS'){
				this.setState({ mobileNumber: '', simCardNo: '', simType: '', phoneModel: '', ratePlan: '', deviceContract: '', donor: '', donorAccountNo: '' });
				if(value !== 'Contract Renewal'){
						this.props.getRateplans(value, 'test');
				}
				let regTypeId=null;
				
				this.props.regTypes.map((currentRegType)=>{
						if(currentRegType.value===value){
							regTypeId=currentRegType.key
						}
				})
				this.setState({ ratePlanId: null, selectedVas: [], flexiFundContractTaken: false, donorAccountNo: '', donorType: '', regTypeId: regTypeId, mobileNoValidSubscriber:true, byodContractTaken:false });
				if (value === 'MNP Port In') {
					this.props.getDonorTypes();
				}
			}
			else if(value === 'Group Level Add-On'){
				this.setState({ showDimmer: true });
				this.props.getRatePlanData('0','ADD_VAS_TYPE_VSN', this.props.selectedVSN);
				let regTypeId=null;
				this.props.regTypes.map((currentRegType)=>{
						if(currentRegType.value===value){
							regTypeId=currentRegType.key
						}
				})
				this.setState({ mobileNumber: '404', simCardNo: '', simType: '', phoneModel: '', deviceContract: '', donor: '', donorAccountNo: '', regTypeId: regTypeId });
			}
			else if(value === 'Member Level Add-VAS'){
					let regTypeId=null;
					this.props.regTypes.map((currentRegType)=>{
							if(currentRegType.value===value){
								regTypeId=currentRegType.key
							}
					})
				this.setState({ mobileNumber: '', simCardNo: '', simType: '', phoneModel: '', deviceContract: '', donor: '', donorAccountNo: '', ratePlanId: '', ratePlan: '', regTypeId: regTypeId })
			}
		}
		else if (name === 'deviceContract' && value === 'Zerolution') {
			if(ratePlan.trim() === ''){
				this.setState({ status: 'FAILURE', message: 'Please select rateplan first'});
				return;
			}else{
				this.setState({showDimmer: true});
				this.props.getZerolutionDevices(ratePlanPkgId);
			}
		}
		else if (name === 'phoneModel') {
			let tempDeviceId = '';
			this.props.zerolutionDevices.map((tempZerolutionDevice) => {
				if (tempZerolutionDevice.value === value) {
					tempDeviceId = tempZerolutionDevice.key;
				}
			})
			this.setState({ deviceId: tempDeviceId })
			this.props.getZerolutionDeviceInfo(tempDeviceId, this.state.safeDevice);
		}
		else if (name === 'ratePlan') {
			this.props.ratePlans.map((rateplanRow) => {
				if (rateplanRow.value === value) {
					this.setState({ ratePlanId: rateplanRow.key, ratePlanPkgId: rateplanRow.ratePlanPkgId });
					this.setState({ showDimmer: true });
					if(this.state.regType!==undefined && this.state.regType!==null && (this.state.regType==='Member Transfer' || this.state.regType==='Contract Renewal') ){
						this.props.getVasPopupData(rateplanRow.key, this.state.regType, this.state.mobileNumber);
					}
					else{
						this.props.getVasPopupData(rateplanRow.key,'test','404');
					}
				}
			})
		}

	};
	handleChangeCheckBox = (e, { name, checked }) => {
		if (name === 'zerolutionSafeDevice') {
			this.setState({ [name]: checked, zerolutionSafeDevice: checked });
		}
		else if (name === 'safeDevice') {
			if (this.state.deviceId !== '') {
				this.setState( { showDimmer: true} );
				this.props.getZerolutionDeviceInfo(this.state.deviceId, checked);
			}
			this.setState({ [name]: checked, safeDevice: checked });
		}
	}
	select(checkedVAS, checkedIDDCountries, isVasRUleCheckValid) {
		if(isVasRUleCheckValid==='Valid'){
			console.log('Vas Rule check is valid');
			console.log(checkedVAS, checkedIDDCountries);
			if(this.state.regType==='Member Level Add-VAS' && this.state.vasList!== null && this.state.vasList !==undefined &&
			 (this.state.vasList.length=== checkedVAS.length || checkedVAS.length===0)){
				this.setState({status:'FAILURE',message:'You are choosing same vas which is already there, try using some other vases apart from existing ones', showDimmer: false});
				return;
			}
			else{
				this.setState({ vasList: checkedVAS, iddList: checkedIDDCountries, isaddMemberCheckValid:true });	
			}
		}
		else{
			console.log('Vas Rule check is not valid');
		}
		this.setState({vasRule:{}});
	}

	vasRuleCheck(ratePlanId, strVasIds) {
		this.props.performVasRuleCheck(ratePlanId, strVasIds);
		this.setState({vasIdsSelected:strVasIds})
	}
	onDismiss() {
		this.setState({ vasRule: {} });
	}
	close(proceed) {
		if (proceed === 'yes') {
			this.setState({ open: false, showDimmer: true });
			this.props.setProductOrderInfo(null,null,null,null,null,null,null,null,null,null,this.state.todos,[],null,null,null,0)
			// let tempNextURL = this.state.nextUrl;
			// tempNextURL += "&action=rejected&easMasterRegId=" + this.props.registrationDetails.masterRegId;
			// this.props.history.push(tempNextURL);

		}
		else {
			this.setState({ open: false })
		}
	};

	onClickIncrease=()=>{
		let { addOnVal, addOnLimit }=this.state;
		let tempAddOnVal=0;
		if(addOnVal<addOnLimit){
			tempAddOnVal=addOnVal+1;
			this.setState({addOnVal:tempAddOnVal});
		}
	};
	onClickDecrease=()=>{
		let { addOnVal, addOnLimit }=this.state;
		let tempAddOnVal=0;
		if(addOnVal>0){
			tempAddOnVal=addOnVal-1;
			this.setState({addOnVal:tempAddOnVal});
		}
	};
	fetchRatePlanDetails=()=>{
		let { mobileNumber }=this.state;
		if(mobileNumber.trim() === ''){
			this.setState({ status: 'FAILURE', message: 'Msisdn is mandatory', isMsisdnMissing: true })
			return;
		}
		else{
			this.setState({showDimmer: true});
			this.props.getRatePlanData(mobileNumber,'ADD_VAS_TYPE_MSISDN', this.props.selectedVSN);
		}
	};
	render() {
		let {
			todos,
			currentPage,
			todosPerPage,
			regType,
			ratePlan,
			mobileNumber,
			simCardNo,
			simType,
			phoneModel,
			deviceContracts,
			deviceContract,
			indexOfLastTodo,
			indexOfFirstTodo,
			currentTodos,
			donorType,
			firstIndexCurrentPage,
			donorAccountNo,
			status,
			message,
			showDimmer,
			vasRule,
			isValidVAS,
			msisdnContracts,
			lineCount,
			crpLineCount,
			addOnVal,
			activeKenanContractCount
		} = this.state;
		let {topupByDealer} = this.props;
		let { regTypes, ratePlans, simTypes, zerolutionDevices, donorTypes, brn, orderCategory, selectedVSN, portalCustInfo, brnInfo, addOnLimit } = this.props;
		let { custBrnNo, masterRegStatus, contactMode, virtualServiceNo, easPackageName,
			totalMembers, maxLineCount, masterReg, masterRegId, prodCatName, totalMemberString } = this.props.registrationDetails;


		if (todos === undefined) {
			todos = [];
		}
		indexOfLastTodo = currentPage * todosPerPage;
		indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
		const TableHeader = () => {
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
				{(orderCategory!=='Existing Group- Add VAS') && (
					<React.Fragment>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>Reg. Info</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>Delivery No.</label>
						</Grid.Column>
						<Grid.Column width={3} style={{ paddingRight: 0 }}>
							<label className='heading'>Mobile No.</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>Rate Plan</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>Device Info</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>VAS/Contract</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<div><label className='heading'>Line Status</label></div>
							<div><label className='heading'>Device Status</label></div>
						</Grid.Column>
						<Grid.Column width={1} style={{ paddingRight: 0 }}>

						</Grid.Column>
					</React.Fragment>
							)
				}
				{(orderCategory==='Existing Group- Add VAS') && (
					<React.Fragment>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>Reg. Info</label>
						</Grid.Column>
						<Grid.Column width={3} style={{ paddingRight: 0 }}>
							<label className='heading'>Mobile No.</label>
						</Grid.Column>
						<Grid.Column width={3} style={{ paddingRight: 0 }}>
							<label className='heading'>Rate Plan</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>VAS/Contract</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<div><label className='heading'>Line Status</label></div>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<label className='heading'>Data Add On Block</label>
						</Grid.Column>
						<Grid.Column width={1} style={{ paddingRight: 0 }}>

						</Grid.Column>
					</React.Fragment>
							)
				}
				</Grid.Row>
			)
		}
		const TableRow = ({ line }) => {
			const {regId, regType, deliveryNo, msisdn, simNo, simType, ratePlan, lineStatus, deviceStatus, donorAccountNo, donorType, addOnVal} = line;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{regId}</div>
						<div>{regType}</div>
					</Grid.Column>
					{(orderCategory!=='Existing Group- Add VAS') && (
							<React.Fragment>

							<Grid.Column width={2} style={{ paddingRight: 0 }}>
							{
								(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null) && (
										<div>{line.lineDeviceInfo.deliveryNo}</div>
									)
								}
								</Grid.Column>
								<Grid.Column width={3} style={{ paddingRight: 0 }}>
								{(regType !== 'Group Level Add-On' ) &&
									<React.Fragment>
										<div><Icon name='phone' />{msisdn}</div>
										<div><Icon name='credit card' />{simNo}</div>
										<div><Icon name='id card outline' />{simType}</div>
									</React.Fragment>
								}
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									<div>{ratePlan}</div>
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
								{
											(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>Device Model :{line.lineDeviceInfo.phoneModel}</div>
													<div style={{ margin: 0 }}>RRP(RM) :{line.lineDeviceInfo.deviceRrp}</div>
													<div style={{ margin: 0 }}>Monthly Installments(RIM) :{line.lineDeviceInfo.monthlyInstallment}</div>
													<div style={{ margin: 0 }}>No of Installments :{line.lineDeviceInfo.noOfInstallments}</div>
													{
														(line.lineDeviceInfo.isPremiumDeviceProtection==='Yes') &&
														<div style={{ margin: 0 }}>Safe Device :{line.lineDeviceInfo.safeDeviceMnthlyChrg}</div>	
													}
													{
														(line.lineDeviceInfo.isPremiumDeviceProtection!=='Yes') &&
														<div style={{ margin: 0 }}>Safe Device :{line.lineDeviceInfo.isPremiumDeviceProtection}</div>	
													}
												</React.Fragment>
											)
								}
								{
											(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined  && line.lineDeviceInfo.phoneModel === undefined) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>{line.lineDeviceInfo}</div>
												</React.Fragment>
											)
								}
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									{/*<SecondaryButton compact value='ACTION' />*/}
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									<div>{lineStatus}</div>
									<div>{deviceStatus}</div>
								</Grid.Column>
							</React.Fragment>
						)
					}
					{(orderCategory==='Existing Group- Add VAS') && (
							<React.Fragment>
								<Grid.Column width={3} style={{ paddingRight: 0 }}>
								{(regType !== 'Group Level Add-On' ) &&
									<React.Fragment>
										<div><Icon name='phone' />{msisdn}</div>
									</React.Fragment>
								}
								</Grid.Column>
								<Grid.Column width={3} style={{ paddingRight: 0 }}>
									<div>{ratePlan}</div>
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									{/*<SecondaryButton compact value='ACTION' />*/}
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									<div>{lineStatus}</div>
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
								{(regType === 'Group Level Add-On' ) && (
										<div>{addOnVal}</div>
									)
								}
								</Grid.Column>
							</React.Fragment>
						)
					}
					<Grid.Column width={1} style={{ paddingRight: 0 }}>
						<Button basic icon='trash' color='red' onClick={() => this.removeRow(line)}/>
					</Grid.Column>
				</Grid.Row>
			)
		}

		const TableHeaderNMTContracts = () => {
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<label className='heading'>MSISDN</label>
					</Grid.Column>
					<Grid.Column width={5} style={{ paddingRight: 0 }}>
						<label className='heading'>Contract Info.</label>
					</Grid.Column>
					<Grid.Column width={6} style={{ paddingRight: 0 }}>
						<label className='heading'>Exception Approval (Remaining Tenure>4months)</label>
					</Grid.Column>
				</Grid.Row>
			)
		}
		const TableRowNMTContracts = ({ line }) => {
			const { contractType, contractDuration, contractRemainingMonth, contractTotalPenalty, contractTotalPenaltyLeft, msisdn } = line;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{msisdn}</div>
					</Grid.Column>
					<Grid.Column width={5} style={{ paddingRight: 0 }}>
						<div>Contract: {contractType}</div>
						<div>Remaining Tenure: {contractRemainingMonth}</div>
						<div>Penalty Amount (approx): {contractTotalPenalty}</div>
					</Grid.Column>
					<Grid.Column width={4} style={{ paddingRight: 0 }}>
						{(contractType != null) &&
							<Checkbox style={{ padding: 5 }} />
						}
						{(contractType == null) &&
							<Checkbox style={{ padding: 5 }} disabled={true} />
						}
					</Grid.Column>
				</Grid.Row>
			)
		}
	//console.log(todos.length,crpLineCount,lineCount);
/*	alert(lineCount);
	alert(crpLineCount);
	alert(todos.length);
	alert(todos.length-crpLineCount+lineCount);*/

	const DeviceFulfillmentDrop = () => {
	 return (
		 
		    <Grid.Row >
			{ (this.props.user.isTradePartner === true||this.props.user.isTradePartner === 'true') &&(
				<React.Fragment>
					<Grid.Column width='6' style={{ paddingRight: 0 }}>
						<Form.Field >
							<label style={{fontWeight: 'bold'}}>Device Fulfillment Option</label>
							<Dropdown placeholder='Please select' size='small' selection options={this.props.deviceFulfillmentoptions} 
							          value={this.state.deviceFulfillment}
							          onChange={this.handleChange}
							          name='deviceFulfillment' fluid />
						</Form.Field>
					</Grid.Column>
				</React.Fragment>
			)}
			</Grid.Row>
	      )
		}
		
		const DeviceFulfillmentTableHeader = () => {
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
				{(this.props.user.isTradePartner === true||this.props.user.isTradePartner === 'true') &&(
					<React.Fragment>
						<Grid.Column width={14} style={{ paddingRight: 0 }}>
							<label className='heading'>Device Info</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<div><label className='heading'>Topup Price (RM)</label></div>	
						</Grid.Column>	
					</React.Fragment>
				)}
				</Grid.Row>
				)
			}
		
		const DeviceFulfillmentTableRow = ({ line }) => {
			//console.log(line.mobileInfo.mobileNo);
			var inputName = 'topupByDealer'+ line.msisdn;
			return (
				<React.Fragment>
					{((this.props.user.isTradePartner === true||this.props.user.isTradePartner === 'true') &&(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined))&&(//(line.topupByDealer!==null )&&(
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 8 }}>
				
							<Grid.Column width={14} style={{ paddingRight: 0 }}>
								{(
									line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined) && (
												<React.Fragment>
													<div><Icon name='mobile' />{line.lineDeviceInfo.phoneModel}</div>
													<div><Icon name='phone' />{line.msisdn}</div>	
												</React.Fragment>
								)}
								{(
									line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined  && line.lineDeviceInfo.phoneModel === undefined) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>{line.lineDeviceInfo}</div>
													<div><Icon name='phone' />{line.msisdn}</div>
												</React.Fragment>
								)}
								</Grid.Column>
								{(this.state.deviceFulfillment ==='Fulfillment by Trade Partner') && (
								<React.Fragment>	
								<Grid.Column width={2} style={{ paddingRight: 0}}>
								   <Input placeholder='0' type='number' 
										  defaultValue={line.topupByDealer}
										  onBlur={(e,d)=>this.handleDeviceFulfillment( e.target.name,e.target.value)}
										  style={{width:'100px',paddingLeft:'30px'}}
										  name={inputName}/>
								</Grid.Column>	
							  </React.Fragment>
							)}

                            {(this.state.deviceFulfillment ==='Device delivery by Brightstar') && (
								<React.Fragment>	
								<Grid.Column width={2} style={{ paddingRight: 0}}>
								   <Input placeholder='0' type='number' 
										  value='0.00'
										  onChange={this.handleChange}
										  style={{width:'100px',paddingLeft:'30px'}}
										  name={inputName}/>
								</Grid.Column>	
							  </React.Fragment>
							)}	
				</Grid.Row>
				)
			}
				</React.Fragment>
			)
		}
		return (
			<Container fluid>
				<ValidateMsisdn active={showDimmer} />
				<Navigation index={4} />
				<Segment basic style={{ padding: 0, paddingTop: 15, flex: 1 }}>
					<Form size='tiny'>
						<Grid style={{ paddingLeft: 10 }}>
							<StaticBlock5 custBrnNo={custBrnNo} prodCatName={prodCatName} companyName={brnInfo.portalCustInfo.companyName} masterRegId={masterRegId}
								virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={todos.length-crpLineCount+lineCount-activeKenanContractCount}
								maxLineCount={maxLineCount} masterReg={masterReg} contactMode={contactMode} masterRegStatus={masterRegStatus} />
						</Grid>
						<Grid style={{ paddingLeft: 25 }}>
							<Grid.Row style={{ paddingTop: 20 }}>
								<Grid.Column width='4' style={{ paddingLeft: 0, paddingBottm: 0 }} >
									<label style={{ color: '#293895' }} className='heading'>Business Postpaid</label>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ padding: 0 }}>
								<Grid.Column width='16' style={{ paddingLeft: 0, paddingBottm: 0 }}>
									<label style={{ color: '#4E4E4E' }} className='heading'>Mobile</label>
								</Grid.Column>
							</Grid.Row>

							<PlanSelection regTypes={regTypes}
								ratePlans={ratePlans}
								deviceContracts={deviceContracts}
								deviceContract={deviceContract}
								regType={regType}
								ratePlan={ratePlan}
								handleChange={this.handleChange}
								openModal={this.openModal}
								orderCategory={orderCategory}
								addOnVal={addOnVal}
								addOnLimit={addOnLimit} 
								onClickIncrease={this.onClickIncrease}
								onClickDecrease={this.onClickDecrease} />

							<DeviceInfo
								regType={regType}
								simCardNo={simCardNo}
								simTypes={simTypes}
								simType={simType}
								mobileNumber={mobileNumber}
								zerolutionDevices={zerolutionDevices}
								phoneModel={phoneModel}
								deviceContract={deviceContract}
								handleChange={this.handleChange}
								handleChangeCheckBox={this.handleChangeCheckBox}
								contractCheck={this.contractCheck} 
								fetchRatePlanDetails={this.fetchRatePlanDetails} 
								ratePlans={ratePlans}
								ratePlan={ratePlan}
								/>

							{regType === 'MNP Port In' &&
								<MNPInfo
									donorTypes={donorTypes}
									donotType={donorType}
									donorAccountNo={donorAccountNo}
									handleChange={this.handleChange}
								/>
							}
							<Grid.Row style={{ padding: 0 }}>
								<Grid.Column width='16' style={{ padding: 0 }}>
									{
										(status === 'FAILURE') &&
										<Message negative compact size='small' style={{ minWidth: 400 }}
											onDismiss={() => this.setState({ status: 'SUCCESS' })}>
											<Message.Header>We have encounted an error.</Message.Header>
											<p>{message}</p>
										</Message>
									}
									{
										(this.state.pendingOldMsisdnList === 'EMPTY') &&
										<Message positive compact size='small' style={{ minWidth: 400 }}
											onDismiss={() => this.setState({ pendingOldMsisdnList: [] })}>
											<Message.Header></Message.Header>
											<p>LINES VALIDATED SUCCESSFULLY</p>
										</Message>
									}
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column style={{ padding: 0 }}>
									<SecondaryButton
										compact
										value='ADD LINE'
										onClick={this.addLine} />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
					<Grid style={{ fontSize: 11, padding: 10, paddingLeft: 25 }}>
						{(msisdnContracts!=undefined && msisdnContracts!==null && msisdnContracts.length>0) &&
							<React.Fragment>
								<TableHeaderNMTContracts />
								{msisdnContracts.map((line, key) => {
									return (
										<TableRowNMTContracts key={key} line={line} />
									)
								})}
							</React.Fragment>
						}

					</Grid>
					<Grid style={{ fontSize: 11, padding: 10, paddingLeft: 25 }}>
						<Grid.Row style={{ paddingBottom: 0, paddingLeft: 0 }}>
							<Grid.Column width='8' style={{ paddingLeft: 0, opacity: 0.7 }}>
								<label>Displaying {(todos.length === 0) && (0)}{(todos.length > 0) && (firstIndexCurrentPage)}-{(firstIndexCurrentPage - 1) + currentTodos.length} / {todos.length}</label>
							</Grid.Column>
							<Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
								<label onClick={() => this.handleClick('First')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>First</label>
                                <label onClick={() => this.handleClick('Prev')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>Prev</label>
								<label onClick={() => this.handleClick('Next')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>Next</label>
								<label onClick={() => this.handleClick('Last')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>Last</label>
								<label onClick={() => this.handleClick('Last')} style={{ opacity: 0.7 }}>({(todos.length === 0) && (0)} {(todos.length > 0) && (currentPage)} of {Math.ceil(todos.length / todosPerPage)})</label>
							</Grid.Column>
						</Grid.Row>
						<TableHeader />
						{currentTodos.map((line, key) => {
							return (
								<TableRow key={key} line={line} />
							)
						})}
					</Grid>
					<Grid style={{ fontSize: 11, padding: 10, paddingLeft: 25 }}>
					<DeviceFulfillmentDrop />
                        <DeviceFulfillmentTableHeader />
						{
							currentTodos.map((line,key) => {
								return (
									<DeviceFulfillmentTableRow key={key} line={line}/>
								)
							})
						}
						</Grid>
					<Confirm
						cancelButton='NO'
						confirmButton="YES"
						open={this.state.open}
						header='Are you sure?'
						content='No Lines have been taken, would you like to continue to take Fund devices?'
						onCancel={() => this.close('no')}
						onConfirm={() => this.close('yes')} />
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<SecondaryButton value='BACK' onClick={this.previous} />
					<div style={{ padding: 20 }} />
					<PrimaryButton value='NEXT' onClick={this.next} />
				</Segment>
				<AddVas
					ref={this.addVas}
					onClose={(checkedVAS, checkedIDDCountries, isVasRUleCheckValid) => this.select(checkedVAS, checkedIDDCountries, isVasRUleCheckValid)} onSave={(ratePlanId, strVasIds) => this.vasRuleCheck(ratePlanId, strVasIds)} vasRule={vasRule} onDismiss={() => this.onDismiss()} isValidVAS={isValidVAS} />
			</Container>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		regTypes: state.configuration.data.regTypes,
		ratePlans: state.configuration.data.ratePlans,
		simTypes: state.configuration.data.simTypes,
		donorTypes: state.configuration.data.donorTypes,
		zerolutionDevices: state.configuration.data.zerolutionDevices,
		lineDeviceInfo: state.configuration.data.lineDeviceInfo,
		FETCH_ZEROLUTION_DEVICE_STATUS: state.configuration.meta.FETCH_ZEROLUTION_DEVICE_STATUS,
		SET_PRODUCT_ORDER_STATUS: state.order.meta.SET_PRODUCT_ORDER_STATUS,
		FETCH_REG_TYPES_STATUS: state.configuration.meta.FETCH_REG_TYPES_STATUS,
		regType: state.order.data.regType,
		ratePlan: state.order.data.ratePlan,
		deviceContract: state.order.data.deviceContract,
		mobileNumber: state.order.data.mobileNumber,
		simCardNo: state.order.data.simCardNo,
		simType: state.order.data.simType,
		phoneModel: state.order.data.phoneModel,
		donorType: state.order.data.donorType,
		donorAccountNo: state.order.data.donorAccountNo,
		todos: state.order.data.todos,
		crpLineCount:state.order.data.crpLineCount,
		brn: state.order.data.brn,
		orderCategory: state.order.data.registrationDetails.prodCatName,
		selectedVSN: state.order.data.selectedVSN,
		vasOptionals: state.configuration.data.vasOptionals,
		vasMandatory: state.configuration.data.vasMandatory,
		vasContracts: state.configuration.data.vasContracts,
		vasIddCountries: state.configuration.data.vasIddCountries,
		flexiFundContractTaken: state.configuration.data.flexiFundContractTaken,
		byodContractTaken: state.configuration.data.byodContractTaken,
		ratePlanId: state.order.data.ratePlanId,
		FETCH_DEVICE_FUND_CONTRACTS_STATUS: state.configuration.meta.FETCH_DEVICE_FUND_CONTRACTS_STATUS,
		msisdnList: state.order.data.msisdnList,
		portalCustInfo: state.order.data.brnInfo.portalCustInfo,
		user: state.user.data,
		validateErrorCode: state.configuration.data.validateErrorCode,
		validateErrorMessage: state.configuration.data.validateErrorMessage,
		isLineDataValid: state.configuration.data.isLineDataValid,
		VALIDATE_LINE_STATUS: state.configuration.meta.VALIDATE_LINE_STATUS,
		FETCH_VAS_POPUP_DATA_STATUS: state.configuration.meta.FETCH_VAS_POPUP_DATA_STATUS,
		FETCH_RATEPLANS_STATUS: state.configuration.meta.FETCH_RATEPLANS_STATUS,
		VAS_RULE_CHECK_STATUS: state.configuration.meta.VAS_RULE_CHECK_STATUS,
		vasMessage: state.configuration.data.vasMessage,
		vasList: state.order.data.vasList,
		iddList: state.configuration.data.iddList,
		regTypeId: state.order.data.regTypeId,
		CONTRACT_CHECK_STATUS: state.configuration.meta.CONTRACT_CHECK_STATUS,
		msisdnContracts: state.configuration.data.msisdnContracts,
		registrationDetails: state.order.data.registrationDetails,
		brnInfo: state.order.data.brnInfo,
		validateOldMsisdn: state.order.data.validateOldMsisdn,
		lineCount: state.order.data.registrationDetails.lineCount,
		initialAddition:state.order.data.initialAddition,
		easMasterRegId: state.order.data.easMasterRegId,
		SET_PRODUCT_ORDER_PREVIOUS_STATUS: state.order.meta.SET_PRODUCT_ORDER_PREVIOUS_STATUS,
		addOnDataBlock: state.order.data.addOnDataBlock,
		addOnLimit: state.order.data.addOnLimit,
		addOnVal: state.order.data.addOnVal,
		GET_ADD_ON_DATA_VSN_STATUS: state.order.meta.GET_ADD_ON_DATA_VSN_STATUS,
		vasValidateErrorMessage:state.order.data.vasValidateErrorMessage,
		deviceFulfillment:state.order.data.deviceFulfillment,
		topupByDealer: state.order.data.topupByDealer,
		deviceFulfillmentoptions:state.configuration.data.deviceFulfillmentoptions,
		bccValidationFailed:state.configuration.data.bccValidationFailed,
		bccErrorMessage:state.configuration.data.bccErrorMessage,
		GET_BCC_VALIDATION_STATUS: state.configuration.meta.GET_BCC_VALIDATION_STATUS,
		validateDevice:state.order.data.validateDevice,
		GET_FUND_AMOUNT_STATUS:state.order.meta.GET_FUND_AMOUNT_STATUS,
		tempMaxLineCount:state.configuration.data.tempMaxLineCount,
		FETCH_ZEROLUTION_DEVICES_STATUS: state.configuration.meta.FETCH_ZEROLUTION_DEVICES_STATUS

		
	}
}

const mapDispatchToProps = {
	getRegTypes,
	getRateplans,
	getDonorTypes,
	getZerolutionDevices,
	setProductOrderInfo,
	getZerolutionDeviceInfo,
	getVasPopupData,
	validateLine,
	fetchDeviceFundContracts,
	getSimTypes,
	performVasRuleCheck,
	contractCheck,
	setLineDetails,
	getFundAmount,
	validateOldMsidns,
	setProductOrderInfoPrev,
	getRatePlanData,
	setRatePlanBlank,
	checkingBccValidation
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)
