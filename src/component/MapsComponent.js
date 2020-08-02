import React from 'react';
import Chart from "react-google-charts";
import _ from 'lodash';
import regionData from '../regionData.json';
const MapsComponent = ({keys}) => {
    let ISO_array = []
    let keysId = keys ? keys.toUpperCase() : '';
    ISO_array.push(['Provinces', 'Population % '])
    _.forEach(regionData, function(value) {
        if (regionData[keysId]){
            if (value.id !== regionData[keysId].id){
                let dataMap = []
                dataMap.push(value.id,null)
                ISO_array.push(dataMap)
            }else{
                ISO_array.push([regionData[keysId].id,regionData[keys.toUpperCase()].population])
            }
        }else{
            let dataMap = []
            dataMap.push(value.id,null)
            ISO_array.push(dataMap)
        }
    });

    return (
        <Chart
            className="map"
            chartType="GeoChart"
            data={
                ISO_array
            }
            mapsApiKey="AIzaSyAnwjnAqQckxUUOxsRq_Ajzzya8VV1u9IU"
            options={{
                datalessRegionColor: '#123456',
                resolution:'provinces',
                colorAxis: { colors: ['green', 'red'] },
                region: 'ID',
                title: 'PETA INDONESIA',
            }}
            rootProps={{ 'data-testid': '2' }}
        />
    );
};

export default MapsComponent;