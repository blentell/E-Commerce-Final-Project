import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import {
	updateShoppingCart
} from "../../reduxStore";
import Axios from "../lib/Axios";

export default function CartItem(props) {
	const {
		cartItem: { id, title, image, quantity, price },
	} = props;

	const dispatch = useDispatch();

	const removeItem = (id) => {
		async function deleteFromCart() {
			try {
				const response = await Axios.delete(
					`/cartDatabase/delete-cart-item/${id}`,
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
		deleteFromCart();
	};
const increaseQuantity = (id) => {
	async function increaseQuantityFromCart() {
		try {
			const response = await Axios.put(
				`/cartDatabase/update-cart-item/${id}`, {
					quantity: quantity + 1, 
				},
				{
					headers: {
						authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
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
	increaseQuantityFromCart();
	};
	
	const decreaseQuantity = (id) => {
		async function decreaseQuantityFromCart() {
			try {
				const response = await Axios.put(
					`/cartDatabase/update-cart-item/${id}`,
					{
						quantity: quantity - 1,
					},
					{
						headers: {
							authorization: `Bearer ${window.localStorage.getItem(
								"jwtToken"
							)}`,
						},
					}
				);

				await dispatch({
					type: updateShoppingCart,
					payload: {
						shoppingCart: response.data.payload,
					},
				});
			} catch (e) {
				alert(e.response.data.error);
			}
		}
		decreaseQuantityFromCart();
	};

	return (
		<Card
			sx={{ display: "flex", backgroundColor: "#bcb5ae", color: "#3e3c3d" }}
		>
			<CardMedia
				component="img"
				sx={{ height: 80, maxWidth: 80, p: 1 }}
				image={image}
				alt={title}
			/>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				flexGrow={1}
			>
				<Box mb={1}>
					<Typography fontSize="12px" fontWeight="bold">
						{title}
					</Typography>
				</Box>
				<Box>
					<Typography fontWeight="bold">$ {price / 100}</Typography>
				</Box>
			</Box>
			<Box display="flex" flexDirection="column" justifyContent="center">
				<Box sx={{ mr: "-15px" }}>
					<IconButton
						onClick={() => {
							decreaseQuantity(id);
						}}
					>
						<ArrowDownwardIcon style={{ color: "white" }} />
					</IconButton>
				</Box>
			</Box>
			<Box display="flex" flexDirection="column" justifyContent="center">
				<Box px={1}>
					<Typography fontSize="12px" fontWeight="bold">
						x{quantity}
					</Typography>
				</Box>
			</Box>
			<Box display="flex" flexDirection="column" justifyContent="center">
				<Box sx={{ ml: "-15px" }}>
					<IconButton
						onClick={() => {
							increaseQuantity(id);
						}}
					>
						<ArrowUpwardIcon style={{ color: "white" }} />
					</IconButton>
				</Box>
			</Box>
			<Box display="flex" flexDirection="column" justifyContent="center">
				<Box px={1}>
					<IconButton
						onClick={() => {
							removeItem(id);
						}}
					>
						<DeleteForeverIcon style={{ color: "white" }} />
					</IconButton>
				</Box>
			</Box>
		</Card>
	);
}
