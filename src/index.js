import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import { useTranslation } from 'react-i18next';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function YourComponent() {
  const { t } = useTranslation();
  
  return <div>{t('your.translation.key')}</div>;
}