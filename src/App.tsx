import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/pages/home";
import News from "./components/pages/news";
import Layout from "./components/layout";

let router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    element: <Layout><Home/></Layout>
  },
  {
    path: "/news/:id",
    loader: () => ({}),
    element: <Layout><News/></Layout>
  }
]);
function App() {
  return (
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );
}

export default App;
