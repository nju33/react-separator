import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Separator from './Separator';
import registerServiceWorker from './registerServiceWorker';

const vdom = (
  <div className="list">
    <div className="item">
      <div className="item--horizontal"/>
      <Separator type="horizontal"/>
      <div className="item--horizontal"/>
    </div>
    <Separator/>
    <div className="item"/>
    <Separator/>
    <div className="item"/>
  </div>
);

ReactDOM.render(vdom, document.getElementById('root'));
registerServiceWorker();
