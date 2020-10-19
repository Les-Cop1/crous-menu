import React from 'react';

export default class MenuCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/71%2BFZ5zAwKL._AC_SL1500_.jpg"
        }
    }

    render() {
        let jour = new Date(this.props.menu.jour)
        return (
            <div className="col my-2">
                <div className="card h-100">
                    <img src={this.state.imageURL} className="card-img-top" alt={this.props.menu.plat[0]}/>
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
