import React, { Component } from 'react';
import { Grid, Message, Input, Select, Checkbox, Segment, Container, Icon, Form, Dropdown,Confirm, Button, Label, Divider } from "semantic-ui-react";
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { connect } from 'react-redux';
import { getAutomatedReportName, generateReportData, getReportsHistory, getCustomReportInput } from '../../redux/actions/configuration';
import { setReportNameInfo } from '../../redux/actions/order';
import { isChangedToSuccess, isChangedToRejected } from '../../helpers/utils';
import { PleaseWait, DataLoad } from '../../components/common/dimmer';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const TableHeader = ({reportHistoryExecutionData}) => {
  const { sNo, reportName, runDate1, status, errorMessage, nextRun, runType }=reportHistoryExecutionData.tableHeader;
    return (
        <Grid.Row style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: '2px solid rgba(78, 78, 78, 0.2)',
            padding: 5
        }}>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>{sNo}:</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>{reportName}</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>{runDate1}</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>{status}</label>
            </Grid.Column>
            <Grid.Column width={4} style={{paddingRight: 0}}>
                <label className='heading'>{errorMessage}</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>{nextRun}</label>
            </Grid.Column>
            <Grid.Column width={2} style={{paddingRight: 0}}>
                <label className='heading'>{runType}</label>
            </Grid.Column>
        </Grid.Row>
    )
}
const TableRow = ({line, sequence}) => {

    const {sNo, reportName, runDate1, status, errorMessage, nextRun, runType} = line;
    return (
     <Grid.Row style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottom: '2px solid rgba(78, 78, 78, 0.4)',
          padding: 5
     }}>
         <Grid.Column width={2} style={{paddingRight: 0}}>
            <div>{sequence+1}</div>
         </Grid.Column>
         <Grid.Column width={2} style={{paddingRight: 0}}>
            <div>{reportName}</div>
         </Grid.Column>
         <Grid.Column width={2} style={{paddingRight: 0}}>
            <div>{runDate1}</div>
         </Grid.Column>
         {   (status==='Success') && (
              <Grid.Column width={2} style={{paddingRight: 0, color:'#21ba45', fontWeight:'bold'}}>
                  <div>{status}</div>
              </Grid.Column>
          )
         }
         {   (status==='Failed') && (
              <Grid.Column width={2} style={{paddingRight: 0, color:'#E14040', fontWeight:'bold'}}>
                  <div>{status}</div>
              </Grid.Column>
          )
         }
         {   (status==='In Progress') && (
              <Grid.Column width={2} style={{paddingRight: 0, fontWeight:'bold'}}>
                  <div>{status}</div>
              </Grid.Column>
          )
         }
         <Grid.Column width={4} style={{paddingRight: 0}}>
            <div>{errorMessage}</div>
         </Grid.Column>
         <Grid.Column width={2} style={{paddingRight: 0}}>
            <div>{nextRun}</div>
         </Grid.Column>
         <Grid.Column width={2} style={{paddingRight: 0}}>
            <div>{runType}</div>
         </Grid.Column>
     </Grid.Row>
    )
}

const UserInputTableHeader = ({}) => {
  return (
      <Grid.Row style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottom: '2px solid rgba(78, 78, 78, 0.2)',
          padding: 5
      }}>
          <Grid.Column width={2} style={{paddingRight: 0}}>
              <label className='heading'>SNo.</label>
          </Grid.Column>
          <Grid.Column width={4} style={{paddingRight: 0}}>
              <label className='heading'>Report Input Type</label>
          </Grid.Column>
          <Grid.Column width={4} style={{paddingRight: 0}}>
              <label className='heading'>Report Input Value</label>
          </Grid.Column>
          <Grid.Column width={2} style={{paddingRight: 0}}>
          </Grid.Column>
      </Grid.Row>
  )
}

class AutomatedReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportTypes: [
        {
            "value": 'Custom PO Report',
            "key": 1,
            "text": 'Custom PO Report'
        }
      ],
      reportInputs:  [/*{
            "value": 'Start Date',
            "key": 1,
            "text": 'Start Date'
        },
        {
          "value": 'End Date',
          "key": 1,
          "text": 'End Date'
        },*/
        {
          "value": 'orderNumber',
          "key": 1,
          "text": 'Order Number'
        }],
      reportInputKey:'',
      reportInputText:'',
      reportInputValue:'',
       //props.reportTypes,
      reportType: props.reportType,
      deviceOrderNo: props.deviceOrderNo,
      tableHeaders: props.tableHeaders,
      tableRows: props.tableRows,
      showDimmer: false,
      validationResult: {
        status: 'SUCCESS',
        message: '',
      },
      startDate: props.startDate ? moment(props.startDate, "DD/MM/YYYY") : moment(),
      endDate: props.endDate ? moment(props.endDate, "DD/MM/YYYY") : moment(),
      startDate: props.startDate,
      endDate: props.endDate,
      ratePlan: props.ratePlan,
      brn: props.brn,
      cmss: props.cmss,
      promotionName: props.promotionName,
      currentPage: 1,
      todosPerPage: 5,
      lastPage: null,
      indexOfLastTodo: null,
      indexOfFirstTodo: null,
      currentTodos: null,
      pageNumbers: [],
      firstIndexCurrentPage: 1,
      lastIndexCurrentPage: 1,
      reportHistoryData: props.reportHistoryExecutionData.tableRow===undefined?'':props.reportHistoryExecutionData.tableRow,
      userInputData:[],
      showHistoryDimmer: false,
      currentPageUserInput: 1,
      todosPerPageUserInput: 5,
      lastPageUserInput: null,
      indexOfLastTodoUserInput: null,
      indexOfFirstTodoUserInput: null,
      currentTodosUserInput: null,
      firstIndexCurrentPageUserInput: 1,
      lastIndexCurrentPageUserInput: 1,
    }

  };

  componentDidMount() {
    this.setState({ showDimmer: true });
    this.props.getAutomatedReportName();
    var self=this;
    setInterval(function(){ 
      self.setState({showHistoryDimmer:true});
      self.props.getReportsHistory(); 
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    if (isChangedToSuccess(this.props.GET_AUTOMATED_REPORT_NAME_STATUS, nextProps.GET_AUTOMATED_REPORT_NAME_STATUS)) {
      this.setState({ showDimmer: false, reportTypes: nextProps.reportTypes });
      this.props.getReportsHistory();
    }
    else if (isChangedToRejected(this.props.GET_AUTOMATED_REPORT_NAME_STATUS, nextProps.GET_AUTOMATED_REPORT_NAME_STATUS)) {
      this.setState({ showDimmer: false,  });//, validationResult: { ...validationResult, status: 'FAILURE', message: ['Seems like server is down'] } });
    }
    else if (isChangedToSuccess(this.props.FETCH_REPORT_DATA_STATUS, nextProps.FETCH_REPORT_DATA_STATUS)) {
      this.setState({ showDimmer: false, tableHeaders: nextProps.tableHeaders, tableRows: nextProps.tableRows, isStatusChecked: true });//, validationResult: { ...validationResult, status: 'FAILURE', message: ['Seems like server is down'] } });
    }
    else if (isChangedToRejected(this.props.FETCH_REPORT_DATA_STATUS, nextProps.FETCH_REPORT_DATA_STATUS)) {
      this.setState({ showDimmer: false });//, validationResult: { ...validationResult, status: 'FAILURE', message: ['Seems like server is down'] } });
    }
    else if(isChangedToSuccess(this.props.GET_REPORTS_EXECUTION_HISTORY_STATUS, nextProps.GET_REPORTS_EXECUTION_HISTORY_STATUS)) {
      this.setState({ showHistoryDimmer: false, reportHistoryData:nextProps.reportHistoryExecutionData.tableRow});
    }
    else if (isChangedToRejected(this.props.GET_REPORTS_EXECUTION_HISTORY_STATUS, nextProps.GET_REPORTS_EXECUTION_HISTORY_STATUS)) {
      this.setState({ showHistoryDimmer: false });//, validationResult: { ...validationResult, status: 'FAILURE', message: ['Seems like server is down'] } });
    }
    else if(isChangedToSuccess(this.props.GET_CUSTOM_REPORT_INPUTS_STATUS, nextProps.GET_CUSTOM_REPORT_INPUTS_STATUS)) {
      this.setState({ showDimmer: false, reportInputs:nextProps.reportInputs});
    }
    else if (isChangedToRejected(this.props.GET_CUSTOM_REPORT_INPUTS_STATUS, nextProps.GET_CUSTOM_REPORT_INPUTS_STATUS)) {
      this.setState({ showDimmer: false });//, validationResult: { ...validationResult, status: 'FAILURE', message: ['Seems like server is down'] } });
    }

  }

  reset = () => {
    this.setState({
      reportType: null,
      reportInputs:null,
      userInputData:[]
    });
  }

 /* next = () => {
    let { reportType, deviceOrderNo } = this.state;
    this.props.getReportData(reportType, deviceOrderNo);

  }
*/
  submit = () => {
    let { userInputData, reportType } = this.state;
    this.setState({ showDimmer: true });
   /* this.setState({
     });*/
    let tempUserInputDate={
      reportName:reportType,
      userData:userInputData
    };

    this.props.generateReportData(tempUserInputDate);
    var self=this;
    setTimeout(function(){
      self.setState({ showDimmer: false,
        validationResult: {
        status: 'POSITIVE',
        message: 'We are generating your report, report will be ready shortly and will be shared to you via email/ placed at the respective location'
      } });
    }, 3000);
  }


  handleChange = (e, { type, name, value, checked }) => {
    let { reportInputs } =this.state;
    this.setState({ [name]: value});
    if(name==='reportType'){
       // reportInputs
        this.setState({
         reportInputs:null,
         userInputData:[],
         showDimmer: true,
         reportInputKey:null,
         reportInputValue:''
       });
       this.props.getCustomReportInput(value);
      
    }
    if(name==='reportInputKey'){
      this.setState({
        reportInputValue:''
      });
           for(let object in reportInputs){
              if(reportInputs[object].value===value){
                this.setState({'reportInputText': reportInputs[object].text})
                
              }
           }
    }
    if(type==='text' ){
      this.setState({reportInputValue:value});
    }
  }


  handleClick(type) {
    let { currentPage, reportHistoryData, todosPerPage } = this.state;
    if (reportHistoryData.length > 0) {
      if (type === 'First') {
        currentPage = 1
      }
      else if (type === 'Next' && currentPage < Math.ceil(reportHistoryData.length / todosPerPage)) {
        currentPage += 1
      }
      else if (type === 'Prev' && currentPage > 1) {
        currentPage -= 1
      }
      else if (type === 'Last') {
        currentPage = Math.ceil(reportHistoryData.length / todosPerPage);
      }
      this.setState({
        currentPage: Number(currentPage),
        lastPage: Number(Math.ceil(reportHistoryData.length / todosPerPage)),
        firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage + 1,
      });
    }
  }

   populateData = ()=>{
    let { userInputData, reportInputText,reportInputValue, reportInputKey, reportType }=this.state;
    
    if(reportType != null && reportType === 'Real Time Trade Partner'){
      reportInputValue = reportInputValue.format("DD-MMM-YYYY")
    }
    if(reportInputValue!==null && reportInputValue!==undefined && reportInputValue!==''){
        for(let object in userInputData){
            if(userInputData[object].userInputType===reportInputText){
                this.setState({
                  validationResult: {
                  status: 'FAILURE',
                  message: 'Value already added for Input: '+reportInputText
                }});
                return;
            }
        }
        this.setState({
            userInputData:[...userInputData,{
                  sNo:userInputData.length+1,
                  userInputType:reportInputText,
                  userInputValue:reportInputValue,
                  userInputName:reportInputKey,
                  reportType:reportType
            }]});
    }
    else{
      this.setState({
        validationResult: {
        status: 'FAILURE',
        message: 'User Input cant be blank, please enter value for '+reportInputText
      }})
    }
   
  };

  removeRow(row) {
    let { userInputData } = this.state;
    let tempToDos= userInputData.filter((x) => {
      return x.sNo !== row.sNo
    });
    this.setState({ userInputData:tempToDos }); 
  }


  render() {
    const utcOffset = 0;
    let { reportType, reportTypes, deviceOrderNo, isdeviceOrderNo, tableHeaders, tableRows, showDimmer, startDate, showHistoryDimmer,
      endDate, ratePlan, brn, cmss, promotionName, reportHistoryData,
      currentPage,
      todosPerPage,
      indexOfLastTodo,
      indexOfFirstTodo,
      currentTodos,
      firstIndexCurrentPage,
      lastIndexCurrentPage,
      reportInputs,
      reportInputKey,
      reportInputText,
      reportInputValue,
      userInputData,
      currentPageUserInput,
      todosPerPageUserInput,
      lastPageUserInput,
      indexOfLastTodoUserInput,
      indexOfFirstTodoUserInput,
      currentTodosUserInput,
      firstIndexCurrentPageUserInput,
      lastIndexCurrentPageUserInput
  } = this.state;
    let { isStatusChecked, reportHistoryExecutionData } = this.props;
    let { status, message } = this.state.validationResult;

    indexOfLastTodo = currentPage * todosPerPage;
    indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    currentTodos = reportHistoryData.slice(indexOfFirstTodo, indexOfLastTodo);
    currentTodosUserInput = userInputData.slice(indexOfFirstTodoUserInput, indexOfLastTodoUserInput);
    const UserInputTableRow= ({ line, sequence }) => {
        const {sNo, userInputType, userInputValue} = line;
        return (
         <Grid.Row style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottom: '2px solid rgba(78, 78, 78, 0.4)',
              padding: 5
         }}>
             <Grid.Column width={2} style={{paddingRight: 0}}>
                <div>{sequence+1}</div>
             </Grid.Column>
             <Grid.Column width={4} style={{paddingRight: 0}}>
                <div>{userInputType}</div>
             </Grid.Column>
             <Grid.Column width={4} style={{paddingRight: 0}}>
                <div>{userInputValue}</div>
             </Grid.Column>
             <Grid.Column width={2} style={{paddingRight: 0}}>  
               <Button basic icon='trash' color='red' onClick={()=>this.removeRow(line)}/>
             </Grid.Column>
         </Grid.Row>
        )
    }

    return (
      
      <Container fluid>
        <PleaseWait active={showDimmer} />
        <Divider horizontal style={{color:'#293895'}} className='heading'>Report Modules</Divider>
        <Segment basic style={{ padding: 0, paddingTop: 15 }}>
          <Form size='small'>
            <Grid style={{ paddingLeft: 10 }}>
              <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width='16' style={{ padding: 0 }}>
                  {
                    (status === 'FAILURE') &&
                    <Message negative compact size='small' style={{ minWidth: 400 }}
                      onDismiss={() => this.setState(  {validationResult: { status:'SUCCESS' }})}>
                      <Message.Header>We have encounted an error.</Message.Header>
                      <p>{message}</p>
                    </Message>
                  }
                  {
                  (status==='POSITIVE')&&
                  <Message positive compact size='small' style={{minWidth: 400}} onDismiss={() => this.setState( {validationResult: { status:'SUCCESS' }})}>
                    <p>{message}</p>
                  </Message>
                  }
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                <Grid.Column width={6}>
                  <label className='heading'>Automated Report</label>
                  <Dropdown placeholder='Please select' size='small' selection options={reportTypes} onChange={this.handleChange} value={reportType} name='reportType' fluid />
                </Grid.Column>
              </Grid.Row>
              {(reportType!=null && reportType!='' && reportType!=undefined) && (
                  <React.Fragment>
                      <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                        <Grid.Column width={6}>
                          <label className='heading'>Report Inputs</label>
                          <Dropdown placeholder='Please select' size='small' selection options={reportInputs} onChange={this.handleChange} value={reportInputKey} name='reportInputKey' fluid />
                        </Grid.Column>
                        { (reportInputKey !==null && reportInputKey !== '') && (
                            <React.Fragment>
                                                 <Grid.Column width={4} >
                                                   <label className='heading'>{reportInputText}</label>
                                                   { (reportType !==null && reportType === 'Real Time Trade Partner') && (
                              
                                                        <DatePicker
                                                            utcOffset={utcOffset}
                                                            name={reportInputKey}
                                                            maxDate={moment()}
                                                            selected={reportInputValue}
                                                            onSelect={(reportInputValue) => this.setState({ reportInputValue })}
                                                            dateFormat="DD-MMM-YYYY"
                                                            placeholderText="DD-MMM-YYYY" />
                                                       
                                                       
                                                   )}
                                                   { (reportType !==null && reportType !== 'Real Time Trade Partner') && (
                                                     
                                                   <Input  value={reportInputValue}  name={reportInputKey} fluid  onChange={this.handleChange}/>
                                                  
                                                   )}
                                                 </Grid.Column>
                                                 <Grid.Column width={1} style={{ paddingTop:20}}>
                                                  <Button compact icon='add circle' onClick={this.populateData}/>
                                                 </Grid.Column>
                            </React.Fragment>
                          )
                        }
                      </Grid.Row>
                  </React.Fragment>
                )
              }
            </Grid>
          </Form>
        </Segment>
        {(reportType!=null && reportType!='' && reportType!=undefined) && (
            <React.Fragment>
                  <Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <PrimaryButton value='FETCH' onClick={this.submit} />
                    <div style={{ padding: 20 }} />
                    <SecondaryButton value='RESET' onClick={this.reset} />
                  </Segment>  
            </React.Fragment>
          )
        }
        {(userInputData!=null && userInputData!='' && userInputData!=undefined && userInputData.length>0) && (
            <React.Fragment>

                <Grid style={{ fontSize: 11, padding: 10, paddingLeft: 20, paddingRight:350 }}>
                      <Grid.Row style={{paddingLeft:0, paddingTop:20}}>
                        <Grid.Column style={{ paddingLeft:10 }} >
                          <label style={{color:'#293895'}} className='heading'>User Data Input</label>
                        </Grid.Column>
                      </Grid.Row> 
                      <Grid.Row style={{ paddingBottom: 0, paddingLeft: 10, paddingTop: 5 , opacity:0.7}}>
                        <Grid.Column width='8' style={{ paddingLeft: 0 }}>
                          <label>Displaying {(userInputData.length === 0) && (0)}{(userInputData.length > 0) && (firstIndexCurrentPageUserInput)}-{(firstIndexCurrentPageUserInput - 1) + currentTodosUserInput.length} / {userInputData.length}</label>
                        </Grid.Column>
                        <Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
                          <label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='pointer'>First</label>
                                            <label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='pointer'>Prev</label>
                          <label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='pointer'>Next</label>
                          <label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='pointer'>Last</label>
                          <label onClick={() => this.handleClick('Last')} >({(userInputData.length === 0) && (0)} {(userInputData.length > 0) && (currentPageUserInput)} of {Math.ceil(userInputData.length / todosPerPageUserInput)})</label>
                        </Grid.Column>
                      </Grid.Row>
                      <UserInputTableHeader/>
                      {
                          userInputData.map((line, index) => {
                            return (<UserInputTableRow 
                                      line={line} 
                                      key={index}
                                      sequence= {index}/>
                                    )
                          })
                      }
                </Grid>      
            </React.Fragment>
          )
        }
        <Segment basic>
           <DataLoad active={showHistoryDimmer} />
            <Grid style={{ paddingLeft: 10, paddingTop: 20 }}>
                <Grid.Row style={{paddingLeft:0, paddingTop:20}}>
                  <Grid.Column style={{ paddingLeft:10 }} >
                    <label style={{color:'#293895'}} className='heading'>Report Execution History</label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingBottom: 0, paddingLeft: 10, paddingTop: 5 , opacity:0.7}}>
                  <Grid.Column width='8' style={{ paddingLeft: 0 }}>
                    <label>Displaying {(reportHistoryData.length === 0) && (0)}{(reportHistoryData.length > 0) && (firstIndexCurrentPage)}-{(firstIndexCurrentPage - 1) + currentTodos.length} / {reportHistoryData.length}</label>
                  </Grid.Column>
                  <Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
                    <label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='pointer'>First</label>
                                      <label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='pointer'>Prev</label>
                    <label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='pointer'>Next</label>
                    <label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='pointer'>Last</label>
                    <label onClick={() => this.handleClick('Last')} >({(reportHistoryData.length === 0) && (0)} {(reportHistoryData.length > 0) && (currentPage)} of {Math.ceil(reportHistoryData.length / todosPerPage)})</label>
                  </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid style={{fontSize: 11, padding: 10, paddingLeft: 22 }}>
                  
                  {(reportHistoryExecutionData!==undefined  && reportHistoryExecutionData.tableHeader!==undefined) &&
                      <TableHeader  reportHistoryExecutionData={reportHistoryExecutionData}/>
                  }
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
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reportTypes: state.configuration.data.reportTypes,
    GET_AUTOMATED_REPORT_NAME_STATUS: state.configuration.meta.GET_AUTOMATED_REPORT_NAME_STATUS,
    reportType: state.order.data.reportType,
    deviceOrderNo: state.order.data.deviceOrderNo,
    tableHeaders: state.configuration.data.tableHeaders,
    tableRows: state.configuration.data.tableRows,
    startDate: state.order.data.startDate,
    endDate: state.order.data.endDate,
    ratePlan: state.order.data.ratePlan,
    brn: state.order.data.brn,
    cmss: state.order.data.cmss,
    promotionName: state.order.data.promotionName,
    FETCH_REPORT_DATA_STATUS: state.configuration.meta.FETCH_REPORT_DATA_STATUS,
    reportHistoryExecutionData:state.configuration.data.reportHistoryExecutionData,
    GET_REPORTS_EXECUTION_HISTORY_STATUS:state.configuration.meta.GET_REPORTS_EXECUTION_HISTORY_STATUS,
    GET_CUSTOM_REPORT_INPUTS_STATUS:state.configuration.meta.GET_CUSTOM_REPORT_INPUTS_STATUS,
    reportInputs: state.configuration.data.reportInputs,
  }
}
const mapDispatchToProps = {
  getAutomatedReportName,
  setReportNameInfo,
  generateReportData,
  getReportsHistory,
  getCustomReportInput
}

export default connect(mapStateToProps, mapDispatchToProps)(AutomatedReport)