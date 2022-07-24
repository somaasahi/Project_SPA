import React from "react";
import ReactDOM from "react-dom";
import background from "./images/about.jpeg";

function About() {
    return (
        <div className="pt-20">
            <div
                className="bg-no-repeat w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${background})`,
                    height: "600px",
                }}
            >
                <div className="m-auto pt-20 flex">
                    <div className="pl-5 w-1/2">
                        <p className="italic">
                            Animal_Rescueは<br></br>
                            <br></br>
                        </p>
                        <p className="italic font-medium">
                            駆け出しのシステムエンジニア二人が作った、「知」の巡りを促進する為のサービスです。
                            <br></br>
                            <br></br>
                        </p>
                        {/* <p className="italic">
                            <br></br>
                            <br></br>
                        </p> */}
                        <p className="italic">
                            動物達に関する知識を持ち寄ることで、彼らのより良い暮らしに繋がれば良いと考えています。
                            <br></br>
                            <br></br>
                        </p>
                    </div>
                    <div className="w-1/2"></div>
                </div>
            </div>
        </div>
    );
}

export default About;

if (document.getElementById("app")) {
    ReactDOM.render(<About />, document.getElementById("app"));
}
