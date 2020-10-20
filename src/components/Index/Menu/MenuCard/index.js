import React from 'react';
import axios from "axios";

export default class MenuCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageURL: "",
        }
        this.updateImage = this.updateImage.bind(this)
    }

    componentDidMount() {
        this.updateImage()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.menu.plat !== this.props.menu.plat) {
            this.updateImage()
        }
    }

    updateImage() {
        let words = this.props.menu.plat[0].split(" ")
        let query
        if (words[1] === "de") {
            query = this.props.menu.plat[0].split(" ")[2]
        } else {
            query = this.props.menu.plat[0].split(" ")[0]
        }

        let url = 'https://pixabay.com/api/?key=3436174-6e8f02e959ab16530c7d606b3&lang=fr&image_type=photo&orientation=horizontal&category=food&safesearch=true&per_page=5&q=' + encodeURI(query)

        axios.get(url)
            .then((response) => {

                let index = Math.floor(Math.random() * Math.floor(response.data.hits.length));

                if (response.data.hits[index]) {
                    let imageURL = response.data.hits[index].webformatURL
                    this.setState({
                        imageURL
                    })
                } else {
                    this.setState({
                        imageURL : process.env.PUBLIC_URL + "/rien.jpg"
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    render() {
        let jour = new Date(this.props.menu.jour)
        return (
            <div className="col my-2">
                <div className="card h-100">
                    <img src={this.state.imageURL} className="card-img-top unselectable image-preview" draggable="false" alt={this.props.menu.plat[0]}/>
                    <div className="card-body">
                        <h2 className="card-title text-capitalize">
                            {jour.toLocaleDateString("fr-FR", {weekday: "long"})}
                        </h2>
                        <h5 className="card-title text-muted">
                            {
                                jour.toLocaleDateString("fr-FR", {
                                    month: "long",
                                    day: "numeric"
                                })
                            }
                        </h5>

                        <p className="card-text">
                            {this.props.menu.plat.map((plat, i) => {
                                return (
                                    <li key={i} className="text-capitalize-first">{plat}</li>
                                )
                            })}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
