import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import "./assets/styles/index.css"
import App from "./App"

ReactDOM.render(
    <Suspense fallback={<></>}>
        <App />
    </Suspense>,
    document.getElementById("root")
)
