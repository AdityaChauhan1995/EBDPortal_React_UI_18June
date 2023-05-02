import React, {Component} from 'react';
import {Button, Container, Dropdown, Form, Grid, Icon, Message, Radio, Segment, Checkbox} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import {PrimaryButton, SecondaryButton} from '../../components/common/buttons';

import {StaticBlock8} from '../../components/common/dumb-component';
import {connect} from 'react-redux';
import {getFundAmount, setMsisdnDetails, setProductOrderInfo} from '../../redux/actions/order';
import VasActionMaxis from './vas-action-maxis'
import {PleaseWait} from '../../components/common/dimmer';

class ProductOrder extends Component {
    constructor(props) {
        super(props);
        const {url} = this.props.match;
        this.state = {
            url: url,
            nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
            processingUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
            rejectUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submission?mode=Approval",
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
            acctBarred:false,
            msisdnsBarred:''
        };
        this.vasAction = React.createRef();
    }

    componentDidMount() {
        let {virtualServiceNo, prodCatName} = this.props.registrationDetails;
        let msisdnsBarred='';
        if (prodCatName !== undefined && prodCatName === 'Existing Group') {
            this.props.getFundAmount(virtualServiceNo);
        }
        this.props.msisdnList.map((line,key)=>{
            if(line.acctBarred==true){
				msisdnsBarred = msisdnsBarred+line.mobileInfo.mobileNo+', ';
			}
        });
        if(msisdnsBarred!=''){
			this.setState({ validationResult: { status: 'FAILURE', message: msisdnsBarred.substring(0,msisdnsBarred.length-2)+' is Barred/Suspended in Kenan. Cannot approve the order' } ,
			acctBarred:true});
		}
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.SET_PRODUCT_ORDER_STATUS !== 'SUCCESS' && nextProps.SET_PRODUCT_ORDER_STATUS === 'SUCCESS') {
            if (this.props.orderInPMP) {
                let tempNextURL =  "/bundle/view/order-submission?mode=View"
                    + "&easMasterRegId=" + this.props.easMasterRegId;
                this.props.history.push(tempNextURL);
            } else {
                let tempNextURL = this.state.nextUrl;
                tempNextURL += "&action=approved&easMasterRegId=" + this.props.easMasterRegId;
                this.props.history.push(tempNextURL);
            }

        }
    }

    handleClick(type) {
        let {currentPage, todos, todosPerPage} = this.state;
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
        let msisdnList = this.state.todos;
        let isPendingActionDone = true;
        let rejectionReasonRequired = false;
        let acctBarred = this.state.acctBarred;
        msisdnList.filter((currentRow) => {
            if(( currentRow.regType === 'Phone Only Order')
            && (currentRow.pendingActionContracts.commonList===null  || 
               (currentRow.pendingActionContracts.commonList!==null && 
               currentRow.pendingActionContracts.commonList.length===0) )){
                isPendingActionDone = true;
            } 
            else if ((currentRow.regType === 'Contract Renewal' || currentRow.regType === 'Phone Only Order') && currentRow.isPendingActionDone === 'False') {
                isPendingActionDone = false;
                return;
            }
            if (currentRow.approvalAction === 'Reject' && (typeof (currentRow.rejectionReason) === 'undefined' || currentRow.rejectionReason === null))
            {
                rejectionReasonRequired = true;
            }
        });
        if (rejectionReasonRequired)
        {
            this.setState({
                validationResult: {
                    status: 'FAILURE',
                    message: 'Please specify reject reason for all rejected lines'
                }
            });
            return;
        }
        if (!this.props.orderInPMP && !isPendingActionDone) {
            this.setState({
                validationResult: {
                    status: 'FAILURE',
                    message: 'Please perform all pending actions before proceeding with order'
                }
            });
            return;
        }
        this.setState({showDimmer: true});

        this.props.setProductOrderInfo(null, null, null, null, null, null, null, null, null, null, null, msisdnList, null, null, null,null,null,null,acctBarred);
    };
    previous = () => {
        this.props.history.goBack();
    };
    processing = () => {
        let tempNextURL = this.state.processingUrl;
        tempNextURL += "&action=processing&easMasterRegId=" + this.props.easMasterRegId;
        this.props.history.push(tempNextURL);
    };
    reject = () => {
        let tempNextURL = this.state.rejectUrl;
        tempNextURL += "&action=rejected&easMasterRegId=" + this.props.easMasterRegId;
        this.props.history.push(tempNextURL);
    };
    openModal = (vasList, msisdnNo, ratePlanName, existingVasList, rebateList, type, regType, prematurePenalty,deviceContract) => {
        this.vasAction.current.show(vasList, msisdnNo, ratePlanName, existingVasList, rebateList, type, regType, prematurePenalty,deviceContract);
    };
    handleRadioChange = (e, {type, name, value, checked}) => {
        let todos = this.state.todos;
        let targetRegId = name.split('_')[0];
        let targetAction = name.split('_')[1];
        for (let i = 0; i < todos.length; i++) {
            let currentTodos = todos[i];
            if (currentTodos.regId === targetRegId) {
                currentTodos.approvalAction = targetAction;
            }
        }
        this.setState({[name]: checked, todos: todos});
    };
    handleChange = (e, {name, value}) => {
        let todos = this.state.todos;
        let targetRegId = name.split('_')[0];
        for (let i = 0; i < todos.length; i++) {
            let currentTodos = todos[i];
            if (currentTodos.regId === targetRegId) {
                currentTodos.rejectionReason = value;
            }
        }
        this.setState({[name]: value, todos: todos});
    }

    vasActionOnClose(type, mobileNo, oldComponentList, existingVasList, isPendingActionDone, prematurePenalty) {
        console.log(isPendingActionDone);
        if ((type === 'PENDING ACTION' || type === 'RESET ACTION' || type === 'MODIFY') && isPendingActionDone) {
            let tempToDos = this.state.todos.map((line) => {
                if (line.mobileInfo.mobileNo === mobileNo) {
                    return {
                        ...line,
                        pendingActionContracts: {...line.pendingActionContracts, commonList: existingVasList},
                        isPendingActionDone: 'True',
                        oldComponentList: oldComponentList,
                        prematurePenalty: prematurePenalty
                    }
                }
                return line;
            });

            this.setState({todos: tempToDos});
            this.props.setMsisdnDetails(tempToDos);
            this.setState({validationResult: {}});
        }
    }

    createActionsBoxes = (approvalActionsAllowed, approvalAction, regId, rejectReasons, rejectionReason) => {
        let content = [];
        console.log(approvalActionsAllowed, approvalAction, regId);
        if (approvalActionsAllowed != null) {
            for (let i = 0; i < approvalActionsAllowed.length; i++) {
                let actionString = approvalActionsAllowed[i];
                content.push(<Radio
                    key={regId + '_' + actionString}
                    label={actionString}
                    name={regId + '_' + actionString}
                    value={actionString}
                    checked={actionString === approvalAction}
                    onChange={this.handleRadioChange}
                    disabled={false}
                />);
                if (approvalAction === 'Reject' && actionString === 'Reject') {
                    content.push(<br/>);
                    content.push(<label>Reason</label>);
                    content.push(<Dropdown placeholder='--Please Select--'
                                           search
                                           size='small'
                                           selection
                                           name={regId + '_rejectionReason'}
                                           options={rejectReasons}
                                           onChange={this.handleChange}
                                           value={rejectionReason}
                    />);
                }
            }
        }

        return content;
    };

    createActionsBoxesPMP = (approvalActionsAllowed, approvalAction, regId) => {
        let content = [];
        let actionString = "Done in Kenan";
        content.push(<Radio
            key={regId + '_' + actionString}
            label={actionString}
            name={regId + '_' + actionString}
            value={actionString}
            checked={true}
            disabled={false}
        />);
        return content;
    };


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
            showDimmer
        } = this.state;
        let {
            custBrnNo, masterRegId, prodCatName, groupName, masterRegStatus, rejectReasons
        } = this.props.registrationDetails;
        let {status, message} = this.state.validationResult;
        let {brnInfo} = this.props;
        indexOfLastTodo = currentPage * todosPerPage;
        indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

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
                        <label className='heading'>Reg. Info</label>
                    </Grid.Column>
                    <Grid.Column width={3} style={{paddingRight: 0}}>
                        <label className='heading'>Mobile No.</label>
                    </Grid.Column>
                    <Grid.Column width={1} style={{paddingRight: 0}}>
                        <label className='heading'>Rate Plan</label>
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingRight: 0}}>
                        <label className='heading'>Device Info</label>
                    </Grid.Column>
                    <Grid.Column width={3} style={{paddingRight: 0}}>
                        <label className='heading'>VAS/Contract</label>
                    </Grid.Column>
                    <Grid.Column width={1} style={{paddingRight: 0}}>
                        <div><label className='heading'>Billable</label></div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{paddingRight: 0}}>
                        <div><label className='heading'>Target Action</label></div>
                    </Grid.Column>

                </Grid.Row>
            )
        }
        const TableRow = ({line}) => {
            console.log("line", line)
            const {regId, regType, mobileInfo, ratePlanName, pendingActionContracts, isPendingActionDone, action, approvalAction, approvalActionsAllowed, prematurePenalty, rejectionReason} = line;
            let billable = line.billableInd ? 'Yes' : 'No';
            const {orderInPMP, isZerolutionRTF } = this.props;
            return (
                <Grid.Row style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)',
                    padding: 2
                }}>
                    <Grid.Column width={2} style={{paddingRight: 0}}>
                        <div>{(line.deviceContract) === "Normal" ? 'Maxis' : (line.deviceContract)}</div>
                        <div>{regId}</div>
                        {(typeof mobileInfo.mobileNo !== 'undefined' && mobileInfo.mobileNo != null && mobileInfo.mobileNo.includes('Outright')) &&
                        (<React.Fragment>
                            <div>Outright Order</div>
                        </React.Fragment>)}
                        {(typeof mobileInfo.mobileNo !== 'undefined' && mobileInfo.mobileNo != null && !mobileInfo.mobileNo.includes('Outright')) &&
                        (<React.Fragment>
                            <div>{regType}</div>
                        </React.Fragment>)}
                    </Grid.Column>
                    <Grid.Column width={3} style={{paddingRight: 0}}>
                        {(typeof mobileInfo.mobileNo !== 'undefined' && mobileInfo.mobileNo != null && !mobileInfo.mobileNo.includes('Outright')) &&
                        (<React.Fragment>
                            <div><Icon name='phone'/>{mobileInfo.mobileNo}</div>
                        </React.Fragment>)}
                        {(typeof mobileInfo.sim !== 'undefined' && mobileInfo.sim != null && !mobileInfo.mobileNo.includes('Outright')) &&
                        (<React.Fragment>
                            <div><Icon name='credit card'/>{mobileInfo.sim}</div>
                        </React.Fragment>)}
                        {(typeof mobileInfo.simType !== 'undefined' && mobileInfo.simType != null && !mobileInfo.mobileNo.includes('Outright')) &&
                        (<React.Fragment>
                            <div><Icon name='id card outline'/>{mobileInfo.simType}</div>
                        </React.Fragment>)}
                        {(regType !== undefined && regType=== 'Number Porting' || regType=== 'Port-in') &&
                        (<React.Fragment>
                            <div><Icon name='id card outline'/>{mobileInfo.donorAccountNo}</div>
                        </React.Fragment>)}
                        {(regType !== undefined && regType=== 'Number Porting' || regType=== 'Port-in') &&
                        (<React.Fragment>
                            <div><Icon name='id card outline'/>{mobileInfo.donorType}</div>
                        </React.Fragment>)}
                    </Grid.Column>
                    <Grid.Column width={1} style={{paddingRight: 0}}>
                        {
                            (!mobileInfo.mobileNo.includes('Outright') && regType !== 'Contract Renewal') &&
                            (<div>{ratePlanName}</div>)
                        }
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingRight: 0}}>
                        {
                            (line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null && line.deviceContract !== 'Zerolution') && (
                                <React.Fragment>
                                    <div style={{margin: 0}}><b>Normal</b></div>
                                    <div style={{margin: 0}}><Icon
                                        name='mobile alternate'/> {line.lineDeviceInfo.phoneModel}</div>
                                    <div style={{margin: 0}}><Icon
                                        name='money bill alternate outline'/> RM {line.lineDeviceInfo.deviceRrp}</div>
                                    <div style={{margin: 0}}><Icon name='list ol'/> Quantity
                                        :{line.lineDeviceInfo.quantity}</div>
                                </React.Fragment>
                            )
                        }
                        {
                            (line.lineDeviceInfo !== undefined && line.lineDeviceInfo.phoneModel !== undefined && line.lineDeviceInfo.phoneModel !== null && line.deviceContract === 'Zerolution') && (
                                <React.Fragment>
                                    <div style={{margin: 0}}><b>Zerolution</b></div>
                                    <div style={{margin: 0}}><Icon
                                        name='mobile alternate'/> {line.lineDeviceInfo.phoneModel}</div>
                                    {   (isZerolutionRTF) && (
                                            <React.Fragment>
                                                    <div style={{ margin: 0 }}>IMEI NO :{line.lineDeviceInfo.imeiNo}</div>
                                                    <div style={{ margin: 0 }}>Article ID :{line.lineDeviceInfo.deviceArticleId}</div>
                                            </React.Fragment>
                                        )
                                    }
                                    <div style={{margin: 0}}><Icon
                                        name='money bill alternate outline'/> RM {line.lineDeviceInfo.deviceRrp}</div>
                                    <div style={{margin: 0}}><Icon
                                        name='repeat'/> RM {line.lineDeviceInfo.monthlyInstallment} x {line.lineDeviceInfo.noOfInstallments} Mths
                                    </div>
                                    {
                                        (line.lineDeviceInfo.isPremiumDeviceProtection === 'Yes') &&
                                        <div style={{margin: 0}}>Safe
                                            Device: {line.lineDeviceInfo.safeDeviceMnthlyChrg}</div>
                                    }
                                </React.Fragment>
                            )
                        }
                        {
                            (typeof line.lineDeviceInfo === 'undefined' || line.lineDeviceInfo === null) && (
                                <React.Fragment>
                                    <div style={{margin: 0}}>No Device</div>
                                </React.Fragment>
                            )
                        }
                    </Grid.Column>
                    <Grid.Column width={3} style={{paddingRight: 33}}>
                        {
                            (!orderInPMP && !mobileInfo.mobileNo.includes('Outright')) && ((regType !== 'CRP'&& regType !== 'Change Rate Plan') && regType !== 'SI Transfer' && regType !== 'Contract Renewal' && regType !== 'Phone Only Order') && (
                                <Button
                                    basic
                                    style={{height: 28}}
                                    fluid
                                    compact
                                    onClick={() => {
                                        this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.rebateList, 'VIEW', regType, prematurePenalty,line.deviceContract)
                                    }}>
                                    <b>VIEW</b>
                                </Button>
                            )
                        }
                        {
                            (!orderInPMP && !mobileInfo.mobileNo.includes('Outright')) && (regType === 'CRP' || regType === 'SI Transfer'|| regType === 'Change Rate Plan') && (
                                <Button
                                    basic
                                    style={{height: 28}}
                                    fluid
                                    compact
                                    onClick={() => {
                                        this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.rebateList, 'MODIFY', regType, prematurePenalty,line.deviceContract)
                                    }}>
                                    <b>VIEW/MODIFY</b>
                                </Button>
                            )
                        }
                        {
                            (!orderInPMP && !mobileInfo.mobileNo.includes('Outright')) && ((regType === 'Contract Renewal' || regType === 'Phone Only Order') && pendingActionContracts.commonList!==null  && pendingActionContracts.commonList.length>0 && isPendingActionDone === 'False') && (
                                <SecondaryButton fluid
                                                 compact
                                                 value='PENDING ACTION'
                                                 onClick={() => {
                                                     this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.rebateList, 'PENDING ACTION', regType, prematurePenalty,line.deviceContract)
                                                 }}
                                />
                            )
                            
                        }

{
                            (!orderInPMP && !mobileInfo.mobileNo.includes('Outright')) && (( regType === 'Phone Only Order') && pendingActionContracts.commonList===null  || (pendingActionContracts.commonList!==null && pendingActionContracts.commonList.length===0 )) && (
                                
                               <b style={{color:'red'}}> No contract are present for this MSISDN </b>
                            )
                            
                        }
                        {
                            (!orderInPMP && !mobileInfo.mobileNo.includes('Outright')) && ((regType === 'Contract Renewal' || regType === 'Phone Only Order') && isPendingActionDone === 'True') && (
                                <React.Fragment>
                                    <SecondaryButton fluid
                                                     compact
                                                     value='RESET ACTION'
                                                     onClick={() => {
                                                         this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.rebateList, 'RESET ACTION', regType, prematurePenalty,line.deviceContract)
                                                     }}
                                    />
                                    <div style={{padding: 5}}/>
                                    <Button
                                        basic
                                        style={{height: 28}}
                                        fluid
                                        compact
                                        onClick={() => {
                                            this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.rebateList, 'VIEW', regType, prematurePenalty,line.deviceContract)
                                        }}>
                                        <b>VIEW</b>
                                    </Button>
                                </React.Fragment>
                            )
                        }
                        {(orderInPMP && pendingActionContracts.componentPackageInfoList !== null && pendingActionContracts.componentPackageInfoList !== undefined && pendingActionContracts.componentPackageInfoList.length !== 0) &&
                        <Button
                            basic
                            style={{height: 28}}
                            fluid
                            compact
                            onClick={() => {
                                this.openModal(pendingActionContracts.componentPackageInfoList, mobileInfo.mobileNo, ratePlanName, pendingActionContracts.commonList, pendingActionContracts.rebateList, 'VIEW', regType, prematurePenalty,line.deviceContract)
                            }}>
                            <b>VIEW</b>
                        </Button>
                        }
                    </Grid.Column>
                    <Grid.Column width={1} style={{paddingRight: 0}}>
                        <div>{billable}</div>
                    </Grid.Column>
                    <Grid.Column width={2} style={{paddingRight: 0}}>
                        {this.createActionsBoxes(approvalActionsAllowed, approvalAction, regId, rejectReasons, rejectionReason)}
                    </Grid.Column>
                </Grid.Row>
            )
        }
        return (
            <Container fluid className='main-container'>
                <PleaseWait active={showDimmer}/>
                <Navigation index={4} group={groupName}/>
                <Segment basic style={{padding: 0, paddingTop: 15, flex: 1}}>
                    <Form size='small'>
                        <Grid style={{paddingLeft: 25}}>

                            <StaticBlock8
                                custBrnNo={custBrnNo}
                                companyName={brnInfo.portalCustInfo.companyName}
                                masterRegId={masterRegId}
                                masterRegStatus={masterRegStatus}
                                prodCatName={prodCatName}/>

                        </Grid>
                        <Grid style={{paddingLeft: 10}}>
                            <Grid.Row style={{ padding: 0, paddingTop:10 }}>
                                <Grid.Column width='16' style={{ paddingBottm: 0, paddingLeft:25 }}>
                                    <Checkbox style={{ padding: 5, fontWeight: 'bold', fontSize: 15 }}  name='zerolutionRTF'  label='Real Time Fulfilment' disabled = { true } checked = {this.props.isZerolutionRTF}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{paddingBottom: 0, paddingLeft: 0, paddingTop: 50}}>
                                <Grid.Column width='8' style={{paddingLeft: 0}}>
                                    <label>Displaying {(todos.length === 0) && (0)}{(todos.length > 0) && (firstIndexCurrentPage)}-{(firstIndexCurrentPage - 1) + currentTodos.length} / {todos.length}</label>
                                </Grid.Column>
                                <Grid.Column width='8' textAlign='right' style={{paddingRight: 0}}>
                                    <label onClick={() => this.handleClick('First')} style={{padding: 3}}
                                           className='pointer'>First</label>
                                    <label onClick={() => this.handleClick('Prev')} style={{padding: 3}}
                                           className='pointer'>Prev</label>
                                    <label onClick={() => this.handleClick('Next')} style={{padding: 3}}
                                           className='pointer'>Next</label>
                                    <label onClick={() => this.handleClick('Last')} style={{padding: 3}}
                                           className='pointer'>Last</label>
                                    <label
                                        onClick={() => this.handleClick('Last')}>({(todos.length === 0) && (0)}{(todos.length > 0) && (currentPage)} of {Math.ceil(todos.length / todosPerPage)})</label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                    {
                        (status === 'FAILURE') &&
                        <Message negative compact size='small' style={{minWidth: 400, marginLeft: 10}}
                                 onDismiss={() => this.setState({validationResult: {}})}>
                            <Message.Header>We have encounted some errors.</Message.Header>
                            <p>{message}</p>
                        </Message>
                    }
                    <Grid style={{fontSize: 11, padding: 10}}>
                        <TableHeader/>
                        {currentTodos.map((line, key) => {
                            return (
                                <TableRow key={key} line={line}/>
                            )
                        })}
                    </Grid>
                </Segment>
                <Segment basic
                         style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
                    <SecondaryButton value='BACK' onClick={this.previous}/>
                    <div style={{padding: 10}}/>
                    <PrimaryButton value='NEXT' onClick={this.next}/>
                    <div style={{padding: 10}}/>
                    {(!this.props.orderInPMP) &&
                    <SecondaryButton value='REJECT' onClick={this.reject}/>
                    }
                    <div style={{padding: 10}}/>
                    {(!this.props.orderInPMP) &&
                    <PrimaryButton value='PROCESSING' onClick={this.processing}/>
                    }
                </Segment>
                <VasActionMaxis ref={this.vasAction}
                                onClose={(type, mobileNo, oldComponentList, existingVasList, isPendingActionDone, prematurePenalty) => this.vasActionOnClose(type, mobileNo, oldComponentList, existingVasList, isPendingActionDone, prematurePenalty)}/>
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
        orderInPMP: state.order.data.orderInPMP,
        isZerolutionRTF: state.order.data.isZerolutionRTF
    }
}

const mapDispatchToProps = {
    /*getDeviceFundContracts,*/
    setProductOrderInfo,
    setMsisdnDetails,
    getFundAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)
