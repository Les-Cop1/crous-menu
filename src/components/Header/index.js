import React from 'react';

export default class Header extends React.Component {

    render() {

        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img src={process.env.PUBLIC_URL + "icon.png"} alt="" width="30" height="30"
                             className="d-inline-block align-top mr-2" />
                            Menu CROUS
                    </div>
                </div>
            </nav>
        );
    }
}
