import React, {Component} from "react";
import {Modal, Grid, Segment, Table, Radio, Message, Checkbox} from 'semantic-ui-react';
import {PrimaryButton} from '../../components/common/buttons';


class VasActionMaxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            status: 'DEFAULT',
            message: '',
            mobileNo:'',
            ratePlanName:'',
            vasList: [],
            existingVasList: [],
            existingRebateList: [],
            oldComponentList: [],
            type: '',
            regType: '',
            prematurePenalty: false,
            isPendingActionDone:false,
            disabled: false,
            validationResult: {
                status: 'SUCCESS',
                message: '',
            },
            zerolutionCRP: false,
        }
    }

    show(vasList, msisdnNo, ratePlanName, existingVasList, existingRebateList, type, regType, prematurePenalty,deviceContract) {
        if (type === 'VIEW') {
            this.setState({
                mobileNo: msisdnNo,
                ratePlanName: ratePlanName,
                vasList: vasList,
                existingVasList: existingVasList,
                existingRebateList: existingRebateList,
                type: type,
                regType: regType,
                prematurePenalty: prematurePenalty,
                isPendingActionDone: true,
                oldComponentList: [],
                disabled: true,
                validationResult: {},
                open: true
            })
        }
        else if(type === 'MODIFY'){
            if(deviceContract==='Normal'){
                 this.setState({
                mobileNo: msisdnNo,
                ratePlanName: ratePlanName,
                vasList: vasList,
                existingVasList: existingVasList,
                existingRebateList: existingRebateList,
                type: type,
                regType: regType,
                prematurePenalty: prematurePenalty,
                isPendingActionDone: false,
                oldComponentList: [],
                disabled: false,
                validationResult: {},
                open: true,
                zerolutionCRP:false
            })
            }else if(deviceContract==='Zerolution'){
                 this.setState({
                mobileNo: msisdnNo,
                ratePlanName: ratePlanName,
                vasList: vasList,
                existingVasList: existingVasList,
                existingRebateList: existingRebateList,
                type: type,
                regType: regType,
                prematurePenalty: prematurePenalty,
                isPendingActionDone: false,
                oldComponentList: [],
                disabled: false,
                validationResult: {},
                open: true,
                zerolutionCRP:true
            })
            }
           
        }
        else {
            this.setState({
                mobileNo: msisdnNo,
                ratePlanName: ratePlanName,
                vasList: vasList,
                existingVasList: existingVasList,
                existingRebateList: existingRebateList,
                type: type,
                regType: regType,
                prematurePenalty: prematurePenalty,
                isPendingActionDone: false,
                oldComponentList: [],
                disabled: false,
                validationResult: {},
                open: true
            })
        }
    };

    close = () => {
        let{ type, mobileNo, oldComponentList, existingVasList, isPendingActionDone, prematurePenalty } = this.state;
        this.props.onClose(type, mobileNo, oldComponentList, existingVasList, isPendingActionDone, prematurePenalty);
        this.setState({open: false})
    };

    save = () => {
        let {existingVasList, prematurePenalty,regType} = this.state;
        let allActionChecked = true;
        let isTerminateChecked = false;

        let tempOldComponentList = [];
        let terminate = 0;

        existingVasList.filter((currentRow) => {
            if(typeof currentRow.fs2Action === 'undefined' || currentRow.fs2Action===null){
                allActionChecked = false;
            }
            if (currentRow.fs2Action === 'Keep') {
                tempOldComponentList.push({oldComponentId: currentRow.componentId});
            }
            if(currentRow.contractInfo!==null && currentRow.fs2Action==='Terminate'){
                isTerminateChecked = true;
                terminate++;
            }
        });

        if(!allActionChecked){
            this.setState({validationResult:{
                    status:'FAILURE',
                    message:'You need to choose Keep/Terminate action for all Contracts and Vas'
                }});
        }
        else{
            if(prematurePenalty){
                if(!isTerminateChecked){
                    this.setState({validationResult:{status: 'FAILURE',message: 'You need to terminate atleast one contract to select premature component'},
                    });
                    return;
                }
               
            }
             if(regType==="Contract Renewal" && terminate === 0){
                   this.setState({validationResult:{status: 'FAILURE',message: 'You need to terminate atleast one contract'},
                    });
                    return;  
                }
            this.setState({oldComponentList: tempOldComponentList, isPendingActionDone: true, validationResult:{status: 'SAVED',message: 'Data has been saved successfully'}});
        }
    };

    componentDidMount() {

    }

    handleChange = (e, {name, value}) => {

        let {existingVasList} = this.state;
        let rowNo = name.split('?')[1];
        let tempExistingVasList = existingVasList.map((currentRow, key) => {
            if (key == rowNo) {
                return {
                    ...currentRow,
                    fs2Action: value
                }
            }
            return currentRow;
        });
        this.setState({[name]: value, existingVasList: tempExistingVasList});
    };

    handleCheckboxChange = (e, {type, name, value, checked}) => {
        this.setState({[name]: checked});
    };

    //
    render() {
        const {open, dimmer, vasList, ratePlanName, mobileNo, existingVasList, existingRebateList, type, regType, disabled, prematurePenalty,zerolutionCRP} = this.state
        let {status, message} = this.state.validationResult;
        return (
            <Modal dimmer={dimmer}
                   open={open}
                   onClose={this.close}
                   closeOnEscape={false}
                   closeOnRootNodeClick={false} style={{marginTop: 0}}>
                <Modal.Header style={{fontSize: 13}}>
                    {(regType !== 'Contract Renewal'&& regType !== 'Phone Only Order') && (
                    <label style={{color: '#4E4E4E'}}>VAS/Contract - View/Modify</label>
                    )}
                    {(regType === 'Contract Renewal'|| regType === 'Phone Only Order') && (
                        <label style={{color: '#4E4E4E'}}>Contracts - View/Modify</label>
                    )}
                </Modal.Header>
                <Modal.Content style={{minHeight: 50}}>
                    <Grid style={{height: 400, overflow: 'auto'}}>
                        <Grid.Row>
                            <Grid.Column width='8'>
                                <label style={{color: '#293895'}} className='heading'>Mobile No:</label>
                            </Grid.Column>
                            <Grid.Column width='8'>
                                <label>{mobileNo}</label>
                            </Grid.Column>
                        </Grid.Row>
                        {(regType !== 'Contract Renewal' && regType !== 'Phone Only Order') && (
                            <React.Fragment>
                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <label style={{color: '#293895'}} className='heading'>Selected Rate Plan:</label>
                                    </Grid.Column>
                                    <Grid.Column width='8'>
                                        <label>{ratePlanName}</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <label style={{color: '#293895'}} className='heading'>VAS Selected</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingTop: 0}}>
                                    <Grid.Column width='16'>
                                        <Table basic compact='very' size='small' style={{fontSize: 12, border: 0}}>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell style={{paddingLeft: 0}}>No</Table.HeaderCell>
                                                    <Table.HeaderCell>Component</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body style={{height: 150}}>
                                                {vasList.map((vasList, key) => {
                                                    return (
                                                        <Table.Row key={key}>
                                                            <Table.Cell style={{paddingLeft: 0}}>{key + 1}</Table.Cell>
                                                            <Table.Cell>{vasList.componentDesc}</Table.Cell>
                                                        </Table.Row>
                                                    )
                                                })
                                                }
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                            </React.Fragment>
                        )}
                        {
                            (status === 'FAILURE') &&
                            <Message negative compact size='small' style={{minWidth: 400, marginLeft: 10}}
                                     onDismiss={() => this.setState({validationResult: {}})}>
                                <Message.Header>We have encounted some errors.</Message.Header>
                                <p>{message}</p>
                            </Message>
                        }
                        {
                            (status === 'SAVED') &&
                            <Message positive compact size='small' style={{minWidth: 400, marginLeft: 10}}
                                     onDismiss={() => this.setState({validationResult: {}})}>
                                <p>{message}</p>
                            </Message>
                        }
                        {(existingVasList !== null && (regType === 'Contract Renewal'|| regType === 'Phone Only Order')) && (<React.Fragment>
                            <Grid.Row>
                                <Grid.Column width='8'>
                                    <label style={{color: '#293895'}} className='heading'>Existing Contract</label>
                                </Grid.Column>
                            </Grid.Row>
                        </React.Fragment>)}
                        {(existingVasList !== null && regType !== 'Contract Renewal' && regType !== 'Phone Only Order') && (
                        <React.Fragment>
                            <Grid.Row>
                                <Grid.Column width='8'>
                                    <label style={{color: '#293895'}} className='heading'>Existing VAS/Contract</label>
                                </Grid.Column>
                            </Grid.Row>
                        </React.Fragment>)}
                        {(existingVasList !== null && (regType === 'Contract Renewal'|| regType === 'Phone Only Order')) && (
                        <React.Fragment>
                            <Grid.Row style={{padding:0, paddingBottom:10}}>
                                <Grid.Column width='14' style={{padding:0}} textAlign='right'>
                                   {regType !== 'Phone Only Order'&& 
                                   <label style={{color:'#293895', fontSize: 12 }}  className='heading'>Penalty Contract Premature Waiver (Not applicable for K2/Zerolution/Femtocell)</label>}
                                   {regType === 'Phone Only Order'&& 
                                   <label style={{color:'#293895', fontSize: 12 }}  className='heading'>Premature Waiver </label>}
                                </Grid.Column>
                                <Grid.Column width='2' style={{padding:0, paddingLeft:10}}>
                                    <Checkbox onClick={this.handleCheckboxChange} name='prematurePenalty' value={prematurePenalty} checked={prematurePenalty} disabled={disabled}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{paddingTop:0}}>
                                <Grid.Column width='16'>
                                    <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell style={{paddingLeft:0}}>No</Table.HeaderCell>
                                                {regType !== 'Phone Only Order'&&
                                                <Table.HeaderCell>Product Type</Table.HeaderCell>}
                                                <Table.HeaderCell>Product Name</Table.HeaderCell>
                                                <Table.HeaderCell>Contract Info</Table.HeaderCell>
                                                <Table.HeaderCell>Action</Table.HeaderCell>
                                                <Table.HeaderCell/>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body style={{height:150}}>
                                            {existingVasList.map((lineCommonList,key) => {
                                                return (
                                                    <Table.Row key={key}>
                                                        <Table.Cell style={{paddingLeft:0}}>{key+1}</Table.Cell>
                                                        {regType !== 'Phone Only Order'&&
                                                        <Table.Cell>{lineCommonList.productType}</Table.Cell>}
                                                        <Table.Cell>{lineCommonList.componentDesc}</Table.Cell>
                                                        {(lineCommonList.contractInfo!==null) &&
                                                        <Table.Cell>
                                                            <div>Start Date:{lineCommonList.contractInfo.split(':')[0]}</div>
                                                            <div>End Date:{lineCommonList.contractInfo.split(':')[1]}</div>
                                                            <div>Remaining Duration:{lineCommonList.contractInfo.split(':')[2]}</div>
                                                            <div>Penalty:{lineCommonList.contractInfo.split(':')[3]}</div>
                                                        </Table.Cell>
                                                        }
                                                        {(lineCommonList.contractInfo===null) &&
                                                        <Table.Cell>
                                                            <div>Start Date:</div>
                                                            <div>End Date:</div>
                                                            <div>Remaining Duration:</div>
                                                            <div>Penalty:</div>
                                                        </Table.Cell>
                                                        }
                                                        <Table.Cell>
                                                            <Radio
                                                                label='Keep'
                                                                name={lineCommonList.radioAction}
                                                                value='Keep'
                                                                checked={lineCommonList.fs2Action === 'Keep'}
                                                                onChange={this.handleChange}
                                                                disabled={disabled}
                                                            />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Radio
                                                                label='Terminate'
                                                                name={lineCommonList.radioAction}
                                                                value='Terminate'
                                                                checked={lineCommonList.fs2Action === 'Terminate'}
                                                                onChange={this.handleChange}
                                                                disabled={disabled}
                                                            />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                            }
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        </React.Fragment>)}
                        {(existingVasList !== null && regType !== 'Contract Renewal'&& regType !== 'Phone Only Order' && !zerolutionCRP) && (
                        <React.Fragment>
                            <Grid.Row style={{paddingTop: 0}}>
                                <Grid.Column width='16'>
                                    <Table basic compact='very' size='small' style={{fontSize: 12, border: 0}}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell style={{paddingLeft: 0}}>No</Table.HeaderCell>
                                                <Table.HeaderCell>Component</Table.HeaderCell>
                                                <Table.HeaderCell>Action</Table.HeaderCell>
                                                <Table.HeaderCell/>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body style={{height: 150}}>
                                            {existingVasList.map((vas, key) => {
                                                return (
                                                    <Table.Row key={key}>
                                                        <Table.Cell style={{paddingLeft: 0}}>{key + 1}</Table.Cell>
                                                        <Table.Cell>{vas.componentDesc}</Table.Cell>
                                                        <Table.Cell>
                                                            <Radio
                                                                label='Keep'
                                                                name={vas.radioAction}
                                                                value='Keep'
                                                                checked={vas.fs2Action === 'Keep'}
                                                                onChange={this.handleChange}
                                                                disabled={disabled}
                                                            />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Radio
                                                                label='Terminate'
                                                                name={vas.radioAction}
                                                                value='Terminate'
                                                                checked={vas.fs2Action === 'Terminate'}
                                                                onChange={this.handleChange}
                                                                disabled={disabled}
                                                            />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                            }
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        </React.Fragment>)}
                        {(existingVasList !== null && regType !== 'Contract Renewal'&& regType !== 'Phone Only Order' && zerolutionCRP) && (
                        <React.Fragment>
                            <Grid.Row style={{paddingTop: 0}}>
                                <Grid.Column width='16'>
                                    <Table basic compact='very' size='small' style={{fontSize: 12, border: 0}}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell style={{paddingLeft: 0}}>No</Table.HeaderCell>
                                                <Table.HeaderCell>Component</Table.HeaderCell>
                                                <Table.HeaderCell/>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body style={{height: 150}}>
                                            {existingVasList.map((vas, key) => {
                                                return (
                                                    <Table.Row key={key}>
                                                        <Table.Cell style={{paddingLeft: 0}}>{key + 1}</Table.Cell>
                                                        <Table.Cell>{vas.componentDesc}</Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                            }
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        </React.Fragment>)}
                        {(existingRebateList !== null && regType === 'Contract Renewal') && (
                            <React.Fragment>
                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <label style={{color: '#293895'}} className='heading'>Existing Rebate</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingTop:0}}>
                                    <Grid.Column width='16'>
                                        <Table basic compact='very' size='small' style={{fontSize: 12,border:0}}>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell style={{paddingLeft:0}}>No</Table.HeaderCell>
                                                    <Table.HeaderCell>Product Type</Table.HeaderCell>
                                                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                                                    <Table.HeaderCell>Contract Info</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body style={{height:150}}>
                                                {existingRebateList.map((lineRebate,key) => {
                                                    return (
                                                        <Table.Row key={key}>
                                                            <Table.Cell style={{paddingLeft:0}}>{key+1}</Table.Cell>
                                                            <Table.Cell>{lineRebate.productType}</Table.Cell>
                                                            <Table.Cell>{lineRebate.componentDesc}</Table.Cell>
                                                            {(lineRebate.contractInfo!==null) &&
                                                            <Table.Cell>
                                                                <div>Start Date:{lineRebate.contractInfo.split(':')[0]}</div>
                                                                <div>End Date:{lineRebate.contractInfo.split(':')[1]}</div>
                                                                <div>Remaining Duration:{lineRebate.contractInfo.split(':')[2]}</div>
                                                                <div>Penalty:{lineRebate.contractInfo.split(':')[3]}</div>
                                                            </Table.Cell>
                                                            }
                                                            {(lineRebate.contractInfo===null) &&
                                                            <Table.Cell>
                                                                <div>Start Date:</div>
                                                                <div>End Date:</div>
                                                                <div>Remaining Duration:</div>
                                                                <div>Penalty:</div>
                                                            </Table.Cell>
                                                            }
                                                        </Table.Row>
                                                    )
                                                })
                                                }
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                            </React.Fragment>)}
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Segment basic style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 20
                    }}>
                        {(existingVasList != null) &&
                        <React.Fragment>
                            <PrimaryButton value='SAVE' onClick={this.save}/>
                            <div style={{padding: 20}}/>
                            <PrimaryButton value='CLOSE' onClick={this.close}/>
                        </React.Fragment>
                        }
                        {(existingVasList === null) &&
                        <PrimaryButton value='CLOSE' onClick={this.close}/>
                        }
                    </Segment>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default VasActionMaxis