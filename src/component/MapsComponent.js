import React from 'react';
import Chart from "react-google-charts";
import regionData from '../regionData.json'
const MapsComponent = ({keys}) => {

    console.log(regionData[keys])
    return (
        <Chart
            className="map"
            chartType="GeoChart"
            data={[
                ["abv", "population%"],
                [`${regionData[keys] ? regionData[keys].id: "ID-AC"}`, `${regionData[keys] ? regionData[keys].population: 2}`],
            ]}
            mapsApiKey="AIzaSyAnwjnAqQckxUUOxsRq_Ajzzya8VV1u9IU"
            options={{
                region: "ID",
                resolution: "provinces",
                colors: ['blue']
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default MapsComponent;