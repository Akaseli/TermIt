import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useOutlet, useOutletContext } from 'react-router-dom';
import { Set } from '../app/types/set';
import { SetPageContext } from './SetPage';

interface Props {

}

export const SetFrontPage: React.FC<Props> = () => {
  
  const context = useOutletContext<SetPageContext>();
  const { t, i18n } = useTranslation();

  const terms = context.set?.terms.map((term) => {
    let percentageText = "0%"

    let percentage = (term.right / (term.wrong + term.right)) * 100

    if(!isNaN(percentage)){
      percentageText = percentage.toFixed(0).toString() + "%"
    }

    return (
      <div className='column termcard'>
         <div className='row termcard'>
          <p>{term.term}</p>
          <p>{term.definition}</p>
        </div>
        <div className='percentage'>
          <p>{percentageText}</p>
        </div>
      </div>
    );
  })

  return(
    <div>
      <div className='row modes'>
        <Link to="./write" relative="path">
          <button className='modeButton'>
            {t("write")}
          </button>
        </Link>

        <Link to="./flashcards" relative="path">
          <button className='modeButton'>
            {t("flashcards")}
          </button>
        </Link>

        <button className='modeButton'>
          {t("test")}
        </button>
      </div>

      {terms}
    </div>
  );
}