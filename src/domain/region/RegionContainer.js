import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import FormOption from "../../component/FormOption";
import {getDistrict, getProvince, getSubDistrict, getToken, getVillage} from "./RegionService";
import regionData from "../../regionData.json";
import MapsComponent from "../../component/MapsComponent";
import {setDistrict, setProvince, setSubDistrict, setVillage} from "../../redux/reducer/action/region/Region";
import {connect} from "react-redux";
import {Form,Col} from "react-bootstrap";

const RegionContainer = (props) => {
    const [token,setToken] = useState("")
    const firstUpdate = useRef(true);
    const [selectedRegion,setSelectedRegion] = useState({
        province : {},
        districts : {},
        subDistrict : {},
        village : {}
    })
    const [coords,setCoords] = useState({
        lat: 0.7893,
        lng: 113.9213,
        data:[],
        zoom: 4,
    })


    useEffect(()=>{
        gettedToken().then((result)=>{
            gettingProvince(result)
        })
    },[token])


    useLayoutEffect(()=>{
        if (firstUpdate.current) {
            return;
        }
        setRegionData(selectedRegion.province.name)
        props.setDistrict([])
        props.setSubDistrict([])
        props.setVillage([])
        gettingDistrict()
    },[selectedRegion.province])


    useLayoutEffect(()=>{
        if (firstUpdate.current) {
            return;
        }
        props.setSubDistrict([])
        props.setVillage([])
        gettingSubDistrict()
    },[selectedRegion.districts])

    useLayoutEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        props.setVillage([])
        gettingVillage()
    },[selectedRegion.subDistrict])


    const setRegionData = (name)=>{
        setCoords({
            ...coords,
            lat: regionData[name] ? regionData[name].centerCoord.lat :coords.lat ,
            lng: regionData[name] ? regionData[name].centerCoord.lng : coords.lng ,
            data: regionData[name] ? regionData[name].data : [],
            zoom: regionData[name] ? 6 : coords.zoom
        })
        console.log(name)
    }

    const handleChange = (key,val)=>{
        const res = val.split(":")
        setSelectedRegion({
            ...selectedRegion,
            [key] :{
                ...selectedRegion[key],
                id : res[0],
                name : res[1]
            }
        })
    }

    const gettedToken = async function() {
        let x = await gettingToken()
        return x
    }

    const gettingToken = ()=>{
        getToken().then((result)=>{
            if (result.code === 200){
                sessionStorage.setItem('token',`MeP7c5ne${result.token}`)
                setToken(`MeP7c5ne${result.token}`)
            }
        }).catch((error)=>{
            console.log(error)
        })
        return sessionStorage.getItem('token')
    }

    const gettingProvince = (key)=>{
        getProvince(key).then((result)=>{
            if (result.code === 200){
                props.setProvince(result.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    const gettingDistrict = ()=>{
        getDistrict(token,selectedRegion.province.id).then((result)=>{
            if (result.code === 200){
                props.setDistrict(result.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    const gettingSubDistrict = ()=>{
        getSubDistrict(token,selectedRegion.districts.id).then((result)=>{
            if (result.code === 200){
                props.setSubDistrict(result.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    const gettingVillage = ()=>{
        getVillage(token,selectedRegion.subDistrict.id).then((result)=>{
            if (result.code === 200){
                props.setVillage(result.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div>
        <div>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Provinsi</Form.Label>
                        <FormOption keys="province" disable={props.province.length === 0} change={(key, val)=>handleChange(key,val)}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Kab / Kota</Form.Label>
                        <FormOption  keys="districts" disable={props.districts.length === 0} change={(key,val)=>handleChange(key,val)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Kecamatan</Form.Label>
                        <FormOption  keys="subDistrict" disable={props.subDistrict.length === 0} change={(key,val)=>handleChange(key,val)}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Kelurahan</Form.Label>
                        <FormOption  keys="village" disable={props.village.length === 0} change={(key,val)=>handleChange(key,val)}/>
                    </Form.Group>
                </Form.Row>
            </Form>
        </div>
        <div>
            <MapsComponent coords={coords}/>
        </div>
        </div>
    );
};

const mapStateToProps = (state) =>{
    return{
        province : state.regionReducer.regionTodo.province,
        districts : state.regionReducer.regionTodo.districts,
        subDistrict: state.regionReducer.regionTodo.subDistrict,
        village : state.regionReducer.regionTodo.village
    }
}

const mapDispatchToProps = {
    setProvince : setProvince,
    setDistrict : setDistrict,
    setSubDistrict : setSubDistrict,
    setVillage : setVillage
}

export default connect(mapStateToProps,mapDispatchToProps)(RegionContainer);