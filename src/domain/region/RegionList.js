import React, {useEffect, useState} from 'react';
import {Table,Form,Pagination} from "react-bootstrap";
import {connect} from "react-redux";
import _ from 'lodash'

const RegionList = (props) => {
    const [keywoard,setKeywoard] = useState("")
    const [mapData,setMapData] = useState([])
    const [pagination,setPagination] = useState({
        rowPerpage: 8,
        activePage :1,
    })

    let data = [],items = [];
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
        setMapData(data)
        setPagination({
            ...pagination,
            activePage: 1
        })
        handlePagination(1)
    },[props.districts,props.province,props.subDistrict,props.village])

    useEffect(()=>{
        var results=_.filter(data,function(item){
            return item.name.toLowerCase().includes(keywoard.toLowerCase());
        });
        setMapData(results)
    },[keywoard])

    useEffect(()=>{
        items = []
        createPagination()
    },[pagination.activePage])


    const handlePagination = (page)=>{
        if (page > 0 && page <= Math.ceil(data.length/pagination.rowPerpage)){
            setMapData(data.slice((pagination.rowPerpage * page)-pagination.rowPerpage,page * pagination.rowPerpage))
            setPagination({
                ...pagination,
                activePage: Number(page)
            })
        }
    }

    const createPagination = ()=>{
        for (let number = 1; number <= Math.ceil(data.length/pagination.rowPerpage); number++) {
            if (number === pagination.activePage){
                items.push(<Pagination.Item key={number} onClick={e=>handlePagination(e.target.text)} active >{number}</Pagination.Item>);
            }else{
                items.push(<Pagination.Item key={number} onClick={e=>handlePagination(e.target.text)}>{number}</Pagination.Item>);
            }
        }
    }

    let showData = mapData.length === 0 ? data.slice(0,8) : mapData
    createPagination()

    return (
        <div className="container-regionlist">
            <div className="region-list-input">
                <Form.Control type="text" placeholder="Search ... "  value={keywoard} onChange={e=>setKeywoard(e.target.value)} />
            </div>
            <div className="region-list-table">
                <Table striped bordered hover>
                    <thead>
                    <tr className="d-flex">
                        <td className="col-6">ID</td>
                        <td className="col-6">Name</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        showData.map((val)=>{
                            return (
                                <tr className="d-flex">
                                    <td className="col-6">{val.id}</td>
                                    <td className="col-6">{val.name}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
            <div className="region-list-pagination">
                <Pagination>
                    <Pagination.Prev onClick={()=>handlePagination(pagination.activePage-1)} />
                    {items}
                    <Pagination.Next onClick={()=>handlePagination(pagination.activePage+1)}/>
                </Pagination>
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