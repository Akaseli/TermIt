import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import axios from "axios";
import "./App.css";
import { userLogin } from "./app/behaviours/userSlice";

import { FrontPage } from "./Pages/FrontPage";
import { SignupPage } from "./Pages/SignupPage";
import { ErrorPage } from "./Pages/ErrorPage";
import { LoginPage } from "./Pages/LoginPage";
import { CreatePage } from "./Pages/CreatePage";
import { SetPage } from "./Pages/SetPage";
import { SetsPage } from "./Pages/SetsPage";
import { SetFrontPage } from './Pages/SetFrontPage';
import { Appbar } from './components/Appbar';
import { Footer } from './components/Footer';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FlashCardsPage } from "./Pages/FlashCardsPage";
import { WritePage } from "./Pages/WritePage";


function App() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if(!user.id){
      axios.get("/api/user").then((response) => {
        console.log(response)
        if(response.status == 200){
          dispatch(userLogin(response.data))
        }
      }).catch((reason) => {
        //Not logged in
      })
    }
  }, [])

  return (
    <div>
      <Appbar />

      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<FrontPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/create' element={<CreatePage />} />
            
            <Route path='/sets' element={<SetsPage />}/>
            
            <Route path='/sets/:id' element={<SetPage />}>
              <Route index element={<SetFrontPage />} />
              <Route path='flashcards' element={<FlashCardsPage />} />
              <Route path='write' element={<WritePage />} />
            </Route>

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    
      <Footer />
    </div>
  );
}

export default App;
