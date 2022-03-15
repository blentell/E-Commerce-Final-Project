import HomeIcon from "@mui/icons-material/Home";
import ReplayIcon from "@mui/icons-material/Replay";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckToken from "../../hooks/CheckToken";
import { updateShoppingCart } from "../../reduxStore";
import CartItem from "../layout/CartItem";
import Layout from "../layout/Layout";


function CartPage() {
	const shoppingCart = useSelector((state) => state.shoppingCart);
	const { checkJwtToken } = CheckToken();
		const dispatch = useDispatch();

		const total = shoppingCart.reduce((acc, cartItem) => {
			return acc + cartItem.price * cartItem.quantity;
		}, 0);

	const emptyCart = () => {
			async function clearCart() {
			try {
				const response = await axios.delete(
					`http://localhost:3001/api/cartDatabase/empty-cart`,
					{
						headers: {
							authorization: `Bearer ${window.localStorage.getItem(
								"jwtToken"
							)}`,
						},
					}
				);
		
				dispatch({
					type: updateShoppingCart,
					payload: {
						shoppingCart: response.data.payload,
					},
				});
			} catch (e) {
				alert(e.response.data.error);
			}
		}
		clearCart();
	};
	if (!shoppingCart) {
		return null;
}
	
	return (
		<Layout>
			<h1 style={{ color: "white", textDecoration: "underline" }}>
				Shopping Cart
			</h1>
			<Box p={2} minHeight={752}>
				{shoppingCart.map((item) => (
					<Box mb={2} key={item._id}>
						<CartItem
							cartItem={{
								id: item._id,
								title: item.title,
								price: item.price,
								quantity: item.quantity,
								image: item.image,
							}}
						/>
					</Box>
				))}
				<Box marginTop="40px" display="flex" justifyContent="center">
					<Typography style={{ color: "white" }}>
						Total: $ {total / 100}
					</Typography>
				</Box>
				<Box marginTop="20px" display="flex" justifyContent="center">
					<Link to="/checkout">
						<Button
							sx={{
								width: "220px",
								color: "#3e3c3d",
								backgroundColor: "#bcb5ae",
							}}
							variant="contained"
						>
							CHECKOUT
						</Button>
					</Link>
				</Box>
				<Box marginTop="20px" display="flex" justifyContent="center">
					<Button
						sx={{
							width: "220px",
							color: "#3e3c3d",
							backgroundColor: "#bcb5ae",
						}}
						variant="contained"
						startIcon={<ReplayIcon />}
						onClick={emptyCart}
					>
						Empty Cart
					</Button>
				</Box>
				<Box marginTop="20px" display="flex" justifyContent="center">
					<Link to="/">
						<Button
							sx={{
								width: "220px",
								color: "#3e3c3d",
								backgroundColor: "#bcb5ae",
							}}
							variant="contained"
							startIcon={<HomeIcon />}
						>
							Continue Shopping
						</Button>
					</Link>
				</Box>
			</Box>
		</Layout>
	);
}

export default CartPage ;
