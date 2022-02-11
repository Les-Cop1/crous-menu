import React from "react"

const MenuCardSkeleton = () => (
    <div className="menu is-loading">
        <div className="menu-image" />
        <div className="menu-body">
            <h2>Lorem</h2>
            <h5>Ipsum</h5>
            <div className="menu-subHeader">
                <button type="button">—</button>
                <div style={{ margin: ".2rem" }} />
                <button type="button">—</button>
            </div>
            <div>
                <ul>
                    <li>Lorem Ipsum in dolor</li>
                    <li>Lorem Ipsum in dolor</li>
                    <li>Lorem Ipsum in dolor</li>
                    <li>Lorem Ipsum in dolor</li>
                </ul>
            </div>
        </div>
    </div>
)

export default MenuCardSkeleton
