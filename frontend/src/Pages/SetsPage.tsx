import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SetCard } from '../components/SetCard'
import { Set } from "../app/types/set";
import "./SetsPage.css";

interface Props {

}

export const SetsPage: React.FC<Props> = () => {
  const [sets, setSets] = useState<Set[]>([])

  useEffect(() => {
    axios.get("/api/sets").then((response) => {
      if(response.data){
        setSets(response.data)
      }
    })
  }, [])

  const setCards = sets.map((set) => {
    return (
      <SetCard set={set} key={set.id}/>
    );
  })

  return(
    <div className='column'>
      <h2>Sets</h2>
      
      <div className="setlist">
        {setCards}
      </div>
    </div>
  );
}