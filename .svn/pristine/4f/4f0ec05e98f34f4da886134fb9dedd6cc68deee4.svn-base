import React, { ReactDOM,Component } from 'react';
import { Grid,  Message, Button, Modal, Segment, Dimmer,Divider,Form ,Icon,Header,Container} from "semantic-ui-react";
import { PrimaryButton } from '../../components/common/buttons';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import { connect } from 'react-redux';

const DealerAndDeliveryAddress = ({custInfo,currentTodos,easmasterRegId,lineInfo,click,dealerName}) => {
	let regIdOrderNo=null;
	let datePrint = moment(new Date()).format('LL');
	if(click==='clickForSingleLine'){
		regIdOrderNo= 
		 <Grid.Row style={{ paddingBottom: 4, paddingLeft: 10, paddingTop: 10 }}>			
			<Grid.Column width='16' textAlign='left' style={{fontSize:11,paddingLeft:5 }}>
					<label className='heading'>ORDER NO:   </label><label>{lineInfo.lineDeviceInfo.orderNo}</label>
			</Grid.Column>
			</Grid.Row>
	}else {
		regIdOrderNo= 
		<Grid.Row style={{ paddingBottom: 4, paddingLeft: 10, paddingTop: 10 }}>		   
		    <Grid.Column width='16' textAlign='left' style={{fontSize:11,paddingLeft:5 }}>
				   <label className='heading'>{easmasterRegId!=null?'MASTER REG ID:':'REG ID:'}   </label><label>{easmasterRegId!=null? easmasterRegId:currentTodos[0].regId}</label>
			</Grid.Column>
		   </Grid.Row>

	}
            return (
               <Segment basic style={{ padding: 10, flex: 1 }}>
			    <Header as='h4' textAlign='center'>Delivery Note</Header>
						<Grid style={{ padding: 10}}>
						   <Grid.Row style={{paddingTop: 10,fontSize:11, paddingLeft: 10 }}>
									<label className='heading'>Dealer Name:</label><label>{`  `+dealerName}</label>								
							</Grid.Row>
							<Grid.Row style={{fontSize:10 }}>
							    <Grid.Column width='16' textAlign='left'>
									<label className='heading'>Date:   </label> <label>{`  `+datePrint}</label>
								</Grid.Column>								
							</Grid.Row>	
							<Grid.Row style={{fontSize:11, paddingLeft: 15,pddingRight:0,paddingBottom:0,paddingTop:6 }}>
							    <label className='heading'>DELIVERED TO:</label>
							</Grid.Row>	
							
								<div>
									<div>{custInfo.companyName}</div>
									<div>{custInfo.delAddr1},{` `+custInfo.delAddr2}</div>
									<div>{custInfo.delAddr3},{` Pin Code-`}{custInfo.delPostcode},{` `+custInfo.delCountryName}</div>
									<div></div>
									<div><label>Contact Person:  </label>{`  `+custInfo.delContactName}</div>
									<div><label>NRIC:  </label>{`  `+custInfo.delContactIc}</div>
									<div><label>Contact Number:  </label>{`  `+custInfo.delContactPhoneNo},{` `+custInfo.delContactFixNo}</div>
								</div>
							
							 {regIdOrderNo}
							
						</Grid>
				</Segment>
)}
const Confirmation = ({dealerName,total,quantity}) => {
	const divStyle ={
		paddingTop:15,
		fontSize:18
	}
	const divStyles ={
		paddingTop:60,
		fontSize:14,
		paddingLeft:150
	}
	const divStyless ={
		paddingTop:35,
		fontSize:14,
		paddingLeft:150
	}
	const divSt={
		paddingTop:15,
		fontSize:14,
	}
	return (
	<div>	
    <div style={divStyle}><label className='heading'>Total Top-Up: </label><label>{` RM `+parseFloat(total).toFixed(2)}</label></div>
	<div style={divStyle}><label className='heading'>Total Device: </label><label>{quantity}</label></div>
	
		<div style={divStyles}>
			<div>I/We confirm goods received in the correct</div>
			<div>quantity and in good condition</div>
			<div>Company's Stamp &amp; Signature.</div>
		</div>
		<div style={divStyless}>
		    <div>________________________________________________________________________________</div>
			<div>Full Name: _____________________________________________________________________</div>
			<div>IC No. __________________________________________________________________________</div>
			<div>Date/Time. _____________________________________________________________________</div>
		</div>
		<div style={divSt}><label className='heading'>Prepared By:  </label>{dealerName} {moment(new Date()).format('LLL')}</div>
		</div>
	)
}
const TableHeader = () => {
	return (
		<Grid.Row style={{ display: 'flex', flexDirection: 'row', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 3,paddingLeft:10 }}>
				<Grid.Column width={2} style={{ paddingRight: 0 }}>
					<label className='heading'>Order. Info</label>
				</Grid.Column>
				<Grid.Column width={4} style={{ paddingRight: 0 }}>
					<label className='heading'>Mobile No.</label>
				</Grid.Column>
				<Grid.Column width={3} style={{ paddingRight: 0 }}>
					<label className='heading'>IMEI/Serial Number</label>
				</Grid.Column>
				<Grid.Column width={4} style={{ paddingRight: 0 }}>
					<label className='heading'>Device Info</label>
				</Grid.Column>
				<Grid.Column width={3} style={{ paddingRight: 0 }}>
					<label className='heading'>Device Top-up(RM)</label>
				</Grid.Column>
				
		</Grid.Row>
)}

class TableData extends React.Component{
	constructor(props){
		super(props);
		this.componentRef=React.createRef();
	}
render(){
	let totalTopup=0;
	let totalQuantity=0;
	{(this.props.currentTodos != null) && this.props.currentTodos.map((line,key) => {
		return (
			totalTopup+=line.topupByDealer
		)}
			  
	)}
	{(this.props.currentTodos != null) && this.props.currentTodos.map((line,key) => {
		return (
			totalQuantity+=line.lineDeviceInfo.quantity
		)}
	)}
	return (
		<Grid style={{ fontSize: 11, padding: 10 }}>		
		<DealerAndDeliveryAddress custInfo={this.props.custInfo} currentTodos={this.props.currentTodos}
		                          easmasterRegId={this.props.easmasterRegId} lineInfo={this.props.lineInfo} 
								  click={this.props.click}  dealerName={this.props.dealerName}/>
		<TableHeader />
		{(this.props.currentTodos != null) && this.props.currentTodos.map((line,key) => {
			return (
				<TableRow key={key} line={line}/>
			)}
		)}
		<Confirmation dealerName={this.props.dealerName} total={parseFloat(totalTopup).toFixed(2)}
		quantity={totalQuantity}/>
	</Grid>
)}
}

const TableRow=({line})=>{
	return (
			<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'left', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 3,paddingLeft:10 }}>
					<Grid.Column width={2} style={{ paddingRight: 0 }}>
					    <div>{line.lineDeviceInfo.orderNo}</div>	
					</Grid.Column>
					<Grid.Column width={4} style={{ paddingRight: 0 }}>
					        <div><Icon name='phone' />{line.mobileInfo.mobileNo}</div>
							<div><Icon name='credit card' />{line.mobileInfo.sim}</div>
							<div><Icon name='id card outline' />{line.mobileInfo.simType}</div>
					</Grid.Column>
					<Grid.Column width={3} style={{ paddingRight: 0 }}>
					    <div>{line.lineDeviceInfo.imei}</div>
				    </Grid.Column>
					<Grid.Column width={4} style={{ paddingRight: 0 }}>
					    <div><Icon name='mobile alternate' /> {line.lineDeviceInfo.phoneModel}</div>
					 	<div><Icon name='money bill alternate outline' />RM {parseFloat(line.lineDeviceInfo.deviceRrp).toFixed(2)}</div>
					
					</Grid.Column>
					<Grid.Column width={3} style={{ paddingRight: 0,textAlign:'center' }}>
					<div>{parseFloat(line.topupByDealer).toFixed(2)}</div>
					</Grid.Column>
				
			</Grid.Row>
		)
}

class DoPrint extends Component {
	constructor(props) {
		super(props);
		console.log("Inside DO Printing");
		this.state = {
			open: false,
			todos: [],//props.msisdnList===undefined?[]:props.msisdnList,
			custInfo:props.customerInfo,
			easmasterRegId:props.easmasterRegId,
			lineInfo:props.lineInfo,
			click:props.click,
			dealerName:props.dealerName,
			currentPage: 1,
			todosPerPage: 5,
			lastPage: null,
			indexOfLastTodo: null,
			indexOfFirstTodo: null,
			currentTodos: null,
			pageNumbers: [],
			firstIndexCurrentPage: 1,
			lastIndexCurrentPage: 1,
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.customerInfo !== undefined)
		{
		this.setState({custInfo:nextProps.customerInfo})
		}
		if(nextProps.easmasterRegId !== undefined)
		{
		this.setState({easmasterRegId:nextProps.easmasterRegId})
		}
		if(nextProps.lineInfo !== undefined && nextProps.click !==undefined)
		{
		this.setState({lineInfo:nextProps.lineInfo,click:nextProps.click})
		}
		if(nextProps.dealerName !==undefined){
			this.setState({dealerName:nextProps.dealerName})
		}
	}

	show(line) {
		this.setState({ open: true,todos:line} )
	}

	close= () =>{
		this.setState({ open: false });
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
    
	render() {
		const { open, dimmer } = this.state;
		let {
			todos,
			custInfo,
			easmasterRegId,
			lineInfo,
			click,
			dealerName,
			currentPage,
			todosPerPage,
			indexOfLastTodo,
			indexOfFirstTodo,
			currentTodos,
			firstIndexCurrentPage,
			lastIndexCurrentPage,
			} = this.state;
			indexOfLastTodo = currentPage * todosPerPage;
			indexOfFirstTodo = indexOfLastTodo - todosPerPage;
			currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

			
		return (
			<Modal dimmer={dimmer}
				open={open}
				onClose={this.close}
				closeOnEscape={false}
				closeOnRootNodeClick={false} style={{ marginTop: 0 }}>
				<Header icon='print' size='tiny' content='DO Print' />
				<Modal.Content scrolling >
				{					
				<Segment basic style={{ height:400,padding: 0, paddingTop: 10, flex: 1 }}>
					{/* <Form size='small'>
						<Grid style={{ paddingLeft: 10 }}>
	
							<Grid.Row style={{ paddingBottom: 0, paddingLeft: 0, paddingTop: 30 }}>
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
					</Form> */}
					
					<TableData currentTodos={currentTodos} custInfo={custInfo} 
					           easmasterRegId={easmasterRegId} lineInfo={lineInfo} 
							   click={click}  dealerName={dealerName} ref={el => (this.componentRef = el)} />
					
				</Segment>
			 }
					
				</Modal.Content>
				<Modal.Actions>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<ReactToPrint
          			trigger={() => <a href="#"><Button style={{ height: 35 }} primary value='PRINT'>PRINT</Button></a>}
          			content={() => this.componentRef} />
					
					<div style={{ padding: 20 }} />
					<PrimaryButton value='CANCEL' onClick={this.close} />
				</Segment>
				</Modal.Actions>
				
			</Modal>
		)}
}

export default DoPrint;