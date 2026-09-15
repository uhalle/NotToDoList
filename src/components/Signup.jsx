import React, { useState } from "react";

export default function SignupPage(onSignup) {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.userName) {
      newErrors.userName = "Username is required";
    }

    if (!formData.name) {
      newErrors.name = "Full Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors({});
      setResponse("");
      const API_BASE_URL = "http://localhost:8080";

      const response = await fetch(
        `${API_BASE_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.text();

      setResponse(data);

      setShowSuccess(true);

      console.log("Form submitted:", formData);

    } catch (error) {
      console.error("Signup error:", error);

      setShowSuccess(false);
      setResponse("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{
            padding: "8px",
            marginTop: "20px",
          }}
        >
          Sign Up
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >

          {/* Username */}
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: "35%",
                padding: "4px",
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "35%",
                padding: "4px",
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "35%",
                padding: "4px",
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "35%",
                padding: "4px",
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "35%",
                padding: "4px",
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              alignSelf: "center",
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Account
          </button>

          {/* API Response */}
          {response && (
            <p className="text-center">
              {response}
            </p>
          )}

        </form>

        {/* Success Popup */}
        {showSuccess && (
          <div className="popup-overlay">

            <div className="success-popup">

              <div className="success-icon">
                
              </div>

              <h2>
                Signup Successful!
              </h2>

              <p>
                Your account has been created successfully.
              </p>

              <button
                type="button"
                onClick={() => setShowSuccess(false)}
              >
                OK
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

