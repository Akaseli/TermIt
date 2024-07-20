import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n.ts';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { LoadingPage } from './Pages/LoadingPage';




const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Suspense fallback={
    <LoadingPage/>
  }>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);