import "./index.css";
import { Component } from "react";
import axioshoc from './axioshoc'
class WithHoc extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userInput, handleSearch, result } = this.props;
    return (
      <div className="main-container">
        <div className="search-container">
          <div>
            <h1 className="main-heading">Search Anything!</h1>
            <input
              type="text"
              placeholder="Search Anything"
              onChange={userInput}
            />
            <button className="button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="loder">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div className="flex-container">
          {/* {/This code block will renders UI with empty titles and empty urls on searching/} */}
          {/* {result.map((item) => (
            <div key={item.story_id}>
              <h1 className="head">author: {item.author}</h1>
              <h1 className="text">title: {item.title} </h1>
              <a href={item.url} target="_blank">
                Click For More Details
              </a>
            </div>
          ))} */}

          {/* {/This code block will renders UI without any empty titles and empty urls on searching/} */}
          {result.map((item) => (
            <div
              className="blogs-container"
              key={item.objectID || item.story_id}
            >
              <h1 className="head">Author: {item.author}</h1>
              <h1 className="text">Title: {item.title || item.story_title}</h1>
              <a href={item.url || item.story_url} target="_blank">
                Click For More Details
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default axioshoc(WithHoc);