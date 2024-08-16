import React from "react";
import axios from "axios";
import './ContactManager.css';
//import img from "../contact-img.jpeg"
class ContactManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            isUpdated: false,
            isId: '',
            ipName: '',
            ipEmail: '',
            ipNumber: '',
            statusMsg: ''
        }
    }
    componentDidMount() {
        axios.get("http://localhost:3001/ContactsDetails").then((res) => this.setState({ contacts: res.data })).catch((err) => console.log("error"))
    }
    handleChange = (e, keyword) => {
        if (keyword === "contactname") {
            this.setState({ ipName: e.target.value })
        }
        else if (keyword === "contactemail") {
            this.setState({ ipEmail: e.target.value })
        }
        else {
            this.setState({ ipNumber: e.target.value })
        }

    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.isUpdated) {
            axios.put(`http://localhost:3001/ContactsDetails/${this.state.isId}`, {
                cname: this.state.ipName,
                cno: this.state.ipNumber,
                cemail: this.state.ipEmail

            }).then((res) => {
                const temp = this.state.contacts;
                const index = temp.findIndex((item) => item.id === res.data.id)

                temp.splice(index, 1, res.data);

                this.setState({ contacts: temp })
            }).catch((err) => this.setState({ statusMsg: "some error occurred please try again" }))
            this.setState({ isUpdated: !(this.state.isUpdated) })
        }

        else {
            axios.post("http://localhost:3001/ContactsDetails", {
                cname: this.state.ipName,
                cemail: this.state.ipEmail,
                cno: this.state.ipNumber
            }).then((res) => {

                const temp = [...this.state.contacts, res.data]

                this.setState({ contacts: temp });
                this.setState({ statusMsg: "successfully added" })
            }).catch((err) => this.setState({ statusMsg: "some error occurred please try again" }))
        }

        // axios.get("http://localhost:3001/ContactDetails").then((res)=>this.setState({contacts:res.data})).catch
        // ((err)=>console.log("error"))
    }

    //PUT() Method - Refers to 78 line
    // handleUpdate=(e)=>{
    //     axios.put("http://localhost:3001/ContactsDetails/b8a1",{
    //         cname:"mahesh",
    //         cno:"8374844847",
    //         cemail:"mahi@123"
    //     }).then((res)=>console.log(res)).catch((error)=>console.log(error))
    // }

    ///PATCH() Method - Refers to 78 line
    // handleUpdate=(e)=>{
    //     axios.patch("http://localhost:3001/ContactsDetails/b8a1",{
    //         cname:"prabhas"
    //     }).then((res)=>console.log(res)).catch((error)=>console.log(error))
    // }

    //DELETE() Method - Refers to 79
    // handleDelete=(e)=>{
    //     axios.delete("http://localhost:3001/ContactsDetails/cc5a").then((res)=>console.log(res)).catch((error)=>console.log(error))
    // }

    handleDelete = (e, keyid) => {
        axios.delete(`http://localhost:3001/ContactsDetails/${keyid}`).then((res) => {
            //Deletion Using Filter Method
            const temp = this.state.contacts.filter((item) => item.id !== keyid)
            this.setState({ contacts: temp });

            //Deletion Using Slice Method
            // const temp=this.state.contacts;
            // const index=temp.findIndex((item)=>item.id===keyid)

            // const splicedArray=temp.splice(index,1);

            // console.log("Deleted Objected from Array:",splicedArray);
            // console.log("Remaining Objects in Array:",temp)

            // this.setState({contacts: temp})
        }).catch((error) => console.log(error))
    }

    handleUpdate = (e, keyid) => {
        this.setState({ isUpdated: !(this.state.isUpdated) })
        this.setState({ isId: keyid })
    }

    render() {
        return (
            <div className="main-container">
                <div className="head-Contianer">
                <h1 className="heading"> Contact Manager</h1>
                </div>
                <form>
                    <div className="contact">
                    <div class="from-container">
                        <div>
                            <label className="label1">Contact Name:</label>
                            <input type="text" placeholder="enter the name of the contact" onChange={(e) => this.handleChange(e, "contactname")}></input>
                        </div>
                        <div>
                            <label className="label2">Contact Mail:</label>
                            <input type="text" placeholder="Email" onChange={(e) => this.handleChange(e, "contactemail")} ></input>
                        </div>
                        <div>
                            <label className="label3">Contact Number:</label>
                            <input type="text" placeholder="Phone" onChange={(e) => this.handleChange(e, "contactnumber")}></input>
                        </div>
                        <button className="button" onClick={(e) => this.handleSubmit(e)}>{(this.state.isUpdated) ? "Update Contact" : "Create Contact"}</button>
                        {/* <button onClick={(e)=>this.handleUpdate(e)}>Update</button> */}
                        {/* <button onClick={(e)=>this.handleDelete(e)}>Delete</button> */}
                    </div>
                    <div className="img-container">
                        {/* <img src="https://th.bing.com/th/id/OIP.k3yHENuQIPYNx0LBJ6xKzQHaEW?rs=1&pid=ImgDetMai"  alt="No Image"/> */}
                        <img src="https://th.bing.com/th/id/OIP.iBAwoYimuaiMwMfH8WTQfgHaFC?w=235&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"   alt="No Image" />
                    </div>
                    </div>
                </form>

                <p style={{ color: "red" }}>{this.state.statusMsg}</p>
                <div className="details-Container">
                    
                    {
                    this.state.contacts.map((item) => (
                        <div className="details" key={item.id}>
                            <h2 className="heading2">Name :{item.cname}</h2>
                            <p className="num">Phone :{item.cno}</p>
                            <p className="email">Email :{item.cemail}</p>
                            <button className="deletebutton" onClick={(e) => this.handleDelete(e, item.id)}>Delete</button>
                            <button className="updatebutton" onClick={(e) => this.handleUpdate(e, item.id)}>Update</button>
                            <br></br>
                            <hr></hr>
                        </div>
                    ))
                }
                    </div>
                </div>
            
        )
    }
}
export default ContactManager