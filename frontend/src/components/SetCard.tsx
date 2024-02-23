import React from 'react'
import { Set } from '../app/types/set';
import "./SetCard.css"
import { Link } from 'react-router-dom';

interface Props {
  set: Set
}

export const SetCard: React.FC<Props> = ({set}) => {
  return(
    <Link className="setcard" to={`/sets/${set.id}`}>
      <p className="name">{set.name}</p>
      <p className="description">{set.description}</p>

      <p className="count">{set.terms.length + " terms"}</p>

      <div className="owner">
        <div className="img"></div>
        <p>{set.owner}</p>
      </div>
    </Link>
  );
}