import React from 'react'

interface Props {

}

export const SignupPage: React.FC<Props> = () => {
  return(
    <div>
      <div className='column'>

        <div className='row'>
          <p>Username</p>
          <input type='email'></input>
        </div>

        <div className='row'>
          <p>Password</p>
          <input type='password'></input>
        </div>


      </div>
    </div>
  );
}