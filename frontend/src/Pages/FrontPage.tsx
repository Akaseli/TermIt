import React from 'react'
import { GradientButton } from '../components/GradientButton';
import { useNavigate } from 'react-router-dom';

interface Props {

}

export const FrontPage: React.FC<Props> = () => {
  const navigate = useNavigate()

  return(
    <div className='column'>
      <div className='row'>
        <GradientButton>
          Login
        </GradientButton>
        <GradientButton onClick={() => navigate("/signup")}>
          Signup
        </GradientButton>
      </div>
    </div>
  );
}