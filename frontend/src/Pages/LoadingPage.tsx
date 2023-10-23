import React from 'react'
import './LoadingPage.css'

interface Props {

}

export const LoadingPage: React.FC<Props> = () => {
  return(
    <div className='column'>
      <div className='loading'>
        <div/>
        <div/>
        <div/>
      </div>
    </div>  
  );
}