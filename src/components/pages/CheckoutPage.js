import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout'
  import { ToastContainer, toast } from "react-toastify";
	import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateShoppingCart } from '../../reduxStore';
import Axios from '../lib/Axios';

function CheckoutPage() {
	const navigate = useNavigate();
	const shoppingCart = useSelector((state) => state.shoppingCart);
	const dispatch = useDispatch()
	
		const total = shoppingCart.reduce((acc, cartItem) => {
			return acc + cartItem.price * cartItem.quantity;
		}, 0);
	console.log(total)
	const emptyCart = () => {
		async function clearCart() {
			try {
				const response = await Axios.delete(
					`/cartDatabase/empty-cart`,
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
	
	let date = new Date().toLocaleString("en-US")
	const placeOrder = async () => {
		const notify = () => toast("Success!");

		try {
			const response = await Axios.post(
				"/orderHistoryDatabase/add-cartToHistory", {
					shoppingCart,
					total,
					date
				},
				{
					headers: {
						authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
					},
				}
			
			);
			const orderId = response.data.payload._id
			notify()
			setTimeout(function () {
				navigate(`/receipt/${orderId}`);
				emptyCart();
			}, 6000);
		} catch (e) {
			alert(e.response.data.error);
		}
	}



  return (
		<Layout>
			<Box
				// component="form"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					mt: 2,
					mb: 2,
					"& .MuiTextField-root": {
						m: 0.5,
						width: "35ch",
						justifyContent: "center",
					},
				}}
				noValidate
				autoComplete="off"
			>
				<Box
					sx={{
						borderBottom: "2px solid black",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "60vw",
					}}
				>
					<Typography style={{}} component="h4" variant="div">
						Credit Card Information
					</Typography>
				</Box>
				<TextField
					id="outlined-size-normal"
					label="Credit Card Number"
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
					}}
				/>
				<Box
					sx={{
						display: "flex",
						"& .MuiTextField-root": {
							m: 0.5,
							width: "17ch",
							justifyContent: "center",
						},
					}}
					style={{ marginTop: "-18px" }}
				>
					<TextField
						id="outlined-size-normal"
						label="Exp. Date"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "40px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
					<TextField
						id="outlined-size-normal"
						label="CVN"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "60px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					style={{ marginTop: "-18px" }}
				>
					<TextField
						id="outlined-size-normal"
						label="Name on Credit Card"
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
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					style={{ marginTop: "-18px" }}
				>
					<TextField
						id="outlined-size-normal"
						label="Address for Credit Card"
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
						}}
					/>
				</Box>
				<Box
					sx={{
						borderBottom: "2px solid black",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "60vw",
						marginTop: "10px",
					}}
				>
					<Typography
						style={{ marginTop: "20px" }}
						component="h4"
						variant="div"
					>
						Shipping Address
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						"& .MuiTextField-root": {
							m: 0.5,
							width: "35ch",
							justifyContent: "center",
						},
					}}
				>
					<TextField
						id="outlined-size-normal"
						label="Name"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "130px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						"& .MuiTextField-root": {
							m: 0.5,
							width: "35ch",
							justifyContent: "center",
						},
					}}
					style={{ marginTop: "-18px" }}
				>
					<TextField
						id="outlined-size-normal"
						label="Address"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "120px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						"& .MuiTextField-root": {
							m: 0.5,
							width: "17ch",
							justifyContent: "center",
						},
					}}
					style={{ marginTop: "-18px" }}
				>
					<TextField
						id="outlined-size-normal"
						label="Apt. Suite etc."
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "25px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
					<TextField
						id="outlined-size-normal"
						label="Zip"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "60px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						"& .MuiTextField-root": {
							m: 0.5,
							width: "17ch",
							justifyContent: "center",
						},
					}}
					style={{ marginTop: "-18px" }}
				>
					<TextField
						id="outlined-size-normal"
						label="State"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "60px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
					<TextField
						id="outlined-size-normal"
						label="Country"
						variant="standard"
						InputProps={{ disableUnderline: true }}
						sx={{
							"& label": {
								marginLeft: "45px",
								marginTop: "10px",

								"&.Mui-focused": {
									marginTop: "-3px",
								},
							},
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					style={{ marginTop: "-18px" }}
				>
					<TextField
						id="outlined-size-normal"
						label="Address for Credit Card"
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
						}}
					/>
				</Box>
			</Box>
			<Button
				id="createButton"
				onClick={placeOrder}
				variant="contained"
			>
				Place Order
			</Button>
			<ToastContainer />

			<Link to="/">
				<Button id="createButton" variant="contained">
					Continue Shopping
				</Button>
			</Link>
		</Layout>
	);
}

export default CheckoutPage;