import React from "react";
import ReactDOM from "react-dom";

function About() {
    return (
        <div className="md:w-8/12 m-auto">
            <p>about</p>
        </div>
    );
}

export default About;

if (document.getElementById("app")) {
    ReactDOM.render(<About />, document.getElementById("app"));
}
