import React, { Component } from 'react';
import { Grid, Segment, Container, Icon, Form, Message, Divider, Button } from "semantic-ui-react";
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock10 } from '../../components/common/dumb-component';
import { connect } from 'react-redux';
import { PleaseWait } from '../../components/common/dimmer';
import { fetchLineDetailsDealerSearch, triggerDealerPickAndPack, triggerUpdateIMEI, triggerDOPickPack, triggerDOComplete,triggerUpdateDeliveryStatus  } from '../../redux/actions/order'
import { sendFileDealerSearch } from '../../redux/actions/configuration'
import UpdateDeliveryStatus from './update-delivery-status.jsx';
import DoPrint from './do-print.jsx';
import EditPartnerFulfillemnt from './edit-partner-fulfillment.jsx';
import queryString from 'query-string'


const TableHeader = () => {
				return (
					<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>Reg. Info</label>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<label className='heading'>Mobile No.</label>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<label className='heading'>Rate Plan</label>
							</Grid.Column>
							<Grid.Column width={3} style={{ paddingRight: 0 }}>
								<label className='heading'>Device Info</label>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<label className='heading'>Billable</label>
							</Grid.Column>
							<Grid.Column width={2} style={{ paddingRight: 0 }}>
								<div><label className='heading'>Line Status</label></div>
								<div><label className='heading'>Device Status</label></div>
							</Grid.Column>
							<Grid.Column width={1} style={{ paddingRight: 0 }}>

							</Grid.Column>
					</Grid.Row>
	)}

	const TableRow=({line, openEditPartnerFulfillment,deviceDelivered})=>{
		let {regId, regType, ratePlanName, mobileInfo, lineDeviceInfo, lineStatus}=line;
		//console.log(line);
		let billableIndicator=null;
        if(line.billableInd===false){
			billableIndicator='No';
		} else if(line.billableInd===true){
			billableIndicator='Yes';
		}

		return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<div>{regId}</div>
							<div>{regType}</div>
						</Grid.Column>
						<Grid.Column width={3} style={{ paddingRight: 0 }}>
							<div><Icon name='phone' />{mobileInfo.mobileNo}</div>
							<div><Icon name='credit card' />{mobileInfo.sim}</div>
							<div><Icon name='id card outline' />{mobileInfo.simType}</div>
						</Grid.Column>
						<Grid.Column width={3} style={{ paddingRight: 0 }}>
							<div>{ratePlanName}</div>
						</Grid.Column>
						<Grid.Column width={3} style={{ paddingRight: 0 }}>
							<div><Icon name='mobile alternate' /> {lineDeviceInfo.phoneModel}</div>
							<div><Icon name='money bill alternate outline' />RM {lineDeviceInfo.deviceRrp}</div>
							<div><Icon name='list' />Quantity {lineDeviceInfo.quantity}</div>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<div>{billableIndicator}</div>
						</Grid.Column>
						<Grid.Column width={2} style={{ paddingRight: 0 }}>
							<div>{lineStatus}</div>
							<div>{deviceDelivered==true?'Delivered':lineDeviceInfo.status}</div>
						</Grid.Column>
						<Grid.Column width={1} style={{ paddingRight: 0, paddingLeft: 0 }}>
							<Button basic compact={true} onClick={()=>openEditPartnerFulfillment(line)}>EDIT</Button>
						</Grid.Column>
				</Grid.Row>
			)
	}



export class ProductOrderDealerSearch extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  		showDimmer: false,
			  todos:props.msisdnList===undefined?[]:props.msisdnList,
			  customerInfo:props.customerInfo,
			  easmasterRegId:props.easmasterRegId,
			  dealerName:props.dealerName,
	  		validationResultEdit:{status:'', message:''},
	  		currentLine:'',
			tempDocRegId:'',
			deviceStatus:props.deviceApproved,
			//todos: props.msisdnList,
			currentPage: 1,
			todosPerPage: 5,
			lastPage: null,
			indexOfLastTodo: null,
			indexOfFirstTodo: null,
			currentTodos: null,
			pageNumbers: [],
			firstIndexCurrentPage: 1,
			lastIndexCurrentPage: 1,
			deviceDelivered:false
	  };
	  this.updateDelStatus= React.createRef();
	  this.doPrint=React.createRef();
	  this.editPartnerFulfillment=React.createRef();
	}

	componentDidMount(){
		console.log('hi');
		const query = new URLSearchParams(this.props.location.search);
		const masterRegId = query.get('masterRegId')
		const groupId= query.get('groupId');
		this.props.fetchLineDetailsDealerSearch(masterRegId, groupId);
		this.setState({showDimmer:true});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS !== 'SUCCESS' && 
			this.props.FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS === 'SUCCESS' ) {
			//console.log(this.props.msisdnList);
			this.setState({showDimmer:false,todos:this.props.msisdnList,customerInfo:this.props.customerInfo,dealerName:this.props.dealerName});
		}
		else if(prevProps.FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS !== 'FAILED' && 
			this.props.FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS === 'FAILED'){
			this.setState({showDimmer:false, validationResult:{status:'FAILED', message:'Some error occurred while fetching data'}})
		}
		else if(prevProps.PUT_DEALER_PICK_PACK_STATUS!=='SUCCESS' && this.props.PUT_DEALER_PICK_PACK_STATUS==='SUCCESS'){
			this.setState({showDimmer:false, validationResultEdit:{'status':'SUCCESS', 'message':'IMEI Updated Successfully'}, msisdnList:this.props.msisdnList, currentLine:this.props.currentLine});
		}
		else if(prevProps.PUT_UPDATE_DELIVERY_STATUS!=='SUCCESS' && this.props.PUT_UPDATE_DELIVERY_STATUS==='SUCCESS'){
			this.setState({showDimmer:false, validationResultEdit:{'status':'SUCCESS', 'message':'Delivery Status Updated Successfully'},deviceDelivered:true});
		}else if(prevProps.PUT_UPDATE_DELIVERY_STATUS!=='FAILED' && this.props.PUT_UPDATE_DELIVERY_STATUS==='FAILED'){
			this.setState({showDimmer:false, validationResultEdit:{'status':'FAILED', 'message':this.props.errorMessage}});
		}
		else if(prevProps.PUT_DEALER_PICK_PACK_STATUS!=='FAILED' && this.props.PUT_DEALER_PICK_PACK_STATUS==='FAILED'){
			this.setState({showDimmer:false, validationResultEdit:{status:'FAILED', message:this.props.errorMessage}})
		}
		else if(prevProps.DEALER_SEARCH_UPDATE_IMEI_STATUS!=='SUCCESS' && 
			this.props.DEALER_SEARCH_UPDATE_IMEI_STATUS==='SUCCESS'){
			this.setState({showDimmer:false, validationResultEdit:{'status':'SUCCESS', 'message':'IMEI Updated Successfully'}, msisdnList:this.props.msisdnList, currentLine:this.props.currentLine});
		}
		else if(prevProps.DEALER_SEARCH_UPDATE_IMEI_STATUS!=='FAILED' && 
			this.props.DEALER_SEARCH_UPDATE_IMEI_STATUS==='FAILED'){
			this.setState({showDimmer:false, validationResultEdit:{status:'FAILED', message:this.props.errorMessage}})
		}
		else if(prevProps.DEALER_SEARCH_DO_PICK_PACK_STATUS!=='SUCCESS' && this.props.DEALER_SEARCH_DO_PICK_PACK_STATUS ==='SUCCESS'){
			this.setState({showDimmer:false, validationResultEdit:{status:'SUCCESS', message:'IMEI Updated Successfully'}, msisdnList:this.props.msisdnList, currentLine:this.props.currentLine})
		}
		else if(prevProps.DEALER_SEARCH_DO_PICK_PACK_STATUS!=='FAILED' && this.props.DEALER_SEARCH_DO_PICK_PACK_STATUS ==='FAILED'){
			this.setState({showDimmer:false, validationResultEdit:{status:'FAILED', message:this.props.errorMessage}})
		}
		else if(prevProps.DEALER_SEARCH_DO_COMPLETE_STATUS !== 'SUCCESS' && this.props.DEALER_SEARCH_DO_COMPLETE_STATUS === 'SUCCESS'){
			this.setState({showDimmer:false, validationResultEdit:{status:'SUCCESS', message:'DOA Success'}, msisdnList:this.props.msisdnList, currentLine:this.props.currentLine})
		}
		else if(prevProps.DEALER_SEARCH_DO_COMPLETE_STATUS !== 'FAILED' && this.props.DEALER_SEARCH_DO_COMPLETE_STATUS === 'FAILED'){
			this.setState({showDimmer:false, validationResultEdit:{status:'FAILED', message:this.props.errorMessage}})
		}
		else if(prevProps.SEND_FILE_URL_DEALER_SEARCH_STATUS !== 'SUCCESS' && this.props.SEND_FILE_URL_DEALER_SEARCH_STATUS === 'SUCCESS'){
			this.setState({showDimmer:false, validationResultEdit:{status:'SUCCESS', message:'File uploaded successfully'},tempDocRegId:this.props.tempDocRegId})
		}
		else if(prevProps.SEND_FILE_URL_DEALER_SEARCH_STATUS !== 'FAILED' && this.props.SEND_FILE_URL_DEALER_SEARCH_STATUS === 'FAILED'){
			this.setState({showDimmer:false, validationResultEdit:{status:'FAILED', message:'Error in uploading file'}})
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.msisdnList!==undefined && this.props.msisdnList!==nextProps.msisdnList){
		this.setState({todos:nextProps.msisdnList})
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

	openUpdateDeliveryStatusModal = (line) => {
		this.updateDelStatus.current.show(line);
	}

	doPrintModal = (line) => {
		this.doPrint.current.show(line);
	}

	openEditPartnerFulfillment = (line) =>{
		this.setState({currentLine:line});
		this.editPartnerFulfillment.current.show(line);
	}
	sendFile = (data, line)=>{
		//console.log(data);
		this.setState({showDimmer:true});
		this.props.sendFileDealerSearch(data);
	}
	dealerPickPack= (req)=>{
			this.setState({showDimmer:true});
			this.props.triggerDealerPickAndPack(req);
	}
	updateDeliveryStatus= (req)=>{
		this.setState({showDimmer:true});
		this.props.triggerUpdateDeliveryStatus(req);
}
	triggerUpdateIMEI =(req)=>{
		this.setState({showDimmer:true});
		this.props.triggerUpdateIMEI(req);
	}
	triggerDOPickPack =req=>{
		this.setState({showDimmer:true});
		this.props.triggerDOPickPack(req);
	}
	triggerDOComplete= req=>{
		this.setState({showDimmer:true});
		this.props.triggerDOComplete(req);
	}
	render() {
		let { showDimmer, msisdnList, validationResultEdit, currentLine, tempDocRegId,deviceDelivered }=this.state;
		let {
			todos,
			customerInfo,
			easmasterRegId,
			dealerName,
			currentPage,
			todosPerPage,
			indexOfLastTodo,
			indexOfFirstTodo,
			currentTodos,
			firstIndexCurrentPage,
			lastIndexCurrentPage,
			
			deviceStatus
			} = this.state;
			indexOfLastTodo = currentPage * todosPerPage;
			indexOfFirstTodo = indexOfLastTodo - todosPerPage;
			currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
			/*todos.map((line,key)=>{
			if(line.lineDeviceInfo.status==='Delivered'){
				deviceDelivered = true;
			}
			})*/
		return (
			<Container fluid>
			  <PleaseWait active={showDimmer} />
			  	<Divider horizontal style={{color:'#293895'}} className='heading'>Product Order</Divider>
				  <Segment basic style={{ padding: 0, paddingTop: 15 }}>
					    <Form size='tiny'>
					    	<Grid style={{ paddingLeft: 25 }}>
					    		<StaticBlock10 masterRegStatus={this.props.masterRegStatus} brn={this.props.brn} orderCategory={this.props.prodCat}  
								              companyName={this.props.companyName} masterRegId={this.props.easmasterRegId} regId={this.props.regId} 
											  deviceFulfillmentoption={this.props.deviceFulfillmentoption}/>
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
					    <Grid style={{ fontSize: 11, padding: 10, paddingTop:40}}>
							<TableHeader />
							{(currentTodos!==undefined && currentTodos!==null && currentTodos.length>0) && (currentTodos.map((line, key) => {
							
									return (
										<TableRow key={key} line={line} openEditPartnerFulfillment={this.openEditPartnerFulfillment} deviceDelivered={deviceDelivered}/>
									)
							}))}
						</Grid>
				  </Segment>
					{(this.props.deviceApproved==true)&&(
						<Segment basic style={{ display: 'flex', flexDirection: 'row' }}>
				  			<SecondaryButton value='PRINT DO' onClick={() => this.doPrintModal(todos)}/>
				  			<div style={{ padding: 20 }} />
				  			<SecondaryButton value='Update Delivery Status' onClick={() => this.openUpdateDeliveryStatusModal(todos)}/>
				  		</Segment>)}
					{(this.props.deviceApproved==false)&&(
						<Segment basic style={{ display: 'flex', flexDirection: 'row' }}>
				  			<SecondaryButton value='PRINT DO' onClick={() => this.doPrintModal(todos)} disabled/>
				  			<div style={{ padding: 20 }} />
				  			<SecondaryButton value='Update Delivery Status' onClick={() => this.openUpdateDeliveryStatusModal(todos)} disabled/>
				  		</Segment>)}	  
				  
				  <UpdateDeliveryStatus ref={this.updateDelStatus} line={todos} delaerSearchDetails={this.props.delaerSearchDetails}
				                        sendFile={(data, line)=>this.sendFile(data, line)} updateDeliveryStatus={(req)=>{this.updateDeliveryStatus(req)}}
										validationResultEdit={validationResultEdit} dismissMessage={()=>this.setState({'validationResultEdit':{}})} 
										tempDocRegId={tempDocRegId} easmasterRegId={this.props.easmasterRegId} regId={this.props.regId} deviceDelivered={deviceDelivered}/>
				  <DoPrint ref={this.doPrint} msisdnList={todos} customerInfo={customerInfo} easmasterRegId={this.props.easmasterRegId} dealerName={dealerName}/>
				  <EditPartnerFulfillemnt ref={this.editPartnerFulfillment} sendFile={(data, line)=>this.sendFile(data, line)} 
				  dealerPickPack={(req)=>{this.dealerPickPack(req)}} validationResultEdit={validationResultEdit} 
				  dismissMessage={()=>this.setState({'validationResultEdit':{}}) } triggerUpdateIMEI={req=>this.triggerUpdateIMEI(req)}
				  triggerDOPickPack={req=>this.triggerDOPickPack(req)} triggerDOComplete={req=>this.triggerDOComplete(req)}
				  lineInfo={currentLine} tempDocRegId={tempDocRegId} customerInfo={customerInfo} dealerName={dealerName} dealerCode={this.props.dealerCode} deviceApproved={this.props.deviceApproved}/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		brn: state.order.data.delaerSearchDetails.brn,
		msisdnList: state.order.data.delaerSearchDetails.lineDetails,
		companyName:  state.order.data.delaerSearchDetails.companyName,
		easmasterRegId:  state.order.data.delaerSearchDetails.easmasterRegId,
		customerInfo:state.order.data.delaerSearchDetails.customerInfo,
		regId:  state.order.data.delaerSearchDetails.regId,
		dealerName: state.order.data.delaerSearchDetails.dealerName,
		dealerCode: state.order.data.delaerSearchDetails.dealerCode,
		deviceFulfillmentoption:state.order.data.delaerSearchDetails.deviceFulfillmentoption,
		deviceApproved: state.order.data.delaerSearchDetails.allDevicesApproved,
		prodCat: state.order.data.delaerSearchDetails.prodCatname,
		masterRegStatus:  state.order.data.delaerSearchDetails.masterRegStatus,
		deviceFulfillmentoption: state.order.data.delaerSearchDetails.deviceFulfillmentoption,
		FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS:state.order.meta.FETCH_LINE_DETAILS_SEARCH_DEALER_STATUS,
		PUT_DEALER_PICK_PACK_STATUS:state.order.meta.PUT_DEALER_PICK_PACK_STATUS,
		PUT_UPDATE_DELIVERY_STATUS:state.order.meta.PUT_UPDATE_DELIVERY_STATUS,
		delaerSearchDetails:state.order.data.delaerSearchDetails,
		DEALER_SEARCH_UPDATE_IMEI_STATUS: state.order.meta.DEALER_SEARCH_UPDATE_IMEI_STATUS,
		DEALER_SEARCH_DO_PICK_PACK_STATUS: state.order.meta.DEALER_SEARCH_DO_PICK_PACK_STATUS,
		DEALER_SEARCH_DO_COMPLETE_STATUS: state.order.meta.DEALER_SEARCH_DO_COMPLETE_STATUS,
		currentLine:state.order.data.currentLine,
		errorMessage:state.order.data.errorMessage,
		SEND_FILE_URL_DEALER_SEARCH_STATUS: state.configuration.meta.SEND_FILE_URL_DEALER_SEARCH_STATUS,
		tempDocRegId:state.configuration.data.tempDocRegId

	}
}

const mapDispatchToProps = {
	fetchLineDetailsDealerSearch,
	sendFileDealerSearch,
	triggerDealerPickAndPack,
	triggerUpdateDeliveryStatus,
	triggerUpdateIMEI,
	triggerDOPickPack,
	triggerDOComplete

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderDealerSearch)
