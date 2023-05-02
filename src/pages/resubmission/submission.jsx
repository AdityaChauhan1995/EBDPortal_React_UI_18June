import React, { Component } from 'react';
import {
  Grid, Segment, Container, Form, Input, Icon,
  Dropdown, Message, Checkbox
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Navigation from '../../components/header/navigation';
import { StaticBlock5,StaticBlock8 } from '../../components/common/dumb-component';
import {sendFile,getUploadedFile} from '../../redux/actions/configuration';
import { setSubmissionInfo,postResubOrderData, erfPostResubOrderData,setSubmissionInfoPrevious ,obsPostResubOrderData} from '../../redux/actions/order';
import { PleaseWait, FileUploadWait } from '../../components/common/dimmer';
import '../../Index.css';
import { validateSubmissionInfo } from '../../helpers/submission-helper';
import moment from 'moment';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';

class Submission extends Component {

  constructor(props) {
    super(props);
    const { url } = this.props.match;
    this.state = {

      nextUrl: url.substring(0, url.lastIndexOf("/")) + "/order-submitted",
      accountManagerCode:parseInt(props.accountManagerCode) ,
      checkboxValue: false,
      supportingCenter: props.supportingCenter,
      salesmanCode: null,
      salesmanCode: null,
      cmssRegIdvalue: null,
      customerSignDate: null,
      dealerRemarks: null,
      appleDepId: null,
      navBars: [
        { name: 'Registration Type', active: false },
        { name: 'Company Information', active: false },
        { name: 'Address Contact Details', active: false },
        { name: 'Product Order', active: false },
        { name: 'Device Fund', active: false },
        { name: 'Order Submission', active: true }],
      validationResult: {
        status: 'SUCCESS',
        message: '',
      },
      cmssDocument: {
        ref: React.createRef(),
        url: null,
        fileName: props.cmssFileName,
        cmssRegId: props.cmssRegId,
      },
      downloadedFile: {
        ref: React.createRef(),
        url: null,
        fileName: null
      },
      showDimmer: false,
      showFileDimmer: false,
      flagNewFile: false,
      cmssDocumentExisting:props.cmssDocumentExisting,
      initialResubmissionChange:props.initialResubmissionChange
    };
  }

  dateChange = (date) => {

    this.setState({
      customerSignDate: date,
    });

  }
  componentDidMount() {
    if(this.state.initialResubmissionChange === false){
      this.setState({
        
        customerSignDate: this.props.registrationDetails.custSignDate ? moment(this.props.registrationDetails.custSignDate, "DD/MM/YYYY") : moment(),
        salesmanCode: this.props.registrationDetails.salesmanCode,
        salesmanName: this.props.registrationDetails.salesmanName,
        dealerRemarks: this.props.registrationDetails.dealerRemarks,
        checkboxValue: this.props.tnc,
        cmssRegIdvalue: this.props.registrationDetails.cmssNo,
        accountManagerCode: parseInt(this.props.registrationDetails.acctMgrId),
        supportingCenter:this.props.registrationDetails.maxisCenter,
        appleDepId: this.props.registrationDetails.appleDepId
        })

        if(this.props.cmssDocumentExisting !== undefined && this.props.cmssDocumentExisting !== null){
          this.setState({
          cmssDocument: {
          ...this.state.cmssDocument,
          fileName: this.props.cmssDocumentExisting.fileName,
          cmssRegId: this.props.cmssDocumentExisting.regId }
                        })
        }
    }else{
      console.log('hi');
        this.setState({
          cmssDocument: {
            ...this.state.cmssDocument,
            fileName: this.props.cmssFileName,
            cmssRegId: this.props.cmssRegId
          },
          customerSignDate: this.props.custSignDate ? moment(this.props.registrationDetails.custSignDate, "DD/MM/YYYY") : moment(),
          salesmanCode: this.props.salesmanCode,
          salesmanName: this.props.salesmanName,
          dealerRemarks: this.props.dealerRemarks,
          checkboxValue: this.props.tnc,
          cmssRegIdvalue: this.props.cmssRegIdvalue,
          accountManagerCode: parseInt(this.props.accountManagerCode),
          supportingCenter:this.props.supportingCenter,
          appleDepId: this.props.appleDepId
          })


    }
    
    
  }
  toggleCheckboxValue = () => {
    this.setState({ checkboxValue: !this.state.checkboxValue });
  }

  submit = () => {

    let { dealerRemarks,  salesmanCode, supportingCenter,
      customerSignDate, checkboxValue,accountManagerCode,cmssRegIdvalue,cmssDocument,appleDepId } = this.state;
    let { cmssID, cmssFileName, cmssRegId,isContractDurationGrtrFourMonths,bundleType} = this.props;
    let validationResult = validateSubmissionInfo(dealerRemarks, supportingCenter,customerSignDate,
       accountManagerCode, checkboxValue,cmssDocument,isContractDurationGrtrFourMonths,bundleType);
      console.log(dealerRemarks, accountManagerCode, salesmanCode, salesmanCode, supportingCenter,
        cmssID, cmssFileName, cmssRegId, moment(customerSignDate, "DD/MM/YYYY"), checkboxValue);
    if (validationResult.status === 'FAILURE') {
      // cant proceed, show errors

      this.setState({ validationResult: validationResult });
    } else {
      // proceed
      this.props.setSubmissionInfo(
        dealerRemarks, accountManagerCode, salesmanCode, salesmanCode, supportingCenter,
        cmssRegIdvalue, cmssFileName, cmssRegId, customerSignDate.format("DD/MM/YYYY"), checkboxValue, this.props.user,appleDepId);
    }
  }




  // selectFile(selectedItems, file) {

  //   let mandatoryfile = false;
  //   if (selectedItems.compulsoryInd) {
  //     mandatoryfile = true;
  //     this.setState({ isMandatoryFileUploaded: mandatoryfile })
  //   }
  //   const { documentUploadItems } = this.state;
  //   let data = new FormData()
  //   data.set('file', file)
  //   data.set('fileName', file.name)
  //   data.set('filesize', file.size)
  //   if (selectedItems.regId !== 0 && selectedItems.regId !== 1) {
  //     data.set('tempUploadRegId', selectedItems.regId)
  //   }
  //   else {
  //     data.set('tempUploadRegId', null)
  //   }
  //   data.set('documentdesc', selectedItems.documentDesc)
  //   data.set('documentCode', selectedItems.documentCode)
  //   data.set('documentSourceInd', selectedItems.sourceInd)
  //   data.set('documentType', selectedItems.documentType)
  //   data.set('sNo', selectedItems.sNo)
  //   this.props.sendFile(data);
  //   this.setState({
  //     documentUploadItems: documentUploadItems.map(item => {
  //       if (item.regId === selectedItems.regId) {
  //         return {
  //           ...item,
  //           fileName: file.name,
  //           file: file
  //         }
  //       }

  //       return item
  //     })
  //   });

  // }

  selectFile = (e) => {
    this.setState({ showFileDimmer: true });

    let data = new FormData();
    let file = e.target.files[0];
    if (file !== undefined) {
      data.append('file', file)
      data.append('fileName', file.name)
      data.append('filesize', file.size)
      if(this.state.cmssDocument.cmssRegId === parseInt(this.props.easMasterRegId)){
        data.append('tempUploadRegId', null)
      }else{
        data.append('tempUploadRegId', this.state.cmssDocument.cmssRegId);
      }
      
      data.append('documentdesc', "CMSS Document");
      data.append('documentCode', "1108");
      data.append('documentSourceInd', "EBD");
      data.append('documentType', "BC");
      data.append('sNo', "4");

      this.props.sendFile(data);
    }

  }

  downloadFile = () => {
    if (this.state.flagNewFile === false) {

      let { downloadedFile } = this.state
      let newDownloadedFile = {
        ...downloadedFile,
        fileName: this.state.cmssDocument.fileName
      }
      this.setState({ downloadedFile: newDownloadedFile })
      let {sNo, documentCode, regId} = this.props.cmssDocumentExisting
      this.props.getUploadedFile(regId, sNo, documentCode, 'Yes');
    }
    // download uploaded file
    if (this.state.flagNewFile === true) {
      this.setState({
        downloadedFile: {
          ...this.state.downloadedFile,
          fileName: this.state.cmssDocument.fileName,
        }
      },
      );
      const { cmssRegId } = this.state.cmssDocument;
      this.props.getUploadedFile(cmssRegId, "4", "1108", "No")
    }

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.SEND_FILE_STATUS !== 'SUCCESS' &&
      nextProps.SEND_FILE_STATUS === 'SUCCESS') {
      this.setState({
        cmssDocument: {
          ...this.state.cmssDocument,
          cmssRegId: nextProps.uploadedDocDetails.documentRegId,
          fileName: nextProps.uploadedDocDetails.tempfileName

        },
        flagNewFile: true,

        showFileDimmer: false,
      })

    }

   else if (this.props.SET_SUBMISSION_INFO_STATUS !== 'SUCCESS' &&
      nextProps.SET_SUBMISSION_INFO_STATUS === 'SUCCESS') {
      // submit order
      this.setState({ showDimmer: true });
      console.log("heyy",this.props.order.easMasterRegId,nextProps.order.easMasterRegId)
      console.log(JSON.stringify(nextProps.order));
      if(this.props.registrationDetails.groupName === 'MAXIS'){
           this.props.erfPostResubOrderData(nextProps.order);
        }else if(this.props.registrationDetails.groupName === 'Business Postpaid with Fibre Option')
 {
          this.props.obsPostResubOrderData(nextProps.order);
        }
        else{
      this.props.postResubOrderData(nextProps.order);
   	 }
      }
   else if (this.props.SET_RESUBMISSION_ORDER_SUBMISSION_STATUS !== 'SUCCESS' &&
      nextProps.SET_RESUBMISSION_ORDER_SUBMISSION_STATUS === 'SUCCESS') {
      // order submitted
      this.setState({ showDimmer: false });
      this.props.history.push(this.state.nextUrl);
      // this.props.history.push(this.state.nextUrl);
    }
  else  if (this.props.SET_RESUBMISSION_ORDER_SUBMISSION_STATUS !== 'FAILED' &&
      nextProps.SET_RESUBMISSION_ORDER_SUBMISSION_STATUS === 'FAILED') {
      this.setState({ showDimmer: false });
      this.props.history.push(this.state.nextUrl);
    }
   else if (this.props.GET_UPLOADED_FILE_STATUS !== 'SUCCESS' &&
      nextProps.GET_UPLOADED_FILE_STATUS === 'SUCCESS') {
      const url = window.URL.createObjectURL(new Blob([nextProps.regDoc]))

      this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } }, () => this.state.downloadedFile.ref.current.click());

    }
  }

  handleChange = (e, { name, value }) => {

      this.setState({ [name]: value });
    

  }
  previous=()=>{
    let { dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
      cmssRegIdvalue, cmssDocument, customerSignDate, tnc, appleDepId  } = this.state;
      console.log( dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
        cmssRegIdvalue, cmssDocument.fileName, cmssDocument.cmssRegId, customerSignDate.format("DD/MM/YYYY"), tnc, this.props.user);
    this.props.setSubmissionInfoPrevious(
      dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
      cmssRegIdvalue, cmssDocument.fileName, cmssDocument.cmssRegId, customerSignDate.format("DD/MM/YYYY"), tnc, this.props.user,appleDepId);
		this.props.history.goBack();
	}

  render() {


    let {cmssDocument, navBars, showDimmer, checkboxValue, showFileDimmer, dealerRemarks, customerSignDate, 
          cmssRegIdvalue,accountManagerCode,supportingCenter,salesmanCode,salesmanName,cmssRegId,appleDepId} = this.state
    
    
    const utcOffset = 0;

    let {companyName,
      suptCenter, accMgrCenter,brnInfo
    } = this.props
    let { custBrnNo, masterRegStatus, contactMode, masterRegId, virtualServiceNo, easPackageName, totalMembers, totalMemberString,
      maxLineCount, prodCatName, dealerName, dealerCode, supportingCenterName,groupName} = this.props.registrationDetails;
    let { status, message, missingDealerRemarks, missingSupportingCtr,
      missingCustomerSignDate, missingAccountMgr, missingTNC,missingCMSSDocument} = this.state.validationResult;
    return (

      <Container fluid className='main-container'>
        <Navigation values={navBars} group={groupName} index={6}/>

        <Form size='small'>
          <Grid style={{ padding: 25 }}>

          {groupName!='MAXIS' &&
          <StaticBlock5
            custBrnNo={custBrnNo}
            companyName={brnInfo.portalCustInfo.companyName}
            masterRegId={masterRegId}
             virtualServiceNo={virtualServiceNo}
             easPackageName={easPackageName}
             totalMembers={totalMembers}
             totalMemberString={totalMemberString}
             maxLineCount={maxLineCount}
             contactMode={contactMode}
             masterRegStatus={masterRegStatus}
             prodCatName={prodCatName} />
           }
           {groupName==='MAXIS' &&
           <StaticBlock8
             custBrnNo={custBrnNo}
             companyName={brnInfo.portalCustInfo.companyName}
             masterRegId={masterRegId}
              masterRegStatus={masterRegStatus}
              prodCatName={prodCatName} />
            }


            <Grid.Row style={{ paddingTop: 30 }}>
              <Grid.Column  >

                <Grid >
                  <Grid.Row>
                    <Grid.Column width={3} style={{ paddingLeft: 0, paddingBottm: 0 }}>
                      <Form.Field inline>
                        <label className="label_DealerRemarks"  >
                          Dealer Remarks
               </label>
                        {
                          (status === 'FAILURE' && missingDealerRemarks) &&
                          <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                        }
                      </Form.Field>
                    </Grid.Column>

                    <Grid.Column width={5}>
                      <Input name='dealerRemarks' placeholder='Dealer Remarks'
                        maxLength="500" fluid
                        onChange={(evt) => { this.setState({ dealerRemarks: evt.target.value }) } } value={dealerRemarks} />
                    </Grid.Column>
                  </Grid.Row>
                  { (this.props.user.userRole==='ECO' || this.props.user.userRole==='SMERovingSupport' || this.props.user.userRole==='SMEAdmin' ) && (
                  <Grid.Row>
                    <Grid.Column width={3} style={{ paddingLeft: 0, paddingBottm: 0 }}>
                      <Form.Field>
                        <label >Account Manager</label>
                        {
                          (status === 'FAILURE' && missingAccountMgr) &&
                          <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                        }
                      </Form.Field>
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
                </Grid>
                
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column width={3} style={{ paddingLeft: 0, paddingBottm: 0 }}>
                      <Form.Field>
                        <label className="label_DealerCode" >
                          Dealer Code
              </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <label className="label_DealerCodeValue">
                        {dealerCode}
                      </label>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={3}>
                      <Form.Field>
                        <label className="label_DealerName" >
                          Dealer Name
              </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <label className="label_DealerNameValue">
                        {dealerName}
                      </label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={5}>
                  <Grid.Row>
                    <Grid.Column width={3} style={{ paddingLeft: 0, paddingBottm: 0 }}>
                      <Form.Field>
                        <label className="label_SalesmanCode">
                          Salesman Code
              </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Input placeholder='Salesman Code' fluid onChange={(evt) => this.setState({ salesmanCode: evt.target.value })}
                      value ={salesmanCode} />
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={3}>
                      <Form.Field>
                        <label className="label_SalesmanName" >
                          Salesman Name
              </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Input placeholder='Salesman Name' fluid onChange={(evt) => this.setState({ salesmanName: evt.target.value })} 
                      value={salesmanName}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid >
                  <Grid.Row>
                    <Grid.Column width={3} style={{ paddingLeft: 0, paddingBottm: 0 }}>
                      <Form.Field inline>
                        <label className="label_SupportingCenter">
                          Supporting Center
              </label>
                        {
                          (status === 'FAILURE' && missingSupportingCtr) &&
                          <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                        }
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Dropdown placeholder='Supporting Center' 
                        name='supportingCenter'
                        search selection 
                        options={suptCenter}
                        onChange={this.handleChange}
                        value={supportingCenter}  
                        fluid />
                    </Grid.Column>
                    <Grid.Column />
                    {!this.props.isZerolutionRTF &&
                     <React.Fragment>
                    <Grid.Column width={3}>
                      <Form.Field>
                        <label className="label_AppleDEPId" >
                          Apple DEP Id
                      </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Input placeholder='Apple DEP Id' name = 'appleDepId' fluid onChange={(evt) => this.setState({ appleDepId: evt.target.value })} 
                      value={appleDepId}/>
                    </Grid.Column>
                    </React.Fragment>
                    }
                  </Grid.Row>
                </Grid>
                <Grid columns={5}>
                  <Grid.Row>
                    <Grid.Column width={3} style={{ paddingLeft: 0, paddingBottm: 0 }}>
                      <Form.Field>
                        <label className="label_CMSSId" >
                          CMSS Id
              </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Input placeholder='CMSS Id' fluid value={cmssRegIdvalue}  onChange={(evt) => {
                        this.setState({
                          cmssRegIdvalue: evt.target.value
                        })
                      }  } />
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={3} >
                      <Form.Field inline>
                        <label className="label_CMSSDocument" >
                          CMSS Document
              </label>
                  { 
                    (status === 'FAILURE' && missingCMSSDocument) &&
                    <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                  }
                      </Form.Field> 
                    </Grid.Column>
                    <Grid.Column width={4} >
                    
                      <Form.Field inline style={{ position: 'relative' }}>

                        <SecondaryButton
                          compact
                          value='SELECT'
                          onClick={() => cmssDocument.ref.current.click()}
                          />

                        <input type='file' style={{ display: 'none' }} ref={cmssDocument.ref}
                          onChange={this.selectFile} />
                        {
                          cmssDocument.fileName &&
                          <label onClick={this.downloadFile.bind(this)} className='labelBold'>[{cmssDocument.fileName}]</label>

                        }
                        <a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
                      </Form.Field >
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid >
                  <Grid.Row>
                    <Grid.Column width={3} style={{ paddingLeft: 0, paddingBottm: 0 }}>
                      <Form.Field inline>
                        <label className="label_CustomerSignDate" >
                          Customer Sign Date
               </label>
                        {
                          (status === 'FAILURE' && missingCustomerSignDate) &&
                          <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                        }
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      {
                        <DatePicker
                          utcOffset={utcOffset}
                          name='customerSignDate'
                          maxDate={moment()}
                          selected={customerSignDate}
                          onSelect={(customerSignDate) => this.setState({ customerSignDate })}
                          dateFormat="DD/MM/YYYY"
                          placeholderText="DD/MM/YYYY" />
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid>
                  <Grid.Row>
                    <Grid.Column style={{ paddingLeft: 0, paddingBottm: 0, marginTop: 10 }}>
                      <Form.Field inline>
                        <Checkbox label='Yes.I agree to the Terms and Conditions as stated under this contract'
                          checked={checkboxValue} onChange={this.toggleCheckboxValue}
                          />
                        {
                          (status === 'FAILURE' && missingTNC) &&
                          <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                        }
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {
            (status === 'FAILURE') &&
            <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
              onDismiss={() => this.setState({ validationResult: {} })}>
              <Message.Header>We have encounted some errors.</Message.Header>
              <p>{message}</p>
            </Message>
          }
        </Form>
        <Segment basic >
          <Grid style={{ padding: 10 }}>
            <Grid.Row style={{ paddingBottom: 0 }}>
              <Grid.Column width={6}>
              </Grid.Column>
              <Grid.Column width={2} style={{ paddingRight: 10 }}>
                <SecondaryButton value='BACK' onClick={this.previous}/>
              </Grid.Column>
              <Grid.Column width={2} >
                <PrimaryButton value='SUBMIT' onClick={this.submit} />
              </Grid.Column>
              <Grid.Column width={6}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <PleaseWait active={showDimmer} />
        <FileUploadWait active={showFileDimmer} />

      </Container>

    );

  }
}
const mapStateToProps = (state) => {
  return {
    custBrnNo: state.order.data.brn,
    orderCategory: state.order.data.orderCategory,
    dealerName: state.order.data.dealerName,
    easMasterRegId: state.order.data.easMasterRegId,
    selectedVSN: state.order.data.selectedVSN,
    registrationDetails: state.order.data.registrationDetails,
    cmssDocumentExisting: state.order.data.registrationDetails.brnInfo.documentUploadItems.find(d => d.documentDesc === 'CMSS Document'),
    GET_UPLOADED_FILE_STATUS: state.configuration.meta.GET_UPLOADED_FILE_STATUS,
    SEND_FILE_STATUS: state.configuration.meta.SEND_FILE_STATUS,
    order: state.order.data,
    companyName: state.order.data.brnInfo.portalCustInfo.companyName,
    brnInfo:state.order.data.brnInfo,
    SET_SUBMISSION_INFO_STATUS: state.order.meta.SET_SUBMISSION_INFO_STATUS,
    SET_RESUBMISSION_ORDER_SUBMISSION_STATUS: state.order.meta.SET_RESUBMISSION_ORDER_SUBMISSION_STATUS,
    regDoc: state.configuration.data.regDoc,
    uploadedDocDetails: state.configuration.data.uploadedDocDetails,
    suptCenter: state.configuration.data.suppcenterList,
    
    cmssID: state.order.data.cmssID,
    cmssFileName: state.order.data.cmssFileName,
    cmssRegId: state.order.data.cmssRegId,
    user: state.user.data,
    accMgrCenter: state.configuration.data.accMngrList,
    initialResubmissionChange:state.order.data.initialResubmissionChange,

    cmssFileName:state.order.data.cmssFileName,
    cmssRegId:state.order.data.v,
    customerSignDate:state.order.data.customerSignDate,
    salesmanCode:state.order.data.salesmanCode,
    salesmanName:state.order.data.salesmanName,
    appleDepId:state.order.data.appleDepId,
    dealerRemarks:state.order.data.dealerRemarks,
    tnc: state.order.data.tnc,
    cmssRegIdvalue:state.order.data.cmssID,
    accountManagerCode:state.order.data.accountManagerCode,
    supportingCenter:state.order.data.supportingCenter,
    bundleType: state.order.data.bundleType,
    isContractDurationGrtrFourMonths:state.order.data.isContractDurationGrtrFourMonths,
    isZerolutionRTF: state.order.data.isZerolutionRTF

  }

}

const mapDispatchToProps = {
  sendFile,
  getUploadedFile,
  setSubmissionInfo,
  postResubOrderData,
  erfPostResubOrderData,
  setSubmissionInfoPrevious,
  obsPostResubOrderData
}
export default connect(mapStateToProps, mapDispatchToProps)(Submission)
