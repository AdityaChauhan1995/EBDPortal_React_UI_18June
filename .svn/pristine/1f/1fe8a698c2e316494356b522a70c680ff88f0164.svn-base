import React, { Component } from 'react';
import { Grid, Input, Button, Checkbox, Segment, Container, Icon, Form, Dropdown, Message, Confirm } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock1, StaticBlock7 } from '../../components/common/dumb-component';
import AddVas from './add-vas';
import AddVasMaxis from './add-vas-maxis';
import { connect } from 'react-redux';
import {
	getRegTypesERF, getRateplansERF, getSimTypes, getDonorTypes, getDeviceInfoERF, getVasListToDisplayERF, validateLineERF,
	performVasRuleCheckERF, contractCheckERF, getPromotions, getDeviceListERF,checkingBccValidation
} from '../../redux/actions/configuration';
import { setProductOrderInfoERF, setLineDetails, getFundAmount, setRTFDeviceCount,validateStock } from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';
import { isChangedToRejected } from '../../helpers/utils';
import VasActionMaxis from './vas-action-maxis'

const PlanSelection = ({ regTypes, ratePlans, deviceContracts, deviceContract, regType, ratePlan, handleChange, openModal, promotions, promotion,handleChangeCheckBox,isZerolutionRTF, user }) => {
	return (
		<Grid style={{ paddingLeft: 25 }}>
			<Grid.Row>
				<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Form.Field >
						<label>Device Contract</label>
						<Dropdown placeholder='Please select' size='small' selection options={deviceContracts} onChange={handleChange} value={deviceContract} name='deviceContract' fluid />
					</Form.Field>
				</Grid.Column>
				{	( user.isEligibleForZerolutioRTF && deviceContract === 'Zerolution' ) && (
						<Grid.Column width='6' style={{ paddingTop:25, paddingLeft: 10, paddingBottm: 0 }}>
							<Form.Field>
								<Checkbox style={{ padding: 5, fontWeight: 'bold', fontSize: 15, paddingLeft:0 }}  name='zerolutionRTF'  label='Real Time Fulfilment' onClick={handleChangeCheckBox} checked = {isZerolutionRTF}/>
						    </Form.Field>
						</Grid.Column>
					)
				}
			</Grid.Row>
			<Grid.Row >
				<Grid.Column width='3' style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Form.Field>
						<label>Type of Registration</label>
						<Dropdown placeholder='Please select' size='small' selection options={regTypes} onChange={handleChange} value={regType} name='regType' />
					</Form.Field>
				</Grid.Column>
				{(deviceContract !== 'Zerolution' && regType !== 'Contract Renewal') && (
					<Grid.Column width='6' style={{ paddingRight: 0 }}>
						<Form.Field>
							<label>Promotions</label>
							<Dropdown placeholder='Please select' size='small' search selection options={promotions} onChange={handleChange} value={promotion} name='promotion' />
						</Form.Field>
					</Grid.Column>
				)}
				{(regType !== 'Phone Only Order' && regType !== 'Contract Renewal') && (
					<React.Fragment>
						<Grid.Column width='3' style={{ paddingRight: 0 }}>
							<Form.Field>
								<label>Rate Plan</label>
								<Dropdown placeholder='Please select' size='small' search selection options={ratePlans} onChange={handleChange} value={ratePlan} name='ratePlan' />
							</Form.Field>
						</Grid.Column>
						<Grid.Column width='3' style={{ paddingRight: 0 }}>
							<Form.Field style={{ paddingTop: 10 }}>
								<p></p>
								<Button compact onClick={openModal} style={{ height: 32 }}>VAS</Button>
							</Form.Field>
						</Grid.Column>
					</React.Fragment>
				)}
			</Grid.Row>
		</Grid>
	)
}

const DeviceInfo = ({ regType, simCardNo, simTypes, safeDevice, upgradeSafeDevice, simType,billable, planTypes, planType, mobileNumber, deviceContract, deviceListERF, phoneModel, handleChange, handleChangeCheckBox, contractCheckERF,isZerolutionRTF ,imeiNo}) => {
	return (
		<React.Fragment>
			<Grid.Row style={{ padding: 0 }}>
				{(regType !== undefined && regType !== null && regType !== '') && (
					<Grid.Column width='3' style={{ padding: 0 }} >
						<Form.Field >
							<label>Mobile Number</label>
							<Input placeholder='Mobile Number' value={mobileNumber} name='mobileNumber' onChange={handleChange} type='Number' />
						</Form.Field>
					</Grid.Column>
				)
				}
				{(regType === 'Change Rate Plan' || regType === 'Add VAS' || regType === 'SI Transfer' || regType === 'Contract Renewal' || regType === 'Phone Only Order') && (
					<Grid.Column width='3' style={{ paddingTop: 24, paddingRight: 0 }} >
						<Form.Field >
							<SecondaryButton
								compact
								value='Contract Check'
								onClick={contractCheckERF} />
						</Form.Field>
					</Grid.Column>
				)
				}
				{(regType === 'SI Transfer') && (
					<React.Fragment>
						<Grid.Column width='3' style={{ paddingRight: 0 }}>
							<Form.Field >
								<label>Prepaid/PostPaid</label>
								<Dropdown placeholder='Prepaid/PostPaid' size='small' selection value={planType} options={planTypes} onChange={handleChange} name='planType' fluid />
							</Form.Field>
						</Grid.Column>
					</React.Fragment>
				)
				}
				{(regType === 'Normal Registration' || regType === 'Number Porting' || regType === 'MISC') && (
					<React.Fragment>
						<Grid.Column width='3' style={{ paddingRight: 0 }}>
							<Form.Field >
								<label>Sim Card No.</label>
								<Input placeholder='Sim Card No' value={simCardNo} onChange={handleChange} name='simCardNo' type='Number' />
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

				{(regType !== undefined && regType !== null && regType !== '') && (
					<React.Fragment>
						<Grid.Column width='5' >
							<Form.Field >
								<label>Phone Model</label>
								<Dropdown placeholder='----------------------Please Select----------------------' size='small' search selection options={deviceListERF} onChange={handleChange} value={phoneModel} name='phoneModel' />
							</Form.Field>
						</Grid.Column>
					</React.Fragment>
				)}
                {(deviceContract !== undefined && deviceContract !== null && deviceContract !== '') && (
					<Grid.Column width='1' style={{ paddingTop: 5, paddingLeft: 5 }}>
						<Form.Field >
							<label>Billable</label>
							<Checkbox style={{ padding: 5 }} onClick={handleChangeCheckBox} name='billable' checked={billable} />
						</Form.Field>
					</Grid.Column>
								)
								}
				{(deviceContract === 'Zerolution' && regType !== undefined && regType !== null && regType !== '' && regType !== 'Normal Registration') && (
					<React.Fragment>
						<Grid.Column width='1' style={{ padding: 0,paddingTop:5 }}>
							<Form.Field >
								<label>Safe Device</label>
								<Checkbox style={{ padding: 5 }} onClick={handleChangeCheckBox} name='safeDevice' checked={safeDevice} />
							</Form.Field>
						</Grid.Column>
					</React.Fragment>
				)}
			</Grid.Row>
			<Grid.Row style={{ padding: 0 }}>
				{(isZerolutionRTF === true && deviceContract === 'Zerolution' && (regType === 'Normal Registration'|| regType === 'Change Rate Plan' || regType === 'Phone Only Order')) && (
					<React.Fragment>
						<Grid.Column width='3' style={{ padding: 0 }} >
							<Form.Field >
							<label>IMEI No.</label>
							<Input placeholder='IMEI No' value={imeiNo} onChange={handleChange} name='imeiNo' />	
							</Form.Field>
						</Grid.Column>
					</React.Fragment>
				)}
				{(deviceContract === 'Zerolution' && regType === 'Normal Registration') && (
					<React.Fragment>
						<Grid.Column width='3' style={{ padding: 0,paddingLeft:10 }}>
							<Form.Field >
								<label>Safe Device</label>
								<Checkbox style={{ padding: 5 }} onClick={handleChangeCheckBox} name='safeDevice' />
							</Form.Field>
						</Grid.Column>
					</React.Fragment>
				)}
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
					<Input placeholder='Donor Account No' value={donorAccountNo} onChange={handleChange} name='donorAccountNo' fluid type='Number' />
				</Form.Field>
			</Grid.Column>
		</Grid.Row>
	)
}

class ProductOrder extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission",
			status: 'SUCCESS',
			message: '',
			showDimmer: false,
			open: false,
			deviceContracts: props.deviceContracts,
			deviceContract: props.deviceContract,
			planTypes: props.planTypes,
			planType: props.planType,
			regType: props.regType,
			regTypeId: props.regTypeId,
			promotion: props.promotion,
			promotionId: props.promotionId,
			ratePlan: props.ratePlan,
			ratePlanId: props.ratePlanId,
			vasList: props.vasList,
			iddList: props.iddList,
			strVasIds: '',
			vasRule: '',
			isValidVAS: true,
			isVasCheckDone: false,
			vasRuleErrorMsg:'',


			mobileNumber: props.mobileNumber,
			simCardNo: props.simCardNo,
			simType: props.simType,
			phoneModel: props.phoneModel,
			deviceId: '',
			donorType: props.donorType,
			donorAccountNo: props.donorAccountNo,
			phoneModelOutright: props.phoneModelOutright,
			deviceIdOutright: '',
			quantity: props.quantity,
			upgradeSafeDevice: props.upgradeSafeDevice,
			safeDevice: props.safeDevice,
			billable: props.billable,
			isOutright: props.isOutright,
			isContractCheckDone: false,
			lineDeviceInfo: props.lineDeviceInfo,
			msisdnContracts: [],
			packageDescriptionList: [],

			todos: props.todos,
			msisdnList: props.msisdnList,
			currentPage: 1,
			todosPerPage: 5,
			lastPage: null,
			indexOfLastTodo: null,
			indexOfFirstTodo: null,
			currentTodos: null,
			pageNumbers: [],
			firstIndexCurrentPage: 1,

			lineCount: props.lineCount,
			maxLineCount: props.maxLineCount,
			counter: 0,
			crpLineCount: props.crpLineCount,
			mobileNoValidSubscriber: true,
			addLineOutrightClicked: false,
			contractCheckErrMsg: '',
			addLineClicked: false,
			masterRegId: "New - Not Available Yet",
			contractDurationGrtrFourMonths:false,
			isContractDurationGrtrFourMonths:'',
			isZerolutionRTF:props.isZerolutionRTF,
			zerolutionRTFfDeviceCount: props.zerolutionRTFfDeviceCount,
			imeiNo:'',
			nonRTFDeviceCount: props.nonRTFDeviceCount,
			isValidateStock:false,
			vasIdsSelected:''
			
		};
		this.addVas = React.createRef();
		this.viewVas = React.createRef();
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
		let { todos } = this.state;
		let { orderCategory, selectedVSN } = this.props;
		if (todos === undefined) {
			this.setState({ todos: [] });
		}

	}

	componentWillReceiveProps(nextProps) {


		if (this.props.FETCH_REG_TYPES_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_REG_TYPES_STATUS === 'SUCCESS') {
			// set configuration
			if (this.state.deviceContract === 'Zerolution') {
				this.setState({ showDimmer: false });
			} else {
				this.props.getPromotions(this.props.user.userId, this.props.brn, this.props.user.userRole);
			}

		}
		else if (this.props.GET_PROMOTIONS_STATUS !== 'SUCCESS' &&
			nextProps.GET_PROMOTIONS_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false });
		}
		else if(this.props.SET_LINE_DETAILS_STATUS !== 'SUCCESS' &&
		nextProps.SET_LINE_DETAILS_STATUS === 'SUCCESS'){
			this.setState({ showDimmer: false });
		}
		else if (this.props.FETCH_SIM_TYPES_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_SIM_TYPES_STATUS === 'SUCCESS') {

			if (this.state.regType === 'Number Porting') {
				this.props.getDonorTypes();
			}
		}
		else if (this.props.FETCH_RATEPLANS_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_RATEPLANS_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false });
			this.props.getSimTypes();

		}
		else if (this.props.FETCH_VAS_POPUP_DATA_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_VAS_POPUP_DATA_STATUS === 'SUCCESS') {
			const { vasOptionals, vasIddCountries, vasContracts, vasMandatory, oldComponentList } = nextProps;
			let checkedVAS = '';

			this.setState({ showDimmer: false });
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
			if (oldComponentList !== null && oldComponentList.length > 0) {
				for (let i = 0; i < oldComponentList.length; i++) {
					for (let j = 0; j < oldComponentList[i].length; j++) {
						if (oldComponentList[i][j].checked) {
							let vasId = oldComponentList[i][j].vasId;
							checkedVAS = [...checkedVAS, { vasId: vasId, newComponentId: oldComponentList[i][j].componentId, newPackageId: oldComponentList[i][j].packageId }];
						}
					}
				}
			}
			let iddList = [];
			if (vasIddCountries !== null) {
				for (let i = 0; i < vasIddCountries.length; i++) {
					for (let j = 0; j < vasIddCountries[i].length; j++) {
						if (vasIddCountries[i][j].checked) {
							let countryId = vasIddCountries[i][j].countryId;
							iddList = [...iddList, { countryId }];
						}
					}
				}
			}

			this.setState({ vasList: checkedVAS, iddList: iddList });
			this.addVas.current.show(vasOptionals, vasMandatory, vasContracts, vasIddCountries, this.state.ratePlanId, oldComponentList);
		}
		else if (this.props.GET_DEVICE_LIST_ERF_STATUS !== 'SUCCESS' && nextProps.GET_DEVICE_LIST_ERF_STATUS === 'SUCCESS') {

			this.setState({ showDimmer: false });
		}

		else if (this.props.VAS_RULE_CHECK_STATUS !== 'SUCCESS' && nextProps.VAS_RULE_CHECK_STATUS === 'SUCCESS') {
			let tempVasRule = {
				status: 'SUCCESS',
				message: 'Vas selected successfully'
			}
			this.setState({ vasRule: tempVasRule, isValidVAS: true, showDimmer: false,vasRuleErrorMsg:'' });
		}
		else if (this.props.VAS_RULE_CHECK_STATUS !== 'FAILED' && nextProps.VAS_RULE_CHECK_STATUS === 'FAILED') {
			let tempVasRule = {
				status: 'FAILURE',
				message: nextProps.vasMessage
			}
			this.setState({ vasRule: tempVasRule, isValidVAS: false, showDimmer: false,	vasRuleErrorMsg: tempVasRule.message});
		}
		else if (this.props.FETCH_ZEROLUTION_DEVICE_STATUS !== 'SUCCESS' &&
			nextProps.FETCH_ZEROLUTION_DEVICE_STATUS === 'SUCCESS') {
			this.setState({
				showDimmer: false, lineDeviceInfo: {
					...nextProps.lineDeviceInfo,
					quantity: 1
				}
			});

		}
		else if (this.props.CONTRACT_CHECK_STATUS !== 'SUCCESS' && nextProps.CONTRACT_CHECK_STATUS === 'SUCCESS') {
			this.setState({
				mobileNoValidSubscriber: true, msisdnContracts: nextProps.msisdnContracts.contractInfoList,
				packageDescriptionList: nextProps.msisdnContracts.packageDescriptionList, showDimmer: false,
				 isContractCheckDone: true, contractCheckErrMsg: '',contractDurationGrtrFourMonths:nextProps.msisdnContracts.contractDurationGrtrFourMonths
				 
			});
			if (nextProps.msisdnContracts.errorMsg !== null && nextProps.msisdnContracts.errorMsg !== '') {
				this.setState({ status: 'FAILURE', message: nextProps.msisdnContracts.errorMsg });
			}
			if(nextProps.msisdnContracts.postPaid === true)
			{
              this.setState({ planType:'PostPaid'});
			}
			else if(nextProps.msisdnContracts.prePaid === true)
			{
             this.setState({planType:'Prepaid'});
			}
			else{
			this.setState({planType:''});
			}

			if(this.state.deviceContract === 'Zerolution' && this.state.regType === 'Phone Only Order'){
				this.setState({showDimmer: true, phoneModel:''})
				this.props.getDeviceListERF(this.state.deviceContract, -1, this.props.brn, this.state.mobileNumber , 0);
			}
		}
		else if (this.props.CONTRACT_CHECK_STATUS !== 'FAILED' && nextProps.CONTRACT_CHECK_STATUS === 'FAILED') {
			this.setState({ showDimmer: false, mobileNoValidSubscriber: false, isContractCheckDone: true ,contractDurationGrtrFourMonths:false});
			if (nextProps.msisdnContracts.errorMsg !== null && nextProps.msisdnContracts.errorMsg !== '') {
				this.setState({ status: 'FAILURE', message: nextProps.msisdnContracts.errorMsg, contractCheckErrMsg: nextProps.msisdnContracts.errorMsg });
			}
            if(nextProps.msisdnContracts.postPaid === true)
			{
              this.setState({ planType:'PostPaid'});
			}
			else if(nextProps.msisdnContracts.prePaid === true)
			{
             this.setState({planType:'Prepaid'});
			}
			else{
			this.setState({planType:''});
				}

			if(this.state.deviceContract === 'Zerolution' && this.state.regType === 'Phone Only Order'){
				this.setState({showDimmer: true, phoneModel:''})
				this.props.getDeviceListERF(this.state.deviceContract, -1, this.props.brn, this.state.mobileNumber , 0);
			}

		}
		else if (this.props.FETCH_ZEROLUTION_DEVICE_INFO !== 'SUCCESS' && nextProps.FETCH_ZEROLUTION_DEVICE_INFO === 'SUCCESS') {
			this.setState({ showDimmer: false });

		}
		else if (this.props.FETCH_ZEROLUTION_DEVICE_INFO !== 'FAILED' && nextProps.FETCH_ZEROLUTION_DEVICE_INFO === 'FAILED') {
			this.setState({ showDimmer: false });
		}
		else if (this.props.VALIDATE_LINE_STATUS !== 'SUCCESS' &&
			nextProps.VALIDATE_LINE_STATUS === 'SUCCESS') {
			let { todos, deviceContract, regType, regTypeId, ratePlan, ratePlanId, promotion, promotionId, vasList, iddList, mobileNumber, simCardNo,
				simType, donorType, donorAccountNo, lineDeviceInfo, crpLineCount, planType, currentPage, isValidVAS, isVasCheckDone,vasRuleErrorMsg,
				deviceId, billable, addLineOutrightClicked, deviceIdOutright, phoneModelOutright, phoneModel, safeDevice, upgradeSafeDevice ,
				quantity,contractDurationGrtrFourMonths, isZerolutionRTF, imeiNo, zerolutionRTFfDeviceCount, nonRTFDeviceCount} = this.state;

			let templineDeviceInfo = null, tempDeviceStatus = null;
			if (deviceId !== undefined && deviceId !== null && deviceId !== '') {
				templineDeviceInfo = lineDeviceInfo;
				tempDeviceStatus = 'Pending Approval'

				if(deviceContract ==='Zerolution' && isZerolutionRTF){
					templineDeviceInfo = {
						...this.state.lineDeviceInfo,
						imeiNo: imeiNo
					};
				}
				if(deviceContract ==='Zerolution' && isZerolutionRTF){
					this.setState({ zerolutionRTFfDeviceCount: zerolutionRTFfDeviceCount+1 });
				}else{
					this.setState({ nonRTFDeviceCount: nonRTFDeviceCount+1 });
				}
			}


			if (iddList === '') { iddList = []; }
			if (vasList === '') { vasList = []; }
			if (regType === 'Contract Renewal' || regType === 'Phone Only Order') { ratePlanId = 0, iddList = []; vasList = [] }
			if (!addLineOutrightClicked && (phoneModel === undefined || phoneModel === null || phoneModel === '')) { this.setState({ lineDeviceInfo: null }) }
			if (addLineOutrightClicked === true) {
				mobileNumber = this.state.mobileNumberOutright;
				ratePlanId = 20; promotion = ''; promotionId = 20;
				simCardNo = ''; donorType = ''; donorAccountNo = ''; planType = ''; simType = '', iddList = []; vasList = [];
				ratePlan = ''
				if (deviceIdOutright !== undefined && deviceIdOutright !== null && deviceIdOutright !== '') {
					templineDeviceInfo = lineDeviceInfo;
					tempDeviceStatus = 'Pending Approval'
				}

			}
			if(regType === 'SI Transfer')
			{
				planType='PostPaid';
			}
			let temptodos = [...todos, {
				regId: '[Not Available]',
				deviceContract: deviceContract,
				regType: regType,
				regTypeId: regTypeId,
				deliveryNo: '',
				ratePlan: ratePlan,
				ratePlanId: ratePlanId,
				promotion: promotion,
				promotionId: promotionId,
				msisdn: mobileNumber,
				simNo: simCardNo,
				simType: simType,
				donorType: donorType,
				donorAccountNo: donorAccountNo,
				planType: planType,
				lineDeviceInfo: templineDeviceInfo,
				lineStatus: 'Pending Approval',
				deviceStatus: tempDeviceStatus,
				vasList: vasList,
				iddList: iddList,
				billable: billable,
				contractDurationGrtrFourMonths:contractDurationGrtrFourMonths
			}];
			this.setState({
				todos: [...todos, {
					regId: '[Not Available]',
					deviceContract: deviceContract,
					regType: regType,
					regTypeId: regTypeId,
					deliveryNo: '',
					ratePlan: ratePlan,
					ratePlanId: ratePlanId,
					promotion: promotion,
					promotionId: promotionId,
					msisdn: mobileNumber,
					simNo: simCardNo,
					simType: simType,
					donorType: donorType,
					donorAccountNo: donorAccountNo,
					planType: planType,
					lineDeviceInfo: templineDeviceInfo,
					lineStatus: 'Pending Approval',
					deviceStatus: tempDeviceStatus,
					vasList: vasList,
					iddList: iddList,
					billable: billable,
					contractDurationGrtrFourMonths:contractDurationGrtrFourMonths
				}],
				firstIndexCurrentPage: currentPage,
				showDimmer: false,
				status: 'SUCCESS',
				mobileNumber: '',
				simCardNo: '',
				phoneModel: '',
				deviceId: '',
				simType: '',
				donorAccountNo: '',
				donorType: '',
				mobileNoValidSubscriber: true,
				contractDurationGrtrFourMonths:false,
				msisdnContracts: [],
				packageDescriptionList: [],
				isContractCheckDone: false,
				isValidVAS: true,
				isVasCheckDone: false,
				vasRuleErrorMsg:'',
				addLineOutrightClicked: false,
				billable: false,
				deviceIdOutright:'', 
				phoneModelOutright:'',
				quantity:'',
				imeiNo:''
			});


			this.props.setLineDetails(temptodos, crpLineCount);


		}
		else if (this.props.VALIDATE_LINE_STATUS !== 'FAILED' &&
			nextProps.VALIDATE_LINE_STATUS === 'FAILED') {
			this.setState({
				status: 'FAILURE', message: nextProps.validateErrorMessage, showDimmer: false, addLineOutrightClicked: false,
				isContractCheckDone: false,contractDurationGrtrFourMonths:false
			});
		}
		else if (this.props.SET_PRODUCT_ORDER_ERF_STATUS !== 'SUCCESS' &&
			nextProps.SET_PRODUCT_ORDER_ERF_STATUS === 'SUCCESS') {

			this.props.history.push(this.state.nextUrl);
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
				this.props.setProductOrderInfoERF(this.state.regType,
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
					this.state.planType,
					this.state.upgradeSafeDevice,
					this.state.safeDevice,
					this.state.billable,
					this.state.isOutright,
					this.state.phoneModelOutright,
					this.state.quantity,
					this.state.isContractDurationGrtrFourMonths,
					this.state.zerolutionRTFfDeviceCount,
					this.state.isZerolutionRTF,
					this.state.nonRTFDeviceCount
				)
			}
		}
		else if(isChangedToRejected(this.props.GET_BCC_VALIDATION_STATUS, nextProps.GET_BCC_VALIDATION_STATUS)){
			this.setState({status:'FAILURE',message:nextProps.bccErrorMessage , showDimmer: false});
		}
		else if (isChangedToRejected(this.props.VALIDATE_STOCK_STATUS, nextProps.VALIDATE_STOCK_STATUS)) {
			this.setState({ status: 'FAILURE', message: nextProps.validateStockMessage,isValidateStock:false, showDimmer:false });
			return;
		}
		else if (this.props.VALIDATE_STOCK_STATUS !== 'SUCCESS' && nextProps.VALIDATE_STOCK_STATUS === 'SUCCESS') {
			this.setState({isValidateStock:true, showDimmer:false });
			let { mobileNumber, regType,deviceContract,simCardNo,promotionId, ratePlanId,safeDevice,deviceId,upgradeSafeDevice,strVasIds,donorAccountNo  } = this.state;
			let tempSimCardNo = simCardNo;
			if (regType !== 'Normal Registration' && regType !== 'Number Porting' && regType !== 'MISC') {
				tempSimCardNo = 'Test';
			}
			let tempUpgradeSafeDevice = 'No', tempSafeDevice = 'No';
			if (upgradeSafeDevice === true) {
				tempUpgradeSafeDevice = 'Yes'
			}
			if (safeDevice === true) {
				tempSafeDevice = 'Yes'
			}
			if (deviceContract === 'Normal') {
				if (deviceId === undefined || deviceId === null || deviceId === '') { deviceId = 0; }
			} else {
				promotionId = -1
			}
			if (regType === 'Phone Only Order' || regType === 'Contract Renewal') {
				ratePlanId = -1;
				strVasIds = 'Test'
			if (regType === 'Contract Renewal') {
				promotionId = -1;
				}
			}
			if (regType !== 'Number Porting') {
			donorAccountNo = 'Test';
			}
			this.setState({ showDimmer: true, addLineOutrightClicked: false, isContractCheckDone: false });
			console.log("vasIdsSelected",this.state.vasIdsSelected);
			this.props.validateLineERF(mobileNumber, regType, deviceContract, tempSimCardNo, this.props.user.salesChannelId, this.props.brn, tempSafeDevice,
				tempUpgradeSafeDevice, ratePlanId, deviceId, strVasIds, 'No', donorAccountNo, promotionId, 0, this.props.user.userRole,this.state.vasIdsSelected);
		}
	}

	next = () => {
		let { todos, status, lineCount } = this.state;
		let { brn,bundleType } = this.props;
		let  isContractDurationGrtrFourMonths =false;
		if (todos === null || todos === undefined || todos.length === 0) {
			this.setState({ status: 'FAILURE', message: 'You must add atleast one line' });
			return;
		} else {
			
			let isOutrightAdded = false, isNormalDeviceContractAdded = false ; 

			todos.map((todo) => {
						if(todo.msisdn.includes('Outright')){
							isOutrightAdded = true;
						}
						if(todo.deviceContract === 'Normal' && !todo.msisdn.includes('Outright') ){
							isNormalDeviceContractAdded = true;
						}
						if(todo.contractDurationGrtrFourMonths){
							isContractDurationGrtrFourMonths = true;
						}
			});

			if (!isNormalDeviceContractAdded && isOutrightAdded) {
				this.setState({ status: 'FAILURE', message: 'Please add a msisdn of Normal-Device Contract type', showDimmer: false });
				return;
			} else {
				status = 'SUCCESS';
				this.setState({ showDimmer: true });
			}
		}
		
		let bccLineValueList=[];
		for (var i = 0; i < todos.length; i++) {
			if(todos[i].regType === 'Normal Registration' || todos[i].regType === 'SI Transfer' || todos[i].regType === 'Number Porting' || 
				todos[i].regType === 'Change Rate Plan' 
			   //|| todos[i].regType === 'Contract Renewal'
			   ){
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
			if(todos[i].regType === 'Normal Registration' || todos[i].regType === 'SI Transfer' || todos[i].regType === 'Number Porting')
				totalRequestingLine += 1;;
		}

		let bccRequestData = {
			brn:brn,
			totalRequestingLine:totalRequestingLine,
			groupName:bundleType,
			bccLineValueList:bccLineValueList};

		let msisdnList = '';
		if (status === 'SUCCESS') {
			todos.map((currentLine) => {
				let tempLineDeviceInfo = null;

				msisdnList = [...msisdnList,
				{
					regId: '',
					regType: currentLine.regType,
					regTypeId: currentLine.regTypeId,
					ratplan: currentLine.ratePlanId,
					deviceContract: currentLine.deviceContract,
					deliveryNumber: currentLine.deliveryNo,
					mobileInfo: {
						mobileNo: currentLine.msisdn,
						sim: currentLine.simNo,
						simType: currentLine.simType,
						donorAccountNo: currentLine.donorAccountNo,
						donorType: currentLine.donorType,
						planType: currentLine.planType
					},
					lineDeviceInfo: currentLine.lineDeviceInfo,
					contractInfo: [],
					lineStatus: 'Pending Approval',
					fundAmount: '',
					consumedAmount: '',
					balanceAmount: '',
					fundStatus: '',
					oldComponentList: [],
					vasList: currentLine.vasList,
					iddList: currentLine.iddList,
					promotion: currentLine.promotion,
					promotionId: currentLine.promotionId,
					billableInd: currentLine.billable
				}
				]
			})
			this.setState({showDimmer:true,msisdnList:msisdnList,isContractDurationGrtrFourMonths:isContractDurationGrtrFourMonths});
			//this.props.checkingBccValidation(brn,totalRequestingLine,strVasIds);
			this.props.checkingBccValidation(bccRequestData);
		}
	}
	previous = () => {
		let { isZerolutionRTF, zerolutionRTFfDeviceCount, nonRTFDeviceCount} = this.state;
		this.props.setRTFDeviceCount( nonRTFDeviceCount ,zerolutionRTFfDeviceCount, isZerolutionRTF);

		this.props.history.goBack();
	}
	openModal = () => {
		let { vasOptionals, vasMandatory, vasContracts, vasIddCountries } = this.props;
		let { promotionId, regType, ratePlanId, deviceContract, mobileNumber, phoneModel, isContractCheckDone } = this.state;
		if (deviceContract === undefined || deviceContract === null || deviceContract === '') {
			this.setState({ status: 'FAILURE', message: 'Please select Contract Type first' });
			return;
		}
		else if (regType === undefined || regType === null || regType === '') {
			this.setState({ status: 'FAILURE', message: 'Please select Registration Type first' });
			return;
		}
		else if (deviceContract === 'Normal' && (promotionId === undefined || promotionId === null || promotionId === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Promotion first' });
			return;
		}
		else if (ratePlanId === undefined || ratePlanId === null || ratePlanId === '') {
			this.setState({ status: 'FAILURE', message: 'Please select rateplan first' });
			return;
		}
		else if (regType !== 'Normal Registration' && regType !== 'Number Porting' && regType !== 'MISC' &&
			(mobileNumber === undefined || mobileNumber === null || mobileNumber === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Mobile Number first' });
			return;
		}

		if (regType === 'Normal Registration' || regType === 'Number Porting' || regType === 'MISC') {
			mobileNumber = 'Test';
		}

		if (deviceContract === 'Zerolution') {
			promotionId = -1;
			if (phoneModel === undefined || phoneModel === null || phoneModel === '') {
				this.setState({ status: 'FAILURE', message: 'Please select Phone Model first' });
				return;
			}
		}

		if (!isContractCheckDone && regType !== 'Normal Registration' && regType !== 'Number Porting' && regType !== 'MISC') {
			this.setState({ status: 'FAILURE', message: 'Please click Contract Check button first' });
			return;
		}
		this.setState({ showDimmer: true, status: 'SUCCESS' });
		this.props.getVasListToDisplayERF(promotionId, ratePlanId, regType, deviceContract, mobileNumber);


	}

	openViewModal = (vasList, msisdnNo, ratePlanName, existingVasList, rebateList, type, regType, prematurePenalty) => {
		this.viewVas.current.show(vasList, msisdnNo, ratePlanName, existingVasList, rebateList, type, regType, prematurePenalty);
	};

	addLineOutright = () => {
		let { todos, deviceContract, deviceIdOutright, phoneModelOutright, quantity, lineDeviceInfo, regType,crpLineCount } = this.state;
		//console.log('1',deviceContract, deviceIdOutright, phoneModelOutright, quantity, lineDeviceInfo, regType);
		let { userRole, salesChannelId } = this.props.user;
		let { brn } = this.props;
		if (deviceContract === undefined || deviceContract === null || (deviceContract !== null && deviceContract.trim() === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Contract Type first' });
			return;
		} else if (phoneModelOutright === undefined || phoneModelOutright === null || (phoneModelOutright !== null && phoneModelOutright.trim() === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Phone Model first' });
			return;
		} else if (regType === undefined || regType === null || (regType !== null && regType.trim() === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Registration Type first' });
			return;
		} else if (quantity === undefined || quantity === null || (quantity !== null && quantity.trim() === '')) {
			this.setState({ status: 'FAILURE', message: 'Please enter quantity first' });
			return;
		} else if (quantity < 0) {
			this.setState({ status: 'FAILURE', message: 'Please enter positive integral value in quantity' });
			return;
		}
		let maxCount = 1 , isRegTypeDeviceIdSame = false, tempOutrightMsisdn='', tempOutrightQuantity = '';
		this.setState({showDimmer:true});
		if (todos !== undefined && todos !== null && todos !== '') {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].msisdn.includes('Outright_')) {
					if (maxCount <= parseInt(todos[i].msisdn.substring(9, todos[i].msisdn.length))) {
						maxCount = parseInt(todos[i].msisdn.substring(9, todos[i].msisdn.length)) + 1
					}
					//console.log('2',todos[i].regType,todos[i].lineDeviceInfo.deviceId);
					if(todos[i].regType === regType && parseInt(todos[i].lineDeviceInfo.deviceId) === deviceIdOutright )
					{
						isRegTypeDeviceIdSame = true;
						tempOutrightMsisdn = todos[i].msisdn;
						tempOutrightQuantity = parseInt(todos[i].lineDeviceInfo.quantity);
					}
				}
			}
		}
		if(!isRegTypeDeviceIdSame){
			let mobileNumber = 'Outright_' + maxCount;
			this.setState({
				mobileNumberOutright: mobileNumber, lineDeviceInfo: {
					...lineDeviceInfo,
					quantity: this.state.quantity
				},
				isContractCheckDone: false, addLineOutrightClicked: true
			});
			console.log("vasIdsSelected",this.state.vasIdsSelected);
			this.props.validateLineERF(mobileNumber, 'regType', deviceContract, 'tempSimCardNo', salesChannelId, brn, 'No',
				'No', 20, deviceIdOutright, 'strVasIds', 'Yes', 'donorAccountNo', 20, quantity, userRole,this.state.vasIdsSelected);
		}
		else{
			let tempTodos =todos;
			//console.log('3',isRegTypeDeviceIdSame , tempOutrightMsisdn, tempOutrightQuantity,quantity );
			tempTodos.map((todo)=>{
							if(todo.msisdn === tempOutrightMsisdn){
								todo.lineDeviceInfo={...todo.lineDeviceInfo,
														quantity: tempOutrightQuantity+parseInt(quantity)
								}
							}

			});
			//console.log('tempTodos',tempTodos);
			this.setState({todos:tempTodos,deviceIdOutright:'', phoneModelOutright:'', quantity:'', lineDeviceInfo:''});
			setTimeout(() => this.props.setLineDetails(tempTodos,crpLineCount), 1000);

		}
		
	}

	addLine = () => {
		let { todos, deviceContract, regType, promotion, ratePlan, isVasCheckDone, mobileNumber, simCardNo, simType, donorAccountNo, donorType
			, isContractCheckDone, mobileNoValidSubscriber, planType, safeDevice, upgradeSafeDevice, ratePlanId, deviceId, promotionId, strVasIds
			, phoneModel, contractCheckErrMsg,vasRuleErrorMsg, zerolutionRTFfDeviceCount, isZerolutionRTF, imeiNo, nonRTFDeviceCount,isValidateStock,vasIdsSelected } = this.state;
			console.log("phone model",phoneModel);
			console.log("vasIdsSelected",vasIdsSelected);
		this.setState({ addLineClicked: true });
		if (deviceContract === undefined || deviceContract === null || (deviceContract !== null && deviceContract.trim() === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Contract Type first' });
			return;
		} else if (regType === undefined || regType === null || (regType !== null && regType.trim() === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Registration Type first' });
			return;
		} else if (deviceContract === 'Normal' && regType !== 'Contract Renewal' && (promotion === undefined || promotion === null || (promotion !== null && promotion.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Promotion first' });
			return;
		} else if (regType !== 'Phone Only Order' && regType !== 'Contract Renewal' && (ratePlan === undefined || ratePlan === null || (ratePlan !== null && ratePlan.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Rate Plan first' });
			return;
		} else if (mobileNumber === undefined || mobileNumber === null || (mobileNumber !== null && mobileNumber.trim() === '')) {
			this.setState({ status: 'FAILURE', message: 'Please select Mobile Number first' });
			return;
		} else if ((regType === 'Normal Registration' || regType === 'Number Porting' || regType === 'MISC') && (simCardNo === undefined || simCardNo === null || (simCardNo !== null && simCardNo.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Sim Number first' });
			return;
		} else if ((regType === 'Normal Registration' || regType === 'Number Porting' || regType === 'MISC') && (simType === undefined || simType === null || (simCardNo !== null && simType.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Sim Type first' });
			return;
		} else if ((regType === 'Number Porting') && (donorAccountNo === undefined || donorAccountNo === null || (donorAccountNo !== null && donorAccountNo.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Donor Account Number first' });
			return;
		} else if ((regType === 'Number Porting') && (donorType === undefined || donorType === null || (donorType !== null && donorType.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Donor Type first' });
			return;
		} else if ((regType === 'SI Transfer') && (planType === undefined || planType === null || (planType !== null && planType.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Prepaid/Postpaid first' });
			return;
		} else if (deviceContract === 'Zerolution' && (phoneModel === undefined || phoneModel === null || (phoneModel !== null && phoneModel.trim() === ''))) {
			this.setState({ status: 'FAILURE', message: 'Please select Phone Model first' });
			return;
		} else if (!isVasCheckDone) {
			this.setState({ status: 'FAILURE', message: 'Please click VAS button first' });
			return;
		} else if (regType !== 'Normal Registration' && regType !== 'Number Porting' && regType !== 'MISC' && !isContractCheckDone) {
			this.setState({ status: 'FAILURE', message: 'Please click Contract Check button first' });
			return;
		}
		else if (isVasCheckDone && vasRuleErrorMsg !== '' && vasRuleErrorMsg !== null && vasRuleErrorMsg !== undefined )
		{
			this.setState({ status: 'FAILURE', message: vasRuleErrorMsg});
			return;
		}


		if( deviceContract === 'Zerolution' && isZerolutionRTF && deviceId !== '' && imeiNo === ''){
			this.setState({ status: 'FAILURE', message: 'IMEI No is mandatory for Zerolution RTF' });
			return;
		}

		if(deviceContract === 'Zerolution' && isZerolutionRTF && deviceId !== '' && imeiNo.length<14){
			this.setState({ status: 'FAILURE', message: 'Need to key in minimum 14 digits IMEI No' });
			return;
		}
		
		if(deviceContract === 'Zerolution' && isZerolutionRTF && deviceId !== '' && imeiNo.length>18){
			this.setState({ status: 'FAILURE', message: 'IMEI No cannot be more than 18 digits' });
			return;
		}
		if( deviceContract === 'Zerolution' && !isZerolutionRTF && deviceId !== '' && zerolutionRTFfDeviceCount>0 ){
			this.setState({ status: 'FAILURE', message: 'You need to delete Zerolution RTF Devices from your cart if you want Normal Zerolution Devices' });
			return;
		}
		if( deviceContract === 'Normal'  && deviceId !== '' && zerolutionRTFfDeviceCount>0 ){
			this.setState({ status: 'FAILURE', message: 'You need to delete Zerolution RTF Devices from your cart if you want Normal Device Contract Devices' });
			return;
		}
		if( deviceContract === 'Zerolution' &&	isZerolutionRTF && deviceId !== '' && nonRTFDeviceCount>0){
			this.setState({ status: 'FAILURE', message: 'You need to delete Non RTF Devices from your cart if you want Zerolution RTF Devices' });
			return;
		}

		if( deviceContract === 'Zerolution' && isZerolutionRTF && deviceId !== '' && zerolutionRTFfDeviceCount >= 5){
				this.setState({ status: 'FAILURE', message: 'Limit reached, maximum of 5 Zerolution RTF Devices can be taken in one order' });
				return;
		}


		if (mobileNumber.trim() !== '') {
			if (mobileNumber.length < 11) {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number. Length is less than 11.' })
				return;
			}
			else if (mobileNumber.slice(0, 2) !== '60') {
				this.setState({ status: 'FAILURE', message: 'Invalid Mobile Number . Please enter a valid number that starts with 60' })
				return;
			}
		}
		if (simCardNo.trim() !== '') {
			if (simCardNo.length < 19) {
				this.setState({ status: 'FAILURE', message: 'Invalid SIM Card number. Length is less than 19.' })
				return;
			}
		}
		for (var i = 0; i < todos.length; i++) {
			if (todos[i].msisdn.trim() === mobileNumber || ((todos[i].simNo !== null && todos[i].simNo !== '') && todos[i].simNo.trim() === simCardNo)) {
				this.setState({ status: 'FAILURE', message: 'Mobile Number & SIM you have choosen is already there in the order' });
				return;
			}
		}
		let tempSimCardNo = simCardNo;
		if (regType !== 'Normal Registration' && regType !== 'Number Porting' && regType !== 'MISC') {
			tempSimCardNo = 'Test';
		}
		let { userRole, salesChannelId } = this.props.user;
		let { brn } = this.props;
		let tempUpgradeSafeDevice = 'No', tempSafeDevice = 'No';
		if (upgradeSafeDevice === true) {
			tempUpgradeSafeDevice = 'Yes'
		}
		if (safeDevice === true) {
			tempSafeDevice = 'Yes'
		}
		if (regType !== 'Number Porting') {
			donorAccountNo = 'Test';
		}
		if (deviceContract === 'Normal') {
			if (deviceId === undefined || deviceId === null || deviceId === '') { deviceId = 0; }
		} else {
			promotionId = -1
		}
		if (regType === 'Phone Only Order' || regType === 'Contract Renewal') {
			ratePlanId = -1;
			strVasIds = 'Test'
			if (regType === 'Contract Renewal') {
				promotionId = -1;
			}
		}
	
		if(deviceContract === 'Zerolution' && isZerolutionRTF && !isValidateStock){
			this.setState({ showDimmer: true,isValidateStock:false});
			this.props.validateStock(imeiNo,tempSimCardNo,this.props.user.sapStoreCode);
			return;
		}
		
		if (mobileNoValidSubscriber) {
			this.setState({ showDimmer: true, addLineOutrightClicked: false, isContractCheckDone: false });
			console.log(mobileNumber, regType, deviceContract, tempSimCardNo, salesChannelId, brn, tempSafeDevice,
				tempUpgradeSafeDevice, ratePlanId, deviceId, strVasIds, 'No', donorAccountNo, promotionId, 0, userRole,vasIdsSelected);
				console.log("vasIdsSelected",vasIdsSelected);
				if(vasIdsSelected==undefined || vasIdsSelected==''){
				vasIdsSelected=null;
			}
			this.props.validateLineERF(mobileNumber, regType, deviceContract, tempSimCardNo, salesChannelId, brn, tempSafeDevice,
				tempUpgradeSafeDevice, ratePlanId, deviceId, strVasIds, 'No', donorAccountNo, promotionId, 0, userRole,vasIdsSelected);
		}
		else {
			this.setState({ status: 'FAILURE', message: contractCheckErrMsg });
			return;
		}

	}
	contractCheckERF = () => {
		this.setState({ status: 'SUCCESS', msisdnContracts: [], packageDescriptionList: [] });
		let { mobileNumber, regType, deviceContract } = this.state;
		if (deviceContract === undefined || deviceContract === null || deviceContract === '') {
			this.setState({ status: 'FAILURE', message: 'Please select Contract Type first' });
			return;
		}
		else if (regType === undefined || regType === null || regType === '') {
			this.setState({ status: 'FAILURE', message: 'Please select Registration Type first' });
			return;
		}
		else if (mobileNumber === undefined || mobileNumber === null || mobileNumber === '') {
			this.setState({ status: 'FAILURE', message: 'Please select Mobile Number first' });
			return;
		}
		this.setState({ showDimmer: true });
		this.props.contractCheckERF(mobileNumber, regType, deviceContract, this.props.brn);
	}
	removeRow(row) {
		let { todos, currentPage, todosPerPage, crpLineCount } = this.state;
		let tempToDos = null;
		let tempZerolutionRTFfDeviceCount = 0;
		let tempNonRTFDeviceCount = 0;
		tempToDos = todos.filter((x) => {
			return x.msisdn !== row.msisdn
		});

		tempToDos.map((x) => {
			if ( x.deviceContract === 'Zerolution' && x.lineDeviceInfo !== null && x.lineDeviceInfo.imeiNo !== undefined
				&& x.lineDeviceInfo.imeiNo !== null && x.lineDeviceInfo.imeiNo !== '') {
				tempZerolutionRTFfDeviceCount++;
			}
			if ((x.deviceContract === 'Zerolution' || x.deviceContract === 'Normal') && x.lineDeviceInfo !== null && ( x.lineDeviceInfo.imeiNo === undefined || x.lineDeviceInfo.imeiNo === null ||
				x.lineDeviceInfo.imeiNo === '')) {
				tempNonRTFDeviceCount++;
			}
		});
		this.setState({
			todos: tempToDos,
			firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage + 1,
			zerolutionRTFfDeviceCount: tempZerolutionRTFfDeviceCount > 0 ? tempZerolutionRTFfDeviceCount: 0,
			nonRTFDeviceCount: tempNonRTFDeviceCount > 0 ? tempNonRTFDeviceCount: 0
		});
		this.props.setLineDetails(tempToDos, crpLineCount);
	}
	checkIsNumeric = (value) => {
		if (value !== undefined && value !== null && value !== '') {
			var regex = /^[0-9]+$/;
			return regex.test(value) ? true : false;
		} else {
			return true;
		}

	}

	handleChange = (e, { name, value }) => {

		if( name === 'imeiNo'){
			let checkIsNumeric = this.checkIsNumeric(value);
			if(checkIsNumeric === true || checkIsNumeric === 'true'){
				this.setState({ [name]: value });
			}
		}else{
			this.setState({ [name]: value });
		}
		if(name === 'simCardNo' || name === 'imeiNo'){
			this.setState({isValidateStock:false});
		}
		if (name === 'deviceContract') {
			this.setState({
				showDimmer: true, regType: '', regTypeId: '', promotion: '', ratePlan: '', mobileNumber: '', simCardNo: '', simType: '', planType: '',
				phoneModel: '', donorType: '', donorAccountNo: '', status: 'SUCCESS', isVasCheckDone: false, isContractCheckDone: false,
				addLineOutrightClicked: false, deviceIdOutright: '', phoneModelOutright: '', quantity: '', promotionId: '', ratePlanId: ''
				, lineDeviceInfo: null, safeDevice: false, upgradeSafeDevice: false, billable: false, deviceId: '',vasRuleErrorMsg:''
			});
			this.props.getRegTypesERF(value);
		}
		if (name === 'regType') {
			let tempRegTypeId = null;
			this.props.regTypes.map((currentRegType) => {
				if (currentRegType.value === value) {
					tempRegTypeId = currentRegType.key
				}
			})
			this.setState({
				regTypeId: tempRegTypeId, mobileNumber: '', simCardNo: '', simType: '', phoneModel: '', ratePlan: '', ratePlanId: '', donorType: '',
				donorAccountNo: '', status: 'SUCCESS', isContractCheckDone: false, promotion: '', promotionId: '', lineDeviceInfo: null,
				planType: '', phoneModelOutright: '', safeDevice: false, upgradeSafeDevice: false, billable: false, deviceId: '',
				vasRuleErrorMsg:''
			});
			let { deviceContract, promotionId } = this.state;
			if (value === 'Contract Renewal') {
				this.setState({ isVasCheckDone: true, showDimmer: true });
				this.props.getDeviceListERF(deviceContract, -1, this.props.brn, 0, 0);
			} else {
				this.setState({ isVasCheckDone: false });
			}
			if (deviceContract === 'Zerolution') {
				if (value !== 'Phone Only Order') {
					this.setState({ showDimmer: true });
					this.props.getRateplansERF(deviceContract, this.props.user.userId, 0, value, this.props.brn);
				}
			}
			 else {
				if (promotionId !== undefined && promotionId !== null && promotionId !== '') {
					this.setState({ showDimmer: true });
					this.props.getRateplansERF(deviceContract, this.props.user.userId, promotionId, value, this.props.brn);

				}

			}
		}
		else if (name === 'promotion') {
			let tempPromotionId = null;
			this.props.promotions.map((currentpromotion) => {
				if (currentpromotion.value === value) {
					tempPromotionId = currentpromotion.key
				}
			})
			let { deviceContract, regType } = this.state;
			this.setState({
				promotionId: tempPromotionId, ratePlan: '', donorAccountNo: '', donorType: '', planType: ''
				, isVasCheckDone: false, status: 'SUCCESS', isContractCheckDone: false,vasRuleErrorMsg:'',
				phoneModel: '',lineDeviceInfo: null
			});
			if (regType !== undefined && regType !== null && regType !== '') {
				this.setState({ showDimmer: true });
				this.props.getRateplansERF(deviceContract, this.props.user.userId, tempPromotionId, regType, this.props.brn);
			}

		}
		else if (name === 'phoneModel') {
			let tempDeviceId = '';
			this.props.deviceListERF.map((tempDevice) => {
				if (tempDevice.value === value) {
					tempDeviceId = tempDevice.key;
				}
			})
			if(tempDeviceId != -1 )
			{
				this.setState({ deviceId: tempDeviceId, status: 'SUCCESS', showDimmer: true, addLineOutrightClicked: false });
				let { deviceContract, upgradeSafeDevice, safeDevice } = this.state;
				let tempUpgradeSafeDevice = 'No', tempSafeDevice = 'No';
				if (upgradeSafeDevice === true) { tempUpgradeSafeDevice = 'Yes' }
				if (safeDevice === true) { tempSafeDevice = 'Yes' }
					this.props.getDeviceInfoERF(tempDeviceId, this.state.deviceContract, tempUpgradeSafeDevice, tempSafeDevice);
			}
			else {
				this.setState({phoneModel: '',lineDeviceInfo: null});
			}
					
		}
		else if (name === 'ratePlan') {
			let tempRatePlanId = 0;
			let tempRatePlanPkgId = 0;
			this.props.ratePlans.map((rateplanRow) => {
				if (rateplanRow.value === value) {
					this.setState({ ratePlanId: rateplanRow.key });
					tempRatePlanId = rateplanRow.key;
					tempRatePlanPkgId = rateplanRow.ratePlanPkgId
				}
			})
			let { promotionId, deviceContract } = this.state;
			this.setState({ showDimmer: true, ratePlanId: tempRatePlanId, isVasCheckDone: false,vasRuleErrorMsg:'',status: 'SUCCESS', isContractCheckDone: false, phoneModel: '',lineDeviceInfo: null});
			
			let { mobileNumber } = this.state;
			let tempMobileNumber = 0;
			
			if( mobileNumber !== undefined  && mobileNumber !== null && mobileNumber.trim() !== '') tempMobileNumber = mobileNumber;

			if(deviceContract === 'Zerolution'){
				this.props.getDeviceListERF(deviceContract, tempRatePlanId, this.props.brn, tempMobileNumber , tempRatePlanPkgId);
			}else{
				this.props.getDeviceListERF(deviceContract, tempRatePlanId, this.props.brn, tempMobileNumber, 0);
			}


		} else if (name === 'mobileNumber') {
			this.setState({ status: 'SUCCESS', isContractCheckDone: false });
			let { regType } = this.state;
			if (regType !== 'Normal Registration' && regType !== 'Number Porting' && regType !== 'MISC') {
				this.setState({ isVasCheckDone: false ,vasRuleErrorMsg:''});
			}
			if (regType === 'Phone Only Order' || regType === 'Contract Renewal') {
				this.setState({ isVasCheckDone: true,vasRuleErrorMsg:'' });
			}

		} else if (name === 'phoneModelOutright') {

			let tempDeviceId = '';
			this.props.deviceListERF.map((tempDevice) => {
				if (tempDevice.value === value) {
					tempDeviceId = tempDevice.key;
				}
			})
			if(tempDeviceId != -1 && tempDeviceId !== '' )
			{
			let tempUpgradeSafeDevice = 'No', tempSafeDevice = 'No';
			this.setState({ deviceIdOutright: tempDeviceId, status: 'SUCCESS', showDimmer: true, addLineOutrightClicked: true });
			this.props.getDeviceInfoERF(tempDeviceId, this.state.deviceContract, tempUpgradeSafeDevice, tempSafeDevice);
		}}


	};
	handleChangeCheckBox = (e, { name, checked }) => {
		console.log('name',name,'checked',checked);
		if (name === 'isOutright') {
			this.setState({ [name]: checked, isOutright: checked, showDimmer: true });
			this.props.getDeviceListERF(this.state.deviceContract, -1, this.props.brn,this.state.isZerolutionRTF,0,0);
		} else if (name === 'billable') {
			this.setState({ [name]: checked, billable: checked });
			console.log(this.state.billable);
		}else if(name === 'zerolutionRTF'){
			this.setState({ [name]: checked, isZerolutionRTF: checked});
		}else if (name === 'safeDevice') {
			let tempSafeDevice = 'No', tempUpgradeSafeDevice = 'No';
			let { deviceId, upgradeSafeDevice, deviceContract } = this.state;
			if (upgradeSafeDevice === true) {
				this.setState({ upgradeSafeDevice: false });
			}
			this.setState({ [name]: checked, safeDevice: checked });
			if (deviceId !== '' && deviceId !== -1) {
				if (checked === true) { tempSafeDevice = 'Yes' }
				this.setState({ showDimmer: true });
				this.props.getDeviceInfoERF(deviceId, deviceContract, tempUpgradeSafeDevice, tempSafeDevice);
			}
		} else if (name === 'upgradeSafeDevice') {
			let tempSafeDevice = 'No', tempUpgradeSafeDevice = 'No';
			let { deviceId, safeDevice, deviceContract } = this.state;
			if (safeDevice === true) {
				this.setState({ safeDevice: false });
			}
			this.setState({ [name]: checked, upgradeSafeDevice: checked });
			if (deviceId !== '' && deviceId !== -1) {
				if (checked === true) { tempUpgradeSafeDevice = 'Yes' }
				this.setState({ showDimmer: true });
				this.props.getDeviceInfoERF(deviceId, deviceContract, tempUpgradeSafeDevice, tempSafeDevice);
			}
		}


	}
	select(checkedVAS, checkedIDDCountries, isVasRUleCheckValid) {
		this.setState({ vasRule: {} });
		if (isVasRUleCheckValid === 'Valid') {
			this.setState({ vasList: checkedVAS, iddList: checkedIDDCountries, isVasCheckDone: true });
		}
		else {
			this.setState({ isVasCheckDone: true });
		}

	}

	vasRuleCheck(ratePlanId, strVasIds) {
		let { deviceContract, upgradeSafeDevice, safeDevice, mobileNumber, regType, deviceId } = this.state;
		let tempUpgradeSafeDevice = 'No', tempSafeDevice = 'No';
		if (upgradeSafeDevice === true) { tempUpgradeSafeDevice = 'Yes' }
		if (safeDevice === true) { tempSafeDevice = 'Yes' }

		if (deviceContract === 'Normal' && (deviceId === undefined || deviceId === null || deviceId === '')) {
			deviceId = -1;
		}
		if (deviceContract === 'Zerolution' && (deviceId === undefined || deviceId === null || deviceId === '')) {
			alert('Please select Phone Model first');
			return;
		}
		if (regType === 'Normal Registration' || regType === 'Number Porting' || regType === 'MISC') {
			mobileNumber = 'Test';
		}
		console.log(deviceContract, ratePlanId, strVasIds, mobileNumber, regType,
			this.props.brn, deviceId, tempUpgradeSafeDevice, tempSafeDevice);
			this.setState({vasIdsSelected:strVasIds});
		console.log("vasIds "+ strVasIds);
		this.setState({ showDimmer: true, strVasIds: strVasIds });
		this.props.performVasRuleCheckERF(deviceContract, ratePlanId, strVasIds, mobileNumber, regType,
			this.props.brn, deviceId, tempUpgradeSafeDevice, tempSafeDevice);
	}
	onDismiss() {
		this.setState({ vasRule: {} });
	}
	close(proceed) {
		if (proceed === 'yes') {
			this.setState({ open: false, showDimmer: true });
			this.props.history.push(this.state.nextUrl);

		}
		else {
			this.setState({ open: false })
		}
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
			packageDescriptionList,
			lineCount,
			crpLineCount,
			planTypes,
			planType,
			safeDevice,
			upgradeSafeDevice,
			phoneModelOutright,
			quantity,
			promotion,
			vasList,
			billable,
			isZerolutionRTF,
			imeiNo
		} = this.state;
		console.log('donorType', donorType);

		let { regTypes, ratePlans, simTypes, deviceListERF, donorTypes, brn, orderCategory, selectedVSN, portalCustInfo, promotions, bundleType } = this.props;
		if (todos === undefined) {
			todos = [];
		}
		indexOfLastTodo = currentPage * todosPerPage;
		indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
		const TableHeader = () => {
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<label className='heading'>Reg. Info</label>
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
					<Grid.Column width={2} style={{ paddingLeft: 35 }}>
						<div><label className='heading'>Billable</label></div>
					</Grid.Column>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div><label className='heading'>Line Status</label></div>
						<div><label className='heading'>Device Status</label></div>
					</Grid.Column>
				</Grid.Row>
			)
		}
		const TableRow = ({ line }) => {
			const { regId, regType, deliveryNo, msisdn, simNo, simType, ratePlan, lineStatus, deviceStatus, donorAccountNo, donorType } = line;
			let billable = line.billable ? 'Yes' : 'No';
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{(line.deviceContract) === "Normal"?'Maxis':(line.deviceContract)}</div>
						<div>{regId}</div>
						{(msisdn !== undefined && msisdn !== null && msisdn.includes('Outright')) &&
							<React.Fragment>
								<div>Outright Order</div>
							</React.Fragment>}

						{(msisdn !== undefined && msisdn !== null && !msisdn.includes('Outright')) &&
							<React.Fragment>
								<div>{regType}</div>
							</React.Fragment>}
					</Grid.Column>
					<Grid.Column width={3} style={{ paddingRight: 0 }}>
						{(msisdn !== undefined && msisdn !== null && !msisdn.includes('Outright')) &&
							<React.Fragment>
								<div><Icon name='phone' />{msisdn}</div>
								<div><Icon name='credit card' />{simNo}</div>
								<div><Icon name='id card outline' />{simType}</div>
							</React.Fragment>
						}
						{(donorType !== null && donorType !== '') &&
							<div><Icon name='id card outline' />{donorType}</div>
						}
						{(donorAccountNo !== null && donorAccountNo !== '') &&
							<div><Icon name='id card outline' />{donorAccountNo}</div>
						}
					</Grid.Column>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{ratePlan}</div>
					</Grid.Column>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						{
							(line.lineDeviceInfo !== undefined && line.lineDeviceInfo !== null && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null) && (
								<React.Fragment>
									<React.Fragment>
										<div style={{ margin: 0 }}><b>{line.lineDeviceInfo.deviceContract}</b></div>
										<div style={{ margin: 0 }}><Icon name='mobile alternate' /> {line.lineDeviceInfo.phoneModel}</div>
										{   (line.deviceContract=== 'Zerolution' && this.state.isZerolutionRTF ) && (
										        <React.Fragment>
										                <div style={{ margin: 0 }}>IMEI NO :{line.lineDeviceInfo.imeiNo}</div>
										                <div style={{ margin: 0 }}>Article ID :{line.lineDeviceInfo.deviceArticleId}</div>
										        </React.Fragment>
										    )
										}
										<div style={{ margin: 0 }}><Icon name='money bill alternate outline' /> RM {line.lineDeviceInfo.deviceRrp}</div>
										<div style={{ margin: 0 }}><Icon name='list ol' /> Quantity :{line.lineDeviceInfo.quantity}</div>
									</React.Fragment>
									{(line.deviceContract === 'Zerolution') &&
										<React.Fragment>
											<div style={{ margin: 0 }}><Icon name='repeat' /> RM {line.lineDeviceInfo.monthlyInstallment} x {line.lineDeviceInfo.noOfInstallments} Mths</div>
											{
												(line.lineDeviceInfo.isPremiumDeviceProtection === 'Yes') &&
												<div style={{ margin: 0 }}>Safe Device: {line.lineDeviceInfo.safeDeviceMnthlyChrg}</div>
											}
										</React.Fragment>
									}
								</React.Fragment>
							)
						}
						{
							(line.lineDeviceInfo === undefined || line.lineDeviceInfo === null) && (
								<React.Fragment>
									<div style={{ margin: 0 }}>No Device</div>
								</React.Fragment>
							)
						}
					</Grid.Column>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						{(line.vasList !== null && line.vasList !== undefined && line.vasList.length !== 0) &&
							<Button
								basic
								style={{ height: 28 }}
								fluid
								compact
								onClick={() => {
									this.openViewModal(line.vasList, msisdn, ratePlan, null, null, 'VIEW', regType, null)
								}}>
								<b>VIEW</b>
							</Button>
						}
					</Grid.Column>
					<Grid.Column width={2} style={{ paddingLeft: 45 }}>
						<div>{billable}</div>
					</Grid.Column>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{lineStatus}</div>
						<div>{deviceStatus}</div>
					</Grid.Column>
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

			const { contractType, contractDuration, contractRemainingMonth, contractTotalPenalty, contractTotalPenaltyLeft, msisdn } = line;

			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{this.state.mobileNumber}</div>
					</Grid.Column>
					<Grid.Column width={5} style={{ paddingRight: 0 }}>
						<div>Contract: {contractType}</div>
						<div>Remaining Tenure: {contractRemainingMonth}</div>
						<div>Penalty Amount (approx): {contractTotalPenalty}</div>
					</Grid.Column>
					<Grid.Column width={4} style={{ paddingRight: 0 }}>
						{(this.state.deviceContract === 'Zerolution' && contractType != null) &&
							<Checkbox style={{ padding: 5 }} />
						}
						{(this.state.deviceContract === 'Zerolution' && contractType == null) &&
							<Checkbox style={{ padding: 5 }} disabled={true} />
						}
					</Grid.Column>
				</Grid.Row>
			)
		}
		const TableRowPackageDescription = ({ line }) => {

			const { packageDescription } = line;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={8} style={{ paddingRight: 0 }}>
						<div>{packageDescription}</div>
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
							{bundleType != 'MAXIS' &&
								<StaticBlock1 brn={brn} orderCategory={orderCategory} selectedVSN={selectedVSN} companyName={portalCustInfo.companyName} />
							}
							{bundleType === 'MAXIS' &&
								<StaticBlock7 brn={brn} orderCategory={orderCategory} masterRegId={this.state.masterRegId} companyName={portalCustInfo.companyName} />
							}
						</Grid>
						<PlanSelection regTypes={regTypes}
							ratePlans={ratePlans}
							deviceContracts={deviceContracts}
							deviceContract={deviceContract}
							regType={regType}
							ratePlan={ratePlan}
							handleChange={this.handleChange}
							openModal={this.openModal}
							promotions={promotions}
							promotion={promotion}
							handleChangeCheckBox={this.handleChangeCheckBox}
							isZerolutionRTF={isZerolutionRTF}
							user = { this.props.user } />
						<Grid style={{ paddingLeft: 25 }}>
							<DeviceInfo
								regType={regType}
								simCardNo={simCardNo}
								simTypes={simTypes}
								simType={simType}
								mobileNumber={mobileNumber}
								deviceListERF={deviceListERF}
								phoneModel={phoneModel}
								deviceContract={deviceContract}
								handleChange={this.handleChange}
								handleChangeCheckBox={this.handleChangeCheckBox}
								contractCheckERF={this.contractCheckERF}
								planTypes={planTypes}
								planType={planType}
								safeDevice={safeDevice}
								upgradeSafeDevice={upgradeSafeDevice}
								billable={billable}
								isZerolutionRTF={isZerolutionRTF}
								imeiNo={imeiNo}
							/>

							{regType === 'Number Porting' &&
								<MNPInfo
									donorTypes={donorTypes}
									donorType={donorType}
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
											{(this.state.isContractCheckDone !== true || this.state.vasRuleErrorMsg != '' || !this.state.isValidateStock )&&
												<Message.Header>We have encounted an error.</Message.Header>}
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
							<Grid.Row>

								{(deviceContract === 'Normal') && (
									<React.Fragment>
										<Grid.Column width='2' style={{ paddingTop: 0, paddingLeft: 5,paddingBottom:0 }}>
											<Form.Field >
												<label>Outright Purchase</label>
												<Checkbox style={{ padding: 5 }} onClick={this.handleChangeCheckBox} name='isOutright' />
											</Form.Field>
										</Grid.Column>
										{(this.state.isOutright === true) && (
											<React.Fragment>
												<Grid.Column width='5' >
													<Form.Field >
														<label>Phone Model</label>
														<Dropdown placeholder='----------------------Please Select----------------------' size='small' search selection options={deviceListERF} onChange={this.handleChange} value={phoneModelOutright} name='phoneModelOutright' />
													</Form.Field>
												</Grid.Column>
												<Grid.Column width='3' >
													<Form.Field >
														<label>Quantity</label>
														<Input placeholder='Quantity' value={quantity} onChange={this.handleChange} name='quantity' fluid type='Number' />
													</Form.Field>
												</Grid.Column>
												<Grid.Column width='3' style={{ marginTop: '25px' }}>
													<SecondaryButton
														compact
														value='ADD DEVICE'
														onClick={this.addLineOutright} />
												</Grid.Column>
											</React.Fragment>
										)}
									</React.Fragment>
								)
								}
							</Grid.Row>

						</Grid>
					</Form>
					<Grid style={{ fontSize: 11, padding: 10, paddingLeft: 25 }}>
						{(msisdnContracts != undefined && msisdnContracts !== null && msisdnContracts.length > 0) &&
							<React.Fragment>
								<TableHeaderNMTContracts />
								{msisdnContracts.map((line, key) => {
									return (
										<TableRowNMTContracts key={key} line={line} />
									)
								})}
							</React.Fragment>
						}
						{(packageDescriptionList !== null && packageDescriptionList.length > 0) &&
							<React.Fragment>
								<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
									<Grid.Column width={6} style={{ paddingRight: 0 }}>
										<label className='heading'>Package Description</label>
									</Grid.Column>
								</Grid.Row>
								{packageDescriptionList.map((line, key) => {
									return (
										<TableRowPackageDescription key={key} line={line} />
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
				<AddVasMaxis
					ref={this.addVas}
					onClose={(checkedVAS, checkedIDDCountries, isVasRUleCheckValid) => this.select(checkedVAS, checkedIDDCountries, isVasRUleCheckValid)} onSave={(ratePlanId, strVasIds) => this.vasRuleCheck(ratePlanId, strVasIds)} vasRule={vasRule} onDismiss={() => this.onDismiss()} isValidVAS={isValidVAS} />
				<VasActionMaxis ref={this.viewVas}
					onClose={() => console.log('close')} />
			</Container>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		bundleType: state.order.data.bundleType,
		deviceContracts: state.configuration.data.deviceContracts,
		deviceContract: state.order.data.deviceContract,
		regTypes: state.configuration.data.regTypes,
		regType: state.order.data.regType,
		promotions: state.configuration.data.promotions,
		promotion: state.order.data.promotion,
		promotionId: state.order.data.promotionId,
		ratePlans: state.configuration.data.ratePlans,
		ratePlan: state.order.data.ratePlan,
		ratePlanId: state.order.data.ratePlanId,
		simTypes: state.configuration.data.simTypes,
		simType: state.order.data.simType,
		planTypes: state.configuration.data.planTypes,
		planType: state.order.data.planType,
		donorTypes: state.configuration.data.donorTypes,
		donorType: state.order.data.donorType,
		zerolutionDevices: state.configuration.data.zerolutionDevices,
		lineDeviceInfo: state.configuration.data.lineDeviceInfo,
		FETCH_ZEROLUTION_DEVICE_STATUS: state.configuration.meta.FETCH_ZEROLUTION_DEVICE_STATUS,
		SET_PRODUCT_ORDER_ERF_STATUS: state.order.meta.SET_PRODUCT_ORDER_ERF_STATUS,
		FETCH_REG_TYPES_STATUS: state.configuration.meta.FETCH_REG_TYPES_STATUS,
		mobileNumber: state.order.data.mobileNumber,
		simCardNo: state.order.data.simCardNo,
		phoneModel: state.order.data.phoneModel,
		phoneModelOutright: state.order.data.phoneModelOutright,
		donorAccountNo: state.order.data.donorAccountNo,
		quantity: state.order.data.quantity,
		upgradeSafeDevice: state.order.data.upgradeSafeDevice,
		safeDevice: state.order.data.safeDevice,
		billable: state.order.data.billable,
		isOutright: state.order.data.isOutright,
		todos: state.order.data.todos,
		crpLineCount: state.order.data.crpLineCount,
		brn: state.order.data.brn,
		orderCategory: state.order.data.orderCategory,
		selectedVSN: state.order.data.selectedVSN,
		vasOptionals: state.configuration.data.vasOptionals,
		vasMandatory: state.configuration.data.vasMandatory,
		vasContracts: state.configuration.data.vasContracts,
		vasIddCountries: state.configuration.data.vasIddCountries,
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
		lineCount: state.configuration.data.lineCount,
		maxLineCount: state.configuration.data.maxLineCount,
		GET_PROMOTIONS_STATUS: state.configuration.meta.GET_PROMOTIONS_STATUS,
		FETCH_SIM_TYPES_STATUS: state.configuration.meta.FETCH_SIM_TYPES_STATUS,
		deviceListERF: state.configuration.data.deviceListERF,
		GET_DEVICE_LIST_ERF_STATUS: state.configuration.meta.GET_DEVICE_LIST_ERF_STATUS,
		oldComponentList: state.configuration.data.oldComponentList,
		SET_LINE_DETAILS_STATUS:state.order.meta.SET_LINE_DETAILS_STATUS,
		bccValidationFailed:state.configuration.data.bccValidationFailed,
		bccErrorMessage:state.configuration.data.bccErrorMessage,
		GET_BCC_VALIDATION_STATUS: state.configuration.meta.GET_BCC_VALIDATION_STATUS,
		isZerolutionRTF: state.order.data.isZerolutionRTF,
		zerolutionRTFfDeviceCount: state.order.data.zerolutionRTFfDeviceCount,
		nonRTFDeviceCount: state.order.data.nonRTFDeviceCount,
		VALIDATE_STOCK_STATUS:state.order.meta.VALIDATE_STOCK_STATUS,
		validateStockMessage:state.order.data.validateStockMessage
	}
}

const mapDispatchToProps = {
	getRegTypesERF,
	getRateplansERF,
	getDonorTypes,
	setProductOrderInfoERF,
	getDeviceInfoERF,
	getVasListToDisplayERF,
	validateLineERF,
	getSimTypes,
	performVasRuleCheckERF,
	contractCheckERF,
	setLineDetails,
	getPromotions,
	getDeviceListERF,
	checkingBccValidation,
	setRTFDeviceCount,
	validateStock

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)