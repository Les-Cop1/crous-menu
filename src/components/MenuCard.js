import React, { useEffect, useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import MenuCardSkeleton from "./MenuCardSkeleton"

const MenuCard = ({ menu, loading }) => {
    if (loading) {
        return <MenuCardSkeleton />
    }

    const [image, setImage] = useState(process.env.PUBLIC_URL + "/nothing.jpg")
    const [vegeMenu, setVegeMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState(menu.meal)

    useEffect(() => {
        setActiveMenu(vegeMenu ? menu.mealVege : menu.meal)
    }, [vegeMenu])

    const updateImage = () => {
        let words = activeMenu[0].split(" ")
        let query
        if (words[1] === "de") {
            query = activeMenu[0].split(" ")[2]
        } else {
            query = activeMenu[0].split(" ")[0]
        }

        axios
            .get(
                `https://pixabay.com/api/?key=3436174-6e8f02e959ab16530c7d606b3&lang=fr&image_type=photo&orientation=horizontal&category=food&safesearch=true&per_page=5&q=${encodeURI(
                    query
                )}`
            )
            .then((response) => {
                const { data } = response

                let index = Math.floor(
                    Math.random() * Math.floor(data.hits.length)
                )

                if (data.hits[index] && query !== "Aucun") {
                    setImage(data.hits[index].webformatURL)
                } else {
                    setImage(process.env.PUBLIC_URL + "/nothing.jpg")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        updateImage()
    }, [menu, vegeMenu])

    return (
        <div className="menu">
            <div className="menu-image">
                <img src={image} draggable="false" alt={menu.meal[0]} />
            </div>
            <div className="menu-body">
                <h2>
                    {new Date(menu.day).toLocaleDateString("fr-FR", {
                        weekday: "long",
                    })}
                </h2>
                <h5>
                    {new Date(menu.day).toLocaleDateString("fr-FR", {
                        month: "long",
                        day: "numeric",
                    })}
                </h5>
                <div className="menu-subHeader">
                    <button
                        type="button"
                        className={vegeMenu ? "" : "is-active"}
                        onClick={() => setVegeMenu(false)}
                    >
                        &#129385;
                    </button>
                    <div style={{ margin: ".2rem" }} />
                    <button
                        type="button"
                        className={vegeMenu ? "is-active" : ""}
                        onClick={() => setVegeMenu(true)}
                    >
                        &#127811;
                    </button>
                </div>
                <div>
                    <ul>
                        {activeMenu.map((plat, i) => (
                            <li key={i} className="text-capitalize-first">
                                {plat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

MenuCard.propTypes = {
    menu: PropTypes.shape({
        meal: PropTypes.arrayOf(String),
        mealVege: PropTypes.arrayOf(String),
        day: PropTypes.number,
    }),
    loading: PropTypes.bool,
}

export default MenuCard
