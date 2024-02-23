import React from 'react'
import { useTranslation } from 'react-i18next';
import "./Footer.css";

interface Props {

}

export const Footer: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  return(
    <div className="footer">
      <div className="langMenu">
        <img
          className="langFlag"
          src={`/api/static/flags/${i18n.language}.svg`}
        />
        <select
          className="langSelector"
          defaultValue={i18n.language}
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
          }}
        >
          <option value={"fi"}>suomi</option>
          <option value={"en"}>English</option>
        </select>
      </div>
    </div>
  );
}