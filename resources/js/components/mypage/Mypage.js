import React from "react";
import ReactDOM from "react-dom";




function Mypage() {

    return (
        <div>
          mypage
        </div>
    );
}

export default Mypage;

if (document.getElementById("app")) {
    ReactDOM.render(<Mypage />, document.getElementById("app"));
}
