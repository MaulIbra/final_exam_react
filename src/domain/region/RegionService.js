import axios from 'axios'

const BASE_URL = "https://x.rajaapi.com/"

const getToken = async function(){
    const response = await axios.get(BASE_URL+'poe')
    return response.data
}

const getProvince = async function(token){
    const response = await axios.get(BASE_URL+token+'/m/wilayah/provinsi')
    return response.data
}

const getDistrict = async function(token,id){
    const response = await axios.get(BASE_URL+token+'/m/wilayah/kabupaten?idpropinsi='+id)
    return response.data
}

const getSubDistrict = async function(token,id){
    const response = await axios.get(BASE_URL+token+'/m/wilayah/kecamatan?idkabupaten='+id)
    return response.data
}

const getVillage = async function(token,id){
    const response = await axios.get(BASE_URL+token+'/m/wilayah/kelurahan?idkecamatan='+id)
    return response.data
}

export {getToken,getProvince,getDistrict,getSubDistrict,getVillage}