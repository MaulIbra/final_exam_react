import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import FormOption from "../../component/FormOption";
import {getDistrict, getProvince, getSubDistrict, getToken, getVillage} from "./RegionService";
import MapsComponent from "../../component/MapsComponent";
import {setDistrict, setProvince, setSubDistrict, setVillage} from "../../redux/reducer/action/region/Region";
import {connect} from "react-redux";
import {Form,Col} from "react-bootstrap";
import RegionList from "./RegionList";

const RegionContainer = (props) => {
    const firstUpdate = useRef(true);
    const [selectedRegion,setSelectedRegion] = useState({
        province : {},
        districts : {},
        subDistrict : {},
        village : {}
    })


    useEffect(()=>{
        gettingProvince()
    },[])


    useLayoutEffect(()=>{
        if (firstUpdate.current) {
            return;
        }
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

    const gettingProvince = ()=>{
        getProvince().then((result)=>{
            props.setProvince(result.provinsi)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const gettingDistrict = ()=>{
        getDistrict(selectedRegion.province.id).then((result)=>{
            props.setDistrict(result.kota_kabupaten)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const gettingSubDistrict = ()=>{
        getSubDistrict(selectedRegion.districts.id).then((result)=>{
            props.setSubDistrict(result.kecamatan)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const gettingVillage = ()=>{
        getVillage(selectedRegion.subDistrict.id).then((result)=>{
            props.setVillage(result.kelurahan)
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className="container-region">
            <div className="container-map">
                <MapsComponent keys={selectedRegion.province.name}/>
            </div>
            <div className="container-form">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Provinsi</Form.Label>
                            <FormOption keys="province" disable={props.province.length === 0} change={(key, val)=>handleChange(key,val)} data={props.province}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Kab / Kota</Form.Label>
                            <FormOption  keys="districts" disable={props.districts.length === 0} change={(key,val)=>handleChange(key,val)} data={props.districts}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Kecamatan</Form.Label>
                            <FormOption  keys="subDistrict" disable={props.subDistrict.length === 0} change={(key,val)=>handleChange(key,val)} data={props.subDistrict}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Kelurahan</Form.Label>
                            <FormOption  keys="village" disable={props.village.length === 0} change={(key,val)=>handleChange(key,val)} data={props.village}/>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <div className="container-list">
                    <RegionList/>
                </div>
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