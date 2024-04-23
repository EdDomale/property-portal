import React from 'react';
import { Helmet } from "react-helmet-async";
import HeaderSearchAndGallery from './components/HeaderSearchAndGallery';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <main>
      <Helmet>
        <meta httpEquiv="Content-Security-Policy" content={"script-src 'self';"}></meta>
      </Helmet>
      <HeaderSearchAndGallery  />
      <Footer />
    </main>
  );
}

export default App;
