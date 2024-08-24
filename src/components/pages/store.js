import React, {Component} from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';

class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryId: this.props.match.params.slug
    };
  }

  getCourseItem() {
    axios
      .get(
        `${API_URL}/portfolio_blogs/${
          this.state.categoryId
        }`
      )
      .then(response => {
        this.setState({
          blogItem: response.data.portfolio_blog
        });
      })
      .catch(error => {
        console.log("getBlogItem error", error);
      });
  }

  render(){
    return (
      <div className="content-page-wrapper">
  
          <h1>Store</h1>
  
      </div>
    )
  }
}

export default Store;

