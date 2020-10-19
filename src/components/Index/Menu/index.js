import React from 'react';
import axios from "axios";
import MenuCard from "./MenuCard";
import Loading from "../../Loading";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.getMonday = this.getMonday.bind(this)
        this.updateWeek = this.updateWeek.bind(this)

        this.state={
            lundi: this.getMonday(),
            menu:[],
            cafet: 15,
            loading: true
        }
    }

    componentDidMount() {
        this.loadMenu()
    }

    loadMenu() {
        let daysOfWeek = []
        let currentDay = this.state.lundi
        for (let i = 0; i < 5; i++) {
            currentDay.setDate(currentDay.getDate() + 1)
            daysOfWeek[i] = currentDay.getTime()
        }

        daysOfWeek.forEach((timestamp, i) => {
            let url = "https://gddl.crous-versailles.fr/vae/api/menus/date_and_lieu/" + timestamp + "/" + this.state.cafet

            axios.get(url)
                .then((reponse) =>{
                    let menu = this.state.menu
                    menu[i] = reponse.data[0].plat.libelle.split(', ')
                    this.setState({
                        menu,
                        loading: false
                    })
                }).catch((status)=>{
                console.log("Erreur de requete GET", status)
            })
        })

        console.log(this.state.menu)
    }

    getMonday() {
        let curr = new Date()
        let first = curr.getDate() - curr.getDay()

        return new Date(curr.setDate(first))
    }

    updateWeek(sens, nombre){
        let lundi = this.state.lundi

        //TODO Gérer fin d'année

        if (sens === "+") {
            lundi = lundi.setDate(lundi.getDate() + 7)
        } else {
            lundi = lundi.setDate(lundi.getDate() - 7)
        }

        this.setState({
            lundi
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="row align-content-center" style={{height: "80vh"}}>
                    <div className="col d-flex justify-content-center">
                        <Loading />
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    {
                        this.state.menu.map(plat => {
                            return <MenuCard plat={plat} />
                        })
                    }
                </>
            );
        }
    }
}
