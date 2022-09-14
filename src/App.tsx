import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import styled from 'styled-components';

import Header from './segments/Header';
import Footer from './segments/Footer';

import Home from './pages/Home';
import PressKit from './pages/PressKit';
import RedirectToPlatform from './components/RedirectToDiffUrl';


function App() {
    // Initialize GA
    ReactGA.initialize('UA-165415629-2');
    ReactGA.pageview('/entry');

    return (
        <AppWrapper>
            <Header />
            <ParentContainer>
                <Routes>
                    {/* add all the route paths here */}
                    <Route path="/" element={<Home />} />
                    <Route path="/presskit" element={<PressKit />} />
                    <Route path="/notify" element={<RedirectToPlatform />} />
                </Routes>
            </ParentContainer>
            <Footer />
        </AppWrapper>
    );
}

const AppWrapper = styled.div`
    background: #121315;
`;

const ParentContainer = styled.div`
	flex-wrap: wrap;
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export default App;
