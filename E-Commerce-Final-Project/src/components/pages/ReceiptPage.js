import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckToken from "../../hooks/CheckToken";
import Layout from "../layout/Layout";

const initialCheckout = {
	category: "",
	title: "",
	brand: "",
	description: "",
	image: "",
	price: "",
	quantity: "",
};
let index = 0;
function OrderHistoryPage() {
	const navigate = useNavigate();
	const { checkJwtToken } = CheckToken();
	const [orderData, setOrderData] = useState();
	let { orderId } = useParams();
	console.log("orderId: ", orderId);
	useEffect(() => {
		if (checkJwtToken()) {
			navigate(`/receipt/${orderId}`);
		}
	}, []);
	const retrieveOrder = async () => {
		await axios
			.get(
				`http://localhost:3001/api/orderHistoryDatabase/get-order/${orderId}`,
				{
					headers: {
						authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
					},
				}
			)
			.then((response) => setOrderData(response.data.payload));
	};

	useEffect(() => {
		retrieveOrder();
	}, []);
	if (!orderData) {
		return null;
	}

	console.log("orderData: ", orderData);
	console.log("total: ", orderData.total);

	return (
		<Layout>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					mb: 4,
				}}
			>
				<Box>
					<Typography
						sx={{ color: "white", textDecoration: "underline", mb: "10px" }}
						variant="h4"
					>
						Order Receipt
					</Typography>
				</Box>
				<Box sx={{display: "flex", flexDirection: "column"}}>
					<Typography
						sx={{ color: "white", mb: "10px" }}
						variant="caption text"
					>
						Order on Date: {orderData.date}
					</Typography>
					<Typography
						sx={{ color: "white", mb: "10px" }}
						variant="caption text"
					>
						Order Number: {orderId}
					</Typography>
				</Box>
			</Box>

			<Box
				id="inventory-section"
				sx={{
					mx: 1,
					color: "white",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 2,
						borderBottom: "2px solid white",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							mr: 2,
						}}
					>
						<Box style={{ marginBottom: "5px" }}>Image</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							mr: 2,
						}}
					>
						<Box style={{ marginBottom: "5px" }}>Title</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							mr: 2,
						}}
					>
						<Box style={{ marginBottom: "5px" }}>Brand</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							mr: 2,
						}}
					>
						<Box style={{ marginBottom: "5px" }}>Qty</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							mr: 2,
						}}
					>
						<Box style={{ marginBottom: "5px" }}>Price</Box>
					</Box>
				</Box>
			</Box>
			<Box
				id="inventory-section"
				sx={{
					mx: 1,
					color: "white",
					alignItems: "center",
				}}
			>
				{orderData.orderItems.map((orderItem) => (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								height: "50px",
								width: "80px",
							}}
						>
							<img id="productInventoryImage" src={orderItem.image}></img>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								alignItems: "center",
								height: "50px",
								width: "130px",
							}}
						>
							{orderItem.title}
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "50px",
								width: "100px",
							}}
						>
							{orderItem.brand}
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "50px",
								width: "100px",
							}}
						>
							{orderItem.quantity}
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "center",
								height: "50px",
								width: "100px",
							}}
						>
							$ {orderItem.price / 100}
						</Box>
					</Box>
				))}
				<Box
					id="inventory-section"
					sx={{
						mx: 1,
						color: "white",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-end",
							alignItems: "center",
							mt: 2,
							borderBottom: "2px solid white",
							borderTop: "2px solid white",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								mr: 2,
							}}
						>
							<Box style={{ marginBottom: "5px" }}>
								Order Total: $ {orderData.total / 100}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}

export default OrderHistoryPage;
