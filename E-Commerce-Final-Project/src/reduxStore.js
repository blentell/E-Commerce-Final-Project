import { configureStore } from "@reduxjs/toolkit";

export const shoppingCartInitialState = [];
export const productInventoryInitialState = [];
export const addItemToCartAction = "addItemToCart";
export const removeItemFromCartAction = "removeItemFromCart";
export const emptyCartAction = "emptyCart";
export const updateShoppingCart = "updateShoppingCart";
export const updateProductInventory = "updateProductInventory";

export const signInUserAction = "signIn";
export const signOutUserAction = "signOut";

const shoppingCartReducer = (state = shoppingCartInitialState, action) => {

	if (action.type === signOutUserAction) {
		return shoppingCartInitialState;
	}

	if (action.type === signInUserAction) {
	
		return action.data.savedShoppingCart;
	}

	if (action.type === removeItemFromCartAction) {
		return state.filter((item) => item.id !== action.id);
	}

	if (action.type === emptyCartAction) {
		return shoppingCartInitialState;
	}
	if (action.type === updateShoppingCart) {
		
		return action.payload.shoppingCart;
	}

			
	return state;
};



export const emptyCartActionCreator = () => ({ type: emptyCartAction });

export const removeFromCartActionCreator = (id) => {
	return {
		type: removeItemFromCartAction,
		id: id,
	};
};

const productInventoryReducer = (
	state = productInventoryInitialState,
	action
) => {
	if (action.type === updateProductInventory) {
		return action.payload.inventory;
	}
	return state;
};



const userSignInReducer = (state = null, action) => {
	if (action.type === signInUserAction) {
		return action.data.decodedToken;
	}

	if (action.type === signOutUserAction) {
		return null;
	}
	return state;
};

export const signInActionCreator = ({ decodedToken, savedShoppingCart }) => {
	return {
		type: signInUserAction,
		data: { decodedToken, savedShoppingCart },
	};
};

const store = configureStore({
	preloadedState: JSON.parse(window.localStorage.getItem("storeState")) || {},

	reducer: {
		shoppingCart: shoppingCartReducer,
		user: userSignInReducer,
		inventory: productInventoryReducer,
	},
});

const handleChange = () => {
	const newState = store.getState();
	window.localStorage.setItem("storeState", JSON.stringify(newState));
};
store.subscribe(handleChange);

export default store;
