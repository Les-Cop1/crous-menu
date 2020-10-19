import React from 'react';
import {GridLoader} from "react-spinners";

export default class Loading extends React.Component {

    render() {

        return (
            <div className="">
                <GridLoader size={"30px"} color={"#d30304"} />
            </div>
        );
    }
}
