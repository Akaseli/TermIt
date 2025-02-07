import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import "./WritePage.css"
import { SetPageContext } from './SetPage';
import { Link, useOutletContext } from 'react-router-dom';
import { Term } from '../app/types/term';
import { GradientButton } from '../components/GradientButton';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Props {

}

export const WritePage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();
  const context = useOutletContext<SetPageContext>();

  const [started, setStarted] = useState(false)
  const startedRef = useRef(false)
  startedRef.current = started

  const [cutOff, setCutoff] = useState(50)

  const [wordsToPractice, setWordsToPractice] = useState<Term[]>([])
  const wordsToPracticeRef = useRef<Term[]>([])
  wordsToPracticeRef.current = wordsToPractice

  const [currentWord, setCurrentWord] = useState(0)

  const currentWordRef = useRef(0)
  currentWordRef.current = currentWord

  //Practicing
  const practicingWordsRef = useRef<Term[]>([])
  //Particing once right
  const learningWordsRef = useRef<Term[]>([])

  //Done
  const learntWordsRef = useRef<Term[]>([])

  const writeListMixRef = useRef<Term[]>([])


  const [currentGuess, setGuess] = useState("")
  const guessRef = useRef("")
  guessRef.current = currentGuess

  const [right, setRight] = useState(false)
  const rightRef = useRef(false)
  rightRef.current = right

  const [inspecting, setInspecting] = useState(false)
  const inspectingRef = useRef(false)
  inspectingRef.current = inspecting

  const inputRef = useRef<HTMLInputElement>(null)

  const options = (
    <div className='column'>
      <p>Select words by how well you know them</p>
      <p>{"Minimum recall rate - " + cutOff.toString() + "%"}</p>
      <input type='range' min={0} max={100} value={cutOff} onChange={(e) => {setCutoff(parseInt(e.target.value))}}></input>
      <GradientButton onClick={() => {start()}}>{"Start with " + wordsToPractice.length + " terms"}</GradientButton>
    </div>
  )

  function handleInput(event: KeyboardEvent) {
    if(event.key == "Enter" && startedRef.current){
      if(inspectingRef.current){
        nextWord()
      }
      else{
        submit()
      }
    }
  }

  function simulateEnter(){
    if(startedRef.current){
      if(inspectingRef.current){
        nextWord()
      }
      else{
        submit()
      }
    }
  }

  useEffect(() => {
    //Add listener
    document.addEventListener("keyup", handleInput)
    //Remove listener
    return () => {
      document.removeEventListener("keyup", handleInput);
    } 
  }, [])


  const start = () => {
    setStarted(true)
  }

  function fillWords(){
    let tempWordstoPractice = wordsToPracticeRef.current.slice()

    console.log(tempWordstoPractice.length + " words remaining - FILLING WORDS")
    console.log(tempWordstoPractice)

    let wordsToChoose = 10 - practicingWordsRef.current.length - learningWordsRef.current.length

    console.log("Adding " + wordsToChoose + " words")
    console.log(practicingWordsRef.current.length)
    console.log(learningWordsRef.current.length)

    //Limit amount so no nulls
    if(tempWordstoPractice.length < wordsToChoose){
      wordsToChoose = tempWordstoPractice.length
    }

    console.log("Proceeding to choose " + wordsToChoose + " words")
    
    for(let i = 0; i<wordsToChoose; i++){
      let random = (Math.random() * (tempWordstoPractice.length - 1)).toFixed()
      let index = parseInt(random)
      const newWord = tempWordstoPractice[index]
      
      
      practicingWordsRef.current = [...practicingWordsRef.current, newWord]
      tempWordstoPractice = tempWordstoPractice.filter(term => term.id != newWord.id)
    }

    mixLists()
    setWordsToPractice(tempWordstoPractice)
  }

  const mixLists = () => {
    //Mix
    const arr = practicingWordsRef.current.concat(learningWordsRef.current)

    for(let i = arr.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i+1))
      var temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }

    writeListMixRef.current = arr
    setCurrentWord(0)
  }

  useEffect(() => {
    console.log("Running")
    //Reset
    setWordsToPractice([])


    let tempLIst:Term[] = []
    //Count matching terms and add to temp list
    context.set?.terms.forEach((term) => {
      let percentage = (term.right / Math.max(term.wrong + term.right, 1)) * 100

      if(percentage <= cutOff){
        tempLIst.push(term)
      }
    })

    //Update actual list
    setWordsToPractice(tempLIst)

  }, [cutOff, context])

  function submit(){
    console.log("Submit")
    const guess = guessRef.current

    let right = false

    const definitions = writeListMixRef.current[currentWordRef.current].term.split(",")

    definitions.forEach(def => {
      //console.log(guess.toLowerCase().trim() + " is the guess for " + def.toLowerCase().trim())
      //console.log(guess.toLowerCase().trim() == def.toLowerCase().trim())
      if(guess.toLowerCase().trim() == def.toLowerCase().trim()){
        right = true
      }
    });

    setRight(right)
    setInspecting(true)
  }

  useEffect(() => {
    if(started){
      //Fill words
      fillWords()
    }
  }, [started])


  function nextWord(override:boolean = false){
    if(override){
      setupNextWord(true)
    }else{
      setupNextWord(rightRef.current)
    }
  }

  function override(event: React.MouseEvent<HTMLButtonElement>){
    //TODO SEND CORRECT
    event.stopPropagation()
    nextWord(true)
  }

  function setupNextWord(correct: boolean){
    //console.log("Next word")
    //Find the current word and advance it one set forward/backwards
    const currentWord = writeListMixRef.current[currentWordRef.current];
    const inPracticing = practicingWordsRef.current.find((term) => term.id == currentWord.id)
    const inLearning = learningWordsRef.current.find((term) => term.id == currentWord.id)


    //Send status
    axios({
      method: "POST",
      data: {
        term_id: currentWord.id,
        correct: correct,
      },
      withCredentials: true,
      url: "/api/sets/progress/",
    })


    //Advance forwards
    if(correct){
      //console.log("Advancing")
      if(inPracticing){
        let temp:Term[] = practicingWordsRef.current.slice()

        //Remove
        temp = temp.filter((term) => term.id != currentWord.id)
        
        //console.log(currentWord);

        practicingWordsRef.current = temp

        //add
        temp = learningWordsRef.current.slice()
        temp.push(currentWord)

        learningWordsRef.current = temp
        //console.log(learningWordsRef.current)
      }
      else if(inLearning){
        let temp = learningWordsRef.current.slice()

        //Remove
        temp = temp.filter((term) => term.id != currentWord.id)
        learningWordsRef.current = temp

        //Add to mastered/learner
        learntWordsRef.current.push(currentWord)
      }
    }
    //Put back
    else{
      if(inLearning){
        //console.log("Putting back " + currentWord.term)
        let temp = learningWordsRef.current.slice()

        //Remove
        temp = temp.filter((term) => term.id != currentWord.id)
        learningWordsRef.current = temp

        //console.log(learningWordsRef.current)

        //Add pracitcing
        practicingWordsRef.current = [...practicingWordsRef.current, currentWord]
      }
    }

    if(currentWordRef.current < writeListMixRef.current.length - 1){
      setCurrentWord(value => value+1)
    }
    else{
      fillWords()
    }

    setGuess("")
    setInspecting(false)
  }

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus()
    }
  }, [inspecting])

  const write = (
    <div>
      <div className='write'>
        {writeListMixRef.current.length > 0 ?
          (
            inspecting ? (
              <div className="inspecting" onClick={simulateEnter}> 
                <h2>{right ? t("correct") : t("wrong")}</h2>
                <p>{t("yourguess") + ": " + currentGuess}</p>
                <p>{t("correctwas") + ": " + writeListMixRef.current[currentWord].term}</p>
                <p className='desktop'>{t("continue")}</p>
                <p className='mobile'>{t("continue_mobile")}</p>
                {
                  right ? "" : <button onClick={override}>{t("override")}</button>
                }
              </div>
            ) : (
            <div>
              <p>{writeListMixRef.current[currentWord].definition}</p>
              <input ref={inputRef} onChange={(e) => {setGuess(e.target.value)}}></input>
              <button className='mobile' onClick={simulateEnter}>{t("submit")}</button>
            </div>
            )
          ) : t("completed")
        }
      </div>
      <div className='row stats'>
        <p>{t("nseen") + ": " + wordsToPracticeRef.current.length}</p>
        <p>{t("practicing") +": " + practicingWordsRef.current.length}</p>
        <p>{t("getting") +": " + learningWordsRef.current.length}</p>
        <p>{t("mastered") + ": " + learntWordsRef.current.length}</p>
      </div>
    </div>
  )

  return(
    <div className='writepage'>
      {
        started ? (
          write
        ):
        (
          options
        )
      }
    </div>
  );
}