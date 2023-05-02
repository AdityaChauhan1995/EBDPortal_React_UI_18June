import React, { Component } from 'react';
import { Grid, Segment, Container, Icon, Form, Message, Button, Dropdown, Input } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';


import { StaticBlock5 } from '../../components/common/dumb-component';
import { connect } from 'react-redux';
/*import {  getDeviceFundContracts } from '../../redux/actions/configuration';*/
import { setProductOrderInfo, setMsisdnDetails, getFundAmount } from '../../redux/actions/order';
import VasAction from './vas-action'
import { PleaseWait } from '../../components/common/dimmer';


class ProductOrder extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/device-fund?mode=Approval",
			processingUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
			rejectUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
			nextUrlAddVas: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
			todos: props.msisdnList,
			currentPage: 1,
			todosPerPage: 10,
			lastPage: null,
			indexOfLastTodo: null,
			indexOfFirstTodo: null,
			currentTodos: null,
			pageNumbers: [],
			firstIndexCurrentPage: 1,
			lastIndexCurrentPage: 1,
			showDimmer: false,
			validationResult: {
				status: 'SUCCESS',
				message: '',
			},
			deviceFulfillmentoptions:props.deviceFulfillmentoptions,
			deviceFulfillment : props.deviceFulfillment,
			flexiFundDevices:0,
			zerolutionDevices:0,
			msisdnsBarred:'',
			acctBarred:false
			//topupByDealer: props.topupByDealer
		};
		this.vasAction = React.createRef();
	}
	componentDidMount() {
		//console.log('topupBydealer:',this.props.msisdnList[0].fulfillmentbyTradePartner);
		let fulfillmentbyTradePartner=false;
		let msisdnsBarred ='';
		this.props.msisdnList.map((line,key)=>{
			if(line.fulfillmentbyTradePartner == true)
				fulfillmentbyTradePartner =true;
			if(line.acctBarred==true){
				msisdnsBarred = msisdnsBarred+line.mobileInfo.mobileNo+', ';
			}
		})
		if(fulfillmentbyTradePartner == true)
		{
             this.setState({deviceFulfillment:'Fulfillment by Trade Partner'});
		}else{
			this.setState({deviceFulfillment:'Device delivery by Brightstar'});
		}
		if(msisdnsBarred!=''){
			this.setState({ validationResult: { status: 'FAILURE', message: msisdnsBarred.substring(0,msisdnsBarred.length-2)+' is Barred/Suspended in Kenan. Cannot approve the order' } ,
			acctBarred:true});
		}
		let { virtualServiceNo, prodCatName } = this.props.registrationDetails;
		let { easMasterRegId }=this.props;
		if(prodCatName!==undefined && prodCatName==='Existing Group'){
			this.props.getFundAmount(virtualServiceNo, easMasterRegId,'APPROVAL_MODE');
		}
	}
	componentWillReceiveProps(nextProps) {
	/*	if (this.props.FETCH_LINE_DETAILS_STATUS !== 'SUCCESS' && nextProps.FETCH_LINE_DETAILS_STATUS === 'SUCCESS') {
			this.setState({ showDimmer: false, todos: nextProps.msisdnList });
		}
		else if (this.props.FETCH_LINE_DETAILS_STATUS !== 'FAILED' && nextProps.FETCH_LINE_DETAILS_STATUS === 'FAILED') {
			this.setState({ showDimmer: false, validationResult: { status: 'FAILURE', message: 'Faced some issue in fetching data' } });
		}*/
		if(this.props.SET_PRODUCT_ORDER_STATUS!=='SUCCESS' && nextProps.SET_PRODUCT_ORDER_STATUS==='SUCCESS'){
			//this.props.getDeviceFundContracts(this.props.easMasterRegId, '34');
			let tempNextURL ='';
			let { prodCatName} = this.props.registrationDetails;
		 	if(prodCatName === 'Existing Group- Add VAS'){
				tempNextURL=this.state.nextUrlAddVas;
			}
			else{
				tempNextURL= this.state.nextUrl;
			}
				tempNextURL += "&action=approved&easMasterRegId=" + this.props.easMasterRegId;
				this.props.history.push(tempNextURL);
			
		}
	 	/*else if (this.props.GET_DEVICE_FUND_CONTRACTS_STATUS !== 'SUCCESS' && nextProps.GET_DEVICE_FUND_CONTRACTS_STATUS === 'SUCCESS') {
			let tempNextURL = this.state.nextUrl;
			tempNextURL += "&action=approved&easMasterRegId=" + nextProps.easMasterRegId;
			this.props.history.push(tempNextURL);
		}
		else if (this.props.GET_DEVICE_FUND_CONTRACTS_STATUS !== 'FAILED' && nextProps.GET_DEVICE_FUND_CONTRACTS_STATUS === 'FAILED') {
			this.setState({ showDimmer: false });
		}*/
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

	next = () => {
		let msisdnList=this.state.todos; 
		let deviceFulfillment= this.state.deviceFulfillment;
		let acctBarred = this.state.acctBarred;
		let isPendingActionDone=true;
		let availedFundByodContract = false;
		let availedFundByodContractMsisdn = '';
		msisdnList.filter((currentRow)=>{
			if (currentRow.regType==='Member Transfer' && 
				currentRow.pendingActionContracts.componentPackageInfoList !== null ||
				  currentRow.pendingActionContracts.componentPackageInfoList.length >0){
					if( currentRow.extistingFundByodContract && currentRow.pendingActionContracts.commonList !== null){
						for(var i=0;i<currentRow.pendingActionContracts.commonList.length;i++){
							if ( Number(currentRow.pendingActionContracts.commonList[i].componentId) === Number(currentRow.extistingFundByodContractCompId) 
								&& currentRow.pendingActionContracts.commonList[i].fs2Action === 'Keep'){
									availedFundByodContract = true;
									availedFundByodContractMsisdn = currentRow.mobileInfo.mobileNo;
							}
					}
				}
			}
			if((currentRow.regType==='Non Member Transfer' || currentRow.regType==='Member Transfer' || currentRow.regType==='Contract Renewal') && currentRow.isPendingActionDone==='False'){
				isPendingActionDone=false;
				return;
			}
		})
		if(!isPendingActionDone){
			this.setState({ validationResult: { status: 'FAILURE', message: 'Please perform all pending actions before proceeding with order' } });
			return;
		}
		if(availedFundByodContract){
			this.setState({ validationResult: { status: 'FAILURE', message: availedFundByodContractMsisdn + ' already has a Fund/Byod Contract hence can not keep another Fund/Byod contract' } });
			return;
		}
		this.setState({ showDimmer: true });
		this.props.setProductOrderInfo(null, null, null, null, null, null, null, null, null, null, null, msisdnList, null, null, null,null,deviceFulfillment,null,acctBarred);
	}
	previous = () => {
		this.props.history.goBack();
	}
	processing = () => {
		let tempNextURL = this.state.processingUrl;
		tempNextURL += "&action=processing&easMasterRegId=" + this.props.easMasterRegId;
		this.props.history.push(tempNextURL);
		this.props.history.push(tempNextURL);
	}
	reject = () => {
		let tempNextURL = this.state.rejectUrl;
		tempNextURL += "&action=rejected&easMasterRegId=" + this.props.easMasterRegId;
		this.props.history.push(tempNextURL);
	}
	openModal = (vasList, msisdnNo, ratePlanName, commonList, uncommonList, type, prematurePenalty, regType) => {
		this.vasAction.current.show(vasList, msisdnNo, ratePlanName, commonList, uncommonList, type, prematurePenalty, regType);
	}
	vasActionOnClose(type, commonList, mobileNo, isPendingActionDone, prematurePenalty) {
		console.log(commonList);
		if((type==='PENDING ACTION' || type==='RESET ACTION') && isPendingActionDone){
			if(commonList!=null && commonList.length>0){
				let tempToDos=this.state.todos.map((line)=>{
					if(line.mobileInfo.mobileNo===mobileNo){
						return {
							...line,
							pendingActionContracts:{...line.pendingActionContracts,commonList: commonList},
							isPendingActionDone:'True',
							prematurePenalty:prematurePenalty
						}
					}
					return line;
				})
				this.setState({todos:tempToDos });
				this.props.setMsisdnDetails(tempToDos);
			}
			if(commonList!=null && commonList.length===0){
				let tempToDos=this.state.todos.map((line)=>{
					if(line.mobileInfo.mobileNo===mobileNo){
						return {
							...line,
							isPendingActionDone:'True',
							prematurePenalty:prematurePenalty
						}
					}
					return line;
				})
				this.setState({todos:tempToDos });
				this.props.setMsisdnDetails(tempToDos);
			}
		}
		this.setState({validationResult:{}});
	}

	handleDeviceFulfillment = ( name, value ) =>{
		
		if(name.includes('topupByDealer')){
			
			const tempMobileNo = name.substring(13,name.length);
			let tempTodos = this.state.todos;
			tempTodos.map((x) => {
				if(x.mobileInfo.mobileNo===tempMobileNo){
					x.topupByDealer = value;
				}		
			});
			console.log('tempTodos',tempTodos);
			this.setState({todos:tempTodos});
		}
	}

	handleChange = (e, { name, value }) => {
		
		this.setState({ [name]: value });
		}
	
	render() {
		let {
			todos,
			currentPage,
			todosPerPage,
			indexOfLastTodo,
			indexOfFirstTodo,
			currentTodos,
			firstIndexCurrentPage,
			lastIndexCurrentPage,
			showDimmer,
			deviceFulfillmentoptions,
			flexiFundDevices,
			zerolutionDevices
			} = this.state;
		let { custBrnNo, masterRegStatus, contactMode, virtualServiceNo, easPackageName,
			totalMembers, maxLineCount, masterReg, masterRegId, prodCatName, totalMemberString } = this.props.registrationDetails;
		let { status, message } = this.state.validationResult;
		let { brnInfo,user } = this.props;
		let {deviceFulfillment, topupByDealer} = this.props;
		indexOfLastTodo = currentPage * todosPerPage;
		indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
		todos.map((line,key)=>{
			console.log(line.ratePlanName);
			if(line.ratePlanName!==null && (line.ratePlanName.includes('24 Mths Contract') || line.ratePlanName.includes('BYOD')))
			{
				flexiFundDevices +=1;
			}else{
				if(line.lineDeviceInfo!==null && line.lineDeviceInfo !== undefined)
				zerolutionDevices+=1;
			};
		})
		const TableHeader = () => {
			let { prodCatName } = this.props.registrationDetails;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
				{(prodCatName!=='Existing Group- Add VAS') && (
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
						<Grid.Column width={3} style={{ paddingRight: 0 }}>
							<label className='heading'>VAS/Contract</label>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<div><label className='heading'>Line Status</label></div>
							<div><label className='heading'>Device Status</label></div>
						</Grid.Column>
					</React.Fragment>
							)
				}
				{(prodCatName==='Existing Group- Add VAS') && (
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
			const { regId, regType, deliveryNo, mobileInfo, lineStatus, deviceStatus, ratePlanName, pendingActionContracts, isPendingActionDone, prematurePenalty, addOnVal } = line;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
						<div>{regId}</div>
						<div>{regType}</div>
					</Grid.Column>
				{(prodCatName!=='Existing Group- Add VAS') && (
					<React.Fragment>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
								{
										(line.lineDeviceInfo!==null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null) && (
												<div>{line.lineDeviceInfo.deliveryNo}</div>
											)
								}
								</Grid.Column>
								<Grid.Column width={3} style={{ paddingRight: 0 }}>
									<div><Icon name='phone' />{mobileInfo.mobileNo}</div>
									<div><Icon name='credit card' />{mobileInfo.sim}</div>
									<div><Icon name='id card outline' />{mobileInfo.simType}</div>
									{/*<div><Icon name='id card outline' />{mobileInfo.donorAccountNo}</div>
			       					<div><Icon name='id card outline' />{mobileInfo.donorType}</div>*/}
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									<div>{ratePlanName}</div>
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									{
										(line.lineDeviceInfo!==null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null) && (
											<React.Fragment>
												<div style={{ margin: 0 }}>Device Model :{line.lineDeviceInfo.phoneModel}</div>
												<div style={{ margin: 0 }}>RRP(RM) :{line.lineDeviceInfo.deviceRrp}</div>
												<div style={{ margin: 0 }}>Monthly Installments(RM) :{line.lineDeviceInfo.monthlyInstallment}</div>
												<div style={{ margin: 0 }}>No of Installments :{line.lineDeviceInfo.noOfInstallments}</div>
												{
													(line.lineDeviceInfo.isPremiumDeviceProtection === 'Yes') &&
													<div style={{ margin: 0 }}>Safe Device :{line.lineDeviceInfo.safeDeviceMnthlyChrg}</div>
												}
												{
													(line.lineDeviceInfo.isPremiumDeviceProtection !== 'Yes') &&
													<div style={{ margin: 0 }}>Safe Device :{line.lineDeviceInfo.isPremiumDeviceProtection}</div>
												}
											</React.Fragment>
										)
									}
									{
										(ratePlanName!==null && ratePlanName.includes('24 Mths Contract')) && (
											<React.Fragment>
												<div style={{ margin: 0 }}>Device Contract</div>
											</React.Fragment>
										)
									}
									{
										(ratePlanName!==null && ratePlanName.includes('BYOD')) && (
											<React.Fragment>
												<div style={{ margin: 0 }}>BYOD Contract</div>
											</React.Fragment>
										)
									}
								</Grid.Column>
								<Grid.Column width={3} style={{  paddingRight: 33 }}>
								{((regType==='Non Member Transfer' || regType==='Member Transfer' || regType==='Contract Renewal') && (isPendingActionDone==='False' || isPendingActionDone===null)) && 
									<SecondaryButton fluid compact value='PENDING ACTION' onClick={() => { this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.uncommonList, 'PENDING ACTION',prematurePenalty, regType) }} />
								}
								{((regType==='Non Member Transfer' || regType==='Member Transfer' || regType==='Contract Renewal') && isPendingActionDone==='True') && 
									<React.Fragment>
										<SecondaryButton fluid compact value='RESET ACTION' onClick={() => { this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.uncommonList, 'RESET ACTION', prematurePenalty, regType) }} />
										<div style={{ padding: 10 }} />
										<Button
										  basic
										  style={{height:28}}
										  fluid
										  compact
										  onClick={() => { this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.uncommonList, 'VIEW', prematurePenalty, regType) }} >
										  <b>VIEW</b>
										</Button>
									</React.Fragment>
								}
								{(regType!=='Non Member Transfer' && regType!=='Member Transfer'  && regType!=='Change Subscription' &&   regType!=='Contract Renewal')  && 
									<Button
									  basic
									  style={{height:28}}
									  fluid
									  compact
									  onClick={() => { this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.uncommonList, 'VIEW', regType) }} >
									  <b>VIEW</b>
									</Button>
								}
								</Grid.Column>
								<Grid.Column width={2} style={{ paddingRight: 0 }}>
									<div>{lineStatus}</div>
									{(line.lineDeviceInfo.status!==null) && 
										<div>{line.lineDeviceInfo.status}</div>
									}
								</Grid.Column>
						</React.Fragment>		
						)
				}
				{(prodCatName==='Existing Group- Add VAS') && (
					<React.Fragment>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<div><Icon name='phone' />{mobileInfo.mobileNo}</div>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<div>{ratePlanName}</div>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
							{ (regType!=='Change Subscription' && regType!=='Group Level Add-On') &&
									<Button
									  basic
									  style={{height:28}}
									  fluid
									  compact
									  onClick={() => { this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.uncommonList, 'VIEW', regType) }} >
									  <b>VIEW</b>
									</Button>
							}
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
				</Grid.Row>
			)
		}
		//console.log(this.state.deviceFulfillment)
		const DeviceFulfillmentDrop = () => {
	 return (
		    <Grid.Row >
				<React.Fragment>
					<Grid.Column width='6' style={{ paddingRight: 0 }}>
						<Form.Field >
							<label style={{fontWeight: 'bold'}}>Device Fulfillment Option</label>
							<Dropdown placeholder='Please select' size='small' 
							          options={this.props.deviceFulfillmentoptions}
							           value={this.state.deviceFulfillment}
							          name='deviceFulfillment' fluid disabled/>
						</Form.Field>
					</Grid.Column>
				</React.Fragment>
			</Grid.Row>
	      )
		}
		
		const DeviceFulfillmentTableHeader = () => {
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
				{(
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
			var inputName = 'topupByDealer'+ line.mobileInfo.mobileNo;
			console.log(line.lineDeviceInfo)
			return (
				<React.Fragment>	
				{(line.lineDeviceInfo.deviceId!==null) &&(
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 8 }}>	
							<Grid.Column width={14} style={{ paddingRight: 0 }}>
								{(
									line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined) && (
												<React.Fragment>
													<div><Icon name='mobile' />{line.lineDeviceInfo.phoneModel}</div>
													<div><Icon name='phone' />{line.mobileInfo.mobileNo}</div>	
												</React.Fragment>
								)}
								{(
									line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined  && line.lineDeviceInfo.phoneModel === undefined) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>{line.lineDeviceInfo}</div>
													<div><Icon name='phone' />{line.mobileInfo.mobileNo}</div>
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
										  name={inputName} disabled/>
								</Grid.Column>	
							  </React.Fragment>
							)}

                            {(this.state.deviceFulfillment ==='Device delivery by Brightstar') && (
								<React.Fragment>	
								<Grid.Column width={2} style={{ paddingRight: 0}}>
								   <Input placeholder='0' type='number' 
										  value={line.topupByDealer!=null?line.topupByDealer:0.00}
										  onChange={this.handleChange}
										  style={{width:'100px',paddingLeft:'30px'}}
										  name={inputName} disabled/>
								</Grid.Column>	
							  </React.Fragment>
							)}	
				</Grid.Row>
				)}
				</React.Fragment>
			)
		}
		return (
			<Container fluid className='main-container'>
				<PleaseWait active={showDimmer} />
				<Navigation index={4} />
				<Segment basic style={{ padding: 0, paddingTop: 15, flex: 1 }}>
					<Form size='small'>
						<Grid style={{ paddingLeft: 10 }}>
							<StaticBlock5 custBrnNo={custBrnNo} prodCatName={prodCatName} companyName={brnInfo.portalCustInfo.companyName} masterRegId={masterRegId}
								virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={totalMemberString}
								maxLineCount={maxLineCount} masterReg={masterReg} contactMode={contactMode} masterRegStatus={masterRegStatus} />
							<Grid.Row style={{ paddingBottom: 0, paddingLeft: 0, paddingTop: 50 }}>
								<Grid.Column width='8' style={{ paddingLeft: 0 }}>
									<label>Displaying {(todos.length === 0) && (0)}{(todos.length > 0) && (firstIndexCurrentPage)}-{(firstIndexCurrentPage - 1) + currentTodos.length} / {todos.length}</label>
								</Grid.Column>
								<Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
									<label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='pointer'>First</label>
                                    <label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='pointer'>Prev</label>
									<label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='pointer'>Next</label>
									<label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='pointer'>Last</label>
									<label onClick={() => this.handleClick('Last')} >({(todos.length === 0) && (0)} {(todos.length > 0) && (currentPage)} of {Math.ceil(todos.length / todosPerPage)})</label>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
					{
						(status === 'FAILURE') &&
						<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
							onDismiss={() => this.setState({ validationResult: {} })}>
							<Message.Header>We have encounted some errors.</Message.Header>
							<p>{message}</p>
						</Message>
					}
					<Grid style={{ fontSize: 11, padding: 10 }}>
						<TableHeader />
						{currentTodos.map((line, key) => {
							return (
								<TableRow key={key} line={line} />
							)
						})}
					{(flexiFundDevices!==todos.length && (user.isRealTimeUser===true||user.isRealTimeUser==='true'))&&
                        <DeviceFulfillmentDrop
							  deviceFulfillment={deviceFulfillment}
							  deviceFulfillmentoptions={deviceFulfillmentoptions}
					/>}
                        {(flexiFundDevices!==todos.length && (user.isRealTimeUser===true||user.isRealTimeUser==='true'))&&
						<DeviceFulfillmentTableHeader />}
						
						{(user.isRealTimeUser===true||user.isRealTimeUser==='true') &&
							currentTodos.map((line,key) => {
								return (
									<DeviceFulfillmentTableRow key={key} line={line}/>
								)
							})
						}
					</Grid>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
					<SecondaryButton value='BACK' onClick={this.previous} />
					<div style={{ padding: 10 }} />
					<PrimaryButton value='NEXT' onClick={this.next} />
					<div style={{ padding: 10 }} />
					<SecondaryButton value='REJECT' onClick={this.reject} />
					<div style={{ padding: 10 }} />
					<PrimaryButton value='PROCESSING' onClick={this.processing} />
				</Segment>
				<VasAction ref={this.vasAction} onClose={(type, commonList, mobileNo, isPendingActionDone, prematurePenalty) => this.vasActionOnClose(type, commonList, mobileNo, isPendingActionDone, prematurePenalty)} />
			</Container>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		registrationDetails: state.order.data.registrationDetails,
		msisdnList: state.order.data.msisdnList,
		FETCH_LINE_DETAILS_STATUS: state.configuration.meta.FETCH_LINE_DETAILS_STATUS,
		GET_DEVICE_FUND_CONTRACTS_STATUS: state.configuration.meta.GET_DEVICE_FUND_CONTRACTS_STATUS,
		easMasterRegId: state.order.data.easMasterRegId,
		brnInfo: state.order.data.brnInfo,
		SET_PRODUCT_ORDER_STATUS: state.order.meta.SET_PRODUCT_ORDER_STATUS,
		deviceFulfillment:state.order.data.deviceFulfillment,
		topupByDealer: state.order.data.topupByDealer,
		deviceFulfillmentoptions:state.configuration.data.deviceFulfillmentoptions,
		user: state.user.data
	}
}

const mapDispatchToProps = {
	/*getDeviceFundContracts,*/
	setProductOrderInfo,
	setMsisdnDetails,
	getFundAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)
