import React from 'react'
import { Set } from '../app/types/set';
import "./SetCard.css"
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  set: Set
}

export const SetCard: React.FC<Props> = ({set}) => {
  const { t, i18n } = useTranslation();

  return(
    <Link className="setcard" to={`/sets/${set.id}`}>
      <p className="name">{set.name}</p>
      <p className="description">{set.description}</p>

      <p className="count">{set.terms.length + " " + t("terms_p")}</p>

      <div className="owner">
        <div className="img"></div>
        <p>{set.owner}</p>
      </div>
    </Link>
  );
}