import React from 'react'
import "./App.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FrontPage } from './Pages/FrontPage';

function App(){
  const router = createBrowserRouter([
    {path: "/", Component: FrontPage},
    {path: "/signup", Component: () => {return <p>page</p>}}
  ])

  return(
    <RouterProvider router={router}/>
  );
}

export default App;