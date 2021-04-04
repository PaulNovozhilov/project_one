import React from 'react';

export class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: ''
        }
    }
    render() {
        return (
            <div className="container col-8">
                <div>
                    <h2>{this.state.title}</h2>
                </div>
                <div>
                    <h6><i>Автор: {this.state.author}</i></h6>
                </div>
                <div>
                    <div className="text-start"><b>{this.state.text}</b></div>
                </div>
                <div>
                    <div>Публикация: {this.state.date_added}</div>
                </div>
                <div>
                    <p>ID: {this.state.id}</p>
                </div>
            </div>
        );
    }
    componentDidMount() {
        const formData = new FormData();
        formData.append("id","id")
        fetch("http://psnov555.beget.tech/php/getPost.php", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(result => {
                 this.setState({
                    id: result.id,
                    title: result.title,
                    author: result.author,
                    text: result.text,
                    date_added: result.date_added
                })
            });
    }
}



