import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/components/login";
import Discover from "./modules/discover/components/discover";
import Books from "./modules/books/components/books";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", Component: Books },
			{ path: "/discover", Component: Discover },
			{ path: "/recommendations", element: <div><h1>Recommendations</h1></div> },
			{ path: "/wishlist", element: <div><h1>Wishlist</h1></div> },
		]
	},
	{
		path: "/login",
		element: <Login />,
	}
]);

export default router;