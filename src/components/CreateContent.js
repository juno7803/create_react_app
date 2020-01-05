import React, {Component} from 'react';

class CreateContent extends Component{
    render(){
      return(
        <article>
          <h2>Create</h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){
              e.preventDefault(); // 페이지 전환이 되지 않도록 함
              this.props.onSubmit(
                e.target.title.value,
                e.target.desc.value
              );
            }.bind(this)} 
            // onSubmit은 HTML의 문법으로, "이벤트"에 해당함!
          >
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p>
              <textarea name="desc" placeholder="description">
              </textarea>
            </p>
            <p>
              <input type="submit" value="Submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }

  export default CreateContent;