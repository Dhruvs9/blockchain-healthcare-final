import { useState } from 'react';
import { addRecord, getRecord } from './blockchain';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [myRecord, setMyRecord] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addRecord(name, age, diagnosis);
    if (success) {
      alert("Record saved to blockchain!");
      setName("");
      setAge("");
      setDiagnosis("");
    }
  };

  const handleFetch = async () => {
    const record = await getRecord();
    setMyRecord(record);
  };

  return (
    <div className="App">
      <h1>🩺 Blockchain Health Records</h1>
      
      <div className="card">
        <h2>Add New Record</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
          <button type="submit">Save to Blockchain</button>
        </form>
      </div>

      <div className="card">
        <h2>View My Record</h2>
        <button onClick={handleFetch}>Fetch My Data</button>
        {myRecord && (
          <div className="record">
            <p><strong>Name:</strong> {myRecord[0]}</p>
            <p><strong>Age:</strong> {myRecord[1]}</p>
            <p><strong>Diagnosis:</strong> {myRecord[2]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;