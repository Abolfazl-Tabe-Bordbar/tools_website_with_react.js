import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy , Suspense } from "react";

import TheHeader from "./components/TheHeader";


const Home = lazy(() => import("./components/Home"));
const Azan = lazy(() => import("./components/Azan"));
const Translate = lazy(() => import("./components/Translate"));
const Danestani = lazy(() => import("./components/Danestani"));
const Joke = lazy(() => import("./components/Joke"));
const News = lazy(() => import("./components/News"));




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>

      <TheHeader />

      <Routes>

        <Route path='/' element={
          <Suspense fallback={<h1>Loading</h1>}>
            <Home/>
          </Suspense>
        } />

        <Route path='/Azan' element={
          <Suspense fallback={<h1>Loading</h1>}>
            <Azan/>
          </Suspense>
        } />

        <Route path='/Translate' element={
          <Suspense fallback={<h1>Loading</h1>}>
            <Translate/>
          </Suspense>
        } />

        <Route path='/Danestani' element={
          <Suspense fallback={<h1>Loading</h1>}>
            <Danestani/>
          </Suspense>
        } />

        <Route path='/Joke' element={
          <Suspense fallback={<h1>Loading</h1>}>
            <Joke/>
          </Suspense>
        } />

        <Route path='/News' element={
          <Suspense fallback={<h1>Loading</h1>}>
            <News/>
          </Suspense>
        } />


      </Routes>





    </BrowserRouter>
  </>
);

