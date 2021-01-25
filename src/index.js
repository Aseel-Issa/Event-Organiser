import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EventStore from './classes/EventStore';
import { Provider } from 'mobx-react'
import MarketplaceStore from './classes/MarketplaceStore'

let eventsStore = new EventStore()
let marketplaceStore = new MarketplaceStore()

const stores = {
  eventsStore,
  marketplaceStore
}


ReactDOM.render(
  <Provider {...stores}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
