import React from 'react';
import {Table} from "react-bootstrap";
import {connect} from "react-redux";

const RegionList = (props) => {

    let data
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


    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((val)=>{
                        return (
                            <tr>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
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