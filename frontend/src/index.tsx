import ReactDOM from 'react-dom';
import App from './App';
import './i18n.ts';
import { Suspense } from 'react';
import { LoadingPage } from './Pages/LoadingPage';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.render(
  <Suspense fallback={
    <LoadingPage/>
  }>
    <Provider store={store}>
      <App/>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);