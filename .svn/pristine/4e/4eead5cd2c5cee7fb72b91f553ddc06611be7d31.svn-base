import React, { Component } from 'react';
import { Grid, Input, Button, Segment, Container, Form, Dropdown, Table, Message} from "semantic-ui-react";
import  Navigation  from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock5, StaticBlock4 } from '../../components/common/dumb-component';
import { connect } from 'react-redux';
import { getFlexiFundDevices, fetchFundDeviceInfo,getDeviceFunds, getAddedFundDevices,
	getRatePlanDeviceMapList,getRateplans,validateLineExistingGroup} from '../../redux/actions/configuration';
import { setDeviceFundInfo, setDeviceDetails,setDeviceFundInfoPrev} from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';

class DeviceFund extends Component {
	constructor(props) {
	  super(props);
	  const {url} = this.props.match;
	  this.state = {
		nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Resubmission",
		dfCurrentPage:1,
		dfTodosPerPage:5,
		dfIndexOfFirstTodo:null,
		dfIndexOfLastTodo:null,
		dfCurrentTodos:null,
		dfLastPage:null,
		dfOldCurrentPage:1,
		dfOldTodosPerPage:5,
		dfOldIndexOfFirstTodo:null,
		dfOldIndexOfLastTodo:null,
		dfOldCurrentTodos:null,
		dfOldLastPage:null,
		flexiFundDevice:'',
		quantity:'',
		addedDevices:props.addedDevices,
		deviceIndexOfLastTodo:null,
		deviceCurrentPage:1,
		deviceTodosPerPage:5,
		deviceIndexOfFirstTodo:null,
		deviceLastPage:null,
		dfFirstIndexCurrentPage:1,
		dfOldFirstIndexCurrentPage:1,
		deviceFirstIndexCurrentPage:1,
		totalPrice:props.totalPrice,
		totalFundAmount:'',
		totalQuantity:props.totalQuantity,
		deviceFundUsed:props.deviceFundUsed,
		deviceFundLeft:props.deviceFundLeft,
		amountPayable:props.amountPayable,
		tax:props.tax,
		deviceId:props.deviceId,
		validateStatus: 'SUCCESS',
		message:'',
		showDimmer:false,
		previousFundAmountUsed:props.previousFundAmountUsed,
		previousFundAmount:props.previousFundAmount,
		previousFundAmountLeft:props.previousFundAmountLeft,
		initialDeviceChange:props.initialDeviceChange,
		ratePlanDeviceMapList:props.ratePlanDeviceMapList,
		validateDevice:props.validateDevice,
		totalAdjAmount: 0,
		totalAdjAmount: props.totalAdjAmount==0?0:props.totalAdjAmount
	  };
	}
	componentDidMount(){
		this.props.getFlexiFundDevices();
		let tempTotalFundAmount=0;
		let adjAmountCurrent =0;
		let {addedDevices} = this.state;
		this.props.deviceFunds.map((currentDeviceFund)=>{
				if(currentDeviceFund.contractName!==null && currentDeviceFund.contractName.trim()!==''){
					tempTotalFundAmount+=parseFloat(currentDeviceFund.fundAmount);
				}
				if(addedDevices != undefined && addedDevices!= null && addedDevices.length >0){
					for(var i=0;i<addedDevices.length;i++){
						if(addedDevices[i].value.contractMsisdn === currentDeviceFund.msisdn ){
							if(addedDevices[i].value.adjAmount != null){
								adjAmountCurrent+=parseFloat(addedDevices[i].value.adjAmount);
							}
						}
					}
				}
		})
		this.setState({totalFundAmount:tempTotalFundAmount+adjAmountCurrent,totalFundAmountInitial:tempTotalFundAmount});
		this.props.getRatePlanDeviceMapList();
		if(this.props.SET_DEVICE_FUND_STATUS !== 'SUCCESS' && this.state.initialDeviceChange === false){
			this.setState({ showDimmer: true });
			this.props.getAddedFundDevices(this.props.registrationDetails.masterRegId);
			this.setState({ fundSummary: { totalAmount: tempTotalFundAmount}});
			// let { totalFundAmount }=this.state;
			// this.props.deviceFunds.map((currentDeviceFund)=>{
			// 			if(currentDeviceFund.contractName!==null && currentDeviceFund.contractName.trim()!==''){
			// 				totalFundAmount+=parseFloat(currentDeviceFund.fundAmount);
			// 			}
			// 	});
			// this.setState({deviceFunds:this.props.deviceFunds, totalFundAmount: totalFundAmount});

		}
		if(this.state.deviceFundLeft===undefined ||this.state.deviceFundLeft===null || this.state.deviceFundLeft==='' || this.state.deviceFundLeft===0){
			this.setState({deviceFundLeft:tempTotalFundAmount});
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.props.SET_DEVICE_FUND_STATUS !=='SUCCESS' &&
			nextProps.SET_DEVICE_FUND_STATUS==='SUCCESS'){
				let tempNextURL=this.state.nextUrl;
				tempNextURL+="&action=rejected&easMasterRegId="+ this.props.registrationDetails.masterRegId;
				this.props.history.push(tempNextURL);
		}
		if(this.props.GET_RATEPLAN_DEVICE_MAP_LIST_STATUS !== 'SUCCESS' &&
		nextProps.GET_RATEPLAN_DEVICE_MAP_LIST_STATUS === 'SUCCESS'){
			this.setState({ratePlanDeviceMapList:nextProps.ratePlanDeviceMapList});
			this.props.getRateplans('test', 'test');
		}
		if(this.props.SET_DEVICE_FUND_PREV_STATUS !== 'SUCCESS' &&
		nextProps.SET_DEVICE_FUND_PREV_STATUS === 'SUCCESS' ){
			this.props.history.goBack();
		}
		if(this.props.GET_ADDED_FUND_DEVICES_STATUS!=='SUCCESS' &&
		nextProps.GET_ADDED_FUND_DEVICES_STATUS==='SUCCESS'){
			let { totalFundAmount,previousFundAmount, previousFundAmountLeft, previousFundAmountUsed }=this.state;

			let tempTotalPrice=null;
			let tempTotalQuantity=null;
			let adjAmountExisting =0;
			let adjAmountCurrent = 0;
			let {deviceFunds} = this.props;
			nextProps.addedFundDevices.map((currentDevice)=>{
					tempTotalPrice+=parseFloat(currentDevice.deviceRRP)
					tempTotalQuantity+=parseInt(currentDevice.quantity)
					if(deviceFunds != undefined && deviceFunds != null && deviceFunds.length>0){
						var currentDeviceMapped = false;
						for(var i=0;i<deviceFunds.length;i++){
							if(deviceFunds[i].msisdn === currentDevice.contractMsisdn){
								if(currentDevice.adjAmount != null){
									adjAmountCurrent+=parseFloat(currentDevice.adjAmount)
								}
								currentDeviceMapped = true;
								break;
							}
						}
						if(!currentDeviceMapped){
							if(currentDevice.adjAmount != null){
								adjAmountCurrent+=parseFloat(currentDevice.adjAmount)
							}
						}
					}
			})
			let fundAmountUsed=0;
			let fundAmountLeft= 0 ;
			let amountPayable=0;
			let tempPreviousFundAmountLeft=0;
			let totalAdjAmount= adjAmountCurrent;
			if(this.props.orderCategory==='Existing Group' ){
				if(previousFundAmount!==undefined && parseFloat(previousFundAmount) >=0){
					previousFundAmount = previousFundAmount ;
					totalFundAmount = totalFundAmount ;
					tempPreviousFundAmountLeft =previousFundAmount-tempTotalPrice;
					amountPayable=0;
					if(parseFloat(tempPreviousFundAmountLeft)<=0){
						if(parseFloat(adjAmountExisting)>0){

						}else{
							previousFundAmountUsed=previousFundAmount;
							tempPreviousFundAmountLeft=0;
							amountPayable=tempTotalPrice-previousFundAmount;
							fundAmountLeft=totalFundAmount-amountPayable;
							if(parseFloat(fundAmountLeft)<=0){
								if(parseFloat(adjAmountCurrent)>0){
									fundAmountLeft += adjAmountCurrent;
									if(parseFloat(fundAmountLeft)<=0){
										fundAmountUsed=totalFundAmount + adjAmountCurrent;
										fundAmountLeft=0;
										amountPayable=tempTotalPrice-(fundAmountUsed+previousFundAmountUsed);
									}else{
										fundAmountUsed=tempTotalPrice-previousFundAmountUsed;
										amountPayable = 0;
									}
								}else{
									fundAmountUsed=totalFundAmount;
									fundAmountLeft=0;
									amountPayable=tempTotalPrice-(totalFundAmount+previousFundAmountUsed);
								}
							}
							else{
								fundAmountUsed=tempTotalPrice-previousFundAmountUsed;
								amountPayable = 0;
							}
						}
					}
					else{
						previousFundAmountUsed=tempTotalPrice;
						fundAmountLeft=totalFundAmount;
					}
				}
			}else{
				totalFundAmount = totalFundAmount;
				fundAmountLeft = totalFundAmount-tempTotalPrice
				if(parseFloat(fundAmountLeft)<=0){
					fundAmountLeft += adjAmountCurrent;
					if(parseFloat(fundAmountLeft)<=0){
							fundAmountUsed=totalFundAmount + adjAmountCurrent;
							fundAmountLeft=0;
							amountPayable=tempTotalPrice-fundAmountUsed;
					}else{
							fundAmountUsed=totalFundAmount;
							fundAmountLeft=0;
							amountPayable=tempTotalPrice-totalFundAmount;
					}
				}
				else{
					fundAmountUsed=tempTotalPrice;
				}
			}
		let count =-1;
		console.log('tempTotalPrice',tempTotalPrice,'tempTotalQuantity',tempTotalQuantity,'fundAmountUsed',fundAmountUsed,
					'amountPayable',amountPayable,'fundAmountLeft',fundAmountLeft);
		this.setState({ totalPrice:tempTotalPrice,totalQuantity:tempTotalQuantity,
			 deviceFundUsed: fundAmountUsed,deviceFundLeft: fundAmountLeft ,amountPayable: amountPayable ,tax:0,
			 previousFundAmount:previousFundAmount,totalFundAmount:totalFundAmount,
			 previousFundAmountLeft:tempPreviousFundAmountLeft,
			 previousFundAmountUsed:previousFundAmountUsed, showDimmer:false,
			 totalAdjAmount: totalAdjAmount,
			 fundSummary: {
			 				noOfDevice: tempTotalQuantity,
			 				payableAmount: amountPayable,
			 				tax: 0,
							totalRRP: tempTotalPrice},
			addedDevices: nextProps.addedFundDevices.map(currentLine => {
								count++;
								return {
									key:count,
									value:{
										deviceId:currentLine.deviceId,
										phoneModel: currentLine.deviceModel,
										status: currentLine.deliveryStatus,
										deviceDeliveryNo: null,
										deviceRrp:currentLine.deviceRRP,
										monthlyInstallment: currentLine.monthlyInstallment,
										noOfInstallments: currentLine.noOfInstallment,
										zerolutionUpgrade: null,
										zerolutionPremium: null,
										zerolutionComponent: null,
										imei: null,
										isUpgradeBasicProtection: null,
										isZerolutionPremium: null,
										isPremiumDeviceProtection: null,
										intallmentDate: null,
										upgradeFee: null,
										safeDeviceMnthlyChrg: null,
										quantity:currentLine.quantity,
										contractMsisdn: currentLine.contractMsisdn,
										eligibleFlexiFundContract:currentLine.eligibleFlexiFundContract,
										adjAmount:currentLine.adjAmount,
										flexiFundRuleCheck:currentLine.flexiFundRuleCheck,
										deviceArticleId:currentLine.deviceArticleId
									}
										}
											})
			});


		 }
		 if(this.props.VALIDATE_LINE_EXISTING_GROUP_STATUS !== 'SUCCESS' &&
		 						nextProps.VALIDATE_LINE_EXISTING_GROUP_STATUS === 'SUCCESS'){
				this.setState({showDimmer:false});
				var validatedDeviceList = nextProps.validatedDeviceList;
				var validateDevice = true;
				var tempAddedDevices =  JSON.parse(JSON.stringify(this.state.addedDevices));
				let {ratePlanDeviceMapList, totalAdjAmount} = this.state;
				let {ratePlans} = this.props;
				console.log('validatedDeviceList',validatedDeviceList);
				if(validatedDeviceList !== undefined && validatedDeviceList !== null && validatedDeviceList.length >0){

		tempAddedDevices.map((currentRow)=>{
			for(var i=0;i<validatedDeviceList.length;i++){
				if(currentRow.value.deviceArticleId === validatedDeviceList[i].articleId){
					if(validatedDeviceList[i].status === 'Accepted'){
						currentRow.value.contractMsisdn = validatedDeviceList[i].msisdn;
						currentRow.value.eligibleFlexiFundContract = validatedDeviceList[i].rateplan;
						var ratePlanId = '';
						for(var j=0;j<ratePlans.length;j++){
							if(ratePlans[j].value === validatedDeviceList[i].rateplan){
								ratePlanId = ratePlans[j].key;
								console.log(validatedDeviceList[i].rateplan,ratePlanId);
								break;
							}
						}
						currentRow.value.adjAmount = validatedDeviceList[i].ffRuleValue;
						// if(ratePlanDeviceMapList !== undefined && ratePlanDeviceMapList !== null && ratePlanDeviceMapList.length>0){
						// 	for(var k=0;k<ratePlanDeviceMapList.length;k++){
						// 		var breakloop = false;

						// 		if(ratePlanDeviceMapList[k].ebdDeviceId === currentRow.value.deviceId
						// 			|| parseInt(ratePlanDeviceMapList[k].ebdDeviceId) === currentRow.value.deviceId){
						// 			var tempRatePlan  = ratePlanDeviceMapList[k].ratePlanId;
						// 			var tempAdjAmount = ratePlanDeviceMapList[k].adjAmount;
						// 			for(var l=0;l<tempRatePlan.length;l++){
						// 				if(tempRatePlan[l] === ratePlanId){
						// 					currentRow.value.adjAmount = tempAdjAmount[l];
						// 					breakloop =true;
						// 					break;
						// 				}
						// 			}
						// 		}
						// 		if(breakloop){
						// 			break;
						// 		}
						// 	}
						// }
					}
					else if(validatedDeviceList[i].status === 'Rejected'){
						currentRow.value.eligibleFlexiFundContract = "Not Eligible";
						validateDevice =false;
					}
					validatedDeviceList[i].articleId = '';
					break;
				}
			}
		});


		if(!validateDevice){
			this.setState({validateStatus:'FAILURE',message: 'One or more Device(s) is not able to be purchased with FlexiFund.'
							,validateDevice:false, addedDevices:tempAddedDevices,showDimmer:false});

			let {totalPrice,totalQuantity,deviceFundUsed,deviceFundLeft,amountPayable,
				previousFundAmount,previousFundAmountUsed,previousFundAmountLeft} = this.state;
	//		this.props.setDeviceDetails(tempAddedDevices, totalPrice, totalQuantity, fundAmountUsed, fundAmountLeft, amountPayable, 0, previousFundAmountInitial, previousFundAmountUsed, previousFundAmountLeft, totalAdjAmount);

		}else{
			let totalPrice=0;
			let totalQuantity=0;
			let fundAmountUsed=0;
			let previousFundAmountLeft=0;
			let amountPayable=0;
			let fundAmountLeft=0;
			let adjAmountExisting =0;
			let adjAmountCurrent = 0;
			let {deviceFunds,previousFundAmountUsed,previousFundAmountInitial,orderCategory} = this.props;
			let {totalFundAmountInitial} = this.state;
			tempAddedDevices.map((addedDevice)=>{
					totalPrice+=parseFloat(parseFloat(addedDevice.value.deviceRrp)*addedDevice.value.quantity);
					totalQuantity+=parseFloat(addedDevice.value.quantity);
					var currentDeviceMapped = false;
					if(deviceFunds != undefined && deviceFunds != null && deviceFunds.length >0){
						for(var i=0;i<deviceFunds.length;i++){
							if(addedDevice.value.contractMsisdn === deviceFunds[i].msisdn){
								if(addedDevice.value.adjAmount != null){
									adjAmountCurrent+=parseFloat(addedDevice.value.adjAmount);
								}
								currentDeviceMapped = true;
								break;
							}
						}
					}
					if(!currentDeviceMapped){
						if(addedDevice.value.adjAmount != null){
							adjAmountCurrent+=parseFloat(addedDevice.value.adjAmount);
							console.log('adjAmountCurrent',adjAmountCurrent);
						}
					}
			});

	/*		if(orderCategory==='Existing Group' ){
				if(previousFundAmountInitial!==undefined && parseFloat(previousFundAmountInitial) >=0){
					totalAdjAmount = adjAmountCurrent;
					previousFundAmountInitial = previousFundAmountInitial+ adjAmountExisting;
					totalFundAmountInitial = totalFundAmountInitial+ adjAmountCurrent;
					previousFundAmountLeft =previousFundAmountInitial-totalPrice;
					amountPayable=0;
					if(parseFloat(previousFundAmountLeft)<=0){
						previousFundAmountUsed=previousFundAmountInitial;
						previousFundAmountLeft=0;
						amountPayable=totalPrice-previousFundAmountInitial;
						fundAmountLeft=totalFundAmountInitial-amountPayable;
						if(parseFloat(fundAmountLeft)<=0){
							fundAmountUsed=totalFundAmountInitial;
							fundAmountLeft=0;
							amountPayable=totalPrice-(totalFundAmountInitial+previousFundAmountInitial);
						}
						else{
							fundAmountUsed=totalPrice-previousFundAmountInitial;
							amountPayable=0;
						}
					}
					else{
						previousFundAmountUsed=totalPrice;
						fundAmountLeft=totalFundAmountInitial;
					}
				}
			}else{
				totalFundAmountInitial = totalFundAmountInitial+ adjAmountCurrent;
				fundAmountLeft=totalFundAmountInitial-totalPrice;
				if(parseFloat(fundAmountLeft)<=0){
					fundAmountUsed=totalFundAmountInitial;
					fundAmountLeft=0;
					amountPayable=totalPrice-totalFundAmountInitial;
				}
				else{
					fundAmountUsed=totalPrice;
				}
			}*/
			if(orderCategory==='Existing Group' ){
				if(previousFundAmountInitial!==undefined && parseFloat(previousFundAmountInitial) >=0){
					totalAdjAmount = adjAmountCurrent;
					previousFundAmountInitial = previousFundAmountInitial ;
					totalFundAmountInitial = totalFundAmountInitial ;
					previousFundAmountLeft =previousFundAmountInitial-totalPrice;
					amountPayable=0;
					if(parseFloat(previousFundAmountLeft)<=0){
						if(parseFloat(adjAmountExisting)>0){
								previousFundAmountLeft += parseFloat(adjAmountExisting);
								if(parseFloat(previousFundAmountLeft)<=0){
									previousFundAmountUsed = previousFundAmountInitial + adjAmountExisting;
									previousFundAmountLeft=0;
									amountPayable=totalPrice-previousFundAmountUsed;
									fundAmountLeft=totalFundAmountInitial-amountPayable;
									if(parseFloat(fundAmountLeft)<=0){
										if(parseFloat(adjAmountCurrent)>0){
											fundAmountLeft += adjAmountCurrent;
											if(fundAmountLeft<=0){
													fundAmountUsed=totalFundAmountInitial + adjAmountCurrent;
													fundAmountLeft=0;
													amountPayable=totalPrice-(fundAmountUsed+previousFundAmountUsed);
											}else{
													fundAmountUsed=totalPrice-previousFundAmountUsed;
													amountPayable=0;
											}
										}else{
											fundAmountUsed=totalFundAmountInitial;
											fundAmountLeft=0;
											amountPayable=totalPrice-(totalFundAmountInitial+previousFundAmountUsed);
										}
									}
									else{
										fundAmountUsed=totalPrice-previousFundAmountUsed;
										amountPayable=0;
									}
								}else{
										previousFundAmountUsed = totalPrice;
										fundAmountLeft = totalFundAmountInitial;
								}
						}else{
							previousFundAmountUsed=previousFundAmountInitial;
							previousFundAmountLeft=0;
							amountPayable=totalPrice-previousFundAmountUsed;
							fundAmountLeft=totalFundAmountInitial-amountPayable;
							if(parseFloat(fundAmountLeft)<=0){
								if(parseFloat(adjAmountCurrent)>0){
									fundAmountLeft += adjAmountCurrent;
									if(fundAmountLeft<=0){
											fundAmountUsed=totalFundAmountInitial + adjAmountCurrent;
											fundAmountLeft=0;
											amountPayable=totalPrice-(fundAmountUsed+previousFundAmountUsed);
									}else{
											fundAmountUsed=totalPrice-previousFundAmountUsed;
											amountPayable=0;
									}
								}else{
									fundAmountUsed=totalFundAmountInitial;
									fundAmountLeft=0;
									amountPayable=totalPrice-(totalFundAmountInitial+previousFundAmountUsed);
								}
							}
							else{
								fundAmountUsed=totalPrice-previousFundAmountUsed;
								amountPayable=0;
							}
						}
					}
					else{
						previousFundAmountUsed=totalPrice;
						fundAmountLeft=totalFundAmountInitial;
					}
				}
			}else{
				totalFundAmountInitial = totalFundAmountInitial+ adjAmountCurrent;
				fundAmountLeft=totalFundAmountInitial-totalPrice;
				if(parseFloat(fundAmountLeft)<=0){
					fundAmountUsed=totalFundAmountInitial;
					fundAmountLeft=0;
					amountPayable=totalPrice-totalFundAmountInitial;
				}
				else{
					fundAmountUsed=totalPrice;
				}
			}
			if(parseFloat(fundAmountLeft)<0){
				fundAmountLeft = 0;
			}
				this.setState({
					addedDevices:tempAddedDevices,
					totalPrice:totalPrice,
					totalQuantity:totalQuantity,
					deviceFundUsed:fundAmountUsed,
					deviceFundLeft:fundAmountLeft,
					amountPayable:amountPayable,
					tax:0,
					previousFundAmount:previousFundAmountInitial,
					previousFundAmountLeft:previousFundAmountLeft,
					previousFundAmountUsed:previousFundAmountUsed,
					validateDevice:true,
					showDimmer:false,
					totalFundAmount:totalFundAmountInitial,
					totalAdjAmount:totalAdjAmount
				});
				this.props.setDeviceDetails(tempAddedDevices, totalPrice, totalQuantity, fundAmountUsed, fundAmountLeft, amountPayable, 0, previousFundAmountInitial, previousFundAmountUsed, previousFundAmountLeft, totalAdjAmount);
		}
	}else{
		this.setState({validateStatus:'FAILURE',message: 'One or more Device(s) is not able to be purchased with FlexiFund.',validateDevice:false,showDimmer:false});
		}
	}
	if(this.props.VALIDATE_LINE_EXISTING_GROUP_STATUS !== 'SUCCESS' &&
		nextProps.VALIDATE_LINE_EXISTING_GROUP_STATUS === 'FAILED'){
		this.setState({validateStatus:'FAILURE',message: 'One or more Device(s) is not able to be purchased with FlexiFund.',validateDevice:false,showDimmer:false});
		}
	}

	next=()=>{
		let { msisdnList }=this.props;
		let { addedDevices, totalFundAmount, amountPayable, tax , totalPrice,
			totalQuantity, deviceFundUsed, deviceFundLeft }=this.state;
		let fundDeviceList=[];
		let fundSummary='';
		if(addedDevices===undefined){
			addedDevices=[];
		}
		addedDevices.map((currentRow)=>{
			fundDeviceList=[...fundDeviceList,
							{
								deviceOrderNo:currentRow.value.deviceDeliveryNo,
								vsn:currentRow.groupNo,
								deviceModel:currentRow.value.phoneModel,
								deviceRRP:currentRow.value.deviceRrp,
								quantity:currentRow.value.quantity,
								deviceId:currentRow.value.deviceId,
								monthlyInstallment:currentRow.value.monthlyInstallment,
								noOfInstallment:currentRow.value.noOfInstallments,
								contractMsisdn: currentRow.value.contractMsisdn,
								eligibleFlexiFundContract:currentRow.value.eligibleFlexiFundContract,
								adjAmount:currentRow.value.adjAmount
							}
						]
		});

		fundSummary={noOfDevice:totalQuantity,totalAmount:totalFundAmount,payableAmount:amountPayable,tax:tax,totalRRP:totalPrice};
		msisdnList= msisdnList.map(currentRow => {
			let tempFundAmount=0;
				return {...currentRow,contractInfo:this.props.deviceFunds.map((currentDeviceFund)=>{
						if(currentDeviceFund.msisdn===currentRow.mobileInfo.mobileNo){
								tempFundAmount=currentDeviceFund.fundAmount
								return {contractName:currentDeviceFund.contractName, contractId:currentDeviceFund.contractId,deviceFund:currentDeviceFund.fundAmount,status:'Pending Approval'};
						}
				})
				,fundAmount:tempFundAmount
			}
		})
		console.log(this.props.todos);
		if(this.props.todos === undefined || this.props.todos === null || this.props.todos.length === 0){
			if(addedDevices === undefined || addedDevices === null || addedDevices.length===0){
				this.setState({validateStatus:'FAILURE',message:'Please select any device to proceed'});
			}else{
				if(!this.state.validateDevice){
					this.setState({validateStatus:'FAILURE',message:'Please click VALIDATE DEVICE before proceeding'});
				}else{
				this.props.setDeviceFundInfo(fundDeviceList,fundSummary,[], addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax,0);
				}
			}
		}else{
			if((addedDevices !== undefined && addedDevices !== null && addedDevices.length !==0)
				&& !this.state.validateDevice){
				this.setState({validateStatus:'FAILURE',message:'Please click VALIDATE DEVICE before proceeding'});
			}
			else{
			this.props.setDeviceFundInfo(fundDeviceList,fundSummary,msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax,0);
			}
		}


	}
	previous=()=>{
		this.props.setDeviceFundInfoPrev(this.state.validateDevice);
	}
	handleClick(type){
		let { dfTodosPerPage, dfCurrentPage }=this.state;
		let { deviceFunds }=this.props;
		if(deviceFunds.length>0){
				if(type==='First'){
					dfCurrentPage=1
				}
				else if(type==='Next' && dfCurrentPage<Math.ceil(deviceFunds.length / dfTodosPerPage)){
					dfCurrentPage+=1
				}
				else if(type==='Prev' && dfCurrentPage>1){
					dfCurrentPage-=1
				}
				else if(type==='Last'){
					dfCurrentPage=Math.ceil(deviceFunds.length / dfTodosPerPage);
				}
			  this.setState({
			    dfCurrentPage: Number(dfCurrentPage),
			    dfLastPage:Number(Math.ceil(deviceFunds.length / dfTodosPerPage)),
			    dfFirstIndexCurrentPage:(dfCurrentPage * dfTodosPerPage)-dfTodosPerPage+1,
			  });
		}
	}
	handleClickOld(type){
		let { dfOldTodosPerPage, dfOldCurrentPage }=this.state;
		let { deviceFundsOld }=this.props;
		if(deviceFundsOld.length>0){
				if(type==='First'){
					dfOldCurrentPage=1
				}
				else if(type==='Next' && dfOldCurrentPage<Math.ceil(deviceFundsOld.length / dfOldTodosPerPage)){
					dfOldCurrentPage+=1
				}
				else if(type==='Prev' && dfOldCurrentPage>1){
					dfOldCurrentPage-=1
				}
				else if(type==='Last'){
					dfOldCurrentPage=Math.ceil(deviceFundsOld.length / dfOldTodosPerPage);
				}
			  this.setState({
			    dfOldCurrentPage: Number(dfOldCurrentPage),
			    dfOldLastPage:Number(Math.ceil(deviceFundsOld.length / dfOldTodosPerPage)),
			    dfOldFirstIndexCurrentPage:(dfOldCurrentPage * dfOldTodosPerPage)-dfOldTodosPerPage+1,
			  });
		}
	}
	handleDeviceClick(type){
		let { deviceTodosPerPage, deviceCurrentPage, addedDevices}=this.state;
		console.log(addedDevices);
		if(addedDevices!= null && addedDevices.length>0){
				if(type==='First'){
					deviceCurrentPage=1
				}
				else if(type==='Next' && deviceCurrentPage<Math.ceil(addedDevices.length / deviceTodosPerPage)){
					deviceCurrentPage+=1
				}
				else if(type==='Prev' && deviceCurrentPage>1){
					deviceCurrentPage-=1
				}
				else if(type==='Last'){
					deviceCurrentPage=Math.ceil(addedDevices.length / deviceTodosPerPage);
				}
			  this.setState({
			    deviceCurrentPage: Number(deviceCurrentPage),
			    deviceLastPage:Number(Math.ceil(addedDevices.length / deviceTodosPerPage)),
			    deviceFirstIndexCurrentPage:(deviceCurrentPage * deviceTodosPerPage)-deviceTodosPerPage+1,
			  });
		}
	}

	addDevice=()=>{
		let { addedDevices, flexiFundDevice, quantity, totalFundAmount, totalAdjAmount, deviceFundUsed, deviceFundLeft, amountPayable, previousFundAmountLeft }= this.state;
		if(addedDevices===undefined){
			addedDevices=[];
		}
		let { orderCategory, previousFundAmount, previousFundAmountUsed }=this.props;
		if(previousFundAmount!==undefined && orderCategory==='Existing Group' && parseFloat(parseFloat(previousFundAmount)+parseFloat(totalFundAmount))<=0){
			this.setState({validateStatus:'FAILURE',message:'You have insuffcient balance to take device'});
			return;
		}
		if(totalFundAmount!=='' && parseFloat(totalFundAmount)<=0 && orderCategory!=='Existing Group'){
			this.setState({validateStatus:'FAILURE',message:'You have insuffcient balance to take device'});
			return;
		}
		else if(flexiFundDevice.trim()===''){
			this.setState({validateStatus:'FAILURE',message:'Please choose some device first'});
			return;
		}
		else{
			if(quantity.trim()===''){
				this.setState({validateStatus:'FAILURE',message: 'Quantity cannot be blank'});
				return;
			}
			if(quantity.indexOf(".")===1){
				this.setState({validateStatus:'FAILURE',message:'Quantity cannot be in decimals'});
				return;
			}
			if(quantity < 1){
				this.setState({validateStatus:'FAILURE',message: 'Quantity cannot be zero or a negative value'});
				return;
			}

			var maxKeyValue = 0;
			if(addedDevices != undefined && addedDevices != null && addedDevices.length>0){
				for(var i=0;i<addedDevices.length;i++){
					if(addedDevices[i].key>maxKeyValue){
						maxKeyValue = addedDevices[i].key;
					}
				}
			}
			var tempAddedDevice=[...addedDevices,{
				key:maxKeyValue+1,
				value:{...this.props.fundDeviceInfo,quantity:1, contractMsisdn:null, eligibleFlexiFundContract:null,adjAmount:null}
			}];
			maxKeyValue++;
			for(var i=0;i<quantity-1;i++){
				tempAddedDevice=[...tempAddedDevice,{
					key:maxKeyValue+i+1,
					value:{...this.props.fundDeviceInfo,quantity:1, contractMsisdn: null, eligibleFlexiFundContract:null,adjAmount:null}
					}];
		 	 }

			// const tempAddedDevice=[...addedDevices,{
			// 		key:addedDevices.length,
			// 		value:{...this.props.fundDeviceInfo,quantity:quantity}
			// 	}];
			let totalPrice=0;
			let totalQuantity=0;
			/*let fundAmountUsed=0;
			let previousFundAmountLeft=0;
			let amountPayable=0;
			let fundAmountLeft=0;*/
			tempAddedDevice.map((addedDevice)=>{
					totalPrice+=parseFloat(parseFloat(addedDevice.value.deviceRrp)*addedDevice.value.quantity);
					totalQuantity+=parseFloat(addedDevice.value.quantity);
			});
/*			if(orderCategory==='Existing Group' ){
				if(previousFundAmount!==undefined && parseFloat(previousFundAmount) >=0){
					previousFundAmountLeft =previousFundAmount-totalPrice;
					amountPayable=0;
					if(parseFloat(previousFundAmountLeft)<=0){
						previousFundAmountUsed=previousFundAmount;
						previousFundAmountLeft=0;
						amountPayable=totalPrice-previousFundAmount;
						fundAmountLeft=totalFundAmount-amountPayable;
						if(parseFloat(fundAmountLeft)<=0){
							fundAmountUsed=totalFundAmount;
							fundAmountLeft=0;
							amountPayable=totalPrice-(totalFundAmount+previousFundAmount);
						}
						else{
							fundAmountUsed=totalPrice-previousFundAmount;
							amountPayable = 0;
						}
					}
					else{
						previousFundAmountUsed=totalPrice;
						fundAmountLeft=totalFundAmount;
					}
				}
			}
			else{
			     fundAmountLeft=totalFundAmount-totalPrice;
				if(parseFloat(fundAmountLeft)<=0){
					fundAmountUsed=totalFundAmount;
					fundAmountLeft=0;
					amountPayable=totalPrice-totalFundAmount;
				}
				else{
					fundAmountUsed=totalPrice;
				}
			}*/
			this.setState({
				addedDevices:tempAddedDevice,
				totalPrice:totalPrice,
				totalQuantity:totalQuantity,
				// deviceFundUsed:fundAmountUsed,
				/*deviceFundLeft:fundAmountLeft,
				amountPayable:amountPayable,
*/				tax:0,
				/*previousFundAmount:previousFundAmount,
				previousFundAmountLeft:previousFundAmountLeft,
				previousFundAmountUsed:previousFundAmountUsed,*/
				validateDevice:false
			});
			this.props.setDeviceDetails(tempAddedDevice, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, 0, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft, totalAdjAmount);
		}
	}
	checkIsNumeric= (value) => {
		if(value !== undefined && value !== null && value !== ''){
			var regex = /^[0-9]+$/;
			return (regex.test(value)) ? true:false;
		}else{
			return true;
		}

	}
	handleChange = (e, { name, value }) => {
		if(name ==='quantity')
		{
			var checkIsNumeric=this.checkIsNumeric(value);
			if(checkIsNumeric)
			this.setState({[name]: value});
		}
		else {
			this.setState({[name]: value});
		}

		if(name==='flexiFundDevice'){
			this.props.flexiFundDevices.map((currentDevice) => {
				if (currentDevice.value === value) {
					this.setState({ deviceId: currentDevice.key });
					this.props.fetchFundDeviceInfo(currentDevice.key);
				}
			})
		}
	}
	removeRow(row){
		let { addedDevices, totalFundAmount, previousFundAmount, previousFundAmountUsed, totalAdjAmount }= this.state;
		if(addedDevices===undefined){
			addedDevices=[];
		}
		console.log('addedDevices',addedDevices);
    	let tempDevices=addedDevices.filter((x) => {
    		return x.key !== row.key
		});
		console.log('tempDevices',tempDevices);
	  	let totalPrice=0;
	  	let totalQuantity=0;
	  	let fundAmountUsed=0;
	  	let previousFundAmountLeft=0;
	  	let amountPayable=0;
	  	let fundAmountLeft=0;
	  	let tempTotalAdjFund = totalAdjAmount;
	  	tempDevices.map((addedDevice)=>{
	  			totalPrice+=(addedDevice.value.deviceRrp*addedDevice.value.quantity);
	  			totalQuantity+=parseFloat(addedDevice.value.quantity);
	  	});
	  	let { orderCategory }=this.props;
	  	if(orderCategory!==undefined && orderCategory==='Existing Group' ){
			  console.log('Existing Group');
	  		if(previousFundAmount!==undefined && parseFloat(previousFundAmount) >=0){
	  			previousFundAmountLeft=previousFundAmount-totalPrice;
				amountPayable=0;
				console.log('previousFundAmountLeft',previousFundAmountLeft);
	  			if(parseFloat(previousFundAmountLeft)<=0){
	  				previousFundAmountUsed=previousFundAmount;
	  				previousFundAmountLeft=0;
	  				amountPayable=totalPrice-previousFundAmount;
					  fundAmountLeft=totalFundAmount-amountPayable;
					  console.log('previousFundAmountUsed',previousFundAmountUsed,'amountPayable',amountPayable,'fundAmountLeft',fundAmountLeft,
					'totalFundAmount',totalFundAmount,'previousFundAmount',previousFundAmount);
	  				if(parseFloat(fundAmountLeft)<=0){
	  					fundAmountUsed=totalFundAmount;
	  					fundAmountLeft=0;
	  					amountPayable=totalPrice-(totalFundAmount+previousFundAmount);
	  				}
	  				else{
						  fundAmountUsed=totalPrice-totalFundAmount;
						  amountPayable = 0;
						  console.log('fundAmountLeft',fundAmountLeft);
	  				}
	  			}
	  			else{
	  				previousFundAmountUsed=totalPrice;
	  				fundAmountLeft=totalFundAmount;
	  			}
	  		}
	  	}
	  	else{
	  		fundAmountLeft=totalFundAmount-totalPrice;
	  		amountPayable=0;
	  		if(parseFloat(fundAmountLeft)<=0){
	  			fundAmountUsed=totalFundAmount;
	  			fundAmountLeft=0;
	  			amountPayable=totalPrice-totalFundAmount;
	  		}
	  		else{
	  			fundAmountUsed=totalPrice;
	  		}
	  	}

	  	if(tempDevices.length==0){
	  		tempTotalAdjFund=0;
	  	}

	  	this.setState({
	  		addedDevices:tempDevices,
	  		totalPrice:totalPrice,
	  		totalQuantity:totalQuantity,
	  		deviceFundUsed:fundAmountUsed,
	  		deviceFundLeft:fundAmountLeft,
	  		amountPayable:amountPayable,
	  		tax:0,
	  		previousFundAmount:previousFundAmount,
	  		previousFundAmountLeft:previousFundAmountLeft,
			previousFundAmountUsed:previousFundAmountUsed,
			validateDevice:false,
			totalAdjAmount: tempTotalAdjFund
	  	});

	  	this.props.setDeviceDetails(tempDevices, totalPrice, totalQuantity, fundAmountUsed, fundAmountLeft, amountPayable, 0, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft, tempTotalAdjFund);
	  	/*let fundAmountLeft=totalFundAmount-totalPrice;
	  	let amountPayable=0;
	  	if(parseFloat(fundAmountLeft)<=0){
	  		fundAmountUsed=totalFundAmount;
	  		fundAmountLeft=0;
	  		amountPayable=totalPrice-totalFundAmount;
	  	}
	  	else{
	  		fundAmountUsed=totalPrice;
	  	}
	  	this.setState({
	  		addedDevices:tempDevices,
	  		totalPrice:totalPrice,
	  		totalQuantity:totalQuantity,
	  		deviceFundUsed:fundAmountUsed,
	  		deviceFundLeft:fundAmountLeft,
	  		amountPayable:amountPayable,
	  		tax:0
	  	});
	  	this.props.setDeviceDetails(tempDevices, totalPrice, totalQuantity, fundAmountUsed, fundAmountLeft, amountPayable, 0);*/
	}

	validateDevicesNewGroup = () =>{
		let{ratePlanDeviceMapList,addedDevices}=this.state;
		let{deviceFunds} = this.props;
		this.setState({showDimmer:true,validateStatus:"SUCCESS"});

		const tempAddedDevices = addedDevices.sort(function(a,b){
			return a.value.deviceRrp - b.value.deviceRrp || a.value.deviceId - b.value.deviceId;
		});


		var breakLoop = false ;
		var validateDeviceWithoutMNP=true;
		var validateDeviceWithMNP=true;
		var mnpCount =0;
		var tempDeviceFundsWithoutMNP = this.props.deviceFunds.map((deviceFund)=>{
									for(var i=0;i<this.props.msisdnList.length;i++){
										if(this.props.msisdnList[i].mobileInfo.mobileNo === deviceFund.msisdn
											&& this.props.msisdnList[i].regType !== 'MNP Port In'){
												return {...deviceFund};
											}
										}
								});


		var tempDeviceFundsWithMNP = this.props.deviceFunds.map((deviceFund)=>{
									for(var i=0;i<this.props.msisdnList.length;i++){
										if(this.props.msisdnList[i].mobileInfo.mobileNo === deviceFund.msisdn
											&& this.props.msisdnList[i].regType === 'MNP Port In'){
												mnpCount++;
												return {...deviceFund};
											}
										}
								});

		var tempRatePlanDeviceMapList = JSON.parse(JSON.stringify(ratePlanDeviceMapList));

		var highestRrpDevice = 0;
		tempAddedDevices.map((currentDevice) => {
			currentDevice.value.contractMsisdn = null;
			currentDevice.value.eligibleFlexiFundContract = null;
			currentDevice.value.adjAmount = null;
			if(currentDevice.value.flexiFundRuleCheck === 1){
				highestRrpDevice++;
			}
		});

		tempAddedDevices.map((currentDevice) => {
			breakLoop = false;
				if(currentDevice.value.flexiFundRuleCheck === 1){

					for(var i=0;i<ratePlanDeviceMapList.length;i++){
						if(ratePlanDeviceMapList[i].ebdDeviceId === currentDevice.value.deviceId
							|| parseInt(ratePlanDeviceMapList[i].ebdDeviceId) === currentDevice.value.deviceId){
							var tempRatePlan  = ratePlanDeviceMapList[i].ratePlanId;
							var tempAdjAmount = ratePlanDeviceMapList[i].adjAmount;
							//var tempMaxDeviceAllowed = ratePlanDeviceMapList[i].maxDeviceAllowed;
								for(var j=0;j<tempRatePlan.length;j++){
									for(var k=0;k<tempDeviceFundsWithoutMNP.length;k++){
									  if(tempDeviceFundsWithoutMNP[k] != undefined && tempDeviceFundsWithoutMNP[k] != null){
										if(tempRatePlan[j] === tempDeviceFundsWithoutMNP[k].ratePlanId
											//&&	tempMaxDeviceAllowed[j] >0
											){
											//ratePlanDeviceMapList[i].maxDeviceAllowed[j] = tempMaxDeviceAllowed[j]- 1;
											currentDevice.value.contractMsisdn = tempDeviceFundsWithoutMNP[k].msisdn;
											currentDevice.value.eligibleFlexiFundContract = tempDeviceFundsWithoutMNP[k].ratePlan;
											currentDevice.value.adjAmount = tempAdjAmount[j];
											tempDeviceFundsWithoutMNP[k].ratePlanId = "";
											breakLoop= true;
											break;
										}else{
											currentDevice.value.eligibleFlexiFundContract = "Not Eligible";
										}
									  }
									}
									if(breakLoop){
										break;
									}
								}
						}
						if(breakLoop){
							break;
						}
					}
					if(currentDevice.value.eligibleFlexiFundContract === 'Not Eligible'){
						validateDeviceWithoutMNP  = false;
					}
				}
		});


		tempDeviceFundsWithoutMNP = this.props.deviceFunds.map((deviceFund)=>{
			for(var i=0;i<this.props.msisdnList.length;i++){
				if(this.props.msisdnList[i].mobileInfo.mobileNo === deviceFund.msisdn
					&& this.props.msisdnList[i].regType !== 'MNP Port In'){
						return {...deviceFund};
					}
				}
		});


		tempAddedDevices.map((currentDevice) => {
			breakLoop = false;
				if(currentDevice.value.flexiFundRuleCheck === 1 && currentDevice.value.eligibleFlexiFundContract === "Not Eligible"){

					for(var i=0;i<ratePlanDeviceMapList.length;i++){
						if(ratePlanDeviceMapList[i].ebdDeviceId === currentDevice.value.deviceId
							|| parseInt(ratePlanDeviceMapList[i].ebdDeviceId) === currentDevice.value.deviceId){
							var tempRatePlan  = ratePlanDeviceMapList[i].ratePlanId;
							var tempAdjAmount = ratePlanDeviceMapList[i].adjAmount;
							//var tempMaxDeviceAllowed = ratePlanDeviceMapList[i].maxDeviceAllowed;
								for(var j=0;j<tempRatePlan.length;j++){
									for(var k=0;k<tempDeviceFundsWithoutMNP.length;k++){
									  if(tempDeviceFundsWithoutMNP[k] != undefined && tempDeviceFundsWithoutMNP[k] != null){
										if(tempRatePlan[j] === tempDeviceFundsWithoutMNP[k].ratePlanId
											//&&	tempMaxDeviceAllowed[j] >0
											){
											//ratePlanDeviceMapList[i].maxDeviceAllowed[j] = tempMaxDeviceAllowed[j]- 1;
											currentDevice.value.ratePlanOtherThanMNP = true;
											breakLoop= true;
											break;
										}else{
											currentDevice.value.eligibleFlexiFundContract = "Not Eligible";
											currentDevice.value.ratePlanOtherThanMNP = false;
										}
									  }
									}
									if(breakLoop){
										break;
									}
								}
						}
						if(breakLoop){
							break;
						}
					}
					if(currentDevice.value.eligibleFlexiFundContract === 'Not Eligible'){
						validateDeviceWithoutMNP  = false;
					}
				}
		});

		var count =0;
		if(tempDeviceFundsWithMNP != undefined && tempDeviceFundsWithMNP!= null
							&& tempDeviceFundsWithMNP.length>0){
			tempAddedDevices.map((currentDevice) => {
				breakLoop = false;

				if(currentDevice.value.flexiFundRuleCheck === 1){
					count++;
				}
					if(currentDevice.value.flexiFundRuleCheck === 1 &&
						((currentDevice.value.eligibleFlexiFundContract === "Not Eligible" &&
						 (currentDevice.value.ratePlanOtherThanMNP === true || (count === highestRrpDevice && tempAddedDevices.length>1)) )
						   || mnpCount === this.props.deviceFunds.length) ){

						for(var i=0;i<ratePlanDeviceMapList.length;i++){
							if(ratePlanDeviceMapList[i].ebdDeviceId === currentDevice.value.deviceId
								|| parseInt(ratePlanDeviceMapList[i].ebdDeviceId) === currentDevice.value.deviceId){
								var tempRatePlan  = ratePlanDeviceMapList[i].ratePlanId;
								var tempAdjAmount = ratePlanDeviceMapList[i].adjAmount;
								//var tempMaxDeviceAllowed = ratePlanDeviceMapList[i].maxDeviceAllowed;
									for(var j=0;j<tempRatePlan.length;j++){
										for(var k=0;k<tempDeviceFundsWithMNP.length;k++){
										  if(tempDeviceFundsWithMNP[k] != undefined && tempDeviceFundsWithMNP[k] != null){
											if(tempRatePlan[j] === tempDeviceFundsWithMNP[k].ratePlanId
											//&&	tempMaxDeviceAllowed[j] >0
											   ){
											//	ratePlanDeviceMapList[i].maxDeviceAllowed[j] = tempMaxDeviceAllowed[j]- 1;
												currentDevice.value.contractMsisdn = tempDeviceFundsWithMNP[k].msisdn;
												currentDevice.value.eligibleFlexiFundContract = tempDeviceFundsWithMNP[k].ratePlan;
												currentDevice.value.adjAmount = tempAdjAmount[j];
												tempDeviceFundsWithMNP[k].ratePlanId = "";
												breakLoop= true;
												break;
											}else{
												currentDevice.value.eligibleFlexiFundContract = "Not Eligible";
											}
										  }
										}
										if(breakLoop){
											break;
										}
									}
							}
							if(breakLoop){
								break;
							}
						}
						if(currentDevice.value.eligibleFlexiFundContract === 'Not Eligible'){
							validateDeviceWithMNP  = false;
						}
					}

					else if(currentDevice.value.flexiFundRuleCheck === 1 &&
						((currentDevice.value.eligibleFlexiFundContract === "Not Eligible" && currentDevice.value.ratePlanOtherThanMNP === false )
						&& mnpCount !== this.props.deviceFunds.length)){
						validateDeviceWithMNP  = false;
					}
			});
		}
		if(!validateDeviceWithMNP && mnpCount === this.props.deviceFunds.length){
			validateDeviceWithoutMNP = false
		}

		if(!validateDeviceWithoutMNP && !validateDeviceWithMNP){
			this.setState({addedDevices:tempAddedDevices,validateStatus:'FAILURE',ratePlanDeviceMapList:tempRatePlanDeviceMapList
			,message: 'One or more Device(s) is not able to be purchased with FlexiFund.',validateDevice:false});
		}else{
			let totalPrice=0;
			let totalQuantity=0;
			let fundAmountUsed=0;
			let previousFundAmountLeft=0;
			let amountPayable=0;
			let fundAmountLeft=0;
			let adjAmountExisting =0;
			let adjAmountCurrent = 0;
			let {deviceFunds,previousFundAmountUsed,previousFundAmountInitial,orderCategory} = this.props;
			let {totalFundAmountInitial, totalAdjAmount} = this.state;
			tempAddedDevices.map((addedDevice)=>{
					totalPrice+=parseFloat(parseFloat(addedDevice.value.deviceRrp)*addedDevice.value.quantity);
					totalQuantity+=parseFloat(addedDevice.value.quantity);
					var currentDeviceMapped = false;
					if(deviceFunds != undefined && deviceFunds != null && deviceFunds.length >0){
						for(var i=0;i<deviceFunds.length;i++){
							if(addedDevice.value.eligibleFlexiFundContract === deviceFunds[i].msisdn){
								if(addedDevice.value.adjAmount != null){
									adjAmountCurrent+=parseFloat(addedDevice.value.adjAmount);
								}
								currentDeviceMapped = true;
								break;
							}
						}
					}
					if(!currentDeviceMapped){
						if(addedDevice.value.adjAmount != null){
							adjAmountCurrent+=parseFloat(addedDevice.value.adjAmount);
						}
					}
			});
			fundAmountLeft=totalFundAmountInitial-totalPrice;
			if(parseFloat(fundAmountLeft)<=0){

				if(parseFloat(adjAmountCurrent)>0){
					fundAmountLeft += adjAmountCurrent;
					if(parseFloat(fundAmountLeft) <= 0){
							fundAmountUsed = totalFundAmountInitial + adjAmountCurrent;
							fundAmountLeft = 0;
							amountPayable = totalPrice-fundAmountUsed;
					}else{
							fundAmountUsed = totalPrice;
					}
				}else{
					fundAmountUsed=totalFundAmountInitial;
					fundAmountLeft = 0;
					amountPayable = totalPrice-fundAmountUsed;
				}
			}
			else{
				fundAmountUsed = totalPrice;
                if(parseFloat(adjAmountCurrent)>0) {
                    fundAmountLeft += adjAmountCurrent;
                }
			}

			/*	totalFundAmountInitial = totalFundAmountInitial+ adjAmountCurrent;
				fundAmountLeft=totalFundAmountInitial-totalPrice;
				if(parseFloat(fundAmountLeft)<=0){
					fundAmountUsed=totalFundAmountInitial;
					fundAmountLeft=0;
					amountPayable=totalPrice-totalFundAmountInitial;
				}
				else{
					fundAmountUsed=totalPrice;
				}*/

				this.setState({
					addedDevices:tempAddedDevices,
					totalPrice:totalPrice,
					totalQuantity:totalQuantity,
					deviceFundUsed:fundAmountUsed,
					deviceFundLeft:fundAmountLeft,
					amountPayable:amountPayable,
					tax:0,
					previousFundAmount:previousFundAmountInitial,
					previousFundAmountLeft:previousFundAmountLeft,
					previousFundAmountUsed:previousFundAmountUsed,
					validateDevice:true,
					totalFundAmount:totalFundAmountInitial,
					ratePlanDeviceMapList:tempRatePlanDeviceMapList,
                    totalAdjAmount: adjAmountCurrent
				});
				this.props.setDeviceDetails(tempAddedDevices, totalPrice, totalQuantity, fundAmountUsed, fundAmountLeft, amountPayable, 0, previousFundAmountInitial, previousFundAmountUsed, previousFundAmountLeft, totalAdjAmount);

		}
		setTimeout(() => this.setState({showDimmer:false}), 100);

	}
	validateDevicesExistingGroup = () =>{
		this.setState({showDimmer:true,validateStatus:"SUCCESS"});
		let {selectedVSN,deviceFunds} = this.props;
		let {addedDevices} = this.state;
		var body = [];
		if(deviceFunds !== undefined && deviceFunds !== null && deviceFunds.length >0){
			var deviceList = addedDevices.map((currentDevice) => {
									return {"articleId":currentDevice.value.deviceArticleId};
																});
			var ratePlanList = deviceFunds.map((currentFund) => {
										var fundAmount = 0;
										if(currentFund.fundAmount !== undefined &&
											currentFund.fundAmount !== null){
											fundAmount = currentFund.fundAmount;
											}
										return {"msisdn":currentFund.msisdn,
                                            "regType":currentFund.regType,
												"ratePlanId":currentFund.ratePlanId,
												"fundAmount":fundAmount,
											   };
																});
			body = { "vsn" : selectedVSN,
					 "deviceList": deviceList,
					 "ratePlanList": ratePlanList
			}
		}else{
			var deviceList = addedDevices.map((currentDevice) => {
				return {"articleId":currentDevice.value.deviceArticleId};
				});

				body = { "vsn" : selectedVSN,
						"deviceList": deviceList
				  	   }
		}
		this.props.validateLineExistingGroup(body);
	}


	render() {
		let { 	dfTodosPerPage,
				dfCurrentPage,
				dfIndexOfLastTodo,
				dfIndexOfFirstTodo,
				dfCurrentTodos,
				flexiFundDevice,
				quantity,
				addedDevices,
				deviceIndexOfLastTodo,
				deviceCurrentPage,
				deviceTodosPerPage,
				deviceIndexOfFirstTodo,
				deviceCurrentTodos,
				dfFirstIndexCurrentPage,
				deviceFirstIndexCurrentPage,
				totalPrice,
				totalFundAmount,
				totalQuantity,
				deviceFundUsed,
				deviceFundLeft,
				amountPayable,
				tax,
				validateStatus,
				message,
				previousFundAmount,
				previousFundAmountLeft,
				previousFundAmountUsed,
				dfOldCurrentPage,
				dfOldTodosPerPage,
				dfOldIndexOfFirstTodo,
				dfOldIndexOfLastTodo,
				dfOldCurrentTodos,
				dfOldLastPage,
				dfOldFirstIndexCurrentPage,
				showDimmer,
				totalAdjAmount
			}=this.state;
		let { flexiFundDevices, brn, orderCategory, selectedVSN, portalCustInfo, deviceFunds, active, deviceFundsOld  }=this.props;
		let { custBrnNo, masterRegStatus, contactMode, virtualServiceNo, easPackageName,brnInfo,
			totalMembers, maxLineCount, masterReg, masterRegId, prodCatName, totalMemberString ,lineCount} = this.props.registrationDetails;

		dfIndexOfLastTodo = dfCurrentPage * dfTodosPerPage;
       	dfIndexOfFirstTodo = dfIndexOfLastTodo - dfTodosPerPage;
       	if(deviceFunds===undefined){
       		deviceFunds=[];
       	}
       	dfCurrentTodos = deviceFunds.slice(dfIndexOfFirstTodo, dfIndexOfLastTodo);

       	dfOldIndexOfLastTodo = dfOldCurrentPage * dfOldTodosPerPage;
       	dfOldIndexOfFirstTodo = dfOldIndexOfLastTodo - dfOldTodosPerPage;
       	if(deviceFundsOld===undefined){
       		deviceFundsOld=[];
       	}
       	dfOldCurrentTodos=deviceFundsOld.slice(dfOldIndexOfFirstTodo, dfOldIndexOfLastTodo);

       	deviceIndexOfLastTodo = deviceCurrentPage * deviceTodosPerPage;
       	deviceIndexOfFirstTodo = deviceIndexOfLastTodo - deviceTodosPerPage;
       /*	if(addedDevices===undefined){
       		addedDevices=[];
		   }*/
		   if(addedDevices===undefined){
			addedDevices=[];
		}
       	deviceCurrentTodos = addedDevices.slice(deviceIndexOfFirstTodo, deviceIndexOfLastTodo);

		return (
				<Container fluid>
		          	<PleaseWait active={showDimmer}/>
					<Navigation index={5}/>
					<Segment basic style={{padding:0, paddingTop:15, flex: 1}}>
						<Form size='small'>
							<Grid style={{paddingLeft:10}}>
								<StaticBlock5 custBrnNo={custBrnNo} prodCatName={prodCatName} companyName={brnInfo.portalCustInfo.companyName} masterRegId={masterRegId}
								virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={totalMemberString}
								maxLineCount={maxLineCount} lineCount={lineCount} masterReg={masterReg} contactMode={contactMode} masterRegStatus={masterRegStatus} />
								</Grid>
								<Grid style={{paddingLeft:25}}>
								<Grid.Row style={{paddingBottom:0, paddingLeft:0, paddingTop:20}}>
									<Grid.Column style={{paddingLeft:0}}>
										<label style={{color:'#293895'}} className='heading'>Itemized Order Details</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingBottom:0, paddingLeft:0}}>
									<Grid.Column width='8' style={{paddingLeft:0, opacity:0.7}}>
                                        <label>Displaying {(deviceFunds.length===0) && (0) }{(deviceFunds.length>0) && (dfFirstIndexCurrentPage) }-{(dfFirstIndexCurrentPage-1)+dfCurrentTodos.length} / {deviceFunds.length}</label>
									</Grid.Column>
									<Grid.Column width='8' textAlign='right' style={{paddingRight:0}}>
										<label onClick={()=>this.handleClick('First')} style={{padding:3, opacity:0.7}} className='pointer'>First</label>
                                        <label onClick={()=>this.handleClick('Prev')} style={{padding:3, opacity:0.7}} className='pointer'>Prev</label>
										<label onClick={()=>this.handleClick('Next')} style={{padding:3, opacity:0.7}} className='pointer'>Next</label>
										<label onClick={()=>this.handleClick('Last')} style={{padding:3, opacity:0.7}} className='pointer'>Last</label>
                                        <label onClick={()=>this.handleClick('Last')} style={{opacity:0.7}} >({(deviceFunds.length===0) && (0)}{(deviceFunds.length>0) && (dfCurrentPage)} of { Math.ceil(deviceFunds.length / dfTodosPerPage) })</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingTop:0}}>
								    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
									    <Table.Header>
									      <Table.Row>
									        <Table.HeaderCell style={{paddingLeft:0}}>MSISDN</Table.HeaderCell>
									        <Table.HeaderCell>Rate Plan</Table.HeaderCell>
									        <Table.HeaderCell>Contract</Table.HeaderCell>
									        <Table.HeaderCell>Period</Table.HeaderCell>
									        <Table.HeaderCell >Action</Table.HeaderCell>
									        <Table.HeaderCell>Fund Amount(RM)</Table.HeaderCell>
									      </Table.Row>
									    </Table.Header>
									    <Table.Body style={{height:150}}>
									    	{dfCurrentTodos.map((deviceFund,key) => {
						              				return (
												      <Table.Row key={key}>
												        <Table.Cell style={{paddingLeft:0}}>{deviceFund.msisdn}</Table.Cell>
												        <Table.Cell>{deviceFund.ratePlan}</Table.Cell>
												        <Table.Cell>{deviceFund.contractName}</Table.Cell>
												        <Table.Cell>{deviceFund.period}</Table.Cell>
												        <Table.Cell>{deviceFund.action}</Table.Cell>
												        <Table.Cell>{deviceFund.fundAmount}</Table.Cell>
													   </Table.Row>
												    )
											    })
										    }
									    </Table.Body>
									    <Table.Footer>
									         <Table.Row>
									           <Table.HeaderCell></Table.HeaderCell>
									           <Table.HeaderCell></Table.HeaderCell>
									           <Table.HeaderCell></Table.HeaderCell>
									           <Table.HeaderCell></Table.HeaderCell>
									           <Table.HeaderCell >
									           			{ (totalFundAmount!=='') && (<label style={{color:'#293895'}} className='heading'>Total Fund(RM):</label>)
									           		}
									           	</Table.HeaderCell>
									           <Table.HeaderCell><label style={{color:'#293895'}} className='heading'>{totalFundAmount}</label></Table.HeaderCell>
									         </Table.Row>
									       </Table.Footer>
									  </Table>
								</Grid.Row>
								{(orderCategory==='Existing Group') && (
									<React.Fragment>
												<Grid.Row style={{paddingBottom:0, paddingLeft:0}}>
													<Grid.Column style={{paddingLeft:0}}>
														<label style={{color:'#293895'}} className='heading'>Itemized Old Order Details</label>
													</Grid.Column>
												</Grid.Row>
												<Grid.Row style={{paddingBottom:0, paddingLeft:0}}>
													<Grid.Column width='8' style={{paddingLeft:0, opacity:0.7}}>
                                                        <label>Displaying {(deviceFundsOld.length===0) && (0)}{(deviceFundsOld.length>0) && (dfOldFirstIndexCurrentPage)}-{(dfOldFirstIndexCurrentPage-1)+dfOldCurrentTodos.length} / {deviceFundsOld.length}</label>
													</Grid.Column>
													<Grid.Column width='8' textAlign='right' style={{paddingRight:0}}>
														<label onClick={()=>this.handleClickOld('First')} style={{padding:3, opacity:0.7}} className='pointer'>First</label>
                                                        <label onClick={()=>this.handleClickOld('Prev')} style={{padding:3, opacity:0.7}} className='pointer'>Prev</label>
														<label onClick={()=>this.handleClickOld('Next')} style={{padding:3, opacity:0.7}} className='pointer'>Next</label>
														<label onClick={()=>this.handleClickOld('Last')} style={{padding:3, opacity:0.7}} className='pointer'>Last</label>
                                                        <label onClick={()=>this.handleClickOld('Last')} style={{opacity:0.7}} >({(deviceFundsOld.length===0) && (0) }{(deviceFundsOld.length>0) && (dfOldCurrentPage) } of { Math.ceil(deviceFundsOld.length / dfOldTodosPerPage) })</label>
													</Grid.Column>
												</Grid.Row>
												<Grid.Row style={{paddingTop:0, paddingBottom:20}}>
												    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
													    <Table.Header>
													      <Table.Row>
													        <Table.HeaderCell style={{paddingLeft:0}}>MSISDN</Table.HeaderCell>
													        <Table.HeaderCell>Rate Plan</Table.HeaderCell>
													        <Table.HeaderCell>Contract</Table.HeaderCell>
													        <Table.HeaderCell>Period</Table.HeaderCell>
													        <Table.HeaderCell >Action</Table.HeaderCell>
													        <Table.HeaderCell>Fund Amount(RM)</Table.HeaderCell>
													      </Table.Row>
													    </Table.Header>
													    <Table.Body style={{height:150}}>
													    	{dfOldCurrentTodos.map((deviceFund,key) => {
										              				return (
																      <Table.Row key={key}>
																        <Table.Cell style={{paddingLeft:0}}>{deviceFund.msisdn}</Table.Cell>
																        <Table.Cell>{deviceFund.ratePlan}</Table.Cell>
																        <Table.Cell>{deviceFund.contractName}</Table.Cell>
																        <Table.Cell>{deviceFund.period}</Table.Cell>
																        <Table.Cell>{deviceFund.action}</Table.Cell>
																        <Table.Cell>{deviceFund.fundAmount}</Table.Cell>
																	   </Table.Row>
																    )
															    })
														    }
													    </Table.Body>
													  </Table>
												</Grid.Row>
									</React.Fragment>
									)
								}
								<Grid.Row style={{ padding: 0 }}>
									<Grid.Column width='16' style={{ padding: 0 }}>
										{
											(validateStatus === 'FAILURE') &&
											<Message negative compact size='small' style={{ minWidth: 400 }}
												onDismiss={() => this.setState({ validateStatus: 'SUCCESS' })}>
												<Message.Header>We have encounted an error.</Message.Header>
												<p>{message}</p>
											</Message>
										}
										{
											(this.state.addedDevices != undefined && this.state.addedDevices != null
													&& this.state.addedDevices.length>0 &&
												this.state.validateDevice && validateStatus === 'SUCCESS') &&
											<Message positive compact size='small' style={{ minWidth: 400 }}
												onDismiss={() => this.setState({ validateStatus: 'DEFAULT' })}>
												<Message.Header>Validate Device is successful. Please proceed</Message.Header>
											</Message>
										}
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingBottom:0, paddingLeft:0, paddingTop:0}}>
									<Grid.Column style={{paddingLeft:0}}>
										<label style={{color:'#293895'}} className='heading'>Device Order Details</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row>
									<Grid.Column width='5' style={{paddingRight:0,paddingLeft:0}}>
										<Form.Field >
												<label>Device Offer</label>
												<Dropdown placeholder='Please select' size='small' search selection options={flexiFundDevices}  onChange={this.handleChange} value={flexiFundDevice} name='flexiFundDevice'/>
										</Form.Field>
									</Grid.Column>
									<Grid.Column width='2'>
										<Form.Field >
											  <label>Quantity</label>
											  <Input placeholder='Quantity' value={quantity} onChange={this.handleChange} name='quantity' />
										</Form.Field>
									</Grid.Column>
									<Grid.Column width='3'>
										<Form.Field style={{paddingTop:10}}>
											<p></p>
											<SecondaryButton compact value='ADD'  onClick={this.addDevice}/>
										</Form.Field>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingBottom:0, paddingLeft:0}}>
									<Grid.Column width='8' style={{paddingLeft:0, opacity:0.7}}>
                                        <label>Displaying { (addedDevices.length===0) && (0) }{(addedDevices.length>0) && (deviceFirstIndexCurrentPage) }-{(deviceFirstIndexCurrentPage-1)+deviceCurrentTodos.length} / {addedDevices.length}</label>
									</Grid.Column>
									<Grid.Column width='8' textAlign='right' style={{paddingRight:0}}>
										<label onClick={()=>this.handleDeviceClick('First')} style={{padding:3, opacity:0.7}} className='pointer'>First</label>
                                        <label onClick={()=>this.handleDeviceClick('Prev')} style={{padding:3, opacity:0.7}} className='pointer'>Prev</label>
										<label onClick={()=>this.handleDeviceClick('Next')} style={{padding:3, opacity:0.7}} className='pointer'>Next</label>
										<label onClick={()=>this.handleDeviceClick('Last')} style={{padding:3, opacity:0.7}} className='pointer'>Last</label>
                                        <label onClick={()=>this.handleDeviceClick('Last')}  style={{opacity:0.7}}>({ (addedDevices.length===0) && (0) }{(addedDevices.length>0) && (deviceCurrentPage) } of { Math.ceil(addedDevices.length / deviceTodosPerPage) })</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingTop:0, paddingBottom:0}}>
									    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
										    <Table.Header>
										      <Table.Row>
										        <Table.HeaderCell style={{paddingLeft:0}}>Device Order No.</Table.HeaderCell>
										        <Table.HeaderCell>Group No.</Table.HeaderCell>
										        <Table.HeaderCell>Device model</Table.HeaderCell>
										        <Table.HeaderCell>Device RRP Price</Table.HeaderCell>
										        <Table.HeaderCell>Eligible MSISDN</Table.HeaderCell>
												<Table.HeaderCell>Eligible FlexiFund Contract</Table.HeaderCell>
										        <Table.HeaderCell >Quantity</Table.HeaderCell>
										        <Table.HeaderCell></Table.HeaderCell>
										      </Table.Row>
										    </Table.Header>
										    <Table.Body style={{height:150}}>
										   	{deviceCurrentTodos.map((addedDevice,key) => {
							              				return (
													      <Table.Row key={addedDevice.key}>
													        <Table.Cell>{addedDevice.value.deviceDeliveryNo}</Table.Cell>
													        <Table.Cell></Table.Cell>
													        <Table.Cell>{addedDevice.value.phoneModel}</Table.Cell>
													        <Table.Cell>{addedDevice.value.deviceRrp}</Table.Cell>
													        <Table.Cell>{addedDevice.value.contractMsisdn}</Table.Cell>
													        <Table.Cell>{addedDevice.value.eligibleFlexiFundContract}</Table.Cell>
															<Table.Cell>{addedDevice.value.quantity}</Table.Cell>
													        <Table.Cell>
													        	<Button basic icon='trash' color='red' onClick={() => this.removeRow(addedDevice)}/>
													        </Table.Cell>
													      </Table.Row>
													    )
												    })
											}
										    </Table.Body>
										    <Table.Footer>
										         <Table.Row>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell style={{textAlign:'right'}}><label style={{color:'#293895'}} className='heading'>Total(RM):</label></Table.HeaderCell>
										           <Table.HeaderCell><label style={{color:'#293895'}} className='heading'>{totalPrice}</label></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell ><label style={{color:'#293895'}} className='heading'>{totalQuantity}</label></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										         </Table.Row>
										    </Table.Footer>
										  </Table>
								</Grid.Row>
								{  this.props.orderCategory !== 'Existing Group' &&
								<Grid.Row>
									<Grid.Column width='8' floated='right' style={{paddingLeft:0, opacity:0.7}}>
									</Grid.Column>
									<Grid.Column width='8' textAlign='right' >
										<SecondaryButton compact value='VALIDATE DEVICE' onClick={this.validateDevicesNewGroup} disabled = {this.state.addedDevices.length === 0} />
    								</Grid.Column>
								</Grid.Row>
								}
								{  this.props.orderCategory === 'Existing Group' &&
								<Grid.Row>
									<Grid.Column width='8' floated='right' style={{paddingLeft:0, opacity:0.7}}>
									</Grid.Column>
									<Grid.Column width='8' textAlign='right' >
										<SecondaryButton compact value='VALIDATE DEVICE' onClick={this.validateDevicesExistingGroup} disabled = {this.state.addedDevices.length === 0} />
    								</Grid.Column>
								</Grid.Row>
								}
								<StaticBlock4 totalPrice={totalPrice} totalQuantity={totalQuantity} deviceFundUsed={deviceFundUsed} deviceFundLeft={deviceFundLeft} totalFundAmount={totalFundAmount} amountPayable={amountPayable} tax={tax} orderCategory={orderCategory} previousFundAmount={previousFundAmount}  previousFundAmountLeft={previousFundAmountLeft} previousFundAmountUsed={previousFundAmountUsed} totalAdjAmount={totalAdjAmount}/>
							</Grid>
						</Form>
					</Segment>
					<Segment basic  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:20}}>
						<SecondaryButton value='BACK' onClick={this.previous}/>
						<div style={{padding:20}}/>
						<PrimaryButton value='NEXT' onClick={this.next}/>
					</Segment>
				</Container>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		deviceFunds: state.configuration.data.deviceFunds,
		deviceFundsOld:state.configuration.data.deviceFundsOld,
		registrationDetails: state.order.data.registrationDetails,
		flexiFundDevices: state.configuration.data.flexiFundDevices,
		FETCH_DEVICE_FUNDS_STATUS: state.configuration.meta.FETCH_DEVICE_FUNDS_STATUS,
		FETCH_FLEXI_FUND_DEVICES_STATUS: state.configuration.meta.FETCH_FLEXI_FUND_DEVICES_STATUS,
		SET_DEVICE_FUND_STATUS: state.order.meta.SET_DEVICE_FUND_STATUS,
		msisdnList: state.order.data.msisdnList,
		brn: state.order.data.brn,
		orderCategory: state.order.data.orderCategory,
		selectedVSN: state.order.data.selectedVSN,
		addedDevices: state.order.data.addedDevices,
		totalQuantity: state.order.data.totalQuantity,
		deviceFundUsed: state.order.data.deviceFundUsed,
		deviceFundLeft: state.order.data.deviceFundLeft,
		amountPayable: state.order.data.amountPayable,
		tax: state.order.data.tax,
		deviceId: state.order.data.deviceId,
		fundDeviceInfo: state.configuration.data.fundDeviceInfo,
		portalCustInfo:state.order.data.brnInfo.portalCustInfo,
		active:state.configuration.meta.active,
		totalPrice:state.order.data.totalPrice,
		previousFundAmount:state.order.data.previousFundAmount,
		previousFundAmountUsed:state.order.data.previousFundAmountUsed,
		previousFundAmountLeft:state.order.data.previousFundAmountLeft,
		GET_ADDED_FUND_DEVICES_STATUS:state.configuration.meta.GET_ADDED_FUND_DEVICES_STATUS,
		addedFundDevices: state.configuration.data.addedFundDevices,
		initialDeviceChange:state.order.data.initialDeviceChange,
		todos:state.order.data.todos,
		ratePlanDeviceMapList:state.configuration.data.ratePlanDeviceMapList,
		validateDevice:state.order.data.validateDevice,
		GET_RATEPLAN_DEVICE_MAP_LIST_STATUS:state.configuration.meta.GET_RATEPLAN_DEVICE_MAP_LIST_STATUS,
		SET_DEVICE_FUND_PREV_STATUS:state.order.meta.SET_DEVICE_FUND_PREV_STATUS,
		validatedDeviceList: state.configuration.data.validatedDeviceList,
		VALIDATE_LINE_EXISTING_GROUP_STATUS:state.configuration.meta.VALIDATE_LINE_EXISTING_GROUP_STATUS,
		ratePlans: state.configuration.data.ratePlans,
		previousFundAmountInitial:state.order.data.previousFundAmountInitial,
		totalAdjAmount: state.order.data.totalAdjAmount
	}
}

const mapDispatchToProps = {
	getFlexiFundDevices,
	setDeviceFundInfo,
	fetchFundDeviceInfo,
	getDeviceFunds,
	getAddedFundDevices,
	setDeviceDetails,
	getRatePlanDeviceMapList,
	setDeviceFundInfoPrev,
	validateLineExistingGroup,
	getRateplans
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceFund)
