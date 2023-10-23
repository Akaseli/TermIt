import ReactDOM from 'react-dom'
import App from './App';
import './i18n.ts'
import { Suspense } from 'react';
import { LoadingPage } from './Pages/LoadingPage';

ReactDOM.render(
  <Suspense fallback={
    <LoadingPage/>
  }>
     <App/>
  </Suspense>,
  document.getElementById('root')
);