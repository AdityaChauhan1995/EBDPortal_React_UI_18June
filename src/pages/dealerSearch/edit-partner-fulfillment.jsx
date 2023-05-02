import React, { Component } from 'react';
import { Grid,  Message, Button, Modal, Segment, Dimmer, Header, Radio, Divider, Form, Input } from "semantic-ui-react";
import { SecondaryButton } from '../../components/common/buttons';
import { PrimaryButton } from '../../components/common/buttons';
import HeaderAction from './edit-trade-partner-fulfillment-header-action';
import EditPartnerFulfillemntBody from './edit-trade-partner-fulfillment-body';
import moment from 'moment';

class EditPartnerFulfillemnt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			headerActionList:[
								{name:'pickPack', label:'Pick and Pack', disabled:false},
								{name:'updateIMEI', label:'Update IMEI/Serial Number', disabled:false},
								{name:'doaPickPack', label:'DOA Pick and Pack', disabled:false},
								{name:'doaComplete', label:'DO Upload for DOA Only', disabled:false}
							],
			checkedType:'',
			documentUploadItemsDealerSearch: '',
			downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
			},
			pickPackIMEI:'',
			validationResult:{
				status:'',
				message:''
			},
			updateIMEI:'',
			updateIMEDOPickPack:'',
			deliveryDateDate: moment(),
			customerInfo:props.customerInfo,
			dealerName:props.dealerName,
			//dealerCode:props.dealerCode
			
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.customerInfo !== undefined)
		{
		this.setState({customerInfo:nextProps.customerInfo})
		}
		if(nextProps.dealerName !==undefined){
			this.setState({dealerName:nextProps.dealerName})
		}
	}
	show(line) {
		console.log('line is',line);
		this.props.dismissMessage;
		this.setState({ validationResult: {} });
		this.setState({ open: true, lineInfo: line, checkedType: 'pickPack',documentUploadItemsDealerSearch: { ref: React.createRef() }, pickPackIMEI:''})
	}

	close(){
		this.setState({ open: false ,
			validationResult: {status:'',message:''}});
		this.props.validationResultEdit.status='';
		this.props.validationResultEdit.message='';

	}


	triggerAction = () => {
		let { pickPackIMEI, checkedType, updateIMEI, updateIMEIAfterPick, updateIMEDOPickPack, deliveryDateDate }=this.state;
		let { lineInfo,dealerCode }=this.props;
		this.props.dismissMessage;
		this.setState({ validationResult: {} });
		if(checkedType==='pickPack'){
			console.log('lineInfo.lineDeviceInfo.status'+lineInfo.lineDeviceInfo.status);

			if((lineInfo.lineDeviceInfo.status ===null || lineInfo.lineDeviceInfo.status===undefined) || (lineInfo.lineDeviceInfo.status!=='Approved' && (lineInfo.lineDeviceInfo.status!=='Pending Device'||lineInfo.lineDeviceInfo.status!=='Pending') && lineInfo.lineDeviceInfo.status!=='Delivered' && lineInfo.lineDeviceInfo.status!=='DOA In Progress' && lineInfo.lineDeviceInfo.vendorId!==9999)){
				if(lineInfo.lineDeviceInfo.status==='DOA In Progress'||lineInfo.lineDeviceInfo.status==='Delivered')
					this.setState({validationResult:{'status':'FAILED', 'message':'Your order status is Delivered so cannot perform Pick and Pack operation'}})	 
				else
					this.setState({validationResult:{'status':'FAILED', 'message':'Your order status is not approved so cannot perform Pick and Pack operation'}})	
				return;
			}
			else if(pickPackIMEI.length<14 || pickPackIMEI.length>16){
				this.setState({validationResult:{'status':'FAILED', 'message':'IMEI should be of 14 to 16 digit'}})	
				return;
			}
			else if(lineInfo.lineDeviceInfo.imei!==null && lineInfo.lineDeviceInfo.imei!==undefined && lineInfo.lineDeviceInfo.imei!=='' && lineInfo.lineDeviceInfo.imei.length>0){
				this.setState({validationResult:{'status':'FAILED', 'message':'IMEI is already there for the device, please use Update IMEI tab'}})	
				return;
			}
			var req ={
				'orderNo': lineInfo.lineDeviceInfo.orderNo,
				'vendorId': lineInfo.lineDeviceInfo.vendorId,
				'imei': pickPackIMEI,
				'regId': lineInfo.regId,
				'dealerCode': dealerCode
			};
			this.setState({validationResult:{status:'',message:''}});
			this.props.dealerPickPack(req);
		}
		else if(checkedType==='updateIMEI'){

			if(updateIMEIAfterPick!==null && updateIMEIAfterPick!==undefined && (updateIMEIAfterPick.length<14 || updateIMEIAfterPick.length>16)){
				this.setState({validationResult:{'status':'FAILED', 'message':'IMEI should be of 14 to 16 digit'}})	
				return;
			}
			else if(lineInfo.lineDeviceInfo.imei===null || lineInfo.lineDeviceInfo.imei===''){
				this.setState({validationResult:{'status':'FAILED', 'message':'Please update IMEI via Pick and Pack first'}})	
				return;
			}
			else if(lineInfo.lineDeviceInfo.status==='Delivered'){
				this.setState({validationResult:{'status':'FAILED', 'message':'Device is already delivered, cannot update IMEI now'}})	
				return;
			}
			var req={
				orderNo:lineInfo.lineDeviceInfo.orderNo,
				imei: updateIMEIAfterPick,
				regId: lineInfo.regId,
				dealerCode: dealerCode
			}
			this.setState({validationResult:{status:'', message:''}});
			this.props.triggerUpdateIMEI(req);
		}
		else if(checkedType==='doaPickPack'){
			if(updateIMEDOPickPack!==null && updateIMEDOPickPack!==undefined && (updateIMEDOPickPack.length<14 || updateIMEDOPickPack.length>16)){
				this.setState({validationResult:{'status':'FAILED', 'message':'IMEI should be of 14 to 16 digit'}})	
				return;
			}
			var req={
				orderNo:lineInfo.lineDeviceInfo.orderNo,
				deliveryDate: lineInfo.lineDeviceInfo.deviceDelDate,
				oldImei: lineInfo.lineDeviceInfo.imei,
				newImei: updateIMEDOPickPack,
				regId: lineInfo.regId,
				dealerCode: dealerCode
			}
			this.props.triggerDOPickPack(req);
		}
		else if(checkedType==='doaComplete'){
			if(lineInfo.lineDeviceInfo.isEligibleForDOComplete===null || lineInfo.lineDeviceInfo.isEligibleForDOComplete===undefined || lineInfo.lineDeviceInfo.isEligibleForDOComplete===false){
				this.setState({validationResult:{'status':'FAILED', 'message':'Your order is not eligible for this action, either your grace period exceeded of your DOA is still pending'}})	
				return;
			}

			var req={
				orderNo:lineInfo.lineDeviceInfo.orderNo,
				tempDocRegId:this.props.tempDocRegId,
				regId:lineInfo.regId,
				deliveryDate:deliveryDateDate,
				dealerCode: dealerCode
			}
			this.setState({validationResult:{status:'', message:''}});
			this.props.triggerDOComplete(req);
		}		
	}

	handleChange =(e, { name, value }) => {
		if(name==='pickPackIMEI' || name==='updateIMEIAfterPick' || name==='updateIMEDOPickPack'){
			this.setState({[name]: value,
				validationResult:{status:'',message:''}});
			this.props.dismissMessage;
			this.props.validationResultEdit.status='';
			this.props.validationResultEdit.message='';
		}
		else{
			this.setState({checkedType:name,
				validationResult:{status:'',message:''}});	
			this.props.validationResultEdit.status='';
			this.props.validationResultEdit.message='';
		}
	};


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
		const { documentUploadItemsDealerSearch } = this.state;
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
		console.log('data',JSON.stringify(data));
		this.props.sendFile(data, lineInfo);
		this.setState({
			documentUploadItemsDealerSearch:{
				...this.state.documentUploadItemsDealerSearch,
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

	render() {
		const { open, dimmer, headerActionList,
				checkedType,  documentUploadItemsDealerSearch,
				lineInfo, pickPackIMEI, updateIMEIAfterPick, 
				updateIMEDOPickPack, deliveryDateDate,customerInfo,dealerName,dealerCode} = this.state;
		let { status, message  }=this.state.validationResult;
		return (
			<Modal dimmer={dimmer}
				open={open}
				onClose={(e)=>this.close(e)}
				closeOnEscape={false}
				closeOnRootNodeClick={false} style={{ marginTop: 0 }} closeIcon>
				<Header icon='edit outline' size='tiny' content='Partner Fulfillemnt - Edit' />
				<Modal.Content style={{minHeight: 100}}>
					<Form size='tiny'>
						<Grid style={{ height: 350, overflow: 'auto', display: 'block' }}>	
							<Grid.Row style={{paddingBottom: 0}}>
								{headerActionList.map((headerActionTemp, key) => {
									return (
										<HeaderAction headerActionTemp={headerActionTemp} handleChange={this.handleChange} checkedType={checkedType} key={key}/>
									)
								})}
							</Grid.Row>			
							<Divider clearing  style={{color:'#293895'}}/>
							{
								(status === 'FAILED') &&
								<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
									onDismiss={() => this.setState({ validationResult: {} })}>
									<Message.Header>We have encounted an error.</Message.Header>
									<p>{message}</p>
								</Message>

							}
							{
								(this.props.validationResultEdit.status === 'SUCCESS') &&
								<Message positive compact size='tiny' style={{ minWidth: 400, marginLeft: 10 }}
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
							<EditPartnerFulfillemntBody checkedType={checkedType} selectFile={this.selectFile.bind(this)} attachment={documentUploadItemsDealerSearch} 
								downloadFile={this.downloadFile.bind(this)} lineInfo={this.props.lineInfo} 
								handleChange={this.handleChange} pickPackIMEI={pickPackIMEI} updateIMEIAfterPick={updateIMEIAfterPick} 
								updateIMEDOPickPack={updateIMEDOPickPack} deliveryDateDate={deliveryDateDate} 
								setDeliveryDate={(date)=>this.setState({deliveryDateDate:date})} customerInfo={customerInfo} dealerName={dealerName} dealerCode={this.props.dealerCode} deviceApproved={this.props.deviceApproved}/>	
						</Grid>
					</Form>
				</Modal.Content>
				<Modal.Actions>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<PrimaryButton value='SAVE' onClick={this.triggerAction} />
					<div style={{ padding: 20 }} />
					<PrimaryButton value='CLOSE' onClick={(e)=>this.close(e)} />
				</Segment>
				</Modal.Actions>
			</Modal>
		)
	}
}

export default EditPartnerFulfillemnt;