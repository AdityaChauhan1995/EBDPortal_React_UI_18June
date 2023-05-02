import React, { Component } from 'react';
import '../../Index.css';
import {
    Grid, Message, Input, Select, Checkbox, Segment, Container, Icon, Form, Dropdown,
    Confirm, Table, Menu, Tab
} from "semantic-ui-react";
import Navigation from '../../components/header/navigation';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { PleaseWait } from '../../components/common/dimmer';
import { connect } from 'react-redux';
import SubmissionHeader from '../../helpers/submission-header';
import { searchPaymentStatus, getProdGrpChangeStatus } from '../../redux/actions/configuration';
import { updatePayment } from '../../redux/actions/order';


class ChangePayment extends Component {

    constructor(props) {
        super(props);
        const { url } = this.props.match;
        this.state = {
            validationResult: {
                status: '',
                message: '',
            },
            showDimmer: false,
            deposit: props.deposit,
            totalLinesDeposit: props.totalLinesDeposit,
            totalDeposit: props.totalDeposit,
            advancePaymentAmount: props.advancePaymentAmount,
            totalAdvanceDeposit: props.totalAdvanceDeposit,
            totalDeviceTopUp: props.totalDeviceTopUp,
            DeviceTopUpGST: props.DeviceTopUpGST,
            totalPayment: props.totalPayment,
            DeviceTopUpGSTFactor: 0,
            totalLinesadvancePayment: props.totalLinesadvancePayment,
            approvalRemarks: this.props.approvalRemarks,
            billableAccountNumber: props.billableAccountNumber,
            bundleTypes: props.bundleTypes,
            inputRegId: '',
            regId: '',
            productGroup: '',
            masterRegId: '',
            approvalRemarks: '',
            custBrnNo: '',
            companyName: '',
            status: '',
            upFrontPayment: '',
            paymentStatus: '',
            nrc: '',
            tenure: '',
            marketCode: '',
            paymentToVerify: '',
            prodGrpId: '',
            searchPaymentStatus: false,
            paymentInfoMessage:props.paymentInfoMessage

        };
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.SEARCH_PAYMENT_STATUS !== 'SUCCESS' &&
            nextProps.SEARCH_PAYMENT_STATUS === 'SUCCESS') {

            this.setState({
                showDimmer: false, 
                regId: nextProps.paymentInfo.regId,
                masterRegId: nextProps.paymentInfo.easMasterRegId,
                approvalRemarks: nextProps.paymentInfo.approverRemark,
                custBrnNo: nextProps.paymentInfo.brnNo,
                companyName: nextProps.paymentInfo.companyName,
                status: nextProps.paymentInfo.regStatus,
                DeviceTopUpGST: nextProps.paymentInfo.deviceTopUpGST,
                totalPayment: nextProps.paymentInfo.totalPayment,
                totalDeviceTopUp: nextProps.paymentInfo.totalDeviceTopUp,
                deposit: nextProps.paymentInfo.deposit,
                totalLinesDeposit: nextProps.paymentInfo.totalLines,
                totalDeposit: nextProps.paymentInfo.totalDeposit,
                totalAdvanceDeposit: nextProps.paymentInfo.totalAdvPymnt,
                totalDeviceTopUp: nextProps.paymentInfo.totalDeviceTopUp,
                totalPayment: nextProps.paymentInfo.totalPayment,
                totalLinesadvancePayment: nextProps.paymentInfo.totalLines,
                advancePaymentAmount: nextProps.paymentInfo.advPayment,
                billableAccountNumber: nextProps.paymentInfo.billableAcctNo,
                upFrontPayment: nextProps.paymentInfo.upfrontPayment,
                paymentStatus: nextProps.paymentInfo.paymentStatus,
                nrc: nextProps.paymentInfo.nrc,
                tenure: nextProps.paymentInfo.tenure,
                marketCode: nextProps.paymentInfo.marketCode,
                paymentToVerify: nextProps.paymentInfo.paymentToVerify,
                prodGrpId: nextProps.paymentInfo.prodGrpId,
                productGroup:nextProps.paymentInfo.productGroup
            });

            if(nextProps.paymentInfo.regId === null && nextProps.paymentInfo.easMasterRegId ===  null){
                this.setState({searchPaymentStatus: false});
            }else{
                this.setState({searchPaymentStatus: true});
            }
        }

        if (this.props.GET_PROD_GRP_CHANGE_STATUS !== 'SUCCESS' &&
            nextProps.GET_PROD_GRP_CHANGE_STATUS === 'SUCCESS') {

            var bundleTypes = [{ key: -1, value: '', text: '---Please Select---' }, ...nextProps.bundleTypes];
            this.setState({ bundleTypes: bundleTypes, showDimmer: false });
        }

        if (this.props.UPDATE_PAYMENT_STATUS !== 'SUCCESS' &&
            nextProps.UPDATE_PAYMENT_STATUS === 'SUCCESS') {

            this.setState({ showDimmer: false, });
            let { masterRegId, regId } = this.state;
            if (masterRegId !== undefined && masterRegId !== null && masterRegId !== '') {
                this.setState({ validationResult: { status: 'SUCCESS', message: `Payment details successfully updated for master reg id : ${masterRegId}` } });
            }
            if (regId !== undefined && regId !== null && regId !== '') {
                this.setState({ validationResult: { status: 'SUCCESS', message: `Payment details successfully updated for reg id : ${regId}` } });
            }
        }
        if (this.props.UPDATE_PAYMENT_STATUS !== 'FAILED' &&
			nextProps.UPDATE_PAYMENT_STATUS === 'FAILED') {
            
			this.setState({ showDimmer: false, validationResult: { status: 'FAILURE', message: nextProps.paymentInfoMessage } });
		}

    }
    componentDidMount() {
        this.setState({ showDimmer: true });
        this.props.getProdGrpChangeStatus();
    }

    handleChange = (e, { name, value }) => {
        console.log('name', name, 'value', value);
        if (name === "totalLinesDeposit" || name === "totalLinesadvancePayment") {
            this.setState({ totalLinesDeposit: value });
            this.setState({ totalLinesadvancePayment: value });
        } else if(name === 'inputRegId'){
			var checkNum = false;
			console.log('value',value);
			checkNum = this.checkIsNumeric(value);
			if(checkNum){
				this.setState({ [name]: value });
			}
		}else {
            this.setState({ [name]: value });
        }

    }

    totalDepositChange = () => {
        let { advancePaymentAmount, totalLinesadvancePayment, deposit, totalLinesDeposit, totalPayment, totalDeviceTopUp } = this.state;
        let totalAdvanceDeposit = parseFloat(parseFloat(advancePaymentAmount) * parseFloat(totalLinesadvancePayment));
        let tempTotalDeposit = parseFloat(parseFloat(deposit) * parseFloat(totalLinesDeposit));
        let tempTotalDeviceTopup = parseFloat(totalDeviceTopUp);
        let tempTotalPayment = parseFloat(totalAdvanceDeposit) + parseFloat(tempTotalDeposit) + parseFloat(tempTotalDeviceTopup);
        this.setState({ totalAdvanceDeposit: totalAdvanceDeposit, totalDeposit: tempTotalDeposit, totalPayment: tempTotalPayment });
    }

    updatePayment = () => {

        let { regId, productGroup, prodGrpId, masterRegId, custBrnNo, approvalRemarks, companyName, status, billableAccountNumber,
            deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit, totalLinesadvancePayment, totalDeviceTopUp, totalPayment,
            upFrontPayment, tenure, paymentToVerify, marketCode, nrc, paymentStatus, DeviceTopUpGST } = this.state;

        let data = {
            regId: regId,
            productGroup: productGroup,
            prodGrpId: prodGrpId,
            easMasterRegId: masterRegId,
            brnNo: custBrnNo,
            approverRemark: approvalRemarks,
            companyName: companyName,
            regStatus: status,
            billableAcctNo: billableAccountNumber,
            deposit: deposit,
            totalDeposit: totalDeposit,
            advPayment: advancePaymentAmount,
            totalAdvPymnt: totalAdvanceDeposit,
            totalLines: totalLinesadvancePayment,
            totalDeviceTopUp: totalDeviceTopUp,
            deviceTopUp: null,
            totalPayment: totalPayment,
            upfrontPayment: upFrontPayment,
            tenure: tenure,
            paymentToVerify: paymentToVerify,
            marketCode: marketCode,
            nrc: nrc,
            paymentStatus: paymentStatus,
            deviceTopUpGST: DeviceTopUpGST
        }
        console.log('data', data);

        this.setState({ showDimmer: true });
        this.props.updatePayment(data);

    }

    searchPaymentStatus = () => {
        this.setState({ showDimmer: true });
        let { inputRegId, productGroup } = this.state;

        if (inputRegId === undefined || inputRegId === null || inputRegId === '') {
            this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter Registration id.' } });
            return;
        }
        if (productGroup === undefined || productGroup === null || productGroup === '') {
            productGroup = 'null';
        }
        this.setState({ validationResult: { } });
        this.props.searchPaymentStatus(inputRegId, 'null');
    }
    
    
    checkIsNumeric= (value) => {
		if(value !== undefined && value !== null && value !== ''){
			var regex = /^[0-9]+$/;
			return (regex.test(value)) ? true:false;
		}else{
			return true;
		}
		
	}

    render() {

        let { validationResult, showDimmer, deposit, totalLinesDeposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
            productGroup, inputRegId, upFrontPayment, totalDeviceTopUp, DeviceTopUpGST, totalPayment, totalLinesadvancePayment,
            approvalRemarks, billableAccountNumber, bundleTypes, regId } = this.state;
        let { status, message } = this.state.validationResult;
       
        return (
            <Container fluid className='main-container'>
                <PleaseWait active={showDimmer} />
                <div className='gridBorder'>
                    <Menu style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}>
						<label style={{ paddingTop: 7 }} className='ui-widget-header' name='Change Payment Search ' >Change Payment Search </label> 
					</Menu>
                    <Grid >
                        <Grid.Row verticalAlign='middle' style={{ paddingTop: 25 }}>
                            <Grid.Column width={3}>
                                &emsp;<label style={{ paddingLeft: 5 }} className='heading'>Registration Id: </label>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                &nbsp;<Input placeholder='Registration Id'
                                    name="inputRegId"
                                    value={inputRegId}
                                    onChange={this.handleChange}
                                    fluid
                                />
                            </Grid.Column>
                        </Grid.Row>
                        {/* <Grid.Row verticalAlign='middle' style={{ padding: 3, paddingTop: 3 }}>
                            <Grid.Column width={3}>
                                &emsp;<label style={{ height: 50 }} className='heading'>Product Group: </label>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Dropdown placeholder='--Please Select--'
                                    search
                                    selection
                                    name="productGroup"
                                    onChange={this.handleChange}
                                    options={bundleTypes}
                                    value={productGroup}
                                    fluid
                                />
                            </Grid.Column>
                        </Grid.Row> */}
                       
                        <Grid.Row style={{ paddingLeft: 32, paddingTop: 10, paddingBottom: 30 }}>
                            <SecondaryButton value='Search' onClick={this.searchPaymentStatus} />
                        </Grid.Row>
                    </Grid>
                </div>
                {this.state.searchPaymentStatus &&
                    <Segment basic style={{ padding: 0, paddingTop: 15, flex: 1, paddingLeft: 15 }}>
                        <Form size='small'>
                            <Grid style={{ paddingLeft: 10 }}>

                                <Grid.Row style={{ padding: 0, paddingTop: 10, paddingBottom: 20 }}>
                                    <Grid.Column width={2} >
                                        <label className='heading'>Reg Id</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left'>
                                        <label>{this.state.regId}</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left' >
                                        <label className='heading'>Master Reg Id</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left'>
                                        <label>{this.state.masterRegId}</label>
                                    </Grid.Column>
                                    <Grid.Column width={3} textAlign='left' >
                                        <label className='heading'>Approver Remarks</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left'>
                                        <label>{this.state.approvalRemarks}</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ padding: 0, paddingBottom: 20 }}>
                                    <Grid.Column width={2} >
                                        <label className='heading'>BRN</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left'>
                                        <label>{this.state.custBrnNo}</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left' >
                                        <label className='heading'>Company Name</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left'>
                                        <label>{this.state.companyName}</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left' >
                                        <label className='heading'>Product Group</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left'>
                                        <label>{this.state.productGroup}</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ padding: 0, paddingBottom: 10 }}>
                                    <Grid.Column width={2} >
                                        <label className='heading'>Master/Reg Status</label>
                                    </Grid.Column>
                                    <Grid.Column width={2} textAlign='left'>
                                        <label>{this.state.status}</label>
                                    </Grid.Column>
                                </Grid.Row>




                                <SubmissionHeader header='Payment' />
                                <Grid.Row style={{ paddingBottom: 2 }}>
                                    <Grid.Column width='3' style={{ paddingTop: 8 }}>
                                        <label>Billable Account</label>
                                    </Grid.Column>
                                    <Grid.Column width='5' >
                                        <Input type="Number" name='billableAccountNumber' value={billableAccountNumber} onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={5}>
                                        <label>Deposit</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <label>Total Lines</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <label>Total Deposit</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={4}>
                                        <Input type="Number"
                                            value={deposit}
                                            name="deposit"
                                            onChange={this.handleChange}
                                            onBlur={this.totalDepositChange}
                                            step="0.01"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <label>X</label>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Input type="Number"
                                            value={totalLinesDeposit}
                                            name='totalLinesDeposit'
                                            onChange={this.handleChange}
                                            onBlur={this.totalDepositChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <label>=</label>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Input type="Number" value={totalDeposit} disabled name='totalDeposit'
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={5}>
                                        <label>Advance Payment</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <label>Total Lines</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <label>Total Advance Payment</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={4}>
                                        <Input type="Number"
                                            value={advancePaymentAmount}
                                            name="advancePaymentAmount"
                                            onChange={this.handleChange}
                                            onBlur={this.totalDepositChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <label>X</label>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Input name="totalLinesadvancePayment"
                                            type="Number"
                                            value={totalLinesadvancePayment}
                                            onChange={this.handleChange}
                                            onBlur={this.totalDepositChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <label>=</label>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Input type="Number" value={totalAdvanceDeposit} disabled />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={5} style={{ paddingTop: 8 }}>
                                        <label>Total Device Top-Up</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Input type="Number"
                                            value={totalDeviceTopUp}
                                            name="totalDeviceTopUp"
                                            onChange={this.handleChange}
                                            onBlur={this.totalDepositChange}

                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={5} style={{ paddingTop: 8 }}>
                                        <label>Device Top-Up</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Input type="Number" value={DeviceTopUpGST} disabled />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={5} style={{ paddingTop: 8 }}>
                                        <label>Total Payment</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Input type="Number" value={totalPayment} disabled name='totalPayment' />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={5}>
                                        <label>(**Sum of Amount Above May Differ From Total Payable)</label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                                    <Grid.Column width={5} style={{ paddingTop: 8 }}>
                                        <label>UpFront Payment By Customer</label>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Input type="Number" value={upFrontPayment} disabled name='upFrontPayment' />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 10, paddingBottom: 5, paddingLeft: 0 }}>
                                    <Grid.Column width='16' style={{ padding: 0 }}>
                                        {
                                            (status === 'SUCCESS') &&
                                            <Message positive compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
                                                onDismiss={() => this.setState({ validationResult: {} })}>
                                                <p>{message}</p>
                                            </Message>
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row verticalAlign='middle' style={{ padding: 3, paddingTop: 10, paddingLeft: 20 }}>
                                    <Grid.Column width='16' style={{ padding: 0 }}>
                                {
                                    (status === 'FAILURE') &&
                                    <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
                                        onDismiss={() => this.setState({ validationResult: {} })}>
                                        <Message.Header>We have encounted an error.</Message.Header>
                                        <p>{message}</p>
                                    </Message>
                                }
                            </Grid.Column>
                        </Grid.Row>
                                <Grid.Row style={{ paddingTop: 10, paddingBottom: 20, paddingLeft: 10 }}>
                                    <SecondaryButton value='Update Payment' onClick={this.updatePayment} />
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Segment>
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bundleTypes: state.configuration.data.bundleTypes,
        paymentInfo: state.configuration.data.paymentInfo,
        approvalRemarks: state.configuration.data.paymentInfo.approvalRemarks,
        DeviceTopUpGST: state.configuration.data.paymentInfo.DeviceTopUpGST,
        totalPayment: state.configuration.data.paymentInfo.totalPayment,
        user: state.user.data,
        totalDeviceTopUp: state.configuration.data.paymentInfo.totalDeviceTopUp,
        deposit: state.configuration.data.paymentInfo.deposit,
        totalLinesDeposit: state.configuration.data.paymentInfo.totalLinesDeposit,
        totalDeposit: state.configuration.data.paymentInfo.totalDeposit,
        totalAdvanceDeposit: state.configuration.data.paymentInfo.totalAdvanceDeposit,
        totalDeviceTopUp: state.configuration.data.paymentInfo.totalDeviceTopUp,
        totalPayment: state.configuration.data.paymentInfo.totalPayment,
        totalLinesadvancePayment: state.configuration.data.paymentInfo.totalLinesadvancePayment,
        advancePaymentAmount: state.configuration.data.paymentInfo.advancePaymentAmount,
        billableAccountNumber: state.configuration.data.paymentInfo.billableAccountNumber,
        SEARCH_PAYMENT_STATUS: state.configuration.meta.SEARCH_PAYMENT_STATUS,
        GET_PROD_GRP_CHANGE_STATUS: state.configuration.meta.GET_PROD_GRP_CHANGE_STATUS,
        UPDATE_PAYMENT_STATUS: state.order.meta.UPDATE_PAYMENT_STATUS,
        paymentInfoMessage: state.order.data.paymentInfoMessage
    }
}

const mapDispatchToProps = {
    searchPaymentStatus,
    updatePayment,
    getProdGrpChangeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePayment)
