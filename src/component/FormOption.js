import React from 'react';
import {Form} from 'react-bootstrap'
import {connect} from "react-redux";

const FormOption = (props) => {
    const {change,keys,disable,data} = props

    let label = {}
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
            <Form.Control as="select" onChange={e => {change(keys,e.target.value)}} disabled={disable} data-test="option-selected" >
                <option>{`-- Pilih ${label} --`}</option>
                {
                    data.map((val)=>{
                        return <option key={val.id} value={`${val.id}:${val.name}`}>{val.name}</option>
                    })
                }
            </Form.Control>
        </div>
    );
};



export default FormOption;