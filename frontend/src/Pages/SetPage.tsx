import React, { useEffect, useState } from 'react'
import "./SetPage.css"
import { Set } from '../app/types/set';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Props {

}

export const SetPage: React.FC<Props> = () => {
  const [set, setSet] = useState<Set>()

  const params = useParams();

  useEffect(() => {
    axios.get(`/api/sets/${params["id"]}`).then((response) => {
      if(response.data){
        setSet(response.data)
      }
    })
  }, [])

  return(
    <div className='column'>
      <h2>{set?.name}</h2>
    </div>
  );
}