
import { Component } from "react"
import axios from 'axios'
const axioshoc = (WrappedComponent)=>{
    return class NewComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                result: [],
                search: "",
                name:"naveen"
    
            }
    
        }
        componentDidMount(){
            axios.get("https://hn.algolia.com/api/v1/search?query=react").then((res)=>console.log(res)).catch((err)=>console.log(err))
        }
        userInput=(e)=>{
            this.setState({search:e.target.value})
            //console.log("hii")
        }
        handleSearch=(e)=> {
            e.preventDefault()
            axios.get(`https://hn.algolia.com/api/v1/search?query=${this.state.search}`).then((res) => this.setState({ result: res.data.hits })).catch((err) => console.log(err))
        }
        render() {
            return(
                <>
                <WrappedComponent result={this.state.result} handleSearch={this.handleSearch} userInput={this.userInput}></WrappedComponent>
                </>
            )
        }
}
}
export default axioshoc

// import React, { Component } from 'react';
// import axios from 'axios';

// const axioshoc = (WrappedComponent) => {
//   return class extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         result: [],
//         search: ''
//       };
//     }

//     userInput = (e) => {
//       this.setState({ search: e.target.value });
//     }

//     handleSearch = (e) => {
//       e.preventDefault();
//       axios.get(`https://hn.algolia.com/api/v1/search?query=${this.state.search}`)
//         .then((res) => this.setState({ result: res.data.hits }))
//         .catch((err) => console.log(err));
//     }

//     render() {
//       return (
//         <WrappedComponent 
//           userInput={this.userInput} 
//           handleSearch={this.handleSearch} 
//           result={this.state.result} 
//                />
//       );
//     }
//   }
// }

// export default axioshoc;