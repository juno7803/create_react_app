import React, {Component} from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css'; // 여기는 파일명이 들어가야 함!
import { thisExpression } from '@babel/types';

// Component라는 리액트가 갖고 있는 class를 상속하고 있는 App(사용자 정의)
class App extends Component { 
  constructor(props){ // state의 값을 초기화 하려는 과정 "render보다 먼저 실행되어야 함!"
    super(props);
    this.max_content_id = 3; // 마지막 content의 id 값과 같아야함
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'Html is HyperText'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ] // 대괄호 : 배열
    }
  } // render 보다 먼저 실행이 되면서 Component를 초기화 시켜 주려는 코드를 constructor안에 쓴다!(초기화를 담당한다!)
  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i = i+1;
    }
  }
  getContent(){
    var _title, _desc, _article= null;
    ////////////////////WELCOME//////////////////////
    if(this.state.mode === 'welcome')
    {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title ={_title} desc ={_desc}></ReadContent>
    }
    ////////////////////READ//////////////////////
    else if(this.state.mode === 'read') // html/css/javascript 링크를 클릭할 경우
    {
       var _content = this.getReadContent();
      _article = <ReadContent title ={_content.title} desc ={_content.desc}></ReadContent>
    }
    ////////////////////CREATE//////////////////////
    else if(this.state.mode === 'create')
    {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }
    ////////////////////UPDATE//////////////////////
    else if(this.state.mode === 'update')
    {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i =0;
        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  // render()
  render(){
    return(
      <div className="App">
        <Subject 
          title={this.state.subject.title} // 앞의 title은 props로 지정한 것(실제로 subject.js에 입력 할 값!), 뒤의 title은 state에서 지정한 것
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC
          data={this.state.contents}
          onChangePage={function(id){
            this.setState({
              mode:'read' ,
              selected_content_id:Number(id)
            });
          }.bind(this)} // 함수를 props로 준 것!
        >
        </TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('Really?')){
              var _contents = Array.from(this.state.contents);
              var _maxid = this.state.max_content_id-1;
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i=i+1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents,
                max_content_id:_maxid
              });
              alert('Deleted Complete!');
            }
          }
          else{
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    ); 
  }
}
// 이 전체를 Component를 만드는 "Template 이라고 생각하면 됨!"
export default App;

//Component를 "정리정돈의 도구" 라고 생각하자! -> 복잡도를 낮춤!