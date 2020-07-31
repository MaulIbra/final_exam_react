import React, {useState} from 'react';
import {Map, Polygon, TileLayer} from "react-leaflet";

const MapsComponent = ({coords}) => {

    const position = [coords.lat, coords.lng]
    return (
        <Map className="map" center={position} zoom={coords.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             <Polygon color="red" positions={coords.data} />
        </Map>
    );
};

export default MapsComponent;