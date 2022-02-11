import React, { useEffect, useState } from "react"
import axios from "axios"
import MenuCard from "./MenuCard"

const Menu = () => {
    const [menus, setMenus] = useState([])
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [cafeteria] = useState(15)
    const [loading, setLoading] = useState(true)

    const getMonday = (d) => {
        d = new Date(d)
        const day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
        return new Date(d.setDate(diff))
    }

    const loadMenu = async () => {
        setLoading(true)

        const currentDay = getMonday(currentWeek)
        let daysOfWeek = []

        for (let i = 0; i < 5; i++) {
            daysOfWeek[i] = currentDay.getTime()
            currentDay.setDate(currentDay.getDate() + 1)
        }

        let currentMenus = []

        for (let timestamp of daysOfWeek) {
            try {
                const response = await axios.get(
                    `https://gddl.crous-versailles.fr/vae/api/menus/date_and_lieu/${timestamp}/${cafeteria}`
                )
                const { data } = response

                if (data.length > 0) {
                    currentMenus.push({
                        day: timestamp,
                        meal: data[0].plat.libelle.split(", "),
                    })
                } else {
                    currentMenus.push({
                        day: timestamp,
                        meal: ["Aucun menu pour ce jour"],
                    })
                }
            } catch (error) {
                currentMenus.push({
                    day: timestamp,
                    meal: ["Aucun menu pour ce jour"],
                })
            }
        }

        setLoading(false)
        setMenus(currentMenus)
    }

    const previousWeek = () => {
        const current = new Date(currentWeek)
        current.setDate(current.getDate() - 7)
        setCurrentWeek(current)
    }

    const nextWeek = () => {
        const current = new Date(currentWeek)
        current.setDate(current.getDate() + 7)
        setCurrentWeek(current)
    }

    useEffect(() => {
        loadMenu().then(() => {
            console.log("Menu loaded")
        })
    }, [currentWeek])

    return (
        <div className="container">
            <div className="weeks">
                <button type="button" onClick={previousWeek}>
                    &#12296; &nbsp; Semaine précédente
                </button>

                <button type="button" onClick={nextWeek}>
                    Semaine suivante &nbsp; &#12297;
                </button>
            </div>
            <div className="menus">
                {menus.map((menu, i) => {
                    return <MenuCard key={i} menu={menu} loading={loading} />
                })}
            </div>
        </div>
    )
}

export default Menu
