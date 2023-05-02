import React, { Component } from 'react';
import {
	Grid, Message, Input, Select, Checkbox, Segment, Container, Icon, Form, Dropdown,
	Confirm, Table, Menu, Tab
} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { StaticBlock1, StaticBlock7 } from '../../components/common/dumb-component';
import { connect } from 'react-redux';
import {
	getSIMTypeReplcmtReason
} from '../../redux/actions/configuration';
import { submitForFullfilment ,updateMsisdnAndStatus,deleteSelectedSimOrder} from '../../redux/actions/order';
import { PleaseWait } from '../../components/common/dimmer';
import { isChangedToRejected } from '../../helpers/utils';
import {  getSearchData } from '../../redux/actions/order';
import UpdateAction from './update-action';

class StatusUpdation extends Component {
constructor(props){

    super(props);
    const { url } = this.props.match;
    this.state = {
        nextUrl:url.substring(url.lastIndexOf("/"))  ,    
        showDimmer: false,
        bulkSearchData: props.bulkSearchData,
        bulkSearchListValue: [],
        caCurrentPage: 1,
       // caTodosPerPage: 10,
        caIndexOfFirstTodo: null,
        caIndexOfLastTodo: null,
        caCurrentTodos: [],
       // caFirstIndexCurrentPage: 1,
        validationResult: {
            status: '',
            message: '',
        },
        bulkRegId: '',
        isMsisdnChecked:props.isMsisdnChecked,
        msisdnChecked:props.msisdnChecked,
        tempEdit:false,
        msisdnSelected:'',
        disabled: false,
        CheckboxValue:false,
        msisdnChecked:false,
        statusList: props.statusList,
        bulkUsers: props.bulkUsers,
        disabledButtons:false,
        status:'',
        removeMsisdns:[],
        disabledButtonsNew:true,
        showerror:false,
        message:'',
        todos: props.bulkSearchData,
        currentPage: 1,
        todosPerPage: 10,
        firstIndexCurrentPage: 1,
        currentTodos: null,
        errormessage:''
    };
    this.updateAction = React.createRef();
}

componentDidMount() {
    let {bulkRegId,nextUrl}=this.state
    let tempbulkRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
    this.setState({bulkRegId:tempbulkRegId})
    this.props.getSearchData(tempbulkRegId);
    this.props.getSIMTypeReplcmtReason();
}
componentWillReceiveProps(nextProps) {
    if (this.props.GET_BULK_SEARCH_DATA_STATUS !== 'SUCCESS' &&
        nextProps.GET_BULK_SEARCH_DATA_STATUS === 'SUCCESS') {
        if(nextProps.bulkSearchData != null){
            let tempBulkSearchDataListValue = nextProps.bulkSearchData;
            this.setState({ bulkSearchListValue: tempBulkSearchDataListValue,todos: nextProps.bulkSearchData});
            var abc = false ;
                tempBulkSearchDataListValue.map((value)=>{
                if(value.simStatusName !=='Passed Validation'){
                  this.setState({disabledButtons:false})
                  abc=true;
                }
                if(value.simStatusName === 'Pending Validation' || value.simStatusName ==='Passed Validation' || value.simStatusName ==='Failed Validation'){
                    this.setState({disabledButtonsNew:false})
                }
                if(value.simStatusName === 'Rejected'){
                    this.setState({disabledButtonsNew:true,disabledButtons:false});
                    if(this.props.UPDATE_MSISDN_STATUS === 'SUCCESS'){
                        this.setState({showDimmer:false,validationResult:{
                            status: 'SUCCESS',
                            message:'Rejected Successfully'
                        }});
                    }
                }
                // if(value.simStatusName ==='Failed Validation'){
                //   this.setState({disabledButtons:true})
                // }
                
                })
                
                if(!abc){
                    this.setState({disabledButtons:true})
                }
                this.setState({showDimmer:false});
                this.setState({
                    caCurrentPage:1,
                    FirstIndexCurrentPage:1,
                });
        }
    }
   
    else if(this.props.UPDATE_MSISDN_STATUS !== 'SUCCESS' &&
    nextProps.UPDATE_MSISDN_STATUS === 'SUCCESS'){
    this.setState({status:'SUCCESS'});
    this.props.getSearchData(this.state.bulkRegId);
    let rejected = false;
    let submitforfullfilment=false;
    let tempBulkSearchListValue = this.state.bulkSearchListValue;
    }

    else if(this.props.UPDATE_MSISDN_STATUS !== 'FAILED' &&
    nextProps.UPDATE_MSISDN_STATUS === 'FAILED'){
       
    this.setState({status:'FAILURE',message:'Updation Failed'});
    }

    else if(this.props.DELETE_SELECTED_SIM_ORDER_STATUS !== 'SUCCESS' &&
    nextProps.DELETE_SELECTED_SIM_ORDER_STATUS === 'SUCCESS')
    {
      var tempBulkSearchListValue = this.state.bulkSearchListValue.filter((line)=>{
                                                                 return line.checkboxValue !== true
                                                                    }); 
    this.setState({showDimmer:false,bulkSearchListValue:tempBulkSearchListValue,validationResult:{
        status: 'SUCCESS',
        message:'Deleted Successfully'
    }});

    }
    
    else if(this.props.SET_SUBMIT_FOR_FULLFILMENT_STATUS !== 'SUCCESS' &&
    nextProps.SET_SUBMIT_FOR_FULLFILMENT_STATUS === 'SUCCESS'){
    this.setState({showDimmer:false,disabledButtonsNew:true,disabledButtons:false});
    }
    else if(this.props.SET_SUBMIT_FOR_FULLFILMENT_STATUS !== 'FAILED' &&
    nextProps.SET_SUBMIT_FOR_FULLFILMENT_STATUS === 'FAILED'){
    this.setState({showDimmer:false});
    }
    


    if (this.props.GET_BULK_SEARCH_DATA_STATUS !== 'FAILED' &&
        nextProps.GET_BULK_SEARCH_DATA_STATUS === 'FAILED') {
        this.setState({ bulkSearchListValue: [], showDimmer: false,
                        validationResult:{
                            status:'FAILURE',
                            message:'We have encounted some error while fetching data.',
                        } });
        this.setState({
                            caCurrentPage: 1,
                            FirstIndexCurrentPage: 1,
                        });
    }

    if (this.props.GET_SIM_TYPE_REPLCMT_REASON_STATUS !== 'SUCCESS' &&
    nextProps.GET_SIM_TYPE_REPLCMT_REASON_STATUS === 'SUCCESS') {
    this.setState({ bulkUsers: nextProps.bulkUsers,
                    statusList:nextProps.statusList,
                    showDimmer:false });

}
}

handleClick(type) {
    let { currentPage, todos, todosPerPage,bulkSearchListValue } = this.state;
    if (todos.length > 0) {
        if (type === 'First') {
            currentPage = 1
        }
        else if (type === 'Next' && currentPage < Math.ceil(bulkSearchListValue.length / todosPerPage)) {
            currentPage += 1
        }
        else if (type === 'Prev' && currentPage > 1) {
            currentPage -= 1
        }
        else if (type === 'Last') {
            currentPage = Math.ceil(bulkSearchListValue.length / todosPerPage);
        }
        this.setState({
            currentPage: Number(currentPage),
            lastPage: Number(Math.ceil(todos.length / todosPerPage)),
            firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage + 1,
        });
    }
}


handleChange = (e, {type, name, value, checked }) => {
        if (type === 'checkbox') {
            this.setState({ [name]: checked , msisdnChecked: checked });
          }else{
            this.setState({ [name]: value });
          }
          if(name==='msisdnChecked'){
            this.setState({msisdnChecked:value})
          }

}


onClickEditMsisdn(line){
    this.setState({tempEdit:true,msisdnSelected:line.msisdn,msisdnChecked:''})   
};

update=(msisdnChecked)=>{
    let tempBulkSearchListValue = this.state.bulkSearchListValue;
    let bulkRegIdValue= this.state.bulkRegId;
    let msisdnNew=this.state.msisdnChecked;
    let msisdnToEdit=this.state.msisdnSelected;
 this.props.updateMsisdnAndStatus(bulkRegIdValue,msisdnNew,msisdnToEdit);

}

previous = () => {
    this.props.history.goBack();
}
handleCheckBox =(line)=>{
    let tempBulkSearchListValue = this.state.bulkSearchListValue;
    var  checkValue = true;
    if(line.checkboxValue === undefined || line.checkboxValue === null || line.checkboxValue === false ){
        checkValue = false;
    }
    for(var i=0;i<tempBulkSearchListValue.length;i++){
        if(tempBulkSearchListValue[i].msisdn === line.msisdn){
           tempBulkSearchListValue[i].checkboxValue = !checkValue;
        }
    }
    this.setState({bulkSearchListValue:tempBulkSearchListValue});
}



removeRow() {
    let{showDimmer}=this.state;
     let bulkRegIdValue= this.state.bulkRegId;
    var tempBulkSearchListValue = this.state.bulkSearchListValue.filter((line)=>{
        return line.checkboxValue === true
            });
if(tempBulkSearchListValue===null || tempBulkSearchListValue===undefined || tempBulkSearchListValue.length===0){
    this.setState({showerror:true,
        errormessage:'Please select atleast One line to delete'
    }); 
    return
}

            this.setState({showDimmer:true,removeMsisdns:tempBulkSearchListValue})
           if(this.state.bulkSearchListValue.length===tempBulkSearchListValue.length){
            for(var i=0;i<tempBulkSearchListValue.length;i++){
                tempBulkSearchListValue[i].deleteBulkData=true; 
                }
            }
            
            this.props.deleteSelectedSimOrder(tempBulkSearchListValue);
} 

changeStatus() {
    let tempBulkSearchListValue = this.state.bulkSearchListValue;  
    let bulkRegIdValue= this.state.bulkRegId;
    this.setState({showDimmer: true});
    this.props.updateMsisdnAndStatus(bulkRegIdValue,null,null,null,null,null,null);
}

submitForFullfilment() {
    let tempBulkSearchListValue = this.state.bulkSearchListValue;
    let bulkRegIdValue= this.state.bulkRegId;
    for(var i=0;i<tempBulkSearchListValue.length;i++){
        if(tempBulkSearchListValue[i].simStatusName = 'Passed Validation'){
           tempBulkSearchListValue[i].simStatusName = 'Approved for Fulfillment'
           tempBulkSearchListValue[i].bulkRegId = bulkRegIdValue;
        }
    }
    this.setState({bulkSearchListValue:tempBulkSearchListValue});     
    this.setState({showDimmer: true,validationResult:{
        status: 'SUCCESS',
        message:'Submitted for Fulfillment'
    }});    
    this.props.submitForFullfilment(bulkRegIdValue);

}

openViewModal = (msisdn) => {
    let statusList = this.state.statusList;
    let bulkUsers = this.state.bulkUsers;
    this.updateAction.current.show(msisdn,statusList,bulkUsers);
};

save = (msisdn,simType,newSimNo,reason,msisdnToEdit,suspensionRequired) =>{
    let tempBulkSearchListValue = this.state.bulkSearchListValue;
    let bulkRegIdValue= this.state.bulkRegId;
    if(msisdn === undefined || msisdn === null){
        this.setState({showerror:true,errormessage:'MSISDN CANNOT BE BLANK'} )
     }

     this.props.updateMsisdnAndStatus(bulkRegIdValue,msisdn,msisdnToEdit,simType,newSimNo,reason,suspensionRequired);

}
dismiss = () =>{
    this.setState({status:''});
}

close(proceed) {
    if (proceed === 'yes') {
        this.setState({ open: false, showDimmer: true });
        this.props.history.push(this.state.nextUrl);

    }
    else {
        this.setState({ open: false })
    }
}


render() {
    let {bulkSearchListValue,
         caCurrentPage,
        caIndexOfFirstTodo, caIndexOfLastTodo, caCurrentTodos ,msisdn,isMsisdnChecked,msisdnChecked,disabled, CheckboxValue,disabledButtons, disabledButtonsNew,
        todos,currentPage,
        todosPerPage,firstIndexCurrentPage,currentTodos,showDimmer,showerror,errormessage} = this.state;
        caIndexOfLastTodo = currentPage * todosPerPage;
		caIndexOfFirstTodo = caIndexOfLastTodo - todosPerPage;
        caCurrentTodos = bulkSearchListValue.slice(caIndexOfFirstTodo, caIndexOfLastTodo);
    let { status, message} = this.state.validationResult;
        const TableHeader = () => {
            return (
                <Grid.Row style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(78, 78, 78, 0.2)',
                    padding: 5
                }}>
                    <Grid.Column width={2} style={{paddingRight: 0}}>
                        <label className='heading'>MSISDN</label>
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingRight: 0}}>
                        <label className='heading'>Status</label>
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingRight: 0}}>
                        <label className='heading'>Actions</label>
                    </Grid.Column>
                    <Grid.Column width={2} style={{paddingRight: 0}}>
                        <label className='heading'>CHECKLIST</label>
                    </Grid.Column>
                </Grid.Row>
            )
        }



        const TableRow = ({line}) => {  
            let {isMsisdnChecked}=this.state;
            const {msisdn, simStatusName,wmremarks} = line;
           console.log("wmrremarks"+wmremarks);
            return (
                <Grid.Row style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)',
                    padding: 2
                }}>
                    <Grid.Column width={2} style={{paddingRight: 0}}>
                        <div>{msisdn}</div>
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingRight: 0}}>
                    {(simStatusName==='Failed Validation') &&
                     <div>{wmremarks}</div>
                    }
                    {(simStatusName==='Approved for Fulfillment'|| simStatusName==='Completed Fulfillment' 
                         || simStatusName==='Failed Fulfillment'  || simStatusName==='Rejected' || simStatusName==='Pending Validation'|| simStatusName==='Passed Validation' ) && 
                   
                    <div>{simStatusName}</div>
                    }
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingRight: 0}}>
                  {(simStatusName==='Approved for Fulfillment'|| simStatusName==='Completed Fulfillment' 
                         || simStatusName==='Failed Fulfillment'  || simStatusName==='Rejected' || simStatusName==='Pending Validation'|| simStatusName==='Passed Validation' ) && 
                       <Icon className='edit outline'/> 
                  }
                  {(simStatusName==='Failed Validation' )&&
                 <Icon className='edit outline'
                 onClick={() => {
					this.openViewModal(line.msisdn)
                                }}
                  /> }
                    </Grid.Column>
                    
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                    <Checkbox style={{ padding: 5 }} 
                    onClick={() => this.handleCheckBox(line)} 
                    name='CheckBox'
                    checked={line.checkboxValue}
                    disabled={(simStatusName==='Approved for Fulfillment' || simStatusName==='Sent for Fulfillment' || simStatusName==='Completed Fulfillment' || simStatusName==='Failed Fulfillment'  || simStatusName==='Rejected' )?true:false}
                    />
					</Grid.Column>
                   
                </Grid.Row>
            )
        }
    return (
        <Container fluid>
        <PleaseWait active={showDimmer} />
         <Grid style={{fontSize: 11, padding: 10}}>
         <Grid.Row style={{ paddingBottom: 0, paddingLeft: 0, paddingTop: 50 }}>
								<Grid.Column width='7' style={{ paddingLeft: 0 }}>
									<label>Displaying {(bulkSearchListValue.length === 0) && (0)}{(bulkSearchListValue.length > 0) && (firstIndexCurrentPage)}-{(firstIndexCurrentPage - 1) + caCurrentTodos.length} / {bulkSearchListValue.length}</label>
								</Grid.Column>
								<Grid.Column width='5' textAlign='right' style={{ paddingRight: 0 }}>
									<label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='pointer'>First</label>
                                    <label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='pointer'>Prev</label>
									<label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='pointer'>Next</label>
									<label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='pointer'>Last</label>
									<label onClick={() => this.handleClick('Last')} >({(todos.length === 0) && (0)} {(todos.length > 0) && (currentPage)} of {Math.ceil(todos.length / todosPerPage)})</label>
								</Grid.Column>
							</Grid.Row>

                        <TableHeader/>
                        {caCurrentTodos.map((line, key) => {
                            return (
                                <TableRow key={key} line={line} />
                            )
                        })}
                    </Grid>
                <Grid>
            <Grid.Row style={{ paddingLeft: 450, paddingTop: 50, paddingBottom: 20 }}>
							<SecondaryButton value='Delete Selected'
                             onClick={() => this.removeRow()}  
                             disabled={disabledButtonsNew}
                             />
							<div style={{ padding: 10 }} />
							<SecondaryButton value='Submit for Fulfillment' onClick={() => this.submitForFullfilment()} disabled={!disabledButtons} />
                            <div style={{ padding: 10 }} />
							<SecondaryButton value='Reject' onClick={() => this.changeStatus()} disabled={disabledButtonsNew} />
						</Grid.Row>
              </Grid>
             
              {
						(showerror) &&
						<Message negative compact size='small' style={{ maxWidth: 400, marginTop: 20 }}
							onDismiss={() => this.setState({ showerror: false })}>
							<Message.Header></Message.Header>
							<p>{errormessage}</p>
						</Message>
					}
              <UpdateAction
					ref={this.updateAction}
                    onClose={() => console.log('close')} 
                    onSave={(msisdn,simType,newSimNo,reason,msisdnToEdit,suspensionRequired) => this.save(msisdn,simType,newSimNo,reason,msisdnToEdit,suspensionRequired)}
                   onDismiss = {() => this.dismiss()}
                    status={this.state.status} />

                    <Grid.Row style={{ padding: 0 }}>
								<Grid.Column width='16' style={{ padding: 0 }}>
									{
									(status=== 'SUCCESS') &&
                                    <Message positive compact size='small' style={{ minWidth: 400 }}
                                        onDismiss={() => this.setState({ status: '' })}>
                                        <Message.Header></Message.Header>
                                        <p>{message}</p>
                                    </Message>
									}
								</Grid.Column>
							</Grid.Row>
            <Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<SecondaryButton value='Back To Listing' onClick={this.previous} />
				</Segment>

              <Confirm
						cancelButton='NO'
						confirmButton="YES"
						open={this.state.open}
						header='Are you sure?'
						content='You are trying to delete all the records. Registration will be cancelled. Click OK to proceed'
						onCancel={() => this.close('no')}
						onConfirm={() => this.close('yes')} />      
                    
                   
        </Container>
    )
}

}
const mapStateToProps = (state) => {
	return {
        bulkSearchData: state.order.data.bulkSearchData,
        GET_BULK_SEARCH_DATA_STATUS: state.order.meta.GET_BULK_SEARCH_DATA_STATUS,
        isMsisdnChecked: state.order.data.isMsisdnChecked,
        msisdnChecked: state.order.data.msisdnChecked,
        SET_SUBMIT_FOR_FULLFILMENT_STATUS: state.order.meta.SET_SUBMIT_FOR_FULLFILMENT_STATUS,
        UPDATE_MSISDN_STATUS:state.order.meta.UPDATE_MSISDN_STATUS,
        bulkUsers: state.configuration.data.bulkUsers,
        statusList:state.configuration.data.statusList,
        GET_SIM_TYPE_REPLCMT_REASON_STATUS:state.configuration.meta.GET_SIM_TYPE_REPLCMT_REASON_STATUS, 
        DELETE_SELECTED_SIM_ORDER_STATUS: state.order.meta.DELETE_SELECTED_SIM_ORDER_STATUS,
        
        
	}
}

const mapDispatchToProps = {
    getSearchData,
    submitForFullfilment,
    updateMsisdnAndStatus,
    getSIMTypeReplcmtReason,
    deleteSelectedSimOrder

}

export default connect(mapStateToProps,mapDispatchToProps)(StatusUpdation)