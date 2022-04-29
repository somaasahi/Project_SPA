import React from "react";
import ReactDOM from "react-dom";



function Login() {

    return (
        <div>
          login
        </div>
    );
}

export default Login;

if (document.getElementById("app")) {
    ReactDOM.render(<Login />, document.getElementById("app"));
}
