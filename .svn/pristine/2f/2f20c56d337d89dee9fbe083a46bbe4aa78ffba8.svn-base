import React, { Component } from 'react';
import { Grid, Segment, Container, Form, Input, Dropdown, Checkbox, TextArea, Message } from 'semantic-ui-react';
import Navigation from '../../components/header/navigation';
import { StaticBlock5, StaticBlock8 } from '../../components/common/dumb-component';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { validateParentIdHierId, getPaymentDetails, getAssignList, resetParentIdHierIdStatus } from '../../redux/actions/configuration';
import { setApprovalSubmission, postApprovalOrderData, setApprovalSubmissionPrevious } from '../../redux/actions/order';
import { connect } from 'react-redux';
import SubmissionHeader from '../../helpers/submission-header';
import { PleaseWait } from '../../components/common/dimmer';

const Review_Normal = [
  { key: 1, text: 'Approve', value: 'Approve' },
  { key: 2, text: 'Reject', value: 'Reject' },
]

const Review_Normal_eRF = [
  { key: 1, text: 'Approve', value: 'Approve' },
  { key: 2, text: 'Reject', value: 'Reject' }
]

const Review_Processing = [
  { key: 1, text: 'processing', value: 'processing' },
  { key: 2, text: 'pending CRR', value: 'pending CRR' },
]
const Review_Processing_eRF = [
  { key: 1, text: 'processing', value: 'processing' },
  { key: 2, text: 'pending CRR', value: 'pending CRR' },
]

const Review_Rejection = [
  { key: 1, text: 'Reject', value: 'Reject' }
]


class Submission extends Component {

  constructor(props) {
    super(props);
    const { url } = this.props.match;
    this.state = {
      nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submitted?mode=Approval",
      parentId: this.props.parentId,
      hierarchyId: this.props.hierarchyId,
      action: '',
      reviewDropdownValue: this.props.reviewDropdownValue,
      authorisedSignatoryDropdownValue: this.props.authorisedSignatoryDropdownValue,
      assignedToDropdownValue: 'Test',
      reasonCodeDropdownValue: this.props.reasonCodeDropdownValue,
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
      review: [],
      ReasonCode: false,

      collectionCodeName: '',
      isBillableChecked: props.isBillableChecked,
      dealerRemarks: this.props.dealerRemarks,
      cmssNo: this.props.cmssNo,
      approvalRemarks: this.props.approvalRemarks,
      billableAccountNumber: props.billableAccountNumber,
      validationResult: {
        status: 'SUCCESS',
        message: '',
      },
      showDimmer: false,
      allowResubmission: true,
      isAuthorisedSignatoryValid: props.isAuthorisedSignatoryValid
    };
  }

  componentDidMount() {

    if (this.props.SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS !== 'SUCCESS') {
      this.setState({ showDimmer: true });
      this.props.getPaymentDetails(this.props.masterRegId, this.props.brn);
      this.props.getAssignList();
    }
    if (this.state.reviewDropdownValue === "Reject") {
      this.setState({ ReasonCode: true });
    } else if (this.state.reviewDropdownValue === "Approve") {
      this.setState({ reasonCodeDropdownValue: '' });
    }

    var group = this.props.registrationDetails.groupName;
    var acctBarred = this.props.acctBarred;
    var url = window.location.href;
    var action = url.substring(url.indexOf("action=") + 7, url.indexOf("&easMasterRegId"));
    if (action === "approved") {
      this.setState({ action: 'approved' });
      if (group === "MAXIS")
      this.setState({ review: Review_Normal_eRF });
     else
        this.setState({ review: Review_Normal })
    }
    if (action === "processing") {
      this.setState({ action: 'processing' });
      this.setState({ review: Review_Processing })
    }
    if (action === "rejected" || acctBarred==true) {
      this.setState({ action: 'rejection' });
      this.setState({ review: Review_Rejection })
    }
    if(group === 'Business Postpaid with Fibre Option'){
      let {msisdnList,DeviceTopUpGST,totalAdvanceDeposit,totalDeposit} = this.props;
      if(msisdnList !== undefined && msisdnList !== null){
        var tempTotalDeviceTopup = 0;
        for(var i=0;i<msisdnList.length;i++){
          if(msisdnList[i].lineDeviceInfo.deviceTopUp!== null){
            tempTotalDeviceTopup += msisdnList[i].lineDeviceInfo.deviceTopUp
          }
        }
       // console.log('deposit:'+totalDeposit+' advancePayment:'+totalAdvanceDeposit+' GST:'+DeviceTopUpGST+'top Up:'+tempTotalDeviceTopup);
       
        DeviceTopUpGST=DeviceTopUpGST==undefined?0:DeviceTopUpGST;
        totalDeposit=totalDeposit==undefined?0:totalDeposit;
        totalAdvanceDeposit=totalAdvanceDeposit==undefined?0:totalAdvanceDeposit;
        var tempTotalPayment=totalDeposit+totalAdvanceDeposit+DeviceTopUpGST+tempTotalDeviceTopup;
        this.setState({totalDeviceTopUp:tempTotalDeviceTopup, totalPayment:tempTotalPayment});
        
      }
    }

    if(group === 'MAXIS'){
      let {msisdnList,DeviceTopUpGST,totalAdvanceDeposit,totalDeposit} = this.props;
      console.log('Maxis');
      if(msisdnList !== undefined && msisdnList !== null){
        var tempTotalDeviceTopup = 0;
        for(var i=0;i<msisdnList.length;i++){
          if(msisdnList[i].lineDeviceInfo.deviceTopUp!== null){
            tempTotalDeviceTopup += msisdnList[i].lineDeviceInfo.deviceTopUp
          }
        }
       // console.log('deposit:'+totalDeposit+' advancePayment:'+totalAdvanceDeposit+' GST:'+DeviceTopUpGST+'top Up:'+tempTotalDeviceTopup);
       
        DeviceTopUpGST=DeviceTopUpGST==undefined?0:DeviceTopUpGST;
        totalDeposit=totalDeposit==undefined?0:totalDeposit;
        totalAdvanceDeposit=totalAdvanceDeposit==undefined?0:totalAdvanceDeposit;
        var tempTotalPayment=totalDeposit+totalAdvanceDeposit+DeviceTopUpGST+tempTotalDeviceTopup;
        this.setState({totalDeviceTopUp:tempTotalDeviceTopup, totalPayment:tempTotalPayment});
        
      }
    }
    
  }

  componentWillReceiveProps(nextProps) {
    var group = this.props.registrationDetails.groupName;
    if (this.props.VALIDATE_PARENTID_HIERID_STATUS !== 'SUCCESS' &&
      nextProps.VALIDATE_PARENTID_HIERID_STATUS === 'SUCCESS') {
      this.setState({ showDimmer: false, validationResult: { status: 'Validation_SUCCESS', message: nextProps.errorMessage } });
    }
    else if (this.props.VALIDATE_PARENTID_HIERID_STATUS !== 'FAILED' &&
      nextProps.VALIDATE_PARENTID_HIERID_STATUS === 'FAILED') {
      this.setState({ showDimmer: false, validationResult: { status: 'FAILURE', message: nextProps.errorMessage } });
    }
    else if (this.props.GET_PAYMENT_DETAILS_STATUS !== 'SUCCESS' &&
      nextProps.GET_PAYMENT_DETAILS_STATUS === 'SUCCESS') {
      this.setState({
        deposit: nextProps.paymentDetails.orgDeposit, totalLinesDeposit: nextProps.paymentDetails.noOfLines, totalDeposit: nextProps.paymentDetails.totDeposit,
        advancePaymentAmount: nextProps.paymentDetails.orgAdvPayment, totalLinesadvancePayment: nextProps.paymentDetails.noOfLines, totalAdvanceDeposit: nextProps.paymentDetails.totAdvPayment,
        DeviceTopUpGST: nextProps.paymentDetails.DeviceTopUpGST, DeviceTopUpGSTFactor: nextProps.paymentDetails.gstFactor,
        showDimmer: false
      }, () => {
        let { advancePaymentAmount, totalLinesadvancePayment, deposit, totalLinesDeposit, totalPayment, totalDeviceTopUp,DeviceTopUpGST } = this.state;
        let totalAdvanceDeposit = parseFloat(parseFloat(advancePaymentAmount) * parseFloat(totalLinesadvancePayment));
        let tempTotalDeposit = parseFloat(parseFloat(deposit) * parseFloat(totalLinesDeposit));
        let tempTotalDeviceTopup = parseFloat(totalDeviceTopUp);
       let tempTotalPayment = parseFloat(totalAdvanceDeposit) + parseFloat(tempTotalDeposit) + parseFloat(tempTotalDeviceTopup) ;
        this.setState({ totalPayment: tempTotalPayment });
      });
     
    }
    else if (this.props.SET_APPROVAL_SUBMISSION_INFO_STATUS !== 'SUCCESS' &&
      nextProps.SET_APPROVAL_SUBMISSION_INFO_STATUS === 'SUCCESS') {
      console.log('postApprovalOrderData', JSON.stringify(nextProps.data));
    
      this.setState({ showDimmer: true });
      this.props.postApprovalOrderData(nextProps.data);
    }
    else if (this.props.SET_ORDER_APPROVAL_STATUS !== 'SUCCESS' && nextProps.SET_ORDER_APPROVAL_STATUS === 'SUCCESS') {
      console.log('SUCCESS');
      console.log(nextProps.approvalMessage,nextProps);
      this.setState({ showDimmer: false });
      if(nextProps.approvalMessage != undefined && nextProps.approvalMessage != null 
          && nextProps.approvalMessage.includes('resultRetriveAccountStatus')){
            this.setState({ showDimmer: false, validationResult: { status: 'FAILURE', message: nextProps.approvalMessage.split(':')[1]}});
      }else{
        let tempNextURL = this.state.nextUrl;
        this.props.history.push(tempNextURL);
      }
    }
    else if (this.props.SET_ORDER_APPROVAL_STATUS !== 'FAILED' && nextProps.SET_ORDER_APPROVAL_STATUS === 'FAILED') {
      console.log('FAILED');
      this.setState({ showDimmer: false });
      let tempNextURL = this.state.nextUrl;
      this.props.history.push(tempNextURL);
    }
    else if (this.props.SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS !== 'SUCCESS' && nextProps.SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS === 'SUCCESS') {
      this.props.history.goBack();
    }
  }

  totalDepositChange = () => {
    let { advancePaymentAmount, totalLinesadvancePayment, deposit, totalLinesDeposit, totalPayment, totalDeviceTopUp, DeviceTopUpGST } = this.state;
    let totalAdvanceDeposit = parseFloat(parseFloat(advancePaymentAmount) * parseFloat(totalLinesadvancePayment));
    let tempTotalDeposit = parseFloat(parseFloat(deposit) * parseFloat(totalLinesDeposit));
    let tempTotalDeviceTopup = parseFloat(totalDeviceTopUp);
    let tempTotalPayment = parseFloat(totalAdvanceDeposit) + parseFloat(tempTotalDeposit) + parseFloat(tempTotalDeviceTopup) ;
    this.setState({ totalAdvanceDeposit: totalAdvanceDeposit, totalDeposit: tempTotalDeposit, totalPayment: tempTotalPayment });
  }

  validate = () => {
    if (this.state.hierarchyId === null) {
      alert('Enter hierarchy Id');
    } else if (this.state.parentId === null) {
      alert('Enter Parent Id');
    } else {
      this.setState({ showDimmer: true });
      this.props.validateParentIdHierId(this.state.parentId, this.state.hierarchyId, this.props.masterRegId);
    }

  }

  handleChange = (e, { type, name, value }) => {
    if (name === 'authorisedSignatoryDropdownValue') {
      var temp = value.split(':');
      if (temp.length > 2 && temp[1] !== null && temp[1] !== '' && temp[2] !== null && temp[2] !== '') {
        this.setState({ isAuthorisedSignatoryValid: true });
      }
      else {
        this.setState({ isAuthorisedSignatoryValid: false, validationResult: { status: 'FAILURE', message: 'Authorised Signatory you have choosen doesnt have valid email & mobile no, please try choosing some other' } });
      }
    }
    if (name === 'review') {
      if (this.state.action === "rejection") {
        this.setState({ ReasonCode: true });
      }
      if (value === "Reject") {
        this.setState({ ReasonCode: true });
        this.state.action = "rejection";
      }
      if (value === "Approve") {
        this.setState({ ReasonCode: false });
      }
      this.setState({ reviewDropdownValue: value });
    }/*else if(this.props.VALIDATE_PARENTID_HIERID_STATUS === 'SUCCESS' && (name === 'hierarchyId' || name === 'parentId')){
        this.props.resetParentIdHierIdStatus();
        this.setState({ [name]: value});
    }*/else {
      if (type === 'checkbox') {
        this.setState((prevState) => {
          return { [name]: !prevState[name] };
        });
      } else {
        this.setState({ [name]: value });
      }
    }

    if (name === "totalLinesDeposit" || name === "totalLinesadvancePayment") {
      this.setState({ totalLinesDeposit: value });
      this.setState({ totalLinesadvancePayment: value });
    }

    if(name==='DeviceTopUpGST'){
      this.setState({DeviceTopUpGST: value});
    }
  }

  handleCheckBox = (e, { type, name, value, checked }) => {
    this.setState({ [name]: checked });
  }

  previous = () => {
    let { reviewDropdownValue, reasonCodeDropdownValue, ReasonCode, hierarchyId
      , action, parentId, approvalRemarks, assignedToDropdownValue, isBillableChecked } = this.state;

    let tempBillableValue = "false";
    if (isBillableChecked === true) {
      tempBillableValue = "true";
    }
    let tempAction = null;
    if (reviewDropdownValue === 'processing') {
      tempAction = 'processing';
    }
    else if (reviewDropdownValue === 'pending CRR') {
      tempAction = 'PCRR';
    }
    else if (reviewDropdownValue === 'Approve') {
      tempAction = 'Approved'
    }
    else if (reviewDropdownValue === 'Reject') {
      tempAction = 'Rejected'
    }
    let authDetail = null;

    if (this.state.authorisedSignatoryDropdownValue !== null && this.state.authorisedSignatoryDropdownValue !== '') {
      authDetail = {
        authName: this.state.authorisedSignatoryDropdownValue.split(":")[0],
        authEmail: this.state.authorisedSignatoryDropdownValue.split(":")[1],
        authMobileNo: this.state.authorisedSignatoryDropdownValue.split(":")[2],
      };
    }

    let tempAllowResubmission = 0;
    if (this.state.allowResubmission) {
      tempAllowResubmission = 1;
    }
    let tempUploadRegId = [];

    this.props.setApprovalSubmissionPrevious(this.props.marketCode,
      this.props.accountCategory, this.state.parentId,
      this.state.hierarchyId, this.props.collectionCode, this.state.authorisedSignatoryDropdownValue,
      this.state.isBillableChecked,
      this.state.deposit,
      this.state.totalDeposit,
      this.state.advancePaymentAmount,
      this.state.totalAdvanceDeposit,
      this.state.totalDeviceTopUp,
      this.state.DeviceTopUpGST,
      this.state.totalPayment,
      tempAction,
      this.state.cmssNo,
      this.state.approvalRemarks,
      this.state.assignedToDropdownValue, this.state.totalLinesDeposit,
      this.props.paymentDetails.orgAdvPayment, this.props.paymentDetails.orgDeposit,
      this.state.billableAccountNumber, this.props.registrationDetails.prodCatName, this.state.reasonCodeDropdownValue, this.props.user, authDetail, tempUploadRegId,
      tempAllowResubmission,
      this.state.totalLinesadvancePayment,
      this.state.reviewDropdownValue,
      this.state.reasonCodeDropdownValue,
      this.state.isAuthorisedSignatoryValid,
      this.props.isParentIdBilled
    );

  }

  validateEmail1(field) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    return (regex.test(field)) ? true : false;
   }

  submit = () => {
    let { reviewDropdownValue, reasonCodeDropdownValue, ReasonCode, hierarchyId
      , action, parentId, approvalRemarks, assignedToDropdownValue, isBillableChecked, 
      isAuthorisedSignatoryValid,totalLinesadvancePayment,totalLinesDeposit,DeviceTopUpGST } = this.state;
    if (!reviewDropdownValue) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please select either Approve/Reject' } });
      return;
    }
    else if (!reasonCodeDropdownValue && ReasonCode === true) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please select Reject Reason' } });
      return;
    }
    else if (hierarchyId === null && action === "approved" && ReasonCode === false) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter hierarchyId' } });
      return;
    }
    else if (parentId === null && action === "approved" && ReasonCode === false) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter Parent Id' } });
      return;
    }
    else if (this.state.billableAccountNumber === '' && this.state.action === "approved" && this.state.ReasonCode === false) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter Billable account !' } });
      return;
    }
    else if (approvalRemarks === "" && action === "approved" && ReasonCode === false) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter Approval Remarks' } });
      return;
    } else if (this.state.cmssNo === '' && this.state.action === "approved" && this.state.ReasonCode === false) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter CMSS No.' } });
      return;
    }
    else if (!this.state.authorisedSignatoryDropdownValue && this.state.action === "approved"
      && this.state.ReasonCode === false && this.props.VALIDATE_PARENTID_HIERID_STATUS === 'SUCCESS') {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please select Authorised Signatory' } });
      return;
    } else if ((!this.state.authorisedSignatoryDropdownValue && this.state.action === "approved"
      && this.state.ReasonCode === false && this.props.VALIDATE_PARENTID_HIERID_STATUS !== 'SUCCESS') ||
      (this.state.authorisedSignatoryDropdownValue != null && this.state.action === "approved"
        && this.state.ReasonCode === false && this.props.VALIDATE_PARENTID_HIERID_STATUS !== 'SUCCESS')) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please click on Validate Button to validate hierarchy and parentId' } });
      return;
    }
    else if (!assignedToDropdownValue && action === "approved" && ReasonCode === false) {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Please select Assigned To' } });
      return;
    }
    else if (!isAuthorisedSignatoryValid && action === "approved") {
      this.setState({ validationResult: { status: 'FAILURE', message: 'Authorised Signatory you have choosen doesnt have valid email & mobile no, please try choosing some other' } });
      return;
    }
    else if (totalLinesadvancePayment != undefined && totalLinesadvancePayment != null && (totalLinesadvancePayment+'').indexOf(".") != -1) {

      this.setState({ validationResult: { status: 'FAILURE', message: 'Total lines can not contain decimal value' } });
      return;

    }
    else if (totalLinesDeposit != undefined && totalLinesDeposit != null && (totalLinesDeposit+'').indexOf(".") != -1) {

      this.setState({ validationResult: { status: 'FAILURE', message: 'Total lines can not contain decimal value' } });
      return;

    }
    else {
      let tempBillableValue = "false";
      if (isBillableChecked === true) {
        tempBillableValue = "true";
      }
      let tempAction = null;
      if (reviewDropdownValue === 'processing') {
        tempAction = 'processing';
      }
      else if (reviewDropdownValue === 'pending CRR') {
        tempAction = 'PCRR';
      }
      else if (reviewDropdownValue === 'Approve') {
        tempAction = 'Approved'
      }
      else if (reviewDropdownValue === 'Reject') {
        tempAction = 'Rejected'
      }
      let authDetail = {
        authName: this.state.authorisedSignatoryDropdownValue.split(":")[0],
        authEmail: this.state.authorisedSignatoryDropdownValue.split(":")[1],
        authMobileNo: this.state.authorisedSignatoryDropdownValue.split(":")[2],
      };

      if(reviewDropdownValue === 'Approve' && !this.validateEmail1(authDetail.authEmail)){
        this.setState({ validationResult: { status: 'FAILURE', message:'Invalid Authorised Signatory Email. Please update email in CMSS and submit.'} });
        return;
      }
      let tempAllowResubmission = 0;
      if (this.state.allowResubmission) {
        tempAllowResubmission = 1;
      }
      let tempUploadRegId = [];
      let tempTotalLinesDeposit = 0
      if(this.state.totalLinesDeposit !== undefined && this.state.totalLinesDeposit !== null && this.state.totalLinesDeposit !==''){
           tempTotalLinesDeposit = this.state.totalLinesDeposit;
      }
      if (reviewDropdownValue === 'Approve') {
        if (window.confirm("Please check Billable Account number and Payment details before you proceed. Click on Cancel to Edit the details or OK to Approve")) {
          this.props.setApprovalSubmission(this.props.marketCode,
            this.props.accountCategory, this.state.parentId,
            this.state.hierarchyId, this.props.collectionCode, this.state.authorisedSignatoryDropdownValue,
            tempBillableValue,
            this.state.deposit,
            this.state.totalDeposit,
            this.state.advancePaymentAmount,
            this.state.totalAdvanceDeposit,
            this.state.totalDeviceTopUp,
            this.state.DeviceTopUpGST,
            this.state.totalPayment,
            tempAction,
            this.state.cmssNo,
            this.state.approvalRemarks,
            this.state.assignedToDropdownValue, tempTotalLinesDeposit,
            this.props.paymentDetails.orgAdvPayment, this.props.paymentDetails.orgDeposit,
            this.state.billableAccountNumber, this.props.registrationDetails.prodCatName, this.state.reasonCodeDropdownValue, this.props.user, authDetail, tempUploadRegId,
            tempAllowResubmission,
            this.props.registrationDetails.groupName,
            this.props.registrationDetails.accountNo,
            this.props.isParentIdBilled
          );
        }
      }
      else {
        this.props.setApprovalSubmission(this.props.marketCode,
          this.props.accountCategory, this.state.parentId,
          this.state.hierarchyId, this.props.collectionCode, this.state.authorisedSignatoryDropdownValue,
          tempBillableValue,
          this.state.deposit,
          this.state.totalDeposit,
          this.state.advancePaymentAmount,
          this.state.totalAdvanceDeposit,
          this.state.totalDeviceTopUp,
          this.state.DeviceTopUpGST,
          this.state.totalPayment,
          tempAction,
          this.state.cmssNo,
          this.state.approvalRemarks,
          this.state.assignedToDropdownValue, tempTotalLinesDeposit,
          this.props.paymentDetails.orgAdvPayment, this.props.paymentDetails.orgDeposit,
          this.state.billableAccountNumber, this.props.registrationDetails.prodCatName, this.state.reasonCodeDropdownValue, this.props.user, authDetail, tempUploadRegId,
          tempAllowResubmission,
          this.props.registrationDetails.groupName,
          this.props.registrationDetails.accountNo
        );
      }


    }


  }
  render() {
    let { action, reviewDropdownValue, review, parentId, hierarchyId, authorisedSignatoryDropdownValue,
      totalLinesDeposit, totalDeposit, advancePaymentAmount, totalLinesadvancePayment, totalDeviceTopUp, DeviceTopUpGST, totalPayment
      , assignedToDropdownValue, approvalRemarks, cmssNo, totalAdvanceDeposit, isBillableChecked, billableAccountNumber, showDimmer, reasonCodeDropdownValue, allowResubmission, deposit } = this.state;
    let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName, totalMembers, totalMemberString,
      maxLineCount, prodCatName, dealerName, dealerCode, dealerRemarks, acctMgrName, custSignDate, supportingCenterName, rejectReasons, groupName,appleDepId } = this.props.registrationDetails;
    let { marketCodeName, accountCategory, collectionCodeName, authList, assignList, portalCustInfo } = this.props;
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
                {groupName != 'MAXIS' &&
                  <Grid.Column width='3' >
                    <label>Billable</label>
                  </Grid.Column>}
                {groupName != 'MAXIS' &&
                  <Grid.Column width='5' >
                    <Checkbox disabled={(action == "processing" ? true : false)} style={{ padding: 5 }} onChange={this.handleChange} name='isBillableChecked' checked={isBillableChecked} />
                  </Grid.Column>}
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
                    <Input type="Number" value={hierarchyId} onChange={this.handleChange}
                      name='hierarchyId' />
                  </Grid.Column>
                  <Grid.Column width='4' style={{ paddingTop: 8 }} >
                    <label>Parent Id</label>
                  </Grid.Column>
                  <Grid.Column width='3' >
                    <Input type="Number" value={parentId} onChange={this.handleChange}
                      name='parentId' />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                  <Grid.Column width='3' >
                  </Grid.Column>
                  <Grid.Column width='5' >
                    <SecondaryButton value='Validate' onClick={this.validate} />
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
                    <Dropdown placeholder='--Please Select--'
                      search
                      selection
                      name="authorisedSignatoryDropdownValue"
                      onChange={this.handleChange}
                      options={authList}
                      value={authorisedSignatoryDropdownValue}
                    />
                  </Grid.Column>
                </Grid.Row></React.Fragment> : null}
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
                    disabled={((totalLinesDeposit == 0 && totalLinesDeposit != '' )? true : false)}

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
                    disabled={((totalLinesDeposit == 0 && totalLinesDeposit != '' )? true : false)}
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
                    disabled={((totalLinesadvancePayment == 0 && totalLinesadvancePayment != '' )? true : false)}
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
                    disabled={((totalLinesadvancePayment == 0 && totalLinesadvancePayment != '' )? true : false)}
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
               {this.props.deviceFulfillment==='Fulfillment by Trade Partner'&&( <Input type="Number"
                    value={totalDeviceTopUp}
                    name="totalDeviceTopUp"
                    onChange={this.handleChange}
                    onBlur={this.totalDepositChange}
                    disabled
                    />)}
                {this.props.deviceFulfillment==='Device delivery by Brightstar'&&( <Input type="Number"
                    value={totalDeviceTopUp}
                    name="totalDeviceTopUp"
                    onChange={this.handleChange}
                    onBlur={this.totalDepositChange}
                    />)}
              {this.props.registrationDetails.groupName==='Business Postpaid with Fibre Option' &&( <Input type="Number"
              value={totalDeviceTopUp}
                    name="totalDeviceTopUp"
                    onChange={this.handleChange}
                    onBlur={this.totalDepositChange}
                    />)}
                    {this.props.registrationDetails.groupName==='MAXIS' &&( <Input type="Number"
              value={totalDeviceTopUp}
                    name="totalDeviceTopUp"
                    onChange={this.handleChange}
                    onBlur={this.totalDepositChange}
                    />)}
                </Grid.Column>
              </Grid.Row>
             
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width={5} style={{ paddingTop: 8 }}>
                  <label>Device Top-Up</label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Input name='DeviceTopUpGST' type="Number" value={DeviceTopUpGST} disabled onChange={this.handleChange}  />
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
                  <Input disabled />
                </Grid.Column>
              </Grid.Row>
              <SubmissionHeader header='Submission' />
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Grid.Column width='3' style={{ paddingTop: 8 }}>
                  <label>Review</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <Dropdown placeholder='--Please Select--'
                    search
                    selection
                    onChange={this.handleChange}
                    options={review}
                    name='review'
                    value={reviewDropdownValue}
                  />
                </Grid.Column>
              </Grid.Row>
              {this.state.ReasonCode ?
                <React.Fragment><Grid.Row style={{ paddingBottom: 0, paddingTop: 2 }} >
                  <Grid.Column width='3' style={{ paddingTop: 8 }}>
                    <label>Reason Code</label>
                  </Grid.Column>
                  <Grid.Column width='3'  >
                    <Dropdown placeholder='--Please Select--'
                      search
                      selection
                      name="reasonCodeDropdownValue"
                      options={rejectReasons}
                      onChange={this.handleChange}
                      value={reasonCodeDropdownValue} />
                  </Grid.Column>
                  <Grid.Column width='3' >
                    <Checkbox name='allowResubmission' value={allowResubmission} checked={allowResubmission} onChange={this.handleCheckBox}
                      disabled={this.props.registrationDetails.groupName === 'MAXIS'} />&emsp;
                    <label style={{ marginTop: 20 }}>Allow Resubmission?</label>
                  </Grid.Column>
                </Grid.Row></React.Fragment> : null}
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' >
                  <label>Dealer Remarks</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <label>{dealerRemarks}</label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' style={{ paddingTop: 8 }}>
                  <label>CMSS No</label>
                </Grid.Column>
                <Grid.Column width='5' >
                  <Input onChange={this.handleChange} name='cmssNo' value={cmssNo} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' style={{ paddingTop: 8 }} >
                  <label>Approval Remarks</label>
                </Grid.Column>
                <Grid.Column width='8' >
                  <TextArea style={{ width: 434, height: 100 }} onChange={this.handleChange} name='approvalRemarks'
                    value={approvalRemarks} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 2 }}>
                <Grid.Column width='3' style={{ paddingTop: 8 }}>
                  <label>Assigned To</label>
                </Grid.Column>
                <Grid.Column width='7' >
                  <Dropdown placeholder='--Please Select--'
                    search
                    selection
                    name="assignedToDropdownValue"
                    onChange={this.handleChange}
                    options={assignList}
                    value={assignedToDropdownValue}
                    fluid
                  />
                </Grid.Column>
              </Grid.Row>
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
                  <label>....</label>
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
                  <label>APPLE DEP ID</label>
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
          <PrimaryButton value='SUBMIT' onClick={this.submit} />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brn: state.order.data.registrationDetails.custBrnNo,
    masterRegId: state.order.data.registrationDetails.masterRegId,
    authList: state.configuration.data.authList,
    marketCode: state.configuration.data.marketCode,
    marketCodeName: state.configuration.data.marketCodeName,
    accountCategory: state.configuration.data.accountCategory,
    collectionCode: state.configuration.data.collectionCode,
    collectionCodeName: state.configuration.data.collectionCodeName,
    paymentDetails: state.configuration.data.paymentDetails,
    portalCustInfo: state.order.data.brnInfo.portalCustInfo,
    parentId: state.order.data.parentId,
    hierarchyId: state.order.data.hierarchyId,
    action: state.order.data.action,
    authorisedSignatoryDropdownValue: state.order.data.authorisedSignatoryDropdownValue,
    cmssNo: state.order.data.cmssNo,
    approvalRemarks: state.order.data.approvalRemarks,
    assignedToDropdownValue: state.order.data.assignedToDropdownValue,
    registrationDetails: state.order.data.registrationDetails,
    DeviceTopUpGST: state.order.data.DeviceTopUpGST,
    totalPayment: state.order.data.totalPayment,
    reviewDropdownValue: state.order.data.reviewDropdownValue,
    reasonCodeDropdownValue: state.order.data.reasonCodeDropdownValue,
    VALIDATE_PARENTID_HIERID_STATUS: state.configuration.meta.VALIDATE_PARENTID_HIERID_STATUS,
    errorMessage: state.configuration.data.errorMessage,
    assignList: state.configuration.data.assignList,
    GET_PAYMENT_DETAILS_STATUS: state.configuration.meta.GET_PAYMENT_DETAILS_STATUS,
    data: state.order.data,
    user: state.user.data, 
    totalDeviceTopUp: state.order.data.totalDeviceTopUp,
    SET_APPROVAL_SUBMISSION_INFO_STATUS: state.order.meta.SET_APPROVAL_SUBMISSION_INFO_STATUS,
    SET_ORDER_APPROVAL_STATUS: state.order.meta.SET_ORDER_APPROVAL_STATUS,
    SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS: state.order.meta.SET_APPROVAL_SUBMISSION_INFO_PREVIOUS_STATUS,
    deposit: state.order.data.deposit,
    totalLinesDeposit: state.order.data.totalLinesDeposit,
    totalDeposit: state.order.data.totalDeposit,
    totalAdvanceDeposit: state.order.data.totalAdvanceDeposit,
    totalDeviceTopUp: state.order.data.totalDeviceTopUp,
    totalPayment: state.order.data.totalPayment,
    totalLinesadvancePayment:state.order.data.totalLinesadvancePayment,
    advancePaymentAmount:state.order.data.advancePaymentAmount,
    billableAccountNumber:state.order.data.billableAccountNumber,
    isBillableChecked:state.order.data.isBillableChecked,
    isAuthorisedSignatoryValid:state.order.data.isAuthorisedSignatoryValid,
    deviceFulfillment:state.order.data.deviceFulfillment,
    msisdnList:state.order.data.msisdnList,
    isZerolutionRTF: state.order.data.isZerolutionRTF,
    isParentIdBilled: state.configuration.data.isParentIdBilled,
    acctBarred: state.order.data.acctBarred,
    approvalMessage:state.order.data.approvalMessage
  }
}

const mapDispatchToProps = {
  setApprovalSubmission,
  validateParentIdHierId,
  getPaymentDetails,
  getAssignList,
  postApprovalOrderData,
  resetParentIdHierIdStatus,
  setApprovalSubmissionPrevious
}

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
