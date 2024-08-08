import React, { useEffect, useState } from 'react'
import "./SetPage.css"
import { Set } from '../app/types/set';
import axios from 'axios';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {

}

export type SetPageContext = {set: Set | undefined};

export const SetPage: React.FC<Props> = () => {
  const [set, setSet] = useState<Set>()
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const params = useParams();

  useEffect(() => {
    fetchSets()
  }, [])

  function backToSetPage(){
    fetchSets()
    navigate("/sets/" + params["id"])
  }

  function fetchSets(){
    axios.get(`/api/sets/${params["id"]}`).then((response) => {
      if(response.data){
        setSet(response.data)
      }
    })
  }

  return(
    <div className="column setpage">
      <h2>{set?.name}</h2>
      <p className="owner">{t("owner") + " " + set?.owner}</p>

      <div className="return" onClick={backToSetPage}>X</div>

      <Outlet context={{ set } satisfies SetPageContext} />
      
    </div>
  );
}