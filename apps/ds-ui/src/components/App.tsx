import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Header } from './common/header';
import { Footer } from './common/footer';
import { SizeIndicator } from './common/SizeIndicator';
import { ReadPage } from './read/ReadPage';
import { Home } from './home/Home';
import { DoPage } from './do/DoPage';
import { Help } from './common/Help';
import { FourOhFour } from './common/FourOhFour';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { PrayerPage } from './prayer/PrayerPage';
import { PlansPage } from './plans/PlansPage';

export function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route key="/" path="/" element={<Home />} />
            <Route key="/prayer" path="/prayer" element={<PrayerPage />} />
            <Route key="/read" path="/read" element={<ReadPage />} />
            <Route key="/do" path="/do" element={<DoPage />} />
            <Route key="/plans" path="/plans" element={<PlansPage />} />
            <Route key="/help" path="/help" element={<Help />} />
            <Route path="*" element={<FourOhFour />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
      <div aria-live="polite" aria-atomic="true">
        <ToastContainer position="top-end" id="main-toast-container" />
      </div>
      <SizeIndicator />
    </div>
  );
}
