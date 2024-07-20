import React from 'react'
import { useTranslation } from 'react-i18next';
import { useOutlet, useOutletContext } from 'react-router-dom';
import { Set } from '../app/types/set';
import { SetPageContext } from './SetPage';

interface Props {

}

export const SetFrontPage: React.FC<Props> = () => {
  
  const context = useOutletContext<SetPageContext>();
  const { t, i18n } = useTranslation();

  const terms = context.set?.terms.map((term) => {
    return (
      <div className='row termcard'>
        <p>{term.term}</p>
        <p>{term.definition}</p>
      </div>
    );
  })

  return(
    <div>
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