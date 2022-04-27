import {
	Button,
	InputLabel,
	MenuItem,
	Select
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckToken from "../../hooks/CheckToken";
import Layout from "../layout/Layout";
import Axios from "../lib/Axios";

const initialInventory = {
	category: "",
	title: "",
	brand: "",
	description: "",
	image: "",
	price: "",
	quantity: "",
};

function ProductInventoryandUpdatePage() {
	const navigate = useNavigate();
	const { checkJwtToken } = CheckToken();
	const [uploadInventoryForm, setUploadInventoryForm] =
		useState(initialInventory);
	const [productData, setProductData] = useState();

	useEffect(() => {
		if (checkJwtToken()) {
			navigate("/admin");
		}
	}, []);
	const getInventory = async () => {
		await Axios
			.get("/productInventory/", {
				headers: {
					authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
				},
			})
			.then((response) => setProductData(response.data.payload));
	};

	useEffect(() => {
		getInventory();
	}, []);


	if (!productData) {
		return null;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await Axios
				.post(
					"/productInventory/add-product",
					{
						...uploadInventoryForm,
						price: Number(uploadInventoryForm.price),
					},
					{
						headers: {
							authorization: `Bearer ${window.localStorage.getItem(
								"jwtToken"
							)}`,
						},
					}
				)
				.then(() => {
					setUploadInventoryForm(initialInventory);
				});
		} catch (e) {
			alert(e.response.data.error);
		}
	}
	const handleRefresh = () => {
		window.location.reload();
	};
	return (
		<Layout>
			<Box
				id="inventory-section"
				sx={{
					mx: 1,
					border: "1px solid white",
					color: "white",
					height: "30vh",
				}}
			>
				<Button onClick={handleRefresh}>Refresh Inventory</Button>
				{productData.map((product) => (
					<Box
						key={product._id}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
						}}
					>
						<Box sx={{ display: "flex", flexWrap: "wrap" }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									mr: 1,
									height: "50px",
								}}
							>
								<Box
									style={{ textDecoration: "underline", marginBottom: "5px" }}
								>
									Category
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "50px",
									}}
								>
									{product.category}
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									mr: 1,
									height: "50px",
								}}
							>
								<Box
									style={{ marginBottom: "5px", textDecoration: "underline" }}
								>
									Image
								</Box>
								<img id="productInventoryImage" src={product.image}></img>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									mr: 1,
								}}
							>
								<Box
									style={{ marginBottom: "5px", textDecoration: "underline" }}
								>
									Title
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexWrap: "wrap",
										width: "100px",
										overflowY: "scroll",
										height: "50px",
									}}
								>
									{product.title}
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									mr: 1,
									width: "100px",
								}}
							>
								<Box
									style={{ marginBottom: "5px", textDecoration: "underline" }}
								>
									Brand
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexWrap: "wrap",
										overflowY: "scroll",
										height: "50px",
									}}
								>
									{product.brand}
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									width: "60px",
								}}
							>
								<Box
									style={{ marginBottom: "5px", textDecoration: "underline" }}
								>
									Price
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "50px",
									}}
								>
									$ {product.price / 100}
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Box>
			<Box
				component="form"
				sx={{
					mt: 3,
					mb: 2,
					height: "32vh",
					"& .MuiTextField-root": {
						width: "30ch",
						justifyContent: "center",
					},
				}}
				noValidate
				autoComplete="off"
			>
				<Box sx={{ display: "flex", mx: 0, justifyContent: "center" }}>
					<FormControl
						sx={{
							"& label": {
								marginLeft: "100px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
						variant="standard"
					>
						<InputLabel id="demo-simple-select-label">Category</InputLabel>
						<Select
							id="outlined-size-normal2"
							label="Category"
							value={uploadInventoryForm.category}
							onChange={(event) => {
								setUploadInventoryForm({
									...uploadInventoryForm,
									category: event.target.value,
								});
							}}
					
						>
							<MenuItem
								value=""
								sx={{ display: "flex", mx: 0, justifyContent: "center" }}
							>
								<em>None</em>
							</MenuItem>
							<MenuItem
								value={"Blankets"}
								sx={{ display: "flex", mx: 0, justifyContent: "center" }}
							>
								Blankets
							</MenuItem>
							<MenuItem
								value={"Dolls"}
								sx={{ display: "flex", mx: 0, justifyContent: "center" }}
							>
								Dolls
							</MenuItem>
							<MenuItem
								value={"Hats"}
								sx={{ display: "flex", mx: 0, justifyContent: "center" }}
							>
								Hats
							</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "center", mx: 1 }}>
					<TextField
						id="outlined-size-normal"
						label="Title"
						value={uploadInventoryForm.title}
						onChange={(event) => {
							setUploadInventoryForm({
								...uploadInventoryForm,
								title: event.target.value,
							});
						}}
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "70px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
							color: "white",
						}}
					/>

					<TextField
						id="outlined-size-normal"
						label="Brand"
						variant="standard"
						value={uploadInventoryForm.brand}
						onChange={(event) => {
							setUploadInventoryForm({
								...uploadInventoryForm,
								brand: event.target.value,
							});
						}}
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "70px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
							color: "white",
						}}
					/>

				</Box>
				<Box sx={{ display: "flex", justifyContent: "center", mx: 1 }}>
					<TextField
						id="outlined-size-normal"
						label="Description"
						multiline={true}
						minRows={3}
						maxRows={3}
						variant="standard"
						value={uploadInventoryForm.description}
						onChange={(event) => {
							setUploadInventoryForm({
								...uploadInventoryForm,
								description: event.target.value,
							});
						}}
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "60px",
								marginTop: "25px",

								"&.Mui-focused": {
									marginTop: "0px",
								},
							},
							color: "white",
						}}
					/>
	
					<TextField
						id="outlined-size-normal"
						label="Image"
						variant="standard"
						multiline={true}
						minRows={3}
						maxRows={3}
						value={uploadInventoryForm.image}
						onChange={(event) => {
							setUploadInventoryForm({
								...uploadInventoryForm,
								image: event.target.value,
							});
						}}
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "80px",
								marginTop: "25px",

								"&.Mui-focused": {
									marginTop: "0px",
								},
							},
							color: "white",
						}}
					/>
	
				</Box>
				<Box sx={{ display: "flex", mx: 1, justifyContent: "center" }}>
					<TextField
						id="outlined-size-normal"
						label="Price"
						variant="standard"
						value={uploadInventoryForm.price}
						onChange={(event) => {
							setUploadInventoryForm({
								...uploadInventoryForm,
								price: event.target.value,
							});
						}}
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "110px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
							color: "white",
						}}
					/>

					<TextField
						id="outlined-size-normal"
						label="Quantity"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "70px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
							color: "white",
						}}
					/>

				</Box>
			</Box>

			<Button
				id="createButton"
				variant="contained"
				type="submit"
				onClick={handleSubmit}
			>
				Upload Product
			</Button>
		</Layout>
	);
}

export default ProductInventoryandUpdatePage;
