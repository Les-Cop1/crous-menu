import React, { useEffect, useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"

const MenuCard = ({ menu }) => {
    const [image, setImage] = useState(process.env.PUBLIC_URL + "/nothing.jpg")

    const updateImage = () => {
        let words = menu.meal[0].split(" ")
        let query
        if (words[1] === "de") {
            query = menu.meal[0].split(" ")[2]
        } else {
            query = menu.meal[0].split(" ")[0]
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

                if (data.hits[index]) {
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
    }, [menu])

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
                <div>
                    <ul>
                        {menu.meal.map((plat, i) => (
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
        day: PropTypes.number,
    }),
    loading: PropTypes.bool,
}

export default MenuCard
