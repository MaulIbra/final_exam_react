import React from 'react';
import NavbarComponent from "../component/NavbarComponent";
import HomeContainer from "./home/HomeContainer";
import RegionContainer from "./region/RegionContainer";
import {Route, Switch} from "react-router-dom";


const MainPage = () => {
    return (
        <div>
            <NavbarComponent/>
            <Switch>
                <Route path="/" exact>
                    <HomeContainer/>
                </Route>
                <Route path="/region">
                    <RegionContainer/>
                </Route>
                <Route path="*">
                    <h5>Not Found</h5>
                </Route>
            </Switch>
        </div>
    );
};

export default MainPage;