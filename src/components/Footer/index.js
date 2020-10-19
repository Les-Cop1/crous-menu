import React, {Component} from "react";

export default class Footer extends Component {

    render() {

        return (
            <footer className="container py-2 fixed-bottom">
                <div className="row">
                    <div className="col-12 col-md d-inline text-right">
                        <small className="d-block mb-3 text-four" style={{fontSize: "medium"}}>
                            Lucas Stoebner & Félix Legrelle © 2020-2020
                        </small>
                    </div>
                </div>
            </footer>
        )
    }
}
