import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PatientRecordsABI from '../PatientRecordsABI.json';

const CONTRACT_ADDRESS = "0x3257b9827D67611C2878C89158FE2EF6B63D2C8d"; // Your contract address

export default function PatientProfile({ address }) {
  const [profile, setProfile] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PatientRecordsABI, provider);
    
    const [profileData, recordsData] = await Promise.all([
      contract.getPatient(address),
      contract.getMedicalRecords(address)
    ]);
    
    setProfile(profileData);
    setRecords(recordsData);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [address]);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="personal-info">
        <h2>{profile?.fullName || 'No profile'}</h2>
        <p>Blood Type: {profile?.bloodType}</p>
        <p>Allergies: {profile?.allergies?.join(', ') || 'None'}</p>
      </div>
      
      <div className="medical-history">
        <h3>Medical Records</h3>
        {records.map((record, i) => (
          <div key={i} className="record-card">
            <p>{new Date(record.date * 1000).toLocaleDateString()}</p>
            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
            <p><strong>Prescription:</strong> {record.prescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}