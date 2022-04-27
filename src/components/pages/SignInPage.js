import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckToken from "../../hooks/CheckToken";
import EmailHooks from "../../hooks/EmailHooks";
import PasswordHooks from "../../hooks/PasswordHooks";
import { signInActionCreator } from "../../reduxStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout/Layout";
import Axios from "../lib/Axios";

function SignInPage() {
	const navigate = useNavigate();
	const { checkJwtToken } = CheckToken();
	const dispatch = useDispatch();
	useEffect(() => {
		if (checkJwtToken()) {
			navigate("/protected-home");
		}
	}, []);
	const [
		password,
		handlePasswordOnChange,
		passwordError,
		setOnFocus3,
		setOnBlur3,
	] = PasswordHooks();
	const [email, handleEmailOnChange, emailError, setOnFocus4, setOnBlur4] =
		EmailHooks();
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			let response = await Axios.post("/users/login", {
				email,
				password,
			});
			window.localStorage.setItem("jwtToken", response.data.payload.jwt);

			let decodedToken = jwtDecode(response.data.payload.jwt);

			const savedShoppingCart = response.data.payload.shoppingCart;

			dispatch(signInActionCreator({ decodedToken, savedShoppingCart }));
			navigate("/");
		} catch (e) {
			toast(e.response.data.error);
		}
	}

	return (
		<Layout>
			<ToastContainer/>
			<Box
				component="form"
				sx={{
					mt: 25,
					mb: 1.8,
					"& .MuiTextField-root": {
						m: 0.5,
						width: "35ch",
						justifyContent: "center",
					},
				}}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<TextField
					id="outlined-size-normal"
					label="Email"
					variant="standard"
					onChange={handleEmailOnChange}
					onFocus={() => setOnFocus4(true)}
					onBlur={() => setOnBlur4(true)}
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
				<div style={{ color: "red" }}>{emailError && emailError}</div>
				<TextField
					id="outlined-size-normal"
					label="Password"
					variant="standard"
					type="password"
					onChange={handlePasswordOnChange}
					onFocus={() => setOnFocus3(true)}
					onBlur={() => setOnBlur3(true)}
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

				<div style={{ color: "red" }}>{passwordError && passwordError}</div>

				<Button id="loginButton" variant="contained" type="submit">
					Login
				</Button>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<Typography sx={{ color: "gray", mt: 8 }} variant="h6" component="div">
					Don't have an account?{" "}
					<Link to="/signup" style={{ color: "white" }}>
						Sign up
					</Link>
				</Typography>
			</Box>
		</Layout>
	);
}

export default SignInPage;
