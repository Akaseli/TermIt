import React from 'react'
import { Set } from '../app/types/set';
import "./SetCard.css"

interface Props {
  set: Set
}

export const SetCard: React.FC<Props> = ({set}) => {
  return(
    <div className="setcard">
      <p className="name">{set.name}</p>
      <p className="count">{set.terms + " terms"}</p>
      <div className="owner">
        <div className="img"></div>
        <p>{set.owner}</p>
      </div>
    </div>
  );
}