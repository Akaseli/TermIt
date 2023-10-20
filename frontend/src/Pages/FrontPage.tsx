import React from 'react'
import { GradientButton } from '../components/GradientButton';

interface Props {

}

export const FrontPage: React.FC<Props> = () => {
  return(
    <div className='column'>
      <h1>TermIt</h1>

      <div className='row'>
        <GradientButton>
          Login
        </GradientButton>
        <GradientButton>
          Sign Up
        </GradientButton>  
      </div>
    </div>
  );
}