import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	signOutUserAction
} from "../../reduxStore";
import logo from "../images/logo_size.jpg";

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const shoppingCart = useSelector((state) => state.shoppingCart);
	const orderId = useParams()
	

	function Logout() {
		dispatch({ type: signOutUserAction });		
		window.localStorage.removeItem("storeState");
		window.localStorage.removeItem("jwtToken");
		navigate("/signin");
	}

	const cartCount = shoppingCart.reduce((acc, cartItem) => {
		return acc + cartItem.quantity;
	}, 0);
	
if (!shoppingCart) {
	return null;
}
	return (
		<Box
			sx={{
				flexGrow: 1,
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				mt: 0.5,
				mb: 2,
			}}
		>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#772E25",
					boxShadow: "none",
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mr: -2.5,
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>						
						<Link to="/">							
								<img
									style={{borderRadius: '13%', height: "55px", objectFit: "contain"}}
									alt="#MADETHIS"
									src={logo}
								></img>
						</Link>
					</Box>
					<Box>
						<Link
							to="/admin/"
							style={
								user && user.username === "blentell"
									? { display: "" }
									: { display: "none" }
							}
						>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="search"
							>
								<Typography
									variant="body2"
									component="div"
									sx={{ display: "flex", flexDirection: "column" }}
								>
									<AdminPanelSettingsIcon
										sx={{ fontSize: 25, mb: -0.5, ml: 0.5 }}
									/>
									Admin
								</Typography>
							</IconButton>
						</Link>
						<Link to="/">
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="search"
							>
								<Typography
									variant="body2"
									component="div"
									sx={{ display: "flex", flexDirection: "column" }}
								>
									<StorefrontIcon sx={{ fontSize: 25, mb: -0.5, ml: 0.5 }} />
									Shop
								</Typography>
							</IconButton>
						</Link>
						<Link
							to="/protected-home"
							style={user ? { display: "" } : { display: "none" }}
						>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="cart"
							>
								<Typography
									variant="body2"
									component="div"
									sx={{ display: "flex", flexDirection: "column" }}
								>
									<Badge badgeContent={cartCount} color="primary">
										<ShoppingCartIcon
											sx={{ fontSize: 25, ml: 0.4, mb: -0.5 }}
										/>
									</Badge>
									Cart
								</Typography>
							</IconButton>
						</Link>
						{!user ? (
							<Link to="/signin">
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="login"
								>
									<Typography
										variant="body2"
										component="div"
										sx={{ display: "flex", flexDirection: "column" }}
									>
										<PersonIcon sx={{ fontSize: 25, mb: -0.5, ml: 0.6 }} />
										{user ? `${user.firstName}` : `Login`}
									</Typography>
								</IconButton>
							</Link>
						) : (
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="login"
								onClick={Logout}
							>
								<Typography
									variant="body2"
									component="div"
									sx={{ display: "flex", flexDirection: "column" }}
								>
									<PersonIcon sx={{ fontSize: 25, mb: -0.5, ml: 0.6 }} />
									{user ? `${user.firstName}` : `Login`}
								</Typography>
							</IconButton>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
export default Header;
