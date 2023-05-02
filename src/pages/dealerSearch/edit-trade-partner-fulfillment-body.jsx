import React, {Component} from 'react';
import { Grid,  Radio, Input } from "semantic-ui-react";
import { SecondaryButton } from '../../components/common/buttons';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DoPrint from './do-print';
import Moment from 'moment';


const EditPartnerFulfillemntBody = ({attachment, selectFile, checkedType, downloadFile, lineInfo, handleChange, pickPackIMEI, updateIMEIAfterPick, updateIMEDOPickPack, deliveryDateDate, setDeliveryDate,customerInfo,dealerName,dealerCode,deviceApproved}) => {
	let { mobileInfo, lineDeviceInfo}=lineInfo;
	var startdate = moment();
	let doPrints = null;
	let lineInf = [];
	lineInf.push(lineInfo);
	function doPrintModal (lineInf) {
		doPrints.show(lineInf);
	}
	return (
				<React.Fragment>
				    <Grid.Row style={{ paddingBottom: 10, paddingTop: 20 }} >
				        <Grid.Column width={4}>
				            <label className='boldLabel'>Mobile No:</label>
				        </Grid.Column>
				        <Grid.Column width={6}>
				        	<div>{mobileInfo.mobileNo}</div>
				        </Grid.Column>
				    </Grid.Row>
				    <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
				        <Grid.Column width={4}>
				            <label className='boldLabel'>Device Info:</label>
				        </Grid.Column>
				        <Grid.Column width={6}>
				        	 <div>{lineDeviceInfo.phoneModel}</div>
				        </Grid.Column>
				    </Grid.Row>
				    <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
				        <Grid.Column width={4}>
				            <label className='boldLabel'>Device Top-up (RM):</label>
				        </Grid.Column>
				        <Grid.Column width={6}>
				        	<div>{lineInfo.topupByDealer}</div>
				        </Grid.Column>
				    </Grid.Row>
				    {(checkedType==='pickPack') &&(
				    	 <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
					        <Grid.Column width={4} >
					            <label className='boldLabel'>IMEI/Serial Number:</label>
					        </Grid.Column>
					        <Grid.Column width={6}>
					        	   <Input placeholder='IMEI' 
					        			  onChange={handleChange}
					        			  name='pickPackIMEI' fluid value={pickPackIMEI}/>
					        </Grid.Column>
						</Grid.Row>
				    )}
				    {( checkedType==='doaPickPack' || checkedType==='doaComplete') && (
				    			<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
				    			    <Grid.Column width={4} >
				    			        <label className='boldLabel'>Delivery Status:</label>
				    			    </Grid.Column>
				    			    <Grid.Column width={6}>
				    			    	<div>{lineDeviceInfo.status}</div>
				    			    </Grid.Column>
				    			</Grid.Row>
				    	)
				    }
				     {(checkedType==='doaPickPack') && (
		    				    <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
		    				        <Grid.Column width={4} >
		    				            <label className='boldLabel'>Delivery Date:</label>
		    				        </Grid.Column>
		    				        <Grid.Column width={6}>
		    				        {(lineDeviceInfo.deviceDelDate!==null && lineDeviceInfo.deviceDelDate !==undefined) &&(
		    				        		<div>{Moment(lineDeviceInfo.deviceDelDate).format('YYYY-MM-DD hh:mm:ss')}</div>
		    				        	)
		    				        }
		    				        </Grid.Column>
		    				    </Grid.Row>
		    	    	)
		    	    }
				    {(checkedType!=='pickPack' && ( checkedType==='updateIMEI' || checkedType==='doaPickPack') ) && (
				    			 <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
    							        <Grid.Column width={4} >
    							            <label className='boldLabel'>{checkedType==='doaPickPack' ? 'DOA IMEI/Serial Number:' : 'IMEI/Serial Number:'}</label>
    							        </Grid.Column>
    							        <Grid.Column width={6}>
    							        	  <div>{lineDeviceInfo.imei}</div>
    							        </Grid.Column>
    							 </Grid.Row>
				    	)
				    }
			        {(checkedType==='doaComplete') &&(
			        	<React.Fragment>
				        	<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
						        <Grid.Column width={4} >
						            <label className='boldLabel'>DOA IMEI/Serial Number:</label>
						        </Grid.Column>
						        <Grid.Column width={6}>
						        	  <div>{lineDeviceInfo.oldImei}</div>
						        </Grid.Column>
							</Grid.Row>
				        	<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
				    	        <Grid.Column width={4} >
				    	            <label className='boldLabel'>NEW IMEI/Serial Number:</label>
				    	        </Grid.Column>
				    	        <Grid.Column width={6}>
				    	        	<div>{lineDeviceInfo.imei}</div>
				    	        </Grid.Column>
				    		</Grid.Row>
			    		</React.Fragment>
			        )}

				    {(checkedType==='updateIMEI') &&(
				    	 <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
					        <Grid.Column width={4} >
					            <label className='boldLabel'>NEW IMEI/Serial Number:</label>
					        </Grid.Column>
					        <Grid.Column width={6}>
					        	   <Input placeholder='IMEI' onChange={handleChange} name='updateIMEIAfterPick' fluid value={updateIMEIAfterPick} fluid/>
					        </Grid.Column>
						</Grid.Row>
				    )}

				    {(checkedType==='doaPickPack') && (
				    			<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
				    			    <Grid.Column width={4} >
				    			        <label className='boldLabel'>New IMEI/Serial Number:</label>
				    			    </Grid.Column>
				    			    <Grid.Column width={6}>
				    			    	<Input placeholder='IMEI' onChange={handleChange} name='updateIMEDOPickPack' fluid value={updateIMEDOPickPack} fluid/>
				    			    </Grid.Column>
				    			</Grid.Row>
				    	)
				    }
				   
		    	    {(checkedType==='doaComplete') && (
		    				<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
		    				    <Grid.Column width={4} >
		    				        <label className='boldLabel'>Delivery Date:</label>
		    				    </Grid.Column>
		    				    <Grid.Column width={6}>
		    				    	<DatePicker
		    				    	  utcOffset='0'
		    				    	  name='deliveryDateDate'
		    				    	  maxDate={moment()}
		    				    	  minDate={startdate.subtract(lineDeviceInfo.minDaysForDoComplete, "days")}
		    				    	  selected={deliveryDateDate}
		    				    	  onSelect={(deliveryDateDate)=>setDeliveryDate(deliveryDateDate)}
		    				    	  dateFormat="DD/MM/YYYY"
		    				    	  placeholderText="DD/MM/YYYY" />
		    				    </Grid.Column>
		    				</Grid.Row>
		    	    	)
					}
					 {( checkedType==='doaPickPack' || checkedType==='doaComplete') && (
				    			<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
				    			    <Grid.Column width={4} >
				    			        <label className='boldLabel'>DOA Date:</label>
				    			    </Grid.Column>
				    			    <Grid.Column width={6}>
					 <div>{(lineDeviceInfo.doaDate!==null&&lineDeviceInfo.doaDate!==undefined)?Moment(lineDeviceInfo.doaDate).format('YYYY-MM-DD'):''}</div>
				    			    </Grid.Column>
				    			</Grid.Row>
				    	)
				    }
					
					 {(checkedType==='doaComplete') && (
						 <React.Fragment>
						 		<Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
							        <Grid.Column width={4} >
							            <label className='heading'>Documents Attached</label>
							        </Grid.Column>
								</Grid.Row>
							    <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
							        <Grid.Column width={4} >
							            <label className='boldLabel'>Delivery Order:</label>
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
							</React.Fragment>
				    	)
				    }
					{(checkedType==='doaPickPack') && (
							    <Grid.Row style={{ paddingBottom: 10, paddingTop: 0 }} >
							        <Grid.Column width={3}>
							        	<label>
										{(deviceApproved==true)&&(
											<SecondaryButton 
			                                compact 
			                                value='PRINT DO' 
			                                onClick={() =>doPrintModal(lineInf)} />)}
										{(deviceApproved==false)&&(
											<SecondaryButton 
			                                compact 
			                                value='PRINT DO' 
			                                onClick={() =>doPrintModal(lineInf)} disabled/>)}
			                            
			                                </label>
							        </Grid.Column>
							    </Grid.Row>
				    	)
					}
					
					 <DoPrint ref={doPrint => doPrints = doPrint} customerInfo={customerInfo} lineInfo={lineInfo} dealerName={dealerName} click='clickForSingleLine'/>
		    	</React.Fragment>
		)	
}


export default EditPartnerFulfillemntBody;