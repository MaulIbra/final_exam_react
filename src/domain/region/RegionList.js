import React, {useEffect, useState} from 'react';
import {Table,Form} from "react-bootstrap";
import {connect} from "react-redux";
import _ from 'lodash'

const RegionList = (props) => {
    const [keywoard,setKeywoard] = useState("")
    const [mapData,setMapData] = useState([])

    let data = []
    if (props.village.length === 0){
        if (props.subDistrict.length === 0){
            if (props.districts.length === 0){
                data = props.province
            }else {
                data = props.districts
            }
        }else {
            data = props.subDistrict
        }
    }else{
        data = props.village
    }

    useEffect(()=>{
        var results=_.filter(data,function(item){
            return item.nama.toLowerCase().includes(keywoard.toLowerCase());
        });
        setMapData(results)
    },[keywoard])

    let showData = keywoard === "" ? data : mapData

    return (
        <div className="container-regionlist">
            <div className="region-list-input">
                <Form.Control type="text" placeholder="Search ... "  value={keywoard} onChange={e=>setKeywoard(e.target.value)} />
            </div>
            <div className="region-list-table">
            <Table striped bordered hover>
                <thead>
                <tr className="d-flex">
                    <td className="col-5">ID</td>
                    <td className="col-7">Name</td>
                </tr>
                </thead>
                <tbody>
                {
                    showData.map((val)=>{
                        return (
                            <tr className="d-flex">
                                <td className="col-5">{val.id}</td>
                                <td className="col-7">{val.nama}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
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


export default connect(mapStateToProps,null)(RegionList);