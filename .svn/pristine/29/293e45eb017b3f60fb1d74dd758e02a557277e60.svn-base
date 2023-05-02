import React, { Component } from 'react';
import { Grid, Segment, Container, Icon, Form, Message, Button, Table, Radio, Input, Checkbox, TextArea } from "semantic-ui-react";
import { connect } from 'react-redux';
import { PleaseWait } from '../../components/common/dimmer';
import { PrimaryButton, SecondaryButton } from '../../components/common/buttons';
import Attachments from '../../components/company-information/attachments';
import { CSVLink, CSVReader } from 'react-csv';
import {
    submitBulkOrders
} from '../../redux/actions/order';
import { sendFile ,getTemplateFileForBulkSim} from '../../redux/actions/configuration';

const UploadBulk = ({ attachment, selectFile, downloadFile, uploadedDocDetails,inputKey }) => {
    console.log("attachment.fileName --", uploadedDocDetails , attachment);
    
    return (
        <Grid.Row style={{ paddingBottom: 10, paddingTop: 0, paddingLeft: 0 }} >
            <Grid.Column width={2}>
                <label>
                    <SecondaryButton
                        compact
                        value='SELECT'
                        onClick={() => { attachment.ref.current.click() }} />
                    <input
                        type='file' style={{ display: 'none' }}
                        ref={attachment.ref}
                        onChange={(e) => { selectFile(attachment, e.target.files[0], 'uploadBulk') }}
                        key={inputKey} />
                </label>
                {uploadedDocDetails != '' && <label>
                    {uploadedDocDetails.tempfileName}
                </label>}
            </Grid.Column>
        </Grid.Row>
    )

}

const UploadCSVBulk = ({ attachment, selectFile, downloadFile, uploadedCSVDocDetails,inputKey }) => {
    console.log("attachment.fileName --", uploadedCSVDocDetails, attachment);

    return (
        <Grid.Row style={{ paddingBottom: 10, paddingTop: 0, paddingLeft: 0 }} >
            <Grid.Column width={2}>
                <label>
                    <SecondaryButton
                        compact
                        value='SELECT'
                        onClick={() => { attachment.ref.current.click() }} />
                    <input
                        type='file' style={{ display: 'none' }}
                        ref={attachment.ref}
                        onChange={(e) => { selectFile(attachment, e.target.files[0], 'uploadCSVBulk') }}
                        key={inputKey} />
                </label>
                {uploadedCSVDocDetails != '' && <label>
                    {uploadedCSVDocDetails.tempfileName}
                </label>}
            </Grid.Column>
        </Grid.Row>
    )

}


class BulkSimSubmission extends Component {
    constructor(props) {
        super(props);
        //const {url} = this.props.match;
        this.state = {
            dealerName: '',
            dealerCode: '',
            dealerRemarks: '',
            showDimmer: false,
            showerror: false,
            message: 'Missing required attributes.',
            downloadedFile: {
                ref: React.createRef(),
                url: null,
                fileName: null
            },
            documentUploadItems: { ref: React.createRef() },
            documentCSVUploadItems: { ref: React.createRef() } ,
            //fileupload
            file: null,
            image: '',
            newFile: '',
            imagePreview: '',
            uploadedDocDetails: '',
            uploadedCSVDocDetails: '',
            uploadCSVBulkClicked: false,
            uploadBulkClicked: false,
            submitBulkOrderMessage: props.submitBulkOrderMessage,
            orderSubmitted: false,
            inputKey:Date.now()
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    reset = () => {
        this.setState({
            dealerRemarks: '',
            uploadedDocDetails: '',
            uploadedCSVDocDetails: '',
            inputKey:Date.now()
        });
    }
    previous = () => {
		this.props.history.goBack();
	}

    componentDidMount() {
        //this.props.getTemplateFileForBulkSim()
        // this.setState({ documentUploadItems: { ref: React.createRef() } });
        // this.setState({ documentCSVUploadItems: { ref: React.createRef() } });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ showDimmer: true });

        // if (this.props.GET_TEMPLATE_STATUS !== 'SUCCESS' &&
        //     nextProps.GET_TEMPLATE_STATUS === 'SUCCESS') {
        //     this.setState({ showDimmer: false });
        //     const url = window.URL.createObjectURL(new Blob([nextProps.bulkOrdersTemplate]));
        //     // this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } },
        //     //      () => this.state.downloadedFile.ref.current.click());
        // }
        if (this.props.SEND_FILE_STATUS !== 'SUCCESS' &&
            nextProps.SEND_FILE_STATUS === 'SUCCESS') {
            console.log('uploadedDocDetails', nextProps.uploadedDocDetails);
            if (this.state.uploadBulkClicked) {
                this.setState({
                    showDimmer: false, uploadedDocDetails: {
                        ...nextProps.uploadedDocDetails,
                        tempDocumentDesc: 'uploadedDoc'
                    }, uploadBulkClicked: false
                });
            }
            else if (this.state.uploadCSVBulkClicked) {
                this.setState({
                    showDimmer: false, uploadedCSVDocDetails: {
                        ...nextProps.uploadedDocDetails,
                        tempDocumentDesc: 'uploadedCSVDoc'
                    }, uploadCSVBulkClicked: false
                });
            }

        }
        if (this.props.SUBMIT_BULK_ORDER_STATUS !== 'FAILED' &&
            nextProps.SUBMIT_BULK_ORDER_STATUS === 'FAILED') {
            this.setState({ showDimmer: false, showerror: true, message: nextProps.submitBulkOrderMessage });
        }
        if (this.props.SUBMIT_BULK_ORDER_STATUS !== 'SUCCESS' &&
            nextProps.SUBMIT_BULK_ORDER_STATUS === 'SUCCESS') {
            this.setState({ showDimmer: false, message: 'Order has been successfully created with Bulk Reg Id: ' + nextProps.submitBulkOrderMessage, orderSubmitted: true, showerror: false });
        }

        if (this.props.GET_TEMPLATE_BULKSIM_STATUS !== 'SUCCESS' &&
        nextProps.GET_TEMPLATE_BULKSIM_STATUS === 'SUCCESS') {
        const url = window.URL.createObjectURL(new Blob([nextProps.downloadFileBulkSim]))
        let a = document.createElement('a');
        a.href = url;
        a.download = 'BulkSim.xlsm';
        a.click();
        this.setState({showDimmer: false});
       // this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } }, () => this.state.downloadedFile.ref.current.click());

    }
    }
    selectFile(selectedItems, file, name) {
        if (file !== undefined && file !== null) {
            if (file.name !== null && file.name !== undefined && file.name.length > 30) {
                this.setState({ showerror: true, message: 'File name cannot be greater than 30 characters' });
                return;
            }
            if (file.size !== null && file.size !== undefined && file.size > 5242880) {
                this.setState({ showerror: true, message: 'File size cannot be greater than 5 MB' });
                return;
            }
            this.setState({ showFileDimmer: true });
            const { documentUploadItems } = this.state;
            let data = new FormData()
            data.append('file', file)
            data.append('fileName', file.name)
            data.append('filesize', file.size)
            if (selectedItems.regId !== 0 && selectedItems.regId !== 1) {
                data.append('tempUploadRegId', selectedItems.regId)
            }
            else {
                data.append('tempUploadRegId', null)
            }
            data.append('documentdesc', null)
            data.append('documentCode', null)
            data.append('documentSourceInd', null)
            data.append('documentType', null)
            data.append('sNo', '6')
            if (name === 'uploadBulk') {
                this.setState({ uploadBulkClicked: true });
            } else if (name === 'uploadCSVBulk') {
                this.setState({ uploadCSVBulkClicked: true });
            }
            this.setState({
                documentUploadItems: {
                    ...this.state.documentUploadItems,
                    fileName: file.name,
                    file: file
                }
            });
            this.props.sendFile(data);
        }
    }

    downloadFile(attachment) {
        let docAlreadyExists = 'No'
        let { downloadedFile } = this.state
        let newDownloadedFile = {
            ...downloadedFile,
            fileName: attachment.fileName
        }
        this.setState({ downloadedFile: newDownloadedFile })
    }

    submit = () => {
        let data = {
            dealerRemarks: this.state.dealerRemarks,
            dealerCode: this.props.user.dealerCode,
            dealerName: this.props.user.dealerName,
            bulkRegType: 'SIM Replacement',
            createdBy: this.props.user.userId,
            uploadedDocDetails: this.state.uploadedDocDetails,
            uploadedCSVDocDetails: this.state.uploadedCSVDocDetails
        }

        if (this.state.uploadedCSVDocDetails === '') {
            this.setState({ showerror: true, message: ' Please select a CSV file to upload ' });
            return;

        } else if (this.state.uploadedDocDetails === '') {
            this.setState({ showerror: true, message: ' Please select a document to upload' });
            return;
        } else if (!this.state.uploadedCSVDocDetails.tempfileName.includes('.csv')) {
            this.setState({ showerror: true, message: ' Please select file in csv Format only' });
            return;
        }
        else if (this.state.dealerRemarks === '') {
            this.setState({ showerror: true, message: ' Please enter dealer remarks ' });
            return;
        }
        this.props.submitBulkOrders(data);
    }

    downloadFileItem() {
	   this.props.getTemplateFileForBulkSim()
		
	}



    render() {
        let {
            orderSubmitted, brn, showDimmer, dealerName, dealerCode, dealerRemarks, documentUploadItems, documentCSVUploadItems, showerror, message, uploadedDocDetails, uploadedCSVDocDetails,inputKey
        } = this.state;
        let { mode } = this.props;
        // const csvData = [];
        //const csvHeader = ["MSISDN ", "New Sim No", "SIM Type", "SIM Replacement Reason", "Suspend Upon Fulfillment"];
        //const csvData = [["(6019xxxxxx)", "(8960010308284xxxxxx)", ["(Normal Sim / Micro Sim / Nano Sim / eSIM)"], "(Personal/Customer Request or Lost/Stolen/Damaged Handset/Card or Replacement)", "(Y/N)"]];
       console.log('download',this.props.downloadFileBulkSim)
        return (
            <Container fluid className='main-container'>
                <PleaseWait active={showDimmer} />
                <Segment basic style={{ padding: 0, paddingTop: 15 }}>
                    <Form size='small'>
                        <Grid style={{ paddingLeft: 10 }}>
                            <Grid.Row style={{ padding: 0, paddingTop: 10 }}>
                                {
                                    (showerror) &&
                                    <Message negative compact size='small' style={{ minWidth: 400, marginLeft: 20 }}
                                        onDismiss={() => this.setState({ showerror: false })}>
                                        <Message.Header>We have encounted an error.</Message.Header>
                                        <p>{message}</p>
                                    </Message>
                                }
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 0, paddingLeft: 10 }}>
                                {
                                    (orderSubmitted) &&
                                    <Message color='green' compact size='small' style={{ minWidth: 400, marginLeft: 20 }}
                                        onDismiss={() => this.setState({ orderSubmitted: '' })}>
                                        <p><b>{message}</b></p>
                                    </Message>
                                }
                            </Grid.Row>
                            <Grid.Row style={{ paddingBottom: 0, paddingLeft: 0, paddingTop: 20 }}>
                                <Grid.Column >
                                    <label className='pagetitle'> SIM Replacement </label>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ paddingBottom: 0 }}>
                                <Grid.Column width='8' >
                                    <label className='ui-widget-header'>SIM Replacement Request</label>
                                </Grid.Column>
                                <Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ paddingBottom: 0 }}>
                                <Grid.Column width='8' >
                                    <label className='title'> Please provide the SIM Details</label>
                                </Grid.Column>
                                <Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 10 }}>
                                <Grid.Column width={3}>
                                    <label className='heading' width="10%" height="10"> <font color="red">*</font> Upload File </label>
                                </Grid.Column>
                                <UploadCSVBulk attachment={documentCSVUploadItems} selectFile={this.selectFile.bind(this)} downloadFile={this.downloadFile.bind(this)} showerror={showerror} uploadedCSVDocDetails={uploadedCSVDocDetails} inputKey={inputKey}/>
                                <a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 0 }}>
                                <Grid.Column width={6}>
                                    {/* <CSVLink
                                        data={csvData}
                                        headers={csvHeader}
                                        filename="sampleorder.csv" >Download Template by clicking on this URL</CSVLink> */}
                                   <a href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref} onClick={() => this.downloadFileItem()} >Download Template by clicking on this URL</a>     
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={3}>
                                    <label className='heading' width="10%" height="10"> <font color="red">*</font> Upload Document </label>
                                </Grid.Column>
                                <UploadBulk attachment={documentUploadItems} selectFile={this.selectFile.bind(this)} downloadFile={this.downloadFile.bind(this)} showerror={showerror} uploadedDocDetails={uploadedDocDetails} inputKey={inputKey}/>
                                <a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
                            </Grid.Row>

                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={6}>
                                    <label className='heading' width="10%" height="10"> <font color="red">*</font>Dealer Remarks </label>
                                    <TextArea
                                        name='dealerRemarks'
                                        placeholder='Dealer Remarks' cols="35" rows="5"
                                        value={dealerRemarks}
                                        onChange={this.handleChange}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={6}>
                                    <label className='heading' width="10%" height="10">Dealer Code</label>
                                    <Input placeholder='Dealer Code' fluid name="dealerCode" value={this.props.user.dealerCode} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={6}>
                                    <label className='heading' width="10%" height="10">Dealer Staff Name </label>
                                    <Input placeholder='Dealer Staff Name' fluid name="dealerName" value={this.props.user.dealerName} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, paddingTop: 15, paddingBottom: 0 }}>
                                <Grid.Column width={6}>
                                    <label className='heading' width="10%" height="10"> Note:For Bulk MISM SIM Replacement, please place the order via MISC channel. Business hours operating hours is from 9.00am to 6.00pm (Mon to Fri)</label>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row style={{ padding: 0, paddingTop: 15 }}>
                                <Grid.Column width={6}>

                                    <SecondaryButton value='Back' name='Back' onClick={this.previous} > </SecondaryButton>
                                    <SecondaryButton value='Submit' name='Submit' onClick={() => this.submit()} disabled={orderSubmitted}> </SecondaryButton>
                                    <SecondaryButton value='Reset' name='Reset' onClick={() => this.reset()} disabled={orderSubmitted}> </SecondaryButton>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Form>
                </Segment>
            </Container>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        mode: 'bulk',
        bulkOrdersTemplate: state.configuration.data.bulkOrderTemplate,
        // dealerCode: state.user.data.dealerCode,
        user: state.user.data,
        uploadedDocDetails: state.configuration.data.uploadedDocDetails,
        //documentUploadItems: state.order.data.brnInfo.documentUploadItems,
        SEND_FILE_STATUS: state.configuration.meta.SEND_FILE_STATUS,
        GET_UPLOADED_FILE_STATUS: state.configuration.meta.GET_UPLOADED_FILE_STATUS,
        SUBMIT_BULK_ORDER_STATUS: state.order.meta.SUBMIT_BULK_ORDER_STATUS,
        submitBulkOrderMessage: state.order.data.submitBulkOrderMessage,
        downloadFileBulkSim: state.configuration.data.downloadFileBulkSim,
        GET_TEMPLATE_BULKSIM_STATUS: state.configuration.meta.GET_TEMPLATE_BULKSIM_STATUS
    }
}
const mapDispatchToProps = {
    submitBulkOrders,
    sendFile,
    getTemplateFileForBulkSim
}
export default connect(mapStateToProps, mapDispatchToProps)(BulkSimSubmission);