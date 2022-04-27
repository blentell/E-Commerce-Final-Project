import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateShoppingCart } from "../../reduxStore";
import Axios from "../lib/Axios"

function ShoppingCardDisplayPage(props) {

	const { product } = props;
	const { id,title, brand, price, image, description, quantity } = product;
	const dispatch = useDispatch();
	const handleAddToCart = async () => {
		try {
			const response = await Axios.post("/cartDatabase/add-cart-item", {
				title,
				brand,
				description,
				image,
				price,
			}, {
				headers: {
					authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
				},
			});
			dispatch({
				type: updateShoppingCart,
				payload: {
					shoppingCart: response.data.payload,
				},
					
			});
		} catch (e) {
			alert("Must be logged in to add items to cart!");
		};
	}
	return (
		<Box sx={{ mx: "auto" }}>
			<Card
				sx={{
					backgroundColor: "#bcb5ae",
					color: "#3e3c3d",
					minHeight: "350px",
					position: "relative",
					mb: 1
				}}
			>
				<CardHeader
					action={<Typography sx={{ mr: 1 }}>$ {price / 100}</Typography>}
					sx={{ textAlign: "left" }}
					title={<Typography variant="body2">{title}</Typography>}
					subheader={<Typography variant="caption text">{brand}</Typography>}
				/>

				<CardMedia
					component="img"
					height="194"
					src={image}
					id="productImage"
					alt="blue"
					sx={{ mb: 1 }}
				/>
				<Link to="/product">
					<Button
						sx={{
							":hover": {
								opacity: "80%",
								backgroundColor: "white",
								transition: " all .5s ease-in-out",
							},
							opacity: 0,
							color: "black",
							backgroundColor: "white",
							borderRadius: "30%",
							position: "absolute",
							zIndex: 2,
							top: 150,
							left: 100,
						}}
					>
						<SearchIcon />
					</Button>
				</Link>
				<CardActions
					disableSpacing
					sx={{
						flexGrow: 1,
						alignContent: "center",
						justifyContent: "center",
					}}
				>
					<Button
						sx={{ color: "white", backgroundColor: "#772e25", fontSize: 12 }}
						variant="text"
						onClick={handleAddToCart}
					>
						Add to cart
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}

export default ShoppingCardDisplayPage;
