import React, {Component} from 'react';

class Subject extends Component {
    render(){ // class 안엔 fucntion을 앞에 붙일 필요가 없다!
      return (
        <header> 
          <h1><a href="/" onClick={function(e){
            e.preventDefault(); // 클릭했을 때 페이지가 바뀌지 않게 하기 위해
            this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
        // props 는 속성을 부여해줄 수 있다! 뒤에 오는 sub title 등은 사용자가 임의 정의하는것!
        //(주의할 것) header, div 등 딱 하나의 최상위 태그만 써야 한다!
      );
    }
  }

  export default Subject;