import React from "react"

const Header = () => {
    return (
        <nav>
            <div className="brand">
                <img
                    src={process.env.PUBLIC_URL + "favicon.png"}
                    alt=""
                    width="30"
                    height="30"
                    className="d-inline-block align-top mr-2"
                />
                <div className="title">Menu CROUS</div>
            </div>
            <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://crousandgo.crous-versailles.fr/home"
            >
                Commander
            </a>
        </nav>
    )
}

export default Header
