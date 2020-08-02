import React from 'react';
import Chart from "react-google-charts";
import _ from 'lodash';
import regionData from '../regionData.json';
const MapsComponent = ({keys}) => {

    let ISO_array = []
    ISO_array.push(['Provinces', 'Population % '],[regionData[keys],null])
    _.forEach(regionData, function(value) {
        if (value.id !== regionData[keys]){
            let dataMap = []
            dataMap.push(value.id,value.population)
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
                colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
                resolution:'provinces',
                defaultColor: 'green',
                region: 'ID',
            }}
            rootProps={{ 'data-testid': '2' }}
        />
    );
};

export default MapsComponent;