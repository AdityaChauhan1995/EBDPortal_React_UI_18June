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
import { getCorpAccountOwnerDetails } from '../../redux/actions/order';




class SearchCorpAccount extends Component {

	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			showDimmer: false,
			corpInfoList: props.corpInfoList,
			brn: '',
			companyName: '',
			corpOwnerIndex: 1,
			corpInfoIndexFirst: 1,
			corpInforIndexLast: null,
			infoValueCurrent: 1,
			infoCurrentPage: 1,
			corpOwnerListValue: [],
			caCurrentPage: 1,
			caTodosPerPage: 10,
			caIndexOfFirstTodo: null,
			caIndexOfLastTodo: null,
			caCurrentTodos: null,
			caFirstIndexCurrentPage: 1,
			validationResult: {
				status: 'SUCCESS',
				message: '',
			},
		};

	}
	searchCorpAccount = () => {
		let { brn, companyName } = this.state;
		brn = brn.trim(); companyName = companyName.trim();
		if ((brn === '' || brn === null || (brn !== null && brn.trim() === '')) &&
			(companyName === '' || companyName === null || (companyName !== null && companyName.trim() === ''))) {
			this.setState({ corpOwnerListValue: [] });
			this.setState({ validationResult: { status: 'FAILURE', message: 'Please enter either brn or company name' } });
		}
		else {
			console.log("enter", brn.trim() === '');
			if ((brn === '' || brn === null || (brn !== null && brn.trim() === '')) &&
				!(companyName === '' || companyName === null || (companyName !== null && companyName.trim() === ''))) {
				brn = 'dummy';
			}
			else if (!(brn === '' || brn === null || (brn !== null && brn.trim() === '')) &&
				(companyName === '' || companyName === null || (companyName !== null && companyName.trim() === ''))) {
				companyName = 'dummy';
			}
			this.setState({ showDimmer: true });
			this.props.getCorpAccountOwnerDetails(brn, companyName);
		}
	}
	resetCorpAccount = () => {
		console.log(this.state.brn, this.state.companyName)
		this.setState({
			corpInfoList: [],
			brn: '',
			companyName: '',
			corpOwnerListValue: [],
			validationResult:{
				 status: 'SUCCESS',
				 message:''
				 }
		})
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}

	handleClick(type) {
		let { caTodosPerPage, caCurrentPage, corpOwnerListValue } = this.state;
		if (corpOwnerListValue.length > 0) {
			if (type === 'First') {
				caCurrentPage = 1
			}
			else if (type === 'Next' && caCurrentPage < Math.ceil(corpOwnerListValue.length / caTodosPerPage)) {
				caCurrentPage += 1
			}
			else if (type === 'Prev' && caCurrentPage > 1) {
				caCurrentPage -= 1
			}
			else if (type === 'Last') {
				caCurrentPage = Math.ceil(corpOwnerListValue.length / caTodosPerPage);
			}
			this.setState({
				caCurrentPage: Number(caCurrentPage),
				caFirstIndexCurrentPage: (caCurrentPage * caTodosPerPage) - caTodosPerPage + 1,
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.GET_CORP_OWNER_INFO_STATUS !== 'SUCCESS' &&
			nextProps.GET_CORP_OWNER_INFO_STATUS === 'SUCCESS') {
			if(nextProps.corpInfoList != null){
				let tempCorpOwnerListValue = nextProps.corpInfoList;
				this.setState({ corpOwnerListValue: tempCorpOwnerListValue });
				if (nextProps.corpInfoList[0].errorCode === null) {
					this.setState({
						validationResult:{
							status: 'SUCCESS',
							message:''
						}
					})	
					}else if(nextProps.corpInfoList[0].errorCode === "1"){
						this.setState({
							validationResult:{
								status: 'FAILURE',
								message:nextProps.corpInfoList[0].errorMessage[0]
							}
						})	
					}
					this.setState({showDimmer:false});
					this.setState({
						caCurrentPage:1,
						caFirstIndexCurrentPage:1,
					});
			}
		}

		if (this.props.GET_CORP_OWNER_INFO_STATUS !== 'FAILED' &&
			nextProps.GET_CORP_OWNER_INFO_STATUS === 'FAILED') {
			this.setState({ corpOwnerListValue: [], showDimmer: false,
							validationResult:{
								status:'FAILURE',
								message:'We have encounted some error while fetching data.',
							} });
			this.setState({
								caCurrentPage: 1,
								caFirstIndexCurrentPage: 1,
							});
		}
	}
	render() {
		let { brn, companyName, corpOwnerIndex, corpInfoIndexFirst, corpInforIndexLast, corpOwnerListValue,
			corpInfoList, infoCurrentPage, infoValueCurrent, caCurrentPage, caTodosPerPage,
			caIndexOfFirstTodo, caIndexOfLastTodo, caCurrentTodos, caFirstIndexCurrentPage } = this.state;
		let { status, message } = this.state.validationResult;
		caIndexOfLastTodo = caCurrentPage * caTodosPerPage;
		caIndexOfFirstTodo = caIndexOfLastTodo - caTodosPerPage;
		caCurrentTodos = corpOwnerListValue.slice(caIndexOfFirstTodo, caIndexOfLastTodo);

		return (
			<Container fluid>
				<PleaseWait active={this.state.showDimmer} />
				<div className='gridBorder'>
					<Menu  size="mini"  className ='.ui.menu' style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}>
						<Menu.Item className= '.ui.menu .item' name='Corporate Account Ownership Search' />
					</Menu>
					<Grid >
						<Grid.Row verticalAlign='middle' style={{ paddingTop: 25 }}>
							<Grid.Column width={3}>
								&emsp;<label style={{ paddingLeft: 5 }} className='heading'>BRN: </label>
							</Grid.Column>
							<Grid.Column width={3}>
								&nbsp;<Input placeholder='BRN'
									name="brn"
									value={brn}
									onChange={this.handleChange}
									size="mini"
									fluid
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row verticalAlign='middle' style={{ padding: 3, paddingTop: 3 }}>
							<Grid.Column width={3}>
								&emsp;<label style={{ height: 50 }} className='heading'>Company Name: </label>
							</Grid.Column>
							<Grid.Column width={3}>
								<Input placeholder='Company Name'
									name="companyName"
									value={companyName}
									onChange={this.handleChange}
									size="mini"
									fluid
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ paddingLeft: 350, paddingTop: 100, paddingBottom: 20 }}>
							<SecondaryButton value='Search' onClick={this.searchCorpAccount} />
							<div style={{ padding: 10 }} />
							<SecondaryButton value='Reset' onClick={this.resetCorpAccount} />
						</Grid.Row>
					</Grid>
				</div>


				<Grid style={{ paddingTop: 20, paddingBottom: 0, paddingLeft: 50 }}>
					<Grid.Row style={{ paddingBottom: 0 }}>
						<Grid.Column width='8' style={{ paddingLeft: 0 }}>
							<label className='heading'>
								Displaying {(corpOwnerListValue.length === 0) && (0)} {(corpOwnerListValue.length > 0) && caFirstIndexCurrentPage}-{(caFirstIndexCurrentPage - 1) + caCurrentTodos.length} / {corpOwnerListValue.length}</label>
						</Grid.Column>
						<Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
							<label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='heading'>First</label>
							<label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='heading'>Next</label>
							<label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='heading'>Prev</label>
							<label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='heading'>Last</label>
							<label className='heading'>(
											{(corpOwnerListValue.length === 0) && (0)} {(corpOwnerListValue.length > 0) && caCurrentPage} of {Math.ceil(corpOwnerListValue.length / caTodosPerPage)}
								)
											</label>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row >
						<Table celled compact='very' size='small' style={{ fontSize: 12, border: 0 }}>
							<Table.Header className ='.ui.table thead th' >
								<Table.Row >
									<Table.HeaderCell>BRN</Table.HeaderCell>
									<Table.HeaderCell>Account Name</Table.HeaderCell>
									<Table.HeaderCell>State</Table.HeaderCell>
									<Table.HeaderCell>Owner/Account Manager</Table.HeaderCell>
									<Table.HeaderCell>AM Supervisor Name</Table.HeaderCell>
									<Table.HeaderCell >Created Date</Table.HeaderCell>
									<Table.HeaderCell>Entry Validity</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							{(corpOwnerListValue.length > 0) &&
								<Table.Body style={{ height: 150 }}>
									{caCurrentTodos.map((corpOwner, key) => {
										return (
											<Table.Row key={key}>
												<Table.Cell>{corpOwner.brn}</Table.Cell>
												<Table.Cell>{corpOwner.companyName}</Table.Cell>
												<Table.Cell>{corpOwner.state}</Table.Cell>
												<Table.Cell>{corpOwner.acctManager}</Table.Cell>
												<Table.Cell>{corpOwner.amSupervisor}</Table.Cell>
												<Table.Cell>{corpOwner.createdDate}</Table.Cell>
												<Table.Cell>{corpOwner.acctStatus}</Table.Cell>
											</Table.Row>
										)
									})
									}
								</Table.Body>
							}
						</Table>
						{
							(status === 'FAILURE') &&
							<Message negative compact size='small' style={{ minWidth: 400, marginLeft: 10 }}
								onDismiss={() => this.setState({ validationResult: {} })}>
								<Message.Header>{message}</Message.Header>
							</Message>
						}
					</Grid.Row>
				</Grid>

			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		corpInfoList: state.order.data.corpInfoList,
		GET_CORP_OWNER_INFO_STATUS: state.order.meta.GET_CORP_OWNER_INFO_STATUS
	}
}

const mapDispatchToProps = {
	getCorpAccountOwnerDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCorpAccount)
