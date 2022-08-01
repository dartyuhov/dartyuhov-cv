import React from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <NotificationsProvider position="bottom-right" transitionDuration={300} limit={1}>
    <App />
  </NotificationsProvider>,
);

reportWebVitals();
