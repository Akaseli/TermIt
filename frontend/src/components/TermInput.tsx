import React from 'react'
import "./TermInput.css"
import { useTranslation } from 'react-i18next';

interface Props {
  index: number
}

export const TernInput: React.FC<Props> = ({index}) => {
  const { t, i18n } = useTranslation();

  return(
    <div className="terminput">
      <p>{index}</p>
      <input placeholder={t("term")}></input>
      <input placeholder={t("definition")}></input>
    </div>
  );
}