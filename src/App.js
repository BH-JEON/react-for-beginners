import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from './routes/Home'
import Detail from "./routes/Details";


function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home/>
        },
        {
            path: `/movies/:id`,
            element: <Detail/>
        }
    ])

    return <RouterProvider router={router}></RouterProvider>
}

export default App;
