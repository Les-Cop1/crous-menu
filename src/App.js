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
import { animateScroll as scroll } from "react-scroll";
import ScrollButton from 'react-scroll-button'

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
            <ScrollButton
                behavior={'auto'}
                buttonBackgroundColor={'#d30304'}
                iconType={'chevron-up'}
                style= {{fontSize: '24px'}}
                onClick={() => scroll.scrollToTop({smooth: true, duration: 300, delay: 0})}
            />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
