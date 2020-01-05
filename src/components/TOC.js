import React, {Component} from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps,newState){
      if(this.props.data === newProps){
        return false; // 값이 바뀌지 않으면 render 되지 않도록 함
      }
        return true; // 값이 바뀌면 render 되도록 함
    }
    render(){
      var lists = [];
      var data = this.props.data; //App 에서 contents를 props로 넘김!
      var i = 0;
      while(i < data.length){
      lists.push(
      <li key={data[i].id}>
        <a 
          href={"/content/"+data[i].id}
          data-id={data[i].id} // 17.3강 참고
          onClick={function(e){
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)}      
        >{data[i].title}</a>
      </li>);
      i = i+1;
      }
      return(
        <nav> 
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }

  export default TOC;