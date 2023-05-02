import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
const API_TOKEN=process.env.REACT_APP_API_TOKEN;
//const DEALER_API_TOKEN = process.env.REACT_APP_DEALER_API_BASE;
 
const bundleApi='/bundle/api';
const dealerSearch='/dealerSearch/api';
const reportApi='/report/api';

const POST_DATA = `${API_BASE}${bundleApi}/postOrderSubmission`;
const POST_APPROVAL_DATA =`${API_BASE}${bundleApi}/postOrderApproval`;
const POST_RESUB_DATA = `${API_BASE}${bundleApi}/postOrderReSubmission`;
const ERF_POST_RESUB_DATA = `${API_BASE}${bundleApi}/erfPostOrderReSubmission`;
const UPDATE_PAYMENT_URL = `${API_BASE}${bundleApi}/updatePaymentInfo`;
const UPDATE_CHANGE_PAYMENT_URL = `${API_BASE}${bundleApi}/updateStatusFromUI`;
const OBS_POST_RESUB_DATA = `${API_BASE}${bundleApi}/obsPostOrderReSubmission`;

const REGISTRATION_DETAILS_URL = (easMasterRegId, mode) => `${API_BASE}${bundleApi}/getRegDetailsFromMaster/${easMasterRegId}/${mode}`;
const FETCH_LINE_DETAILS = (easMasterRegId,mode) => `${API_BASE}${bundleApi}/getLineDetails/${easMasterRegId}/${mode}`;
const FETCH_LINE_DETAILS_ERF = (easMasterRegId, mode) => `${API_BASE}${bundleApi}/getLineDetailsERF/${easMasterRegId}/${mode}`;
const FETCH_LINE_DETAILS_OBS = (easMasterRegId, mode, isZerolutionRTF) => `${API_BASE}${bundleApi}/getLineDetailsOBS/${easMasterRegId}/${mode}/${isZerolutionRTF}`;
const GET_FUND_AMOUNT=(vsn, easMasterRegId,mode)=>`${API_BASE}${bundleApi}/getFundAmount/${vsn}/${easMasterRegId}/${mode}`;
const CHECK_ELIGIBILITY_FUND_DEVICE=(vsn, productCat)=>`${API_BASE}${bundleApi}/checkEligibilityforFundDevice/${vsn}/${productCat}`;
const GET_RATEPLAN_DATA=(msisdn, type, virtualServiceNo,bundleType)=>`${API_BASE}${bundleApi}/getRatePlanData/${msisdn}/${type}/${virtualServiceNo}/${bundleType}`
const GET_CORP_OWNER_INFO =(brn,companyName)=>`${API_BASE}${bundleApi}/getCorpAccountOwnerDetails/${brn}/${companyName}`;
const FETCH_LINE_DETAILS_DEALER_SEARCH=(regId, groupId)=> `${API_BASE}${dealerSearch}/getLineDetailsDealerSearch/${regId}/${groupId}`
const PUT_UPDATE_DELIVERY_STATUS_URL=`${API_BASE}${dealerSearch}/triggerUpdateDeliveryStatus`
const PUT_DEALER_PICK_PACK_URL=`${API_BASE}${dealerSearch}/triggerDealerPickAndPack`
const DELAER_SEARCH_UPDATE_IMEI=`${API_BASE}${dealerSearch}/triggerDealerUpdateIMEI`;
const DELAER_SEARCH_DO_PICK_PACK=`${API_BASE}${dealerSearch}/triggerDOAPickAndPack`;
const DELAER_SEARCH_DO_COMPLETE=`${API_BASE}${dealerSearch}/triggerDoaComplete`;

const EMAIL_DATA = `${API_BASE}${reportApi}/postSendEmail`;
const DELETE_SELECTED_SIM_REPLMNT = `${API_BASE}${bundleApi}/deleteSelected`;

const SUBMIT_BULKORDER_DATA = `${API_BASE}${bundleApi}/bulkSimReplacementOrderSubmission`;
const GET_SEARCH_DATA=(bulkRegId)=>`${API_BASE}${bundleApi}/getSearchData/${bulkRegId}`;
const SUBMIT_FOR_FULLFILMENT=(bulkRegId)=>`${API_BASE}${bundleApi}/submitForFullfilment/${bulkRegId}`;
const VALIDATE_STOCK_URL = (imei,simCardNo,sapStoreCode) => `${API_BASE}${bundleApi}/validateStock/${imei}/${simCardNo}/${sapStoreCode}`;
const UPDATE_MSISDN_STATUS=(bulkRegId,msisdnNew,msisdnToEdit,simType,newSimNo,reason,suspensionRequired)=>`${API_BASE}${bundleApi}/updateMsisdnAndStatus/${bulkRegId}/${msisdnNew}/${msisdnToEdit}/${simType}/${newSimNo}/${reason}/${suspensionRequired}`;
// actions
const _setRegistrationTypeInfo = (bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo,noOfLinesBcc) => {
	return new Promise((resolve, reject) => {
		resolve({ bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo ,noOfLinesBcc});
	})
}

const _setProductOrderInfo = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount,deviceFulfillment,topupByDealer,acctBarred) => {
	return new Promise((resolve, reject) => {
		resolve({ regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount,deviceFulfillment,topupByDealer,acctBarred });
	})
}
const _setProductOrderInfoOBS = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount,installationAddress,countMisc, zerolutionRTFfDeviceCount, isZerolutionRTF,activeKenanContractCount) => {
	return new Promise((resolve, reject) => {
		resolve({ regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount,installationAddress,countMisc, zerolutionRTFfDeviceCount, isZerolutionRTF,activeKenanContractCount});
	})
}
const _setDeviceFundInfo = (fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld) => {
	return new Promise((resolve, reject) => {
		resolve({ fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld });
	})
}

const _setAddressContactDetails = (billingAddress, deliveryAddress, picDetails,secondaryPicDetails) => {
	return new Promise((resolve, reject) => {
		resolve({ billingAddress, deliveryAddress, picDetails ,secondaryPicDetails});
	})
}

const _setApprovalRegistrationDetails = (registrationDetails) => {
	return new Promise((resolve, reject) => {
		resolve({ registrationDetails });
	})
}
const _unsetOrderData = (data) => {
	return new Promise((resolve, reject) => {
		resolve({ data });
	})
}
const _setApprovalSubmissionInfo = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
	totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission, bundleType,accountNumber, isParentIdBilled) => {
	return new Promise((resolve, reject) => {
		resolve({
			marketCode, accountCategory, parentId, hierarchyId, collectionCode,
			authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
			totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission, bundleType,accountNumber, isParentIdBilled
		});
	})
}

const _postOrderData = (order) => {
	console.log(POST_DATA);
	return axios.post(POST_DATA, order);
}

const _postApprovalOrderData = (order) => {
	return axios.post(POST_APPROVAL_DATA, order);
}
const _getRegistrationDetails = (easMasterRegId, mode) => {
    console.log(REGISTRATION_DETAILS_URL);
	return axios.get(REGISTRATION_DETAILS_URL(easMasterRegId, mode));
}



const _getMsisdnDetails = (easMasterRegId, mode) => {
	
	return axios.get(FETCH_LINE_DETAILS(easMasterRegId, mode));
}
const _getMsisdnDetailsERF = (easMasterRegId, mode) => {
	
	return axios.get(FETCH_LINE_DETAILS_ERF(easMasterRegId, mode));
}
const _getMsisdnDetailsOBS = (easMasterRegId, mode, isZerolutionRTF) => {
	
	return axios.get(FETCH_LINE_DETAILS_OBS(easMasterRegId, mode, isZerolutionRTF));
}
const _setCompanyInformation = (documentUploadItems, lineCount, crpLineCount) => {
	return new Promise((resolve, reject) => {
		resolve({ documentUploadItems, lineCount, crpLineCount });
	})
}

export const setCompanyInformation = (documentUploadItems, lineCount, crpLineCount) => {
	return dispatch => {
		dispatch({
			type: 'SET_COMPANY_INFORMATION',
			payload: _setCompanyInformation(documentUploadItems, lineCount, crpLineCount)
		})
	}
}

const _setLineDetails = (todos, crpLineCount,countMisc,totalDeviceTopUp) => {
	return new Promise((resolve, reject) => {
		resolve({ todos, crpLineCount,countMisc,totalDeviceTopUp});
	})
}
const _setMsisdnDetails = (msisdnList) => {
	return new Promise((resolve, reject) => {
		resolve({ msisdnList });
	})
}
const _setDeviceDetails = (addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft,totalAdjAmount) => {
	return new Promise((resolve, reject) => {
		resolve({ addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft,totalAdjAmount });
	})
}
const _setApprovalFunds = (totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed) => {
	return new Promise((resolve, reject) => {
		resolve({ totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed });
	})
}
// action creators
export const setRegistrationTypeInfo = (bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo,noOfLinesBcc) => {
	return dispatch => {
		dispatch({
			type: 'SET_REG_TYPE',
			payload: _setRegistrationTypeInfo(bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo,noOfLinesBcc)
		})
	}
}

export const setProductOrderInfo = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount,deviceFulfillment,topupByDealer,acctBarred) => {
	console.log("setproductinfo inside");
	console.log("acctBarred"+acctBarred);
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_ORDER',
			payload: _setProductOrderInfo(regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount,deviceFulfillment,topupByDealer,acctBarred)
		})
	}
}

export const setDeviceFundInfo = (fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld) => {
	return dispatch => {
		dispatch({
			type: 'SET_DEVICE_FUND',
			payload: _setDeviceFundInfo(fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld)
		})

	}
}


export const setAddressContactDetails = (billingAddress, deliveryAddress, picDetails,secondaryPicDetails) => {
	return dispatch => {
		dispatch({
			type: 'SET_ADDRESS_CONTACT_DETAILS',
			payload: _setAddressContactDetails(billingAddress, deliveryAddress, picDetails,secondaryPicDetails)
		})

	}
}



const _setSubmissionInfo = (dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
	cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user,appleDepId) => {
	return new Promise((resolve, reject) => {
		resolve({
			dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
			cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user,appleDepId
		});
	})
}
const _getFundAmount = (vsn, easMasterRegId,mode) => {
	return axios.get(GET_FUND_AMOUNT(vsn, easMasterRegId,mode));
}

const _getCorpAccountOwnerDetails = (brn,companyName) => {
	console.log(GET_CORP_OWNER_INFO(brn,companyName));
	return axios.get(GET_CORP_OWNER_INFO(brn,companyName));
}
export const setSubmissionInfo = (dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
	cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user,appleDepId) => {
	return dispatch => {
		dispatch({
			type: 'SET_SUBMISSION_INFO',
			payload: _setSubmissionInfo(dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter, cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user,appleDepId)
		})

	}
}


export const postOrderData = (data) => {
	return dispatch => {
		dispatch({
			type: 'SET_ORDER_SUBMISSION',
			payload: _postOrderData(data)
		})

	}
}

export const setApprovalRegistrationDetails = (registrationDetails) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_REG_TYPE',
			payload: _setApprovalRegistrationDetails(registrationDetails)
		})

	}
}

export const unsetOrderData = (data) => {
	return dispatch => {
		dispatch({
			type: 'UNSET_ORDER_DATA',
			payload: _unsetOrderData(data)
		})


	}
}

export const setApprovalSubmission = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
	totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission, bundleType,accountNumber, isParentIdBilled) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_SUBMISSION_INFO',
			payload: _setApprovalSubmissionInfo(marketCode, accountCategory, parentId, hierarchyId, collectionCode,
				authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
				totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission, bundleType,accountNumber, isParentIdBilled)
		})
	}
}


export const postApprovalOrderData = (data) => {
	return dispatch => {
		dispatch({
			type: 'SET_ORDER_APPROVAL',
			payload: _postApprovalOrderData(data)
		})

	}
}
export const getRegistrationDetails = (easMasterRegId, mode) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_REGISTRATION_DETAILS',
			payload: _getRegistrationDetails(easMasterRegId, mode)
		})
	}
}

export const getMsisdnDetails = (easMasterRegId, mode) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_LINE_DETAILS',
			payload: _getMsisdnDetails(easMasterRegId, mode)
		})
	}
}
export const getMsisdnDetailsERF = (easMasterRegId, mode) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_LINE_DETAILS',
			payload: _getMsisdnDetailsERF(easMasterRegId, mode)
		})
	}
}

export const getMsisdnDetailsOBS = (easMasterRegId, mode, isZerolutionRTF) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_LINE_DETAILS',
			payload: _getMsisdnDetailsOBS(easMasterRegId, mode, isZerolutionRTF)
		})
	}
}






export const setLineDetails = (todos, crpLineCount,countMisc,totalDeviceTopUp) => {
	return dispatch => {
		dispatch({
			type: 'SET_LINE_DETAILS',
			payload: _setLineDetails(todos, crpLineCount,countMisc,totalDeviceTopUp)
		})
	}
}

export const setMsisdnDetails = (msisdnList) => {
	return dispatch => {
		dispatch({
			type: 'SET_MSISDN_DETAILS',
			payload: _setMsisdnDetails(msisdnList)
		})
	}
}

export const setDeviceDetails = (addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft,totalAdjAmount) => {
	return dispatch => {
		dispatch({
			type: 'SET_DEVICE_DETAILS',
			payload: _setDeviceDetails(addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft,totalAdjAmount)
		})
	}
}

export const setApprovalFunds = (totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_FUNDS',
			payload: _setApprovalFunds(totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed)
		})
	}
}

export const setSubmissionInfoPrevious = (dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
	cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user,appleDepId) => {
	return dispatch => {
		dispatch({
			type: 'SET_SUBMISSION_INFO_PREVIOUS',
			payload: _setSubmissionInfo(dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
				cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user,appleDepId)
		})
	}
}
export const getFundAmount = (vsn, easMasterRegId,mode) =>{
	return dispatch => {
		dispatch({
			type: 'GET_FUND_AMOUNT',
			payload: _getFundAmount(vsn, easMasterRegId,mode)
		})
	}
}
export const getCorpAccountOwnerDetails = (brn,companyName) =>{
	return dispatch => {
		dispatch({
			type: 'GET_CORP_OWNER_INFO',
			payload: _getCorpAccountOwnerDetails(brn,companyName)
		})
	}
}
const _setApprovalSubmissionInfoPrevious = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
	totalDeviceTopUp, deviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, 
	totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user,
	 authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue, isAuthorisedSignatoryValid, isParentIdBilled) => {
	return new Promise((resolve, reject) => {
		resolve({
			marketCode, accountCategory, parentId, hierarchyId, collectionCode,
			authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
			totalDeviceTopUp, deviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, 
			totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, 
			authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue,isAuthorisedSignatoryValid, isParentIdBilled
		});
	})
}

export const setApprovalSubmissionPrevious = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
	totalDeviceTopUp, deviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, 
	totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, 
	authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue, isAuthorisedSignatoryValid, isParentIdBilled) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_SUBMISSION_INFO_PREVIOUS',
			payload: _setApprovalSubmissionInfoPrevious(marketCode, accountCategory, parentId, hierarchyId, collectionCode,
				authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
				totalDeviceTopUp, deviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue,
				 totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user,
				  authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue, isAuthorisedSignatoryValid, isParentIdBilled)
		})
	}
}
const _setResubmissionRegistrationInfo = (companyDeposit, advancePayment) => {
	return new Promise((resolve, reject) => {
		resolve({companyDeposit, advancePayment});
	})
}

export const setResubmissionRegistrationInfo = (companyDeposit, advancePayment) => {
	return dispatch => {
		dispatch({
			type: 'SET_RESUBMISSION_REGISTRATION_INFO',
			payload: _setResubmissionRegistrationInfo(companyDeposit, advancePayment)
		})
	}
}





const _setCompanyInformationPrev = (documentUploadItems, lineCount, crpLineCount) => {
	return new Promise((resolve, reject) => {
		resolve({ documentUploadItems, lineCount, crpLineCount });
	})
}

export const setCompanyInformationPrev = (documentUploadItems, lineCount, crpLineCount) => {
	return dispatch => {
		dispatch({
			type: 'SET_COMPANY_INFORMATION_PREV',
			payload: _setCompanyInformationPrev(documentUploadItems, lineCount, crpLineCount)
		})
	}
}


const _validateOldMsidns = (validateOldMsisdn, todos) => {
	return new Promise((resolve, reject) => {
		resolve({ validateOldMsisdn, todos });
	})
}

export const validateOldMsidns = (validateOldMsisdn, todos) => {
	return dispatch => {
		dispatch({
			type: 'VALIDATE_OLD_MSISDNS',
			payload: _validateOldMsidns(validateOldMsisdn, todos)
		})
	}
}

const _setProductOrderInfoPrev = (totalMemberString) => {
	return new Promise((resolve, reject) => {
		resolve({ totalMemberString });
	})
}

export const setProductOrderInfoPrev = (totalMemberString) => {
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_ORDER_PREVIOUS',
			payload: _setProductOrderInfoPrev(totalMemberString)
		})
	}
}

const _postResubOrderData = (order) => {
	return axios.post(POST_RESUB_DATA, order);
}
export const postResubOrderData = (data) => {
	return dispatch => {
		dispatch({
			type: 'SET_RESUBMISSION_ORDER_SUBMISSION',
			payload: _postResubOrderData(data)
		})

	}
}

const _checkEligibilityForFundDevice = (vsn, productCat) => {
	return axios.get(CHECK_ELIGIBILITY_FUND_DEVICE(vsn, productCat));
}


const _setProductOrderInfoERF = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel,
									 donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,planType
									, upgradeSafeDevice, safeDevice,billable,isOutright,phoneModelOutright,quantity,isContractDurationGrtrFourMonths, zerolutionRTFfDeviceCount, isZerolutionRTF, nonRTFDeviceCount) => {
	return new Promise((resolve, reject) => {
		resolve({ regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType,
				 donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,planType, upgradeSafeDevice, safeDevice,
				 billable,isOutright,phoneModelOutright,quantity,isContractDurationGrtrFourMonths, zerolutionRTFfDeviceCount, isZerolutionRTF, nonRTFDeviceCount});
	})
}






export const setProductOrderInfoERF = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel,
										 donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,planType
										 , upgradeSafeDevice, safeDevice,billable,isOutright,phoneModelOutright,quantity,isContractDurationGrtrFourMonths, zerolutionRTFfDeviceCount, isZerolutionRTF, nonRTFDeviceCount) => {
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_ORDER_ERF',
			payload: _setProductOrderInfoERF(regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel,
											 donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,planType	
											 , upgradeSafeDevice, safeDevice,billable,isOutright,phoneModelOutright,quantity,isContractDurationGrtrFourMonths, zerolutionRTFfDeviceCount, isZerolutionRTF, nonRTFDeviceCount)
		})
	}
}


const _erfPostResubOrderData = (order) => {
	console.log(ERF_POST_RESUB_DATA, order);
	return axios.post(ERF_POST_RESUB_DATA, order);
}
export const erfPostResubOrderData = (data) => {
	return dispatch => {
		dispatch({
			type: 'SET_RESUBMISSION_ORDER_SUBMISSION',
			payload: _erfPostResubOrderData(data)
		})

	}
}
const _obsPostResubOrderData = (order) => {
	console.log(OBS_POST_RESUB_DATA, order);
	return axios.post(OBS_POST_RESUB_DATA, order);
}
export const obsPostResubOrderData = (data) => {
	return dispatch => {
		dispatch({
			type: 'SET_RESUBMISSION_ORDER_SUBMISSION',
			payload: _obsPostResubOrderData(data)
		})

	}
}



const _setOrderInPMP = (orderInPMP) => {
	return new Promise((resolve, reject) => {
		resolve({orderInPMP});
	})
}

export const setOrderInPMP = (orderInPMP) => {
	return dispatch => {
		dispatch({
			type: 'SET_ORDER_PMP',
			payload: _setOrderInPMP(orderInPMP)
		})
	}
}

const _setProductOrderInfoPrevERF = (validateOldLinesStatus,todos) => {
	return new Promise((resolve, reject) => {
		resolve({ validateOldLinesStatus,todos});
	})
}

export const setProductOrderInfoPrevERF = (validateOldLinesStatus,todos) => {
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_ORDER_PREVIOUS_ERF',
			payload: _setProductOrderInfoPrevERF(validateOldLinesStatus,todos)
		})
	}
}
export const getRatePlanData = (msisdn, type, virtualServiceNo,bundleType) => {
	return dispatch => {
		dispatch({
			type: 'GET_ADD_ON_DATA_VSN',
			payload: _getRatePlanData(msisdn, type, virtualServiceNo,bundleType)
		})
	}
}
const _getRatePlanData = (msisdn, type, virtualServiceNo,bundleType) => {
	return axios.get(GET_RATEPLAN_DATA(msisdn, type, virtualServiceNo,bundleType));
}

export const checkEligibilityForFundDevice = (vsn, productCat) => {
	return dispatch => {
		dispatch({
			type: 'SET_ELIGIBILITY_CHECK',
			payload: _checkEligibilityForFundDevice(vsn, productCat)
		})
	}
}



const _setRatePlanBlank = (ratePlan) => {
	return new Promise((resolve, reject) => {
		resolve({ratePlan});
	})
}

export const setRatePlanBlank = (ratePlan) => {
	return dispatch => {
		dispatch({
			type: 'SET_RATEPLAN_BLANK',
			payload: _setRatePlanBlank(ratePlan)
		})
	}
}
export const updatePayment = (data) => {
	return dispatch => {
		dispatch({
			type: 'UPDATE_PAYMENT',
			payload: _updatePayment(data)
		})

	}
}

const _updatePayment = (order) => {
	return axios.post(UPDATE_PAYMENT_URL, order);
}


export const updateChangeStatus = (data) => {
	return dispatch => {
		dispatch({
			type: 'UPDATE_CHANGE_PAYMENT',
			payload: _updateChangeStatus(data)
		})

	}
}

const _getSearchData = (bulkRegId) => {
	return axios.get(GET_SEARCH_DATA(bulkRegId));
}

export const getSearchData = (bulkRegId) =>{
	return dispatch => {
		dispatch({
			type: 'GET_BULK_SEARCH_DATA',
			payload: _getSearchData(bulkRegId)
		})
	}
}

const _updateChangeStatus = (order) => {
	return axios.post(UPDATE_CHANGE_PAYMENT_URL, order);
}

const _fetchLineDetailsDealerSearch = (regId, groupId) => {
	return axios.get(FETCH_LINE_DETAILS_DEALER_SEARCH(regId, groupId));
}

export const fetchLineDetailsDealerSearch = (regId, groupId) => {
	return dispatch => {
		dispatch({
			type:'FETCH_LINE_DETAILS_SEARCH_DEALER',
			payload: _fetchLineDetailsDealerSearch(regId, groupId)
		})
	}
}

const _triggerUpdateDeliveryStatus = (request) => {
	console.log(request);
	return axios.post(PUT_UPDATE_DELIVERY_STATUS_URL,request);
}

export const triggerUpdateDeliveryStatus = (request) => {
	return dispatch => {
		
		dispatch({
			type:'PUT_UPDATE_DELIVERY_STATUS',
			payload: _triggerUpdateDeliveryStatus(request)
		})
	}
}

const _submitBulkOrders = (order) => {
	console.log("in const of submitBulkOrders",order);

	console.log(SUBMIT_BULKORDER_DATA,order);

	return axios.post(SUBMIT_BULKORDER_DATA, order);
}

export const submitBulkOrders = (data) => {
	console.log("in export of submitBulkOrders");
	return dispatch => {
		dispatch({
			type: 'SUBMIT_BULK_ORDER',
			payload: _submitBulkOrders(data)
		})

	}
}
const _submitForFullfilment= (bulkRegId) => {
	console.log('abc ',bulkRegId);
	console.log( SUBMIT_FOR_FULLFILMENT);
	return axios.put((SUBMIT_FOR_FULLFILMENT(bulkRegId)));
}


export const submitForFullfilment = (data) => {
	return dispatch => {
		dispatch({
			type: 'SET_SUBMIT_FOR_FULLFILMENT',
			payload: _submitForFullfilment(data)
		})

	}
}

const _updateMsisdnAndStatus= (bulkRegId,msisdnNew,msisdnToEdit,simType,newSimNo,reason,suspensionRequired) => {
	console.log('abc ',bulkRegId);
	console.log( UPDATE_MSISDN_STATUS);
	if(reason != null){
		reason = reason.replace(/\//g,"_");
	}
	console.log("reason" +reason)
	return axios.put((UPDATE_MSISDN_STATUS(bulkRegId,msisdnNew,msisdnToEdit,simType,newSimNo,reason,suspensionRequired)));
}


export const updateMsisdnAndStatus = (bulkRegId,msisdnNew,msisdnToEdit,simType,newSimNo,reason,suspensionRequired) => {
	return dispatch => {
		dispatch({
			type: 'UPDATE_MSISDN_STATUS',
			payload: _updateMsisdnAndStatus(bulkRegId,msisdnNew,msisdnToEdit,simType,newSimNo,reason,suspensionRequired)
		})

	}
}

const _deleteSelectedSimOrder = (order) => {
	console.log(DELETE_SELECTED_SIM_REPLMNT);
	console.log('deletepojo',order);
	return axios.post(DELETE_SELECTED_SIM_REPLMNT, order);
}


export const deleteSelectedSimOrder = (data) => {
	console.log('hi in order');
	return dispatch => {
		dispatch({
			type: 'DELETE_SELECTED_SIM_ORDER',
			payload: _deleteSelectedSimOrder(data)
		})

	}
}





const _triggerDealerPickAndPack = (request)=>{
	console.log(request);
	return axios.post(PUT_DEALER_PICK_PACK_URL,request);
}

export const triggerDealerPickAndPack= (request)=>{
	return dispatch =>{
		dispatch({
			type:'PUT_DEALER_PICK_PACK',
			payload: _triggerDealerPickAndPack(request)
		})
	}
}

const _triggerUpdateIMEI =(request)=>{
	return axios.post(DELAER_SEARCH_UPDATE_IMEI, request)
}
export const triggerUpdateIMEI= (request)=>{
	return dispatch =>{
		dispatch({
			type: 'DEALER_SEARCH_UPDATE_IMEI',
			payload: _triggerUpdateIMEI(request)
		})
	}
}

const _triggerDOPickPack=(request)=>{
	return axios.post(DELAER_SEARCH_DO_PICK_PACK, request);
}
export const triggerDOPickPack=(request)=>{
	return dispatch =>{
		dispatch({
			type: 'DEALER_SEARCH_DO_PICK_PACK',
			payload: _triggerDOPickPack(request)
		})
	}
}

const _triggerDOComplete=(request)=>{
	return axios.post(DELAER_SEARCH_DO_COMPLETE,request)
}
export const triggerDOComplete=(request)=>{
	return dispatch=>{
		dispatch({
			type: 'DEALER_SEARCH_DO_COMPLETE',
			payload: _triggerDOComplete(request)
		})
	}
}

export const setReportNameInfo = (reportType) => {
	return dispatch => {
		dispatch({
			type: 'SET_REPORT_TYPE',
			payload: _setReportNameInfo(reportType)
		})
	}
}
// actions
const _setReportNameInfo = (reportType) => {
	return new Promise((resolve, reject) => {
		resolve({ reportType});
	})
}


export const postEmailData =(reportData)=>{
	return dispatch => {
			dispatch({
				type: 'SET_EMAIL_DATA',
				payload: _postEmailData(reportData)
			})

		}
}


const _postEmailData = (reportData) => {
	console.log('hi i am here ','reportData',reportData);
	return axios.post(EMAIL_DATA, reportData);
}
const _saveInsAddress = (installationAddress) => {
	return new Promise((resolve, reject) => {
		resolve({installationAddress});
	})
}

export const saveInsAddress = (installationAddress) => {
	return dispatch => {
		dispatch({
			type: 'SET_INSTALLATION_ADDRESS',
			payload: _saveInsAddress(installationAddress)
		})
	}
}

export const setProductOrderInfoOBS = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList, crpLineCount, installationAddress, countMisc, zerolutionRTFfDeviceCount, isZerolutionRTF,activeKenanContractCount) => {
	console.log("setproductinfo OBS inside");
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_ORDER_OBS',
			payload: _setProductOrderInfoOBS(regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount,installationAddress,countMisc, zerolutionRTFfDeviceCount, isZerolutionRTF,activeKenanContractCount)
		})
	}
}
export const setDeviceFundInfoPrev = (validateDevice) => {
	return dispatch => {
		dispatch({
			type: 'SET_DEVICE_FUND_PREV',
			payload: _setDeviceFundInfoPrev(validateDevice)
		})

	}
}


const _setDeviceFundInfoPrev = (validateDevice) => {
	return new Promise((resolve, reject) => {
		resolve({validateDevice});
	})
}



const _setRTFDeviceCount = (nonRTFDeviceCount, count, isZerolutionRTF) => {
	return new Promise((resolve, reject) => {
		resolve({ nonRTFDeviceCount, count, isZerolutionRTF});
	})
}

export const setRTFDeviceCount = (nonRTFDeviceCount, count, isZerolutionRTF) => {
	return dispatch => {
		dispatch({
			type: 'SET_RTF_DEVICE_COUNT',
			payload: _setRTFDeviceCount(nonRTFDeviceCount, count, isZerolutionRTF)
		})
	}
}


const _validateStock =(imei,simCardNo,sapStoreCode)=>{
	console.log(VALIDATE_STOCK_URL(imei,simCardNo,sapStoreCode));
	return axios.get(VALIDATE_STOCK_URL(imei,simCardNo,sapStoreCode))
	// return new Promise((resolve, reject) => {
	// 	resolve({imei});
	// })
}
export const validateStock= (imei,simCardNo,sapStoreCode)=>{
	return dispatch =>{
		dispatch({
			type: 'VALIDATE_STOCK',
			payload: _validateStock(imei,simCardNo,sapStoreCode)
		})
	}
}