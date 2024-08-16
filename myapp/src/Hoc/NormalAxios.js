import axios from 'axios'
import './index.css';
//import axioshoc from './axioshoc';
import { Component } from 'react'
//import axioshoc from './Hoc/axioshoc';
class Axios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: [],
            search: ""

        }
    }
    componentDidMount() {
        axios.get("https://hn.algolia.com/api/v1/search?query=react").then((res) => console.log(res)).catch((err) => console.log(err))
    }
    userInput(e) {
        this.setState({ search: e.target.value })
    }
    handleSearch(e) {
        e.preventDefault()
        axios.get(`https://hn.algolia.com/api/v1/search?query=${this.state.search}`).then((res) => this.setState({ result: res.data.hits })).catch((err) => console.log(err))
    }
    render() {
        return (
            <div className="main-container">
                <div className="search-container">
                    <div>
                        <h1 className="main-heading">Search Anything!</h1>
                        <input
                            type="text"
                            placeholder="Search Anything"
                            onChange={(e) => this.userInput(e)}
                        />
                        <button className="button" onClick={(e) => this.handleSearch(e)}>
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
                    {
                        this.state.result.map((item) => (


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
                        ))
                    }
                </div>
            </div>
        )
    }
}
export default Axios;
