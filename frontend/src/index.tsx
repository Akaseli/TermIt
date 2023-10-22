import ReactDOM from 'react-dom'
import App from './App';
import './i18n.ts'
import { Suspense } from 'react';

ReactDOM.render(
  <Suspense fallback={
    <div className='column'>
       
    </div>
  }>
     <App/>
  </Suspense>,
  document.getElementById('root')
);