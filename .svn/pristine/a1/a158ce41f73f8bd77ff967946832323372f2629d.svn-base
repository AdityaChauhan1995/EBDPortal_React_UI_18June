import React, { Component } from 'react';
import { Grid, Segment, Container, Form, Button, Table, Input, Dropdown, Message } from "semantic-ui-react";
import { connect } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { PleaseWait } from '../../components/common/dimmer';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
// import Anchor from 'grommet/components/Anchor';

//bulkUsers
import {
    getBulkUsers, getBulkOrdersData
} from '../../redux/actions/configuration';


class BulkRegistration extends Component {
    constructor(props) {
        super(props);
        const { url } = this.props.match;
        this.state = {
            nextUrl: url.substring(0, url.lastIndexOf("/")) + "/status-updation?bulkRegId=",
            openBulkSimSubmissionUrl: url.substring(0, url.lastIndexOf("/")) + "/bulk-sim-submission",
            bulkRegId: '',
            bulkRegType: '',
            status: '',
            uploadedBy: '',
            currentTodos: null,
            todos: props.bulkOrders,
            currentPage: 1,
            todosPerPage: 5,
            lastPage: null,
            indexOfLastTodo: null,
            indexOfFirstTodo: null,
            bulkRegTypes: props.bulkRegTypes,
            statusList: props.statusList,
            showDimmer: false,
            bulkUsers: props.bulkUsers,
            bulkOrders: props.bulkOrders,
            createdBy: props.createdBy,
            bulkStatus: props.bulkStatus,
            date1: moment().subtract(1,'months'),
            date2: moment(),
            totalNumberOfLines: '',
            success: '',
            failure: '',
            bulkStatusCode: '',
            firstIndexCurrentPage: 1,
            validationResult: {
                status: 'SUCCESS',
                message: '',
            }
        }

    }
    _search = (options, query) => {
        if (query.length >= 1) {
            var re = new RegExp(query,"i");
            return options.filter(opt => re.test(opt.text))
        } else {
            return [];
        }

    }
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }
    componentDidMount() {
        this.setState({ showDimmer: true });
        let { createdBy, bulkRegId, bulkStatus } = this.props;
        let {date1, date2} = this.state;
        this.props.getBulkOrdersData(null, null, null, date1, date2,null);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.GET_BULK_USERS_STATUS !== 'SUCCESS' &&
            nextProps.GET_BULK_USERS_STATUS === 'SUCCESS') {
            this.setState({
                bulkUsers: nextProps.bulkUsers,
                statusList: nextProps.statusList,
                bulkRegTypes: nextProps.bulkRegTypes,
                showDimmer: false
            });
        }
        else if (this.props.GET_BULK_ORDERS_DATA_STATUS !== 'SUCCESS' &&
            nextProps.GET_BULK_ORDERS_DATA_STATUS === 'SUCCESS') {
            this.setState({
                bulkOrders: nextProps.bulkOrders,
                todos: nextProps.bulkOrders
            });

            if (nextProps.bulkOrders === null || nextProps.bulkOrders === undefined || nextProps.bulkOrders.length === 0) {
                this.setState({ validationResult: { status: 'FAILURE', message: 'Nothing found to display' },showDimmer:false });
            }
            else {
                this.setState({ validationResult: { status: 'SUCCESS', message: '' } });
            }

            if (this.props.GET_BULK_USERS_STATUS !== 'SUCCESS') {
                this.props.getBulkUsers();
            } else {
                this.setState({ showDimmer: false });
            }

        }
        else if(this.props.GET_BULK_ORDERS_DATA_STATUS !== 'FAILED' &&
                nextProps.GET_BULK_ORDERS_DATA_STATUS === 'FAILED'){
                this.setState({ validationResult: { status: 'FAILURE', message: nextProps.errorMessage },showDimmer:false });
        }
    }
    search = () => {
        let { bulkRegId, bulkStatus, createdBy, date1, date2, bulkStatusCode } = this.state;
        let {userId} =  this.props.user;

        if (createdBy !== '' && createdBy !== null && createdBy !== "null" && createdBy !== undefined) {
            createdBy = createdBy.trim();
        }
        if (bulkStatus !== '' && bulkStatus !== null && bulkStatus !== "null" && bulkStatus !== undefined) {
            bulkStatus = bulkStatus.trim();
        }
        if (bulkRegId !== '' || bulkRegId !== null || bulkRegId !== "null" || bulkRegId !== undefined) {
            bulkRegId = bulkRegId.trim();
        }
        if (this.state.bulkRegId === null || this.state.bulkRegId === undefined || this.state.bulkRegId === '' || this.state.bulkRegId === "null") {
            bulkRegId = null;

        }
        if (this.state.createdBy == null || this.state.createdBy == undefined || this.state.createdBy == '' || this.state.createdBy === "null") {
            createdBy = null;

        }
        if (this.state.bulkStatusCode === null || this.state.bulkStatusCode === undefined || this.state.bulkStatusCode === '' || this.state.bulkStatusCode === "null") {
            bulkStatusCode = null;

        }
        if (this.state.date1 == null || this.state.date1 == undefined || this.state.date1 == '' || this.state.date1 === "null") {
            date1 = null;

        }
        if (this.state.date2 == null || this.state.date2 == undefined || this.state.date2 == '' || this.state.date2 === "null") {
            date2 = null;
        }
        if (bulkStatus === 'Pending Validation') {
            bulkStatusCode = '1';
        }
        if (bulkStatus === 'Completed Fulfillment') {
            bulkStatusCode = '2';
        }
        if (bulkStatus === 'Passed Validation') {
            bulkStatusCode = '3';
        }
        if (bulkStatus === 'Failed Validation') {
            bulkStatusCode = '4';
        }
        if (bulkStatus === 'Approved for Fulfillment') {
            bulkStatusCode = '5';
        }
        if (bulkStatus === 'Rejected') {
            bulkStatusCode = '6';
        }
        if (bulkStatus === 'Failed Fulfillment') {
            bulkStatusCode = '7';
        }
        // if (bulkStatus === 'Sent for Fulfillment') {
        //     bulkStatusCode = '8';
        // }
        if ((date1 !== null && date1 !== undefined && date1 !== '') && (date2 === null || date2 === undefined || date2 === '')) {
                alert('Please enter End date');
//            this.setState({ validationResult: { status: 'FAILURE', message: ' End Date is Mandatory' } });
            return;
        }
        if ((date2 !== null && date2 !== undefined && date2 !== '') && (date1 === null || date1 === undefined || date1 === '')) {
            alert('Please enter Start date');
            // this.setState({ validationResult: { status: 'FAILURE', message: ' Start Date is Mandatory' } });
            return;
        }
        this.setState({ showDimmer: true });
        this.props.getBulkOrdersData(bulkRegId, bulkStatusCode, createdBy, date1 !== null ? date1.format("DD-MM-YYYY") : date1, date2 !== null ? date2.format("DD-MM-YYYY") : date2,userId);
    }
    reset = () => {
        let { bulkRegId, bulkStatus, createdBy, date1, date2, bulkStatusCode } = this.state;

        this.setState({
            bulkRegId: '',
            bulkRegType: '',
            bulkStatus: '',
            createdBy: '',
            date1: null,
            date2: null,
            bulkStatusCode: ''
        })
    }
    openBulkSimUpdation = (bulkRegId1) => {
        let tempNextURL = this.state.nextUrl + bulkRegId1;
        this.props.history.push(tempNextURL);
    }
    openBulkSimSubmission = () => {
        this.props.history.push(this.state.openBulkSimSubmissionUrl);
    }

    handleClick(type) {
        let { todosPerPage, currentPage, todos } = this.state;
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
                firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage + 1,
            });
        }
    }

    render() {
        const utcOffset = 0;

        let { bulkRegId, bulkRegType, date1, date2, bulkUsers, bulkRegTypes,
            statusList, bulkOrders, showDimmer, bulkStatus, createdBy,
            todos,
            currentTodos,
            currentPage,
            todosPerPage,
            indexOfLastTodo,
            indexOfFirstTodo,
            firstIndexCurrentPage,
            lastIndexCurrentPage,
            validationResult } = this.state;
        let { status, message } = this.state.validationResult;
        let { uploadedBy } = this.props;
        indexOfLastTodo = currentPage * todosPerPage;
        indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        const TableHeader = () => {
            return (
                <Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <label className='heading'>Bulk Reg Id</label>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <label className='heading'>Registration Type</label>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <label className='heading'>Bulk Status</label>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <label className='heading'>Total Number of Lines</label>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <label className='heading'>Success </label>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingLeft: 0 }}>
                        <label className='heading'>Failure</label>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <div><label className='heading'>Created Date</label></div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <div><label className='heading'>Uploaded By</label></div>
                    </Grid.Column>
                </Grid.Row>
            )
        }
        const TableRow = ({ line }) => {
            const { bulkRegId1, typeOfReg, bulkStatus1, totalCount, successCount, failedCount, createdDate1, createdBy1, bulkStatusName, dateFormat } = line;
            return (
                <Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 2 }}>
                    <Grid.Column width={2} style={{ paddingLeft: 30 }}>
                        <div onClick={() => this.openBulkSimUpdation(bulkRegId1)}>
                            <label className='heading' style={{ padding: 3, color: 'blue' }}>{bulkRegId1}</label>

                        </div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <div>{typeOfReg}</div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <div>{bulkStatusName}</div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingLeft: 50 }}>
                        <div>{totalCount}</div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingLeft: 30 }}>
                        <div>{successCount}</div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <div>{failedCount}</div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <div>{dateFormat}</div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingRight: 0 }}>
                        <div>{createdBy1}</div>
                    </Grid.Column>
                </Grid.Row>
            )
        }
        return (

            <Container fluid >
                <PleaseWait active={showDimmer} />
                <Segment basic style={{ padding: 0, paddingTop: 15 }}>
                    <Form size='small'>
                        <Grid style={{ paddingLeft: 10 }}>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={8}>
                                    <label className='ui-widget-header'> Search Registered Company</label>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                {/* {
                                (status === 'FAILURE') &&
                                <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 20 }}
                                    onDismiss={() => this.setState({ validationResult: {} })}>
                                    <Message.Header>{message}</Message.Header>
                                </Message>
                            } */}
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={6}>
                                    <label className='heading' >Bulk Reg Id</label>
                                    <Input placeholder='Bulk Registration Id' fluid name="bulkRegId" value={bulkRegId} onChange={this.handleChange} />
                                </Grid.Column>
                                <Grid.Column width={1}/>
                                <Grid.Column width={6}>
                                    <label className='heading' >Bulk Reg Type</label>
                                    {/* <Dropdown size='small' selection options={bulkRegTypes} onChange={this.handleChange} value={bulkRegTypes} name='bulkRegTypes' fluid />    */}

                                    <Input fluid name="bulkRegType" value='SIM Replacement' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={6}>
                                    <label className='heading' width="10%" height="10">Status</label>
                                    <Dropdown placeholder='Please select' size='small' selection options={statusList}
                                        onChange={this.handleChange} value={bulkStatus}
                                        search={(options, query) => this._search(statusList, query)}

                                        name='bulkStatus' fluid />
                                </Grid.Column>
                                <Grid.Column width={1}/>
                                <Grid.Column width={6}>
                                    <label className='heading' width="10%" height="10">Uploaded By</label>
                                    <Dropdown placeholder='Please select' size='small' selection options={bulkUsers}
                                        onChange={this.handleChange} value={createdBy}
                                        search={(options, query) => this._search(bulkUsers, query)}
                                        name='createdBy' fluid />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{paddingBottom :0}}> 
                                <Grid.Column>
                                <label className='heading' width="10%" height="10">Date created between </label>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ paddingTop: 0 }}>
                                <Grid.Column width={6}>
                                    <DatePicker
                                        utcOffset={utcOffset}
                                        name='date1'
                                        maxDate={moment()}
                                        selected={date1}
                                        onSelect={(date1) => this.setState({ date1 })}
                                        dateFormat="DD/MM/YYYY"
                                        placeholderText="DD/MM/YYYY" />
                                </Grid.Column>
                                <Grid.Column width={1} >
                                <label className='heading' width="10%" height="10"> and </label>
                                </Grid.Column>
                                <Grid.Column width={6} >
                                    <DatePicker
                                        utcOffset={utcOffset}
                                        name='date2'
                                        maxDate={moment()}
                                        selected={date2}
                                        onSelect={(date2) => this.setState({ date2 })}
                                        dateFormat="DD/MM/YYYY"
                                        placeholderText="DD/MM/YYYY" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={6}>
                                    <SecondaryButton onClick={this.reset} value='Reset' name='Reset'> </SecondaryButton>
                                    <SecondaryButton onClick={this.search} value='Search' name='Search'> </SecondaryButton>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid style={{ fontSize: 11, padding: 10, paddingLeft: 25 }}>
                            <Grid.Column width='8' style={{ paddingLeft: 0 }}>
                                <label className='heading'>
                                    Displaying {(todos.length === 0) && (0)} {(todos.length > 0) && firstIndexCurrentPage}-{(firstIndexCurrentPage - 1) + currentTodos.length} / {todos.length}
                                </label>
                            </Grid.Column>
                            <Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
                                <label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='heading'>First</label>
                                <label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='heading'>Next</label>
                                <label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='heading'>Prev</label>
                                <label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='heading'>Last</label>
                                <label className='heading'>(
											{(todos.length === 0) && (0)} {(todos.length > 0) && currentPage} of {Math.ceil(todos.length / todosPerPage)}
                                    )
											</label>
                            </Grid.Column>
                            <TableHeader />
                            {currentTodos !== undefined && currentTodos.length > 0 && currentTodos.map((line, key) => {
                                return (
                                    <TableRow key={key} line={line} />
                                )
                            })}

                            {
                                (status === 'FAILURE') &&
                                <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 20 }}
                                    onDismiss={() => this.setState({ validationResult: {} })}>
                                    <Message.Header>{message}</Message.Header>
                                </Message>
                            }
                            {/* <Grid.Row style={{ padding: 0, paddingTop:0,paddingLeft:10 }}>
                                {
                                    (orderSubmitted) &&
                                    <Message  color='green' compact size='small' style={{ minWidth: 400, marginLeft: 20 }}
                                        onDismiss={() => this.setState({ orderSubmitted: '' })}>
                                        <p><b>{message}</b></p>
                                    </Message>
                                }
                            </Grid.Row>  */}
                        </Grid>
                        <Grid style={{ fontSize: 11, padding: 10, paddingLeft: 500 }}>
                            <SecondaryButton value='New Bulk Request' name='newBulkRequest' onClick={() => this.openBulkSimSubmission()}> </SecondaryButton>
                        </Grid>
                    </Form>
                </Segment>
            </Container>

        )

    }

}

const mapStateToProps = (state) => {
    return {
        uploadedBy: state.configuration.data.uploadedBy,
        bulkUsers: state.configuration.data.bulkUsers,
        bulkRegTypes: state.configuration.data.bulkRegTypes,
        statusList: state.configuration.data.statusList,
        bulkOrders: state.configuration.data.bulkOrders,
        GET_BULK_USERS_STATUS: state.configuration.meta.GET_BULK_USERS_STATUS,
        GET_BULK_ORDERS_DATA_STATUS: state.configuration.meta.GET_BULK_ORDERS_DATA_STATUS,
        user: state.user.data,
        errorMessage: state.configuration.data.errorMessage
    }
}
const mapDispatchToProps = {
    getBulkUsers,
    getBulkOrdersData,
}




export default connect(mapStateToProps, mapDispatchToProps)(BulkRegistration);