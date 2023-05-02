const isMissing = (value) => {
    return value === null || value === '' || value === undefined
}
const isAlphaNumeric = (value) => {
	   var Exp = /^[0-9a-zA-Z]+$/;
       return (Exp.test(value)) ? true : false;
}

const isAlphaNumericOnlyCapitals = (value) => {
	   var Exp = /^[0-9A-Z]+$/;
       return (Exp.test(value)) ? true : false;
}

export const validateRegTypeInfo = (bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, vsn) => {
    let validationResult = {};

    if (isMissing(bundleType))
        validationResult.missingBundleType = true;
    if (isMissing(orderCategory))
        validationResult.missingOrderCategory = true;
    if (isMissing(brn))
        validationResult.missingBrn = true;

    if (orderCategory === 'Existing Group') {
        if (isMissing(vsn))
            validationResult.missingVsn = true;
        else if(vsn==='New - Not Available Yet')
            validationResult.missingVsn = true;
    }
    if (Object.keys(validationResult).length > 0) {
        validationResult.status = 'FAILURE';
        validationResult.message = 'Missing required attributes.'
    }
    else if (isAlphaNumericOnlyCapitals(brn)  === false)
    {
        validationResult.missingBrn = true;
        validationResult.status = 'FAILURE';
        validationResult.message = 'BRN cannot contain special character';     
    }
    else {
        validationResult.status = 'SUCCESS'
    }
    return validationResult;
}

export const validateAddressContactDetails = (billingAddress, deliveryAddress, picDetails, secondaryPicDetails ) => {
    let validationResult = {};

    if (isMissing(deliveryAddress.postCode))
        validationResult.missingPostCodeDeliveryValue = true;
    if (isMissing(billingAddress.postCode))
        validationResult.missingPostCodeValue = true;
    if (isMissing(billingAddress.address1))
        validationResult.missingAddress1 = true;
    if (isMissing(billingAddress.address2))
        validationResult.missingAddress2 = true;
    if (isMissing(deliveryAddress.address1))
        validationResult.missingdeliveryaddress1 = true;
    if (isMissing(deliveryAddress.address2))
        validationResult.missingdeliveryaddress2 = true;
    if (isMissing(picDetails.picContactNumber) || picDetails.picContactNumber.length<8)
        validationResult.missingPicContactNo = true;
    if (isMissing(picDetails.picName))
        validationResult.missingPicName = true;
    if (isMissing(picDetails.picEMail))
        validationResult.missingPicEmail = true;
    if (isMissing(picDetails.notificationEmail))
        validationResult.missingNotificationEmail = true;
    if (isMissing(deliveryAddress.contactName))
        validationResult.missingContactName = true;
    if (isMissing(deliveryAddress.contactIC) || deliveryAddress.contactIC.length<4 || !isAlphaNumeric(deliveryAddress.contactIC))
        validationResult.missingContactIC = true;
    if (isMissing(deliveryAddress.contactPhoneNo) || deliveryAddress.contactPhoneNo.length<8)
        validationResult.missingContactPhoneNo = true;
    if (isMissing(deliveryAddress.contactEmail))
        validationResult.missingPrimaryContactEmail = true;
    if (isMissing(deliveryAddress.contactFixNo) || deliveryAddress.contactFixNo.length<8)
        validationResult.missingContactFixNo = true;
    if(deliveryAddress.address1 !== null && deliveryAddress.address2 !== null ){
        if(deliveryAddress.address1.length>50 || deliveryAddress.address2.length>50){
            console.log('Inside')
            validationResult.status = 'FAILURE';
            validationResult.message = 'Length exceeding 50 characters'
             return validationResult;
        }
    }
   if(!isMissing(secondaryPicDetails.secondaryPicName)){
    if (isMissing(secondaryPicDetails.secondaryPicEMail))
        validationResult.missingSecondaryPicEMail = true;
    if (isMissing(secondaryPicDetails.secondaryPicContactNumber))
        validationResult.missingSecondaryPicContactNumber = true;
    if (isMissing(secondaryPicDetails.secondaryPicIc))
        validationResult.missingSecondaryPicIc = true;
   }

    if (Object.keys(validationResult).length > 0) {
        validationResult.status = 'FAILURE';
       
        if( isMissing(deliveryAddress.postCode) || isMissing(billingAddress.postCode) || isMissing(billingAddress.address1) ||
           isMissing(billingAddress.address2) || isMissing(deliveryAddress.address1) || isMissing(deliveryAddress.address2) ||
	   isMissing(secondaryPicDetails.secondaryPicName) || isMissing(secondaryPicDetails.secondaryPicEMail) || isMissing(secondaryPicDetails.secondaryPicContactNumber) ||
           isMissing(secondaryPicDetails.secondaryPicIc) || isMissing(picDetails.picContactNumber) || isMissing(picDetails.picName)|| isMissing(picDetails.picEMail)|| 
           isMissing(picDetails.notificationEmail) || isMissing(deliveryAddress.contactName) || isMissing(deliveryAddress.contactIC) ||
           isMissing(deliveryAddress.contactPhoneNo) || isMissing(deliveryAddress.contactFixNo || isMissing(deliveryAddress.contactEmail))){

            validationResult.message = 'Missing required attributes.'
        }
        else if(picDetails.picContactNumber.length<8 || deliveryAddress.contactPhoneNo.length<8
            || deliveryAddress.contactFixNo.length<8 || deliveryAddress.contactIC.length<4){
          validationResult.message = 'Length does not meet the minimum requirement'
        }
        else if(!isAlphaNumeric(deliveryAddress.contactIC)){
            validationResult.message = 'Only Alpha Numeric Values are allowed !'
    }
    } else {
        validationResult.status = 'SUCCESS'
    }
    return validationResult;
}


export const validateSubmissionInfo = (dealerRemarks, supportingCtr, customerSignDate, accountMgr, tnc,cmssDocument,isContractDurationGrtrFourMonths,bundleType, userRole) => {
    let validationResult = {};

    if (isMissing(dealerRemarks))
        validationResult.missingDealerRemarks = true;

    if (isMissing(supportingCtr))
        validationResult.missingSupportingCtr = true;

    if (isMissing(customerSignDate))
        validationResult.missingCustomerSignDate = true;

    if (userRole==='ECO' && isMissing(accountMgr))
        validationResult.missingAccountMgr = true;
    
    if (isMissing(tnc) || tnc===false)
        validationResult.missingTNC = true;

    if(!(isMissing(cmssDocument))){
        if(isMissing(cmssDocument.fileName) && (isContractDurationGrtrFourMonths) &&
         (bundleType === 'MAXIS' || bundleType.toUpperCase() === 'MAXIS'))
        {
            validationResult.missingCMSSDocument = true; 
        }
   
    }
       
    
    if (Object.keys(validationResult).length > 0) {
        validationResult.status = 'FAILURE';
        validationResult.message = 'Missing required attributes.'
    } else {
        validationResult.status = 'SUCCESS'
    }
    return validationResult;
}
