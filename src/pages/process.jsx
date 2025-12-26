import { useState } from "react";

function Process({ user, onLogout }) {
  const [grades, setGrades] = useState(["", "", "", "", ""]);
  const [average, setAverage] = useState(null);
  const [status, setStatus] = useState("");

  function handleChange(index, value) {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  }

  function calculateAverage() {
    const numbers = grades.map((g) => Number(g));

    if (numbers.some((n) => isNaN(n) || n < 0 || n > 100)) {
      alert("Please enter valid grades between 0 and 100");
      return;
    }

    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;

    setAverage(avg.toFixed(2));
    setStatus(avg >= 50 ? "ناجح ✅" : "راسب ❌");
  }

  return (
    <div>
      <h2>Welcome {user}</h2>
      <h3>حساب المعدل السنوي</h3>

      {grades.map((grade, index) => (
        <input
          key={index}
          type="number"
          placeholder={`الدرجة ${index + 1}`}
          value={grade}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}

      <br /><br />

      <button onClick={calculateAverage}>احسب المعدل</button>

      {average !== null && (
        <div>
          <p className={status.includes("ناجح") ? "result-success" : "result-fail"}>
  النتيجة: {status}
</p>

        </div>
      )}

      <hr />

      <button onClick={onLogout}>تسجيل خروج</button>
    </div>
  );
}

export default Process;
