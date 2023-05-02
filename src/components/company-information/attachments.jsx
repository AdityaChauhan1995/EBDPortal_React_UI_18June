import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { SecondaryButton } from '../common/buttons';

const Attachments = ({ mode, attachments, selectFile, downloadFile, showerror }) => {

    return (
        <Grid>
            
            {
                attachments.map(item =>
                   <Grid.Row key={item.documentDesc} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, paddingBottom: 2 }}>
                        <Grid.Column width={4}>
                           {((mode ==='submission' && item.documentDesc !== 'CMSS Document') || (mode ==='Approval')  || (mode === 'View') || (mode === 'Resubmission' && item.documentDesc !== 'CMSS Document' && item.documentDesc !== 'Bank stmts')  ) && <label>
                                {item.documentDesc}
                                {
                                    item.compulsory && item.documentDesc !== 'CMSS Document' && <font color='red'>*</font>

                                }
                                {
                                    item.compulsory && showerror && item.documentDesc !== 'CMSS Document' && <Icon style={{ paddingLeft: 5 }} name='question circle' color='red' />
                                }
                            </label>}
                        </Grid.Column>
                        <Grid.Column width={2}>
                            {((mode ==='submission' && item.documentDesc !== 'CMSS Document') || (mode ==='Approval')  || (mode === 'View') || (mode === 'Resubmission' && item.documentDesc !== 'CMSS Document' && item.documentDesc !== 'Bank stmts'))  && <label>
                            <SecondaryButton 
                                compact 
                                disabled={mode === 'Approval' || mode === 'View'}
                                value='SELECT' 
                                onClick={() => { item.ref.current.click() }} />

                            <input type='file' style={{ display: 'none' }} ref={item.ref}
                                onChange={(e) => { selectFile(item, e.target.files[0]) }} />
                                </label>}
                        </Grid.Column>
                        <Grid.Column width={4}>
                            { ((mode ==='submission' && item.documentDesc !== 'CMSS Document') || (mode ==='Approval')  || (mode === 'View') || (mode === 'Resubmission' && item.documentDesc !== 'CMSS Document' && item.documentDesc !== 'Bank stmts')) &&
                                item.fileName && <label className='labelBold' onClick={() => downloadFile(item)}>[{item.fileName}]</label>
                            }
                        </Grid.Column>
                    </Grid.Row>
                )
            }
        </Grid>
    )
}
export default Attachments;