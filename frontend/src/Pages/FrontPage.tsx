import React from 'react'
import { GradientButton } from '../components/GradientButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {

}

export const FrontPage: React.FC<Props> = () => {
  const navigate = useNavigate()
  const {t, i18n} = useTranslation()

  return(
    <div className='column'>
      <div className='row'>
        <GradientButton>
          {t('login')}
        </GradientButton>
        <GradientButton onClick={() => navigate("/signup")}>
          {t('signup')}
        </GradientButton>
      </div>
    </div>
  );
}