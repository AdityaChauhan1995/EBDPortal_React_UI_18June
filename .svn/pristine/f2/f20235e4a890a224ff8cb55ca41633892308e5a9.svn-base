import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
//const DEALER_API_TOKEN = process.env.REACT_APP_DEALER_API_BASE;
//const REPORT_API_BASE =process.env.REACT_APP_API_REPORT;
const bundleApi='/bundle/api';
const dealerSearch='/dealerSearch/api';
const reportAPi='/reports/api';
const orderApi='/order/api'
const EAS_CONFIGURATION_URL = `${API_BASE}${bundleApi}/getEASConfiguration`;
const COMPANY_INFO_BY_BRN_URL = (brn,noOfLinesBcc, userRole) => `${API_BASE}${bundleApi}/brnValidation/${brn}/${noOfLinesBcc}/${userRole}`;
const FETCH_POST_CODES_URL = `${API_BASE}${bundleApi}/getPostCode`;
const GET_REG_TYPES_URL = (prodCategory) => `${API_BASE}${bundleApi}/getRegType/${prodCategory}`;
const GET_RATEPLANS_URL = (regType, vsn) => `${API_BASE}${bundleApi}/getRatePlan/${regType}/${vsn}`;
const ZEROLUTION_DEVICES_URL = (ratePlanPkgId) => `${API_BASE}${bundleApi}/getDeviceList/${ratePlanPkgId}`;
const FETCH_VAS_URL = (rateplan, regType, mobileNo) => `${API_BASE}${bundleApi}/openVasPopup/${rateplan}/${regType}/${mobileNo}`;
const VALIDATE_LINE_URL = (msisdn, sim, regType, virtualServiceNo, userRole, salesChannelId, donorId, ratePlanId,vasIdsSelected, ratePlanPkgId, orderCategory) => `${API_BASE}${bundleApi}/validateLine/${msisdn}/${sim}/${regType}/${virtualServiceNo}/${userRole}/${salesChannelId}/${donorId}/${ratePlanId}/${vasIdsSelected}/${ratePlanPkgId}/${orderCategory}`
const SEND_FILE_URL = `${API_BASE}${bundleApi}/uploadFile`;
const ACCOUNT_MANAGER_INFO_URL = `${API_BASE}${bundleApi}/getAccountManagerList`;
const SUPPORTING_CENTER_INFO_URL = `${API_BASE}${bundleApi}/getSupportingCentertList`;
const VSN_SEARCH_BY_BRN_URL = (brn, bundleType) => `${API_BASE}${bundleApi}/getVsnByBrn/${brn}/${bundleType}`;
const VSN_SEARCH_BY_MSISDN_VSN_URL = (msisdnVSN) => `${API_BASE}${bundleApi}/vsnListFromWM/${msisdnVSN}`;
const ZEROLUTION_DEVICE_INFO_URL = (deviceId, safeDevice) => `${API_BASE}${bundleApi}/getDeviceInfo/${deviceId}/${safeDevice}`;
const FETCH_DEVICE_FUND_CONTRACTS_URL = `${API_BASE}${bundleApi}/getDeviceFundDetails`;
const FLEXI_FUND_DEVICE_URL = `${API_BASE}${bundleApi}/getDeviceListDropDown`;
const FETCH_FUND_DEVICE_INFO = (deviceId) => `${API_BASE}${bundleApi}/getFlexiFundInfo/${deviceId}`;
const GET_UPLOADED_FILE_URL = (regId, sNo, documentCode, docAlreadyExists) => `${API_BASE}${bundleApi}/downloadFile/${regId}/${sNo}/${documentCode}/${docAlreadyExists}`;
const GET_DEVICE_FUND_CONTRACTS_URL = (easMasterRegId, vsn) => `${API_BASE}${bundleApi}/getFundDetailsApproval/${easMasterRegId}/${vsn}`;
const GET_ADDED_FUND_DEVICES_URL = (easMasterRegId) => `${API_BASE}${bundleApi}/getDeviceListApproval/${easMasterRegId}`;
const GET_DONOR_LIST = `${API_BASE}${bundleApi}/getDonorList`;
const GET_SIM_TYPES = `${API_BASE}${bundleApi}/getSimTypeList`;
const VALIDATE_PARENTID_HIERID_URL = (parentId, hierId, masterRegId) => `${API_BASE}${bundleApi}/validateParentIdHierId/${parentId}/${hierId}/${masterRegId}`;
const GET_PAYMENT_DETAILS = (masterRegId, brn) => `${API_BASE}${bundleApi}/getPaymentDetails/${masterRegId}/${brn}`;
const GET_VIEW_SUBMISSION_INFO_URL = (masterRegId) => `${API_BASE}${bundleApi}/getAuditPaymentDetails/${masterRegId}`;
const GET_ASSIGN_LIST_URL = `${API_BASE}${bundleApi}/getAssignToList`;
const VAS_RULE_CHECK_URL=(ratePlanId,strVasIds,bundleType)=>`${API_BASE}${bundleApi}/vasRuleCheck/${ratePlanId}/${strVasIds}/${bundleType}`;
const CONTRACT_CHECK_URL=(msisdn)=>`${API_BASE}${bundleApi}/getExistingContracts/${msisdn}`;
const GET_VSN_DETAILS=(vsn,bundleType)=>`${API_BASE}${bundleApi}/getVSNDetails/${vsn}/${bundleType}`;
const SEND_FILE_URL_DEALER_SEARCH=`${API_BASE}${dealerSearch}/uploadFileDealerSearch`;
const GET_REG_TYPES_ERF_URL = (deviceContract) => `${API_BASE}${bundleApi}/getRegistrationTypeDropDown/${deviceContract}`;
const GET_PROMOTIONS_URL = (loginName,brnNo,userRole) => `${API_BASE}${bundleApi}/getPromotionListDropDown/${loginName}/${brnNo}/${userRole}`;
const GET_RATEPLANS_ERF_URL = (deviceContract,userId,promotionId,regType,brn) => `${API_BASE}${bundleApi}/getRatePlanListDropDownERF/${deviceContract}/${userId}/${promotionId}/${regType}/${brn}`;
const FETCH_VAS_ERF_URL = (promotionId,ratePlanId,regType,deviceContract,mobileNumber) => `${API_BASE}${bundleApi}/getVasListToDisplay/${promotionId}/${ratePlanId}/${regType}/${deviceContract}/${mobileNumber}`;
const GET_DEVICE_LIST_ERF_URL = (deviceContract,ratePlanId,brn, msisdnNo, ratePlanPkgId) => `${API_BASE}${bundleApi}/getDeviceListMaxisERF/${deviceContract}/${ratePlanId}/${brn}/${msisdnNo}/${ratePlanPkgId}`;
const DEVICE_INFO_ERF_URL =(deviceId,deviceContract,upgradeSafeDevice,safeDevice) => `${API_BASE}${bundleApi}/getDeviceInfoERF/${deviceId}/${deviceContract}/${upgradeSafeDevice}/${safeDevice}`;
const CONTRACT_CHECK_ERF_URL=(mobileNumber,regType,deviceContract,brn)=>`${API_BASE}${bundleApi}/ContractCheckERF/${mobileNumber}/${regType}/${deviceContract}/${brn}`;
const VAS_RULE_CHECK_ERF_URL=(deviceContract,ratePlanId, strVasIds,mobileNumber,regType,brn,deviceId,tempUpgradeSafeDevice,tempSafeDevice)=>`${API_BASE}${bundleApi}/vasRuleCheckERF/${deviceContract}/${ratePlanId}/${strVasIds}/${mobileNumber}/${regType}/${brn}/${deviceId}/${tempUpgradeSafeDevice}/${tempSafeDevice}`;
const VALIDATE_LINE_ERF_URL = (mobileNumber,regType,deviceContract,tempSimCardNo,salesChannelId,brn,tempSafeDevice,
									   tempUpgradeSafeDevice,ratePlanId,deviceId,vasList,isOutright,donorAccountNo,promotionId,outrightDeviceQuantiy,userRole,vasIdsSelected) => `${API_BASE}${bundleApi}/ValidateLineERF/${mobileNumber}/${regType}/${deviceContract}/${tempSimCardNo}/${salesChannelId}/${brn}/${tempSafeDevice}/${tempUpgradeSafeDevice}/${ratePlanId}/${deviceId}/${vasList}/${isOutright}/${donorAccountNo}/${promotionId}/${outrightDeviceQuantiy}/${userRole}/${vasIdsSelected}`
const GET_UPLOADED_FILE_ERF_URL = (filePath) => `${API_BASE}${bundleApi}/downloadFileERF/${filePath}`;
const SEARCH_PAYMENT_URL = (regId,productGroup) => `${API_BASE}${bundleApi}/searchPaymentInfo/${regId}/${productGroup}`;
const GET_PROD_GRP_CHANGE_URL = `${API_BASE}${bundleApi}/getProdGrpChangeStatus`;
const SEARCH_CHANGE_URL = (regId,productGroup) => `${API_BASE}${bundleApi}/searchByRegId/${regId}/${productGroup}`;
const FETCH_REPORT_DATA_URL= (reportType, deviceOrderNo,startDate,endDate,ratePlan,brn,cmss,promotionName) => `${API_BASE}/getReportData/${reportType}/${deviceOrderNo}/${startDate}/${endDate}/${ratePlan}/${brn}/${cmss}/${promotionName}`;
const FETCH_REPORTS_HISTORY_EXECUTION_URL =  `${API_BASE}${reportAPi}/getReportExecutionHistory`;
const AUTOMATED_REPORT_NAME_URL = `${API_BASE}${reportAPi}/getAutomatedReportName`;
const CUSTOM_REPORT_INPUT_URL =(reportName)=> `${API_BASE}${reportAPi}/getAutomatedReportInput/${reportName}`;
const POST_REPORT_DATA = `${API_BASE}${reportAPi}/generateAdhocReport`;
const GET_REG_TYPES_OBS_URL = (prodCategory) => `${API_BASE}${bundleApi}/getRegTypeobs/${prodCategory}`;
const GET_RATEPLANS_OBS_URL = (regType, userId, msisdn) => `${API_BASE}${bundleApi}/getRatePlanobs/${regType}/${userId}/${msisdn}`;
const VSN_OBS_SEARCH_BY_BRN_URL = (brn) => `${API_BASE}${bundleApi}/validateVsnByBrn/${brn}`;
// const GET_BCC_VALIDATION_URL=(brn,totalRequestingLine,requestVasIds)=>`${API_BASE}${bundleApi}/checkingBccValidation/${brn}/${totalRequestingLine}/${requestVasIds}`;
const GET_BCC_VALIDATION_URL = `${API_BASE}${bundleApi}/checkingBccValidation`;
const GET_RATEPLANS_MISC_OBS_URL = (regType,vsn) => `${API_BASE}${bundleApi}/getRatePlanMiscObs/${regType}/${vsn}`;
const GET_RATEPLAN_DEVICE_MAP_LIST_URL = `${API_BASE}${bundleApi}/getPortalRefRatePlanDeviceMap`;
const VALIDATE_LINE_EXISTING_GROUP_URL =  `${API_BASE}${orderApi}/validateDeviceList`;
const GET_BULK_USERS_URL = `${API_BASE}${bundleApi}/getBulkRoleList`;
const GET_BULK_ORDERS_DATA_URL =(bulkRegId,bulkStatus,createdBy,date1,date2,userId)=>  `${API_BASE}${bundleApi}/getBulkOrdersData/${bulkRegId}/${bulkStatus}/${createdBy}/${date1}/${date2}/${userId}`;
const GET_SIM_TYPE_REPLCMT_REASON= `${API_BASE}${bundleApi}/getSIMTypeReplcmtReason`;
const GET_TEMP_FILE_URL =`${API_BASE}${bundleApi}/getTemplateFileForBulkSim`;
const GET_OBS_DEVICES_URL = (rateplan, isZerolutionRTF, ratePlanPkgId) =>  `${API_BASE}${bundleApi}/getOBSDeviceList/${rateplan}/${isZerolutionRTF}/${ratePlanPkgId}`;
const OBS_DEVICE_INFO_URL = (deviceId,rpMasterId, safeDevice, isZerolutionRTF) => `${API_BASE}${bundleApi}/getDeviceInfoOBS/${deviceId}/${rpMasterId}/${safeDevice}/${isZerolutionRTF}`;
const FETCH_ZEROLUTION_DEVICE_REPORT_URL =(fromDate, toDate, userRole, storeCode, isHomcUser)=> `${API_BASE}${reportAPi}/getZerolutionReportData?fromDate=${fromDate}&toDate=${toDate}&userRole=${userRole}&storeCode=${storeCode}&isHomcUser=${isHomcUser}`;
const DOWNLOAD_ZEROLUTION_DEVICE_REPORT_URL =(fromDate, toDate, userRole, storeCode, isHomcUser)=> `${API_BASE}${reportAPi}/downloadZerolutionReport?fromDate=${fromDate}&toDate=${toDate}&userRole=${userRole}&storeCode=${storeCode}&isHomcUser=${isHomcUser}`;
const GET_EXISTING_SHAREABLE_LINES_COUNT = (vsn) => `${API_BASE}${bundleApi}/getTotalExistingEligibleShareableCount/${vsn}`;
const GET_EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP = `${API_BASE}${bundleApi}/getTotalExistingEligibleShareableCountForCRP`;

// actions
const _getEASConfigurationData = () => {
	return axios.get(EAS_CONFIGURATION_URL);
}

const _searchVsnByBRN = (brn, bundleType) => {
	return axios.get(VSN_SEARCH_BY_BRN_URL(brn, bundleType));
}
const _validateOBSVsnByBRN = (brn) => {
	return axios.get(VSN_OBS_SEARCH_BY_BRN_URL(brn));
}
const _searchVsnByMsisdnVsn = (msisdnVSN) => {
	return axios.get(VSN_SEARCH_BY_MSISDN_VSN_URL(msisdnVSN));

}

const _getRegTypes = (prodCategory) => {
		return axios.get(GET_REG_TYPES_URL(prodCategory));
}
const _getRateplans = (regType, vsn) => {
		return axios.get(GET_RATEPLANS_URL(regType, vsn));
}

const _getSimTypes = () => {
	return axios.get(GET_SIM_TYPES);
}

const _getDonorTypes = () => {
	return axios.get(GET_DONOR_LIST);
}

const _getZerolutionDevices = ( ratePlanPkgId ) => {
	return axios.get(ZEROLUTION_DEVICES_URL( ratePlanPkgId ));
}

const _getZerolutionDeviceInfo = (deviceId, safeDevice) => {
	return axios.get(ZEROLUTION_DEVICE_INFO_URL(deviceId, safeDevice));
}

const _getDeviceFunds = () => {
	return new Promise((resolve, reject) => {
		resolve(require('../../mock/device-funds.json'));
	})
}

const _getFlexiFundDevices = () => {
	return axios.get(FLEXI_FUND_DEVICE_URL);
}

const _getPostCodes = () => {
	return axios.get(FETCH_POST_CODES_URL);
}

const _getCompanyInformation = (brn,noOfLinesBcc, userRole) => {
	console.log("noOfLinesBcc actions",noOfLinesBcc)
	return axios.get(COMPANY_INFO_BY_BRN_URL(brn,noOfLinesBcc, userRole));
}
const _sendFile = (data) => {

 console.log("datae in actions",data);
	return axios.post(SEND_FILE_URL, data);
}
const _getUploadedFile = (regId, sNo, documentCode, docAlreadyExists) => {
	return axios.get(GET_UPLOADED_FILE_URL(regId, sNo, documentCode, docAlreadyExists),
		{ responseType: 'blob' });
}
const _getUploadedFileERF = (filePath) => {
	return axios.get(GET_UPLOADED_FILE_ERF_URL(filePath),
		{ responseType: 'blob' });
}
const _getSubmissionInformation = () => {
	// mockknig response
	return new Promise((resolve, reject) => {
		resolve(require('../../mock/dealer-details.json'));
	})
}
const _getAccountManagerInfo = () => {
	// mockknig response
	//  return new Promise((resolve, reject) => {
	//  	resolve(require('../../mock/account-manager.json'));
	//  })
	return axios.get(ACCOUNT_MANAGER_INFO_URL);
}
const _getSupportingCenterInfo = () => {
	// mockknig response
	//  return new Promise((resolve, reject) => {
	//  	resolve(require('../../mock/supporting-center.json'));
	//  })
	return axios.get(SUPPORTING_CENTER_INFO_URL);
}
const _setCompanyInfo = (brnInfo, tempUploadRegId) => {
	return new Promise((resolve, reject) => {
		resolve({ brnInfo, tempUploadRegId });
	})
}

const _getVasPopupData = (rateplan, regType, mobileNo) => {
	// return fetch(FETCH_VAS_URL(rateplan), {
	// 		method: "get"
	// 	})
	// 	.then(d => d.json())
	// 	.then(d => {
	// 		return d;
	// 	})

	return axios.get(FETCH_VAS_URL(rateplan, regType, mobileNo));
}

const _validateLine = (msisdn, sim, regType, virtualServiceNo, userRole, salesChannelId, donorId, ratePlanId,vasIdsSelected, ratePlanPkgId, orderCategory) => {
	return axios.get(VALIDATE_LINE_URL(msisdn, sim, regType, virtualServiceNo, userRole, salesChannelId, donorId, ratePlanId,vasIdsSelected, ratePlanPkgId, orderCategory));
}

const _fetchDeviceFundContracts = (fundDetailsParam) => {

	/*	axios.post(FETCH_DEVICE_FUND_CONTRACTS_URL(), {
		  headers: {
			'Content-Type': 'multipart/form-data'
		  },
		  fundDetailsParam
		})*/

}

const _getDeviceFundContracts = (easMasterRegId, vsn) => {
	return axios.get(GET_DEVICE_FUND_CONTRACTS_URL(easMasterRegId, vsn));
}

const _fetchFundDeviceInfo = (deviceId) => {
	return axios.get(FETCH_FUND_DEVICE_INFO(deviceId));
}

const _getAddedFundDevices = (easMasterRegId) => {
	return axios.get(GET_ADDED_FUND_DEVICES_URL(easMasterRegId));
}

const _setDeviceFunds = (deviceFunds) => {
	return new Promise((resolve, reject) => {
		resolve({ deviceFunds });
	})
}
const _setApprovalDeviceFunds = (deviceFunds) => {
	return new Promise((resolve, reject) => {
		resolve({ deviceFunds });
	})
}
const _getValidateParentIdHierIdInfo = (parentId, hierId, masterRegId) => {

	return axios.get(VALIDATE_PARENTID_HIERID_URL(parentId, hierId, masterRegId));
}
const _getPaymentDetails = (masterRegId, brn) => {

	return axios.get(GET_PAYMENT_DETAILS(masterRegId, brn));
}
const _getAssignList = () => {
	return axios.get(GET_ASSIGN_LIST_URL);
}
const _performVasRuleCheck = (ratePlanId,strVasIds,bundleType) => {
	return axios.get(VAS_RULE_CHECK_URL(ratePlanId,strVasIds,bundleType));
}
const _resetParentIdHierIdStatus = () => {
	return new Promise((resolve, reject) => {
		resolve({ });
	})
}
const _getAuditPaymentDetails = (masterRegId) => {
	console.log(GET_VIEW_SUBMISSION_INFO_URL(masterRegId));
	return axios.get(GET_VIEW_SUBMISSION_INFO_URL(masterRegId));
}
const _contractCheck = (msisdn) => {
	return axios.get(CONTRACT_CHECK_URL(msisdn));
}
const _getVSNDetails = (vsn,bundleType) => {
	return axios.get(GET_VSN_DETAILS(vsn,bundleType));
}
const _getRegTypesObs = (prodCategory) => {
	return axios.get(GET_REG_TYPES_OBS_URL(prodCategory));
}

const _setOldDeviceFunds = (deviceFundsOld) => {
	return new Promise((resolve, reject) => {
		resolve({ deviceFundsOld });
	})
}
const _getAutomatedReportName = () => {
	console.log('AUTOMATED_REPORT_NAME_URL',AUTOMATED_REPORT_NAME_URL);
	return axios.get(AUTOMATED_REPORT_NAME_URL);
}
const _getRateplansobs = (regType, userId, msisdn) => {
	return axios.get(GET_RATEPLANS_OBS_URL(regType, userId, msisdn));
}

const _getRateplansMisc = (regType, vsn) => {
	return axios.get(GET_RATEPLANS_MISC_OBS_URL(regType, vsn));
}
// action creators
export const getAuditPaymentDetails = (masterRegId) => {
	return dispatch => {
		dispatch({
			type: 'GET_VIEW_SUBMISSION_INFO',
			payload: _getAuditPaymentDetails(masterRegId)
		})
	}
}
export const getEASConfigurationData = () => {
	return dispatch => {
		dispatch({
			type: 'GET_EAS_CONFIGURATION_DATA',
			payload: _getEASConfigurationData()
		})
	}
}

export const searchVsnByBRN = (brn, bundleType) => {
	return dispatch => {
		dispatch({
			type: 'VSN_SEARCH_BY_BRN',
			payload: _searchVsnByBRN(brn, bundleType)
		})
	}
}
export const validateOBSVsnByBRN = (brn) => {
	return dispatch => {
		dispatch({
			type: 'VSN_OBS_SEARCH_BY_BRN',
			payload: _validateOBSVsnByBRN(brn)
		})
	}
}
export const searchVsnByMsisdnVsn = (msisdnVSN) => {
	return dispatch => {
		dispatch({
			type: 'VSN_SEARCH_BY_MSISDN_VSN',
			payload: _searchVsnByMsisdnVsn(msisdnVSN)
		})
	}
}

export const getRegTypes = (prodCategory) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_REG_TYPES',
			payload: _getRegTypes(prodCategory)
		})
	}
}

export const getRateplans = (regType, vsn,deviceContract,userId,promotionId,regTypeValue,brn) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_RATEPLANS',
			payload: _getRateplans(regType, vsn,deviceContract,userId,promotionId,regTypeValue,brn)
		})
	}
}

export const getSimTypes = () => {
	return dispatch => {
		dispatch({
			type: 'FETCH_SIM_TYPES',
			payload: _getSimTypes()
		})
	}
}
export const getDonorTypes = () => {
	return dispatch => {
		dispatch({
			type: 'FETCH_DONOR_TYPES',
			payload: _getDonorTypes()
		})
	}
}
export const getZerolutionDevices = ( ratePlanPkgId ) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_ZEROLUTION_DEVICES',
			payload: _getZerolutionDevices( ratePlanPkgId )
		})
	}
}



export const getCompanyInformation = (brn,noOfLinesBcc, userRole) => {
	return dispatch => {
		dispatch({
			type: 'COMPANY_INFO_BY_BRN',
			payload: _getCompanyInformation(brn,noOfLinesBcc, userRole)
		})
	}
}

export const getZerolutionDeviceInfo = (deviceId, safeDevice) => {

	return dispatch => {
		dispatch({
			type: 'FETCH_ZEROLUTION_DEVICE_INFO',
			payload: _getZerolutionDeviceInfo(deviceId, safeDevice)
		})
	}
}

export const getDeviceFunds = (list) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_DEVICE_FUNDS',
			payload: _getDeviceFunds()
		})
	}
}

export const getFlexiFundDevices = () => {
	return dispatch => {
		dispatch({
			type: 'FETCH_FLEXI_FUND_DEVICES',
			payload: _getFlexiFundDevices()
		})
	}

}



export const sendFile = (data) => {
	return dispatch => {
		dispatch({
			type: 'SEND_FILE',
			payload: _sendFile(data)
		})

	}
}


export const getPostCodes = () => {
	return dispatch => {
		dispatch({
			type: 'FETCH_POST_CODE_HINT',
			payload: _getPostCodes()
		})

	}
}


export const getSubmissionInfo = () => {
	return dispatch => {
		dispatch({
			type: 'SUBMISSION_INFO',
			payload: _getSubmissionInformation()
		})
	}
}
export const setCompanyInfo = (brnInfo, tempUploadRegId) => {
	return dispatch => {
		dispatch({
			type: 'SET_COMPANY_INFO',
			payload: _setCompanyInfo(brnInfo, tempUploadRegId)
		})
	}
}


export const getAccountManagerDetails = () => {
	return dispatch => {
		dispatch({
			type: 'ACCOUNT_MANAGER_INFO',
			payload: _getAccountManagerInfo()
		})
	}
}
export const getSupportingCenter = () => {
	return dispatch => {
		dispatch({
			type: 'SUPPORTING_CENTER_INFO',
			payload: _getSupportingCenterInfo()
		})
	}
}


const _submissionSendFile = (data) => {

	// return new Promise((resolve, reject) => {
	// 	resolve(require('../../mock/submission-send-file.json'));
	// })
	return axios.post(SEND_FILE_URL, data)
}

export const submissionSendFile = (data) => {
	return dispatch => {
		dispatch({
			type: 'SUBMISSION_SEND_FILE',
			payload: _submissionSendFile(data)
		})

	}
}

const _submissionUploadFile = (regId, documentDesc, sNo, documentCode, docAlreadyExists) => {

	// return new Promise((resolve, reject) => {
	// 	resolve(require('../../mock/submission-upload-file.json'));
	// })
	return axios.get(GET_UPLOADED_FILE_URL(regId, documentDesc, sNo, documentCode, docAlreadyExists),
		{ responseType: 'blob' });
}

export const submissionUploadFile = (regId, documentDesc, sNo, documentCode, docAlreadyExists) => {
	return dispatch => {
		dispatch({
			type: 'SUBMISSION_UPLOAD_FILE',
			payload: _submissionUploadFile(regId, documentDesc, sNo, documentCode, docAlreadyExists)
		})

	}

}
export const getUploadedFile = (regId, documentDesc, sNo, documentCode, docAlreadyExists) => {
	return dispatch => {
		dispatch({
			type: 'GET_UPLOADED_FILE',
			payload: _getUploadedFile(regId, documentDesc, sNo, documentCode, docAlreadyExists)
		})

	}
}

export const getUploadedFileERF = (filePath) => {
	return dispatch => {
		dispatch({
			type: 'GET_UPLOADED_FILE',
			payload: _getUploadedFileERF(filePath)
		})

	}
}

export const getVasPopupData = (rateplan, regType, mobileNo) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_VAS_POPUP_DATA',
			payload: _getVasPopupData(rateplan, regType, mobileNo)
		})

	}
}
export const validateLine = (msisdn, sim, regType, virtualServiceNo, userRole, salesChannelId, donorId, ratePlanId,vasIdsSelected, ratePlanPkgId, orderCategory) => {
	return dispatch => {
		dispatch({
			type: 'VALIDATE_LINE',
			payload: _validateLine(msisdn, sim, regType, virtualServiceNo, userRole, salesChannelId, donorId, ratePlanId,vasIdsSelected, ratePlanPkgId, orderCategory)
		})
	}
}

export const fetchDeviceFundContracts = (fundDetailsParam) => {

	var operationName = 'FETCH_DEVICE_FUND_CONTRACTS'
	return dispatch => {
		dispatch({
			type: operationName + "_PENDING",
		})
		fetch(FETCH_DEVICE_FUND_CONTRACTS_URL, {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(fundDetailsParam),
		})
			.then(d => d.json())
			.then(d => {
				dispatch({
					type: operationName + "_FULFILLED",
					payload: {
						data: d
					}
				})
			})
			.catch(function (error) {
				dispatch({
					type: operationName + "_REJECTED",
					payload: {
						code: -100,
						message: error
					}
				})
			});
	}
	/*return dispatch => {
		dispatch({
			type: 'FETCH_DEVICE_FUND_CONTRACTS',
			payload: _fetchDeviceFundContracts(fundDetailsParam)
		})
	}*/
}
export const fetchFundDeviceInfo = (deviceId) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_FUND_DEVICE_INFO',
			payload: _fetchFundDeviceInfo(deviceId)
		})
	}
}

export const getDeviceFundContracts = (easMasterRegId, vsn) => {
	return dispatch => {
		dispatch({
			type: 'GET_DEVICE_FUND_CONTRACTS',
			payload: _getDeviceFundContracts(easMasterRegId, vsn)
		})
	}
}

export const getAddedFundDevices = (easMasterRegId) => {
	return dispatch => {
		dispatch({
			type: 'GET_ADDED_FUND_DEVICES',
			payload: _getAddedFundDevices(easMasterRegId)
		})
	}
}
export const setDeviceFunds = (deviceFunds) => {
	return dispatch => {
		dispatch({
			type: 'SET_DEVICE_FUNDS',
			payload: _setDeviceFunds(deviceFunds)
		})
	}
}
export const validateParentIdHierId = (parentId, hierId, masterRegId) => {
	return dispatch => {
		dispatch({
			type: 'VALIDATE_PARENTID_HIERID',
			payload: _getValidateParentIdHierIdInfo(parentId, hierId, masterRegId)
		})
	}
}


export const getPaymentDetails = (masterRegId, brn) => {
	return dispatch => {
		dispatch({
			type: 'GET_PAYMENT_DETAILS',
			payload: _getPaymentDetails(masterRegId, brn)
		})
	}
}


export const getAssignList = () => {
	return dispatch => {
		dispatch({
			type: 'FETCH_ASSIGN_TO_LIST',
			payload: _getAssignList()
		})
	}
}


export const resetParentIdHierIdStatus = () => {
	return dispatch => {
		dispatch({
			type: 'RESET_PARENTID_HIERID_STATUS',
			payload: _resetParentIdHierIdStatus
		})
	}
}



export const performVasRuleCheck = (ratePlanId,strVasIds,bundleType) => {
	return dispatch => {
		dispatch({
			type: 'VAS_RULE_CHECK',
			payload: _performVasRuleCheck(ratePlanId,strVasIds,bundleType)
		})
	}
}

export const contractCheck = (msisdn) => {
	return dispatch => {
		dispatch({
			type: 'CONTRACT_CHECK',
			payload: _contractCheck(msisdn)
		})
	}
}
export const setApprovalDeviceFunds = (deviceFunds) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_DEVICE_FUNDS',
			payload: _setApprovalDeviceFunds(deviceFunds)
		})
	}
}

export const getVSNDetails = (vsn,bundleType) => {
	return dispatch => {
		dispatch({
			type: 'GET_VSN_DETAILS',
			payload: _getVSNDetails(vsn,bundleType)
		})
	}
}


const _getPromotions = (loginName,brnNo,userRole) => {
		console.log(GET_PROMOTIONS_URL(loginName,brnNo,userRole));
		return axios.get(GET_PROMOTIONS_URL(loginName,brnNo,userRole));

}

export const getPromotions = (loginName,brnNo,userRole) => {
	return dispatch => {
		dispatch({
			type: 'GET_PROMOTIONS',
			payload: _getPromotions(loginName,brnNo,userRole)
		})
	}
}

const _getDeviceListERF = (deviceContract,ratePlanId,brn, msisdnNo, ratePlanPkgId ) => {
	console.log(GET_DEVICE_LIST_ERF_URL(deviceContract,ratePlanId,brn, msisdnNo, ratePlanPkgId));
	return axios.get(GET_DEVICE_LIST_ERF_URL(deviceContract,ratePlanId,brn, msisdnNo, ratePlanPkgId));
}

export const getDeviceListERF = (deviceContract,ratePlanId,brn, msisdnNo, ratePlanPkgId) => {
	return dispatch => {
		dispatch({
			type: 'GET_DEVICE_LIST_ERF',
			payload: _getDeviceListERF(deviceContract,ratePlanId,brn, msisdnNo, ratePlanPkgId)
		})
	}
}


const _getRegTypesERF = (deviceContract) => {
		return axios.get(GET_REG_TYPES_ERF_URL(deviceContract));
}

export const getRegTypesERF = (deviceContract) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_REG_TYPES',
			payload: _getRegTypesERF(deviceContract)
		})
	}
}
export const getRegTypesobs = (prodCategory) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_REG_TYPES_OBS',
			payload: _getRegTypesObs(prodCategory)
		})
	}
}
export const getRateplansobs = (regType, userId,msisdn) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_RATEPLANS_OBS',
			payload: _getRateplansobs(regType, userId, msisdn)
		})
	}
}
const _getRateplansERF = (deviceContract,userId,promotionId,regTypeValue,brn) => {

	console.log(GET_RATEPLANS_ERF_URL(deviceContract,userId,promotionId,regTypeValue,brn));
	return axios.get(GET_RATEPLANS_ERF_URL(deviceContract,userId,promotionId,regTypeValue,brn));
}

export const getRateplansERF = (deviceContract,userId,promotionId,regTypeValue,brn) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_RATEPLANS',
			payload: _getRateplansERF(deviceContract,userId,promotionId,regTypeValue,brn)
		})
	}
}


const _getDeviceInfoERF = (deviceId,deviceContract,upgradeSafeDevice,safeDevice) => {
	console.log(DEVICE_INFO_ERF_URL(deviceId,deviceContract,upgradeSafeDevice,safeDevice));
	return axios.get(DEVICE_INFO_ERF_URL(deviceId,deviceContract,upgradeSafeDevice,safeDevice));
}

export const getDeviceInfoERF = (deviceId,deviceContract,upgradeSafeDevice,safeDevice) => {

		return dispatch => {
			dispatch({
				type: 'FETCH_ZEROLUTION_DEVICE_INFO',
				payload: _getDeviceInfoERF(deviceId,deviceContract,upgradeSafeDevice,safeDevice)
			})
		}
	}


const _getVasListToDisplayERF = (promotionId,ratePlanId,regType,deviceContract,mobileNumber) => {
	// return fetch(FETCH_VAS_URL(rateplan), {
	// 		method: "get"
	// 	})
	// 	.then(d => d.json())
	// 	.then(d => {
	// 		return d;
	// 	})
	console.log(FETCH_VAS_ERF_URL(promotionId,ratePlanId,regType,deviceContract,mobileNumber));
	return axios.get(FETCH_VAS_ERF_URL(promotionId,ratePlanId,regType,deviceContract,mobileNumber));

}



export const getVasListToDisplayERF = (promotionId,ratePlanId,regType,deviceContract,mobileNumber) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_VAS_POPUP_DATA',
			payload: _getVasListToDisplayERF(promotionId,ratePlanId,regType,deviceContract,mobileNumber)
		})

	}
}

const _contractCheckERF = (mobileNumber,regType,deviceContract,brn) => {
	console.log(CONTRACT_CHECK_ERF_URL(mobileNumber,regType,deviceContract,brn));
	return axios.get(CONTRACT_CHECK_ERF_URL(mobileNumber,regType,deviceContract,brn));
}

export const contractCheckERF = (mobileNumber,regType,deviceContract,brn) => {
	return dispatch => {
		dispatch({
			type: 'CONTRACT_CHECK',
			payload: _contractCheckERF(mobileNumber,regType,deviceContract,brn)
		})
	}
}

const _performVasRuleCheckERF = (deviceContract,ratePlanId, strVasIds,mobileNumber,regType,brn,deviceId,tempUpgradeSafeDevice,tempSafeDevice) => {
	console.log(VAS_RULE_CHECK_ERF_URL(deviceContract,ratePlanId, strVasIds,mobileNumber,regType,brn,deviceId,tempUpgradeSafeDevice,tempSafeDevice));
	return axios.get(VAS_RULE_CHECK_ERF_URL(deviceContract,ratePlanId, strVasIds,mobileNumber,regType,brn,deviceId,tempUpgradeSafeDevice,tempSafeDevice));
}

export const performVasRuleCheckERF = (deviceContract,ratePlanId, strVasIds,mobileNumber,regType,brn,deviceId,tempUpgradeSafeDevice,tempSafeDevice) => {
	return dispatch => {
		dispatch({
			type: 'VAS_RULE_CHECK',
			payload: _performVasRuleCheckERF(deviceContract,ratePlanId, strVasIds,mobileNumber,regType,brn,deviceId,tempUpgradeSafeDevice,tempSafeDevice)
		})
	}
}

const _validateLineERF = (mobileNumber,regType,deviceContract,tempSimCardNo,salesChannelId,brn,tempSafeDevice,
									   tempUpgradeSafeDevice,ratePlanId,deviceId,vasList,isOutright,donorAccountNo,promotionId,outrightDeviceQuantiy,userRole,vasIdsSelected) => {
	console.log(VALIDATE_LINE_ERF_URL(mobileNumber,regType,deviceContract,tempSimCardNo,salesChannelId,brn,tempSafeDevice,
									      tempUpgradeSafeDevice,ratePlanId,deviceId,vasList,isOutright,donorAccountNo,promotionId,
									      outrightDeviceQuantiy,userRole,vasIdsSelected));
	return axios.get(VALIDATE_LINE_ERF_URL(mobileNumber,regType,deviceContract,tempSimCardNo,salesChannelId,brn,tempSafeDevice,
									      tempUpgradeSafeDevice,ratePlanId,deviceId,vasList,isOutright,donorAccountNo,promotionId,
									      outrightDeviceQuantiy,userRole,vasIdsSelected));
}


export const validateLineERF = (mobileNumber,regType,deviceContract,tempSimCardNo,salesChannelId,brn,tempSafeDevice,
									   tempUpgradeSafeDevice,ratePlanId,deviceId,vasList,isOutright,donorAccountNo,promotionId,outrightDeviceQuantiy,userRole,vasIdsSelected) => {
	return dispatch => {
		dispatch({
			type: 'VALIDATE_LINE',
			payload: _validateLineERF(mobileNumber,regType,deviceContract,tempSimCardNo,salesChannelId,brn,tempSafeDevice,
									   tempUpgradeSafeDevice,ratePlanId,deviceId,vasList,isOutright,donorAccountNo,promotionId,outrightDeviceQuantiy,userRole,vasIdsSelected)
		})
	}
}
export const setOldDeviceFunds = (deviceFundsOld) => {
	return dispatch => {
		dispatch({
			type: 'SET_OLD_DEVICE_FUNDS',
			payload: _setOldDeviceFunds(deviceFundsOld)
		})
	}
}
export const getBulkUsers = () => {
	return dispatch => {
		dispatch({
			type: 'GET_BULK_USERS',
			payload: _getBulkUsers()
		})
	}
}
const _getBulkUsers = () => {
	return axios.get(GET_BULK_USERS_URL);
}

const _searchPaymentStatus = (regId,productGroup) => {
	return axios.get(SEARCH_PAYMENT_URL(regId,productGroup));
}

export const searchPaymentStatus = (regId,productGroup) => {
	return dispatch => {
		dispatch({
			type: 'SEARCH_PAYMENT',
			payload: _searchPaymentStatus(regId,productGroup)
		})
	}
}

const _getProdGrpChangeStatus = () => {
	return axios.get(GET_PROD_GRP_CHANGE_URL);
}

export const getProdGrpChangeStatus = () => {
	return dispatch => {
		dispatch({
			type: 'GET_PROD_GRP_CHANGE',
			payload: _getProdGrpChangeStatus()
		})
	}
}

const _searchChangeStatus = (regId,productGroup) => {
	return axios.get(SEARCH_CHANGE_URL(regId,productGroup));
}

export const searchChangeStatus = (regId,productGroup) => {
	return dispatch => {
		dispatch({
			type: 'SEARCH_CHANGE',
			payload: _searchChangeStatus(regId,productGroup)
		})
	}
}
export const getBulkOrdersData = (bulkRegId,bulkStatus,createdBy,date1,date2,userId)=>{
	return dispatch => {
		dispatch({
			type: 'GET_BULK_ORDERS_DATA',
			payload:_getBulkUsersData(bulkRegId,bulkStatus,createdBy,date1,date2,userId)
		})
	}
}

const _getBulkUsersData = (bulkRegId,bulkStatus,createdBy,date1,date2,userId) =>{
	console.log(GET_BULK_ORDERS_DATA_URL(bulkRegId,bulkStatus,createdBy,date1,date2,userId));
return axios.get(GET_BULK_ORDERS_DATA_URL(bulkRegId,bulkStatus,createdBy,date1,date2,userId));
}
const _sendFileDealerSearch = (data) => {
	return axios.post(SEND_FILE_URL_DEALER_SEARCH, data);
}


const _checkingBccValidation = (bccRequestData) => {
	console.log("bccRequestData")
	return axios.post(GET_BCC_VALIDATION_URL, bccRequestData);
}

export const checkingBccValidation = (bccRequestData) => {
	return dispatch => {
		dispatch({
			type: 'GET_BCC_VALIDATION',
			payload: _checkingBccValidation(bccRequestData)
		})

	}
}

export const sendFileDealerSearch = (data) => {
	return  dispatch => {
		dispatch({
			type: 'SEND_FILE_URL_DEALER_SEARCH',
			payload: _sendFileDealerSearch(data)
		})
	}
} 
export const getAutomatedReportName = () => {
	return dispatch => {
		dispatch({
			type: 'GET_AUTOMATED_REPORT_NAME',
			payload: _getAutomatedReportName()
		})
	}
}

const _getReportsHistory = () => {
	console.log(FETCH_REPORTS_HISTORY_EXECUTION_URL);
	return axios.get(FETCH_REPORTS_HISTORY_EXECUTION_URL);
}

export const getReportsHistory = () => {
	return dispatch => {
		dispatch({
			type: 'GET_REPORTS_EXECUTION_HISTORY',
			payload: _getReportsHistory()
		})
	}
}
const _getCustomReportInput = (reportName) => {
	return axios.get(CUSTOM_REPORT_INPUT_URL(reportName));
}

export const getCustomReportInput = (reportName) => {
	return dispatch => {
		dispatch({
			type: 'GET_CUSTOM_REPORT_INPUTS',
			payload: _getCustomReportInput(reportName)
		})
	}
}

const _generateReportData = (userInputData) => {
	return axios.post(POST_REPORT_DATA, userInputData);
}

export const generateReportData =(userInputData)=>{
	return dispatch => {
			dispatch({
				type: 'GENERATE_REPORT_DATA',
				payload: _generateReportData(userInputData)
			})

		}
}
export const getRateplansMisc = (regType, vsn,deviceContract,userId,promotionId,regTypeValue,brn) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_RATEPLANS_OBS',
			payload: _getRateplansMisc(regType, vsn,deviceContract,userId,promotionId,regTypeValue,brn)
		})
	}
}
const _getRatePlanDeviceMapList = () => {
	console.log(GET_RATEPLAN_DEVICE_MAP_LIST_URL);
	return axios.get(GET_RATEPLAN_DEVICE_MAP_LIST_URL);
}

export const getRatePlanDeviceMapList = () => {
	return dispatch => {
		dispatch({
			type: 'GET_RATEPLAN_DEVICE_MAP_LIST',
			payload: _getRatePlanDeviceMapList()
		})
	}
}

export const validateLineExistingGroup = (body) => {
	return dispatch => {
		dispatch({
			type: 'VALIDATE_LINE_EXISTING_GROUP',
			payload: _validateLineExistingGroup(body)
		})
	}
}

const _validateLineExistingGroup = (body) => {
	var date = new Date();
		var timestamp = date.getFullYear() + 
		("0" + (date.getMonth() + 1)).slice(-2) +
		 ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() + 1 ).slice(-2) +
		  ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2) ;
		var headers = {
				"Content-Type":"application/json",
				"sourceChannel": "EBD",
				"channelRefId":"d569c307-a39c-4866-8536-e6bc049488c0",
				"timestamp":timestamp
			};
		console.log('headers',headers);
		console.log('body',body);
		console.log('VALIDATE_LINE_EXISTING_GROUP_URL',VALIDATE_LINE_EXISTING_GROUP_URL);

	return axios.post(VALIDATE_LINE_EXISTING_GROUP_URL,body,{headers: headers});
}

const _getSIMTypeReplcmtReason = () => {
	return axios.get(GET_SIM_TYPE_REPLCMT_REASON);
}

export const getSIMTypeReplcmtReason = () => {
	return dispatch => {
		dispatch({
			type: 'GET_SIM_TYPE_REPLCMT_REASON',
			payload: _getSIMTypeReplcmtReason()
		})
	}
}


export const getTemplateFileForBulkSim = () => {
	return dispatch => {
		dispatch({
			type: 'GET_TEMPLATE_BULKSIM',
			payload: _getTemplateFileForBulkSim()
		})

	}
}


const _getTemplateFileForBulkSim = () => {
	console.log('Hi i am in TemplateFileForBulkSim ')
	return axios.get(GET_TEMP_FILE_URL,
		{ responseType: 'blob' });
}
const _getOBSDevices = (rateplan, isZerolutionRTF, ratePlanPkgId) => {
	console.log(GET_OBS_DEVICES_URL(rateplan, isZerolutionRTF));
	return axios.get(GET_OBS_DEVICES_URL(rateplan, isZerolutionRTF, ratePlanPkgId));
}

export const getOBSDevices =(rateplan, isZerolutionRTF, ratePlanPkgId)=>{
	return dispatch => {
			dispatch({
				type: 'GET_OBS_DEVICES',
				payload: _getOBSDevices(rateplan, isZerolutionRTF, ratePlanPkgId)
			})

		}
}

export const getOBSDeviceInfo = (deviceId,rpMasterId, safeDevice, isZerolutionRTF) => {
if(rpMasterId == null) rpMasterId='0000'
	return dispatch => {
		dispatch({
			type: 'FETCH_OBS_DEVICE_INFO',
			payload: _getOBSDeviceInfo(deviceId,rpMasterId, safeDevice, isZerolutionRTF)
		})
	}
}

const _getOBSDeviceInfo = (deviceId,rpMasterId, safeDevice, isZerolutionRTF) => {
	return axios.get(OBS_DEVICE_INFO_URL(deviceId,rpMasterId, safeDevice, isZerolutionRTF));
}


export const fetchZerolutionDeviceReport = (fromDate, toDate, userRole, dealerCode, isHomcUser) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_ZEROLUTION_DEVICE_REPORT',
			payload: _fetchZerolutionDeviceReport(fromDate, toDate, userRole, dealerCode, isHomcUser)
		})
	}
}

const _fetchZerolutionDeviceReport = (fromDate, toDate, userRole, dealerCode, isHomcUser) => {
	return axios.get(FETCH_ZEROLUTION_DEVICE_REPORT_URL(fromDate, toDate, userRole, dealerCode, isHomcUser));
}

export const downloadZerolutionDeviceReport = (fromDate, toDate, userRole, storeCode, isHomcUser) => {
	return dispatch => {
		dispatch({
			type: 'DOWNLOAD_ZEROLUTION_DEVICE_REPORT',
			payload: _downloadZerolutionDeviceReport(fromDate, toDate, userRole, storeCode, isHomcUser)
		})
	}
}

const _downloadZerolutionDeviceReport = (fromDate, toDate, userRole, storeCode, isHomcUser) => {
	return axios.get(DOWNLOAD_ZEROLUTION_DEVICE_REPORT_URL(fromDate, toDate, userRole, storeCode, isHomcUser), { responseType: 'blob' });
}



const _getExistingShareableLineCount = (vsn) => {
	return axios.get(GET_EXISTING_SHAREABLE_LINES_COUNT(vsn));
}

export const getExistingShareableLineCount = (vsn) => {
	return dispatch => {
		dispatch({
			type: 'EXISTING_SHAREABLE_LINES_COUNT',
			payload: _getExistingShareableLineCount(vsn)
		})
	}
}


const _getExistingShareableLineCountExcludeCRPMsisdns = (requestData) => {
	console.log("requestData")
	return axios.post(GET_EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP, requestData);
}

export const getExistingShareableLineCountExcludeCRPMsisdns = (requestData) => {
	return dispatch => {
		dispatch({
			type: 'EXISTING_SHAREABLE_LINES_COUNT_EXCLUDE_CRP',
			payload: _getExistingShareableLineCountExcludeCRPMsisdns(requestData)
		})

	}
}