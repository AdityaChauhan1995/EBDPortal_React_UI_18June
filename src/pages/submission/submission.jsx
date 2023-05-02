import React, { Component } from 'react';
import { Grid, Segment, Container, Form, Input, Icon, Dropdown, Checkbox, Message } from 'semantic-ui-react';
import Navigation from '../../components/header/navigation';
import { connect } from 'react-redux';
import { StaticBlock1, StaticBlock7 } from '../../components/common/dumb-component';
import {
  sendFile,
  getUploadedFile
} from '../../redux/actions/configuration';
import { setSubmissionInfo, postOrderData, setSubmissionInfoPrevious } from '../../redux/actions/order';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { validateSubmissionInfo } from '../../helpers/submission-helper';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import { PleaseWait, FileUploadWait } from '../../components/common/dimmer';

class Submission extends Component {

  constructor(props) {
    super(props);
    this.file = '';
    const { url } = this.props.match;
    this.state = {
      nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submitted",
      dealerRemarks: props.dealerRemarks,
      accountManagerCode: props.accountManagerCode,
      salesmanCode: props.salesmanCode,
      salesmanName: props.salesmanName,
      appleDepId:props.appleDepId,
      supportingCenter: props.supportingCenter,
      cmssID: props.cmssID,
      masterRegId:"New - Not Available Yet",
      cmssDocument: {
        ref: React.createRef(),
        url: null,
        fileName: props.cmssFileName,
        cmssRegId: props.cmssRegId,
      },
      customerSignDate: props.customerSignDate?moment(props.customerSignDate, "DD/MM/YYYY") : moment(),
      tnc: props.checkboxValue,
      validationResult: {
        status: 'SUCCESS',
        message: '',
      },
      downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
			},
      showDimmer: false,
      showFileDimmer: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.SEND_FILE_STATUS !== 'SUCCESS' &&
      nextProps.SEND_FILE_STATUS === 'SUCCESS') {
      this.setState({
        cmssDocument: {
          ...this.state.cmssDocument,
          cmssRegId: nextProps.documentRegId,

        },
        showFileDimmer: false,
      })
    }
    else if (this.props.SET_SUBMISSION_INFO_STATUS !== 'SUCCESS' &&
      nextProps.SET_SUBMISSION_INFO_STATUS === 'SUCCESS') {
        // submit order
        console.log('submitting order', JSON.stringify(nextProps.order));
        this.setState({showDimmer: true});
        this.props.postOrderData(nextProps.order);
    }
    else if (this.props.SET_ORDER_SUBMISSION_STATUS !== 'SUCCESS' &&
      nextProps.SET_ORDER_SUBMISSION_STATUS === 'SUCCESS') {

        // order submitted
        this.setState({showDimmer: false});
        this.props.history.push(this.state.nextUrl);
    }
    else if(this.props.SET_ORDER_SUBMISSION_STATUS !== 'FAILED' &&
      nextProps.SET_ORDER_SUBMISSION_STATUS === 'FAILED'){
        this.setState({showDimmer: false});
        this.props.history.push(this.state.nextUrl);
    }
    else if (this.props.GET_UPLOADED_FILE_STATUS !== 'SUCCESS' &&
			nextProps.GET_UPLOADED_FILE_STATUS === 'SUCCESS') {
			const url = window.URL.createObjectURL(new Blob([nextProps.regDoc]))
			this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } }, () => this.state.downloadedFile.ref.current.click());

		}
  }


  selectFile = (e) => {
    this.setState({ showFileDimmer: true });
    let data = new FormData();
    let file = e.target.files[0];
    data.append('file', file)
    data.append('fileName', file.name)
    data.append('filesize', file.size)
    data.append('tempUploadRegId', this.state.cmssDocument.cmssRegId);
    data.append('documentdesc', "CMSS Document");
    data.append('documentCode', "1108");
    data.append('documentSourceInd', "EBD");
    data.append('documentType', "BC");
    data.append('sNo', "4");
    this.props.sendFile(data);
    this.setState({
        cmssDocument: {
          ...this.state.cmssDocument,
          fileName: file.name
        },
      })
  }

  downloadFile = () => {
    this.setState({
      downloadedFile: { ...this.state.downloadedFile,
         fileName:this.state.cmssDocument.fileName,
         ref:this.state.cmssDocument.ref} },
      );
    const { cmssRegId } = this.state.cmssDocument;
    this.props.getUploadedFile(cmssRegId, "4", "1108", "No")
  }

  previous = () => {
    let { dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
      cmssID, cmssDocument, customerSignDate, tnc,appleDepId } = this.state;
    this.props.setSubmissionInfoPrevious(
      dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
      cmssID, cmssDocument.fileName, cmssDocument.cmssRegId, customerSignDate.format("DD/MM/YYYY"), tnc, this.props.user,appleDepId);
    this.props.history.goBack();
  }

  submit = () => {
    let { dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
      cmssID, cmssFileName, cmssRegId, customerSignDate, tnc,cmssDocument,appleDepId } = this.state;

    let validationResult = validateSubmissionInfo(dealerRemarks, supportingCenter, customerSignDate, accountManagerCode, tnc,cmssDocument,
                          this.props.isContractDurationGrtrFourMonths,this.props.bundleType, this.props.user.userRole);

    if (validationResult.status === 'FAILURE') {
      // cant proceed, show errors
      this.setState({ validationResult: validationResult });
    } else {
      // proceed
      this.props.setSubmissionInfo(
        dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
        cmssID, cmssFileName, cmssRegId, customerSignDate.format("DD/MM/YYYY"), tnc, this.props.user,appleDepId);
    }
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
    const utcOffset = 0;

    let { dealerRemarks, accountManagerCode, salesmanCode, salesmanName,
      supportingCenter, cmssID, cmssDocument, customerSignDate, tnc, showDimmer, 
      showFileDimmer, masterRegId,appleDepId } = this.state;

    let { brn, orderCategory, selectedVSN, suptCenter, accMgrCenter,
      dealerCode, dealerName, companyName, bundleType } = this.props;

    let { status, message, missingDealerRemarks, missingSupportingCtr,
      missingCustomerSignDate, missingAccountMgr, missingTNC,missingCMSSDocument } = this.state.validationResult;
     console.log(missingCMSSDocument,missingTNC,this.state.validationResult)
    return (

      <Container fluid className='main-container'>
        <PleaseWait active={showDimmer}/>
        <FileUploadWait active={showFileDimmer}/>

        <Navigation index={6} group={bundleType}/>
        <Segment basic style={{ padding: 0, flex: 1 }}>
          <Form size='small'>
            <Grid style={{ padding: 25, paddingTop: 15 }}>
              {bundleType !='MAXIS' &&
                <StaticBlock1 brn={brn} orderCategory={orderCategory} selectedVSN={selectedVSN} companyName={companyName} />
              }
              {bundleType==='MAXIS' &&
    					     <StaticBlock7 brn={brn} orderCategory={orderCategory} masterRegId={masterRegId} companyName={companyName} />
    					}
              <Grid.Row verticalAlign='middle' className='_row' style={{ paddingTop: 40 }}>
                <Grid.Column width={3}>
                  <label>Dealer Remarks</label>
                  {
                    (status === 'FAILURE' && missingDealerRemarks) &&
                    <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                  }
                </Grid.Column>
                <Grid.Column width={5}>
                  <Input
                    name='dealerRemarks'
                    placeholder='Dealer Remarks'
                    onChange={this.handleChange}
                    value={dealerRemarks}
                    maxLength="500"
                    fluid
                  />
                </Grid.Column>
              </Grid.Row>
              { (this.props.user.userRole==='ECO'|| this.props.user.userRole==='SMERovingSupport' || this.props.user.userRole==='SMEAdmin') && (
                  <Grid.Row verticalAlign='middle' className='_row'>
                    <Grid.Column width={3}>
                    <label>Account Manager</label>
                      {
                        (status === 'FAILURE' && missingAccountMgr) &&
                        <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                      }
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Dropdown
                        name='accountManagerCode'
                        placeholder='Account Manager'
                        search
                        selection
                        options={accMgrCenter}
                        onChange={this.handleChange}
                        value={accountManagerCode}
                        fluid />
                    </Grid.Column>
                  </Grid.Row>
                )
              }
              <Grid.Row verticalAlign='middle' className='_row'>
                <Grid.Column verticalAlign='middle' width={3}>
                  <label>Dealer Code</label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <label>{dealerCode}</label>
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column verticalAlign='middle' width={3}>
                  <label>Dealer Name</label>
                </Grid.Column>
                <Grid.Column width={4}>
                  <label>{dealerName}</label>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row verticalAlign='middle' className='_row'>
                <Grid.Column width={3}>
                  <label>Salesman Code</label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Input
                    placeholder='Salesman Code'
                    fluid
                    name='salesmanCode'
                    value={salesmanCode}
                    onChange={this.handleChange} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={3}>
                  <label>Salesman Name</label>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Input
                    placeholder='Salesman Name'
                    name='salesmanName'
                    value={salesmanName}
                    fluid
                    onChange={this.handleChange} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row verticalAlign='middle' className='_row'>
                <Grid.Column width={3}>
                  <label>Supporting Center</label>
                  {
                    (status === 'FAILURE' && missingSupportingCtr) &&
                    <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                  }
                </Grid.Column>
                <Grid.Column width={5}>
                  <Dropdown
                    name='supportingCenter'
                    placeholder='Supporting Center'
                    search
                    selection
                    options={suptCenter}
                    onChange={this.handleChange}
                    fluid
                    value={supportingCenter} />
                </Grid.Column>
                <Grid.Column width={1} />
                {!this.props.isZerolutionRTF &&
                <React.Fragment>
                <Grid.Column width={3}>
                  <label>APPLE DEP ID</label>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Input
                    placeholder='APPLE DEP ID'
                    name='appleDepId'
                    value={appleDepId}
                    fluid
                    onChange={this.handleChange} />
                </Grid.Column>
                </React.Fragment>
              }
              </Grid.Row>

              <Grid.Row verticalAlign='middle' className='_row'>
                <Grid.Column width={3}>
                  <label>CMSS Id</label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Input placeholder='CMSS Id'
                    name='cmssID' value={cmssID}
                    fluid
                    onChange={this.handleChange} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={3}>
                  <label>CMSS Document</label>
                  { 
                    (status === 'FAILURE' && missingCMSSDocument) &&
                    <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                  } 
                </Grid.Column>
                <Grid.Column width={4}>

                  <SecondaryButton
                    compact
                    value='SELECT'
                    onClick={() => cmssDocument.ref.current.click()}
                  />

                  <input type='file' style={{ display: 'none' }} ref={cmssDocument.ref}
                    onChange={this.selectFile} />
                  {
                    cmssDocument.fileName &&
                    <label onClick={this.downloadFile} className='labelBold'>[{cmssDocument.fileName}]</label>
                  }
                </Grid.Column>
              </Grid.Row>
              <a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
              <Grid.Row verticalAlign='middle' className='_row'>
                <Grid.Column width={3}>
                  <label>Customer Sign Date</label>
                  {
                    (status === 'FAILURE' && missingCustomerSignDate) &&
                    <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                  }
                </Grid.Column>
                <Grid.Column width={5}>
                  <DatePicker
                    utcOffset={utcOffset}
                    name='customerSignDate'
                    maxDate={moment()}
                    selected={customerSignDate}
                    onSelect={(customerSignDate) => this.setState({ customerSignDate })}
                    dateFormat="DD/MM/YYYY"
                    placeholderText="DD/MM/YYYY" />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row verticalAlign='middle' className='_row'>
                <Grid.Column width={10}>
                  <Checkbox
                    name='tnc'
                    checked={tnc}
                    label={<label style={{ fontSize: 12 }}>Yes. I agree to the Terms and Conditions as stated under this contract</label>}
                    onChange={this.handleChange}
                  />
                  {
                    (status === 'FAILURE' && missingTNC) &&
                    <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                  }
                </Grid.Column>
              </Grid.Row>


            </Grid>
          </Form>
          {
            (status === 'FAILURE') &&
            <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
              onDismiss={() => this.setState({ validationResult: {} })}>
              <Message.Header>We have encounted some errors.</Message.Header>
              <p>{message}</p>
            </Message>
          }
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
    brn: state.order.data.brn,
    orderCategory: state.order.data.orderCategory,
    selectedVSN: state.order.data.selectedVSN,
    companyName: state.order.data.brnInfo.portalCustInfo.companyName,
    dealerCode: state.user.data.dealerCode,
    dealerName: state.user.data.dealerName,
    dealerRemarks: state.order.data.dealerRemarks,
    accountManagerCode: state.order.data.accountManagerCode,
    salesmanCode: state.order.data.salesmanCode,
    appleDepId:state.order.data.appleDepId,
    salesmanName: state.order.data.salesmanName,
    supportingCenter: state.order.data.supportingCenter,
    cmssID: state.order.data.cmssID,
    cmssFileName: state.order.data.cmssFileName,
    cmssRegId: state.order.data.cmssRegId,
    customerSignDate: state.order.data.customerSignDate,
    tnc: state.order.data.checkboxValue,
    suptCenter: state.configuration.data.suppcenterList,
    accMgrCenter: state.configuration.data.accMngrList,
    documentRegId: state.configuration.data.uploadedDocDetails.documentRegId,
    tempDocumentDesc: state.configuration.data.uploadedDocDetails.tempDocumentDesc,
    user: state.user.data,
    bundleType: state.order.data.bundleType,
    //final order
    order: state.order.data,
    SEND_FILE_STATUS: state.configuration.meta.SEND_FILE_STATUS,
    SET_SUBMISSION_INFO_STATUS: state.order.meta.SET_SUBMISSION_INFO_STATUS,
    SET_ORDER_SUBMISSION_STATUS: state.order.meta.SET_ORDER_SUBMISSION_STATUS,
    regDoc: state.configuration.data.regDoc,
    GET_UPLOADED_FILE_STATUS: state.configuration.meta.GET_UPLOADED_FILE_STATUS,
    isContractDurationGrtrFourMonths:state.order.data.isContractDurationGrtrFourMonths,
    isZerolutionRTF: state.order.data.isZerolutionRTF
  }
}
const mapDispatchToProps = {
  setSubmissionInfo,
  sendFile,
  getUploadedFile,
  postOrderData,
  setSubmissionInfoPrevious
}

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
