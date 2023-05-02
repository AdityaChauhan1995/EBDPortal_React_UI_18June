import React, { Component } from 'react';
import { Grid,  Message, Button, Modal, Segment, Di,Form, Dropdown,Divider ,Header,Select} from "semantic-ui-react";
import { PrimaryButton } from '../../components/common/buttons';
import { SecondaryButton } from '../../components/common/buttons';
import Attachments from '../../components/company-information/attachments';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PleaseWait } from '../../components/common/dimmer';
import 'react-datepicker/dist/react-datepicker.css';

const deliveryStatus = [
	{ key:0, text:'Delivered',value:'Delivered' }
  ]
var count = 0;

const UpdateDelStatus = ({attachment, selectFile, downloadFile}) => {
	return (
						<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 ,paddingLeft:'100px'}} >
							<Grid.Column width={4} >
								<label style={{fontWeight: 'bold',fontSize: '1em',color:'#293895'}}>Delivery Order:<font color='red'>*</font></label>
							</Grid.Column>
							<Grid.Column width={2}>
								<label>
								<SecondaryButton 
									compact 
									value='SELECT' 
									onClick={() => { attachment.ref.current.click() }} />
									<input type='file' style={{ display: 'none' }}  ref={attachment.ref}  onChange={e=>selectFile(attachment, e.target.files[0])}/>
									</label>
							</Grid.Column>
							<Grid.Column width={2}>
								{
									attachment.fileName && <label className='labelBold' onClick={() => downloadFile(attachment)}>[{attachment.fileName}]</label>
								}
							</Grid.Column>
						</Grid.Row>					
)

}

class UpdateDeliveryStatus extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			lineInfo:[],
			lineTodos:this.props.line===undefined?[]:this.props.line,
			delivery:'',
			deliveryDate: false?moment(new Date(), "DD/MM/YYYY hh:mm a") : moment(),
			maxDates:'',
			minDates:'',
			days:0,
			documentUploadItemsDeliveryOrder: '',
			easmasterRegId:this.props.easmasterRegId,
			regId:this.props.regId,
			downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
				},
			checkedType:'',
			validationResult:{
				status:'',
				message:''
			},
			showDimmer: false,
		}
	}

	componentWillReceiveProps(nextProps)
	{
		//let {lineTodos}= this.state;
		if(nextProps.line !== null && nextProps.line !== undefined && nextProps.line.length > 0)
		{
			for(var i=0;i<nextProps.line.length;i++){
			if(nextProps.line[i].lineDeviceInfo.status.includes('Delivered')){
					this.setState({delivery:'Delivered',days:nextProps.line[i].lineDeviceInfo.noOfDaysForDelivery})
			}
			if((nextProps.line[i].lineDeviceInfo.status==='Pick and Pack' || nextProps.line[i].lineDeviceInfo.status==='Cancelled') && this.state.delivery==='' ){
				this.setState({delivery:''})
				return;
			}		
			}
		}
	}

	show(line) {
		this.setState({ open: true, lineInfo:line,checkedType:'update',documentUploadItemsDeliveryOrder: { ref: React.createRef() }} );
		
	}

	close= () =>{
		this.setState({ open: false ,
			validationResult:{status:'', message:''}});
			this.props.validationResultEdit.status='';
			this.props.validationResultEdit.message='';
	} 
	handleChange = (e, { name, value }) => {
		if(name==='delivery'){
			this.setState({delivery:value})
		}
			this.setState({ [name]: value });

		}

	selectFile(selectedItems, file) {
		//console.log('selectedItems',selectedItems,'file',file);
		let { lineInfo }=this.state;
		if(file.name!==null && file.name!==undefined && file.name.length>30){
			this.setState({showerror:true,message:'File name cannot be greater than 30 characters'});
			return;
		}
		if(file.size!==null && file.size!==undefined && file.size>5242880){
			this.setState({showerror:true,message:'File size cannot be greater than 5 MB'});
			return;
		}
		this.setState({ showFileDimmer: true });
		/*if (selectedItems.compulsory ) {
			this.setState({ showerror: false })
		}*/
		const { documentUploadItemsDeliveryOrder } = this.state;
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
		data.append('documentdesc', selectedItems.documentDesc)
		data.append('documentCode', selectedItems.documentCode)
		data.append('documentSourceInd', selectedItems.sourceInd)
		data.append('documentType', selectedItems.documentType)
		data.append('sNo', selectedItems.sNo)
		this.props.sendFile(data, lineInfo);
		this.setState({
			documentUploadItemsDeliveryOrder:{
				...this.state.documentUploadItemsDeliveryOrder,
				fileName: file.name,
				file: file
			}	
		});
	}

	downloadFile(attachment) {
		let docAlreadyExists = 'No'

		let { downloadedFile } = this.state
		let newDownloadedFile = {
			...downloadedFile,
			fileName: attachment.fileName
		}
		this.setState({ downloadedFile: newDownloadedFile })
		/*this.props.getUploadedFile(item.regId, item.sNo, item.documentCode, docAlreadyExists)*/
	}

	triggerAction = () => {
		let {lineInfo,checkedType,documentUploadItemsDeliveryOrder}= this.state;
		let {validationResultEdit,deviceDelivered}=this.props;
		if(checkedType==='update'){
			validationResultEdit.status='';
			validationResultEdit.message='';
			if(this.props.deviceDelivered===true){
				this.setState({validationResult:{'status':'FAIL', 'message':'Device has already been delivered.'}})	
					return;
			}
			
			for(var i=0;i<lineInfo.length;i++){
				if(lineInfo[i].lineDeviceInfo.imei===null || lineInfo[i].lineDeviceInfo.imei===undefined || lineInfo[i].lineDeviceInfo.imei==='' || lineInfo[i].lineDeviceInfo.imei.length===0){
					this.setState({validationResult:{'status':'FAIL', 'message':'Please update IMEI for MSISDN '+lineInfo[i].mobileInfo.mobileNo}})	
					return;
				}
				if(documentUploadItemsDeliveryOrder.fileName === null ||
					documentUploadItemsDeliveryOrder.fileName === undefined ||
					documentUploadItemsDeliveryOrder.fileName === '')
					{
						this.setState({validationResult:{'status':'FAIL', 'message':'Document is mandatory'}})	
						return;
					}
				if(this.props.line[i].lineDeviceInfo.status ==='Delivered' && this.state.delivery==='Delivered') {
					if(moment(this.state.deliveryDate).isAfter(moment())){
						this.setState({validationResult:{'status':'FAIL', 'message':'Delivery date cannot be future date.'}})	
						return;
					}
					if(moment(this.state.deliveryDate).subtract(this.state.days, 'days').isAfter(moment(this.props.line[i].lineDeviceInfo.deviceDelDate))){
						this.setState({validationResult:{'status':'FAIL', 'message':'New Delivery date cannot be more than 7 working days from current Delivery date'}})	
						return;
					}
					
				}
				if(this.props.line[i].lineDeviceInfo.status !=='Delivered' && this.state.delivery==='Delivered'){
					if(moment(this.state.deliveryDate).isAfter(moment())){
						this.setState({validationResult:{'status':'FAIL', 'message':'Delivery date cannot be future date.'}})	
						return;
					}
					if( moment(this.state.deliveryDate).isBefore(moment(this.props.delaerSearchDetails.regDateApproved))){
						this.setState({validationResult:{'status':'FAIL', 'message':'Delivery date cannot be before Aprroval date.'}})	
						return;
					}
				}
					
				var req =
					{
					 deliveryDate:this.state.deliveryDate,
					 easmasterRegId:this.props.easmasterRegId,
					 tempDocRegId:this.props.tempDocRegId,
					 phoneStatus: this.state.delivery,
					 regId:this.props.regId
				}
				
			}

			this.props.updateDeliveryStatus(req);
		}
}

	render() {
		const { open, dimmer,mode,documentUploadItemsDeliveryOrder,showDimmer } = this.state;	 
		let { status, message  }=this.state.validationResult;
		const DeliveryStatus = () => {
			return (
				<Grid centered columns={2}>
				<PleaseWait active={showDimmer} />
				<Grid.Row>
					<React.Fragment>
					   <Grid.Column width='3' style={{ paddingRight: 0 ,paddingLeft:'100px20px'}}>
					   <label style={{fontWeight: 'bold',fontSize: '1em',color:'#293895'}}>Delivery Status:</label>
					   </Grid.Column>
					   <Grid.Column width='10' style={{ paddingRight: '50px'}}>
							<Form.Field >
								    <Dropdown placeholder='Please select' size='small' 
								              selection options={deliveryStatus}
											  onChange={this.handleChange}
											  value={this.state.delivery}
											  name='delivery' fluid/>
							</Form.Field>
					   </Grid.Column>
					</React.Fragment>
				 </Grid.Row>
				 </Grid>
				 )
			   }

		const DeliveryDate = () => {
			return (
				<Grid centered columns={2}>
				<Grid.Row>
					<React.Fragment>
					   <Grid.Column width='3' style={{ paddingRight: 0 ,paddingLeft:'100px20px'}}>
					   <label style={{fontWeight: 'bold',fontSize: '1em',color:'#293895'}}>Delivery Date:</label>
					   </Grid.Column>
					   <Grid.Column width='10' style={{ paddingRight: 0}}>
						<DatePicker
						    className='myDatePicker'
							selected={this.state.deliveryDate}
							onSelect={(deliveryDate) => this.setState({ deliveryDate })}
							minDate={moment(this.props.delaerSearchDetails.regDateApproved)}
                            //maxDate={moment()}
							//filterDate={this.holidayDisableWeekend}
							dateFormat="DD/MM/YYYY hh:mm a"
							placeholderText="DD/MM/YYYY" 
							name='deliveryDate' />
						   </Grid.Column>
					</React.Fragment>
				 </Grid.Row>
				 </Grid>
				 )
			   }	   

		return (

			<Modal dimmer={dimmer}
				open={open}
				onClose={this.close}
				closeOnEscape={false}
				closeOnRootNodeClick={false} style={{ marginTop: 0 }}>
				<Header size='tiny' content='Update Delivery Status' />
				<Modal.Content >
				
				{
								(status === 'FAIL') &&
								<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
									onDismiss={() => this.setState({ validationResult: {} })}>
									<Message.Header>We have encounted an error.</Message.Header>
									<p>{message}</p>
								</Message>

							}
							{
								(this.props.validationResultEdit.status === 'SUCCESS') &&
								<Message positive compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
									onDismiss={this.props.dismissMessage}>
									<p>{this.props.validationResultEdit.message}</p>
								</Message>

							}
							{
								(this.props.validationResultEdit.status === 'FAILED') &&
								<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
									onDismiss={this.props.dismissMessage}>
									<Message.Header>We have encounted an error.</Message.Header>
									<p>{this.props.validationResultEdit.message}</p>
								</Message>

							}
					<Grid style={{ height: 100  }}>						
                         <DeliveryStatus />			 
					</Grid>
					<Grid style={{ height: 100 }}>						
						 <DeliveryDate />
					</Grid>
					<Segment basic style={{ paddingLeft: '100px', paddingBottom: 10, paddingTop: 15 }}>
						<label className='heading' style={{ fontSize:'1em' }}>Documents Attached</label>
					</Segment>
					<Grid>
                   <UpdateDelStatus attachment={documentUploadItemsDeliveryOrder} selectFile={this.selectFile.bind(this)} downloadFile={this.downloadFile.bind(this)}/>
				   </Grid>
				</Modal.Content>
				<Modal.Actions>
							
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<PrimaryButton value='SAVE' onClick={this.triggerAction} />
					<div style={{ padding: 20 }} />
					<PrimaryButton value='CLOSE' onClick={this.close} />
				</Segment>
				</Modal.Actions>
			</Modal>
		)
	}
}

export default UpdateDeliveryStatus;