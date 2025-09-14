import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import PollCreator from "./components/PollCreator";
import PollVoting from "./components/PollVoting";
import PollResults from "./components/PollResults";
import SignOut from "./components/SignOut";
import { auth } from "./firebaseConfig";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [pollId, setPollId] = useState(null);
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    // Load pollId from localStorage if previously saved
    const savedPollId = localStorage.getItem("pollId");
    if (savedPollId) {
      setPollId(savedPollId);
    }
    return () => unsubscribe();
  }, []);

  // Handle poll creation, save pollId to localStorage for persistence
  const handlePollCreated = (id) => {
    setPollId(id);
    localStorage.setItem("pollId", id);
  };

  if (!user) return <Auth onAuth={() => setUser(auth.currentUser)} />;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Real-Time Voting App</h1>

      <button
        onClick={() => setShowSignOut(true)}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#0077ff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      {showSignOut ? (
        <SignOut />
      ) : !pollId ? (
        <PollCreator onPollCreated={handlePollCreated} />
      ) : (
        <>
          <PollVoting pollId={pollId} />
          <PollResults pollId={pollId} />
        </>
      )}
    </div>
  );
}

export default App;
