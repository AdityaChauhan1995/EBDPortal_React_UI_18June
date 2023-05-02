import React, { Component } from 'react';
import {
	Segment, Container, Header
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { PrimaryButton } from '../../components/common/buttons';
import { unsetOrderData } from '../../redux/actions/order';

class PostSubmission extends Component {

	constructor(props) {
	  super(props);
	  const { url } = this.props.match;
	  this.state = {
		nextUrl: url.substring(0, url.lastIndexOf("EBDPortal")) + "/bundle/view/registration-type?mode=View",
	  	viewURL:''
	  };
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.UNSET_ORDER_DATA_STATUS!=='SUCCESS' &&  nextProps.UNSET_ORDER_DATA_STATUS==='SUCCESS'){
			this.props.history.push(this.state.viewURL);	
		}
	}
	next=()=>{
		localStorage.removeItem('persist:ebdportal');
		let tempNextURL=this.state.nextUrl;
		tempNextURL+="&action=approved&easMasterRegId="+this.props.easMasterRegId;
		this.setState({viewURL:tempNextURL});
		this.props.unsetOrderData({});
	}
	componentDidMount(){
		console.log(this.props.easMasterRegId,this.props.UNSET_ORDER_DATA_STATUS,this.props.orderResubmissionFailed);

	}
	render() {
		const { easMasterRegId } = this.props;
		return (
			<Container fluid style={{justifyContent: 'center', alignItems: 'center'}}>
				<Segment basic style={{width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				{(this.props.orderResubmissionFailed) &&
					<React.Fragment>
						<Header as='h1' style={{color: '#293895'}}>Error Occurred!</Header>
						<Header as='h4' textAlign='center' style={{paddingTop: 0, paddingBottom: 20, marginTop: 0, fontWeight: 'normal', color: '#4E4E4E', opacity: 0.7}}>
							We have encountered some error while resubmitting order, try to raise order again
						</Header>
					</React.Fragment>
				}
				{(!this.props.orderResubmissionFailed) &&
					<React.Fragment>
						<Header as='h1' style={{color: '#293895'}}>All Done!</Header>
						<Header as='h3' style={{color: '#4E4E4E'}}>Your order# {easMasterRegId}</Header>
						<Header as='h4' textAlign='center' style={{paddingTop: 0, paddingBottom: 20, marginTop: 0, fontWeight: 'normal', color: '#4E4E4E', opacity: 0.7}}>
							Your order has been successfully resubmitted. We will notify you on your provided contact details about the status of your order.
						</Header>
						<PrimaryButton value='VIEW ORDER' onClick={this.next}/>
					</React.Fragment>
				}
					
				</Segment>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		easMasterRegId: state.order.data.easMasterRegId,
		UNSET_ORDER_DATA_STATUS: state.order.meta.UNSET_ORDER_DATA_STATUS,
		orderResubmissionFailed:state.order.data.orderResubmissionFailed
	}
}
const mapDispatchToProps = {
	unsetOrderData
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSubmission)
