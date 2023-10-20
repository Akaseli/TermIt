import React from 'react'
import "./App.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FrontPage } from './Pages/FrontPage';
import { SignupPage } from './Pages/SignupPage';

function App(){
  const router = createBrowserRouter([
    {path: "/", Component: FrontPage},
    {path: "/signup", Component: SignupPage}
  ])

  return(
    <div>
      <div className='header row'>
        <h1>TermIt</h1>
      </div>
      
      <RouterProvider router={router}/>
    </div>
    
  );
}

export default App;