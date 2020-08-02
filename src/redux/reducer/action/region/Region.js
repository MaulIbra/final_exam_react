export const setProvince = (val)=>{
    return {
        type : 'SET_PROVINCE',
        payload : val
    }
}

export const setDistrict = (val) =>{
    return{
        type : 'SET_DISTRICT',
        payload : val
    }
}

export const setSubDistrict = (val) =>{
    return{
        type : 'SET_SUB_DISTRICT',
        payload:val
    }
}

export const setVillage = (val) =>{
    return{
        type : 'SET_VILLAGE',
        payload : val
    }
}