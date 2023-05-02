import React, { Component } from 'react';
import { Grid, Input, Button, Checkbox, Segment, Container, Icon, Form, Dropdown, Message, Confirm } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock1, StaticBlock11 } from '../../components/common/dumb-component';
import AddVas from './add-vas';
import { connect } from 'react-redux';
import { getRegTypesobs, getRateplansobs, getRateplansMisc, getSimTypes, getDonorTypes, getOBSDevices, getOBSDeviceInfo, getVasPopupData, validateLine, fetchDeviceFundContracts, performVasRuleCheck, contractCheck, checkingBccValidation, getExistingShareableLineCount, getExistingShareableLineCountExcludeCRPMsisdns } from '../../redux/actions/configuration';
import { setProductOrderInfoOBS, setLineDetails, getFundAmount, checkEligibilityForFundDevice, getRatePlanData, setRatePlanBlank, saveInsAddress, setRTFDeviceCount,validateStock } from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';
import { isChangedToSuccess, isChangedToRejected } from '../../helpers/utils';
import NewBizAddress from './new-biz-address';
import ContractInfoAction from './contract-info';

const PlanSelection = ({ regTypes, ratePlans, deviceContracts, deviceContract, regType, ratePlan, handleChange, openModal, orderCategory, addOnVal, addOnLimit, onClickIncrease, onClickDecrease, bundleType, handleDeviceClick }) => {
	return (
		<Grid.Row >
			<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
				<Form.Field>
					<label>Type of Registration</label>
					<Dropdown placeholder='Please select' size='small' selection options={regTypes} onChange={handleChange} value={regType} name='regType' />
				</Form.Field>
			</Grid.Column>
			{(orderCategory !== 'Existing Group- Add VAS' && regType !=='Contract Renewal') && (
				<Grid.Column width='6' style={{ paddingRight: 0 }}>
					<Form.Field>
						<label>Rate Plan</label>
						<Dropdown placeholder='Please select' size='small' search selection options={ratePlans} onChange={handleChange} value={ratePlan} name='ratePlan' />
					</Form.Field>
				</Grid.Column>
			)
			}
			{(orderCategory === 'Existing Group- Add VAS') && (
				<Grid.Column width='6' style={{ paddingRight: 0 }}>
					<Form.Field>
						<label>Rate Plan</label>
						<Input placeholder='Rate Plan' value={ratePlan} name='ratePlan' disabled={true} />
					</Form.Field>
				</Grid.Column>
			)
			}
			{(orderCategory !== 'Existing Group- Add VAS' && regType !=='Contract Renewal') && (
				<React.Fragment>
					{(regType === 'Normal Registration' || regType === 'MNP Port In' || regType === 'Non Member Transfer') &&
						<Grid.Column width='3' style={{ paddingRight: 0 }}>
							<Form.Field >
								<label>Device Contract</label>
								<Dropdown placeholder='Please select' size='small' selection options={deviceContracts} onChange={handleChange} value={deviceContract} name='deviceContract' onClick={handleDeviceClick} fluid />
							</Form.Field>
						</Grid.Column>
					}
					<Grid.Column width='3' style={{ paddingRight: 0 }}>
						<Form.Field style={{ paddingTop: 10 }}>
							<p></p>
							<Button compact onClick={openModal} style={{ height: 32 }}>VAS</Button>
						</Form.Field>
					</Grid.Column>
				</React.Fragment>
			)
			}
			{(orderCategory === 'Existing Group- Add VAS' && regType === 'Member Level Add-VAS'  && regType !=='Contract Renewal') && (
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
			{(regType === 'Group Level Add-On') && (
				<AddOnVasInfo
					addOnVal={addOnVal}
					addOnLimit={addOnLimit}
					onClickIncrease={onClickIncrease}
					onClickDecrease={onClickDecrease} />
			)
			}
		</Grid.Row>
	)
}

const DeviceInfo = ({ regType, simCardNo, simTypes, simType, mobileNumber, deviceContract, obsDevices, phoneModel, handleChange, handleChangeCheckBox, contractCheck, fetchRatePlanDetails, isZerolutionRTF, imeiNo, orderCategory, ratePlans, ratePlan }) => {
	return (
		<React.Fragment>
			<Grid.Row style={{ padding: 0 }}>
				{(regType === 'Normal Registration' || regType === 'MNP Port In' || regType === 'Non Member Transfer' || regType === 'Member Transfer' || regType === 'Change Subscription' || regType === 'Member Level Add-VAS' || regType === 'Contract Renewal') && (
					<Grid.Column width='3' style={{ padding: 0 }} >
						<Form.Field >
							<label>Mobile Number</label>
							<Input placeholder='Mobile Number' value={mobileNumber} name='mobileNumber' onChange={handleChange} maxLength='12' />
						</Form.Field>
					</Grid.Column>
				)
				}
				{(regType === 'Member Level Add-VAS') && (
					<Grid.Column width='3' style={{ paddingTop: 24 }} >
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
				{(regType === 'Non Member Transfer' || regType === 'Member Transfer' || regType === 'Contract Renewal') && (
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
				{(orderCategory==='Existing Group' && regType ==='Contract Renewal') && (
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
								<Input placeholder='Sim Card No' value={simCardNo} onChange={handleChange} name='simCardNo' maxLength='19' />
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
				
				{(deviceContract === '1L1P Contract' || deviceContract ==='Zerolution') && (
					<React.Fragment>
					{	(deviceContract ==='Zerolution') && (
								<React.Fragment>
										<Grid.Column width='1' style={{ padding: 0 }}>
											<Form.Field >
												<label>Safe Device</label>
												<Checkbox style={{ padding: 5 }} onClick={handleChangeCheckBox} name='safeDevice' />
											</Form.Field>
										</Grid.Column>
								</React.Fragment>
						)}
						<Grid.Column width='5'>
							<Form.Field >
								<label>Phone Model</label>
								<Dropdown placeholder='Phone Model' size='small' search selection options={obsDevices} onChange={handleChange} value={phoneModel} name='phoneModel' />
							</Form.Field>
						</Grid.Column>

					</React.Fragment>
				)}
			</Grid.Row>
			<Grid.Row style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
				{(regType === 'Normal Registration' || regType === 'MNP Port In' || regType === 'Non Member Transfer' || regType === 'Member Transfer') &&
					<Grid.Column width='16' style={{ padding: 0 }}>
						<label>*Termination of zerolution will incur remaining balance charge base upon RRP/24 x No of Remaining Installments</label>
					</Grid.Column>
				}
			</Grid.Row>
			{ (isZerolutionRTF == true && deviceContract ==='Zerolution') && (
				<React.Fragment>
					<Grid.Row style={{ padding: 0 }}>
						<Grid.Column width='3' style= {{ paddingLeft:0 }}>
							<Form.Field >
								<label>IMEI No.</label>
								<Input placeholder='IMEI No' value={imeiNo} onChange={handleChange} name='imeiNo' />
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
				</React.Fragment>
			)}
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
					<Input placeholder='Donor Account No' value={donorAccountNo} onChange={handleChange} name='donorAccountNo' fluid />
				</Form.Field>
			</Grid.Column>
		</Grid.Row>
	)
}

const AddOnVasInfo = ({ addOnVal, addOnLimit, onClickIncrease, onClickDecrease }) => {
	return (
		<React.Fragment>
			<Grid.Column width={1} style={{ paddingRight: 0, paddingTop: 24 }}>
				<Button compact icon='add circle' onClick={onClickIncrease} />
			</Grid.Column>
			<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
				<Form.Field >
					<label>Add On Vas</label>
					<Input value={addOnVal} name='addOnVal' disabled={true} />
				</Form.Field>
			</Grid.Column>
			<Grid.Column width={1} style={{ paddingRight: 0, paddingTop: 24 }}>
				<Button compact icon='minus circle' onClick={onClickDecrease} />
			</Grid.Column>
		</React.Fragment>
	)
}
const Misc = ({ handleChangeCheckBox, handleChange, regType, mobileNumber, isBizAddress }) => {
	return (
		<Grid.Row style={{ padding: 0 }}>
			{(regType === 'MISC FIBRE') && (
				<React.Fragment>
					<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
						<Form.Field >
							<label>Service Number</label>
							<Input size='small' onChange={handleChange} name='mobileNumber' value={mobileNumber} maxLength='11' />
						</Form.Field>
					</Grid.Column>
					<Grid.Column width={4} style={{ paddingLeft: 23 }}>
						<Form.Field >
							<label className='heading'>BIZ Fibre Installation Address</label>
							<Checkbox style={{ padding: 5 }} onChange={handleChangeCheckBox} name='isBizAddress' checked={isBizAddress} value={isBizAddress} />
						</Form.Field >
					</Grid.Column>
				</React.Fragment>
			)}
			{(regType === 'VoiceGo') && (
				<React.Fragment>
					<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
						<Form.Field >
							<label>Service No.</label>
							<Input size='small' onChange={handleChange} name='mobileNumber' value={mobileNumber} maxLength='12' />
						</Form.Field>
					</Grid.Column>
				</React.Fragment>
			)}
		</Grid.Row>
	)
}

class ProductOrder extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			deviceContracts: [
				{ key: '0', text: '-----Please Select-----', value: '' },
				{ key: '1', text: '1L1P Contract', value: '1L1P Contract' },
				{ key: '2', text: 'Zerolution', value: 'Zerolution' },
				{ key: '3', text: 'BYOD Contract', value: 'BYOD Contract'},
				{ key: '4', text: 'Normal', value: 'Normal'},
				{ key: '5', text: 'Flexi Fund', value: 'Flexi Fund'}
			],
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/device-fund",
			nextUrlAddVas: url.substring(0, url.lastIndexOf("/")) + "/device-fund",
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
			counter: 0,
			crpLineCount: props.crpLineCount,
			addOnVal: props.addOnVal,
			addOnLimit: props.addOnLimit,
			isaddMemberCheckValid: false,
			isBizAddress: false,
			show: false,
			allPostCodes: props.allPostCodes,
			installationAddress: null,
			instMessage: '',
			countMisc: props.countMisc,
			obsDevices: props.obsDevices,
			deviceTopUp: null,
			totalDeviceTopUp: props.totalDeviceTopUp,
			obsDevicesCount :0,
			rpMasterId:-1,
			isZerolutionRTF:props.isZerolutionRTF,
			imeiNo:'',
			obsRTFDeviceCount: props.obsRTFDeviceCount,
			ratePlanPkgId: 0,
			obsNonRTFDeviceCount: props.obsNonRTFDeviceCount!=undefined?props.obsNonRTFDeviceCount:0,
			isValidateStock:false,
			contractRenewalInfo:[],
			contractInfoDataCR:[],
			isActiveKenanContractPresent:false,
			activeKenanContractCount:0,
			shareMemberAllowed: 0,
			sharedMemberSubscribed: 0,
			isVasRUleCheckValid:true,
			vasIdsSelected:''

		};
		this.addVas = React.createRef();
		this.newBizAddress = React.createRef();
		this.contractInfoAction= React.createRef();
	}
	Device(type) {
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
		let { orderCategory, selectedVSN,isZerolutionRTF } = this.props;
		this.props.getRegTypesobs(this.props.orderCategory);
		//this.props.getExistingShareableLineCount(selectedVSN);

		if (orderCategory === 'Existing Group') {

			this.props.getFundAmount(selectedVSN, 404,'REGISTRATION_MODE');
			this.props.checkEligibilityForFundDevice(selectedVSN, 'Existing Group');
		}
		if (todos === undefined) {
			this.setState({ todos: [] });
		}
		if(todos !== undefined && todos !== null && todos.length >0){
			var tempObsDevicesCount = 0;
			var tempRTFDeviceCount = 0;
			var tempNonRTFDeviceCount = 0;

			var eligibleCountForSharebleLines = 0;
			var total48PlanShareableLinesTaken = 0;

			for(var i=0;i<todos.length;i++){
				if(todos[i].lineDeviceInfo !== undefined && todos[i].lineDeviceInfo !== null){
					if(todos[i].deviceContract==='Zerolution'){
						if(todos[i].isZerolutionRTF){
							tempRTFDeviceCount++;
						}else{
							tempNonRTFDeviceCount++;
						}
						
					}else{
						tempObsDevicesCount++;
						tempNonRTFDeviceCount++;
					}	
				}

				if(todos[i].regType !== 'Contract Renewal'){
						if (todos[i].ratePlanPkgId === 41987 || todos[i].ratePlanPkgId === 41942 || todos[i].ratePlanPkgId === 41943 ) {
						eligibleCountForSharebleLines += 1;
					}else if(todos[i].ratePlanPkgId === 41944){
						eligibleCountForSharebleLines += 3;
					}else if(todos[i].ratePlanPkgId === 41945){
						eligibleCountForSharebleLines += 5;
					}else if(todos[i].ratePlanPkgId === 41946){
						eligibleCountForSharebleLines += 7;
					}else if(todos[i].ratePlanPkgId === 41968){
						total48PlanShareableLinesTaken +=1;
					}
				}
			}

			this.setState({obsDevicesCount:tempObsDevicesCount,obsRTFDeviceCount:tempRTFDeviceCount,
				phoneModel:'',lineDeviceInfo:'',obsNonRTFDeviceCount:tempNonRTFDeviceCount,
			shareMemberAllowed: eligibleCountForSharebleLines, sharedMemberSubscribed: total48PlanShareableLinesTaken});
		}

		


		if(todos!== undefined && todos!==null){
			let contractCount=0;
			todos.map((currentTodo)=>{
				if((currentTodo!==null && currentTodo.isActiveKenanContractPresent)|| currentTodo.regType === 'Contract Renewal' ){
					contractCount++;
				}
			})
			this.setState({activeKenanContractCount:contractCount})
			}
		// if(this.state.isZerolutionRTF){
		// 	this.setState({
		// 		deviceContracts: [
		// 			{ key: '0', text: '-----Please Select-----', value: '' },
		// 			{ key: '1', text: 'Zerolution', value: 'Zerolution' }
		// 		]
		// 	});
		// }
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.FETCH_SIM_TYPES_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_SIM_TYPES_STATUS === 'SUCCESS') {

		}
		else if (this.props.FETCH_REG_TYPES_OBS_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_REG_TYPES_OBS_STATUS === 'SUCCESS') {
			// set configuration
			this.props.getSimTypes();
			this.setState({ showDimmer: false });
		}

		else if (this.props.FETCH_VAS_POPUP_DATA_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_VAS_POPUP_DATA_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false });
			
			const { vasOptionals, vasIddCountries, vasContracts, vasMandatory } = nextProps;
			let checkedVAS = [];
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
			for (let i = 0; i < vasIddCountries.length; i++) {
				for (let j = 0; j < vasIddCountries[i].length; j++) {
					if (vasIddCountries[i][j].checked) {
						let countryId = vasIddCountries[i][j].countryId;
						iddList = [...iddList, { countryId }];
					}
				}
			}
			this.setState({ flexiFundContractTaken: nextProps.flexiFundContractTaken, vasList: checkedVAS, iddList: iddList, byodContractTaken: nextProps.byodContractTaken });
		}
		else if (this.props.VAS_RULE_CHECK_STATUS !== 'SUCCESS' && nextProps.VAS_RULE_CHECK_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false });
			let tempVasRule = {
				status: 'SUCCESS',
				message: 'Vas selected successfully'
			}
			this.setState({ vasRule: tempVasRule, isValidVAS: true });
		}
		else if (this.props.VAS_RULE_CHECK_STATUS !== 'FAILED' && nextProps.VAS_RULE_CHECK_STATUS === 'FAILED') {
			this.setState({ showDimmer: false });
			let tempVasRule = {
				status: 'FAILURE',
				message: nextProps.vasMessage
			}

			this.setState({ vasRule: tempVasRule, isValidVAS: false });
		}
		else if (this.props.SET_INSTALLATION_ADDRESS_STATUS !== 'SUCCESS' && nextProps.SET_INSTALLATION_ADDRESS_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false });
			let tempInstmessage = {
				status: 'SUCCESS',
				message: 'Installation Address saved successfully'
			}
			this.setState({ instMessage: tempInstmessage });
		}
		else if (this.props.SET_INSTALLATION_ADDRESS_STATUS !== 'FAILED' && nextProps.SET_INSTALLATION_ADDRESS_STATUS === 'FAILED') {
			this.setState({ showDimmer: false });
			let tempInstmessage = {
				status: 'FAILURE',
				message: 'Some error occured in saving installation address'
			}

			this.setState({ instMessage: tempInstmessage });
		}
		else if (this.props.FETCH_OBS_DEVICE_INFO_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_OBS_DEVICE_INFO_STATUS === 'SUCCESS') {
			this.setState({ lineDeviceInfo: nextProps.lineDeviceInfo, showDimmer: false });
		}
		else if (this.props.CONTRACT_CHECK_STATUS !== 'SUCCESS' && nextProps.CONTRACT_CHECK_STATUS === 'SUCCESS') {
			let { regType, mobileNumber} = this.state;
			let {orderCategory} = this.props;
			if(orderCategory!==undefined && orderCategory!==null && regType!==undefined && regType!==null && 
				orderCategory==='Existing Group' && regType === 'Contract Renewal'){
				let isActiveKenanContract=false;
				let contractInfoData ='';
				if( nextProps.msisdnContracts !== undefined && nextProps.msisdnContracts!==null && nextProps.msisdnContracts!==''){
					nextProps.msisdnContracts.map((currentMsisdnContract) => {
						if(currentMsisdnContract!==null && currentMsisdnContract.contractType !==null 
							&& currentMsisdnContract.contractType!==''  ){
								isActiveKenanContract=true;
						}
						if(currentMsisdnContract!==null){
								contractInfoData = [...contractInfoData, { ...currentMsisdnContract }];
						}
					})
				}
				this.props.getRateplansobs(regType,this.props.user.userId ,mobileNumber);
				this.setState({mobileNoValidSubscriber:true, msisdnContracts:nextProps.msisdnContracts, showDimmer: true, isContractCheckDone:true,isActiveKenanContractPresent:isActiveKenanContract,contractInfoDataCR:contractInfoData});
	
					let contractRemainingMonths=0;
					let remainingMonthValidation= false ;
					if( nextProps.msisdnContracts !== undefined && nextProps.msisdnContracts!==null && nextProps.msisdnContracts!==''){
						nextProps.msisdnContracts.map((currentContract) => {
							if(currentContract.contractRemainingMonth!==null && currentContract.contractRemainingMonth>4){
								remainingMonthValidation=true
						}
					})
				}
				if(remainingMonthValidation){
						this.setState({ status:'FAILURE', message:'The MSISDN entered has remaining months greater than 4 Months, please attach document requesting for approval before submitting order', showDimmer: false});
					}
				
				this.setState({ratePlan: '',mobileNoValidSubscriber:true, msisdnContracts:nextProps.msisdnContracts, showDimmer: false, isContractCheckDone:true,isActiveKenanContractPresent:isActiveKenanContract,contractInfoDataCR:contractInfoData,ratePlanId:null,vasList:[]});

			}else{
			this.setState({ mobileNoValidSubscriber: true, msisdnContracts: nextProps.msisdnContracts, showDimmer: false, isContractCheckDone: true,isActiveKenanContractPresent:false });
			}
		}
		else if (this.props.CONTRACT_CHECK_STATUS !== 'FAILED' && nextProps.CONTRACT_CHECK_STATUS === 'FAILED') {
			this.setState({ status: 'FAILURE', message: 'Invalid Subscriber', showDimmer: false, mobileNoValidSubscriber: false, isContractCheckDone: true });
		}
		else if (this.props.VALIDATE_LINE_STATUS !== 'SUCCESS' &&
			nextProps.VALIDATE_LINE_STATUS === 'SUCCESS') {
		
			let { todos, regType, mobileNumber, ratePlan, currentPage, simCardNo, simType, donorAccountNo, lineDeviceInfo,
				donorType, flexiFundContractTaken, ratePlanId, regTypeId, vasList, iddList, byodContractTaken, crpLineCount,
				addOnVal, deviceId, deviceTopUp, phoneModel, imeiNo, isZerolutionRTF, deviceContract,isActiveKenanContractPresent,contractInfoDataCR, ratePlanPkgId } = this.state;
			console.log(vasList);
			let templineDeviceInfo = null;
			console.log('PhoneModel'+phoneModel);
			if (phoneModel !== undefined && phoneModel !== null && phoneModel !== '') {
				var tempDeviceTopUp = null;
				if (deviceTopUp !== undefined && deviceTopUp !== null && deviceTopUp !== '') {
					tempDeviceTopUp = deviceTopUp;
				}
				templineDeviceInfo = {
					...this.state.lineDeviceInfo,
					deviceTopUp: tempDeviceTopUp,
					imeiNo: isZerolutionRTF?imeiNo:''
				};
				var deviceCount = 0;
				if(deviceContract==='Zerolution'){
					if(isZerolutionRTF){
						deviceCount = this.state.obsRTFDeviceCount+1;
						this.setState({obsRTFDeviceCount:deviceCount});
					}else{
						deviceCount = this.state.obsNonRTFDeviceCount+1;
						this.setState({obsNonRTFDeviceCount:deviceCount});
					}
					
				}else{
					deviceCount = this.state.obsDevicesCount+1;
					let tempNonRTFDeviceCount = this.state.obsNonRTFDeviceCount +1;
					this.setState({obsDevicesCount:deviceCount,obsNonRTFDeviceCount:tempNonRTFDeviceCount});
				}
				
			}
			if (iddList === '') {
				iddList = [];
			}
			var  tempDeviceStatus  =  null;
			            if (this.state.deviceContract === 'Zerolution') {
				                tempDeviceStatus  =  'Pending Approval'
			            }
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
					deviceContract: deviceContract,
					isZerolutionRTF: isZerolutionRTF,
					isActiveKenanContractPresent:isActiveKenanContractPresent,
					contractInfoDataCR:contractInfoDataCR,
					ratePlanPkgId: ratePlanPkgId
				}],
				firstIndexCurrentPage: currentPage,
				showDimmer: false,
				status: 'SUCCESS',
				mobileNumber: '',
				simCardNo: '',
				mobileNoValidSubscriber: true,
				msisdnContracts: [],
				isContractCheckDone: false,
				isaddMemberCheckValid: false,
				imeiNo: ''
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
				deviceStatus: 'Pending Approval',
				vasList: vasList,
				iddList: iddList,
				ratePlanId: ratePlanId,
				flexiFundContractTaken: flexiFundContractTaken,
				byodContractTaken: byodContractTaken,
				addOnVal: addOnVal,
				deviceContract: deviceContract,
				isZerolutionRTF: isZerolutionRTF,
				isActiveKenanContractPresent:isActiveKenanContractPresent,
				contractInfoDataCR:contractInfoDataCR,
				ratePlanPkgId: ratePlanPkgId
			}];
			if(temptodos!== undefined && temptodos!==null){
				let contractCount=0;
				let contractInfo=[];
				temptodos.map((currentTodo)=>{
					if((currentTodo!==null && currentTodo.isActiveKenanContractPresent) || currentTodo.regType === 'Contract Renewal' ){
						contractCount++;
					}
				})
				this.setState({activeKenanContractCount:contractCount})
				}
			let { orderCategory } = this.props;
			if (orderCategory === 'Existing Group- Add VAS') {

				this.props.setRatePlanBlank('');
			}
			if (orderCategory === 'Existing Group- Add VAS' && (regType === "Member Level Add-VAS" || regType === 'Contract Renewal')) {
				this.setState({ ratePlan: '' });
			}
			let countMisc = 0;
			let tempTotalDeviceTopUp = 0;
			let crpMsisdnList = [];
			for (let i = 0; i < temptodos.length; i++) {
				if (temptodos[i].regType.includes('MISC') || temptodos[i].regType.includes('VoiceGo')) {
					countMisc += 1;
				}
				if (temptodos[i].lineDeviceInfo !== null && temptodos[i].lineDeviceInfo.deviceTopUp !== undefined
					&& temptodos[i].lineDeviceInfo.deviceTopUp !== null && temptodos[i].lineDeviceInfo.deviceTopUp !== '') {

					tempTotalDeviceTopUp += parseFloat(temptodos[i].lineDeviceInfo.deviceTopUp);
				}
				crpMsisdnList = [...crpMsisdnList, temptodos[i].msisdn];

			}
			this.setState({ isBizAddress: false, countMisc: countMisc, totalDeviceTopUp: tempTotalDeviceTopUp });


			if((regType !== 'Change Subscription' && regType !== 'Contract Renewal')){
				var eligibleCountForSharebleLines = 0;
				var total48PlanShareableLinesTaken = 0;
					for (var i = 0; i < temptodos.length; i++) {
						if (temptodos[i].ratePlanPkgId === 41987 || temptodos[i].ratePlanPkgId === 41942 || temptodos[i].ratePlanPkgId === 41943 ) {
							eligibleCountForSharebleLines += 1;
						}else if(temptodos[i].ratePlanPkgId === 41944){
							eligibleCountForSharebleLines += 3;
						}else if(temptodos[i].ratePlanPkgId === 41945){
							eligibleCountForSharebleLines += 5;
						}else if(temptodos[i].ratePlanPkgId === 41946){
							eligibleCountForSharebleLines += 7;
						}else if(temptodos[i].ratePlanPkgId === 41968){
							total48PlanShareableLinesTaken +=1;
						}
					}

				this.setState({shareMemberAllowed: eligibleCountForSharebleLines, sharedMemberSubscribed: total48PlanShareableLinesTaken});
				
			}
			

			this.props.setLineDetails(temptodos, crpLineCount, countMisc, tempTotalDeviceTopUp);

			if(regType === 'Change Subscription'){
				let crpRequest = {
					selectedVSN: this.props.selectedVSN,
					msisdnList: crpMsisdnList
				}
				this.setState({ showDimmer: true });
				this.props.getExistingShareableLineCountExcludeCRPMsisdns(crpRequest);
			}
		}
		else if (this.props.VALIDATE_LINE_STATUS !== 'FAILED' &&
			nextProps.VALIDATE_LINE_STATUS === 'FAILED') {
			this.setState({ status: 'FAILURE', message: nextProps.validateErrorMessage, showDimmer: false });
			let tempCrpCount = this.state.crpLineCount;
			if (tempCrpCount > 0) {
				this.setState({ crpLineCount: tempCrpCount - 1 });
			}
		}
		else if (this.props.SET_PRODUCT_ORDER_OBS_STATUS !== 'SUCCESS' &&
			nextProps.SET_PRODUCT_ORDER_OBS_STATUS === 'SUCCESS') {
			// all ok to proceed
			let deivceContractInfo = [];
			nextProps.msisdnList.map((currentMsisdn) => {
				deivceContractInfo = [...deivceContractInfo, {
					msisdn: currentMsisdn.mobileInfo.mobileNo,
					regType: currentMsisdn.regType,
					ratePlanId: currentMsisdn.ratplan,
					isFlexiFundContractTaken: currentMsisdn.flexiFundContractTaken
				}]
			})
			if (this.props.orderCategory === 'Existing Group- Add VAS') {
				this.props.history.push(this.state.nextUrlAddVas);
			}
			else {
				console.log('getFundContracts');
				this.props.fetchDeviceFundContracts({ fundDetailsParam: deivceContractInfo });
			}
		}
		else if (this.props.FETCH_DEVICE_FUND_CONTRACTS_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_DEVICE_FUND_CONTRACTS_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false });
			this.props.history.push(this.state.nextUrlAddVas);
		}
		else if (isChangedToRejected(this.props.FETCH_DEVICE_FUND_CONTRACTS_STATUS, nextProps.FETCH_DEVICE_FUND_CONTRACTS_STATUS)) {
			this.setState({ status: 'FAILURE', message: 'Some Error occurred while fetching data' });
		}
		else if (this.props.GET_ADD_ON_DATA_VSN_STATUS !== 'SUCCESS' &&
			nextProps.GET_ADD_ON_DATA_VSN_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false, ratePlanId: nextProps.ratePlanId, ratePlan: nextProps.ratePlan, addOnDataBlock: nextProps.addOnDataBlock, addOnLimit: nextProps.addOnLimit, addOnVal: nextProps.addOnVal });
			if (this.state.regType === 'Member Level Add-VAS') {
				this.setState({ showDimmer: true });
				this.props.getVasPopupData(nextProps.ratePlanId, 'Member Level Add-VAS', this.state.mobileNumber);
			}
		}
		else if (isChangedToRejected(this.props.GET_ADD_ON_DATA_VSN_STATUS, nextProps.GET_ADD_ON_DATA_VSN_STATUS)) {
			this.setState({ status: 'FAILURE', message: nextProps.vasValidateErrorMessage, showDimmer: false });
		}
		else if(this.props.GET_BCC_VALIDATION_STATUS !== 'SUCCESS' &&
		nextProps.GET_BCC_VALIDATION_STATUS === 'SUCCESS')
		{
			let {bccValidationFailed,bccErrorMessage}=nextProps;
			if(bccValidationFailed)
			{
				this.setState({status:'FAILURE',message:bccErrorMessage , showDimmer: false});
			}
			else{
				this.props.setProductOrderInfoOBS(this.state.regType,
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
					this.state.installationAddress,
					this.state.countMisc,
					this.state.obsRTFDeviceCount,
					this.state.isZerolutionRTF
				)
			}
			
		}
	else if(isChangedToRejected(this.props.GET_BCC_VALIDATION_STATUS, nextProps.GET_BCC_VALIDATION_STATUS)){
		this.setState({status:'FAILURE',message:nextProps.bccErrorMessage , showDimmer: false});
	}
		else if (this.props.GET_OBS_DEVICES_STATUS !== 'SUCCESS' && nextProps.GET_OBS_DEVICES_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false, obsDevices: nextProps.obsDevices });
		}
		else if (isChangedToRejected(this.props.GET_OBS_DEVICES_STATUS, nextProps.GET_OBS_DEVICES_STATUS)) {
			this.setState({ status: 'FAILURE', message: 'No devices found for this ratePlan' });
			return;
		}else if(this.props.FETCH_RATEPLANS_OBS_STATUS !== 'SUCCESS' && nextProps.FETCH_RATEPLANS_OBS_STATUS === 'SUCCESS'){
			let { regType } = this.state;
			if(regType !== null && regType !== '' && regType !== undefined && regType === 'Contract Renewal'){
				this.setState({ showDimmer: false, ratePlans:nextProps.ratePlans });
			}
			this.setState({ showDimmer:false });
		}else if (isChangedToRejected(this.props.FETCH_RATEPLANS_OBS_STATUS, nextProps.FETCH_RATEPLANS_OBS_STATUS)) {
			this.setState({ status: 'FAILURE', message: 'Some issue occurred in fetching rate plans from server', showDimmer:false });
			return;
		}
		else if (isChangedToRejected(this.props.VALIDATE_STOCK_STATUS, nextProps.VALIDATE_STOCK_STATUS)) {
			this.setState({ status: 'FAILURE', message: nextProps.validateStockMessage,isValidateStock:false, showDimmer:false });
			return;
		}
		else if (this.props.VALIDATE_STOCK_STATUS !== 'SUCCESS' && nextProps.VALIDATE_STOCK_STATUS === 'SUCCESS') {
			this.setState({isValidateStock:true, showDimmer:false });
			let {  regType, mobileNumber, ratePlanId,simCardNo, ratePlanPkgId, todos  } = this.state;
			let tempSimCardNo = null;
			let tempVSN = 'Test';
			if (regType === 'Non Member Transfer' || regType === 'Member Transfer') {
					tempSimCardNo = 'test';
			}
			else if (regType === 'Change Subscription' || regType === 'Group Level Add-On' || regType === 'Member Level Add-VAS') {
					tempSimCardNo = 'test';
					tempVSN = this.props.selectedVSN;
			}
			else {
				if (regType !== 'Group Level Add-On' && regType !== 'Member Level Add-VAS') {
					tempSimCardNo = simCardNo;
				}
			}
			
			if (this.props.orderCategory === 'Existing Group') {
					tempVSN = this.props.selectedVSN;
			}

			if(ratePlanPkgId === 41968){
				var eligibleCountForSharebleLines = 0;
				var total48PlanShareableLinesTaken = 0;
					for (var i = 0; i < todos.length; i++) {
						if (todos[i].ratePlanPkgId === 41987 || todos[i].ratePlanPkgId === 41942 || todos[i].ratePlanPkgId === 41943 ) {
							eligibleCountForSharebleLines += 1;
						}else if(todos[i].ratePlanPkgId === 41944){
							eligibleCountForSharebleLines += 3;
						}else if(todos[i].ratePlanPkgId === 41945){
							eligibleCountForSharebleLines += 5;
						}else if(todos[i].ratePlanPkgId === 41946){
							eligibleCountForSharebleLines += 7;
						}else if(todos[i].ratePlanPkgId === 41968){
							total48PlanShareableLinesTaken +=1;
						}
					}

					if( (eligibleCountForSharebleLines+this.props.totalAllowed) - (total48PlanShareableLinesTaken+this.props.totalSubscribed)<=0){
						this.setState({ status: 'FAILURE', message: 'Limit reached to add shareable lines, add more non-shareable lines to cart first' });
						return;
					}
			}

			this.props.validateLine(mobileNumber, tempSimCardNo, regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId,null, this.state.ratePlanPkgId, this.props.orderCategory);
		}
		else if(isChangedToSuccess(this.props.EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP_STATUS,nextProps.EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP_STATUS)){
		let { todos, regType } = this.state;

			this.setState({ showDimmer: false});
			if((regType === 'Change Subscription')){
				var eligibleCountForSharebleLines = 0;
				var total48PlanShareableLinesTaken = 0;
					for (var i = 0; i < todos.length; i++) {
						if (todos[i].ratePlanPkgId === 41987 || todos[i].ratePlanPkgId === 41942 || todos[i].ratePlanPkgId === 41943 ) {
							eligibleCountForSharebleLines += 1;
						}else if(todos[i].ratePlanPkgId === 41944){
							eligibleCountForSharebleLines += 3;
						}else if(todos[i].ratePlanPkgId === 41945){
							eligibleCountForSharebleLines += 5;
						}else if(todos[i].ratePlanPkgId === 41946){
							eligibleCountForSharebleLines += 7;
						}else if(todos[i].ratePlanPkgId === 41968){
							total48PlanShareableLinesTaken +=1;
						}
					}

				this.setState({shareMemberAllowed: eligibleCountForSharebleLines, sharedMemberSubscribed: total48PlanShareableLinesTaken});
				
			}
		}
		else if(isChangedToRejected(this.props.EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP_STATUS,nextProps.EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP_STATUS)){
			this.setState({status: 'FAILURE', message: 'Error in fetching Shareable Line Details for msisdn', showDimmer: false, });
		}

	}

	next = () => {
		let { todos, status, lineCount, counter,countMisc, obsRTFDeviceCount, isZerolutionRTF } = this.state;
		console.log('status:'+status);
		
		let { orderCategory, brn ,bundleType} = this.props;
		let tempDataFor48 = [];
		tempDataFor48 = todos.filter((currentRow) => {
			return currentRow.ratePlan.includes(' 48 ')
		})
		let tempCrpLineCount = 0;
		for (var i = 0; i < todos.length; i++) {
			if  (todos[i].regType !== null && todos[i].regType !== undefined && (todos[i].regType === 'Change Subscription' || todos[i].regType === 'Group Level Add-On' || todos[i].regType === 'Member Level Add-VAS')) {
				tempCrpLineCount = tempCrpLineCount + 1;
			}
		}
		this.setState({ crpLineCount: tempCrpLineCount });
		if (todos === null || todos === undefined || todos.length === 0) {
			if (orderCategory === 'New Group') {
				this.setState({ status: 'FAILURE', message: 'You must select atleast one line to proceed' });
				return;
			}
			else {

			}
		}

		let countMiscs = 0;
		let countContractRenewal = 0;
		for (let i = 0; i < todos.length; i++) {
			if (todos[i].regType.includes('MISC') || todos[i].regType.includes('VoiceGo')) {
				countMiscs += 1;
			}
			if (todos[i].regType === 'Contract Renewal' ) {
				countContractRenewal += 1;
			}
		}

		if (orderCategory !== undefined && orderCategory === 'New Group') {
			if (todos.length - countContractRenewal > 150) {
				this.setState({ status: 'FAILURE', message: 'Max of 150 lines can be selected' });
				return;
			}
		}
		else if (orderCategory === 'Existing Group') {
			console.log('todos.length',todos.length,'lineCount',lineCount,'tempCrpLineCount',tempCrpLineCount,'countContractRenewal',countContractRenewal);
			if (((todos.length + lineCount - tempCrpLineCount - countContractRenewal) > 150)) {
				this.setState({ status: 'FAILURE', message: 'Max of 150 lines can be selected' });
				return;
			}
			if(todos.length===0){
				this.setState({open:true});
				return;
			}
		}
		else if (orderCategory === 'Existing Group- Add VAS') {
			if (todos.length === 0) {
				this.setState({ status: 'FAILURE', message: 'You must select atleast one line to proceed' });
				return;
			}
		}

		let strVasIds = null;
		for (var i = 0; i < todos.length; i++) {
			if ((orderCategory === 'New Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In') ||
				(orderCategory === 'Existing Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In')) {
				todos[i].vasList.map((currentVas, key) => {
					if (strVasIds != null) {
						strVasIds = strVasIds + ',' + currentVas.vasId;
					}
					else {
						strVasIds = currentVas.vasId;
					}
				})
			}
		}
			let bccLineValueList=[];
		for (var i = 0; i < todos.length; i++) {
			if((orderCategory==='New Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In' ) || 
			   (orderCategory==='Existing Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In') ){
				let arrVasIds=[];
			  	 todos[i].vasList.map((currentVas,key)=>{
					arrVasIds.push(currentVas.vasId);
				})
				console.log('ratePlan:' +todos[i].ratePlan);
				let bccLineValue={
					regType:todos[i].regType,
					msisdn :todos[i].msisdn,
					vasIds :arrVasIds,
					ratePlan:todos[i].ratePlan
			}
				bccLineValueList.push(bccLineValue);
			}
			}
		let totalRequestingLine = 0;
		for (var i = 0; i < todos.length; i++) {
			if ((orderCategory === 'New Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In') || todos[i].regType === 'Member Transfer' || 
				(orderCategory === 'Existing Group') && (todos[i].regType === 'Normal Registration' || todos[i].regType === 'Non Member Transfer' || todos[i].regType === 'MNP Port In'))
				if(orderCategory==='Existing Group' && todos[i].regType ==='Contract Renewal'){
					if(!todos[i].isActiveKenanContractPresent){
					  totalRequestingLine += 1;
					} 
				 }else{
				 totalRequestingLine += 1;
				 }
		}
		let bccRequestData = {
			brn:brn,
			totalRequestingLine:totalRequestingLine,
			groupName:bundleType,
			bccLineValueList:bccLineValueList};

		let msisdnList = '';
		if (status === 'SUCCESS') {
			todos.map((currentLine) => {
				console.log('currentLine.ratePlanId' + currentLine.ratePlanId);
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

				
				
				msisdnList = [...msisdnList,
				{
					regId: '',
					regType: currentLine.regType,
					regTypeId: currentLine.regTypeId,
					ratplan: currentLine.ratePlanId,
					deviceContract: currentLine.deviceContract,
					deliveryNumber: currentLine.deliveryNo,
					mobileInfo: { mobileNo: currentLine.msisdn, sim: currentLine.simNo, simType: currentLine.simType, donorAccountNo: currentLine.donorAccountNo, donorType: currentLine.donorType },
					lineDeviceInfo: tempLineDeviceInfo,
					contractInfo: [],
					lineStatus: 'Pending Approval',
					fundAmount: '',
					consumedAmount: '',
					balanceAmount: '',
					fundStatus: '',
					oldComponentList: [],
					vasList: currentLine.vasList,
					iddList: currentLine.iddList,
					flexiFundContractTaken: currentLine.flexiFundContractTaken,
					byodContractTaken: currentLine.byodContractTaken,
					isZerolutionRTF: currentLine.isZerolutionRTF
				}
				]
			})
			this.setState({ showDimmer: true, msisdnList: msisdnList });
			this.props.checkingBccValidation(bccRequestData);			
		}
	}
	previous = () => {
		let { orderCategory } = this.props;
		let { obsRTFDeviceCount, isZerolutionRTF,obsNonRTFDeviceCount } = this.state; 
		if (orderCategory === 'Existing Group- Add VAS') {
			this.props.setRatePlanBlank('');
		}

		this.props.setRTFDeviceCount(obsNonRTFDeviceCount, obsRTFDeviceCount, isZerolutionRTF);
		this.props.history.goBack();
	}
	openModal = () => {
		let { vasOptionals, vasMandatory, vasContracts, vasIddCountries } = this.props;
		let { ratePlanId } = this.state;
		if (ratePlanId === null || ratePlanId === '' || ratePlanId === 'undefined') {
			this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
			return;
		}
		this.addVas.current.show(vasOptionals, vasMandatory, vasContracts, vasIddCountries, ratePlanId);
	}
	openModalContractRenewal = (regType,msisdn,ratePlan,contractRenewalInfo) => {
		this.contractInfoAction.current.show(regType,msisdn,ratePlan,contractRenewalInfo);
	}
	addLine = () => {

		let { todos, regType, mobileNumber, ratePlan,
			simCardNo, simType, donorAccountNo, donorType, deviceContract,
			flexiFundContractTaken, ratePlanId, mobileNoValidSubscriber, isContractCheckDone, byodContractTaken, crpLineCount, isaddMemberCheckValid, installationAddress,
			isZerolutionRTF, safeDevice, obsRTFDeviceCount, deviceId, imeiNo, obsDevicesCount,phoneModel,
			obsNonRTFDeviceCount,isValidateStock, ratePlanPkgId, isVasRUleCheckValid ,vasIdsSelected  } = this.state;
			console.log('OBSDeviceCount'+obsDevicesCount);
			console.log('OBSRTFDeviceCount'+obsRTFDeviceCount);
			console.log('obsNonRTFDeviceCount'+obsNonRTFDeviceCount);
		let { orderCategory }=this.props;
		if (regType === undefined || regType === '' || regType === null) {
			this.setState({ status: 'FAILURE', message: 'Please select reg type first' });
			return;
		}
		if (regType === "Member Level Add-VAS" && (mobileNumber === '' || mobileNumber === undefined || mobileNumber === null)) {
			this.setState({ status: 'FAILURE', message: 'Please select msisdn first' })
			return;
		}
		if (regType === 'Member Level Add-VAS' && ratePlan.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'Please fetch rateplan first' })
			return;
		}
		if (regType === 'Member Level Add-VAS' && !isaddMemberCheckValid) {
			this.setState({ status: 'FAILURE', message: 'You are choosing same vas which is already there, try using some other vases apart from existing ones', showDimmer: false });
			return;
		}
		if (regType !== 'Contract Renewal' && (ratePlan === undefined || (ratePlan !== undefined && ratePlan.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
			return;
		}
		if (deviceContract === 'Zerolution' && (phoneModel === undefined || phoneModel === null || (phoneModel !== null && phoneModel.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Phone Model first' });
			return;
		} 

		if( deviceContract === 'Zerolution'&& isZerolutionRTF && deviceId !== '' && imeiNo === ''){
			this.setState({ status: 'FAILURE', message: 'IMEI No is mandatory for Zerolution RTF' });
			return;
		}
		if( deviceContract === 'Zerolution'&& isZerolutionRTF && deviceId !== '' && imeiNo.length<14){
			this.setState({ status: 'FAILURE', message: 'Need to key in minimum 14 digits IMEI No' });
			return;
		}
		if( deviceContract === 'Zerolution'&& isZerolutionRTF && deviceId !== '' && imeiNo.length>16){
			this.setState({ status: 'FAILURE', message: 'IMEI No cannot be more than 18 digits' });
			return;
		}
		
		if(deviceId !== '' && isZerolutionRTF && obsNonRTFDeviceCount>0 ){
			this.setState({ status: 'FAILURE', message: 'You need to delete non Real Time Devices from your cart if you want Real Time Fulfillment Zerolution Devices' });
			return;
		}
		if(deviceId !== '' && (!isZerolutionRTF ||  deviceContract === '1L1P Contract') && obsRTFDeviceCount>0 ){
			this.setState({ status: 'FAILURE', message: 'You need to delete Real Time Fulfillment Zerolution Devices from your cart if you want non Real Time Fulfillment Devices' });
			return;
		}
		if(isZerolutionRTF && deviceId !== '' && obsRTFDeviceCount >= 5 ){
			this.setState({ status: 'FAILURE', message: 'Limit reached, maximum of 5 Zerolution Devices can be taken' });
			return;
		}
		if(deviceContract === 'Zerolution' && (ratePlan.includes('Contract') || ratePlan.includes('contract' )||ratePlan.includes('24')||ratePlan.includes('Mths')) && deviceId !== ''){
			this.setState({ status: 'FAILURE', message: 'Cannot take zerolution device with this Contract' });
			return;
		}
		if(isZerolutionRTF && (ratePlan.includes('Contract') || ratePlan.includes('contract')) && deviceId !== ''){
				this.setState({ status: 'FAILURE', message: 'Cannot take zerolution device with this Contract' });
				return;
		}

		if(deviceContract === 'Flexi Fund' && !(ratePlan.includes('Fund'))){
			this.setState({ status: 'FAILURE', message: 'Cannot take  Flexi Fund Contract with this rateplan' });
			return;
		}

		if(deviceContract === 'Flexi Fund' && ratePlan.includes('Fibre Share')){
			this.setState({ status: 'FAILURE', message: 'Cannot take Flexi Fund Contract with this rateplan' });
			return;
		}

		if(deviceContract === 'Normal' && ratePlan.includes('Fund')){
			if(!ratePlan.includes('Fibre Share')){
				this.setState({ status: 'FAILURE', message: 'Please select Flexi Fund as Device Contract with this rateplan' });
				return;
			}
		}
		if(!isVasRUleCheckValid){
			this.setState({ status: 'FAILURE', message: 'Failed Vas Rule Check, kinldy validate your vases again' });
			return;
		}
		if ((orderCategory==='Existing Group' ) && ratePlan === undefined || ratePlan !== undefined && ratePlan.trim() === '') {
			if(regType ==='Contract Renewal'){
				if(ratePlanId===null){
					  this.setState({ ratePlanId: 0});
				        return;
				}
				}else{
				this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
				return;
				}		
		}
		// if(obsDevicesCount > obsRTFDeviceCount){
		// 	console.log('OBSDeviceCount'+obsDevicesCount);
		// 	console.log('OBSRTFDeviceCount'+obsRTFDeviceCount);
		// 	console.log('nrtf device count:'+obsNonRTFDeviceCount);
		// 	this.setState({ status: 'FAILURE', message: 'You need to delete OBS Device Contract Devices from your cart if you want Zerolution Devices' });
		// 	return;
		// }

		if ((regType !== undefined && regType.trim() !== 'Upgrade' && regType.trim() !== 'Downgrade' && regType.trim() !== 'MISC eSMS' && regType.trim() !== 'Group Level Add-On') && mobileNumber.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'Msisdn is mandatory', isMsisdnMissing: true })
			return;
		}
		else if ((regType !== undefined && regType.trim() !== 'Upgrade' && regType.trim() !== 'Downgrade' && regType.includes('MISC FIBRE') && regType.trim() !== 'Group Level Add-On') && (installationAddress === null || installationAddress === undefined || installationAddress === '')) {
			this.setState({ status: 'FAILURE', message: 'Installation address is mandatory', isMsisdnMissing: true })
			return;
		}
		else if (regType !== 'Group Level Add-On' && (regType !== undefined && (regType.trim() === 'MNP Port In' || regType.trim() === 'Normal Registration')) && simCardNo.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'SIM Serial Number is mandatory', isSimNoissing: true })
			return;
		}
		else if (regType !== 'Group Level Add-On' && (regType !== undefined && (regType.trim() === 'MNP Port In' || regType.trim() === 'Normal Registration')) &&
			(simType !== undefined && simType.trim() === '')) {
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
		if (deviceContract === '1L1P Contract' && (flexiFundContractTaken || ratePlan.includes('Plan Only'))) {
			this.setState({ status: 'FAILURE', message: 'Cannot select 1L1P Contract with this rateplan', deviceContractCheckFail: true })
			return;
		}
		/*else if(){
			rate plan check
		}*/
		if (regType !== 'Group Level Add-On' && !regType.includes('MISC eSMS') && mobileNumber.trim() !== '') {
			if (regType === 'MISC FIBRE' && mobileNumber.length < 10) {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number. Length must be of 10 digit atleast for MISC FIBRE.', isMsisdnMissing: true })
				return;
			}
			else if (regType === 'VoiceGo' && mobileNumber.length < 10) {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number. Length must be of 10 digit atleast for VoiceGo.', isMsisdnMissing: true })
				return;
			}
			else if (regType !== 'Group Level Add-On' && regType !== 'VoiceGo' && mobileNumber.slice(0, 2) !== '60') {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number .  Please enter a valid number that starts with 60', isMsisdnMissing: true })
				return;
			}
			else if (regType !== 'MISC FIBRE' && regType !== 'VoiceGo' && mobileNumber.length < 11) {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number. Length must be of 11 digit atleast.', isMsisdnMissing: true })
				return;
			}
		}
		if (regType !== 'Group Level Add-On' && regType !== 'Contract Renewal' && !regType.includes('MISC') && !regType.includes('VoiceGo') && simCardNo.trim() !== '') {
			if (simCardNo.length < 19) {
				this.setState({ status: 'FAILURE', message: 'Invalid SIM Card number. Length must be of 19.', isSimNoissing: true })
				return;
			}
		}
		// if(regType !== 'Change Subscription' && !regType.includes('MISC') && this.props.orderCategory!=='Existing Group- Add VAS' ){
		// 		if(deviceContract===undefined || deviceContract===null || deviceContract===''){
		// 			this.setState({ status: 'FAILURE', message: 'Please select Device Contract first', isSimNoissing: true })
		// 			return;
		// 		}
		// }

		let tempRegType = '';
		if (this.props.orderCategory === 'Existing Group- Add VAS') {
			for (var i = 0; i < todos.length; i++) {
				if (i === 0 && (todos[0].regType  === 'Group Level Add-On' || todos[0].regType  === 'Member Level Add-VAS')) {
					tempRegType = todos[0].regType;
				}
				if (regType !== 'Group Level Add-On') {
					if  (todos[i].msisdn.trim()  ===  mobileNumber  ||  ((todos[i].simNo  !==  null  &&  todos[i].simNo  !==  '')  &&  todos[i].simNo.trim()  ===  simCardNo)) {
						this.setState({  status:  'FAILURE',  message:  'Mobile Number & SIM you have choosen is already there in the order'  });
						return;
					}
					if (tempRegType !== regType) {
						this.setState({  status:  'FAILURE',  message:  'This Type of action is not allowed. Ony one tye of registration is allowed for Add VAs' });
						return;
					}
				}
				else {
					if (tempRegType !== regType) {
						this.setState({  status:  'FAILURE',  message:  'This Type of action is not allowed. Ony one tye of registration is allowed for Add VAs' });
						return;
					}
					if  (todos[i].regType  === 'Group Level Add-On') {
						this.setState({  status:  'FAILURE',  message:  'Multiple opeartions of Vas are not allowed on Group Level Add-On registration type' });
						return;
					}
					else if (i > 0) {
						if (tempRegType !== todos[i].regType) {
							this.setState({  status:  'FAILURE',  message:  'This Type of action is not allowed. Ony one tye of registration is allowed for Add VAs' });
							return;
						}
					}
				}
			}
		} else {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].regType !== 'MISC eSMS') {
					if  (todos[i].msisdn.trim()  ===  mobileNumber  ||  (todos[i].simNo  !==  null && todos[i].simNo  !==  undefined &&  todos[i].simNo  !==  ''  &&  todos[i].simNo.trim()  ===  simCardNo)) {
						this.setState({  status:  'FAILURE',  message:  'Mobile Number & SIM you have choosen is already there in the order'  });
						return;
					}
				}
			}
		}
		let tempSimCardNo = null;
		let tempVSN = 'Test';
		if (regType === 'Non Member Transfer' || regType === 'Member Transfer' || regType ==='Contract Renewal') {
			if (!isContractCheckDone) {
				this.setState({ status: 'FAILURE', message: 'Please click Contract Check button first' });
				return;
			}
			tempSimCardNo = 'test';
		}
		else if (regType === 'Change Subscription' || regType === 'Group Level Add-On' || regType === 'Member Level Add-VAS') {
			tempSimCardNo = 'test';
			let tempCrpLineCount = crpLineCount + 1;
			tempVSN = this.props.selectedVSN;
			this.setState({ crpLineCount: tempCrpLineCount });
		}
		else {
			if (regType !== 'Group Level Add-On' && regType !== 'Member Level Add-VAS') {
				tempSimCardNo = simCardNo;
			}
		}
		if (this.props.orderCategory === 'Existing Group') {
			tempVSN = this.props.selectedVSN;
		}

		if (regType === 'MISC eSMS') {
			let miscCount = 1, miscEsms = false;
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].msisdn.includes('MISC_eSMS_')) {
					if (miscCount <= parseInt(todos[i].msisdn.substring(10, todos[i].msisdn.length))) {
						miscCount = parseInt(todos[i].msisdn.substring(10, todos[i].msisdn.length)) + 1;
						miscEsms = true;
					}
				}
			}
			if (miscEsms) {
				let msisdnValue = 'MISC_eSMS_' + miscCount;
				mobileNumber = msisdnValue
			} else {
				mobileNumber = 'MISC_eSMS_' + miscCount;
			}
			this.setState({ mobileNumber: mobileNumber });
		}
		let countMisc = 0;
		let countContractRenewal = 0;
		for (let i = 0; i < todos.length; i++) {
			if (todos[i].regType.includes('MISC') || todos[i].regType.includes('VoiceGo')) {
				countMisc += 1;
			}
			if (todos[i].regType === 'Contract Renewal' ) {
				countContractRenewal += 1;
			}
		}
		if (this.props.orderCategory === 'Existing Group') {
			console.log('todos.length',todos.length,'lineCount',this.state.lineCount,'countMisc',countMisc,'countContractRenewal',countContractRenewal);
			if (!(regType.includes('MISC') || regType.includes('VoiceGo') || regType ==='Contract Renewal') && (todos.length + this.state.lineCount - countMisc - countContractRenewal >= 150)) {
				this.setState({ status: 'FAILURE', message: 'Limit Reached, You can not add more than 150 lines.' });
				return;
			}
		}
		if (!(regType.includes('MISC') || regType.includes('VoiceGo') || regType ==='Contract Renewal') && (todos.length - countMisc - countContractRenewal >= 150)) {
			this.setState({ status: 'FAILURE', message: 'Limit Reached, You can not add more than 150 lines.' });
			return;
		}
		if (deviceContract === 'Zerolution' && (flexiFundContractTaken || byodContractTaken)) {
			this.setState({ status: 'FAILURE', message: 'Cannot take zerolution device with Fund Contract/ BYOD Contract', deviceContractCheckFail: true })
			return;
		}
		if (deviceContract === 'BYOD Contract' && !byodContractTaken){
			this.setState({ status: 'FAILURE', message: 'Cannot select BYOD Contract with this selected rateplan' })
			return;
		}
		console.log(mobileNumber, tempSimCardNo, regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId);
		if(deviceContract === 'Zerolution' && isZerolutionRTF && !isValidateStock){
			this.setState({ showDimmer: true,isValidateStock:false});
			this.props.validateStock(imeiNo,tempSimCardNo,this.props.user.sapStoreCode);
			return;
		}

		if (mobileNoValidSubscriber) {

			if((regType !== 'Change Subscription' && regType !== 'Contract Renewal') && ratePlanPkgId === 41968){
				var eligibleCountForSharebleLines = 0;
				var total48PlanShareableLinesTaken = 0;
					for (var i = 0; i < todos.length; i++) {
						if (todos[i].ratePlanPkgId === 41987 || todos[i].ratePlanPkgId === 41942 || todos[i].ratePlanPkgId === 41943 ) {
							eligibleCountForSharebleLines += 1;
						}else if(todos[i].ratePlanPkgId === 41944){
							eligibleCountForSharebleLines += 3;
						}else if(todos[i].ratePlanPkgId === 41945){
							eligibleCountForSharebleLines += 5;
						}else if(todos[i].ratePlanPkgId === 41946){
							eligibleCountForSharebleLines += 7;
						}else if(todos[i].ratePlanPkgId === 41968){
							total48PlanShareableLinesTaken +=1;
						}
					}
					if( (eligibleCountForSharebleLines+this.props.totalAllowed) - (total48PlanShareableLinesTaken+this.props.totalSubscribed)<=0){
						this.setState({ status: 'FAILURE', message: 'Limit reached to add shareable lines, add more non-shareable lines to cart first' });
						return;
					}
			}

			if(vasIdsSelected==undefined || vasIdsSelected==''){
				vasIdsSelected=null;
			}
			this.setState({ showDimmer: true });
			if (!(regType.includes('MISC') || regType.includes('VoiceGo') )) {
						this.props.validateLine(mobileNumber, tempSimCardNo, regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId,vasIdsSelected, this.state.ratePlanPkgId, this.props.orderCategory);
			} else {
						this.props.validateLine(mobileNumber, 'tempSimCardNo', regType, tempVSN, this.props.user.userRole, this.props.user.salesChannelId, 'fd', ratePlanId,vasIdsSelected, this.state.ratePlanPkgId, this.props.orderCategory);
			}

		}
		else {
			this.setState({ status: 'FAILURE', message: 'Not a valid subscriber' });
			return;
		}
		this.setState({isContractCheckDone:false});
	}
	contractCheck = () => {
		this.setState({ status: 'SUCCESS', msisdnContracts: [], showDimmer: true });
		this.props.contractCheck(this.state.mobileNumber);
	}
	removeRow(row) {
		let { todos, currentPage, todosPerPage, countMisc, obsRTFDeviceCount } = this.state;
		let tempToDos = null;
		let tempCrpLineCount = 0;
		let tempCountMisc = 0;
		let isNonShareableLineDeleted = false;
		let crpMsisdnList = [];

		tempToDos = todos.filter((x) => {
			return x.msisdn !== row.msisdn
		});

		if(row.ratePlanPkgId != null && row.ratePlanPkgId != undefined && row.ratePlanPkgId !== 41968 &&
		( row.ratePlanPkgId === 41987 || row.ratePlanPkgId === 41942 || row.ratePlanPkgId === 41943 || row.ratePlanPkgId === 41944 || row.ratePlanPkgId === 41945
			|| row.ratePlanPkgId === 41946)){
			isNonShareableLineDeleted = true;
		}

		if((row.regType !== undefined && row.regType !== null && row.regType !== 'Contract Renewal')){
			var eligibleCountForSharebleLines = 0;
			var total48PlanShareableLinesTaken = 0;
				for (var i = 0; i < tempToDos.length; i++) {
					crpMsisdnList = [...crpMsisdnList, tempToDos[i].msisdn];
					if (tempToDos[i].ratePlanPkgId === 41987 || tempToDos[i].ratePlanPkgId === 41942 || tempToDos[i].ratePlanPkgId === 41943 ) {
						eligibleCountForSharebleLines += 1;
					}else if(tempToDos[i].ratePlanPkgId === 41944){
						eligibleCountForSharebleLines += 3;
					}else if(tempToDos[i].ratePlanPkgId === 41945){
						eligibleCountForSharebleLines += 5;
					}else if(tempToDos[i].ratePlanPkgId === 41946){
						eligibleCountForSharebleLines += 7;
					}else if(tempToDos[i].ratePlanPkgId === 41968){
						total48PlanShareableLinesTaken +=1;
					}
				}

			
			if(isNonShareableLineDeleted){
				if( (eligibleCountForSharebleLines+this.props.totalAllowed) - (total48PlanShareableLinesTaken+this.props.totalSubscribed)<0){
					this.setState({ status: 'FAILURE', message: 'Cant delete  non-shareable lines from cart, you need to first delete dependent shareable lines'});
					return;
				}
			}

			this.setState({shareMemberAllowed: eligibleCountForSharebleLines, sharedMemberSubscribed: total48PlanShareableLinesTaken});
			if(row.regType === 'Change Subscription'){
				let crpRequest = {
					selectedVSN: this.props.selectedVSN,
					msisdnList: crpMsisdnList
				}
				this.setState({ showDimmer: true });
				this.props.getExistingShareableLineCountExcludeCRPMsisdns(crpRequest);
			}
		}
		
		
		

		let tempTotalDeviceTopUp = 0
		var tempObsDevicesCount = 0;
		let tempObsRTFDeviceCount = 0;
		let tempObsNonRTFDeviceCOunt = 0;
		tempToDos.map((x) => {
			if (x.regType === 'Change Subscription') {
				tempCrpLineCount = tempCrpLineCount + 1;
			} else if (x.regType.includes('MISC') || x.regType.includes('VoiceGo')) {
				tempCountMisc = tempCountMisc + 1;
			}
			if (x.lineDeviceInfo !== null && x.lineDeviceInfo.deviceTopUp !== undefined
				&& x.lineDeviceInfo.deviceTopUp !== null && x.lineDeviceInfo.deviceTopUp !== '') {
				tempTotalDeviceTopUp += Number(x.lineDeviceInfo.deviceTopUp);
			}
			if (x.lineDeviceInfo !== null && x.lineDeviceInfo.imeiNo !== undefined
				&& x.lineDeviceInfo.imeiNo !== null && x.lineDeviceInfo.imeiNo !== '') {
				tempObsRTFDeviceCount++;
			}
			if(x.lineDeviceInfo !== undefined && x.lineDeviceInfo !== null && ( x.lineDeviceInfo.imeiNo === undefined || x.lineDeviceInfo.imeiNo === null ||
				 x.lineDeviceInfo.imeiNo === '' )&& x.deviceContract!='Zerolution'){
				tempObsDevicesCount++;
			}
			if((x.deviceContract==='Zerolution' || x.deviceContract==='1L1P Contract') && !x.isZerolutionRTF && x.lineDeviceInfo !== undefined && x.lineDeviceInfo !== null){
				tempObsNonRTFDeviceCOunt++;
			}
		});
		if(tempToDos!== undefined && tempToDos!==null){
			let contractCount=0;
			tempToDos.map((currentTodo)=>{
				if((currentTodo!==null && currentTodo.isActiveKenanContractPresent) || currentTodo.regType === 'Contract Renewal' ){
					contractCount++;
				}
			})
			this.setState({activeKenanContractCount:contractCount})
		}
		this.setState({
			todos: tempToDos,
			firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage+1,
			crpLineCount: tempCrpLineCount,
			countMisc: tempCountMisc,
			totalDeviceTopUp: tempTotalDeviceTopUp,
			obsDevicesCount:tempObsDevicesCount,
			obsRTFDeviceCount: tempObsRTFDeviceCount > 0 ? tempObsRTFDeviceCount: 0,
			obsNonRTFDeviceCount : tempObsNonRTFDeviceCOunt
		});
		this.props.setLineDetails(tempToDos, tempCrpLineCount, countMisc, tempTotalDeviceTopUp);
	}

	checkIsNumeric = (value) => {
		if (value !== undefined && value !== null && value !== '') {
			var regex = /^[0-9]+$/;
			return regex.test(value) ? true : false;
		} else {
			return true;
		}

	}

	handleChange = (e, { type, name, value, checked }) => {
		console.log(name,value);
		this.setState({ status: '', message: '' });
		var deviceTopUp = null;
		
		let { isZerolutionRTF, safeDevice, obsRTFDeviceCount, deviceId, showDimmer, deviceContract } = this.state;
	
		if ((name === 'mobileNumber' || name === 'simCardNo' || name === 'donorAccountNo' || name === 'imeiNo')) {
			var checkIsNumeric = this.checkIsNumeric(value);
			if (checkIsNumeric)
				this.setState({ [name]: value });
		}
		else {
			if (name === 'ratePlan') {
				if (this.state.regType !== undefined && this.state.regType !== null && this.state.regType === 'Member Transfer' && this.state.mobileNumber !== undefined && (this.state.mobileNumber === null || this.state.mobileNumber === '')) {
					this.setState({ status: 'FAILURE', message: 'Please enter Msisdn No first & validate its contract check' });
					return;
				}
				else if (this.state.regType !== undefined && this.state.regType !== null && this.state.regType === 'Member Transfer' && (this.state.isContractCheckDone === undefined || this.state.isContractCheckDone === false)) {
					this.setState({ status: 'FAILURE', message: 'Please click Contract Check button first' });
					return;
				}
				else if (this.state.regType !== undefined && this.state.regType !== null && this.state.regType === 'Member Transfer' && this.state.mobileNoValidSubscriber === false) {
					this.setState({ status: 'FAILURE', message: 'Msisdno you entered is invalid subscriber' });
					return;
				}
				this.setState({ phoneModel: '', lineDeviceInfo: '', deviceId: '', deviceTopUp: null, deviceContract: '' ,rpMasterId:-1});
			}
			if (name === 'deviceContract') {
				if (this.state.ratePlan === undefined || this.state.ratePlan === null || this.state.ratePlan === '') {
					this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
					return;
				}
				if(value === ''){
					this.setState({ phoneModel: '', lineDeviceInfo: '', deviceId: '', deviceTopUp: null, deviceContract: '',rpMasterId:-1,isZerolutionRTF:false });
				}else{
					this.setState({isZerolutionRTF:false});
				}
			}

			this.setState({ [name]: value });

		}
		if(name === 'simCardNo' || name === 'imeiNo'){
			this.setState({isValidateStock:false});
		}
		if (name === 'regType') {
			if (value !== 'Group Level Add-On' && value !== 'Member Level Add-VAS' &&
				value !== 'MISC FIBRE' && value !== 'VoiceGo' &&
				value !== 'MISC eSMS') {
				this.setState({
					mobileNumber: '', simCardNo: '', simType: '', phoneModel: '',
					ratePlan: '', deviceContract: '', donor: '', donorAccountNo: '',
					lineDeviceInfo: '', deviceId: '', deviceTopUp: null,rpMasterId:-1, showDimmer: true
				});
				if(value !== 'Contract Renewal'){
				  this.props.getRateplansobs(value, this.props.user.userId,'test')
				}else{
					this.setState({	showDimmer: false});
				}
				let regTypeId = null;
				this.props.regTypes.map((currentRegType) => {
					if (currentRegType.value === value) {
						regTypeId = currentRegType.key
					}
				})
				this.setState({ ratePlanId: null, selectedVas: [], flexiFundContractTaken: false, donorAccountNo: '', donorType: '', regTypeId: regTypeId, mobileNoValidSubscriber: true, byodContractTaken: false });
				if (value === 'MNP Port In') {
					this.props.getDonorTypes();
				}
			}
			else if (value === 'Group Level Add-On') {
				this.setState({ showDimmer: true });
				this.props.getRatePlanData('0', 'ADD_VAS_TYPE_VSN', this.props.selectedVSN, this.props.bundleType);
				let regTypeId = null;
				this.props.regTypes.map((currentRegType) => {
					if (currentRegType.value === value) {
						regTypeId = currentRegType.key
					}
				})
				this.setState({ mobileNumber: '404', simCardNo: '', simType: '', phoneModel: '', deviceContract: '', donor: '', donorAccountNo: '', regTypeId: regTypeId });
			}
			else if (value === 'Member Level Add-VAS') {
				let regTypeId = null;
				this.props.regTypes.map((currentRegType) => {
					if (currentRegType.value === value) {
						regTypeId = currentRegType.key
					}
				})
				this.setState({ mobileNumber: '', simCardNo: '', simType: '', phoneModel: '', deviceContract: '', donor: '', donorAccountNo: '', ratePlanId: '', ratePlan: '', regTypeId: regTypeId })
			}
			else if (value === 'MISC FIBRE' || value === 'VoiceGo' || value === 'MISC eSMS') {
				let regTypeId = null;
				this.props.regTypes.map((currentRegType) => {
					if (currentRegType.value === value) {
						regTypeId = currentRegType.key
					}
				})
				this.setState({
					mobileNumber: '', simCardNo: '', simType: '', phoneModel: '',
					ratePlan: '', deviceContract: '', donor: '', donorAccountNo: '',
					lineDeviceInfo: '', deviceId: '', deviceTopUp: null, regTypeId: regTypeId,rpMasterId:-1
				});
				this.props.getRateplansMisc(value, 'test')
			}
			// else if(value==='VoiceGo'){
			// 	let regTypeId=null;				
			// 	this.props.regTypes.map((currentRegType)=>{
			// 			if(currentRegType.value===value){
			// 				regTypeId=currentRegType.key
			// 			}
			// 	})
			// 	this.setState({ mobileNumber: '', simCardNo: '', simType: '', phoneModel: '',
			// 					 ratePlan: '', deviceContract: '', donor: '', donorAccountNo: '',
			// 					 lineDeviceInfo:'',deviceId:'',deviceTopUp:'',regTypeId: regTypeId });
			// 	this.props.getRateplansMisc(value,'test')
			// }
			// else if(value==='MISC eSMS'){
			// 	let regTypeId=null;				
			// 	this.props.regTypes.map((currentRegType)=>{
			// 			if(currentRegType.value===value){
			// 				regTypeId=currentRegType.key
			// 			}
			// 	})
			// 	this.setState({ mobileNumber: '', simCardNo: '', simType: '', phoneModel: '',
			// 					 ratePlan: '', deviceContract: '', donor: '', donorAccountNo: '',
			// 					 lineDeviceInfo:'',deviceId:'',deviceTopUp:'',regTypeId: regTypeId });
			// 	this.props.getRateplansMisc(value,'test')
			// }
		}
		else if (name === 'deviceContract' && (value === '1L1P Contract' || value ==='Zerolution')) {
			this.setState({ showDimmer: true });
			this.props.getOBSDevices(this.state.ratePlanId, (value ==='Zerolution'), this.state.ratePlanPkgId);
		}
		else if (name === 'phoneModel') {
			let tempDeviceId = '';
			let tempDeviceTopUp = null;
			let tempRrpMasterId = -1;
			this.state.obsDevices.map((tempOBSDevice) => {
				if (tempOBSDevice.value === value) {
					tempDeviceId = tempOBSDevice.key;
					tempDeviceTopUp = tempOBSDevice.topUpPrice;
					tempRrpMasterId = tempOBSDevice.rpMasterId;
				}
			})
			this.setState({ deviceId: tempDeviceId, deviceTopUp: tempDeviceTopUp,rpMasterId:tempRrpMasterId, showDimmer: true })
			this.props.getOBSDeviceInfo(tempDeviceId,tempRrpMasterId, safeDevice, (deviceContract==='Zerolution'));
		}
		else if (name === 'ratePlan') {
			this.props.ratePlans.map((rateplanRow) => {
				if (rateplanRow.value === value) {
					this.setState({ ratePlanId: rateplanRow.key, ratePlanPkgId: rateplanRow.ratePlanPkgId });
					this.setState({ showDimmer: true });
					if (this.state.regType !== undefined && this.state.regType !== null && (this.state.regType==='Member Transfer' || this.state.regType==='Contract Renewal')) {
						this.props.getVasPopupData(rateplanRow.key, this.state.regType, this.state.mobileNumber);
					}
					else {
						this.props.getVasPopupData(rateplanRow.key, 'test', '404');
					}
				}
			})
		}
	};

	handleDeviceClick = () => {
		if (this.state.ratePlan === undefined || this.state.ratePlan === null || this.state.ratePlan === '') {
			this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
			return;
		}
	}
	onClickIncrease = () => {
		let { addOnVal, addOnLimit } = this.state;
		let tempAddOnVal = 0;
		if (addOnVal < addOnLimit) {
			tempAddOnVal = addOnVal + 1;
			this.setState({ addOnVal: tempAddOnVal });
		}
	};
	onClickDecrease = () => {
		let { addOnVal } = this.state;
		let tempAddOnVal = 0;
		if (addOnVal > 0) {
			tempAddOnVal = addOnVal - 1;
			this.setState({ addOnVal: tempAddOnVal });
		}
	};
	fetchRatePlanDetails = () => {
		let { mobileNumber } = this.state;
		let { bundleType } = this.props;
		if (mobileNumber.trim() === '') {
			this.setState({ status: 'FAILURE', message: 'Msisdn is mandatory', isMsisdnMissing: true })
			return;
		}
		else {
			this.setState({ showDimmer: true });
			this.props.getRatePlanData(mobileNumber, 'ADD_VAS_TYPE_MSISDN', this.props.selectedVSN, bundleType);
		}
	};
	handleChangeCheckBox = (e, { name, checked }) => {
		let { deviceContract } = this.state;
		if (name === 'zerolutionSafeDevice') {
			this.setState({ [name]: checked, zerolutionSafeDevice: checked });
		}
		else if (name === 'isBizAddress') {
			this.setState({ [name]: checked, show: checked })
			this.newBizAddress.current.show();
		}else if(name === 'zerolutionRTF'){
			this.setState({ [name]: checked, isZerolutionRTF: checked //, regType: '', ratePlan: '', deviceContract:''
		 });
			// if(checked){
			// 	this.setState({
			// 		deviceContracts: [
			// 			{ key: '0', text: '-----Please Select-----', value: '' },
			// 			{ key: '1', text: 'Zerolution', value: 'Zerolution' }
			// 		]
			// 	});

			// }else{
			// 	this.setState({
			// 			deviceContracts: [
			// 				{ key: '0', text: '-----Please Select-----', value: '' },
			// 				{ key: '1', text: 'OBS Device Contract', value: 'OBS Device Contract' }
			// 			]
			// 	})
			// }
		}else if (name === 'safeDevice') {
			if(this.state.deviceId!==''){
					this.props.getOBSDeviceInfo(this.state.deviceId, '0000', checked, (deviceContract==='Zerolution'));
					this.setState({ [name]: checked, safeDevice: checked, showDimmer : true });
			}else{
					this.setState({ [name]: checked, safeDevice: checked });
			}
			
		}

	}

	select(checkedVAS, checkedIDDCountries, isVasRUleCheckValid) {
		if (isVasRUleCheckValid === 'Valid') {
			console.log('Vas Rule check is valid');
			console.log(checkedVAS, checkedIDDCountries);
			if (this.state.regType === 'Member Level Add-VAS' && this.state.vasList !== null && this.state.vasList !== undefined &&
				(this.state.vasList.length === checkedVAS.length || checkedVAS.length === 0)) {
				this.setState({ status: 'FAILURE', message: 'You are choosing same vas which is already there, try using some other vases apart from existing ones', showDimmer: false });
				return;
			}
			else {
				this.setState({ vasList: checkedVAS, iddList: checkedIDDCountries, isaddMemberCheckValid: true, isVasRUleCheckValid: true });
			}
		}
		else {
			if (isVasRUleCheckValid === 'noActionPerformed') {
				console.log('No vas was selected, only default one is selected');
				this.setState(({isVasRUleCheckValid: true}));
			}
			else {

				this.setState(({isVasRUleCheckValid: false}));
				console.log('Vas Rule check is not valid');
			}
		}
		this.setState({ vasRule: {} });
	}

	vasRuleCheck(ratePlanId, strVasIds) {
		//console.log(ratePlanId, strVasIds);
		this.setState({vasIdsSelected:strVasIds});
		//console.log("vasIds "+ strVasIds);
		this.props.performVasRuleCheck(ratePlanId, strVasIds, this.props.bundleType);
	}
	onDismiss() {
		this.setState({ vasRule: {}, instMessage: {} });
	}
	close(proceed) {
		if (proceed === 'yes') {
			this.setState({ open: false, showDimmer: true});
			//this.props.history.push(this.state.nextUrl);
			console.log('todos',this.state.todos,'msidnlist',this.state.msisdnList,'length',this.state.todos.length);
			let tempMsisdnList = [];
			if(this.state.todos !== undefined && this.state.todos !== null && this.state.todos.length !== 0 ){
				tempMsisdnList = this.state.msisdnList;
			}
			this.props.setProductOrderInfoOBS(this.state.regType,
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
				tempMsisdnList,
				this.state.ratePlanId,
				this.state.vasList,
				this.state.iddList,
				this.state.crpLineCount,
				this.state.installationAddress,
				this.state.countMisc,
				this.state.obsRTFDeviceCount,
				this.state.isZerolutionRTF
			)
		}
		else {
			this.setState({ open: false })
		}
	}

	onSaveInsAddress = (installationAddress) => {
		this.setState({ installationAddress: installationAddress });
		this.props.saveInsAddress(installationAddress);
	}


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
			allPostCodes,
			isBizAddress,
			instMessage,
			countMisc,
			obsDevices,
			totalDeviceTopUp,
			obsDevicesCount,
			isZerolutionRTF,
			imeiNo,
			obsRTFDeviceCount,
			obsNonRTFDeviceCount,
			activeKenanContractCount,
			shareMemberAllowed,
			sharedMemberSubscribed
		} = this.state;
		let { regTypes, ratePlans, simTypes, zerolutionDevices, donorTypes, brn, orderCategory, selectedVSN, portalCustInfo, addOnLimit, bundleType } = this.props;
		if (todos === undefined) {
			todos = [];
		}
		indexOfLastTodo = currentPage * todosPerPage;
		indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
		const TableHeader = () => {
			let { isZerolutionRTF } = this.state;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
					{(orderCategory !== 'Existing Group- Add VAS') && (
						<React.Fragment>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>Reg. Info</label>
							</Grid.Column>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
								<label className='heading'>Delivery No.</label>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<label className='heading'>Mobile No.</label>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>Rate Plan</label>
							</Grid.Column>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
								<label className='heading'>VAS/ Contract</label>
							</Grid.Column>
							{	(isZerolutionRTF) && (
									<Grid.Column width={4} style={{ paddingRight: 0 }}>
										<label className='heading'>Device Info</label>
									</Grid.Column>
								)
							}
							{ (!isZerolutionRTF) && (
								<React.Fragment>
									<Grid.Column width={3} style={{ paddingRight: 0 }}>
										<label className='heading'>Device Info</label>
									</Grid.Column>
									<Grid.Column width={1} style={{ paddingRight: 1 }}>
										<label className='heading'>Device TopUp(RM)</label>
									</Grid.Column>
								</React.Fragment>
								)
							}
							<Grid.Column width={2} style={{ paddingRight: 0, paddingLeft: 20 }}>
								<div><label className='heading'>Line Status</label></div>
								<div><label className='heading'>Device Status</label></div>
							</Grid.Column>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>

							</Grid.Column>
						</React.Fragment>
					)
					}
					{(orderCategory === 'Existing Group- Add VAS') && (
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
			const { regId, regType, deliveryNo, msisdn, simNo, simType, ratePlan, lineStatus, deviceStatus, addOnVal, deviceContract,contractInfoDataCR } = line;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{regId}</div>
						<div>{regType}</div>
					</Grid.Column>
					{(orderCategory !== 'Existing Group- Add VAS' && !regType.includes('MISC') && !regType.includes('VoiceGo')) && (
						<React.Fragment>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
								<div>{deliveryNo}</div>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								{(regType !== 'Group Level Add-On') &&
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
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
								{/*<SecondaryButton compact value='ACTION' />*/}
								{(regType==='Contract Renewal') && 
									<SecondaryButton compact value='VIEW'  onClick={() => { this.openModalContractRenewal(regType,msisdn,ratePlan,contractInfoDataCR) }}  />
									}
							</Grid.Column>
							{(deviceContract!='Zerolution') && (
									<Grid.Column width={3} style={{ paddingRight: 0 }}>
										{
											(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>Device Model :{line.lineDeviceInfo.phoneModel}</div>
												</React.Fragment>
											)
										}
									</Grid.Column>
								)
							}
							{(deviceContract==='Zerolution') && (
									<Grid.Column width={4} style={{ paddingRight: 0 }}>
										{
											(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>Device Model :{line.lineDeviceInfo.phoneModel}</div>
													{
														(isZerolutionRTF == true) && (
															<React.Fragment>
																<div style={{ margin: 0 }}>IMEI NO :{line.lineDeviceInfo.imeiNo}</div>
																<div style={{ margin: 0 }}>Article ID :{line.lineDeviceInfo.deviceArticleId}</div>
															</React.Fragment>
															)
													}
													
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
									</Grid.Column>
								)
							}
							
							{(deviceContract!='Zerolution') && (
									<Grid.Column width={1} style={{ paddingRight: 0, paddingLeft: 25 }}>
										{
											(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined) && (
												<React.Fragment>
													<div>{line.lineDeviceInfo.deviceTopUp}</div>
												</React.Fragment>
											)
										}
									</Grid.Column>
								)
							}
							<Grid.Column width={2} style={{ paddingRight: 0, paddingLeft: 20 }}>
								<div>{lineStatus}</div>
								<div>{deviceStatus}</div>
							</Grid.Column>
						</React.Fragment>
					)
					}
					{(orderCategory === 'Existing Group- Add VAS') && (
						<React.Fragment>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								{(regType !== 'Group Level Add-On') &&
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
								{(regType === 'Group Level Add-On') && (
									<div>{addOnVal}</div>
								)
								}
							</Grid.Column>
						</React.Fragment>
					)
					}
					{(regType.includes('MISC') || regType.includes('VoiceGo')) && (
						<React.Fragment>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
								<div>{deliveryNo}</div>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<div><Icon name='phone' />{msisdn}</div>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<div>{ratePlan}</div>
							</Grid.Column>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								{/*<SecondaryButton compact value='ACTION' />*/}
							</Grid.Column>
							
							<Grid.Column width={2} style={{ paddingRight: 0}}>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<div>{lineStatus}</div>
							</Grid.Column>
						</React.Fragment>
					)
					}
					<Grid.Column width={1} style={{ paddingRight: 0 }}>
						<Button basic icon='trash' color='red' onClick={() => this.removeRow(line)} />
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
			const { contractType, contractRemainingMonth, contractTotalPenalty, msisdn } = line;
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
		return (
			<Container fluid>
				<PleaseWait active={showDimmer} />
				<Navigation index={4} group={bundleType} />
				<Segment basic style={{ padding: 0, paddingTop: 15, flex: 1 }}>
					<Form size='tiny'>
						<Grid style={{ paddingLeft: 25 }}>
							<StaticBlock1 brn={brn} orderCategory={orderCategory} selectedVSN={selectedVSN} companyName={portalCustInfo.companyName} />

							<Grid.Row style={{ paddingTop: 20, paddingBottom: 10 }}>
								<Grid.Column width='4' style={{ paddingLeft: 0, paddingBottm: 0 }} >
									<label style={{ color: '#293895' }} className='heading'> Business Postpaid </label>
								</Grid.Column>
								<Grid.Column width='4' style={{ paddingBottm: 0 }} floated='right'>Total Member:<span style={{ paddingLeft: 5 }}>{todos.length - crpLineCount - countMisc + lineCount - activeKenanContractCount}</span></Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
								<Grid.Column width='4' style={{ paddingLeft: 0, paddingBottm: 0 }} >
								</Grid.Column>
								<Grid.Column width='4' style={{ paddingBottm: 0, fontWeight: 'bold'  }} floated='right'>Shared Member Allowed:<span style={{ paddingLeft: 3 }}>{shareMemberAllowed+this.props.totalAllowed}</span></Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
								<Grid.Column width='4' style={{ paddingLeft: 0, paddingBottm: 0 }} >
								</Grid.Column>
								<Grid.Column width='4' style={{ paddingBottm: 0, fontWeight: 'bold'  }} floated='right'>Shared Member Subscribed:<span style={{ paddingLeft: 3 }}>{sharedMemberSubscribed+this.props.totalSubscribed}</span></Grid.Column>
							</Grid.Row>
							<Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
								<Grid.Column width='4' style={{ paddingLeft: 0, paddingBottm: 0 }} >
								</Grid.Column>
								<Grid.Column width='4' style={{ paddingBottm: 0, fontWeight: 'bold'  }} floated='right'>Remainder Share Member Allowed To Subscribe:<span style={{ paddingLeft: 3}}>{shareMemberAllowed-sharedMemberSubscribed+this.props.remainderAllowed}</span></Grid.Column>
							</Grid.Row>

							<Grid.Row style={{ padding: 0 }}>
								<Grid.Column width='16' style={{ paddingLeft: 0, paddingBottm: 0 }}>
									<label style={{ color: '#4E4E4E' }} className='heading'>Mobile</label>
								</Grid.Column>
							</Grid.Row>
							{	(this.props.user.isEligibleForZerolutioRTF && deviceContract==='Zerolution') && (
									<Grid.Row style={{ padding: 0 }}>
										<Grid.Column width='16' style={{ paddingLeft: 0, paddingBottm: 0 }}>
											<Checkbox style={{ padding: 5, fontWeight: 'bold', fontSize: 15, paddingLeft:0 }}  name='zerolutionRTF'  label='Real Time Fulfilment' onClick={this.handleChangeCheckBox} checked = {isZerolutionRTF} />
										</Grid.Column>
									</Grid.Row>
								)
							}
							<PlanSelection regTypes={regTypes}
								ratePlans={ratePlans}
								deviceContracts={deviceContracts}
								deviceContract={deviceContract}
								regType={regType}
								ratePlan={ratePlan}
								orderCategory={orderCategory}
								handleChange={this.handleChange}
								openModal={this.openModal}
								addOnVal={addOnVal}
								addOnLimit={addOnLimit}
								onClickIncrease={this.onClickIncrease}
								onClickDecrease={this.onClickDecrease}
								bundleType={bundleType}
								handleDeviceClick={this.handleDeviceClick} />
							{!(regType === 'MISC FIBRE' || regType === 'VoiceGo' || regType === 'MISC eSMS') &&
								<DeviceInfo
									regType={regType}
									simCardNo={simCardNo}
									simTypes={simTypes}
									simType={simType}
									mobileNumber={mobileNumber}
									obsDevices={obsDevices}
									phoneModel={phoneModel}
									deviceContract={deviceContract}
									handleChange={this.handleChange}
									handleChangeCheckBox={this.handleChangeCheckBox}
									contractCheck={this.contractCheck}
									fetchRatePlanDetails={this.fetchRatePlanDetails}
									isZerolutionRTF = { isZerolutionRTF }
									imeiNo = { imeiNo }
									orderCategory={orderCategory}	
									ratePlans={ratePlans}
									ratePlan={ratePlan}	
									/>
							}
							{regType === 'MNP Port In' &&
								<MNPInfo
									donorTypes={donorTypes}
									donotType={donorType}
									donorAccountNo={donorAccountNo}
									handleChange={this.handleChange}
								/>
							}
							{(regType === 'MISC FIBRE' || regType === 'VoiceGo' || regType === 'MISC eSMS') &&
								<Misc
									handleChangeCheckBox={this.handleChangeCheckBox}
									handleChange={this.handleChange}
									regType={regType}
									mobileNumber={mobileNumber}
									isBizAddress={isBizAddress}
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
						{(msisdnContracts !== null && msisdnContracts.length > 0) &&
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
								<label onClick={() => this.Device('First')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>First</label>
								<label onClick={() => this.Device('Prev')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>Prev</label>
								<label onClick={() => this.Device('Next')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>Next</label>
								<label onClick={() => this.Device('Last')} style={{ padding: 3, opacity: 0.7 }} className='pointer'>Last</label>
								<label onClick={() => this.Device('Last')} style={{ opacity: 0.7 }}>({(todos.length === 0) && (0)} {(todos.length > 0) && (currentPage)} of {Math.ceil(todos.length / todosPerPage)})</label>
							</Grid.Column>
						</Grid.Row>
						<TableHeader />
						{currentTodos.map((line, key) => {
							return (
								<TableRow key={key} line={line} />
							)
						})}
						{todos !== undefined && todos !== null && todos.length > 0 &&
							<StaticBlock11 totalLines={obsRTFDeviceCount+obsNonRTFDeviceCount} totalDeviceTopUp={totalDeviceTopUp} />
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
				<NewBizAddress ref={this.newBizAddress} allPostCodes={allPostCodes} installationAddress={this.props.installationAddress} onSaveInsAddress={(installationAddress) => this.onSaveInsAddress(installationAddress)} instMessage={instMessage} onDismiss={() => this.onDismiss()} />
				<ContractInfoAction 
					ref={this.contractInfoAction} 
					onClose={() => console.log('close')} />
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
		FETCH_OBS_DEVICE_INFO_STATUS: state.configuration.meta.FETCH_OBS_DEVICE_INFO_STATUS,
		SET_PRODUCT_ORDER_OBS_STATUS: state.order.meta.SET_PRODUCT_ORDER_OBS_STATUS,
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
		crpLineCount: state.order.data.crpLineCount,
		brn: state.order.data.brn,
		orderCategory: state.order.data.orderCategory,
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
		VAS_RULE_CHECK_STATUS: state.configuration.meta.VAS_RULE_CHECK_STATUS,
		vasMessage: state.configuration.data.vasMessage,
		vasList: state.order.data.vasList,
		iddList: state.configuration.data.iddList,
		regTypeId: state.order.data.regTypeId,
		CONTRACT_CHECK_STATUS: state.configuration.meta.CONTRACT_CHECK_STATUS,
		msisdnContracts: state.configuration.data.msisdnContracts,
		lineCount: state.configuration.data.lineCount,
		maxLineCount: state.configuration.data.maxLineCount,
		addOnDataBlock: state.order.data.addOnDataBlock,
		addOnLimit: state.order.data.addOnLimit,
		addOnVal: state.order.data.addOnVal,
		GET_ADD_ON_DATA_VSN_STATUS: state.order.meta.GET_ADD_ON_DATA_VSN_STATUS,
		vasValidateErrorMessage: state.order.data.vasValidateErrorMessage,
		FETCH_REG_TYPES_OBS_STATUS: state.configuration.meta.FETCH_REG_TYPES_OBS_STATUS,
		bundleType: state.order.data.bundleType,
		bccValidationFailed: state.configuration.data.bccValidationFailed,
		bccErrorMessage: state.configuration.data.bccErrorMessage,
		GET_BCC_VALIDATION_STATUS: state.configuration.meta.GET_BCC_VALIDATION_STATUS,
		allPostCodes: state.configuration.data.postCodeHint,
		installationAddress: state.order.data.installationAddress,
		SET_INSTALLATION_ADDRESS_STATUS: state.order.meta.SET_INSTALLATION_ADDRESS_STATUS,
		countMisc: state.order.data.countMisc,
		obsDevices: state.configuration.data.obsDevices,
		GET_OBS_DEVICES_STATUS: state.configuration.meta.GET_OBS_DEVICES_STATUS,
		totalDeviceTopUp: state.order.data.totalDeviceTopUp,
		obsRTFDeviceCount: state.order.data.zerolutionRTFfDeviceCount,
		FETCH_RATEPLANS_OBS_STATUS: state.configuration.meta.FETCH_RATEPLANS_OBS_STATUS,
		isZerolutionRTF: state.order.data.isZerolutionRTF,
		obsNonRTFDeviceCount: state.order.data.obsNonRTFDeviceCount,
		VALIDATE_STOCK_STATUS:state.order.meta.VALIDATE_STOCK_STATUS,
		validateStockMessage:state.order.data.validateStockMessage,
		totalAllowed:state.configuration.data.totalAllowed,
		totalSubscribed:state.configuration.data.totalSubscribed,
		remainderAllowed:state.configuration.data.remainderAllowed,
		EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP_STATUS: state.configuration.meta.EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP_STATUS
	}
}

const mapDispatchToProps = {
	getDonorTypes,
	getOBSDevices,
	setProductOrderInfoOBS,
	getOBSDeviceInfo,
	getVasPopupData,
	validateLine,
	fetchDeviceFundContracts,
	getSimTypes,
	performVasRuleCheck,
	contractCheck,
	setLineDetails,
	getFundAmount,
	checkEligibilityForFundDevice,
	getRatePlanData,
	setRatePlanBlank,
	getRegTypesobs,
	getRateplansobs,
	checkingBccValidation,
	getRateplansMisc,
	saveInsAddress,
	setRTFDeviceCount,
	validateStock,
	getExistingShareableLineCount,
	getExistingShareableLineCountExcludeCRPMsisdns
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)
