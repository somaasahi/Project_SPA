import React from "react";
import ReactDOM from "react-dom";
import Base from "./Base";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

function Home() {
    return (
        <div className="md:w-8/12 m-auto">
            {/* <img src="storage/post_images/noimg.png" /> */}

            <QueryClientProvider client={client}>
                <Base />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

export default Home;

if (document.getElementById("app")) {
    ReactDOM.render(<Home />, document.getElementById("app"));
}
