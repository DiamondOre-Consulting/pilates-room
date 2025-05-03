import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import {Toaster} from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          richColors
          toastOptions={{ duration: 2000 }}
          position="bottom-right"
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
