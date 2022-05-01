import React from "react";
import ReactDOM from "react-dom";
import Base from "./Base";

function Home() {
    return (
        <div className="md:w-8/12 m-auto">
            {/* <img src="storage/post_images/noimg.png" /> */}
            <Base />
        </div>
    );
}

export default Home;

if (document.getElementById("app")) {
    ReactDOM.render(<Home />, document.getElementById("app"));
}
