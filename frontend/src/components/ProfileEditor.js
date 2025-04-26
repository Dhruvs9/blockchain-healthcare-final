import { useState } from 'react';
import { ethers } from 'ethers';
import PatientRecordsABI from '../PatientRecordsABI.json';
// Add this at the top of the file (below other imports)
const CONTRACT_ADDRESS = "0xf87bEd45190b1196b54b6d07DB34d63B1A507EA8"; // Your contract address

export default function ProfileEditor({ onSave }) {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    bloodType: 'A+',
    allergies: '',
    emergencyContact: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PatientRecordsABI, signer);
    
    await contract.updateProfile(
      form.fullName,
      Math.floor(new Date(form.dob).getTime() / 1000),
      form.bloodType,
      form.allergies.split(',').map(a => a.trim()),
      form.emergencyContact
    );
    
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({...form, fullName: e.target.value})}
        required
      />
      {/* Add other fields similarly */}
      <button type="submit">Save Profile</button>
    </form>
  );
}