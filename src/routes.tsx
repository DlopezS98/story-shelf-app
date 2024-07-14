import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/components/login";
import Discover from "./modules/discover/components/discover";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/discover", Component: Discover },
		]
	},
	{
		path: "/login",
		element: <Login />,
	}
]);

export default router;