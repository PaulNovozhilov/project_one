import React from 'react';
import {Redirect} from "react-router-dom";

export class AddPost extends React.Component{
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.state = {
            title:"",
            text:"",
            author:"",
            info: "",
            redirect: false,
            submitBtn: "disabled"
        }
    }
    sendForm(event){
        event.preventDefault();
        if(this.state.info === ""){
            const formData = new FormData();
            formData.append("title",this.state.title);
            formData.append("text",this.state.text);
            formData.append("author", this.state.author);
            fetch("http://psnov555.beget.tech/php/addPost.php",{
                method: "POST",
                body: formData
            }).then(response=>response.json())
                .then(result=>{
                    this.setState({
                        redirect: true
                    })
                })
        }
    }

    handleInputChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]:value
        })
        if (name === "title"){
            if (value === "") {
                this.setState({submitBtn: "disabled"});
                return;
            }
            const formData = new FormData();
            formData.append("title",value);
            fetch("http://psnov555.beget.tech/php/checkTitle.php",{
                method: "POST",
                body: formData
            }).then(response=>response.json())
                .then(result=>{
                    if(result.result === "exist"){
                        this.setState({
                            info: "Такой заголовок уже существует!",
                            submitBtn: "disabled"
                        })
                    }else{
                        this.setState({
                            info: "",
                            submitBtn: "",
                        })
                    }
                });
        }
    }
    render() {
        if(this.state.redirect)
            return <Redirect to="/" />
        else
            return <div className="col-md-5 my-5 mx-auto">
                <h1 className="text-center my-3">Добавление поста</h1>
                <form onSubmit={this.sendForm}>
                    <div className="mb-3">
                        <input value={this.state.title} onChange={this.handleInputChange} name="title" type="text" className="form-control" placeholder="Заголовок статьи"/>
                        <p style={{color:"red"}}>{this.state.info}</p>
                    </div>
                    <div className="mb-3">
                        <textarea value={this.state.text} onChange={this.handleInputChange} name="text" type="text" className="form-control" placeholder="Текст поста"/>
                    </div>
                    <div className="mb-3">
                        <input value={this.state.author} onChange={this.handleInputChange} name="author" type="text" className="form-control" placeholder="author"/>
                    </div>
                    <div className="mb-3">
                        <input type="submit" disabled={this.state.submitBtn}  className="form-control btn btn-primary" value="Добавить"/>
                    </div>
                </form>
            </div>
    }
}