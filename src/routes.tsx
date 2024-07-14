import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/components/login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <Login />,
	}
]);

export default router;