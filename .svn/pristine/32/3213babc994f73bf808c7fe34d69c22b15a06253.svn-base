import React, { Component } from 'react';
import { Grid, Segment, Container, Icon, Form, Message,Checkbox,Input } from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';


import { StaticBlock5,StaticBlock11 } from '../../components/common/dumb-component';
import { connect } from 'react-redux';
import { getDeviceFundContracts } from '../../redux/actions/configuration';
import { getFundAmount } from '../../redux/actions/order';
import VasAction from './vas-action'
import { PleaseWait } from '../../components/common/dimmer';
import NewBizAddress from '../submission/new-biz-address';

class ProductOrder extends Component {
	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			nextUrl: url.substring(0, url.lastIndexOf("/")) + "/device-fund?mode=View",
		//	nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=View",
			nextUrlAddVas: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=View",
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
			isBizAddress: false,
			open: false,
			installationAddress: props.installationAddress,
			totalDeviceTopUp:0,
			obsDevicesCount :0,
			zerolutionRTFDevices : 0,
			zerolutionNRTFDevices:0
		};
		this.vasAction = React.createRef();
		this.newBizAddress = React.createRef();
	}
	componentDidMount() {
		let { virtualServiceNo, prodCatName,isZerolutionRTF } = this.props.registrationDetails;
		let { easMasterRegId ,msisdnList} = this.props;
		if (prodCatName !== undefined && prodCatName === 'Existing Group') {
			this.props.getFundAmount(virtualServiceNo, easMasterRegId,'VIEW_MODE');
		}
		if(msisdnList !== null){
			let tempTotalDeviceTopUp = 0;
			var tempObsDevicesCount = 0;
			var tempRTFDeviceCount = 0;
			var tempNRTFDeviceCount = 0; 
			for(var i=0;i<msisdnList.length;i++){
				if(msisdnList[i].lineDeviceInfo !== undefined && msisdnList[i].lineDeviceInfo !== null){
					tempTotalDeviceTopUp += msisdnList[i].lineDeviceInfo.deviceTopUp;
				}
				if(msisdnList[i].lineDeviceInfo !== undefined && msisdnList[i].lineDeviceInfo !== null
					&& msisdnList[i].lineDeviceInfo.phoneModel !== null){
						if(msisdnList[i].deviceContract==='Zerolution'){

							if(isZerolutionRTF)
								tempRTFDeviceCount++;
							else
								tempNRTFDeviceCount++;
						}else if(msisdnList[i].deviceContract === 'OBS Device Contract' || msisdnList[i].deviceContract === '1L1P Contract'){
							tempObsDevicesCount++;
						}
					}
			}
			this.setState({totalDeviceTopUp:tempTotalDeviceTopUp,obsDevicesCount:tempObsDevicesCount,zerolutionRTFDevices:tempRTFDeviceCount,zerolutionNRTFDevices:tempNRTFDeviceCount });
		}
	}
	componentWillReceiveProps(nextProps) {
		/*	if (this.props.FETCH_LINE_DETAILS_STATUS !== 'SUCCESS' && nextProps.FETCH_LINE_DETAILS_STATUS === 'SUCCESS') {
				this.setState({ showDimmer: false, todos: nextProps.msisdnList });
			}
			if (this.props.FETCH_LINE_DETAILS_STATUS !== 'FAILED' && nextProps.FETCH_LINE_DETAILS_STATUS === 'FAILED') {
				this.setState({ showDimmer: false, validationResult: { status: 'FAILURE', message: 'Faced some issue in fetching data' } });
			}*/
		if (this.props.GET_DEVICE_FUND_CONTRACTS_STATUS !== 'SUCCESS' && nextProps.GET_DEVICE_FUND_CONTRACTS_STATUS === 'SUCCESS') {
			let tempNextURL = '';
			let { prodCatName } = this.props.registrationDetails;
			if (prodCatName === 'Existing Group- Add VAS') {
				tempNextURL = this.state.nextUrlAddVas;
			}
			else {
				tempNextURL = this.state.nextUrl;
			}
			tempNextURL += "&easMasterRegId=" + nextProps.easMasterRegId;
			this.props.history.push(tempNextURL);
		}
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

	handleChangeCheckBox = (e, { name, checked }) => {
		if (name === 'isBizAddress') {
			this.setState({ [name]: false })
			this.newBizAddress.current.show();
		}
	}

	next = () => {
		this.props.getDeviceFundContracts(this.props.easMasterRegId, '34');

	}
	previous = () => {
		this.props.history.goBack();
	}
	openModal = (vasList, msisdnNo, ratePlanName, commonList, uncommonList, type, prematurePenalty,regType) => {
		this.vasAction.current.show(vasList, msisdnNo, ratePlanName, commonList, uncommonList, type, prematurePenalty,regType);
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
			isBizAddress,
			totalDeviceTopUp,
			obsDevicesCount,
			zerolutionRTFDevices,
			zerolutionNRTFDevices
			} = this.state;
		let { custBrnNo, masterRegStatus, contactMode, virtualServiceNo, easPackageName,
			totalMembers, maxLineCount, masterReg, masterRegId, prodCatName, totalMemberString, groupName } = this.props.registrationDetails;
		let { status, message } = this.state.validationResult;
		let { brnInfo } = this.props;
		indexOfLastTodo = currentPage * todosPerPage;
		indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

		const TableHeader = () => {
			let { isZerolutionRTF } = this.props;
			let { prodCatName } = this.props.registrationDetails;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
					{(prodCatName !== 'Existing Group- Add VAS') && (
						<React.Fragment>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
								<label className='heading'>Reg. Info</label>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>Delivery No.</label>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>Mobile No.</label>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>Rate Plan</label>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>VAS/Contract</label>
							</Grid.Column>
							{ (zerolutionRTFDevices>0 ||  zerolutionNRTFDevices>0 || obsDevicesCount>0) && (
									<Grid.Column width={3} style={{ paddingRight: 0 }}>
										<label className='heading'>Device Info</label>
									</Grid.Column>
								)
							}
							{ ( obsDevicesCount>0 ) && (
								<React.Fragment>
									<Grid.Column width={1} style={{paddingRight: 15 }}>
										<b style={{fontSize:12}}> Device TopUp</b><b style={{fontSize:9}}>(RM)</b>
									</Grid.Column>
								</React.Fragment>
								)
							}
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<div><label className='heading'>Line Status</label></div>
								<div><label className='heading'>Device Status</label></div>
							</Grid.Column>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>
								<label className='heading'>Installation Address</label>
							</Grid.Column>
						</React.Fragment>
					)
					}
					{(prodCatName === 'Existing Group- Add VAS') && (
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
			let { isZerolutionRTF } = this.props;
			let { prodCatName } = this.props.registrationDetails;
			const { regId, regType, deliveryNo, mobileInfo, lineStatus, deviceStatus, ratePlanName, pendingActionContracts, prematurePenalty, addOnVal, deviceContract } = line;
			let { obsDevicesCount } = this.state;
			console.log('DeviceCOntract:'+deviceContract);
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
					<Grid.Column width={1} style={{ paddingRight: 0 }}>
						<div>{regId}</div>
						<div>{regType}</div>
					</Grid.Column>
					{(prodCatName !== 'Existing Group- Add VAS') && (
						<React.Fragment>
							<Grid.Column width={2} style={{ paddingRight: 0, overflowWrap: 'break-word' }}>
								{
									(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null) && (
										<div>{line.lineDeviceInfo.deliveryNo}</div>
									)
								}
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
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
								
									<SecondaryButton compact value='VIEW' onClick={() => { this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.uncommonList, 'VIEW', prematurePenalty,regType) }} />
								
							</Grid.Column>
							{ (deviceContract==='Zerolution') && (
									<Grid.Column width={3} style={{ paddingRight: 0 }}>
										{
											(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>Device Model :{line.lineDeviceInfo.phoneModel}</div>
													{
														(isZerolutionRTF == true) && (
															<React.Fragment>
																<div style={{ margin: 0 }}>IMEI No :{line.lineDeviceInfo.imei}</div>
																<div style={{ margin: 0 }}>Article ID :{line.lineDeviceInfo.deviceArticleId}</div>
															</React.Fragment>
															)
													}
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
									</Grid.Column>
								)
							}
							{ (deviceContract!='Zerolution') && (
									<Grid.Column width={3} style={{ paddingRight: 0 }}>
										{
											(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null) && (
												<React.Fragment>
													<div style={{ margin: 0 }}>Device Model :{line.lineDeviceInfo.phoneModel}</div>
												</React.Fragment>
											)
										}
									</Grid.Column>
								)
							}
							{ (deviceContract!='Zerolution' || obsDevicesCount >0) && (
									<Grid.Column width={1} style={{ paddingRight: 0 }}>
									{(line.lineDeviceInfo !== null && line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null && deviceContract!='Zerolution') && (
										<Input  defaultValue={line.lineDeviceInfo.deviceTopUp}
											 name={'deviceTopUp,'+mobileInfo.mobileNo} 
										 	onBlur={(e,d)=>this.handleChange( e.target.name,e.target.value)} disabled fluid/>
										)}
									</Grid.Column>
								)
							}	
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<div>{lineStatus}</div>
								{(line.lineDeviceInfo.status !== null) &&
									<div>{line.lineDeviceInfo.status}</div>
								}
							</Grid.Column>
							<Grid.Column width={1} style={{ paddingRight: 0, paddingLeft: 15 }}>
								{regType === 'MISC FIBRE' &&
									<Checkbox onChange={this.handleChangeCheckBox} name='isBizAddress' checked={isBizAddress} value={isBizAddress} />
								}
							</Grid.Column>
						</React.Fragment>
					)
					}
					{(prodCatName === 'Existing Group- Add VAS') && (
						<React.Fragment>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<div><Icon name='phone' />{mobileInfo.mobileNo}</div>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<div>{ratePlanName}</div>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								{(regType !== 'Change Subscription' && regType !== 'Group Level Add-On') &&
									<SecondaryButton compact value='VIEW' onClick={() => { this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.uncommonList, 'VIEW', prematurePenalty) }} />
								}
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
				</Grid.Row>
			)
		}
		return (
			<Container fluid className='main-container'>
				<PleaseWait active={showDimmer} />
				<Navigation index={4} group={groupName} />
				<Segment basic style={{ padding: 0, paddingTop: 15, flex: 1 }}>
					<Form size='small'>
						<Grid style={{ paddingLeft: 10 }}>
							<StaticBlock5 custBrnNo={custBrnNo} prodCatName={prodCatName} companyName={brnInfo.portalCustInfo.companyName} masterRegId={masterRegId}
								virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={totalMemberString}
								maxLineCount={maxLineCount} masterReg={masterReg} contactMode={contactMode} masterRegStatus={masterRegStatus} />

							<Grid.Row style={{ padding: 0, paddingTop:10, paddingLeft:13 }}>
								<Grid.Column width='16' style={{ paddingLeft: 0, paddingBottm: 0 }}>
									<Checkbox style={{ padding: 5, fontWeight: 'bold', fontSize: 15, paddingLeft:0 }}  name='zerolutionRTF'  label='Real Time Fulfilment' disabled = { true } checked = {this.props.isZerolutionRTF}/>
								</Grid.Column>
							</Grid.Row>

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
					{ todos !== undefined && todos !== null && todos.length >0 &&
							<StaticBlock11 totalLines={obsDevicesCount+zerolutionRTFDevices+zerolutionNRTFDevices} totalDeviceTopUp={totalDeviceTopUp}/>
					}
					</Grid>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
					<SecondaryButton value='BACK' onClick={this.previous} />
					<div style={{ padding: 10 }} />
					<PrimaryButton value='NEXT' onClick={this.next} />
				</Segment>
				<VasAction ref={this.vasAction} onClose={() => console.log('close')} />
				<NewBizAddress ref={this.newBizAddress} installationAddress={this.props.installationAddress} mode='View' />
			</Container>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		registrationDetails: state.order.data.registrationDetails,
		msisdnList: state.order.data.msisdnList,
		/*FETCH_LINE_DETAILS_STATUS: state.order.meta.FETCH_LINE_DETAILS_STATUS,*/
		GET_DEVICE_FUND_CONTRACTS_STATUS: state.configuration.meta.GET_DEVICE_FUND_CONTRACTS_STATUS,
		easMasterRegId: state.order.data.easMasterRegId,
		brnInfo: state.order.data.brnInfo,
		installationAddress: state.order.data.installationAddress,
		isZerolutionRTF: state.order.data.isZerolutionRTF,
		user: state.user.data
	}
}

const mapDispatchToProps = {
	/*getMsisdnDetails,*/
	getDeviceFundContracts,
	getFundAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)
