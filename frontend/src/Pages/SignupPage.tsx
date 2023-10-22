import React from 'react'
import { useTranslation } from 'react-i18next';

interface Props {

}

export const SignupPage: React.FC<Props> = () => {
  const {t, i18n} = useTranslation()

  return(
    <div>
      <div className='column'>

        <div className='row'>
          <p>{t('username')}</p>
          <input type='email'></input>
        </div>

        <div className='row'>
          <p>{t('password')}</p>
          <input type='password'></input>
        </div>


      </div>
    </div>
  );
}