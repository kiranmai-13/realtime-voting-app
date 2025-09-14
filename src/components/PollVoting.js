import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { setPoll } from "../store";

export default function PollVoting({ pollId }) {
  const poll = useSelector((state) => state.poll.currentPoll);
  const dispatch = useDispatch();
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const pollRef = ref(db, "polls/" + pollId);
    const unsubscribe = onValue(pollRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch(setPoll(data));
      }
    });
    return () => unsubscribe();
  }, [pollId, dispatch]);

  const handleVote = (option) => {
    if (userVote) {
      alert("You already voted!");
      return;
    }
    if (!poll || !poll.options) return;

    const newVotes = {
      ...poll.options,
      [option]: (poll.options[option] || 0) + 1,
    };

    update(ref(db, "polls/" + pollId), { options: newVotes });
    setUserVote(option);
  };

  if (!poll || !poll.options) return <h2>Loading poll...</h2>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>{poll.question}</h2>
      {Object.keys(poll.options).map((opt) => (
        <button
          key={opt}
          onClick={() => handleVote(opt)}
          style={{
            margin: "5px",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {opt} ({poll.options[opt]})
        </button>
      ))}
      {userVote && (
        <p style={{ marginTop: "15px" }}>
          ✅ You voted for: <b>{userVote}</b>
        </p>
      )}
    </div>
  );
}
