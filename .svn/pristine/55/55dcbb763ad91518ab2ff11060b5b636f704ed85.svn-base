import React, { Component } from 'react';
import { Grid, Segment, Container, Icon, Form, Table, Radio, Input, Message} from "semantic-ui-react";
import  Navigation  from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock5, StaticBlock4 } from '../../components/common/dumb-component';
import { connect } from 'react-redux';
import { getDeviceFunds, getAddedFundDevices, setApprovalDeviceFunds, setOldDeviceFunds } from '../../redux/actions/configuration';
import FundOverride from './fund-override';
import { setDeviceFundInfo, setApprovalFunds } from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';


class DeviceFund extends Component {
	constructor(props) {
	  super(props);
	  const {url} = this.props.match;
	  this.state = {
	  	nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
	  	processingUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
	  	rejectUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
		dfCurrentPage:1,
		dfTodosPerPage:5,
		dfIndexOfFirstTodo:1,
		dfIndexOfLastTodo:1,
		dfCurrentTodos:null,
		dfLastPage:null,
		dfOldCurrentPage:1,
		dfOldTodosPerPage:5,
		dfOldIndexOfFirstTodo:null,
		dfOldIndexOfLastTodo:null,
		dfOldCurrentTodos:null,
		dfOldLastPage:null,
		addedDevices:[],
		deviceIndexOfLastTodo:null,
		deviceCurrentPage:1,
		deviceTodosPerPage:5,
		deviceIndexOfFirstTodo:1,
		deviceLastPage:1,
		dfFirstIndexCurrentPage:1,
		dfOldFirstIndexCurrentPage:1,
		deviceFirstIndexCurrentPage:1,
		totalPrice:0,
		totalFundAmount:0,
		totalQuantity:props.totalQuantity,
		deviceFundUsed:props.deviceFundUsed,
		deviceFundLeft:props.deviceFundLeft,
		amountPayable:props.amountPayable,
		tax:props.tax,
		totalApprovedAmount:0,
		deviceFunds:this.props.deviceFunds,
		deviceFundsOld:this.props.deviceFundsOld,
		status: 'SUCCESS',
		message: '',
		showDimmer:false,
		previousFundAmountUsed:props.previousFundAmountUsed,
		previousFundAmount:props.previousFundAmount,
		previousFundAmountLeft:props.previousFundAmountLeft,
		adjAmountExisting :0,
		adjAmountCurrent : 0,
		totalAdjAmount: 0
	  };
	  this.fundOverride = React.createRef();
	}
	componentDidMount(){
		this.setState({ showDimmer: true });
		let { totalApprovedAmount,totalFundAmount }=this.state;
		
        this.props.deviceFunds.map((currentDeviceFund)=>{
					//if(currentDeviceFund.contractName!==null && currentDeviceFund.contractName.trim()!==''){
						if(totalApprovedAmount===undefined){
							totalApprovedAmount=0;
						}
						if(currentDeviceFund.approvalAmount!== undefined &&  currentDeviceFund.approvalAmount!==null){
						totalApprovedAmount+=parseFloat(currentDeviceFund.approvalAmount);
						}
						if(currentDeviceFund.fundAmount!== undefined &&  currentDeviceFund.fundAmount!==null){
						totalFundAmount+=parseFloat(currentDeviceFund.fundAmount);
						}
					//}
			});
		this.setState({deviceFunds:this.props.deviceFunds, isReady:true, totalFundAmount: totalFundAmount, totalApprovedAmount: totalApprovedAmount});
		//fetch device details
		console.log('totalApprovedAmount',totalApprovedAmount);
		console.log('totalFundAmount',totalFundAmount);
		this.props.getAddedFundDevices(this.props.easMasterRegId);
	}

	componentWillReceiveProps(nextProps){

		if(this.props.GET_ADDED_FUND_DEVICES_STATUS!=='SUCCESS' &&
			nextProps.GET_ADDED_FUND_DEVICES_STATUS==='SUCCESS'){
				let { totalFundAmount, totalApprovedAmount,previousFundAmount, previousFundAmountLeft, previousFundAmountUsed }=this.state;
				let tempTotalPrice=0;
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
						}else{
							if(currentDevice.adjAmount != null){
								adjAmountCurrent+=parseFloat(currentDevice.adjAmount)
							}
						}
				})
			let fundAmountUsed=0;
			let fundAmountLeft=0;
			let amountPayable=0;
			let totalAdjAmount = adjAmountCurrent;
			if(this.props.orderCategory!==undefined && this.props.orderCategory==='Existing Group' ){
				if(previousFundAmount!==undefined && parseFloat(previousFundAmount) >=0){
						previousFundAmountLeft = previousFundAmount - tempTotalPrice;
						if(parseFloat(previousFundAmountLeft)<=0){
							if(parseFloat(adjAmountExisting)>0){
								previousFundAmountLeft += adjAmountExisting;
								if(parseFloat(previousFundAmountLeft)<=0){
									previousFundAmountUsed = previousFundAmount + adjAmountExisting;
									previousFundAmountLeft = 0;
									amountPayable=tempTotalPrice-previousFundAmountUsed;
									fundAmountLeft=totalApprovedAmount-amountPayable;
									if(parseFloat(fundAmountLeft)<=0){
										if(parseFloat(adjAmountCurrent)>0){
											fundAmountLeft += adjAmountCurrent;
											if(parseFloat(fundAmountLeft)<=0){
												fundAmountUsed = totalApprovedAmount + adjAmountCurrent;
												fundAmountLeft=0;
												amountPayable = tempTotalPrice - (fundAmountUsed + previousFundAmountUsed);
											}else{
												fundAmountUsed = tempTotalPrice - previousFundAmountUsed;
												amountPayable = 0;
											}
										}else{
												fundAmountUsed=totalApprovedAmount;
												fundAmountLeft=0;
												amountPayable=tempTotalPrice-(totalApprovedAmount+previousFundAmountUsed);
										}
									}else{
										fundAmountUsed=tempTotalPrice-previousFundAmountUsed;
										amountPayable=0;
									}
								}else{
										previousFundAmountUsed = previousFundAmount - previousFundAmountLeft;
										fundAmountLeft = totalApprovedAmount;
										amountPayable=0;
								}
							}else{
								previousFundAmountUsed=previousFundAmount;
								previousFundAmountLeft=0;
								amountPayable=tempTotalPrice-previousFundAmount;
								fundAmountLeft=totalApprovedAmount-amountPayable;
								if(parseFloat(fundAmountLeft)<=0){
									if(parseFloat(adjAmountCurrent)>0){
										fundAmountLeft += adjAmountCurrent;
										if(parseFloat(fundAmountLeft)<=0){
											fundAmountUsed = totalApprovedAmount + adjAmountCurrent;
											fundAmountLeft=0;
											amountPayable = tempTotalPrice - (fundAmountUsed + previousFundAmountUsed);
										}else{
											fundAmountUsed = tempTotalPrice - previousFundAmountUsed;
											amountPayable = 0;
										}
									}else{
											fundAmountUsed=totalApprovedAmount;
											fundAmountLeft=0;
											amountPayable=tempTotalPrice-(totalApprovedAmount+previousFundAmountUsed);
									}
								}
								else{
									fundAmountUsed=tempTotalPrice-previousFundAmountUsed;
									amountPayable=0;
								}
							}
						}
						else{
							previousFundAmountUsed=tempTotalPrice;
							fundAmountLeft=totalApprovedAmount;
						}
					}
			}
			else{
				totalApprovedAmount = totalApprovedAmount;
				totalFundAmount = totalFundAmount ;
				fundAmountLeft=totalApprovedAmount-tempTotalPrice;
			    if(parseFloat(fundAmountLeft)<=0){
			    	if(parseFloat(adjAmountCurrent)>0){
			    			fundAmountLeft += adjAmountCurrent;
			    			if(parseFloat(fundAmountLeft)<=0){
    				    			if(totalApprovedAmount!=null){
    						    		fundAmountUsed = totalApprovedAmount + adjAmountCurrent;
    						    	}
    						    	else{
    						    		fundAmountUsed = totalFundAmount + adjAmountCurrent;
    						    	}
    						    	fundAmountLeft=0;
    						    	amountPayable=tempTotalPrice - fundAmountUsed;
			    			}else{
			    					fundAmountUsed = tempTotalPrice;
			    					amountPayable = 0;
			    			}
			    	}else{
			    			if(totalApprovedAmount!=null){
					    		fundAmountUsed=totalApprovedAmount;
					    	}
					    	else{
					    		fundAmountUsed=totalFundAmount;
					    	}
					    	fundAmountLeft=0;
					    	if(totalApprovedAmount!=null){
					    		amountPayable=tempTotalPrice-totalApprovedAmount;
					    	}
					    	else{
					    		amountPayable=tempTotalPrice-totalFundAmount;
					    	}
			    	}
			    }
			    else{
			    	fundAmountUsed=tempTotalPrice;
                    if(parseFloat(adjAmountCurrent)>0) {
                        fundAmountLeft += adjAmountCurrent;
                    }
			    }
			}
			this.setState({addedDevices:nextProps.addedFundDevices, totalPrice:tempTotalPrice,totalQuantity:tempTotalQuantity,
				totalFundAmount:totalFundAmount,previousFundAmount:previousFundAmount,totalApprovedAmount:totalApprovedAmount,
				 deviceFundUsed: fundAmountUsed,deviceFundLeft: fundAmountLeft ,amountPayable: amountPayable ,tax:0, adjAmountExisting :adjAmountExisting,
				 adjAmountCurrent : adjAmountCurrent, showDimmer:false,previousFundAmountUsed:previousFundAmountUsed,previousFundAmountLeft:previousFundAmountLeft, totalAdjAmount: totalAdjAmount});
		}
		else if(this.props.SET_DEVICE_FUND_STATUS !=='SUCCESS' &&
				nextProps.SET_DEVICE_FUND_STATUS==='SUCCESS'){
				let tempNextURL=this.state.nextUrl;
				tempNextURL+="&action=approved&easMasterRegId="+nextProps.easMasterRegId;
				this.props.history.push(tempNextURL);
		}
	}
	openModal(input){
		this.fundOverride.current.show(input);
	}
	next=()=>{

		let { msisdnList }=this.props;
		let { addedDevices, totalFundAmount, amountPayable, tax , totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, totalApprovedAmount, deviceFundsOld }=this.state;
		let fundDeviceList=[];
		let fundSummary='';
		if(deviceFundsOld!=null && deviceFundsOld!=undefined){
			for (let i = 0; i < deviceFundsOld.length; i++) {
					if(deviceFundsOld[i].crpAction===null || deviceFundsOld[i].crpAction===undefined || deviceFundsOld[i].crpAction===''){
						this.setState({ status: 'FAILURE', message: 'Some action is mandatory on existing contract for Msisdn '+deviceFundsOld[i].msisdn })
						return;
					}
					if(deviceFundsOld[i].crpAction==='Terminate with Waiver'){
							if(deviceFundsOld[i].cmssText===null || deviceFundsOld[i].cmssText===undefined || deviceFundsOld[i].cmssText===''){
								this.setState({ status: 'FAILURE', message: 'CMSS ID is mandatory for Msisdn '+deviceFundsOld[i].msisdn })
								return;
							}
					}
			}
		}
		fundSummary={noOfDevice:totalQuantity,totalAmount:totalFundAmount,payableAmount:amountPayable,tax:tax,totalRRP:totalPrice};
		msisdnList= msisdnList.map(currentRow => {
			let tempFundAmount=0;
				return {...currentRow,contractInfo:this.state.deviceFunds.map((currentDeviceFund)=>{
						if(currentDeviceFund.msisdn===currentRow.mobileInfo.mobileNo){
								return {contractName:currentDeviceFund.contractName, contractId:currentDeviceFund.contractId,deviceFund:currentDeviceFund.fundAmount,status:'Pending Approval', approvalAmount:currentDeviceFund.approvalAmount, fundId:currentDeviceFund.fundId};
						}
				})
				,fundAmount:tempFundAmount
			}
		})
		this.props.setDeviceFundInfo(fundDeviceList,fundSummary,msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld);
		this.props.setOldDeviceFunds(deviceFundsOld);
	}
	previous=()=>{
		this.props.history.goBack();
	}
	processing=()=>{
		let tempNextURL=this.state.processingUrl;
		tempNextURL+="&action=processing&easMasterRegId="+this.props.easMasterRegId;
		this.props.history.push(tempNextURL);
	}
	reject=()=>{
		let tempNextURL=this.state.rejectUrl;
		tempNextURL+="&action=rejected&easMasterRegId="+this.props.easMasterRegId;
		this.props.history.push(tempNextURL);
	}
	handleClick(type){
		let { dfTodosPerPage, dfCurrentPage, deviceFunds}=this.state;
		if(deviceFunds.length>0){
				if(type==='First'){
					dfCurrentPage=1
				}
                else if(type==='Next'  && dfCurrentPage<Math.ceil(deviceFunds.length / dfTodosPerPage)){
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
		if(addedDevices.length>0){
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
	overrideFundAMount(deviceFund,overrideAmount){
		let { deviceFunds, totalPrice ,adjAmountCurrent,adjAmountExisting}=this.state;
		let tempTotalApprovedAmount=null;
		let tempdeviceFunds=deviceFunds.map((currentDeviceFund)=>{
				if(currentDeviceFund.msisdn===deviceFund.msisdn){
					tempTotalApprovedAmount+=overrideAmount;
					return {...currentDeviceFund, approvalAmount:overrideAmount}
				}
				else{
					if(currentDeviceFund.contractName !== null && currentDeviceFund.contractName.trim()!==''){
						tempTotalApprovedAmount+=parseFloat(currentDeviceFund.approvalAmount);
					}
					return currentDeviceFund;
				}

		});
		let { orderCategory, previousFundAmountUsed,previousFundAmountInitial }=this.props;
		let fundAmountUsed=0;
		let fundAmountLeft=0;
		let amountPayable=0;
		let previousFundAmountLeft=0;
		if(orderCategory!==undefined && orderCategory==='Existing Group' ){
			if(previousFundAmountInitial!==undefined && parseFloat(previousFundAmountInitial) >=0){
				tempTotalApprovedAmount = tempTotalApprovedAmount;
				previousFundAmountInitial = previousFundAmountInitial;
				previousFundAmountLeft=previousFundAmountInitial-totalPrice;
				amountPayable=0;
				if(parseFloat(previousFundAmountLeft)<=0){
					if(parseFloat(adjAmountExisting)>0){

					}else{
							previousFundAmountUsed=previousFundAmountInitial;
							previousFundAmountLeft=0;
							amountPayable=totalPrice-previousFundAmountInitial;
							fundAmountLeft=tempTotalApprovedAmount-amountPayable;
							if(parseFloat(fundAmountLeft)<=0){
								if(parseFloat(adjAmountCurrent)>0){
									fundAmountLeft += adjAmountCurrent;
									if(parseFloat(fundAmountLeft)<=0){
										fundAmountUsed=tempTotalApprovedAmount + adjAmountCurrent;
										fundAmountLeft=0;
										amountPayable=totalPrice-(fundAmountUsed + previousFundAmountUsed);
									}else{
										fundAmountUsed = totalPrice - previousFundAmountUsed;
										amountPayable = 0;
									}
								}else{
									fundAmountUsed=tempTotalApprovedAmount;
									fundAmountLeft=0;
									amountPayable=totalPrice-(tempTotalApprovedAmount+previousFundAmountUsed);
								}

							}
							else{
								fundAmountUsed=totalPrice-previousFundAmountInitial;
								amountPayable=0;
							}
					}
				}
				else{
					previousFundAmountUsed=totalPrice;
					fundAmountLeft=tempTotalApprovedAmount;
				}
			}
		}
		else{
			fundAmountUsed=0;
			tempTotalApprovedAmount = tempTotalApprovedAmount;
			fundAmountLeft=tempTotalApprovedAmount-totalPrice;
			amountPayable=0;
			if(parseFloat(fundAmountLeft)<=0){
				fundAmountLeft += adjAmountCurrent;
				if(parseFloat(adjAmountCurrent)>0){
					fundAmountUsed=tempTotalApprovedAmount + adjAmountCurrent;
					fundAmountLeft=0;
					amountPayable=totalPrice-fundAmountUsed;
				}else{
					fundAmountUsed=tempTotalApprovedAmount;
					fundAmountLeft=0;
					amountPayable=totalPrice-tempTotalApprovedAmount;
				}

			}
			else{
				fundAmountUsed=totalPrice;
			}
		}
		this.props.setApprovalDeviceFunds(tempdeviceFunds);
		this.props.setApprovalFunds(tempTotalApprovedAmount, fundAmountUsed, fundAmountLeft, amountPayable, 0, previousFundAmountInitial, previousFundAmountLeft, previousFundAmountUsed);
		this.setState({deviceFunds:tempdeviceFunds, totalApprovedAmount: tempTotalApprovedAmount, deviceFundUsed: fundAmountUsed,deviceFundLeft: fundAmountLeft ,amountPayable: amountPayable ,tax:0, previousFundAmount:previousFundAmountInitial, previousFundAmountLeft:previousFundAmountLeft, previousFundAmountUsed:previousFundAmountUsed });
	}
	handleChange = (e, { name, value }) => {
		let { deviceFundsOld }=this.state;
		let rowNo=name.split('?')[1];
		let tempdeviceFundsOld=deviceFundsOld.map((currentRow,key)=>{
			if(key==rowNo){
				return {
					...currentRow,
					crpAction:value
				}
			}
			return currentRow;
		})
		console.log('tempdeviceFundsOld'+tempdeviceFundsOld);
		this.setState({ [name]: value, deviceFundsOld:tempdeviceFundsOld });
	}

	handleChangeText = (e, { name, value }) => {
		let { deviceFundsOld }=this.state;
		let rowNo=name.split('?')[1];
		let tempdeviceFundsOld=deviceFundsOld.map((currentRow,key)=>{
			if(key==rowNo){
				return {
					...currentRow,
					cmssText:value
				}
			}
			return currentRow;
		})
		this.setState({ [name]: value, deviceFundsOld:tempdeviceFundsOld });
	}
	render() {
		let {
				deviceFunds,
				dfTodosPerPage,
				dfCurrentPage,
				dfIndexOfLastTodo,
				dfIndexOfFirstTodo,
				dfCurrentTodos,
				addedDevices,
				deviceIndexOfLastTodo,
				deviceCurrentPage,
				deviceTodosPerPage,
				deviceIndexOfFirstTodo,
				deviceCurrentTodos,
				dfFirstIndexCurrentPage,
				deviceFirstIndexCurrentPage,
				totalFundAmount, amountPayable, tax , totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, totalApprovedAmount, showDimmer,
				previousFundAmount, previousFundAmountLeft, previousFundAmountUsed,
				deviceFundsOld,
				dfOldCurrentPage,
				dfOldTodosPerPage,
				dfOldIndexOfFirstTodo,
				dfOldIndexOfLastTodo,
				dfOldCurrentTodos,
				dfOldLastPage,
				dfOldFirstIndexCurrentPage,
				status,
				message,
				totalAdjAmount
			}=this.state;
		let { custBrnNo, prodCatName,masterRegId,masterRegStatus, contactMode, virtualServiceNo, easPackageName, totalMemberString,totalMembers, maxLineCount, masterReg  }=this.props.registrationDetails;
		let { brnInfo, orderCategory }=this.props;
		if(deviceFunds===undefined || deviceFunds===null){
			deviceFunds=[];
		}
		dfIndexOfLastTodo = dfCurrentPage * dfTodosPerPage;
       	dfIndexOfFirstTodo = dfIndexOfLastTodo - dfTodosPerPage;
       	dfCurrentTodos = deviceFunds.slice(dfIndexOfFirstTodo, dfIndexOfLastTodo);

		   console.log('dfCurrentTodos',dfCurrentTodos);
       	dfOldIndexOfLastTodo = dfOldCurrentPage * dfOldTodosPerPage;
       	dfOldIndexOfFirstTodo = dfOldIndexOfLastTodo - dfOldTodosPerPage;
       	if(deviceFundsOld===undefined || deviceFundsOld===null){
       		deviceFundsOld=[];
       	}
       	dfOldCurrentTodos=deviceFundsOld.slice(dfOldIndexOfFirstTodo, dfOldIndexOfLastTodo);

       	deviceIndexOfLastTodo = deviceCurrentPage * deviceTodosPerPage;
       	deviceIndexOfFirstTodo = deviceIndexOfLastTodo - deviceTodosPerPage;
       	deviceCurrentTodos = addedDevices.slice(deviceIndexOfFirstTodo, deviceIndexOfLastTodo);

		return (
				<Container fluid className='main-container'>
		          	<PleaseWait active={showDimmer} />
					<Navigation index={5}/>
					<Segment basic style={{padding:0, paddingTop:15, flex: 1}}>
						<Form size='small'>
							<Grid style={{paddingLeft:10}}>
								<StaticBlock5 custBrnNo={custBrnNo} companyName={brnInfo.portalCustInfo.companyName} prodCatName={prodCatName} masterRegId={masterRegId}
								 virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={totalMemberString}
								 maxLineCount={maxLineCount} masterReg={masterReg} contactMode={contactMode} masterRegStatus={masterRegStatus}/>
								<Grid.Row style={{paddingBottom:0, paddingLeft:0, paddingTop:20}}>
									<Grid.Column >
										<label style={{color:'#293895'}} className='heading'>Itemized Order Details</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingBottom:0}}>
									<Grid.Column width='8' >
										<label>Displaying {(deviceFunds.length===0) && (0) } {(deviceFunds.length>0) && (dfFirstIndexCurrentPage) }-{(dfFirstIndexCurrentPage-1)+dfCurrentTodos.length} / {deviceFunds.length}</label>
									</Grid.Column>
									<Grid.Column width='8' textAlign='right' style={{paddingRight:0}}>
										<label onClick={()=>this.handleClick('First')} style={{padding:3}} className='pointer'>First</label>
										<label onClick={()=>this.handleClick('Prev')} style={{padding:3}} className='pointer'>Prev</label>
                                        <label onClick={()=>this.handleClick('Next')} style={{padding:3}} className='pointer'>Next</label>
										<label onClick={()=>this.handleClick('Last')} style={{padding:3}} className='pointer'>Last</label>
										<label onClick={()=>this.handleClick('Last')} >({(deviceFunds.length===0) && (0)}{(deviceFunds.length>0) && (dfCurrentPage)} of { Math.ceil(deviceFunds.length / dfTodosPerPage) })</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingTop:0, paddingBottom:0}}>
									<Grid.Column width='16'>
										    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
											    <Table.Header>
											      <Table.Row>
											        <Table.HeaderCell style={{paddingLeft:0}}>MSISDN</Table.HeaderCell>
											        <Table.HeaderCell>Rate Plan</Table.HeaderCell>
											        <Table.HeaderCell>Contract</Table.HeaderCell>
											        <Table.HeaderCell>Period</Table.HeaderCell>
											        <Table.HeaderCell >Action</Table.HeaderCell>
											        <Table.HeaderCell>Fund Amount(RM)</Table.HeaderCell>
											        <Table.HeaderCell>Approval Amount(RM)</Table.HeaderCell>
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
														        <Table.Cell>
														        	{
														        		(deviceFund.contractName !== null && deviceFund.contractName.trim()!=='') && (<Icon className='dangerText' link name='edit' onClick={()=>this.openModal(deviceFund)}/> )
														        	}
														        	{deviceFund.approvalAmount}
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
											           <Table.HeaderCell></Table.HeaderCell>
											           <Table.HeaderCell></Table.HeaderCell>
											           <Table.HeaderCell ><label style={{color:'#293895'}} className='heading'>Total Fund(RM):</label></Table.HeaderCell>
											           <Table.HeaderCell><label style={{color:'#293895'}} className='heading'>{totalFundAmount}</label></Table.HeaderCell>
											           <Table.HeaderCell><label style={{color:'#293895'}} className='heading'>{totalApprovedAmount}</label></Table.HeaderCell>
											         </Table.Row>
											       </Table.Footer>
											  </Table>
									</Grid.Column>
								</Grid.Row>
								{
								(status==='FAILURE')&&
								<Message negative compact size='small' style={{minWidth: 400, marginLeft: 10}} onDismiss={()=>this.setState({status: 'DEFAULT'})}>

									<Message.Header>Error Encountered:</Message.Header>
									<p>{message}</p>
								</Message>
								}
								{(orderCategory==='Existing Group') && (
									<React.Fragment>
											<Grid.Row style={{paddingBottom:0, paddingLeft:0}}>
												<Grid.Column >
													<label style={{color:'#293895'}} className='heading'>Itemized Old Order Details</label>
												</Grid.Column>
											</Grid.Row>
											<Grid.Row style={{paddingBottom:0}}>
												<Grid.Column width='8' >
													<label>Displaying {(deviceFundsOld.length===0) && (0)}{(deviceFundsOld.length>0) && (dfOldFirstIndexCurrentPage)}-{(dfOldFirstIndexCurrentPage-1)+dfOldCurrentTodos.length} / {deviceFundsOld.length}</label>
                                                </Grid.Column>
												<Grid.Column width='8' textAlign='right' style={{paddingRight:0}}>
													<label onClick={()=>this.handleClickOld('First')} style={{padding:3}} className='pointer'>First</label>
													<label onClick={()=>this.handleClickOld('Prev')} style={{padding:3}} className='pointer'>Prev</label>
                                                    <label onClick={()=>this.handleClickOld('Next')} style={{padding:3}} className='pointer'>Next</label>
													<label onClick={()=>this.handleClickOld('Last')} style={{padding:3}} className='pointer'>Last</label>
													<label onClick={()=>this.handleClickOld('Last')} >({(deviceFundsOld.length===0) && (0) }{(deviceFundsOld.length>0) && (dfOldCurrentPage) } of { Math.ceil(deviceFundsOld.length / dfOldTodosPerPage) })</label>
												</Grid.Column>
											</Grid.Row>
											<Grid.Row style={{paddingTop:0}}>
												<Grid.Column width='16'>
													    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
														    <Table.Header>
														      <Table.Row>
														        <Table.HeaderCell style={{paddingLeft:0}}>MSISDN</Table.HeaderCell>
														        <Table.HeaderCell>Rate Plan</Table.HeaderCell>
														        <Table.HeaderCell>Contract</Table.HeaderCell>
														        <Table.HeaderCell>Period</Table.HeaderCell>
														        <Table.HeaderCell >Action</Table.HeaderCell>
														        <Table.HeaderCell>Fund Amount(RM)</Table.HeaderCell>
														        <Table.HeaderCell>Approval Amount(RM)</Table.HeaderCell>
														        <Table.HeaderCell>Existing Contract</Table.HeaderCell>
														        <Table.HeaderCell>CMSS Case id</Table.HeaderCell>
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
																	        <Table.Cell>
																	        	{deviceFund.approvalAmount}
																	        </Table.Cell>
																	        <Table.Cell>
																	        	  <Radio
																		            label='Terminate'
																		            name={deviceFund.radioAction}
																		            value='Terminate'
																		            checked={deviceFund.crpAction === 'Terminate'}
																		            onChange={this.handleChange}/>
																		           <Radio
																		            label='Terminate with Waiver'
																		            name={deviceFund.radioAction}
																		            value='Terminate with Waiver'
																		             checked={deviceFund.crpAction === 'Terminate with Waiver'}
																		            onChange={this.handleChange}/>
													       					</Table.Cell>
													       					<Table.Cell>
																	        	  <Input placeholder='CMSS ID'
																	        	  	name={deviceFund.cmssAction}
																	        	  	value={deviceFund.cmssText}
																	        	  	onChange={this.handleChangeText} />
													       					</Table.Cell>
																		   </Table.Row>
																	    )
																    })
															    }
														    </Table.Body>
														  </Table>
												</Grid.Column>
											</Grid.Row>
									</React.Fragment>
									)
								}
								<Grid.Row style={{paddingBottom:0, paddingLeft:0}}>
									<Grid.Column >
										<label style={{color:'#293895'}} className='heading'>Device Order Details</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingBottom:0,  paddingLeft:14}}>
									<Grid.Column width='8' style={{paddingLeft:0}}>
										<label>Displaying { (addedDevices.length===0) && (0) }{(addedDevices.length>0) && (deviceFirstIndexCurrentPage) }-{(deviceFirstIndexCurrentPage-1)+deviceCurrentTodos.length} / {addedDevices.length}</label>
									</Grid.Column>
									<Grid.Column width='8' textAlign='right' style={{paddingRight:0}}>
										<label onClick={()=>this.handleDeviceClick('First')} style={{padding:3}} className='pointer'>First</label>
										<label onClick={()=>this.handleDeviceClick('Prev')} style={{padding:3}} className='pointer'>Prev</label>
                                        <label onClick={()=>this.handleDeviceClick('Next')} style={{padding:3}} className='pointer'>Next</label>
										<label onClick={()=>this.handleDeviceClick('Last')} style={{padding:3}} className='pointer'>Last</label>
										<label onClick={()=>this.handleDeviceClick('Last')} >({ (addedDevices.length===0) && (0) }{(addedDevices.length>0) && deviceCurrentPage} of { Math.ceil(addedDevices.length / deviceTodosPerPage) })</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingTop:0, paddingBottom:0, paddingLeft:14}}>
									    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
										    <Table.Header>
										      <Table.Row>
										        <Table.HeaderCell style={{paddingLeft:0}}>Device Order No.</Table.HeaderCell>
										        <Table.HeaderCell>Device Model</Table.HeaderCell>
										        <Table.HeaderCell>Price (RM)</Table.HeaderCell>
										        <Table.HeaderCell>Eligible MSISDN</Table.HeaderCell>
												<Table.HeaderCell>Eligible FlexiFund Contract</Table.HeaderCell>
										        <Table.HeaderCell>Quantity</Table.HeaderCell>
										        <Table.HeaderCell >Delivery Status</Table.HeaderCell>
										        <Table.HeaderCell>Delivery Date</Table.HeaderCell>
										      </Table.Row>
										    </Table.Header>
										    <Table.Body style={{height:150}}>
										   	{deviceCurrentTodos.map((addedDevice,key) => {
							              				return (
													      <Table.Row key={key}>
													        <Table.Cell>{addedDevice.deviceOrderNo}</Table.Cell>
													        <Table.Cell>{addedDevice.deviceModel}</Table.Cell>
													        <Table.Cell>{addedDevice.deviceRRP}</Table.Cell>
															<Table.Cell>{addedDevice.contractMsisdn}</Table.Cell>
															<Table.Cell>{addedDevice.eligibleFlexiFundContract}</Table.Cell>
													        <Table.Cell>{addedDevice.quantity}</Table.Cell>
													        <Table.Cell>{addedDevice.deliveryStatus}</Table.Cell>
													        <Table.Cell>{addedDevice.deliveryDate}</Table.Cell>
													      </Table.Row>
													    )
												    })
											}
										    </Table.Body>
										    <Table.Footer>
										         <Table.Row>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell  style={{textAlign:'right'}}><label style={{color:'#293895'}} className='heading'>Total(RM):</label></Table.HeaderCell>
										           <Table.HeaderCell><label style={{color:'#293895'}} className='heading'>{totalPrice}</label></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell ><label style={{color:'#293895'}} className='heading'>{totalQuantity}</label></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										           <Table.HeaderCell></Table.HeaderCell>
										         </Table.Row>
										    </Table.Footer>
										  </Table>
								</Grid.Row>
								<StaticBlock4 totalPrice={totalPrice} totalQuantity={totalQuantity} deviceFundUsed={deviceFundUsed} deviceFundLeft={deviceFundLeft} totalFundAmount={totalApprovedAmount} amountPayable={amountPayable} tax={tax} orderCategory={orderCategory} previousFundAmount={previousFundAmount}  previousFundAmountLeft={previousFundAmountLeft} previousFundAmountUsed={previousFundAmountUsed} totalAdjAmount = {totalAdjAmount}/>
							</Grid>
						</Form>
					</Segment>
					<Segment basic  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:20}}>
						<SecondaryButton value='BACK' onClick={this.previous}/>
						<div style={{padding:10}}/>
						<PrimaryButton value='NEXT' onClick={this.next}/>
						<div style={{padding:10}}/>
						<SecondaryButton value='REJECT' onClick={this.reject}/>
						<div style={{padding:10}}/>
						<PrimaryButton value='PROCESSING' onClick={this.processing}/>
					</Segment>
					<FundOverride ref={this.fundOverride} onClose={(deviceFund,overrideAmount) => this.overrideFundAMount(deviceFund,overrideAmount)} />
				</Container>
			)
	}
}
const mapStateToProps = (state) => {
	return {
		registrationDetails: state.order.data.registrationDetails,
		FETCH_DEVICE_FUNDS_STATUS: state.configuration.meta.FETCH_DEVICE_FUNDS_STATUS,
		msisdnList:  state.order.data.msisdnList,
		deviceFunds: state.configuration.data.deviceFunds,
		deviceFundsOld: state.configuration.data.deviceFundsOld,
		addedFundDevices: state.configuration.data.addedFundDevices,
		totalQuantity: state.order.data.totalQuantity,
		deviceFundUsed: state.order.data.deviceFundUsed,
		deviceFundLeft: state.order.data.deviceFundLeft,
		amountPayable: state.order.data.amountPayable,
		tax: state.order.data.tax,
		easMasterRegId:state.order.data.easMasterRegId,
		GET_ADDED_FUND_DEVICES_STATUS:state.configuration.meta.GET_ADDED_FUND_DEVICES_STATUS,
		totalApprovedAmount:state.order.data.totalApprovedAmount,
		SET_DEVICE_FUND_STATUS:state.order.meta.SET_DEVICE_FUND_STATUS,
		brnInfo: state.order.data.brnInfo,
		previousFundAmount:state.order.data.previousFundAmount,
		previousFundAmountUsed:state.order.data.previousFundAmountUsed,
		previousFundAmountLeft:state.order.data.previousFundAmountLeft,
		orderCategory:state.order.data.orderCategory,
		previousFundAmountInitial:state.order.data.previousFundAmountInitial
	}
}

const mapDispatchToProps = {
	getDeviceFunds,
	getAddedFundDevices,
	setDeviceFundInfo,
	setApprovalDeviceFunds,
	setApprovalFunds,
	setOldDeviceFunds

}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceFund)
