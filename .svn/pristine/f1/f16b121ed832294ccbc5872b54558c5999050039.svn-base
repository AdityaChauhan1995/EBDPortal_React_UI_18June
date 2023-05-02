import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './user';
import configurationReducer from './configuration';
import orderReducer from './order';

export default combineReducers({
	router: routerReducer,
	user: userReducer,
	configuration: configurationReducer,
	order: orderReducer
});

/*
user:{
	meta: {},
	data: {
		userId: '',
		userRole: '',
		salesChanneld: '',
		loginName:''
	}		
}
configuration:{
	meta:{

	}
	data:{
		bundleTypes:[
			{key:'',value:'',text:''}
		],
		orderCategories: [
			{key:'',value:'',text:''}
		],
		vsns:{
			{key:'',value:'',text:''}
		},
		vas: [
			{
				vasOptionals:[{vasOptional:[{vasId:'',componentId:'',packageId:'',vasName:'',defaultInd:'',colInd:'',contractType1:'',checked:''}]}]
			}
		],
		postCodes: [
			{key:'',value:'',text:'', city: '', state: '', country: ''}
		],
		simTypes:[
			{key:'',value:'',text:''}
		],
		registrationTypes:[
			{key:'',value:'',text:''}
		],
		ratePlans:[
			{key:'',value:'',text:''}
		],
		deviceContracts:[
			{key:'',ratePlanName:'', rateplanId:'',contratName:'', defaultFundAmount:'', minFundAmount:'', maxFundAmount:'',type:'VSN/MSISDN' }
		],
		donors:[
			{key:'',value:'',text:''}
		],
		zerolutionDevices:
		[
			{key:'',value:'',text:''}
		],
		flexiFundDevices:
		[
			{key:'',value:'',text:''}
		],
		accountManagers: [
			{key:'',value:'',text:''}
		],
		supportingCenter: [
			{key:'',value:'',text:''}
		],	
		brnInfo:{
			portalCustInfo: {
				custBrnNo1:'',
				companyName:'',
				companyCodeName:'',
				staffStrength:'',
				custPuc:'',
				custFinalRemark:'',
			},
			authorizeSignatory: {
				authName:'',
				authIcNo:'',
				authFixedNo:'',
				authFaxNo:'',
				authMobileNo:'',
				authEmail:'',
			},
			documentUploadItems: [
				regId:''
				documentDesc:''
				fileName:''
				documentType:''
				sourceInd:''
				compulsoryInd:'',
				uploadInd:'',
				documentCode:'',
				sNo:''
			]
		},
		regDoc:{
        easMasterRegId:'',
        fileName:''
		fileContent:
		//reponse for file download
	},
	uploadedDocDetails:{
    tempfileName:'',
     tempDocumentDesc:'',
     documentRegId:''
//response for file upload
}
	}

}

order:{
	meta:{

	}
	data:{
		userInfo:{
			userId: '',
			userRole: '',
			salesChanneld: '',
			loginName:''
		}
		bunderType:'',
		orderCategory: '',
		brn: '',
		msisdnvsn: ''
		vsn:'',
		masterRegId:'',
		isCompanyDeposit:false,
		isAdvancePayment:false,
		brnInfo:{
			portalCustInfo: {
				custBrnNo1:'',
				companyName:'',
				companyCodeName:'',
				staffStrength:'',
				custPuc:'',
				custFinalRemark:'',
			},
			authorizeSignatory: {
				authName:'',
				authIcNo:'',
				authFixedNo:'',
				authFaxNo:'',
				authMobileNo:'',
				authEmail:'',
			},
			documentUploadItems: [
				regId:'',
				documentDesc:'',
				fileName:'',
				documentType:'',
				sourceInd:'',
				uploadInd:'',
				compulsoryInd:'',
				documentCode:'',
				sNo:'',
			]
		},
		pccCheckIndicator:''
		addressInfo: {
			billingAddress: {
				address1:'',
				address2:'', 
				postCode:'',
				city:'',
				state:'',
				country:''
			},
			deliveryAddress: {
				contactName:'',
				contactPhoneNo:'',
				contactIC:'',
				contactFixNo:'',
				address1:'',
				address2:'', 
				postCode:'',
				city:'',
				state:'',
				country:''
			},
			picDetails: {
				picName:'',
				picEMail:'',
				picContactNumber:'',
				notificationEmail:'',
			}
		},
		msisdnList: [
			{
				regId: '',
				regType: '',
				ratePlan: '',
				deviceContract: '',
				deliveryNumber: '',
				vas: [
					vasOptional:[
						{id:''}
					]
				],
				mobileInfo:{
					mobileNo: '',
					sim: '',
					simType: '',
					donorAccountNo: '',
					donorType:''
				},				
				deviceInfo: {
					deviceId:'',
					phoneModel:'',
					status:'',
					deviceDeliveryNo:'',
					deviceRrp:'',
					monthlyInstallment:'',
					noOfInstallments:'',
					zerolutionUpgrade:'',
					zerolutionPremium:'',
					zerolutionComponent:''
				},
				contractInfo:{
					contractName:'',
					contractId:'',
					startDate:'',
					endDate:'',
					status:'',
					deviceFund:''
				},
				status: '',
			},
		],
		fundDeviceList: [
			{
				deviceOrderNo:'',
				vsn:'',
				deviceModel:'',
				deviceRRP:'',
				quantity:''
			}
		],
		fundSummary: {
			totalAmount:'',
			payableAmount:'',
			tax:'',
			totalRRP:''			
		},
		delaerRemarks:'',
		accountManager:'',
		dealerCode:'',
		dealerName:'',
		salesmanCode:'',
		salesmanName:'',
		supportingCenter:'',
		cmssID:'',
		cmssDocument:{filename:'',description:'',file:''},//TODO
	}
}
*/