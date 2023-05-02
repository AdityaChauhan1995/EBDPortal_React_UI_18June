import React, { Component } from 'react';
import { Grid, Message, Input, Select, Checkbox, Segment, Container, Icon, Form, Dropdown,Confirm, Button, Label, Divider } from "semantic-ui-react";
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { connect } from 'react-redux';
import { fetchZerolutionDeviceReport,  downloadZerolutionDeviceReport} from '../../redux/actions/configuration';
import { setReportNameInfo } from '../../redux/actions/order';
import { isChangedToSuccess, isChangedToRejected } from '../../helpers/utils';
import { PleaseWait, DataLoad } from '../../components/common/dimmer';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const TableHeader = () => {
    return (
        <Grid.Row style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: '2px solid rgba(78, 78, 78, 0.2)',
            padding: 5
        }}>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>ORDER CREATION DATE</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>BRN</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>COMPANY NAME</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>ORDER ID</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>ORDER STATUS</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>LAST STATUS DATE</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>MSISDN</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>Device Model</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>ARTICLE ID</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>IMEI</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>USER</label>
            </Grid.Column>
            <Grid.Column width={1}  style={{paddingLeft: 0}}>
                <label className='heading'>APPROVER</label>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingRight: 0}}>
                <label className='heading'>RTF/NORMAL DELIVERY</label>
            </Grid.Column>
        </Grid.Row>
    )
}
const TableRow = ({line, sequence}) => {

    const {orderCreationDate, brn, companyName, orderId, orderStatus, modifiedDate, msisdn, deviceModel, articleId, imei, raisedBy, approver, deliveryType} = line;
    return (
     <Grid.Row style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottom: '2px solid rgba(78, 78, 78, 0.4)',
          padding: 5
     }}>
         <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
            <div>{orderCreationDate}</div>
         </Grid.Column>
         <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
            <div>{brn}</div>
         </Grid.Column>
         <Grid.Column width={2} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
            <div>{companyName}</div>
         </Grid.Column>
	      <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
	         <div>{orderId}</div>
	      </Grid.Column>
	      <Grid.Column width={2} style={{paddingRight: 0, overflowWrap: 'normal'}}>
	         <div>{orderStatus}</div>
	      </Grid.Column>
	      <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
	         <div>{modifiedDate}</div>
	      </Grid.Column>
	      <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
	         <div>{msisdn}</div>
	      </Grid.Column>
	      <Grid.Column width={2} style={{paddingRight: 0, overflowWrap: 'normal'}}>
	         <div>{deviceModel}</div>
	      </Grid.Column>
	      <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
	         <div>{articleId}</div>
	      </Grid.Column>
	      <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
	         <div>{imei}</div>
	      </Grid.Column>
	      <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
	         <div>{raisedBy}</div>
	      </Grid.Column>
	      <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'break-word'}}>
	         <div>{approver}</div>
	      </Grid.Column>
         <Grid.Column width={1} style={{paddingRight: 0, overflowWrap: 'normal'}}>
            <div>{deliveryType}</div>
         </Grid.Column>
     </Grid.Row>
    )
}


class ZerolutionDevicesReport extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	fromDate: '',
	  	toDate: '',
	  	zerolutionDevicesReportData: [],
	    currentPage: 1,
	    todosPerPage: 10,
	    lastPage: null,
	    indexOfLastTodo: null,
	    indexOfFirstTodo: null,
	    currentTodos: null,
	    pageNumbers: [],
	    firstIndexCurrentPage: 1,
	    lastIndexCurrentPage: 1,
	    currentPageUserInput: 1,
	    firstIndexCurrentPageUserInput: 1,
	    lastIndexCurrentPageUserInput: 1,
	    validationResult: {
	      status: 'SUCCESS',
	      message: '',
	    },
	    downloadReport: false
	  };
	}




	 componentWillReceiveProps(nextProps) {

	 	if (isChangedToSuccess(this.props.FETCH_ZEROLUTION_DEVICE_REPORT_STATUS, nextProps.FETCH_ZEROLUTION_DEVICE_REPORT_STATUS)) {
	 		if( nextProps.zerolutionDevicesReportData != null &&  nextProps.zerolutionDevicesReportData.length >0){
	 			this.setState({ showDimmer: false, downloadReport: true, zerolutionDevicesReportData: nextProps.zerolutionDevicesReportData });
	 		}else{
	 			this.setState({ showDimmer: false, validationResult: {status:'FAILURE', message: 'No data found for the Date range selected'} });
	 		}
	 	}else if (isChangedToRejected(this.props.FETCH_ZEROLUTION_DEVICE_REPORT_STATUS, nextProps.FETCH_ZEROLUTION_DEVICE_REPORT_STATUS)) {
	      this.setState({ showDimmer: false, validationResult: {status:'FAILURE', message: 'Some error occurred while fetcching report'}});
	    }else if (isChangedToSuccess(this.props.DOWNLOAD_ZEROLUTION_DEVICE_REPORT_STATUS, nextProps.DOWNLOAD_ZEROLUTION_DEVICE_REPORT_STATUS)) {
	 	  this.setState({ showDimmer: false});
	 	  const url = window.URL.createObjectURL(new Blob([nextProps.downloadFileForZerolutionDevicesReport]))
          let a = document.createElement('a');
          a.href = url;
          a.download = 'ZerolutionDeviceReport.xlsx';
          a.click();
	 	}else if (isChangedToRejected(this.props.DOWNLOAD_ZEROLUTION_DEVICE_REPORT_STATUS, nextProps.DOWNLOAD_ZEROLUTION_DEVICE_REPORT_STATUS)) {
	      this.setState({ showDimmer: false, validationResult: {status:'FAILURE', message: 'Some error occurred while downloading report'}});
	    }
	 }

	reset = () => {
	  this.setState({
	   fromDate: '',
	   toDate: '',
	   zerolutionDevicesReportData: []
	  });
	}


	downloadReport = ( ) =>{

		let { fromDate, toDate } = this.state;

		this.setState(  {validationResult: { status:'SUCCESS' }})
		
		if(fromDate === ''){
			this.setState({validationResult: {status:'FAILURE', message: 'Please select value for Start Date'}});
			return;
		}else if(toDate === ''){
			this.setState({validationResult: {status:'FAILURE', message: 'Please select value for End Date'}});
			return;
		}

		
		const noOfMonths = moment.duration(toDate.diff(fromDate)).asMonths();
		if(noOfMonths>3){
			this.setState({validationResult: {status:'FAILURE', message: 'Maximum date range allowed is for 3 months, kindly adjust your Start Date & End Date in order to allow system to search'}});
			return;
		}

		this.setState({showDimmer:true});
		this.props.downloadZerolutionDeviceReport(moment(fromDate).format('DD/MM/YYYY'), moment(toDate).format('DD/MM/YYYY'), this.props.user.userRole, this.props.user.storeCode, this.props.user.isHomcUser);
	}

	search = ( ) =>{

		let { fromDate, toDate } = this.state;

		this.setState(  {validationResult: { status:'SUCCESS' }})

		if(fromDate === ''){
			this.setState({validationResult: {status:'FAILURE', message: 'Please select value for Start Date'}});
			return;
		}else if(toDate === ''){
			this.setState({validationResult: {status:'FAILURE', message: 'Please select value for End Date'}});
			return;
		}

		const noOfMonths = moment.duration(toDate.diff(fromDate)).asMonths();
		if(noOfMonths>3){
			this.setState({validationResult: {status:'FAILURE', message: 'Maximum date range allowed is for 3 months, kindly adjust your Start Date & End Date in order to allow system to search'}});
			return;
		}
		
		const noOfDays = moment.duration(toDate.diff(fromDate)).asDays();

		if(noOfDays>15){
			this.setState({ downloadReport:true, validationResult: {status:'FAILURE', message: 'Date range selected is more than 15 days so cannot view report, Kindly click on download button at bottom of page to download it directly' }});
			return;
		}

	
		this.setState({showDimmer:true});
		this.props.fetchZerolutionDeviceReport(moment(fromDate).format('DD/MM/YYYY'), moment(toDate).format('DD/MM/YYYY') , this.props.user.userRole, this.props.user.storeCode, this.props.user.isHomcUser);
	}


	handleClick(type) {
	  let { currentPage, zerolutionDevicesReportData, todosPerPage } = this.state;
	  if (zerolutionDevicesReportData.length > 0) {
	    if (type === 'First') {
	      currentPage = 1
	    }
	    else if (type === 'Next' && currentPage < Math.ceil(zerolutionDevicesReportData.length / todosPerPage)) {
	      currentPage += 1
	    }
	    else if (type === 'Prev' && currentPage > 1) {
	      currentPage -= 1
	    }
	    else if (type === 'Last') {
	      currentPage = Math.ceil(zerolutionDevicesReportData.length / todosPerPage);
	    }
	    this.setState({
	      currentPage: Number(currentPage),
	      lastPage: Number(Math.ceil(zerolutionDevicesReportData.length / todosPerPage)),
	      firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage + 1,
	    });
	  }
	}




	render() {

		let { showDimmer, fromDate, toDate, sysdate, zerolutionDevicesReportData,
			currentPage,
			todosPerPage,
			indexOfLastTodo,
			indexOfFirstTodo,
			currentTodos,
			firstIndexCurrentPage,
			lastIndexCurrentPage, 
			firstIndexCurrentPageUserInput,
			lastIndexCurrentPageUserInput, downloadReport } = this.state;
			let { status, message } = this.state.validationResult;

			indexOfLastTodo = currentPage * todosPerPage;
			indexOfFirstTodo = indexOfLastTodo - todosPerPage;
			currentTodos = zerolutionDevicesReportData.slice(indexOfFirstTodo, indexOfLastTodo);
		return (
			<Container fluid>
				  <PleaseWait active={showDimmer} />
				  <Divider horizontal style={{color:'#293895'}} className='heading'>Device Submission Report</Divider>
				  <Segment basic style={{ padding: 0, paddingTop: 15 }}>
				  	<Form size='small'>
				  	  <Grid style={{ paddingLeft: 10 }}>
				  	    <Grid.Row style={{ padding: 0, paddingTop: 30 }}>
				  	    	<Grid.Column width={2}>
				  	    	  <label className='heading'>Start Date</label>
				  	    	</Grid.Column>
				  	    	<Grid.Column width={4}>
				  	    		<DatePicker
				  	    		  utcOffset='0'
				  	    		  name='fromDate'
				  	    		  maxDate={moment()}
				  	    		  selected={fromDate}
				  	    		  onSelect={(fromDate)=>this.setState({fromDate: fromDate})}
				  	    		  dateFormat="DD/MM/YYYY"
				  	    		  placeholderText="DD/MM/YYYY" />
				  	    	</Grid.Column>
				  	    	<Grid.Column width={2}>
				  	    	  <label className='heading'>End Date</label>
				  	    	</Grid.Column>
				  	    	<Grid.Column width={4}>
				  	    		<DatePicker
				  	    		  utcOffset='0'
				  	    		  name='toDate'
				  	    		  minDate={fromDate}
				  	    		  maxDate={moment()}
				  	    		  selected={toDate}
				  	    		  onSelect={(toDate)=>this.setState({toDate: toDate})}
				  	    		  dateFormat="DD/MM/YYYY"
				  	    		  placeholderText="DD/MM/YYYY" />
				  	    	</Grid.Column>
				  	    </Grid.Row>
				  	    <Grid.Row style={{ paddingLeft: 10 }}>
				  	    	<Grid.Column width = {16}>
					  	    	<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
					  	    	  <PrimaryButton value='Search' onClick={this.search} />
					  	    	  <div style={{ padding: 20 }} />
					  	    	  <SecondaryButton value='RESET' onClick={this.reset} />
					  	    	</Segment>  
					  	    </Grid.Column>
				  	    </Grid.Row>
				  	    <Grid.Row style={{ paddingLeft: 10 }}>
		  	    	  	    <Grid.Column width = {16} style={{ padding: 0 }}>
		  	    	  	      {
		  	    	  	        (status === 'FAILURE') &&
		  	    	  	        <Message negative compact size='small' style={{ minWidth: 400 }}
		  	    	  	          onDismiss={() => this.setState(  {validationResult: { status:'SUCCESS' }})}>
		  	    	  	          <p>{message}</p>
		  	    	  	        </Message>
		  	    	  	      }
		  	    	  	     </Grid.Column>
		  	      	    </Grid.Row>

				  	    <Grid.Row style={{ paddingBottom: 0, paddingLeft: 10, paddingTop: 5 , opacity:0.7}}>
				  	      <Grid.Column width='8' style={{ paddingLeft: 0 }}>
				  	        <label>Displaying {(zerolutionDevicesReportData.length === 0) && (0)}{(zerolutionDevicesReportData.length > 0) && (firstIndexCurrentPage)}-{(firstIndexCurrentPage - 1) + currentTodos.length} / {zerolutionDevicesReportData.length}</label>
				  	      </Grid.Column>
				  	      <Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
				  	        <label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='pointer'>First</label>
				  	                          <label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='pointer'>Prev</label>
				  	        <label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='pointer'>Next</label>
				  	        <label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='pointer'>Last</label>
				  	        <label onClick={() => this.handleClick('Last')} >({(zerolutionDevicesReportData.length === 0) && (0)} {(zerolutionDevicesReportData.length > 0) && (currentPage)} of {Math.ceil(zerolutionDevicesReportData.length / todosPerPage)})</label>
				  	      </Grid.Column>
				  	    </Grid.Row>
				  	  </Grid>
				  	  <Grid style={{fontSize: 11, padding: 10, paddingLeft: 22 }}>
				  	      <TableHeader />
				  	      {(currentTodos!==undefined && currentTodos!=null && currentTodos!=='') && 
				  	         currentTodos.map((line, sequence, key) => {
				  	                             return (
				  	                                 <TableRow line={line}
				  	                                  sequence={sequence}
				  	                                  key= {sequence}
				  	                                  />
				  	                             )
				  	                         })
				  	      }
				  	   </Grid>
				  	   { (downloadReport) && (
				  	   		<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				  	   		  <PrimaryButton value='Download Report' onClick={this.downloadReport} />
				  	   		</Segment>
				  	   	)
				  	   }  
				  	</Form>
                </Segment>
			  </Container>

		);
	}
}
const mapStateToProps = (state) => {
  return {
     zerolutionDevicesReportData: state.configuration.data.zerolutionDevicesReportData,
     user: state.user.data,
     DOWNLOAD_ZEROLUTION_DEVICE_REPORT_STATUS: state.configuration.meta.DOWNLOAD_ZEROLUTION_DEVICE_REPORT_STATUS,
     FETCH_ZEROLUTION_DEVICE_REPORT_STATUS: state.configuration.meta.FETCH_ZEROLUTION_DEVICE_REPORT_STATUS,
     downloadFileForZerolutionDevicesReport: state.configuration.data.downloadFileForZerolutionDevicesReport
    //GET_AUTOMATED_REPORT_NAME_STATUS: state.configuration.meta.GET_AUTOMATED_REPORT_NAME_STATUS,
    // reportType: state.order.data.reportType,
    // deviceOrderNo: state.order.data.deviceOrderNo,
    // tableHeaders: state.configuration.data.tableHeaders,
    // tableRows: state.configuration.data.tableRows,
  }
}
const mapDispatchToProps = {
	fetchZerolutionDeviceReport,
	downloadZerolutionDeviceReport
}

export default connect(mapStateToProps, mapDispatchToProps)(ZerolutionDevicesReport)