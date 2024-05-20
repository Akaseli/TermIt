import React, { useEffect, useState } from 'react'
import "./SetPage.css"
import { Set } from '../app/types/set';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {

}

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

  const terms = set?.terms.map((term) => {
    return (
      <div className='row termcard'>
        <p>{term.term}</p>
        <p>{term.definition}</p>
      </div>
    );
  })

  return(
    <div className="column setpage">
      <h2>{set?.name}</h2>
      <p className="owner">{t("owner") + " " + set?.owner}</p>

      <div className='row modes'>
        <button className='modeButton'>
          {t("write")}
        </button>

        <button className='modeButton'>
          {t("flashcards")}
        </button>

        <button className='modeButton'>
          {t("test")}
        </button>
      </div>

      {terms}
      
    </div>
  );
}