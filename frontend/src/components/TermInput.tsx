import React, { useRef, useState } from 'react'
import "./TermInput.css"
import { useTranslation } from 'react-i18next';
import { GradientButton } from './GradientButton';
import { Term } from '../app/types/term';

interface Props {
  index: number,
  term: Term,
  remove: (index: number) => void,
  modify: (index: number, value:Term) => void
}

export const TermInput: React.FC<Props> = ({index,term,  remove, modify}) => {
  const { t, i18n } = useTranslation();

  const termRef = useRef<HTMLInputElement>(null)
  const defRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    let term: Term = {term: termRef.current?.value ?? "", definition: defRef.current?.value ?? "", id: 0, right: 0, wrong: 0}
    
    modify(index, term)
  }

  return(
    <div className="terminput">
      <p>{index+1}</p>
      <input ref={termRef} onChange={handleChange} placeholder={t("term")} value={term.term}></input>
      <input ref={defRef} onChange={handleChange} placeholder={t("definition")} value={term.definition}></input>
      <GradientButton onClick={() => {remove(index)}}>Remove</GradientButton>
    </div>
  );
}