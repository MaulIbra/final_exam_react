import axios from 'axios'

const BASE_URL = "https://dev.farizdotid.com/api/daerahindonesia"

const getProvince = async function(){
    const response = await axios.get(BASE_URL+'/provinsi/')
    return response.data
}

const getDistrict = async function(id){
    const response = await axios.get(BASE_URL+'/kota?id_provinsi='+id)
    return response.data
}

const getSubDistrict = async function(id){
    const response = await axios.get(BASE_URL+'/kecamatan?id_kota='+id)
    return response.data
}

const getVillage = async function(id){
    const response = await axios.get(BASE_URL+'/kelurahan?id_kecamatan='+id)
    return response.data
}

export {getProvince,getDistrict,getSubDistrict,getVillage}