import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import "./CreatePage.css"
import { GradientButton } from '../components/GradientButton';
import { TermInput } from '../components/TermInput';
import { Term } from '../app/types/term';

interface Props {

}

export const CreatePage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const [terms, setTerms] = useState<Term[]>([])

  const addTerm = () => {
    setTerms([...terms, {term: "", definition: ""}])
  }

  const removeTerm = (index: number) => {
    const temp = [...terms]
    temp.splice(index, 1)

    setTerms(temp)
  }

  const modifyTerm = (index: number, value:Term) => {
    const temp = [...terms]

    temp[index] = value

    setTerms(temp)
  }

  const cards = terms.map((term, index) => {
    return (
      <TermInput term={term} key={index} index={index} remove={removeTerm} modify={modifyTerm}/>
    )
  })

  return(
    <div className="column">
      <h1>{t('create')}</h1>

      <div className='terms'>
        <div className="row header">
          <h2>{t("terms")}</h2>
          <GradientButton onClick={addTerm}>{t("add_term")}</GradientButton>
        </div>

        <div className='column'>
          {cards}
        </div>

      </div>
      
    </div>
  );
}