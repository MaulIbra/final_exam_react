import React from 'react';
import {Form} from 'react-bootstrap'
import {connect} from "react-redux";

const FormOption = (props) => {
    const {change,keys,disable} = props

    let label
    switch (keys) {
        case "province":
            label = "Provinsi"
            break
        case "districts":
            label = "Kabupaten"
            break
        case "subDistrict":
            label = "Kecamatan"
            break
        case "village":
            label = "Kelurahan"
            break
        default:
            break
    }

    return (
        <div>
            <Form.Control as="select" onChange={e => {change(keys,e.target.value)}} disabled={disable}>
                <option>{`-- Pilih ${label} --`}</option>
                {
                    props[keys].map((val)=>{
                        return <option key={val.id} value={`${val.id}:${val.name}`}>{val.name}</option>
                    })
                }
            </Form.Control>
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

export default connect(mapStateToProps,null)(FormOption);