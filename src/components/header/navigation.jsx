import React from 'react';
import {Breadcrumb} from "semantic-ui-react";

const Navigation = ({index,group}) => {
	return(
		<Breadcrumb size='small' className='navigation'>
			{index===1&&<span style={{paddingLeft:5}}>&nbsp;</span>}
			<Breadcrumb.Section active={index===1}>Registration Type</Breadcrumb.Section>
			<Breadcrumb.Divider icon='chevron right' />
			<Breadcrumb.Section active={index===2}>Company Information</Breadcrumb.Section>
			<Breadcrumb.Divider icon='chevron right' />
			<Breadcrumb.Section active={index===3}>Address Contact Details</Breadcrumb.Section>
			<Breadcrumb.Divider icon='chevron right' />
			<Breadcrumb.Section active={index===4}>Product Order</Breadcrumb.Section>
			 {!(group == "MAXIS" || group == "Zerolution") &&
			<Breadcrumb.Divider icon='chevron right' />}
			{!(group == "MAXIS"  || group == "Zerolution")&&
			<Breadcrumb.Section active={index===5}>Device Fund</Breadcrumb.Section>}
			<Breadcrumb.Divider icon='chevron right' />
			<Breadcrumb.Section active={index===6}>Submission</Breadcrumb.Section>
		</Breadcrumb>
	)
}

export default Navigation;
