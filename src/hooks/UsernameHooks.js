import { useState, useEffect } from "react";
// import { isAlpha } from "validator";

function UsernameHooks() {
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");

	// const [onFocus, setOnFocus2] = useState(false);
	const [onBlur, setonBlur2] = useState(false);

	useEffect(() => {
		// if (onFocus) {
		// 	if (username.length > 0) {
		// 		if (isAlpha(username)) {
		// 			setError("Must have special characters or number");
		// 		}
		// 	}
		// }
		if (onBlur) {
			if (username.length === 0) {
				setError("username cannot be empty");
			}
		}
	}, [username, onBlur]);

  function handleUsernameOnChange(e) {
    setError("");
		setUsername(e.target.value);
	}

	return [username, handleUsernameOnChange, error, setonBlur2];
}

export default UsernameHooks;
