import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //dynamically chooses between these two routes depending on the button used
    const endpoint = isRegistering ? "register" : "login";

    try {
      const response = await fetch(`http://localhost:8082/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      if (isRegistering) {
        alert("Account created successfully!");
        setIsRegistering(false);
        reset();
      } else {
        alert("Login successful!");
        console.log("User Data:", result.user);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <>
      <h2>{isRegistering ? "Register" : "Login"} Form</h2>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        {isRegistering && (
          <>
            <input
              type="text"
              {...register("userName", { required: true })}
              placeholder="Username"
            />
            {errors.userName && (
              <span style={{ color: "red" }}>*Username* is mandatory</span>
            )}
          </>
        )}

        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
        />
        {errors.email && (
          <span style={{ color: "red" }}>
            {errors.email.message || "*Email* is mandatory"}
          </span>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && (
          <span style={{ color: "red" }}>*Password* is mandatory</span>
        )}

        <input
          type="submit"
          style={{ backgroundColor: "#a1eafb", cursor: "pointer" }}
          value={isRegistering ? "Create Account" : "Login"}
        />
      </form>

      <button
        style={{ marginTop: "1rem", cursor: "pointer" }}
        onClick={() => {
          setIsRegistering((prev) => !prev);
          reset(); // optional: clears form when switching
        }}
      >
        {isRegistering ? "Already have an account? Login" : "Create an account"}
      </button>
    </>
  );
}

export default Login;
