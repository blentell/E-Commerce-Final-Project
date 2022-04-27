import React, {useEffect} from "react";
import Layout from "../layout/Layout";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FirstNameHooks from "../../hooks/FirstNameHooks";
import LastNameHooks from "../../hooks/LastNameHooks";
import UsernameHooks from "../../hooks/UsernameHooks";
import PasswordHooks from "../../hooks/PasswordHooks";
import EmailHooks from "../../hooks/EmailHooks";
import CheckToken from "../../hooks/CheckToken";
import Axios from "../lib/Axios";

function SignUpPage() {
  const navigate = useNavigate();
	const { checkJwtToken } = CheckToken();

	useEffect(() => {
		if (checkJwtToken()) {
			navigate("/protected-home");
		}
	}, []);

	const [
		firstName,
		handleFirstNameOnChange,
		firstNameError,
		setOnFocus1,
		setOnBlur1,
	] = FirstNameHooks();
	const [
		lastName,
		handleLastNameOnChange,
		lastNameError,
		setOnFocus,
		setOnBlur,
	] = LastNameHooks();
	const [username, handleUsernameOnChange, usernameError, setOnBlur2] =
		UsernameHooks();
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
			await Axios.post("/users/create-user", {
				firstName,
				lastName,
				username,
				email,
				password,
      });			
      navigate("/signin")
		} catch (e) {
			alert(e.response.data.error);
		}
	}
	return (
		<Layout>
			<Box
				component="form"
				sx={{
					mt: 8,
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
				<TextField
					id="outlined-size-normal"
					label="First Name"
					variant="standard"
					onChange={handleFirstNameOnChange}
					onFocus={() => setOnFocus1(true)}
					onBlur={() => setOnBlur1(true)}
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
				<div style={{ color: "red" }}>{firstNameError && firstNameError}</div>
				<TextField
					id="outlined-size-normal"
					label="Last Name"
					variant="standard"
					onChange={handleLastNameOnChange}
					onFocus={() => setOnFocus(true)}
					onBlur={() => setOnBlur(true)}
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
				<div style={{ color: "red" }}>{lastNameError && lastNameError}</div>
				<TextField
					id="outlined-size-normal"
					label="Username"
					variant="standard"
					onChange={handleUsernameOnChange}
					onBlur={() => setOnBlur2(true)}
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
				<div style={{ color: "red" }}>{usernameError && usernameError}</div>
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
			</Box>

			<Button
				id="createButton"
				variant="contained"
				type="submit"
				onClick={handleSubmit}
			>
				Create
			</Button>
			<Box sx={{ flexGrow: 1 }}>
				<Typography sx={{ color: "gray", mt: 8 }} variant="h6" component="div">
					Have an account?{" "}
					<Link to="/signin" style={{ color: "white" }}>
						Sign in
					</Link>
				</Typography>
			</Box>
		</Layout>
	);
}

export default SignUpPage;
