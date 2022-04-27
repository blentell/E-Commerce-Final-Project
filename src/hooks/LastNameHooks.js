import { useState, useEffect } from "react";
import { isAlpha } from "validator";

function LastNameHooks() {
	const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const [onFocus, setOnFocus] = useState(false);
  const [onBlur, setonBlur] = useState(false);

  
  useEffect(() => {
    if (onFocus) {
      if (lastName.length > 0) {
        if (!isAlpha(lastName)) {
          setError("Cannot have special characters or number");
        }        
      }
    }
    if (onBlur) {
      if (lastName.length === 0) {
        setError("last name cannot be empty")
      }
    }
  }, [lastName, onFocus, onBlur]);

  function handleLastNameOnChange(e) {
    setError("");
    setLastName(e.target.value);
  }

	return [lastName, handleLastNameOnChange, error, setOnFocus, setonBlur];
}

export default LastNameHooks;
