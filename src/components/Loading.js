import React from "react"
import { Container } from "react-bootstrap"
import "./loader.css"

const Loading = ({show})=>{
    return show && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
            

        <Container className="text-center p-4 loader">
            <h1>Loading...</h1>
        </Container>
        </div>
    )
}


export default Loading;