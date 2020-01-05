// entry : 진입 파일
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // 여기는 파일명이 들어가야 함!(사실은 App.js)
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// 초록글씨 App Component를 실행한다! / App.js에 적용시키겠다! 라는 뜻.)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
