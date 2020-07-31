import React from 'react';
import map from '../../assets/map.svg'

const HomeContainer = () => {
    return (
        <div className="home-container">
            <div className="home-image">
                <img src={map}/>
            </div>
            <div className="home-text">
                <a className="home-text-label">Selamat Datang,</a>
                <a className="home-text-a">di website Geographic Information System</a>
                <a className="home-text-a">Bang Maul</a>
            </div>
        </div>
    );
};

export default HomeContainer;