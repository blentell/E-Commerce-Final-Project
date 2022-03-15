import { useState, useEffect } from "react";
import { isStrongPassword } from "validator";

function PasswordHooks() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const [onFocus, setOnFocus3] = useState(false);
	const [onBlur, setonBlur3] = useState(false);

	useEffect(() => {
		if (onFocus) {
			if (password.length > 0) {
				if (!isStrongPassword(password)) {
					setError("Password must contain 1 uppercase, 1 lowercase, 1 number and special character");
        }
        if (password.length < 8) {
          setError("Password must be at least 8 characters long");
        }
			}
		}
		if (onBlur) {
			if (password.length === 0) {
				setError("password cannot be empty");
			}
		}
	}, [password, onFocus, onBlur]);

	function handlePasswordOnChange(e) {
		setError("");
		setPassword(e.target.value);		
	}

	return [password, handlePasswordOnChange, error, setOnFocus3, setonBlur3];
}

export default PasswordHooks;
