import React from 'react';
import axios from 'axios'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            timestamp: Math.floor(Date.now() / 1000),
            menu:[],
            cafet:15,
            loading:false
        }
    }
    componentWillMount() {
        axios
            .get("https://gddl.crous-versailles.fr/vae/api/menus/date_and_lieu/"+this.state.timestamp+"000/"+this.state.cafet)
            .then((reponse) =>{
                console.log(reponse)
                this.setState({menu:reponse.data[0].plat.libelle.split(', ')})
                console.log(this.state)
            }).catch((status)=>{
                console.log("erreur de requete GET")
        })

    }

    render(){
        return (
            <div>

            </div>
        );
    }
}
