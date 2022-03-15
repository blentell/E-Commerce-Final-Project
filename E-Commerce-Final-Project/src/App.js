import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ReceiptPage from "./components/pages/ReceiptPage";
import ProductInventoryandUpdatePage from "./components/pages/ProductInventoryandUpdatePage";
import ShoppingPage from "./components/pages/ShoppingPage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import store from "./reduxStore";



function App() {


	return (
		<Provider store={store}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route index element={<ShoppingPage />}></Route>
						<Route path="signin" element={<SignInPage />}></Route>
						<Route path="signup" element={<SignUpPage />}></Route>
						<Route
							path="checkout"
							element={
								<PrivateRoute>
									<CheckoutPage />
								</PrivateRoute>
							}
						/>

						<Route
							path="/protected-home/"
							element={
								<PrivateRoute>
									<CartPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/admin/"
							element={
								<AdminRoute>
									<ProductInventoryandUpdatePage />
								</AdminRoute>
							}
						/>
						<Route
							path="receipt/:orderId"
							element={
								<PrivateRoute>
									<ReceiptPage />
								</PrivateRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;
