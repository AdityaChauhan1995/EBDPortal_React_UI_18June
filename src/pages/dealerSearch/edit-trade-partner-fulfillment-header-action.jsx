import React, { Component } from 'react';
import { Grid,  Radio, Input } from "semantic-ui-react";

const HeaderAction = ({headerActionTemp, handleChange, checkedType}) =>{
	return (
				<Grid.Column width='4'>	
					<Radio label={headerActionTemp.label} className='clickableHeader' name={headerActionTemp.name} disabled={headerActionTemp.disabled}  onChange={handleChange} checked={checkedType===headerActionTemp.name?true:false} />
				</Grid.Column>
		)
}

export default HeaderAction;