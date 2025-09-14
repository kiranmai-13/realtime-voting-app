import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export default function PollCreator({ onPollCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleCreate = () => {
    const pollId = uuidv4();
    const pollData = {
      question,
      options: options.reduce((acc, opt) => ({ ...acc, [opt]: 0 }), {}),
    };

    set(ref(db, "polls/" + pollId), pollData);
    onPollCreated(pollId);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Create a Poll</h2>
      <input
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      /><br />
      {options.map((opt, idx) => (
        <input
          key={idx}
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[idx] = e.target.value;
            setOptions(newOptions);
          }}
        />
      ))}
      <br />
      <button onClick={() => setOptions([...options, ""])}>Add Option</button><br />
      <button onClick={handleCreate} disabled={!question || options.some(o => !o)}>Create Poll</button>
    </div>
  );
}
