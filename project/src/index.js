/*import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message, Alert } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';

moment.locale('zh-cn');

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`您选择的日期是: ${date.format('YYYY-MM-DD')}`);
    this.setState({ date });
  };
  render() {
    const { date } = this.state;
    return (
      <LocaleProvider locale={zhCN}>
        <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={this.handleChange} />
          <div style={{ marginTop: 20 }}>
          <Alert message={`当前日期：${date ? date.format('YYYY-MM-DD') : '未选择'}`} type="success" />
          </div>
        </div>
      </LocaleProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { user } from './objects/users.js';
import { Stock } from './objects/stock.js';
import { service } from './components/main.js';
import { Side } from './components/menu.js'
import { Top } from './components/toolbar.js'
import { MainText } from './components/frames/mainFrame.js'
import { StockText } from './components/frames/stockFrame.js'
import { AboutText } from './components/frames/aboutFrame.js'
import { UserText } from './components/frames/userFrame.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



service.menu = <p>This.is.the.toolBar.</p>;
// service.toolBar = service.toolBar = (<div>
//   <p id="userinfo">Welcome, {user.name}!
//   <button onClick={user.login}>login</button></p>
//   </div>);


export var navside=<Side />
export var navtop=<Top />
export var m=<MainText />
export var u=<UserText />
export var s=<StockText />
export var a=<AboutText />

// function HelloMessage(props) {
//     return <h1>Hello {props.name}!</h1>;
// }
//
// const hel = <HelloMessage name="Runoob"/>;

const name = user.name;


service.menu=navside;
service.mainFrame=m;
service.toolBar=navtop;

service.draw();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
