import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Separator from './Separator';
import registerServiceWorker from './registerServiceWorker';

const width = {
  minWidth: '200px',
  maxWidth: '200px',
};

const vdom = (
  <div className="list">
    <div className="item" style={width}>
      <div className="item--horizontal"/>
      <Separator type="horizontal"/>
      <div className="item--horizontal"/>
    </div>
    <Separator/>
    <div className="item" style={width} />
      <Separator/>
    <div className="item"/>
  </div>
);

ReactDOM.render(vdom, document.getElementById('root'));
registerServiceWorker();
