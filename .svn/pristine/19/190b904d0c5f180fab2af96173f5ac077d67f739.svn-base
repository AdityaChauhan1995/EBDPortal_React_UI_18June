import React from 'react';
import { Header, Grid } from 'semantic-ui-react';


export const DynamicHeader = ({ ...props }) => {
  return (
    <Header as='h5'>
      {props.value}
    </Header>
  )
}


export const StaticBlock1 = ({
  ...props
}) => {
  return (
    <React.Fragment>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }}  >
          <label className='heading'>Business Registration No.</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.brn}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Company Name</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.companyName}</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }} >
          <label className='heading'>Registered Service No.</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='dangerText' style={{ fontWeight: 'bold' }}>
          <label>{props.selectedVSN}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Order Category</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.orderCategory}</label>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )

}

export const StaticBlock2 = ({ ...props }) => {
  return (
    <React.Fragment>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column width={4} className='heading' style={{ paddingLeft: 0 }} >
          <label>Master Reg Id:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          {props.data.masterRegId}
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='heading'>
          <label>Master Reg Status:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          {props.data.masterRegStatus}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column width={4} className='heading' style={{ paddingLeft: 0 }} >
          <label>Reg Status:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='dangerText'>
          {props.data.regStatus}
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='heading'>
          <label>Total Members:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          {props.data.totalMembers}
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )
}


export const StaticBlock4 = ({ ...props }) => {
  let val=0;
  return (
    <React.Fragment>
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width='16'>
          <label className='heading'>Summary</label>
        </Grid.Column>
      </Grid.Row>
      {(props.orderCategory!==undefined && props.orderCategory==='Existing Group') &&
        <React.Fragment>
            <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
              <Grid.Column width='4' >
                Existing Fund Available:
                    </Grid.Column>
              <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                {(props.previousFundAmount !== '') && (<div>RM: {props.previousFundAmount}</div>)}
                 {(props.previousFundAmount === '') && (<div>RM: 0</div>)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
              <Grid.Column width='4' >
                New Fund Approved:
                    </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.totalFundAmount}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Adjustment from Device Order:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    <div>RM: {props.totalAdjAmount}</div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
              <Grid.Column width='4' >
                Total Fund Available
                    </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    {(props.previousFundAmount !== '') && (<div>RM: {props.previousFundAmount + props.totalFundAmount + props.totalAdjAmount}</div>)}
                    {(props.previousFundAmount === '') && (<div>RM: {props.totalFundAmount + props.totalAdjAmount}</div>)}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Device Order:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    {props.totalQuantity}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Device Price:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.totalPrice}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Fund Used:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    {(props.previousFundAmountUsed !== '') && (<div>RM: {props.previousFundAmountUsed + props.deviceFundUsed}</div>)}
                    {(props.previousFundAmountUsed === '') && (<div>RM: {props.deviceFundUsed}</div>)}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Fund Balance
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    {(props.previousFundAmount !== '') && (props.previousFundAmountUsed !== '') && (<div>RM: {val=((props.previousFundAmount + props.totalFundAmount) - (props.previousFundAmountUsed + props.deviceFundUsed) + props.totalAdjAmount)<0?0:((props.previousFundAmount + props.totalFundAmount) - (props.previousFundAmountUsed + props.deviceFundUsed) + props.totalAdjAmount) }</div>)}
                    {(props.previousFundAmount === '') && (props.previousFundAmountUsed !== '') && (<div>RM: {val=((props.totalFundAmount) - (props.previousFundAmountUsed + props.deviceFundUsed) + props.totalAdjAmount)<0?0:((props.totalFundAmount) - (props.previousFundAmountUsed + props.deviceFundUsed) + props.totalAdjAmount) }</div>)}
                    {(props.previousFundAmount !== '') && (props.previousFundAmountUsed === '') && (<div>RM: {val=((props.previousFundAmount + props.totalFundAmount) - (props.deviceFundUsed) + props.totalAdjAmount)<0?0:((props.previousFundAmount + props.totalFundAmount) - (props.deviceFundUsed) + props.totalAdjAmount) }</div>)}
                    {(props.previousFundAmount === '') && (props.previousFundAmountUsed === '') && (<div>RM: {val=((props.totalFundAmount - props.deviceFundUsed) + props.totalAdjAmount)<0?0:((props.totalFundAmount - props.deviceFundUsed) + props.totalAdjAmount) }</div>)}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Estimated Amount Payable:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.amountPayable}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Estimated TAX Payable:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.tax}
                </Grid.Column>
            </Grid.Row>
        </React.Fragment>
      }
        {(props.orderCategory===undefined || props.orderCategory==='New Group') &&
        <React.Fragment>
            <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                <Grid.Column width='4' >
                    New Fund Approved:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.totalFundAmount}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Adjustment from Device Order:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    <div>RM: {props.totalAdjAmount}</div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Fund Available
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.totalFundAmount + props.totalAdjAmount}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Device Order:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    {props.totalQuantity}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Device Price:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.totalPrice}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Fund Used:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.deviceFundUsed}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Total Fund Balance:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.deviceFundLeft}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Estimated Amount Payable:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.amountPayable}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                <Grid.Column width='4' >
                    Estimated TAX Payable:
                </Grid.Column>
                <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                    RM: {props.tax}
                </Grid.Column>
            </Grid.Row>
        </React.Fragment>
        }
    </React.Fragment>
  )
}

export const StaticBlock5 = ({ ...props }) => {
  return (
    <React.Fragment>
      <Grid.Row style={{ padding: 0, paddingTop: 10 }}>
        <Grid.Column width={4} >
          <label className='heading'>Business Registration No</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.custBrnNo}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' >
          <label className='heading'>Company Name</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.companyName}</label>
        </Grid.Column>
        </Grid.Row>
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width={4} >
          <label className='heading'>Master Reg Id:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.masterRegId}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' >
          <label className='heading'>Product Category</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.prodCatName}</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width={4} >
          <label className='heading'>Master Reg Status:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.masterRegStatus}</label>
        </Grid.Column>
        <Grid.Column width={4}>
          <label className='heading'>Registered Service No:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='dangerText' style={{ fontWeight: 'bold' }}>
         <label>{props.virtualServiceNo}</label>
        </Grid.Column>
      </Grid.Row>
      {(props.toShowAccountNo != undefined && props.toShowAccountNo) &&
        (props.accountNo != undefined && props.accountNo != null) &&
      <Grid.Row>
      <Grid.Column width={8}/>
      <Grid.Column width={4}>
          <label className='heading'>Account No:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
         <label>{props.accountNo}</label>
        </Grid.Column>
        </Grid.Row>
      }  
      <Grid.Row style={{ padding: 0, paddingTop: 30 }}>
        <Grid.Column width={4} >
          <label className='heading'>Package Selected:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.easPackageName}</label>
        </Grid.Column>
        <Grid.Column width={4} >
          <label className='heading'>Total Members:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.totalMemberString}</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width={4} textAlign='left' >
          <label className='heading'>Contact Mode:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.contactMode}</label>
        </Grid.Column>
      </Grid.Row>
      </React.Fragment>
  )
}

export const StaticBlock6 = ({ ...props }) => {
  let val=0;
  return (
      <React.Fragment>
          {(props.orderCategory===undefined || props.orderCategory==='Existing Group') &&
          (
              <React.Fragment>
                  <Grid.Row style={{ padding: 0, paddingTop: 20 }}>
                      <Grid.Column width='16'>
                          <label className='heading'>Summary</label>
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ padding: 0, paddingTop: 10, fontSize: 12 }}>
                      <Grid.Column width='3' >
                          Total Adjustment Fund:
                      </Grid.Column>
                      <Grid.Column width='1' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                          {props.totalAdjAmount}
                      </Grid.Column>
                  </Grid.Row>
              </React.Fragment>
          )

          }
          {(props.orderCategory===undefined || props.orderCategory==='New Group') &&

          <React.Fragment>
              <Grid.Row style={{ padding: 0 }}>
                  <Grid.Column width='16'>
                      <label className='heading'>Summary</label>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      New Fund Approved:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      RM: {props.totalFundAmount}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Total Adjustment from Device Order:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      <div>RM: {props.totalAdjAmount}</div>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Total Fund Available
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      RM: {props.totalFundAmount + props.totalAdjAmount}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Total Device Order:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      {props.totalQuantity}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Total Device Price:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      RM: {props.totalPrice}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Total Fund Used:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      RM: {props.deviceFundUsed}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 15, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Total Fund Balance:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      RM: {props.deviceFundLeft}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Estimated Amount Payable:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      RM: {props.amountPayable}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                  <Grid.Column width='4' >
                      Estimated TAX Payable:
                  </Grid.Column>
                  <Grid.Column width='12' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                      RM: {props.tax}
                  </Grid.Column>
              </Grid.Row>
          </React.Fragment>
          }
      </React.Fragment>
  )


}
export const StaticBlock7 = ({
  ...props
}) => {
  return (
    <React.Fragment>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }}  >
          <label className='heading'>Business Registration No.</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.brn}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Company Name</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.companyName}</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }} >
          <label className='heading'>Master Reg Id</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='dangerText' style={{ fontWeight: 'bold' }}>
          <label>{props.masterRegId}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Order Category</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.orderCategory}</label>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )

}
export const StaticBlock8 = ({ ...props }) => {
  return (
    <React.Fragment>
      <Grid.Row style={{ padding: 0, paddingTop: 10 }}>
        <Grid.Column width={4} >
          <label className='heading'>Business Registration No</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.custBrnNo}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' >
          <label className='heading'>Company Name</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.companyName}</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width={4} >
          <label className='heading'>Master Reg Id:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.masterRegId}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' >
          <label className='heading'>Product Category</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.prodCatName}</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width={4} >
          <label className='heading'>Master Reg Status:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.masterRegStatus}</label>
        </Grid.Column>
      </Grid.Row>

    </React.Fragment>
  )
}


export const StaticBlock9 = ({ ...props }) => {
  return (
    <React.Fragment>
      <Grid.Row style={{ padding: 0, paddingTop: 10 }}>
        <Grid.Column width={4} >
          <label className='heading'>Business Registration No</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.custBrnNo}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' >
          <label className='heading'>Company Name</label>
        </Grid.Column><Grid.Column width={4} textAlign='left'>
          <label>{props.companyName}</label>
        </Grid.Column>
        </Grid.Row>
          <Grid.Row style={{ padding: 0 }}>
           <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Master Reg Id:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.masterRegId}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='heading'>
        <label className='heading'>Master Reg Status:</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          {props.masterRegStatus}
        </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ padding: 0 }}>
           <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Product Group</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.productGroup}</label>
        </Grid.Column>
        </Grid.Row>
        </React.Fragment>
  )
}
export const StaticBlock10 = ({
  ...props
}) => {
  let regIds=null;
  if(props.masterRegId!==null){
    regIds = <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }} >
          <label className='heading'>Master Reg Id</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='dangerText' style={{ fontWeight: 'bold' }}>
          <label>{props.masterRegId}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Order Category</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.orderCategory}</label>
        </Grid.Column>
      </Grid.Row>
  }
  else if(props.regId!==null){
    regIds = <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }} >
          <label className='heading'>Reg Id</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left' className='dangerText' style={{ fontWeight: 'bold' }}>
          <label>{props.regId}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Order Category</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.orderCategory}</label>
        </Grid.Column>
      </Grid.Row>
  }
  return (
    <React.Fragment>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }}  >
          <label className='heading'>Business Registration No.</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.brn}</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label className='heading'>Company Name</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.companyName}</label>
        </Grid.Column>
      </Grid.Row>
      {regIds}
      <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }}  >
          <label className='heading'>Master Reg Status</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.masterRegStatus}</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Grid.Column width={4} style={{ paddingLeft: 0 }}  >
          <label className='heading'>Device Fulfillment Option</label>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <label>{props.deviceFulfillmentoption}</label>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )

}

export const StaticBlock11 = ({ ...props }) => {
  
   return (
       <React.Fragment>
               <Grid.Row style={{ paddingTop: 10 }}>
                  
               </Grid.Row>
               <Grid.Row  style={{ padding: 0, paddingTop: 10, fontSize: 12 }}>
                   <Grid.Column width='3' >
                       Total Device Order:
                   </Grid.Column>
                   <Grid.Column width='4' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                        {props.totalLines}
                   </Grid.Column>
               </Grid.Row>
               <Grid.Row style={{ padding: 0, paddingTop: 5, fontSize: 12 }}>
                   <Grid.Column width='3' >
                       Total Device TopUp:
                   </Grid.Column>
                   <Grid.Column width='4' style={{ paddingLeft: 0, color: '#293895', fontWeight: 'bold' }} >
                       RM: {props.totalDeviceTopUp}
                   </Grid.Column>
               </Grid.Row>
           </React.Fragment>

   )
 
 
 }
