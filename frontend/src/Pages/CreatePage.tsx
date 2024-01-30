import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import "./CreatePage.css"
import { GradientButton } from '../components/GradientButton';
import { TermInput } from '../components/TermInput';
import { Term } from '../app/types/term';
import axios from 'axios';

interface Props {

}

export const CreatePage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
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

  const createSet = () => {
    axios({
      method: "POST",
      data: {
        name: name,
        description: description,
        terms: JSON.stringify(terms)
      },
      withCredentials: true,
      url: "/api/sets/",
    })
  }

  const cards = terms.map((term, index) => {
    return (
      <TermInput term={term} key={index} index={index} remove={removeTerm} modify={modifyTerm}/>
    )
  })

  return(
    <div className="column">
      <h1>{t('create')}</h1>

      <div className='info'>
        <h2>{t("info")}</h2>
        <input onChange={(e) => setName(e.target.value)} placeholder={t("name")}></input>
        <br/>
        <textarea onChange={(e) => setDescription(e.target.value)} rows={4} placeholder={t("description")}></textarea>
      </div>

      <hr className='break'/>

      <div className='terms'>
        <div className="row header">
          <h2>{t("terms")}</h2>
          <GradientButton onClick={addTerm}>{t("add_term")}</GradientButton>
        </div>

        <div className='column'>
          {cards}
        </div>

      </div>

      <hr className='break'/>

      <GradientButton onClick={createSet}>{t("create")}</GradientButton>
      
    </div>
  );
}