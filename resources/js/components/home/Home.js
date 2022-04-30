import React from "react";
import ReactDOM from "react-dom";



function Home() {

    return (
        <div className="md:text-red-500">
          home
        </div>
    );
}

export default Home;

if (document.getElementById("app")) {
    ReactDOM.render(<Home />, document.getElementById("app"));
}
