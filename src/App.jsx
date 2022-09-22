import React,{ useState,useEffect,useRef } from 'react'
import {Route,Routes} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home'

function App() 
{
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path='/no' element={<span>spaaaan</span>} />
          <Route path="/search" element={<Home />}>
            <Route path=":id" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App
