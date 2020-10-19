import React from 'react';
import axios from "axios";
import MenuCard from "./MenuCard";
import Loading from "../../Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.getMonday = this.getMonday.bind(this)
        this.updateWeek = this.updateWeek.bind(this)

        this.state = {
            lundi: this.getMonday(new Date()),
            menu: [],
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
            daysOfWeek[i] = currentDay.getTime()
            currentDay.setDate(currentDay.getDate() + 1)
        }
        this.setState({
            lundi: this.getMonday(currentDay)
        })

        daysOfWeek.forEach((timestamp, i) => {
            let url = "https://gddl.crous-versailles.fr/vae/api/menus/date_and_lieu/" + timestamp + "/" + this.state.cafet

            axios.get(url)
                .then((reponse) => {
                    let menu = this.state.menu

                    if (reponse.data.length > 0)
                        menu[i] = {jour: timestamp, plat: reponse.data[0].plat.libelle.split(', ')}
                    else {
                        menu[i] = {jour: timestamp, plat: ["Aucun menu pour ce jour"]}
                    }

                    this.setState({
                        menu,
                        loading: false
                    })
                }).catch((status) => {
                console.log("Erreur de requete GET", status)
            })
        })
    }

    getMonday(d) {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    updateWeek(sens, nombre) {
        let lundi = this.state.lundi
        if (sens === "+") {
            lundi.setDate(lundi.getDate() + nombre * 7)
        } else {
            lundi.setDate(lundi.getDate() - nombre * 7)
        }
        this.loadMenu()
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="row align-content-center" style={{height: "80vh"}}>
                    <div className="col d-flex justify-content-center">
                        <Loading/>
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    <div className="row my-2">
                        <div className="col">
                            <button type="button" className="btn d-flex float-left align-items-center"
                                    onClick={() => this.updateWeek("-", 1)}>
                                <FontAwesomeIcon className="mb-0 mr-3" icon={["fas", "chevron-left"]}/>
                                Semaine précédente
                            </button>
                        </div>

                        <div className="col">
                            <button type="button" className="btn d-flex float-right align-items-center"
                                    onClick={() => this.updateWeek("+", 1)}>
                                Semaine suivante
                                <FontAwesomeIcon className="mb-0 ml-3" icon={["fas", "chevron-right"]}/>
                            </button>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-5">
                        {

                            this.state.menu.map((menu, i) => {
                                return <MenuCard key={i} menu={menu}/>
                            })
                        }
                    </div>
                </>
            );
        }
    }
}
