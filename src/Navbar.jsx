import React from "react";

export default function Navbar(props) {
    return (
        <>
            <header className='page'>
                <div> <b>&#60;</b> <span>{props.heading}</span></div>
            </header>
        </>
    )
}