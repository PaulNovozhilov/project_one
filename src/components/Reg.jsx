import React from "react";
import {Redirect} from "react-router-dom";

export class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            lastname: "",
            email: "",
            password: "",
            info: "",
            redirect: false,
            submitBtn: "disabled"
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("lastname", this.state.lastname);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        fetch("http://psnov555.beget.tech/php/handlerReg.php", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                this.setState({
                    redirect: true
                })
            })
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
        if (name === "email") {
            if (value === "") {
                this.setState({submitBtn: "disabled"});
                return;
            }
            const formData = new FormData();
            formData.append("email", value);
            fetch("http://psnov555.beget.tech/php/checkEmail.php", {
                method: "POST",
                body: formData
            }).then(response => response.json())
                .then(result => {
                    if (result.result === "exist") {
                        this.setState({
                            info: "Пользователь с таким e-mail уже существует",
                            submitBtn: "disabled"
                        });
                    } else {
                        this.setState({
                            info: "",
                            submitBtn: "",
                        });
                    }
                })
        }
    }

    render() {
        if(this.state.redirect)
            return <Redirect to="/" />
        else
        return (
            <div className="col-md-3 my-3 mx-auto">
                <h4 className="mb-3">Регистрация на сайте</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <input name="name" type="text"
                               value={this.state.name}
                               onChange={this.handleInputChange}
                               className="form-control"
                               placeholder="Ваше имя"/>
                    </div>
                    <div className="mb-3">
                        <input name="lastname" type="text"
                               value={this.state.lastname}
                               onChange={this.handleInputChange}
                               className="form-control"
                               placeholder="Фамилия"/>
                    </div>
                    <div className="mb-3">
                        <input name="email" type="email"
                               value={this.state.email}
                               onChange={this.handleInputChange}
                               className="form-control"
                               placeholder="E-mail"/>
                        <p style={{color: "red"}}>{this.state.info}</p>
                    </div>
                    <div className="mb-3">
                        <input name="password" type="password"
                               value={this.state.password}
                               onChange={this.handleInputChange}
                               className="form-control"
                               placeholder="Пароль"/>
                    </div>
                    <div className="mb-3">
                        <input type="submit" className="form-control btn btn-primary" value="Зарегистрироваться"/>
                    </div>
                </form>
            </div>
        );
    }
}