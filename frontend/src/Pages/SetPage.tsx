import React, { useEffect, useState } from 'react'
import "./SetPage.css"
import { Set } from '../app/types/set';
import axios from 'axios';
import { Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {

}

export type SetPageContext = {set: Set | undefined};

export const SetPage: React.FC<Props> = () => {
  const [set, setSet] = useState<Set>()
  const { t, i18n } = useTranslation();

  const params = useParams();

  useEffect(() => {
    axios.get(`/api/sets/${params["id"]}`).then((response) => {
      if(response.data){
        setSet(response.data)
      }
    })
  }, [])

  return(
    <div className="column setpage">
      <h2>{set?.name}</h2>
      <p className="owner">{t("owner") + " " + set?.owner}</p>

      <Outlet context={{ set } satisfies SetPageContext} />
      
    </div>
  );
}