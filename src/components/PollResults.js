import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PollResults({ pollId }) {
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const pollRef = ref(db, "polls/" + pollId);
    onValue(pollRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setPoll(data);
    });
  }, [pollId]);

  if (!poll || !poll.options) return <h2>Loading results...</h2>;

  const data = {
    labels: Object.keys(poll.options),
    datasets: [
      {
        label: "Votes",
        data: Object.values(poll.options),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div style={{ width: "60%", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>{poll.question}</h2>
      <Bar data={data} />
    </div>
  );
}
