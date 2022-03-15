import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductInventory } from "../../reduxStore";
import Layout from "../layout/Layout";
import ShoppingCardDisplayPage from "../layout/ShoppingCardDisplayPage";

function ShoppingPage() {

	const dispatch = useDispatch();
	const inventory = useSelector((state) => state.inventory);

	async function getInventory() {
		try {
			const response = await axios.get(
				"http://localhost:3001/api/productInventory/");
			dispatch({
				type: updateProductInventory,
				payload: {
					inventory: response.data.payload,
				},
			});
		} catch (e) {
			alert(e.response.data.message);
		}
	}
	useEffect(() => {
		getInventory();
	}, []);

	if (!inventory) {
		return null;
	}



	return (
		<Layout>
			<Box sx={{ mt: 3, pt: 1, borderTop: "1px solid white" }}>
				<Typography
					sx={{ color: "white", textDecoration: "underline" }}
					variant="h6"
				>
					Blankets
				</Typography>
			</Box>
			<Box
				id="category1-scroll"
				sx={{ py: 1, display: "flex", height: "350px", ml: 2, pb: 1 }}
			>
				{inventory.map((product) =>
					inventory && product.category === "Blankets" ? (
						<Box
							key={product._id}
							mr={1}
							mb={2}
							sx={{ minWidth: "250px", minHeight: "350px" }}
						>
							<ShoppingCardDisplayPage
								product={{
									id: product._id,
									title: product.title,
									brand: product.brand,
									price: product.price,
									image: product.image,
									description: product.description,
								}}
								key={product._id}
							/>
						</Box>
					) : null
				)}
			</Box>
			<Box sx={{ mt: 3, pt: 1, borderTop: "1px solid white" }}>
				<Typography
					sx={{ color: "white", textDecoration: "underline" }}
					variant="h6"
				>
					Hats
				</Typography>
			</Box>
			<Box
				id="category1-scroll"
				sx={{ py: 1, display: "flex", height: "350px", ml: 2, pb: 1 }}
			>
				{inventory.map((product) =>
					inventory && product.category === "Hats" ? (
						<Box
							key={product._id}
							mr={1}
							mb={2}
							sx={{ minWidth: "250px", minHeight: "350px" }}
						>
							<ShoppingCardDisplayPage
								product={{
									id: product._id,
									title: product.title,
									brand: product.brand,
									price: product.price,
									image: product.image,
									description: product.description,
								}}
								key={product._id}
							/>
						</Box>
					) : null
				)}
			</Box>
			<Box sx={{ mt: 3, pt: 1, borderTop: "1px solid white" }}>
				<Typography
					sx={{ color: "white", textDecoration: "underline" }}
					variant="h6"
				>
					Dolls
				</Typography>
			</Box>
			<Box
				id="category1-scroll"
				sx={{ py: 1, display: "flex", height: "350px", ml: 2, pb: 1, mb: 3 }}
			>
				{inventory.map((product) =>
					inventory && product.category === "Dolls" ? (
						<Box
							key={product._id}
							mr={1}
							mb={2}
							sx={{ minWidth: "250px", minHeight: "350px" }}
						>
							<ShoppingCardDisplayPage
								product={{
									id: product._id,
									title: product.title,
									brand: product.brand,
									price: product.price,
									image: product.image,
									description: product.description,
								}}
								key={product._id}
							/>
						</Box>
					) : null
				)}
			</Box>
		</Layout>
	);
}

export default ShoppingPage;
