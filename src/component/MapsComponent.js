import React from 'react';
import Chart from "react-google-charts";
import _ from 'lodash';
import regionData from '../regionData.json';
const MapsComponent = ({keys}) => {
    let ISO_array = []
    if (keys){
        ISO_array.push(['Provinces', 'Population % '])
        _.forEach(regionData, function(value) {
            if (value.id !== regionData[keys.toUpperCase()].id){
                let dataMap = []
                dataMap.push(value.id,null)
                ISO_array.push(dataMap)
            }else{
                ISO_array.push([regionData[keys.toUpperCase()].id,regionData[keys.toUpperCase()].population])
            }
        });
    }else{
        ISO_array.push(['Provinces', 'Population % '])
        _.forEach(regionData, function(value) {
                let dataMap = []
                dataMap.push(value.id,null)
                ISO_array.push(dataMap)
        });
    }

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
            }}
            rootProps={{ 'data-testid': '2' }}
        />
    );
};

export default MapsComponent;