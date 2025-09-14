import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function SignOut() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("You have been logged out!");
        window.location.href = "/"; // Redirect to login
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("Error logging out. Try again!");
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Do you want to logout?</h2>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#0077ff",
          color: "white",
          border: "none",
        }}
      >
        Logout
      </button>
    </div>
  );
}
