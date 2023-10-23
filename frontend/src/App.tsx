import React, { Suspense } from 'react'
import "./App.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FrontPage } from './Pages/FrontPage';
import { SignupPage } from './Pages/SignupPage';
import { useTranslation } from 'react-i18next';
import { LoadingPage } from './Pages/LoadingPage';

function App(){
  const router = createBrowserRouter([
    {path: "/", Component: FrontPage},
    {path: "/signup", Component: SignupPage}
  ])

  const { t, i18n } = useTranslation()

  return(
    <div>
      <div className="appbar">
        <div className="langMenu">
          <img className="langFlag" src={`/api/static/flags/${i18n.language}.svg`} />
          <select
            className="langSelector"
            defaultValue={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value)
            }}
          >
            <option value={'fi'}>suomi</option>
            <option value={'en'}>English</option>
          </select>
        </div>
      </div>

      <div className='header row'>
        <h1>TermIt</h1>
      </div>

      <RouterProvider router={router}/>
    </div>
    
  );
}

export default App;