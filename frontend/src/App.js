import { useState } from 'react';
import PatientProfile from './components/PatientProfile';
import ProfileEditor from './components/ProfileEditor';
import './styles/Profile.css';

function App() {
  const [currentAddress, setCurrentAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="app">
      <header>
        <h1>Medical Records</h1>
        <input 
          placeholder="Patient Address (0x...)" 
          value={currentAddress}
          onChange={(e) => setCurrentAddress(e.target.value)}
        />
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </header>

      {isEditing ? (
        <ProfileEditor onSave={() => {
          setIsEditing(false);
          // Refresh data
        }} />
      ) : (
        <PatientProfile address={currentAddress} />
      )}
    </div>
  );
}
// Add this at the bottom of App.js
export default App;  // <-- This line was missing