import React, { useEffect, useRef, useState } from 'react'
import "./FlashCardsPage.css"
import { SetPageContext } from './SetPage';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Set } from '../app/types/set';

interface Props {

}

export const FlashCardsPage: React.FC<Props> = () => {
  const context = useOutletContext<SetPageContext>();
  const cardRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setIndex] = useState(0);
  const [done, setDone] = useState(false);


  //References for this function
  const indexRef = useRef(0)
  indexRef.current = currentIndex

  const setRef = useRef<Set | undefined>(undefined)
  setRef.current = context.set

  function handleInput(event: KeyboardEvent) {
    
    if(event.key == "ArrowUp"){
      flipCard()
    }
    //Wrong
    if(event.key == "ArrowLeft"){
      cardWrong()
    }
    //Right
    else if(event.key == "ArrowRight"){
      cardRight()
    }
  }

  function flipCard(){
    if(cardRef.current){
      cardRef.current.toggleAttribute("flipped")
    }
  }

  function cardRight(){
    axios({
      method: "POST",
      data: {
        term_id: setRef.current?.terms[indexRef.current].id,
        correct: true,
      },
      withCredentials: true,
      url: "/api/sets/progress/",
    })

    if(indexRef.current < (setRef.current?.terms.length ?? 0)- 1){
      cardRef.current?.toggleAttribute("right")
      setTimeout(spawnNextCard, 500)
    }
    else{
      setDone(true)
    }
  }

  function cardWrong(){
    if(done) return;
    axios({
      method: "POST",
      data: {
        term_id: setRef.current?.terms[indexRef.current].id,
        correct: false,
      },
      withCredentials: true,
      url: "/api/sets/progress/",
    })

    if(indexRef.current < (setRef.current?.terms.length ?? 0)- 1){
      cardRef.current?.toggleAttribute("left")
      setTimeout(spawnNextCard, 500)
    }
    else{
      setDone(true);
    }
  }

  function spawnNextCard(){
    console.log("New card")
    cardRef.current?.removeAttribute("flipped")
    setIndex((value) => value + 1)
    cardRef.current?.removeAttribute("right")
    cardRef.current?.removeAttribute("left")
    //Enable
    cardRef.current?.toggleAttribute("visible");
    setTimeout(showNext, 400)
  }

  function showNext(){
    cardRef.current?.toggleAttribute("visible")
  }

  useEffect(() => {
    //Add listener
    if(!done){
      document.addEventListener("keyup", handleInput)
    }

    //Remove listener
    return () => {
      document.removeEventListener("keyup", handleInput);
    } 
  }, [done])


  //Calculate progress bar
  const barWidth = ((currentIndex + 1) / (context.set?.terms.length ?? 1)) * 500;

  const currentCard =  (

    <div className='card' ref={cardRef} onClick={flipCard}>
      <div className='sides'>
        <div className='front'>
          <p>{context.set?.terms[currentIndex].definition}</p>
        </div>
        <div className='back'>
          <p>{context.set?.terms[currentIndex].term}</p>
        </div>
      </div>
    </div>
  )

  return(
    <div className='flashcards center column'>
      <div className='progressBar'>
        <div className='bar' style={{width: barWidth}}/>
      </div>
      {
        done ? (<p>All done!</p>) :  (currentCard )
      }
      
     
     <button className='mobile left' onClick={cardWrong}>{"<"}</button>
     <button className='mobile right' onClick={cardRight}>{">"}</button>
    </div>
  );
}