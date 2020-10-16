import React from 'react';
import axios from 'axios'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            menu:[],
            cafet:15
        }
    }
    componentWillMount() {
        axios
            .get("https://gddl.crous-versailles.fr/vae/api/menus/date_and_lieu/1603362756000/"+this.state.cafet)
            .then((reponse) =>{
                console.log(reponse)
            })
    }

    render(){
        return (
            <div>

            </div>
        );
    }
}
