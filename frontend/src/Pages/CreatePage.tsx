import React from 'react'
import { useTranslation } from 'react-i18next';

import "./CreatePage.css"
import { GradientButton } from '../components/GradientButton';

interface Props {

}

export const CreatePage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  return(
    <div className="column">
      <h1>{t('create')}</h1>

      <div className='terms'>
        <div className="row header">
          <h2>{t("terms")}</h2>
          <GradientButton>{t("add_term")}</GradientButton>
        </div>
      </div>
      
    </div>
  );
}