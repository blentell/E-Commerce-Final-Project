import { useState, useEffect } from "react";
import { isEmail } from "validator";

function EmailHooks() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const [onFocus, setOnFocus4] = useState(false);
	const [onBlur, setonBlur4] = useState(false);

	useEffect(() => {
		if (onFocus) {
			if (email.length > 0) {
				if (!isEmail(email)) {
					setError("Must be in email format");
        }        
				if (email.length < 7) {
					setError("Email must be at least 7 characters long");
				}
			}
		}
		if (onBlur) {
			if (email.length === 0) {
				setError("email cannot be empty");
			}
		}
	}, [email, onFocus, onBlur]);

	function handleEmailOnChange(e) {
		setError("");
		setEmail(e.target.value);
	}

	return [email, handleEmailOnChange, error, setOnFocus4, setonBlur4];
}

export default EmailHooks;
