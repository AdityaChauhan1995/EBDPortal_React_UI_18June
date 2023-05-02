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
import { getProdGrpChangeStatus, searchChangeStatus } from '../../redux/actions/configuration';
import { updateChangeStatus } from '../../redux/actions/order';


class ChangeStatus extends Component {

	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			validationResult: {
				status: '',
				message: '',
			},
			showDimmer: false,
			inputRegId: '',
			inputProductGroup: '',
			searchChangeStatus: false,
			bundleTypes: props.bundleTypes,
			changeStatusRegIdList: props.changeStatusRegIdList,
			approverRemark: '',
			changeStatusMessage:props.changeStatusMessage
		};
	};

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (this.props.GET_PROD_GRP_CHANGE_STATUS !== 'SUCCESS' &&
			nextProps.GET_PROD_GRP_CHANGE_STATUS === 'SUCCESS') {

			var bundleTypes = [{ key: -1, value: '', text: '---Please Select---' }, ...nextProps.bundleTypes];
			this.setState({ bundleTypes: bundleTypes, showDimmer: false });
		}
		if (this.props.SEARCH_CHANGE_STATUS !== 'SUCCESS' &&
			nextProps.SEARCH_CHANGE_STATUS === 'SUCCESS') {
			this.setState({ changeStatusRegIdList: nextProps.changeStatusRegIdList, showDimmer: false });
			if (nextProps.changeStatusRegIdList != undefined && nextProps.changeStatusRegIdList !== null
				&& nextProps.changeStatusRegIdList.length > 0) {
				this.setState({ approverRemark: nextProps.changeStatusRegIdList[0].approverRemark, searchChangeStatus: true });
			}
		}
		if (this.props.UPDATE_CHANGE_PAYMENT_STATUS !== 'SUCCESS' &&
			nextProps.UPDATE_CHANGE_PAYMENT_STATUS === 'SUCCESS') {
			this.setState({ validationResult: { status: 'SUCCESS', message: 'Change Status successfully updated for  reg id :' + this.state.inputRegId } });
			let { inputRegId, inputProductGroup } = this.state;
			if (inputProductGroup === undefined || inputProductGroup === null || inputProductGroup === '') {
				inputProductGroup = 'null';
			}
			this.props.searchChangeStatus(inputRegId, inputProductGroup);
		}
		if (this.props.UPDATE_CHANGE_PAYMENT_STATUS !== 'FAILED' &&
			nextProps.UPDATE_CHANGE_PAYMENT_STATUS === 'FAILED') {

			this.setState({ showDimmer: false, validationResult: { status: 'FAILED', message: nextProps.changeStatusMessage } });
		}

	}
	componentDidMount() {
		this.setState({ showDimmer: true });
		this.props.getProdGrpChangeStatus();
	}

	handleChange = (e, { name, value }) => {
		let { changeStatusRegIdList } = this.state;
		console.log('name',name);
		if (name.includes('updatedLineStatus')) {
			var mobileNo = name.substring(17);
			for (var i = 0; i < changeStatusRegIdList.length; i++) {
				if (changeStatusRegIdList[i].msisdnNo === mobileNo) {
					changeStatusRegIdList[i].updatedLineStatus = value
					if (value === undefined || value === null || value === '') {
						changeStatusRegIdList[i].lineStatusUpdated = false
					} else {
						changeStatusRegIdList[i].lineStatusUpdated = true
					}
					break;
				}
			}
			this.setState({ changeStatusRegIdList: changeStatusRegIdList });
		}
		else if (name.includes('updatedRegStatus')) {
			var mobileNo = name.substring(16);
			for (var i = 0; i < changeStatusRegIdList.length; i++) {
				if (changeStatusRegIdList[i].msisdnNo === mobileNo) {
					changeStatusRegIdList[i].updatedRegStatus = value
					if (value === undefined || value === null || value === '') {
						changeStatusRegIdList[i].regStatusUpdated = false
					} else {
						changeStatusRegIdList[i].regStatusUpdated = true
					}
					break;
				}
			}
			this.setState({ changeStatusRegIdList: changeStatusRegIdList });
		} else if (name === 'updatedMasterRegStatus') {
			for (var i = 0; i < changeStatusRegIdList.length; i++) {
				console.log('name', name, 'value', value);
				changeStatusRegIdList[i].updatedMasterRegStatus = value
				if (value === undefined || value === null || value === '') {
					changeStatusRegIdList[i].masterStatusUpdated = false
				} else {
					changeStatusRegIdList[i].masterStatusUpdated = true
				}
			}
			this.setState({ changeStatusRegIdList: changeStatusRegIdList });
		}
		else if (name === 'approverRemark') {
			this.setState({ [name]: value });
			if (changeStatusRegIdList !== undefined && changeStatusRegIdList !== null) {
				for (var i = 0; i < changeStatusRegIdList.length; i++) {
					changeStatusRegIdList[i].approverRemark = value
				}
			}
			this.setState({ changeStatusRegIdList: changeStatusRegIdList });
		}
		else if(name === 'inputRegId'){
			var checkNum = false;
			console.log('value',value);
			checkNum = this.checkIsNumeric(value);
			if(checkNum){
				this.setState({ [name]: value });
			}
		}
		else {
			this.setState({ [name]: value });
		}

		var validateStatus = this.validateStatus();
		if(!validateStatus){
			this.setState({ validationResult: { status: 'FAILED', message: 'Kindly change line status or reg status or master reg status, one at a time ' } });
		}else{
			this.setState({ validationResult: {} });
		}
	}

	 validateStatus= () => {
		let { changeStatusRegIdList } = this.state;
		var lineStatusSelected = false;
		var regStatusSelected = false;
		var masterRegStatusSelected = false;
		if (changeStatusRegIdList !== undefined && changeStatusRegIdList !== null
			&& changeStatusRegIdList.length > 0) {
			for (var i = 0; i < changeStatusRegIdList.length; i++) {
				if (changeStatusRegIdList[i].lineStatusUpdated !== undefined && changeStatusRegIdList[i].lineStatusUpdated !== null
					&& changeStatusRegIdList[i].lineStatusUpdated !== false) {
					lineStatusSelected = true;
				}
				if (changeStatusRegIdList[i].regStatusUpdated !== undefined && changeStatusRegIdList[i].regStatusUpdated !== null
					&& changeStatusRegIdList[i].regStatusUpdated !== false) {
					regStatusSelected = true;
				}
				if (changeStatusRegIdList[i].masterStatusUpdated !== undefined && changeStatusRegIdList[i].masterStatusUpdated !== null
					&& changeStatusRegIdList[i].masterStatusUpdated !== false) {
					masterRegStatusSelected = true;
				}
				changeStatusRegIdList[i].loginId = this.props.user.userId;
			}
		}

		if ((lineStatusSelected && regStatusSelected) || (lineStatusSelected && masterRegStatusSelected)
			|| (regStatusSelected && masterRegStatusSelected)) {
				return false;
		} else {
			return true;
		}
	}


	updateChangeStatus = () => {

		let { changeStatusRegIdList, validationResult} = this.state;
		

		if(changeStatusRegIdList != null){
			var tempCount = 0;
			var isRejectedSelected = false;

			tempCount = changeStatusRegIdList.filter(
				lineStatusList => {

					if(lineStatusList.updatedLineStatus === 'R' && !isRejectedSelected){
						isRejectedSelected =  true;
					}

					if(lineStatusList.currentLineStatus === 'FLP' || lineStatusList.currentLineStatus === 'R'){

						return lineStatusList;
					}
					

					if(lineStatusList.regType === 'FF Device Order'){

						return lineStatusList;
					}
				}
				).length;

			if(tempCount>0){

				if((tempCount < changeStatusRegIdList.length )&& isRejectedSelected){
					this.setState({ validationResult: { status: 'FAILED', message: 'Cannot change status to Rejected as there is other line with non FLP status.' } });
					return;
				}
			}
			
			console.log(JSON.stringify(changeStatusRegIdList));
			if(validationResult.status !== 'FAILED'){
				this.setState({ showDimmer: true });
				this.props.updateChangeStatus(changeStatusRegIdList);
			}	
		}
	}

	searchPaymentStatus = () => {
		let { inputRegId, inputProductGroup } = this.state;
		console.log('inputRegId',inputRegId);
		if (inputRegId === undefined || inputRegId === null || inputRegId === '') {
			this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter Registration id.' } });
			return;
		}
		if (inputProductGroup === undefined || inputProductGroup === null || inputProductGroup === '') {
			inputProductGroup = 'null';
		}
		this.setState({ showDimmer: true, validationResult: {}, approverRemark: '' });
	
		this.props.searchChangeStatus(inputRegId, inputProductGroup);
	}

	checkIsNumeric= (value) => {
		if(value !== undefined && value !== null && value !== ''){
			var regex = /^[0-9]+$/;
			console.log('regEx value', regex.test(value));
			return (regex.test(value)) ? true:false;
		}else{
			return true;
		}
		
	}


	render() {
		let { validationResult, showDimmer, inputRegId, inputProductGroup, bundleTypes,
			changeStatusRegIdList, updatedLineStatus, approverRemark, searchChangeStatus } = this.state;
		let { status, message } = this.state.validationResult;
		return (
			<Container fluid className='main-container'>
				<PleaseWait active={showDimmer} />
				<div className='gridBorder'>
					<Menu style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}>
						<label style={{ paddingTop: 7 }} className='ui-widget-header' name='Change Status Search ' > Change Status Search </label>
					</Menu>
					<Grid >
						<Grid.Row verticalAlign='middle' style={{ paddingTop: 25 }}>
							<Grid.Column width={3}>
								&emsp;<label style={{ paddingLeft: 5 }} className='heading'> Registration Id: </label>
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
									name="inputProductGroup"
									onChange={this.handleChange}
									options={bundleTypes}
									value={inputProductGroup}
									fluid
								/>
							</Grid.Column>
						</Grid.Row> */}
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
						<Grid.Row style={{ paddingLeft: 32, paddingTop: 10, paddingBottom: 30 }}>
							<SecondaryButton value='Search' onClick={this.searchPaymentStatus} />
						</Grid.Row>
					</Grid>
				</div>
				{
					searchChangeStatus &&
					<Grid >
						<Grid.Row style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 10 }} >
							<Table celled compact='very' size='small' style={{ fontSize: 12, border: 0 }}>
								<Table.Header className='.ui.table thead th' >
									<Table.Row >
										<Table.HeaderCell>Reg Id</Table.HeaderCell>
										<Table.HeaderCell>Product Group</Table.HeaderCell>
										<Table.HeaderCell>Product Category</Table.HeaderCell>
										<Table.HeaderCell>MSISDN</Table.HeaderCell>
										<Table.HeaderCell>Reg Type</Table.HeaderCell>
										<Table.HeaderCell>BRN</Table.HeaderCell>
										<Table.HeaderCell>Dealer Name</Table.HeaderCell>
										<Table.HeaderCell>Date Created</Table.HeaderCell>
										<Table.HeaderCell>Reg Date Approved</Table.HeaderCell>
										<Table.HeaderCell>Current Line Status</Table.HeaderCell>
										<Table.HeaderCell>Line Status New </Table.HeaderCell>
										<Table.HeaderCell>Current Reg Status</Table.HeaderCell>
										<Table.HeaderCell>Master Reg Id</Table.HeaderCell>
										<Table.HeaderCell>Current Master Status</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								{(changeStatusRegIdList.length > 0) &&
									<Table.Body style={{ height: 150 }}>
										{changeStatusRegIdList.map((changeStatusRegId, key) => {
											console.log();
											var eligibleLineStatus = [];
											var eligibleRegStatus = [];
											var eligibleMasterStatus = [];
											if (changeStatusRegId.eligibleLineStatus !== undefined && changeStatusRegId.eligibleLineStatus !== null) {
												eligibleLineStatus = changeStatusRegId.eligibleLineStatus;
											}
											
											return (
												<Table.Row key={key}>
													<Table.Cell>{changeStatusRegId.regId}</Table.Cell>
													<Table.Cell>{changeStatusRegId.productGroup}</Table.Cell>
													<Table.Cell>{changeStatusRegId.prodCategory}</Table.Cell>
													<Table.Cell>{changeStatusRegId.msisdnNo}</Table.Cell>
													<Table.Cell>{changeStatusRegId.regType}</Table.Cell>
													<Table.Cell>{changeStatusRegId.custBrnNo}</Table.Cell>
													<Table.Cell>{changeStatusRegId.dealerName}</Table.Cell>
													<Table.Cell>{changeStatusRegId.dateCreated}</Table.Cell>
													<Table.Cell>{changeStatusRegId.regDateApproved}</Table.Cell>
													<Table.Cell>{changeStatusRegId.currentLineStatus}</Table.Cell>
													<Table.Cell> <Dropdown placeholder='Select'
														search
														selection
														name={"updatedLineStatus" + changeStatusRegId.msisdnNo}
														onChange={this.handleChange}
														options={eligibleLineStatus}
														defaultValue={changeStatusRegId.updatedLineStatus}
														fluid />  </Table.Cell>
													<Table.Cell>{changeStatusRegId.currentRegStatus}</Table.Cell>
													<Table.Cell>{changeStatusRegId.masterRegId}</Table.Cell>
													<Table.Cell>{changeStatusRegId.currentMasterRegStatus}</Table.Cell>
												
												</Table.Row>
											)
										})
										}
									</Table.Body>
								}
							</Table>
						</Grid.Row>

						<Grid.Row style={{ paddingLeft: 30, paddingTop: 30, paddingBottom: 10 }} >
							<Grid.Column width={3}>
								&emsp;<label style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 0 }} className='heading'>Approver Remark: </label>
							</Grid.Column>
							<Grid.Column width={6}>
								<Input placeholder='Approver Remark'
									name="approverRemark"
									value={approverRemark}
									onChange={this.handleChange}
									fluid
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ paddingTop: 10, paddingBottom: 0, paddingLeft: 25 }}>
							<Grid.Column width='16' style={{ padding: 0 }}>
								{
									(status === 'SUCCESS') &&
									<Message positive compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
										onDismiss={() => this.setState({ validationResult: {} })}>
										<p>{message}</p>
									</Message>
								}
								{
									(status === 'FAILED') &&
									<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
										onDismiss={() => this.setState({ validationResult: {} })}>
										<p>{message}</p>
									</Message>
								}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ paddingTop: 10, paddingBottom: 20, paddingLeft: 30 }}>
							<SecondaryButton value='Update Status' onClick={this.updateChangeStatus} />
						</Grid.Row>
					</Grid>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.data,
		GET_PROD_GRP_CHANGE_STATUS: state.configuration.meta.GET_PROD_GRP_CHANGE_STATUS,
		bundleTypes: state.configuration.data.bundleTypes,
		changeStatusRegIdList: state.configuration.data.changeStatusRegIdList,
		SEARCH_CHANGE_STATUS: state.configuration.meta.SEARCH_CHANGE_STATUS,
		UPDATE_CHANGE_PAYMENT_STATUS: state.order.meta.UPDATE_CHANGE_PAYMENT_STATUS,
		changeStatusMessage:state.order.data.changeStatusMessage
	}
}

const mapDispatchToProps = {
	getProdGrpChangeStatus,
	searchChangeStatus,
	updateChangeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatus)
