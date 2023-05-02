import React, { Component } from 'react';
import { Grid, Segment, Container, Icon, Form, Table, Input} from "semantic-ui-react";
import  Navigation  from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock5, StaticBlock6 } from '../../components/common/dumb-component';
import { connect } from 'react-redux';
import { getDeviceFunds, getAddedFundDevices, setDeviceFunds } from '../../redux/actions/configuration';
import { setDeviceFundInfo } from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';


class DeviceFund extends Component {
	constructor(props) {
	  super(props);
	  const {url} = this.props.match;
	  this.state = {
	  	nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=View",
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
		validationResult: {
		  status: 'SUCCESS',
		  message: '',
		},
		showDimmer:false,
		previousFundAmountUsed:props.previousFundAmountUsed,
		previousFundAmount:props.previousFundAmount,
		previousFundAmountLeft:props.previousFundAmountLeft,
		totalAdjAmount:0
	  };
	}
	componentDidMount(){
		this.setState({ showDimmer: true });
		let { totalApprovedAmount,totalFundAmount }=this.state;
		this.props.deviceFunds.map((currentDeviceFund)=>{
					if(currentDeviceFund.contractName!==null && currentDeviceFund.contractName.trim()!==''){
						if(totalApprovedAmount===undefined){
							totalApprovedAmount=0;
						}
						totalApprovedAmount+=parseFloat(currentDeviceFund.approvalAmount);
						totalFundAmount+=parseFloat(currentDeviceFund.fundAmount);
					}
			});
		this.setState({deviceFunds:this.props.deviceFunds, isReady:true, totalFundAmount: totalFundAmount, totalApprovedAmount: totalApprovedAmount});
		//fetch device details
		this.props.getAddedFundDevices(this.props.easMasterRegId);
	}

	componentWillReceiveProps(nextProps){

		if(this.props.GET_ADDED_FUND_DEVICES_STATUS!=='SUCCESS' &&
			nextProps.GET_ADDED_FUND_DEVICES_STATUS==='SUCCESS'){
				let { totalFundAmount, totalApprovedAmount,previousFundAmount, previousFundAmountLeft, previousFundAmountUsed }=this.state;
				let tempTotalPrice=0;
				let tempTotalQuantity=null;
				let fundAmountUsed=0;
				let fundAmountLeft=0;
				let amountPayable=0;
				let adjAmountExisting =0;
				let adjAmountCurrent = 0;
				let {deviceFunds} = this.props;

				nextProps.addedFundDevices.map((currentDevice)=>{
					tempTotalPrice+=parseFloat(currentDevice.deviceRRP)
					tempTotalQuantity+=parseInt(currentDevice.quantity)

					adjAmountCurrent+= (currentDevice.adjAmount!= null && currentDevice.adjAmount!= undefined)?
						parseFloat(currentDevice.adjAmount):
						0;

			/*		if(deviceFunds != undefined && deviceFunds != null && deviceFunds.length>0){
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
								adjAmountExisting+=parseFloat(currentDevice.adjAmount)
							}
						}
					}*/
				})

				let totalAdjAmount= adjAmountCurrent;
		/*		if(this.props.orderCategory!==undefined && this.props.orderCategory==='Existing Group' ){
					if(previousFundAmount!==undefined && parseFloat(previousFundAmount) >=0){
						previousFundAmount = previousFundAmount;
						totalApprovedAmount = totalApprovedAmount;
						totalFundAmount = totalFundAmount + adjAmountCurrent;
						previousFundAmountLeft=previousFundAmount-tempTotalPrice;
						if(parseFloat(previousFundAmountLeft)<=0){
							previousFundAmountUsed=previousFundAmount;
							previousFundAmountLeft=0;
							amountPayable=tempTotalPrice-previousFundAmount;
							fundAmountLeft=totalApprovedAmount-amountPayable;
							if(parseFloat(fundAmountLeft)<=0){
								fundAmountUsed=totalApprovedAmount;
								fundAmountLeft=0;
								amountPayable=tempTotalPrice-(totalApprovedAmount+previousFundAmount);
							}
							else{
								fundAmountUsed=tempTotalPrice-previousFundAmount;
								amountPayable=0;
							}
						}
						else{
							previousFundAmountUsed=tempTotalPrice;
							fundAmountLeft=totalApprovedAmount;
						}
					}
				}*/
		if(this.props.orderCategory!==undefined && this.props.orderCategory==='Existing Group' ){
		if(previousFundAmount!==undefined && parseFloat(previousFundAmount) >=0){
				previousFundAmount = previousFundAmount;
				totalApprovedAmount = totalApprovedAmount;
				totalFundAmount = totalFundAmount;
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
	}else{
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
            fundAmountUsed = tempTotalPrice;
            if(parseFloat(adjAmountCurrent)>0) {
                fundAmountLeft += adjAmountCurrent;
            }
	    }
	}
			/*	else{
					totalFundAmount = totalFundAmount + adjAmountCurrent;
					totalApprovedAmount = totalApprovedAmount + adjAmountCurrent;
					fundAmountLeft=totalApprovedAmount-tempTotalPrice;
				    if(parseFloat(fundAmountLeft)<=0){
				    	if(totalApprovedAmount!=null){
				    		fundAmountUsed=totalApprovedAmount;
				    	}
				    	else{
				    		fundAmountUsed=totalApprovedAmount;
				    	}
				    	fundAmountLeft=0;
				    	if(totalApprovedAmount!=null){
				    		amountPayable=tempTotalPrice-totalApprovedAmount;
				    	}
				    	else{
				    		amountPayable=tempTotalPrice-totalApprovedAmount;
				    	}
				    }
				    else{
				    	fundAmountUsed=tempTotalPrice;
				    }
				}*/
				this.setState({addedDevices:nextProps.addedFundDevices, totalPrice:tempTotalPrice,totalQuantity:tempTotalQuantity,
					totalFundAmount:totalFundAmount,previousFundAmount:previousFundAmount,totalApprovedAmount:totalApprovedAmount,
					 deviceFundUsed: fundAmountUsed,deviceFundLeft: fundAmountLeft ,amountPayable: amountPayable ,tax:0,
					 showDimmer:false,previousFundAmountUsed:previousFundAmountUsed,previousFundAmountLeft:previousFundAmountLeft, totalAdjAmount: totalAdjAmount});
		}
		else if(this.props.SET_DEVICE_FUND_STATUS!=='SUCCESS' &&
				nextProps.SET_DEVICE_FUND_STATUS==='SUCCESS'){
				this.props.setDeviceFunds(this.state.deviceFunds);
		}
		else if(this.props.SET_DEVICE_FUNDS_STATUS !=='SUCCESS' &&
				nextProps.SET_DEVICE_FUNDS_STATUS==='SUCCESS'){
				let tempNextURL=this.state.nextUrl;
				tempNextURL+="&easMasterRegId="+nextProps.easMasterRegId;
				this.props.history.push(tempNextURL);
		}
	}

	next=()=>{

		let { msisdnList }=this.props;
		let { addedDevices, totalFundAmount, amountPayable, tax , totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, totalApprovedAmount }=this.state;
		let fundDeviceList=[];
		let fundSummary='';
		fundSummary={noOfDevice:totalQuantity,totalAmount:totalFundAmount,payableAmount:amountPayable,tax:tax,totalRRP:totalPrice};
		msisdnList= msisdnList.map(currentRow => {
			let tempFundAmount=0;
				return {...currentRow,contractInfo:this.props.deviceFunds.map((currentDeviceFund)=>{
						if(currentDeviceFund.msisdn===currentRow.mobileInfo.mobileNo){
								return {contractName:currentDeviceFund.contractName, contractId:'233',deviceFund:currentDeviceFund.fundAmount,status:'Pending Approval', approvedAmount:currentDeviceFund.approvalAmount, fundId:currentDeviceFund.fundId};
						}
				})
				,fundAmount:tempFundAmount
			}
		})
		this.props.setDeviceFundInfo(fundDeviceList,fundSummary,msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount);
	}
	previous=()=>{
		this.props.history.goBack();
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
				totalAdjAmount
			}=this.state;
		let { custBrnNo, prodCatName,masterRegId,masterRegStatus, contactMode, virtualServiceNo, easPackageName, totalMemberString,totalMembers, maxLineCount, masterReg  }=this.props.registrationDetails;
		let { brnInfo, orderCategory }=this.props;
		if(deviceFunds===undefined){
			deviceFunds=[];
		}
		dfIndexOfLastTodo = dfCurrentPage * dfTodosPerPage;
       	dfIndexOfFirstTodo = dfIndexOfLastTodo - dfTodosPerPage;
       	dfCurrentTodos = deviceFunds.slice(dfIndexOfFirstTodo, dfIndexOfLastTodo);

       	dfOldIndexOfLastTodo = dfOldCurrentPage * dfOldTodosPerPage;
       	dfOldIndexOfFirstTodo = dfOldIndexOfLastTodo - dfOldTodosPerPage;
       	if(deviceFundsOld===undefined){
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
								<Grid.Row style={{paddingBottom:0, paddingTop:20}}>
									<Grid.Column >
										<label style={{color:'#293895'}} className='heading'>Device Order Details</label>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={{paddingBottom:0,  paddingLeft:14}}>
									<Grid.Column width='8' style={{paddingLeft:0}}>
                                        <label>Displaying { (addedDevices.length===0) && (0) } {(addedDevices.length>0) && (deviceFirstIndexCurrentPage) }-{(deviceFirstIndexCurrentPage-1)+deviceCurrentTodos.length} / {addedDevices.length}</label>
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
								<StaticBlock6 totalPrice={totalPrice} totalQuantity={totalQuantity} deviceFundUsed={deviceFundUsed} deviceFundLeft={deviceFundLeft} totalFundAmount={totalApprovedAmount} amountPayable={amountPayable} tax={tax} orderCategory={orderCategory} previousFundAmount={previousFundAmount}  previousFundAmountLeft={previousFundAmountLeft} previousFundAmountUsed={previousFundAmountUsed} totalAdjAmount={totalAdjAmount}/>
							</Grid>
						</Form>
					</Segment>
					<Segment basic  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:20}}>
						<SecondaryButton value='BACK' onClick={this.previous}/>
						<div style={{padding:10}}/>
						<PrimaryButton value='NEXT' onClick={this.next}/>
					</Segment>
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
		SET_DEVICE_FUNDS_STATUS:state.configuration.meta.SET_DEVICE_FUNDS_STATUS,
		brnInfo: state.order.data.brnInfo,
		previousFundAmount:state.order.data.previousFundAmount,
		previousFundAmountUsed:state.order.data.previousFundAmountUsed,
		previousFundAmountLeft:state.order.data.previousFundAmountLeft,
		orderCategory:state.order.data.orderCategory
	}
}

const mapDispatchToProps = {
	getDeviceFunds,
	getAddedFundDevices,
	setDeviceFundInfo,
	setDeviceFunds
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceFund)
