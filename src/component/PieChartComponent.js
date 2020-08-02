import React from 'react';
import Chart from "react-google-charts";
import _ from "lodash";
import regionData from "../regionData.json";

const PieChartComponent = ({keys}) => {
    let ISO_array = []
    let keysId = keys ? keys.toUpperCase() : '';
    ISO_array.push(['Tahun', 'Populasi'])
    if (regionData[keysId]){
        _.forEach(regionData[keysId].population, function(value,key) {
            let dataMap = []
            dataMap.push(key,value)
            ISO_array.push(dataMap)
        });
    }else{
        ISO_array.push(["0",100])
    }


    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={
                ISO_array
            }
            options={{
                title: 'Proyeksi Penduduk menurut Provinsi, 2010-2035',
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default PieChartComponent;