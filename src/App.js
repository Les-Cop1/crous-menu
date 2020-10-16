import React from 'react';
import './App.css';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import Index from "./components/Index";
import Header from "./components/Header";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Footer from "./components/Footer";

library.add(fab, fas)

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
