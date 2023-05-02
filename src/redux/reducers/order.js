import { combineReducers } from 'redux';
import {
	SET_REG_TYPE_PENDING,
	SET_REG_TYPE_FULFILLED,
	SET_PRODUCT_ORDER_PENDING,
	SET_PRODUCT_ORDER_FULFILLED,
	SET_DEVICE_FUND_PENDING,
	SET_DEVICE_FUND_FULFILLED,
	SET_COMPANY_INFO_PENDING,
	SET_COMPANY_INFO_FULFILLED,
	SET_ADDRESS_CONTACT_DETAILS_PENDING,
	SET_ADDRESS_CONTACT_DETAILS_FULFILLED,
	SET_ADDRESS_CONTACT_DETAILS_REJECTED,
	SET_SUBMISSION_INFO_PENDING,
	SET_SUBMISSION_INFO_FULFILLED,
	SET_ORDER_SUBMISSION_PENDING,
	SET_ORDER_SUBMISSION_FULFILLED,
	SET_ORDER_SUBMISSION_REJECTED,
	SET_APPROVAL_REG_TYPE_PENDING,
	SET_APPROVAL_REG_TYPE_FULFILLED,
	SET_APPROVAL_REG_TYPE_REJECTED,
	UNSET_ORDER_DATA_PENDING,
	UNSET_ORDER_DATA_FULFILLED,
	UNSET_ORDER_DATA_REJECTED,
	SET_APPROVAL_SUBMISSION_INFO_PENDING,
	SET_APPROVAL_SUBMISSION_INFO_FULFILLED,
	SET_ORDER_APPROVAL_PENDING,
	SET_ORDER_APPROVAL_FULFILLED,
	SET_ORDER_APPROVAL_REJECTED,
	FETCH_REGISTRATION_DETAILS_PENDING, FETCH_REGISTRATION_DETAILS_FULFILLED, FETCH_REGISTRATION_DETAILS_REJECTED,
	FETCH_LINE_DETAILS_PENDING, FETCH_LINE_DETAILS_FULFILLED, FETCH_LINE_DETAILS_REJECTED,
	SET_COMPANY_INFORMATION_PENDING, SET_COMPANY_INFORMATION_FULFILLED, SET_COMPANY_INFORMATION_REJECTED,
	SET_LINE_DETAILS_PENDING, SET_LINE_DETAILS_FULFILLED, SET_LINE_DETAILS_REJECTED,
	SET_MSISDN_DETAILS_PENDING, SET_MSISDN_DETAILS_FULFILLED, SET_MSISDN_DETAILS_REJECTED,
	SET_DEVICE_DETAILS_PENDING, SET_DEVICE_DETAILS_FULFILLED, SET_DEVICE_DETAILS_REJECTED,
	SET_APPROVAL_FUNDS_PENDING, SET_APPROVAL_FUNDS_FULFILLED, SET_APPROVAL_FUNDS_REJECTED,
	SET_SUBMISSION_INFO_PREVIOUS_PENDING, SET_SUBMISSION_INFO_PREVIOUS_FULFILLED, SET_SUBMISSION_INFO_PREVIOUS_REJECTED,
	SET_ADDRESS_CONTACT_DETAILS_PREVIOUS_PENDING, SET_ADDRESS_CONTACT_DETAILS_PREVIOUS_FULFILLED, SET_ADDRESS_CONTACT_DETAILS_PREVIOUS_REJECTED,
	SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_PENDING, SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_FULFILLED, SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_REJECTED,
	GET_FUND_AMOUNT_PENDING, GET_FUND_AMOUNT_FULFILLED, GET_FUND_AMOUNT_REJECTED,
	SET_COMPANY_INFORMATION_PREV_PENDING, SET_COMPANY_INFORMATION_PREV_FULFILLED, SET_COMPANY_INFORMATION_PREV_REJECTED,
	GET_CORP_OWNER_INFO_PENDING, GET_CORP_OWNER_INFO_FULFILLED, GET_CORP_OWNER_INFO_REJECTED,
	SET_RESUBMISSION_ORDER_SUBMISSION_PENDING, SET_RESUBMISSION_ORDER_SUBMISSION_FULFILLED, SET_RESUBMISSION_ORDER_SUBMISSION_REJECTED,
	SET_ORDER_PMP_PENDING, SET_ORDER_PMP_FULFILLED, SET_ORDER_PMP_REJECTED,
	SET_PRODUCT_ORDER_PREVIOUS_ERF_PENDING,SET_PRODUCT_ORDER_PREVIOUS_ERF_FULFILLED,
 	SET_RESUBMISSION_REGISTRATION_INFO_PENDING,SET_RESUBMISSION_REGISTRATION_INFO_FULFILLED, SET_RESUBMISSION_REGISTRATION_INFO_REJECTED,
	VALIDATE_OLD_MSISDNS_PENDING,VALIDATE_OLD_MSISDNS_FULFILLED,VALIDATE_OLD_MSISDNS_REJECTED,
	SET_PRODUCT_ORDER_PREVIOUS_PENDING,SET_PRODUCT_ORDER_PREVIOUS_FULFILLED,SET_PRODUCT_ORDER_PREVIOUS_REJECTED,	 	 	 
	SET_PRODUCT_ORDER_ERF_PENDING,SET_PRODUCT_ORDER_ERF_FULFILLED,
	SET_ELIGIBILITY_CHECK_PENDING,SET_ELIGIBILITY_CHECK_FULFILLED,SET_ELIGIBILITY_CHECK_REJECTED,
	GET_JWT_TOKEN_PENDING, GET_JWT_TOKEN_FULFILLED, GET_JWT_TOKEN_REJECTED,
	GET_ADD_ON_DATA_VSN_PENDING, GET_ADD_ON_DATA_VSN_FULFILLED, GET_ADD_ON_DATA_VSN_REJECTED,
	SET_RATEPLAN_BLANK_PENDING, SET_RATEPLAN_BLANK_FULFILLED, SET_RATEPLAN_BLANK_REJECTED,
	UPDATE_PAYMENT_PENDING, UPDATE_PAYMENT_FULFILLED, UPDATE_PAYMENT_REJECTED,
	UPDATE_CHANGE_PAYMENT_PENDING, UPDATE_CHANGE_PAYMENT_FULFILLED, UPDATE_CHANGE_PAYMENT_REJECTED,
	FETCH_LINE_DETAILS_SEARCH_DEALER_PENDING, FETCH_LINE_DETAILS_SEARCH_DEALER_FULFILLED, FETCH_LINE_DETAILS_SEARCH_DEALER_REJECTED,
	PUT_UPDATE_DELIVERY_STATUS_PENDING,PUT_UPDATE_DELIVERY_STATUS_FULFILLED,PUT_UPDATE_DELIVERY_STATUS_REJECTED,  
	PUT_DEALER_PICK_PACK_PENDING, PUT_DEALER_PICK_PACK_FULFILLED, PUT_DEALER_PICK_PACK_REJECTED,
	DEALER_SEARCH_UPDATE_IMEI_PENDING, DEALER_SEARCH_UPDATE_IMEI_FULFILLED, DEALER_SEARCH_UPDATE_IMEI_REJECTED,
	DEALER_SEARCH_DO_PICK_PACK_PENDING, DEALER_SEARCH_DO_PICK_PACK_FULFILLED, DEALER_SEARCH_DO_PICK_PACK_REJECTED,
	DEALER_SEARCH_DO_COMPLETE_PENDING, DEALER_SEARCH_DO_COMPLETE_FULFILLED, DEALER_SEARCH_DO_COMPLETE_REJECTED,
	SET_EMAIL_DATA_PENDING,SET_EMAIL_DATA_FULFILLED,SET_EMAIL_DATA_REJECTED ,
	SET_INSTALLATION_ADDRESS_PENDING, SET_INSTALLATION_ADDRESS_FULFILLED, SET_INSTALLATION_ADDRESS_REJECTED,
	SET_DEVICE_FUND_PREV_PENDING,SET_DEVICE_FUND_PREV_FULFILLED,
	GET_BULK_SEARCH_DATA_PENDING, GET_BULK_SEARCH_DATA_FULFILLED, GET_BULK_SEARCH_DATA_REJECTED,
	SET_SUBMIT_FOR_FULLFILMENT_PENDING,   
    SET_SUBMIT_FOR_FULLFILMENT_FULFILLED, 
	SET_SUBMIT_FOR_FULLFILMENT_REJECTED,
	UPDATE_MSISDN_STATUS_PENDING,
	UPDATE_MSISDN_STATUS_FULFILLED,
	UPDATE_MSISDN_STATUS_REJECTED,
	DELETE_SELECTED_SIM_ORDER_PENDING,
	DELETE_SELECTED_SIM_ORDER_FULFILLED,
	DELETE_SELECTED_SIM_ORDER_REJECTED,
	SUBMIT_BULK_ORDER_PENDING,SUBMIT_BULK_ORDER_FULFILLED,SUBMIT_BULK_ORDER_REJECTED,
	SET_PRODUCT_ORDER_OBS_PENDING,SET_PRODUCT_ORDER_OBS_FULFILLED,
	SET_RTF_DEVICE_COUNT_PENDING, SET_RTF_DEVICE_COUNT_FULFILLED,
	VALIDATE_STOCK_PENDING,VALIDATE_STOCK_FULFILLED,VALIDATE_STOCK_REJECTED
	}  
	from '../action-types/order';

import { SEND_FILE_FULFILLED } from '../action-types/configuration';

import {
	COMPANY_INFO_BY_BRN_FULFILLED
} from '../action-types/configuration';

const initialMetaState = {
	SET_REG_TYPE_STATUS: 'DEFAULT',
	SET_PRODUCT_ORDER_STATUS: 'DEFAULT',
	SET_DEVICE_FUND_STATUS: 'DEFAULT',
	SET_COMPANY_INFO_STATUS: 'DEFAULT',
	SET_ADDRESS_CONTACT_DETAILS_STATUS: 'DEFAULT',
	SET_SUBMISSION_INFO_STATUS: 'DEFAULT',
	SET_ORDER_SUBMISSION_STATUS: 'DEFAULT',
	SET_APPROVAL_REG_TYPE_STATUS: 'DEFAULT',
	UNSET_ORDER_DATA_STATUS: 'DEFAULT',
	SET_APPROVAL_SUBMISSION_STATUS: 'DEFAULT',
	SET_ORDER_APPROVAL_STATUS: 'DEFAULT',
	SET_APPROVAL_SUBMISSION_INFO_STATUS: 'DEFAULT',
	FETCH_REGISTRATION_DETAILS_STATUS: 'DEFAULT',
	FETCH_LINE_DETAILS_STATUS: 'DEFAULT',
	SET_LINE_DETAILS_STATUS: 'DEFAULT',
	SET_MSISDN_DETAILS_STATUS: 'DEFAULT',
	SET_DEVICE_DETAILS_STATUS: 'DEFAULT',
	SET_SUBMISSION_INFO_PREVIOUS: 'DEFAULT',
	SET_ADDRESS_CONTACT_DETAILS_PREVIOUS: 'DEFAULT',
	SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS: 'DEFAULT',
	GET_CORP_OWNER_INFO_STATUS:'DEFAULT',
	SET_COMPANY_INFORMATION_STATUS: 'DEFAULT',
	SET_COMPANY_INFORMATION_PREV_STATUS: 'DEFAULT',
	SET_RESUBMISSION_ORDER_SUBMISSION_STATUS: 'DEFAULT',
	SET_ORDER_PMP_STATUS: 'DEFAULT',
	SET_PRODUCT_ORDER_PREVIOUS_ERF_STATUS: 'DEFAULT',
	SET_PRODUCT_ORDER_ERF_STATUS:'DEFAULT',
	SET_ELIGIBILITY_CHECK_STATUS:'DEFAULT',
	GET_JWT_TOKEN_STATUS:'DEFAULT',
	GET_ADD_ON_DATA_VSN_STATUS:'DEFAULT',
	vasValidateErrorMessage:'',
	SET_RATEPLAN_BLANK_STATUS:'DEFAULT',
	SET_RESUBMISSION_REGISTRATION_INFO_STATUS:'DEFAULT',
	VALIDATE_OLD_MSISDNS_STATUS:'DEFAULT',
	SET_COMPANY_INFORMATION_PREV_STATUS:'DEFAULT',
	SET_PRODUCT_ORDER_PREVIOUS_STATUS:'DEFAULT',
	FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS: 'DEFAULT',
	PUT_UPDATE_DELIVERY_STATUS: 'DEFAULT',
	PUT_DEALER_PICK_PACK_STATUS: 'DEFAULT',
	DEALER_SEARCH_UPDATE_IMEI_STATUS: 'DEFAULT',
	DEALER_SEARCH_DO_PICK_PACK_STATUS: 'DEFAULT',
	DEALER_SEARCH_DO_COMPLETE_STATUS: 'DEFAULT',
	SET_EMAIL_DATA_STATUS:'DEFAULT',
	SET_INSTALLATION_ADDRESS_STATUS:'DEFAULT',
	UPDATE_PAYMENT_STATUS: 'DEFAULT',
	UPDATE_CHANGE_PAYMENT_STATUS: 'DEFAULT',
	SET_DEVICE_FUND_PREV_STATUS:'DEFAULT',
	GET_BULK_SEARCH_DATA_STATUS:'DEFAULT',
	SET_SUBMIT_FOR_FULLFILMENT_STATUS:'DEFAULT',
	UPDATE_MSISDN_STATUS:'DEFAULT',
	DELETE_SELECTED_SIM_ORDER_STATUS:'DEFAULT',
	SUBMIT_BULK_ORDER_STATUS:'DEFAULT',
	SET_RTF_DEVICE_COUNT_STATUS:'DEFAULT',
	VALIDATE_STOCK_STATUS: 'DEFAULT'
}



const initialDataState = {
	bundleType:'Maxis',
	orderCategory:'',
	brn:'',
	vsn: '',
	selectedVSN: 'New - Not Available Yet',
	addressInfo: {
		billingAddress: {
			address1: '',
			address2: '',
			postCodeHint: '',
			postCode: '',
			city: '',
			state: '',
		},
		deliveryAddress: {
			contactName: '',
			contactPhoneNo: '',
			contactIC: '',
			contactFixNo: '',
			contactEmail:'',
			address1: '',
			address2: '',
			postCodeHint: '',
			postCode: '',
			city: '',
			state: '',
		},
		picDetails: {
			picName: '',
			picEMail: '',
			picContactNumber: '',
			notificationEmail: '',
		},
		secondaryPicDetails: {
			secondaryPicName: '',
			secondaryPicEMail: '',
			secondaryPicContactNumber: '',
			secondaryPicIc:'',
			secondaryPicContactFixedNo:''
		}
	},
	brnInfo: {
		portalCustInfo: {
			custBrnNo1: '',
			companyName: '',
			companyCodeName: '',
			staffStrength: '',
			custPuc: '',
			custFinalRemark: '',
		},
		authorizeSignatory: {
			authName: '',
			authIcNo: '',
			authFixedNo: '',
			authFaxNo: '',
			authMobileNo: '',
			authEmail: '',
		},
		documentUploadItems: [],
		addrInfo: [],
	},
	tempUploadRegId: [],
	easMasterRegId: '',
	action: '',
	rejectionReason: '',
	allowResubmission: '',
	noOfLines: '',
	companyDeposit: false,
	advancePayment: false,

	amountToVerify: '',
	parentId: '',
	hierarchyId: '',
	marketCode: '',
	totalApprovedAmount: 0,
	accountCategory: '',
	collectionCodeName: '',
	authorisedSignatoryDropdownValue: '',
	billableCheckboxValue: '',
	deposit: 0,
	totalDeposit: 0,
	totalLinesDeposit: 0,
	totalAdvanceDeposit: 0,
	totalDeviceTopUp: '0.00',
	DeviceTopUpGST: 0,
	totalPayment: 0,
	billableAccountNumber: '',
	isBillableChecked: false,
	cmssNo: '',
	approvalRemarks: '',
	assignedToDropdownValue: '',
	reviewDropdownValue: '',
	reasonCodeDropdownValue: '',
	billableAcct: '',
	// submission info starts here
	dealerCode: '', // ready only
	dealerName: '', // ready only
	dealerRemarks: '',
	accountManagerCode: '',
	salesmanCode: '',
	appleDepId:'',
	salesmanName: '',
	supportingCenter: '',
	cmssID: '',
	cmssFileName: '',
	cmssRegId: null,
	customerSignDate: null,
	tnc: false,
	// global
	user: {
		userId: '', // ready only
		userRole: '', // ready only
	},
	addedDevices: [],
	orderSubmissionFailed: true,
	orderResubmissionFailed:true,
	orderApprovalFailed:true,
	vasList:[], 
	iddList:[],
	registrationDetails:{
		brnInfo:{
			portalCustInfo:'',
			addrInfo:'',
			documentUploadItems:[]
		},
		totalMemberString:''
	},
	previousFundAmount: 0,
	previousFundAmountUsed: 0,
	previousFundAmountLeft: 0,
	previousFundAmountInitial:0,
	deviceFundUsed: 0,
	totalQuantity: 0,
	deviceFundLeft: 0,
	amountPayable: 0,
	tax: 0,
	msisdnList: [],
	corpInfoList:[],
	totalLinesadvancePayment:0,
	validateOldMsisdn:'PENDING',
	crpLineCount:0,
	initialAddition:false,
	initialDeviceChange:false,
	initialResubmissionChange:false,
	deviceFundsOld:[],
	checkEligibilityforFundDevice:false,
	token:'',
	ratePlanId:0,
	addOnDataBlock:0,
	addOnLimit:0,
	addOnVal:0,
	ratePlan:'',
	deviceFulfillment:'',
	fulfillmentbyTradePartner:false,
	delaerSearchDetails:'',
	currentLine:'',
	errorMessage:'',
	upgradeSafeDevice: false,
	safeDevice: false,
	billable: false,
	isOutright: false,
	orderInPMP: false,
	orderResubmissionFailed:true,
	getmsisdnsDetailsStatus:false,
	validateOldLinesStatus:'PENDING',
	isContractDurationGrtrFourMonths:false,
	paymentInfoMessage: '',
	changeStatusMessage: '',
	reportType: [],
	tableHeaders:[],
	tableRows:[],
    reportData:'',
	installationAddress: {
			address1: '',
			address2: '',
			postCodeHint: '',
			postCode: '',
			city: '',
			state: '',
			country:''
		},
	countMisc:0,
	totalMemberCount : 0,
	validateDevice:false,
	totalAdjAmount : 0,
	bulkSearchData:[],
	fullfilmentData: '',
	updateStatus:false,
	bulkRegId:'',
	orderDeletedFailed: true,
	submitBulkOrderMessage:'',
	totalDeviceTopUp:0,
	zerolutionRTFfDeviceCount:0,
	isZerolutionRTF: false,
	nonRTFDeviceCount: 0,
	obsRTFDeviceCount:0,
	noOfLinesBcc: '',
	accountNumber:'',
	isParentIdBilled:''
}


function metaReducer(state = initialMetaState, action) {
	switch (action.type) {
		case SET_REG_TYPE_PENDING:
			return { ...state, SET_REG_TYPE_STATUS: 'PENDING' };
		case SET_REG_TYPE_FULFILLED:
			return { ...state, SET_REG_TYPE_STATUS: 'SUCCESS' };
		case SET_PRODUCT_ORDER_PENDING:
			return { ...state, SET_PRODUCT_ORDER_STATUS: 'PENDING' }
		case SET_PRODUCT_ORDER_FULFILLED:
			return { ...state, SET_PRODUCT_ORDER_STATUS: 'SUCCESS' }
		case SET_PRODUCT_ORDER_ERF_PENDING:
			return { ...state, SET_PRODUCT_ORDER_ERF_STATUS: 'PENDING' }
		case SET_PRODUCT_ORDER_ERF_FULFILLED:
			return { ...state, SET_PRODUCT_ORDER_ERF_STATUS: 'SUCCESS' }
		case SET_DEVICE_FUND_PENDING:
			return { ...state, SET_DEVICE_FUND_STATUS: 'PENDING' }
		case SET_DEVICE_FUND_FULFILLED:
			return { ...state, SET_DEVICE_FUND_STATUS: 'SUCCESS' }
		case SET_COMPANY_INFO_PENDING:
			return { ...state, SET_COMPANY_INFO_STATUS: 'PENDING' }
		case SET_COMPANY_INFO_FULFILLED:
			return { ...state, SET_COMPANY_INFO_STATUS: 'SUCCESS' }
		case SET_ADDRESS_CONTACT_DETAILS_PENDING:
			return { ...state, SET_ADDRESS_CONTACT_DETAILS_STATUS: 'PENDING' }
		case SET_ADDRESS_CONTACT_DETAILS_FULFILLED:
			return { ...state, SET_ADDRESS_CONTACT_DETAILS_STATUS: 'SUCCESS' }
		case SET_ADDRESS_CONTACT_DETAILS_REJECTED:
			return { ...state, SET_ADDRESS_CONTACT_DETAILS_STATUS: 'FAILED' }	
		case SET_SUBMISSION_INFO_PENDING:
			return { ...state, SET_SUBMISSION_INFO_STATUS: 'PENDING' }
		case SET_SUBMISSION_INFO_FULFILLED:
			return { ...state, SET_SUBMISSION_INFO_STATUS: 'SUCCESS' }
		case SET_ORDER_SUBMISSION_PENDING:
			return { ...state, SET_ORDER_SUBMISSION_STATUS: 'PENDING' }
		case SET_ORDER_SUBMISSION_FULFILLED:
			return { ...state, SET_ORDER_SUBMISSION_STATUS: 'SUCCESS' }
		case SET_ORDER_SUBMISSION_REJECTED:
			return { ...state, SET_ORDER_SUBMISSION_STATUS: 'FAILED' }
		case SET_APPROVAL_REG_TYPE_PENDING:
			return { ...state, SET_APPROVAL_REG_TYPE_STATUS: 'PENDING' }
		case SET_APPROVAL_REG_TYPE_FULFILLED:
			return { ...state, SET_APPROVAL_REG_TYPE_STATUS: 'SUCCESS' }
		case SET_APPROVAL_REG_TYPE_REJECTED:
			return { ...state, SET_APPROVAL_REG_TYPE_STATUS: 'FAILED' }
		case UNSET_ORDER_DATA_PENDING:
			return { ...state, UNSET_ORDER_DATA_STATUS: 'PENDING' }
		case UNSET_ORDER_DATA_FULFILLED:
			return { ...state, UNSET_ORDER_DATA_STATUS: 'SUCCESS' ,
								 SET_REG_TYPE_STATUS:'DEFAULT'}
		case SET_APPROVAL_SUBMISSION_INFO_PENDING:
			return { ...state, SET_APPROVAL_SUBMISSION_INFO_STATUS: 'PENDING' }
		case SET_APPROVAL_SUBMISSION_INFO_FULFILLED:
			return { ...state, SET_APPROVAL_SUBMISSION_INFO_STATUS: 'SUCCESS' }
		case SET_ORDER_APPROVAL_PENDING:
			return { ...state, SET_ORDER_APPROVAL_STATUS: 'PENDING' }
		case SET_ORDER_APPROVAL_FULFILLED:
			return { ...state, SET_ORDER_APPROVAL_STATUS: 'SUCCESS' }
		case SET_ORDER_APPROVAL_REJECTED:
			return { ...state, SET_ORDER_APPROVAL_STATUS: 'FAILED' }
		case FETCH_REGISTRATION_DETAILS_PENDING:
			return { ...state, FETCH_REGISTRATION_DETAILS_STATUS: 'PENDING' }
		case FETCH_REGISTRATION_DETAILS_FULFILLED:
			return { ...state, FETCH_REGISTRATION_DETAILS_STATUS: 'SUCCESS' }
		case FETCH_REGISTRATION_DETAILS_REJECTED:
			return { ...state, FETCH_REGISTRATION_DETAILS_STATUS: 'FAILED' }
		case FETCH_LINE_DETAILS_PENDING:
			return { ...state, FETCH_LINE_DETAILS_STATUS: 'PENDING' }
		case FETCH_LINE_DETAILS_FULFILLED:
			return { ...state, FETCH_LINE_DETAILS_STATUS: 'SUCCESS' }
		case FETCH_LINE_DETAILS_REJECTED:
			return { ...state, FETCH_LINE_DETAILS_STATUS: 'FAILED' }
		case SET_LINE_DETAILS_PENDING:
			return { ...state, SET_LINE_DETAILS_STATUS: 'PENDING' }
		case SET_LINE_DETAILS_FULFILLED:
			return { ...state, SET_LINE_DETAILS_STATUS: 'SUCCESS' }
		case SET_LINE_DETAILS_REJECTED:
			return { ...state, SET_LINE_DETAILS_STATUS: 'FAILED' }
		case SET_MSISDN_DETAILS_PENDING:
			return { ...state, SET_MSISDN_DETAILS_STATUS: 'PENDING' }
		case SET_MSISDN_DETAILS_FULFILLED:
			return { ...state, SET_MSISDN_DETAILS_STATUS: 'SUCCESS' }
		case SET_MSISDN_DETAILS_REJECTED:
			return { ...state, SET_MSISDN_DETAILS_STATUS: 'FAILED' }
		case SET_DEVICE_DETAILS_PENDING:
			return { ...state, SET_DEVICE_DETAILS_STATUS: 'PENDING' }
		case SET_DEVICE_DETAILS_FULFILLED:
			return { ...state, SET_DEVICE_DETAILS_STATUS: 'SUCCESS' }
		case SET_DEVICE_DETAILS_REJECTED:
			return { ...state, SET_DEVICE_DETAILS_STATUS: 'FAILED' }
		case SET_SUBMISSION_INFO_PREVIOUS_PENDING:
			return { ...state, SET_SUBMISSION_INFO_PREVIOUS_STATUS: 'PENDING' }
		case SET_SUBMISSION_INFO_PREVIOUS_FULFILLED:
			return { ...state, SET_SUBMISSION_INFO_PREVIOUS_STATUS: 'SUCCESS' }
		case SET_APPROVAL_FUNDS_PENDING:
			return { ...state, SET_APPROVAL_FUNDS_STATUS: 'PENDING' }
		case SET_APPROVAL_FUNDS_FULFILLED:
			return { ...state, SET_APPROVAL_FUNDS_STATUS: 'SUCCESS' }
		case GET_FUND_AMOUNT_PENDING:
			return { ...state, GET_FUND_AMOUNT_STATUS: 'PENDING' }
		case GET_FUND_AMOUNT_FULFILLED:
			return { ...state, GET_FUND_AMOUNT_STATUS: 'SUCCESS' }
		case GET_FUND_AMOUNT_REJECTED:
			return { ...state, GET_FUND_AMOUNT_STATUS: 'FAILED' }
		case SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_PENDING:
			return { ...state, SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS: 'PENDING' }
		case SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_FULFILLED:
			return { ...state, SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS: 'SUCCESS' }
		case SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_REJECTED:
			return { ...state, SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS: 'FAILED' }

		case GET_CORP_OWNER_INFO_PENDING:
			return { ...state, GET_CORP_OWNER_INFO_STATUS: 'PENDING' }
		case GET_CORP_OWNER_INFO_FULFILLED:
			return { ...state, GET_CORP_OWNER_INFO_STATUS: 'SUCCESS' }
		case GET_CORP_OWNER_INFO_REJECTED:
			return { ...state, GET_CORP_OWNER_INFO_STATUS: 'FAILED' }

		case SET_COMPANY_INFORMATION_PENDING:
			return { ...state, SET_COMPANY_INFORMATION_STATUS: 'PENDING' }
		case SET_COMPANY_INFORMATION_FULFILLED:
			return { ...state, SET_COMPANY_INFORMATION_STATUS: 'SUCCESS' }
		case SET_COMPANY_INFORMATION_REJECTED:
			return { ...state, SET_COMPANY_INFORMATION_STATUS: 'FAILED' }
		case SET_COMPANY_INFORMATION_PREV_PENDING:
			return { ...state, SET_COMPANY_INFORMATION_PREV_STATUS: 'PENDING' }
		case SET_COMPANY_INFORMATION_PREV_FULFILLED:
			return { ...state, SET_COMPANY_INFORMATION_PREV_STATUS: 'SUCCESS' }
		case SET_COMPANY_INFORMATION_PREV_REJECTED:
			return { ...state, SET_COMPANY_INFORMATION_PREV_STATUS: 'FAILED' }
		case SET_RESUBMISSION_ORDER_SUBMISSION_PENDING:
			return { ...state, SET_RESUBMISSION_ORDER_SUBMISSION_STATUS: 'PENDING' }
		case SET_RESUBMISSION_ORDER_SUBMISSION_FULFILLED:
			return { ...state, SET_RESUBMISSION_ORDER_SUBMISSION_STATUS: 'SUCCESS' }
		case SET_RESUBMISSION_ORDER_SUBMISSION_REJECTED:
			return { ...state, SET_RESUBMISSION_ORDER_SUBMISSION_STATUS: 'FAILED' }
		case SET_ORDER_PMP_PENDING:
			return { ...state, SET_ORDER_PMP_STATUS: 'PENDING' }
		case SET_ORDER_PMP_FULFILLED:
			return { ...state, SET_ORDER_PMP_STATUS: 'SUCCESS' }
		case SET_ORDER_PMP_REJECTED:
			return { ...state, SET_ORDER_PMP_STATUS: 'FAILED' }
        case SET_PRODUCT_ORDER_PREVIOUS_ERF_PENDING:
			return { ...state, SET_PRODUCT_ORDER_PREVIOUS_ERF_STATUS: 'PENDING' }
		case SET_PRODUCT_ORDER_PREVIOUS_ERF_FULFILLED:
			return { ...state, SET_PRODUCT_ORDER_PREVIOUS_ERF_STATUS: 'SUCCESS' }
	case VALIDATE_OLD_MSISDNS_PENDING:
			return { ...state, VALIDATE_OLD_MSISDNS_STATUS: 'PENDING' }
		case VALIDATE_OLD_MSISDNS_FULFILLED:
			return { ...state, VALIDATE_OLD_MSISDNS_STATUS: 'SUCCESS' }
		case VALIDATE_OLD_MSISDNS_REJECTED:
			return { ...state, VALIDATE_OLD_MSISDNS_STATUS: 'FAILED' }
		case SET_PRODUCT_ORDER_PREVIOUS_PENDING:
			return { ...state, SET_PRODUCT_ORDER_PREVIOUS_STATUS: 'PENDING' }
		case SET_PRODUCT_ORDER_PREVIOUS_FULFILLED:
			return { ...state, SET_PRODUCT_ORDER_PREVIOUS_STATUS: 'SUCCESS' }
		case SET_PRODUCT_ORDER_PREVIOUS_REJECTED:
			return { ...state, SET_PRODUCT_ORDER_PREVIOUS_STATUS: 'FAILED' }
		case SET_COMPANY_INFORMATION_PREV_PENDING:
			return { ...state, SET_COMPANY_INFORMATION_PREV_STATUS: 'PENDING' }
		case SET_COMPANY_INFORMATION_PREV_FULFILLED:
			return { ...state, SET_COMPANY_INFORMATION_PREV_STATUS: 'SUCCESS' }
		case SET_COMPANY_INFORMATION_PREV_REJECTED:
			return { ...state, SET_COMPANY_INFORMATION_PREV_STATUS: 'FAILED' }
		case SET_ELIGIBILITY_CHECK_PENDING:
			return { ...state, SET_ELIGIBILITY_CHECK_STATUS: 'PENDING' }
		case SET_ELIGIBILITY_CHECK_FULFILLED:
			return { ...state, SET_ELIGIBILITY_CHECK_STATUS: 'SUCCESS' }
		case SET_ELIGIBILITY_CHECK_REJECTED:
			return { ...state, SET_ELIGIBILITY_CHECK_STATUS: 'FAILED' }
		case GET_JWT_TOKEN_PENDING:
			return { ...state, GET_JWT_TOKEN_STATUS: 'PENDING' }
		case GET_JWT_TOKEN_FULFILLED:
			return { ...state, GET_JWT_TOKEN_STATUS: 'SUCCESS' }
		case GET_JWT_TOKEN_REJECTED:
			return { ...state, GET_JWT_TOKEN_STATUS: 'FAILED' }
		case GET_ADD_ON_DATA_VSN_PENDING:
			return { ...state, GET_ADD_ON_DATA_VSN_STATUS: 'PENDING' }
		case GET_ADD_ON_DATA_VSN_FULFILLED:
			return { ...state, GET_ADD_ON_DATA_VSN_STATUS: 'SUCCESS' }
		case GET_ADD_ON_DATA_VSN_REJECTED:
			return { ...state, GET_ADD_ON_DATA_VSN_STATUS: 'FAILED' }
		case SET_RATEPLAN_BLANK_PENDING:
			return { ...state, SET_RATEPLAN_BLANK_STATUS: 'PENDING' }
		case SET_RATEPLAN_BLANK_FULFILLED:
			return { ...state, SET_RATEPLAN_BLANK_STATUS: 'SUCCESS' }
		case SET_RATEPLAN_BLANK_REJECTED:
			return { ...state, SET_RATEPLAN_BLANK_STATUS: 'FAILED' }
		case SET_RESUBMISSION_REGISTRATION_INFO_PENDING:
			return { ...state, SET_RESUBMISSION_REGISTRATION_INFO_STATUS: 'PENDING' }
		case SET_RESUBMISSION_REGISTRATION_INFO_FULFILLED:
			return { ...state, SET_RESUBMISSION_REGISTRATION_INFO_STATUS: 'SUCCESS' }
		case SET_RESUBMISSION_REGISTRATION_INFO_REJECTED:
			return { ...state, SET_RESUBMISSION_REGISTRATION_INFO_STATUS: 'FAILED' }
		case UPDATE_PAYMENT_PENDING:
			return { ...state, UPDATE_PAYMENT_STATUS: 'PENDING' }
		case UPDATE_PAYMENT_FULFILLED:
			return { ...state, UPDATE_PAYMENT_STATUS: 'SUCCESS' }
		case UPDATE_PAYMENT_REJECTED:
			return { ...state, UPDATE_PAYMENT_STATUS: 'FAILED' }
	
		case FETCH_LINE_DETAILS_SEARCH_DEALER_PENDING:
			return { ...state, FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS: 'PENDING' }
		case FETCH_LINE_DETAILS_SEARCH_DEALER_FULFILLED:
			return { ...state, FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS: 'SUCCESS' }
		case FETCH_LINE_DETAILS_SEARCH_DEALER_REJECTED:
			return { ...state, FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS: 'FAILED' }
		case PUT_UPDATE_DELIVERY_STATUS_PENDING:
			return { ...state,PUT_UPDATE_DELIVERY_STATUS: 'PENDING' }
		case PUT_UPDATE_DELIVERY_STATUS_FULFILLED:
			return { ...state, PUT_UPDATE_DELIVERY_STATUS: 'SUCCESS' }
		case PUT_UPDATE_DELIVERY_STATUS_REJECTED:
			return { ...state, PUT_UPDATE_DELIVERY_STATUS: 'FAILED' }
		case PUT_DEALER_PICK_PACK_PENDING:
			return { ...state, PUT_DEALER_PICK_PACK_STATUS: 'PENDING' }
		case PUT_DEALER_PICK_PACK_FULFILLED:
			return { ...state, PUT_DEALER_PICK_PACK_STATUS: 'SUCCESS' }
		case PUT_DEALER_PICK_PACK_REJECTED:
			return { ...state, PUT_DEALER_PICK_PACK_STATUS: 'FAILED' }
		case DEALER_SEARCH_UPDATE_IMEI_PENDING:
			return { ...state, DEALER_SEARCH_UPDATE_IMEI_STATUS: 'PENDING' }
		case DEALER_SEARCH_UPDATE_IMEI_FULFILLED:
			return { ...state, DEALER_SEARCH_UPDATE_IMEI_STATUS: 'SUCCESS' }
		case DEALER_SEARCH_UPDATE_IMEI_REJECTED:
			return { ...state, DEALER_SEARCH_UPDATE_IMEI_STATUS: 'FAILED' }
		case DEALER_SEARCH_DO_PICK_PACK_PENDING:
			return { ...state, DEALER_SEARCH_DO_PICK_PACK_STATUS: 'PENDING' }
		case DEALER_SEARCH_DO_PICK_PACK_FULFILLED:
			return { ...state, DEALER_SEARCH_DO_PICK_PACK_STATUS: 'SUCCESS' }
		case DEALER_SEARCH_DO_PICK_PACK_REJECTED:
			return { ...state, DEALER_SEARCH_DO_PICK_PACK_STATUS: 'FAILED' }
		case DEALER_SEARCH_DO_COMPLETE_PENDING:
			return { ...state, DEALER_SEARCH_DO_COMPLETE_STATUS: 'PENDING' }
		case DEALER_SEARCH_DO_COMPLETE_FULFILLED:
			return { ...state, DEALER_SEARCH_DO_COMPLETE_STATUS: 'SUCCESS' }
		case DEALER_SEARCH_DO_COMPLETE_REJECTED:
			return { ...state, DEALER_SEARCH_DO_COMPLETE_STATUS: 'FAILED' }
		case SET_EMAIL_DATA_PENDING:
			return { ...state, SET_EMAIL_DATA_STATUS: 'PENDING' }
		case SET_EMAIL_DATA_FULFILLED:
			return { ...state, SET_EMAIL_DATA_STATUS: 'SUCCESS' }
		case SET_EMAIL_DATA_REJECTED:
			return { ...state, SET_EMAIL_DATA_STATUS: 'FAILED' }
		case SET_INSTALLATION_ADDRESS_PENDING:
			return { ...state, SET_INSTALLATION_ADDRESS_STATUS: 'PENDING' }
		case SET_INSTALLATION_ADDRESS_FULFILLED:
			return { ...state, SET_INSTALLATION_ADDRESS_STATUS: 'SUCCESS' }
		case SET_INSTALLATION_ADDRESS_REJECTED:
			return { ...state, SET_INSTALLATION_ADDRESS_STATUS: 'FAILED' }
		case UPDATE_CHANGE_PAYMENT_PENDING:
			return { ...state, UPDATE_CHANGE_PAYMENT_STATUS: 'PENDING' }
		case UPDATE_CHANGE_PAYMENT_FULFILLED:
			return { ...state, UPDATE_CHANGE_PAYMENT_STATUS: 'SUCCESS' }
		case UPDATE_CHANGE_PAYMENT_REJECTED:
			return { ...state, UPDATE_CHANGE_PAYMENT_STATUS: 'FAILED' }
		case SET_DEVICE_FUND_PREV_PENDING:
			return { ...state, SET_DEVICE_FUND_PREV_STATUS: 'PENDING' }
		case SET_DEVICE_FUND_PREV_FULFILLED:
			return { ...state, SET_DEVICE_FUND_PREV_STATUS: 'SUCCESS' }
			
		case GET_BULK_SEARCH_DATA_PENDING:
			return { ...state, GET_BULK_SEARCH_DATA_STATUS: 'PENDING' }
		case GET_BULK_SEARCH_DATA_FULFILLED:
			return { ...state, GET_BULK_SEARCH_DATA_STATUS: 'SUCCESS' }
		case GET_BULK_SEARCH_DATA_REJECTED:
			return { ...state, GET_BULK_SEARCH_DATA_STATUS: 'FAILED' }
		case SET_SUBMIT_FOR_FULLFILMENT_PENDING:
			return { ...state, SET_SUBMIT_FOR_FULLFILMENT_STATUS: 'PENDING' }
		case SET_SUBMIT_FOR_FULLFILMENT_FULFILLED:
			return { ...state, SET_SUBMIT_FOR_FULLFILMENT_STATUS: 'SUCCESS' }
		case SET_SUBMIT_FOR_FULLFILMENT_REJECTED:
			return { ...state, SET_SUBMIT_FOR_FULLFILMENT_STATUS: 'FAILED' }
		case UPDATE_MSISDN_STATUS_PENDING:
			return { ...state, UPDATE_MSISDN_STATUS: 'PENDING' }
		case UPDATE_MSISDN_STATUS_FULFILLED:
			return { ...state, UPDATE_MSISDN_STATUS: 'SUCCESS' }
		case UPDATE_MSISDN_STATUS_REJECTED:
			return { ...state, UPDATE_MSISDN_STATUS: 'FAILED' }
		case DELETE_SELECTED_SIM_ORDER_PENDING:
			return { ...state, DELETE_SELECTED_SIM_ORDER_STATUS: 'PENDING' }
		case DELETE_SELECTED_SIM_ORDER_FULFILLED:
			return { ...state, DELETE_SELECTED_SIM_ORDER_STATUS: 'SUCCESS' }
		case DELETE_SELECTED_SIM_ORDER_REJECTED:
			return { ...state, DELETE_SELECTED_SIM_ORDER_STATUS: 'FAILED' }
		case SUBMIT_BULK_ORDER_PENDING:
			return { ...state, SUBMIT_BULK_ORDER_STATUS: 'PENDING' }
		case SUBMIT_BULK_ORDER_FULFILLED:
			return { ...state, SUBMIT_BULK_ORDER_STATUS: 'SUCCESS' }
		case SUBMIT_BULK_ORDER_REJECTED:
			return { ...state, SUBMIT_BULK_ORDER_STATUS: 'FAILED' }
		case SET_PRODUCT_ORDER_OBS_PENDING:
			return { ...state, SET_PRODUCT_ORDER_OBS_STATUS: 'PENDING' }
		case SET_PRODUCT_ORDER_OBS_FULFILLED:
			return { ...state, SET_PRODUCT_ORDER_OBS_STATUS: 'SUCCESS' }
		case SET_RTF_DEVICE_COUNT_PENDING:
			return { ...state, SET_RTF_DEVICE_COUNT_STATUS: 'PENDING' }
		case SET_RTF_DEVICE_COUNT_FULFILLED:
			return { ...state, SET_RTF_DEVICE_COUNT_STATUS: 'SUCCESS' }
		case VALIDATE_STOCK_PENDING:
				return { ...state, VALIDATE_STOCK_STATUS: 'PENDING' }
		case VALIDATE_STOCK_FULFILLED:
				return { ...state, VALIDATE_STOCK_STATUS: 'SUCCESS' }
		case VALIDATE_STOCK_REJECTED:
				return { ...state, VALIDATE_STOCK_STATUS: 'FAILED' }
		default:
			return state;
	}
}

function dataReducer(state=initialDataState, action){
	let res={};
	switch (action.type) {
		case SEND_FILE_FULFILLED:
			return {
				...state,
				brnInfo: {
					...state.brnInfo,
					documentUploadItems: state.brnInfo.documentUploadItems.map(item => {
						if (item.documentDesc === action.payload.data.tempDocumentDesc) {
							return {
								...item,
								regId: action.payload.data.documentRegId,
								fileName: action.payload.data.tempfileName,
							}
						}
						return item
					})
				},
				tempUploadRegId: [...state.tempUploadRegId, action.payload.data.documentRegId]
			}
		case SET_REG_TYPE_FULFILLED:
			return {
				...state,
				...action.payload
			}
		case SET_PRODUCT_ORDER_FULFILLED:
		console.log("payloaad ",action.payload);
		let tempTodos = []
		if(action.payload.todos !== undefined && action.payload.todos !== null){
			let countMisc = 0;
			for (let i = 0; i < action.payload.todos.length; i++) {
				if (action.payload.todos[i].regType.includes('MISC')) {
					countMisc += 1;
				}
			}
			tempTodos = action.payload.todos.length - countMisc - action.payload.crpLineCount+state.registrationDetails.lineCount;
		}else{
			tempTodos = state.registrationDetails.totalMemberString
		}
			return {
				...state,
				...action.payload,
				validateOldMsisdn:'SUCCESS',
				registrationDetails:{...state.registrationDetails,
										totalMemberString:tempTodos
										}
			}
		case SET_DEVICE_FUND_FULFILLED:
			return {
				...state,
				...action.payload,
				validateDevice:true
			}
		case COMPANY_INFO_BY_BRN_FULFILLED:
			return {
				...state,
				addressInfo: {
					...state.addressInfo,
					billingAddress: action.payload.data.brnInfo.addrInfo.billingAddress,
					deliveryAddress: action.payload.data.brnInfo.addrInfo.billingAddress,
				}
			}

		case SET_COMPANY_INFO_FULFILLED:
			return {
				...state,
				brnInfo: action.payload.brnInfo,
				tempUploadRegId: action.payload.tempUploadRegId
			}
		case SET_ADDRESS_CONTACT_DETAILS_FULFILLED:
			return { ...state,
					 addressInfo:action.payload,
					 brnInfo:{...state.brnInfo,
						addrInfo:action.payload
					 },
					 registrationDetails:{...state.registrationDetails,
											brnInfo:{
												...state.registrationDetails.brnInfo,
												addrInfo: action.payload
											}
										}
					 
			}
		case SET_SUBMISSION_INFO_FULFILLED:
			return {
				...state,
				dealerCode: action.payload.user.dealerCode,
				dealerName: action.payload.user.dealerName,
				...action.payload
			}
		case SET_ORDER_SUBMISSION_FULFILLED:
			return {
				...state,
				easMasterRegId: action.payload.data,
				orderSubmissionFailed: false
			}
		case SET_APPROVAL_REG_TYPE_FULFILLED:
			return {
				...state,
				brnInfo: action.payload.registrationDetails.brnInfo,
				easMasterRegId: action.payload.registrationDetails.masterRegId,
				action: action.payload.registrationDetails.action,
				rejectionReason: action.payload.registrationDetails.rejectionReason,
				allowResubmission: action.payload.registrationDetails.allowResubmission,
				marketCode: action.payload.registrationDetails.marketCode,
				noOfLines: action.payload.registrationDetails.noOfLines,
				companyDeposit: action.payload.registrationDetails.companyDeposit,
				advancePayment: action.payload.registrationDetails.advancePayment,
				amountToVerify: action.payload.registrationDetails.amountToVerify,
				totalPayment: action.payload.registrationDetails.totalPayment,
				parentId: action.payload.registrationDetails.parentId,
				hierarchyId: action.payload.registrationDetails.hierarchyId,
				dealerCode: action.payload.registrationDetails.dealerCode,
				accountManagerCode: action.payload.registrationDetails.acctManagerDealerCode,
				brn: action.payload.registrationDetails.brnInfo.portalCustInfo.custBrnNo
			}
		case UNSET_ORDER_DATA_FULFILLED:
			return state = initialDataState;
		case SET_APPROVAL_SUBMISSION_INFO_FULFILLED:
			return {
				...state,
				...action.payload
			}
		case SET_ORDER_APPROVAL_FULFILLED:
			return {
				...state,
				approvalMessage: action.payload.data,
				orderApprovalFailed: false
			}
		case FETCH_REGISTRATION_DETAILS_FULFILLED:
			return {
				...state,
				registrationDetails: action.payload.data,
				brnInfo: action.payload.data.brnInfo,
				easMasterRegId: action.payload.data.masterRegId,
				action: action.payload.data.action,
				rejectionReason: action.payload.data.rejectionReason,
				allowResubmission: action.payload.data.allowResubmission,
				marketCode: action.payload.data.marketCode,
				noOfLines: action.payload.data.noOfLines,
				companyDeposit: action.payload.data.companyDeposit,
				advancePayment: action.payload.data.advancePayment,
				amountToVerify: action.payload.data.amountToVerify,
				totalPayment: action.payload.data.totalPayment,
				parentId: action.payload.data.parentId,
				hierarchyId: action.payload.data.hierarchyId,
				dealerCode: action.payload.data.dealerCode,
				accountManagerCode: action.payload.data.acctManagerDealerCode,
				brn: action.payload.data.brnInfo.portalCustInfo.custBrnNo,
				selectedVSN: action.payload.data.virtualServiceNo,
				orderCategory: action.payload.data.prodCatName,
				installationAddress:action.payload.data.installationAddress,
				totalMemberCount : action.payload.data.totalMemberString,
				isZerolutionRTF : action.payload.data.zerolutionRTF,
				appleDepId:action.payload.data.appleDepId 
			}
		case FETCH_LINE_DETAILS_FULFILLED:
			return { ...state,
					 msisdnList:[...action.payload.data],
					 getmsisdnsDetailsStatus:true
					}

		case SET_LINE_DETAILS_FULFILLED:
			return { ...state, 
					...action.payload,
					initialAddition:true }
		case SET_MSISDN_DETAILS_FULFILLED:
			return { ...state, ...action.payload }
		case SET_DEVICE_DETAILS_FULFILLED:
			return { ...state, 
				...action.payload,
					initialDeviceChange:true }
		case SET_SUBMISSION_INFO_PREVIOUS_FULFILLED:
			return { ...state,  ...action.payload ,initialResubmissionChange:true}
		case SET_APPROVAL_FUNDS_FULFILLED:
			return { ...state, ...action.payload }
		case GET_FUND_AMOUNT_FULFILLED:
			return { ...state, previousFundAmount:action.payload.data,previousFundAmountInitial:action.payload.data }
		case GET_CORP_OWNER_INFO_FULFILLED:
		
			return { ...state, 
				      corpInfoList:action.payload.data
			      }
		case SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_FULFILLED:
			return {
				...state,
				...action.payload
			}
		case SET_COMPANY_INFORMATION_FULFILLED:
			return {
				...state,
				registrationDetails: {
					...state.registrationDetails,
					brnInfo: {
						...state.registrationDetails.brnInfo,
						documentUploadItems: action.payload.documentUploadItems
					},
					lineCount: action.payload.lineCount,
					crpLineCount: action.payload.crpLineCount
				},
				crpLineCount: action.payload.crpLineCount
			}
		case SET_COMPANY_INFORMATION_PREV_FULFILLED:
			console.log("reduxx");
			return {
				...state,
				registrationDetails: {
					...state.registrationDetails,
					brnInfo: {
						...state.registrationDetails.brnInfo,
						documentUploadItems: action.payload.documentUploadItems
					},
					lineCount: action.payload.lineCount,
					crpLineCount: action.payload.crpLineCount
				},
				crpLineCount: action.payload.crpLineCount
			}
		case SET_RESUBMISSION_ORDER_SUBMISSION_FULFILLED:
			return {
				...state,
				easMasterRegId: action.payload.data,
				orderResubmissionFailed: false
			}
		case SET_ORDER_PMP_FULFILLED:
			return {
				...state,
				orderInPMP : action.payload.orderInPMP
			}
		case SET_PRODUCT_ORDER_PREVIOUS_ERF_FULFILLED:
		console.log(action.payload)
		return {
			...state,
			validateOldLinesStatus:action.payload.validateOldLinesStatus,
			todos:action.payload.todos
		}
		case SET_PRODUCT_ORDER_ERF_FULFILLED:
        return {
                ...state,
                ...action.payload,
                getmsisdnsDetailsStatus:false,
                validateOldLinesStatus:'SUCCESS',
                isContractDurationGrtrFourMonths:action.payload.isContractDurationGrtrFourMonths
            }

	case SET_ELIGIBILITY_CHECK_FULFILLED:
			return { ...state,  checkEligibilityforFundDevice:action.payload.data}
		case SET_ELIGIBILITY_CHECK_REJECTED:
			return { ...state,  checkEligibilityforFundDevice:false}
		case GET_JWT_TOKEN_FULFILLED:
			return { ...state,  token:action.payload.data.token}
		case GET_JWT_TOKEN_REJECTED:
			return { ...state}
		case GET_ADD_ON_DATA_VSN_FULFILLED:
			return {
						...state,  
						ratePlanId:action.payload.data.rateplanId,
						addOnDataBlock:action.payload.data.addOnDataBlock, 						
						addOnLimit:action.payload.data.addOnLimit,						
						ratePlan: action.payload.data.ratePlanName,
						addOnVal:0
					}
		case GET_ADD_ON_DATA_VSN_REJECTED:
			return {...state,
					vasValidateErrorMessage:action.payload.response.data.errorMessage
			}
		case SET_RATEPLAN_BLANK_FULFILLED:
			return { ...state,  ratePlan:action.payload.data}
			
			case SET_RESUBMISSION_REGISTRATION_INFO_FULFILLED:

			return { ...state,
					registrationDetails:{...state.registrationDetails,
											deposit:action.payload.companyDeposit,
											advPayment:action.payload.advancePayment																	
					},
					...action.payload
					}
		case SET_RESUBMISSION_ORDER_SUBMISSION_FULFILLED:
			return {  ...state,
					 easMasterRegId:action.payload.data,
					 orderResubmissionFailed:false
			 }
		case VALIDATE_OLD_MSISDNS_FULFILLED:
			return {  ...state,
					  ...action.payload
			 }
		 case SET_PRODUCT_ORDER_PREVIOUS_FULFILLED:
			 return {  ...state,
					registrationDetails:{...state.registrationDetails,
											totalMemberString:action.payload.totalMemberString
					}
					   
			  }
		case FETCH_LINE_DETAILS_SEARCH_DEALER_FULFILLED:
			return {
						...state,
						delaerSearchDetails:action.payload.data

			}
		case PUT_UPDATE_DELIVERY_STATUS_FULFILLED:
			return {
						...state,
						msisdnList:[...action.payload.data]
						
			}
		case PUT_UPDATE_DELIVERY_STATUS_REJECTED:
		    return { 
				...state,
				errorMessage: action.payload.response.data
			}
		case PUT_DEALER_PICK_PACK_FULFILLED:
			return { 
				...state,
				 delaerSearchDetails:{
				 	...state.delaerSearchDetails,
				 	lineDetails:state.delaerSearchDetails.lineDetails.map((item, key)=>{
				 		if(item.lineDeviceInfo.orderNo===action.payload.data.orderNo){
				 			res={
				 				...item,
				 				lineDeviceInfo:{
				 					...item.lineDeviceInfo, imei:action.payload.data.imei,
				 					status: action.payload.data.phoneStatus
				 				}
				 			}
				 			return res;
				 		}
				 		return item;
				 	}),
				 },
				 currentLine:res
			}
		case PUT_DEALER_PICK_PACK_REJECTED:
			return { ...state,
				errorMessage: action.payload.response.data }
		case DEALER_SEARCH_UPDATE_IMEI_FULFILLED:
			return { ...state, 
					delaerSearchDetails:{
						...state.delaerSearchDetails,
						lineDetails:state.delaerSearchDetails.lineDetails.map((item, key)=>{
							if(item.lineDeviceInfo.orderNo===action.payload.data.orderNo){
								res={
									...item,
									lineDeviceInfo:{
										...item.lineDeviceInfo, imei:action.payload.data.imei,
									}
								}
								return res
							}
							return item;
						})
					},
				 currentLine:res
			 }
	 case DEALER_SEARCH_UPDATE_IMEI_REJECTED:
			return { ...state,
				errorMessage: action.payload.response.data }
		case DEALER_SEARCH_DO_PICK_PACK_FULFILLED:
			return { ...state, 
				   delaerSearchDetails:{
				   		...state.delaerSearchDetails,
				   		lineDetails: state.delaerSearchDetails.lineDetails.map((item, key)=>{
				   			if(item.lineDeviceInfo.orderNo===action.payload.data.orderNo){
				   				res= {
				   						...item,
				   						lineDeviceInfo:{
				   							...item.lineDeviceInfo, 
				   							imei:action.payload.data.imei, 
				   							minDaysForDoComplete:action.payload.data.minDaysForDoComplete,
				   							isEligibleForDOComplete: true,
				   							status: action.payload.data.phoneStatus,
				   							newImei: action.payload.data.newImei
				   						}
				   				}
				   				return res;
				   			}
				   			return item;
				   		})
				   },
				 currentLine:res
			 }
		case DEALER_SEARCH_DO_PICK_PACK_REJECTED:
			return { ...state, errorMessage: action.payload.response.data
			 }		
		case DEALER_SEARCH_DO_COMPLETE_FULFILLED:
			return { ...state,  
					delaerSearchDetails:{
							...state.delaerSearchDetails,
							lineDetails: state.delaerSearchDetails.lineDetails.map((item, key)=>{
								if(item.lineDeviceInfo.orderNo===action.payload.data.orderNo){
									res= {
											...item,
											lineDeviceInfo:{
												...item.lineDeviceInfo,
												isEligibleForDOComplete: false, 
												status: action.payload.data.phoneStatus
											}
									}
									return res;
								}
								return item;
							})
					},
				 currentLine:res
			}
		case DEALER_SEARCH_DO_COMPLETE_REJECTED:
			return { ...state, errorMessage: action.payload.response.data
			 }	
		case SET_EMAIL_DATA_FULFILLED:
			return { ...state,reportData:action.payload.data,		
			}
		case SET_INSTALLATION_ADDRESS_FULFILLED:
			 return {  ...state,
					installationAddress:action.payload.installationAddress		   
			  }
			  
	 	case UPDATE_PAYMENT_FULFILLED:
			return {
				...state,
				paymentInfoMessage: action.payload.data
			}
		case UPDATE_PAYMENT_REJECTED:
			return {
				...state,
				paymentInfoMessage: action.payload.response.data
			}
		case UPDATE_CHANGE_PAYMENT_FULFILLED:
			return {
				...state,
				changeStatusMessage: action.payload.data
			}
		case UPDATE_CHANGE_PAYMENT_REJECTED:
			return {
				...state,
				changeStatusMessage: action.payload.response.data
			}
			case SET_DEVICE_FUND_PREV_PENDING:
			return { ...state, SET_DEVICE_FUND_PREV_STATUS: 'PENDING' }
		case SET_DEVICE_FUND_PREV_FULFILLED:
			return { ...state, SET_DEVICE_FUND_PREV_STATUS: 'SUCCESS' }
			
		case GET_BULK_SEARCH_DATA_FULFILLED:
			return { ...state, 
				      bulkSearchData:action.payload.data
				  }	
		case SET_SUBMIT_FOR_FULLFILMENT_FULFILLED:
		console.log("reduxxone");
			return {
				...state,
				fullfilmentData: action.payload.data
			       }
		case UPDATE_MSISDN_STATUS_FULFILLED:
		
			return {
				...state,
				updateStatus: action.payload.data
				   }
				   
		case DELETE_SELECTED_SIM_ORDER_FULFILLED:
			return {
				...state,
				bulkRegId: action.payload.data,
				orderDeletedFailed: false
				   }
		case SUBMIT_BULK_ORDER_FULFILLED:
			 return {
					   ...state,
					   submitBulkOrderMessage:action.payload.data
					}
		case SUBMIT_BULK_ORDER_REJECTED:
			 return {
						...state,
						submitBulkOrderMessage:action.payload.response.data	  
					}		   
		case SET_PRODUCT_ORDER_OBS_FULFILLED:
			let temTodos = []
			if(action.payload.todos !== undefined && action.payload.todos !== null){
				temTodos = action.payload.todos.length-action.payload.crpLineCount-action.payload.countMisc+state.registrationDetails.lineCount-action.payload.activeKenanContractCount;
			}else{
				temTodos = state.registrationDetails.totalMemberString
			}
			return {
				...state,
				...action.payload,
				validateOldMsisdn:'SUCCESS',
				registrationDetails:{...state.registrationDetails,
										totalMemberString:temTodos
										}
			}	
		case SET_RTF_DEVICE_COUNT_FULFILLED:
		return {...state, zerolutionRTFfDeviceCount: action.payload.count, isZerolutionRTF: action.payload.isZerolutionRTF,
				nonRTFDeviceCount: action.payload.nonRTFDeviceCount
				};
		case VALIDATE_STOCK_REJECTED:
				return {...state,
						 validateStockMessage: action.payload.response.data
					   };
		case VALIDATE_STOCK_FULFILLED:
				return {...state,
						 validateStockMessage: action.payload
					   };


		default:
			return state;
	}
}

export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});
