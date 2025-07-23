// Routes.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnectPage from "../pages/connect";
import HomePage from "../pages/home";
import Login from "../pages/filing";
import FeedPage from "../pages/feed";
import VotePage from "../pages/voting";
import Header from "../components/header";
import CustomPlanPage from "../pages/CustomPlanPage";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Header title={"Connect"} />
							<ConnectPage />
						</>
					}
				/>
				<Route
					path="/home"
					element={
						<>
							<Header title={"Home"} />
							<HomePage />
						</>
					}
				/>
				<Route
					path="/login"
					element={
						<>
							<Header title={"Login"} />
							<Login />
						</>
					}
				/>
				<Route
					path="/feed"
					element={
						<>
							<Header title={"Feed"} />
							<FeedPage />
						</>
					}
				/>
				<Route
					path="/voting"
					element={
						<>
							<Header title={"Voting"} />
							<VotePage />
						</>
					}
				/>
				<Route
					path="/custom-plan"
					element={
						<>
							<Header title={"Custom Plan"} />
							<CustomPlanPage />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
