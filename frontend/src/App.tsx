import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import axios from "axios";
import "./App.css";
import { userLogin } from "./app/behaviours/userSlice";
import { Appbar } from "./components/Appbar";
import { Footer } from "./components/Footer";



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
        <Outlet/>
      </div>
      

      <Footer />

    </div>
  );
}

export default App;
