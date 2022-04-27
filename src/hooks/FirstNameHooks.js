import { useState, useEffect } from "react";
import { isAlpha } from "validator";

function FirstNameHooks() {
	const [firstName, setFirstName] = useState("");
	const [error, setError] = useState("");

	const [onFocus, setOnFocus1] = useState(false);
	const [onBlur, setonBlur1] = useState(false);

	useEffect(() => {
		if (onFocus) {
			if (firstName.length > 0) {
				if (!isAlpha(firstName)) {
					setError("Cannot have special characters or number");
				}
			}
		}
		if (onBlur) {
			if (firstName.length === 0) {
				setError("first name cannot be empty");
			}
		}
	}, [firstName, onFocus, onBlur]);

	function handleFirstNameOnChange(e) {
		setError("");
		setFirstName(e.target.value);
	}

	return [firstName, handleFirstNameOnChange, error, setOnFocus1, setonBlur1];
}

export default FirstNameHooks;
