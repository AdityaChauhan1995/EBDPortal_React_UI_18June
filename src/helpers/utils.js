export const isMissing = (value) => {
    return value === null || value === '' || value === undefined
}

export const isChangedToSuccess = (prev, now) => {
    if(prev !== 'SUCCESS' && now === 'SUCCESS'){
        return true;
    }else{
        return false;
    }
}

export const isChangedToRejected = (prev, now) => {
    if(prev !== 'FAILED' && now === 'FAILED'){
        return true;
    }else{
        return false;
    }
}