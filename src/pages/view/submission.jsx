import React, { Component } from 'react';
import { Grid, Segment, Container, Form, Input, Dropdown, Checkbox, TextArea, Message } from 'semantic-ui-react';
import Navigation from '../../components/header/navigation';
import { StaticBlock5, StaticBlock8 } from '../../components/common/dumb-component';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { getAuditPaymentDetails } from '../../redux/actions/configuration';
import { connect } from 'react-redux';
import SubmissionHeader from '../../helpers/submission-header';
import { PleaseWait } from '../../components/common/dimmer';
import { postApprovalOrderData, setApprovalSubmission } from '../../redux/actions/order';

class Submission extends Component {

  constructor(props) {
    super(props);
    const { url } = this.props.match;
    this.state = {
      url:url,
      nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submitted?mode=Approval",
      parentId: this.props.parentId,
      hierarchyId: this.props.hierarchyId,
      action: '',
      deposit: 0,
      totalLinesDeposit: 0,
      totalDeposit: 0,
      advancePayment: 0,
      totalLinesadvancePayment: 0,
      totalAdvanceDeposit: 0,
      totalDeviceTopUp: 0,
      DeviceTopUpGST: 0,
      totalPayment: 0,
      upfrontPayment: 0,
      DeviceTopUpGSTFactor: 0,
      review: [],
      authSignName: ' ',
      collectionCodeName: '',
      isBillableChecked: false,
      dealerRemarks: this.props.dealerRemarks,
      approvalRemarks: this.props.approvalRemarks,
      billableAccountNumber: '',
      suspensionStatus: '',
      validationResult: {
        status: 'SUCCESS',
        message: '',
      },
      showDimmer: false
    };
  }
  componentDidMount() {
    let easMasterRegId = this.props.location.search.substring(this.props.location.search.lastIndexOf("=") + 1, this.props.location.search.length);
    console.log('easMasterRegId',easMasterRegId);
    this.props.getAuditPaymentDetails(easMasterRegId);
  }
  componentWillReceiveProps(nextProps) {
    console.log('SET_APPROVAL_SUBMISSION_INFO_STATUS',this.props.SET_APPROVAL_SUBMISSION_INFO_STATUS);
    if (this.props.GET_VIEW_SUBMISSION_INFO_STATUS !== 'SUCCESS' &&
      nextProps.GET_VIEW_SUBMISSION_INFO_STATUS === 'SUCCESS') {
      this.setState({
        deposit: nextProps.paymentDetails.deposit, totalLinesDeposit: nextProps.paymentDetails.noOfLines, totalDeposit: nextProps.paymentDetails.totDeposit,
        advancePayment: nextProps.paymentDetails.advPayment, totalLinesadvancePayment: nextProps.paymentDetails.noOfLines, totalAdvanceDeposit: nextProps.paymentDetails.totAdvPayment,
        DeviceTopUpGST: nextProps.paymentDetails.DeviceTopUpGST, totalPayment: nextProps.paymentDetails.totPayment, DeviceTopUpGSTFactor: nextProps.paymentDetails.gstFactor,
        billableAccountNumber: nextProps.paymentDetails.billableAcct, upfrontPayment: nextProps.paymentDetails.paymentByCust,
        totalDeviceTopUp: nextProps.paymentDetails.deviceTopUp,
        showDimmer: false
      });
    } else if (this.props.SET_APPROVAL_SUBMISSION_INFO_STATUS !== 'SUCCESS' &&
      nextProps.SET_APPROVAL_SUBMISSION_INFO_STATUS === 'SUCCESS') {
      console.log('postApprovalOrderData', JSON.stringify(nextProps.data));
      this.setState({ showDimmer: true });
      this.props.postApprovalOrderData(nextProps.data);
    } else if (this.props.SET_ORDER_APPROVAL_STATUS !== 'SUCCESS' && nextProps.SET_ORDER_APPROVAL_STATUS === 'SUCCESS') {
      console.log('SUCCESS');
      this.setState({ showDimmer: false });
      let tempNextURL="/bundle/approval/order-submitted?mode=Approval";
      this.props.history.push(tempNextURL);
    }
    else if (this.props.SET_ORDER_APPROVAL_STATUS !== 'FAILED' && nextProps.SET_ORDER_APPROVAL_STATUS === 'FAILED') {
      console.log('FAILED');
      this.setState({ showDimmer: false });
      let tempNextURL="/bundle/approval/order-submitted?mode=Approval";
      this.props.history.push(tempNextURL);
    }

  }
  previous = () => {
    this.props.history.goBack();
  }

  submit = () => {
    this.setState({ showDimmer: true });
    let tempUploadRegId = [], reasonCodeDropdownValue = '';
    let authDetail = null;

    if (this.state.registrationDetails !== null) {
      authDetail = {
        authName: this.props.registrationDetails.authSignName,
        authEmail: this.props.registrationDetails.authSignEmail,
        authMobileNo: this.props.registrationDetails.authSignSms,
      };
    }
    console.log(authDetail);
    this.props.setApprovalSubmission(this.props.marketCode,
      this.props.accountCategory, this.props.parentId,
      this.props.hierarchyId, this.props.collectionCode, this.props.authSignName,
      "false",
      this.state.deposit,
      this.state.totalDeposit,
      this.state.advancePayment,
      this.state.totalAdvanceDeposit,
      this.state.totalDeviceTopUp,
      this.state.DeviceTopUpGST,
      this.state.totalPayment,
      'Approved',
      this.props.cmssNo,
      this.state.approvalRemarks,
      this.props.user.userId, this.state.totalLinesDeposit,
      this.props.paymentDetails.orgAdvPayment, this.props.paymentDetails.orgDeposit,
      this.state.billableAccountNumber, this.props.registrationDetails.prodCatName,
      reasonCodeDropdownValue, this.props.user, authDetail, tempUploadRegId,
      0,
      this.props.registrationDetails.groupName
    );


  }

    handleChange = (e, { name, value, type }) => {
        if (type === 'checkbox') {
            this.setState((prevState) => {
                return { [name]: !prevState[name] };
            });
        } else {
            this.setState({ [name]: value });
        }

    }

  render() {
    let { action, review, parentId, hierarchyId,
      totalLinesDeposit, totalDeposit, deposit, advancePayment, totalLinesadvancePayment, totalDeviceTopUp, DeviceTopUpGST, totalPayment
      , upfrontPayment, cmssNo, totalAdvanceDeposit, isBillableChecked, billableAccountNumber, suspensionStatus, showDimmer, approvalRemarks } = this.state;
    let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName, totalMembers, totalMemberString,
      maxLineCount, prodCatName, dealerName, dealerCode, dealerRemarks, acctMgrName, custSignDate, supportingCenterName, billable, groupName,appleDepId } = this.props.registrationDetails;
    let { marketCodeName, accountCategory, collectionCodeName, authSignName, portalCustInfo, bpuRemarks } = this.props;
    let { status, message } = this.state.validationResult;
    return (
      <Container fluid className='main-container'>
        <PleaseWait active={showDimmer} />
        <Navigation index={6} group={groupName} />
        <Segment basic style={{ padding: 0, paddingTop: 15, flex: 1 }}>
          <Form size='small'>
            <Grid style={{ paddingLeft: 10 }}>
              {groupName != 'MAXIS' &&
                <StaticBlock5 custBrnNo={custBrnNo} prodCatName={prodCatName} companyName={portalCustInfo.companyName} masterRegId={masterRegId}
                  virtualServiceNo={virtualServiceNo} easPackageName={easPackageName} totalMembers={totalMembers} totalMemberString={totalMemberString}
                  maxLineCount={maxLineCount} contactMode={contactMode} masterRegStatus={masterRegStatus} />
              }
              {groupName === 'MAXIS' &&
                <StaticBlock8
                  custBrnNo={custBrnNo}
                  companyName={portalCustInfo.companyName}
                  masterRegId={masterRegId}
                  masterRegStatus={masterRegStatus}
                  prodCatName={prodCatName} />
              }
              <SubmissionHeader header='Dealer Information' />
              <Grid.Row style={{ paddingBottom: 2, paddingTop: 5 }}>
                <Grid.Column width='3' >
                  <label>Dealer Name</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{dealerName}</label>
                </Grid.Column>
                <Grid.Column width='4' >
                  <label>Dealer Code</label>
                </Grid.Column>
                <Grid.Column width='3' >
                  {dealerCode}
                </Grid.Column>
              </Grid.Row>
              <SubmissionHeader header='Account Manager Information' />
              <Grid.Row style={{ paddingBottom: 2 }}>
                <Grid.Column width='3' >
                  <label>Account Manager</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{acctMgrName}</label>
                </Grid.Column>
              </Grid.Row>
              {action !== 'processing' ? <React.Fragment>
                <SubmissionHeader header='Customer Information' />
                {
                  (status === 'FAILURE') &&
                  <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
                    onDismiss={() => this.setState({ validationResult: {} })}>
                    <Message.Header>We have encounted some errors.</Message.Header>
                    <p>{message}</p>
                  </Message>
                }
                {
                  (status === 'Validation_SUCCESS') &&
                  <Message positive compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
                    onDismiss={() => this.setState({ validationResult: {} })}>
                    <Message.Header></Message.Header>
                    <p>{message}</p>
                  </Message>
                }
                <Grid.Row style={{ paddingBottom: 2 }}>
                  <Grid.Column width='3' style={{ paddingTop: 8 }} >
                    <label >Market Code</label>
                  </Grid.Column>
                  <Grid.Column width='5' >
                    <Input value={marketCodeName} disabled />
                  </Grid.Column>
                  <Grid.Column width='4' style={{ paddingTop: 8 }} >
                    <label>Account Category</label>
                  </Grid.Column>
                  <Grid.Column width='3' >
                    <Input value={accountCategory} disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                  <Grid.Column width='3' style={{ paddingTop: 8 }} >
                    <label>Heirarchy Id</label>
                  </Grid.Column>
                  <Grid.Column width='5' >
                    <Input type="Number" value={hierarchyId} onChange={this.handleChange} name='hierarchyId' disabled={true} />
                  </Grid.Column>
                  <Grid.Column width='4' style={{ paddingTop: 8 }} >
                    <label>Parent Id</label>
                  </Grid.Column>
                  <Grid.Column width='3' >
                    <Input type="Number" value={parentId} onChange={this.handleChange} name='parentId' disabled={true} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                  <Grid.Column width='3' style={{ paddingTop: 8 }}>
                    <label>Collection Code</label>
                  </Grid.Column>
                  <Grid.Column width='5' >
                    <Input disabled value={collectionCodeName} />
                  </Grid.Column>
                  <Grid.Column width='4' style={{ paddingTop: 8 }}>
                    <label>Authorised Signatory</label>
                  </Grid.Column>
                  <Grid.Column width='3' >
                    <Input disabled value={authSignName} />
                  </Grid.Column>
                </Grid.Row>
                {groupName != 'MAXIS' &&
                  <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                    <Grid.Column width='3' style={{ paddingTop: 8 }} >
                      <label>Billable</label>
                    </Grid.Column>
                    <Grid.Column width='5' style={{ paddingTop: 8 }} >
                      <Checkbox disabled checked={billable == "on" ? true : false} />
                    </Grid.Column>
                  </Grid.Row>}</React.Fragment> : null}
              <SubmissionHeader header='Payment' />
              <Grid.Row style={{ paddingBottom: 2 }}>
                <Grid.Column width='3' style={{ paddingTop: 8 }}>
                  <label>Billable Account</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <Input type="Number" name='billableAccountNumber' value={billableAccountNumber} disabled />
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
                    disabled
                  />
                </Grid.Column>
                <Grid.Column width={1}>
                  <label>X</label>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Input type="Number"
                    value={totalLinesDeposit}
                    name='totalLinesDeposit'
                    disabled />
                </Grid.Column>
                <Grid.Column width={1}>
                  <label>=</label>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Input type="Number" value={totalDeposit} disabled name='totalDeposit' />
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
                    value={advancePayment}
                    name="advancePayment"
                    disabled />
                </Grid.Column>
                <Grid.Column width={1}>
                  <label>X</label>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Input name="totalLinesadvancePayment"
                    type="Number"
                    value={totalLinesadvancePayment}
                    disabled />
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
                    disabled />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width={5} style={{ paddingTop: 8 }}>
                  <label>Device Top-Up Tax</label>
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
                  <label>Upfront Payment By Customer</label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Input type="Number" value={totalPayment} disabled name='totalPayment' />
                </Grid.Column>
              </Grid.Row>
              <SubmissionHeader header='Submission' />
              {(this.props.orderInPMP) &&
                <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Grid.Column width='3' style={{ paddingTop: 8 }}>
                    <label>Review</label>
                  </Grid.Column>
                  <Grid.Column width='5' >
                    <Input value='Approve' disabled={true} />
                  </Grid.Column>
                </Grid.Row>
              }

              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3'>
                  <label>Status</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{masterRegStatus}</label>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' >
                  <label>Dealer Remarks</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{dealerRemarks}</label>
                </Grid.Column>
              </Grid.Row>

                {(this.props.orderInPMP) &&
                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                    <Grid.Column width='3' style={{ paddingTop: 8 }} >
                        <label>Approval Remarks</label>
                    </Grid.Column>
                    <Grid.Column width='8' >
                  <TextArea style={{ width: 434, height: 100 }} onChange={this.handleChange} name='approvalRemarks'
                            value={approvalRemarks}  />
                    </Grid.Column>
                </Grid.Row>
                }
                {(!this.props.orderInPMP) &&
                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                    <Grid.Column width='3'>
                        <label>BPU Remarks</label>
                    </Grid.Column>
                    <Grid.Column width='5' >
                        <label>{bpuRemarks}</label>
                    </Grid.Column>
                </Grid.Row>
                }
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' >
                  <label>Supporting Center</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{supportingCenterName}</label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' >
                  <label>Suspend Upon Fulfilment</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{suspensionStatus}</label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' >
                  <label>Customer Sign Date</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{custSignDate}</label>
                </Grid.Column>
              </Grid.Row>
              {!this.props.isZerolutionRTF &&
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' >
                  <label>Apple DEP Id</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{appleDepId}</label>
                </Grid.Column>
              </Grid.Row>
              }
            </Grid>
          </Form>
        </Segment>
        <Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <SecondaryButton value='BACK' onClick={this.previous} />
          <div style={{ padding: 20 }} />
          {(this.props.orderInPMP) &&
            <PrimaryButton value='SUBMIT' onClick={this.submit} />
          }
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.order.data.msisdnList[0] !== undefined) {
    return {
      brn: state.order.data.registrationDetails.custBrnNo,
      masterRegId: state.order.data.registrationDetails.masterRegId,
      authSignName: state.order.data.registrationDetails.authSignName,
      marketCode: state.configuration.data.marketCode,
      marketCodeName: state.order.data.registrationDetails.marketCodeName,
      accountCategory: state.order.data.registrationDetails.accountCategory,
      collectionCode: state.configuration.data.collectionCode,
      collectionCodeName: state.order.data.registrationDetails.collectionCodeName,
      paymentDetails: state.configuration.data.paymentDetails,
      portalCustInfo: state.order.data.brnInfo.portalCustInfo,
      bpuRemarks: state.order.data.registrationDetails.bpuRemarks,
      parentId: state.order.data.parentId,
      hierarchyId: state.order.data.hierarchyId,
      cmssNo: state.order.data.cmssNo,
      approvalRemarks: state.order.data.approvalRemarks,
      registrationDetails: state.order.data.registrationDetails,
      errorMessage: state.configuration.data.errorMessage,
      GET_VIEW_SUBMISSION_INFO_STATUS: state.configuration.meta.GET_VIEW_SUBMISSION_INFO_STATUS,
      suspensionStatus: state.order.data.msisdnList[0].suspensionStatus,
      data: state.order.data,
      user: state.user.data,
      orderInPMP: state.order.data.orderInPMP,
      SET_APPROVAL_SUBMISSION_INFO_STATUS: state.order.meta.SET_APPROVAL_SUBMISSION_INFO_STATUS,
      SET_ORDER_APPROVAL_STATUS: state.order.meta.SET_ORDER_APPROVAL_STATUS,
      isZerolutionRTF: state.order.data.isZerolutionRTF
    }
  }
  else {
    return {
      brn: state.order.data.registrationDetails.custBrnNo,
      masterRegId: state.order.data.registrationDetails.masterRegId,
      authSignName: state.order.data.registrationDetails.authSignName,
      marketCode: state.configuration.data.marketCode,
      marketCodeName: state.order.data.registrationDetails.marketCodeName,
      accountCategory: state.order.data.registrationDetails.accountCategory,
      collectionCode: state.configuration.data.collectionCode,
      collectionCodeName: state.order.data.registrationDetails.collectionCodeName,
      paymentDetails: state.configuration.data.paymentDetails,
      portalCustInfo: state.order.data.brnInfo.portalCustInfo,
      bpuRemarks: state.order.data.registrationDetails.bpuRemarks,
      parentId: state.order.data.parentId,
      hierarchyId: state.order.data.hierarchyId,
      cmssNo: state.order.data.cmssNo,
      approvalRemarks: state.order.data.approvalRemarks,
      registrationDetails: state.order.data.registrationDetails,
      errorMessage: state.configuration.data.errorMessage,
      GET_VIEW_SUBMISSION_INFO_STATUS: state.configuration.meta.GET_VIEW_SUBMISSION_INFO_STATUS,
      suspensionStatus: '',
      data: state.order.data,
      user: state.user.data,
      orderInPMP: state.order.data.orderInPMP,
      SET_APPROVAL_SUBMISSION_INFO_STATUS: state.order.meta.SET_APPROVAL_SUBMISSION_INFO_STATUS,
      SET_ORDER_APPROVAL_STATUS: state.order.meta.SET_ORDER_APPROVAL_STATUS,
      isZerolutionRTF: state.order.data.isZerolutionRTF
    }
  }

}

const mapDispatchToProps = {
  getAuditPaymentDetails,
  postApprovalOrderData,
  setApprovalSubmission
}

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
