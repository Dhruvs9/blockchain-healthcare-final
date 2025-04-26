import { ethers } from 'ethers';
import PatientRecordsABI from './PatientRecordsABI.json';

const CONTRACT_ADDRESS = "0xf87bEd45190b1196b54b6d07DB34d63B1A507EA8";

// Add these functions
export async function addRecord(name, age, diagnosis, patientAddress) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PatientRecordsABI, signer);
  
  const tx = await contract.addRecord(name, age, diagnosis, patientAddress);
  await tx.wait();
}

export async function getAllRecords() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PatientRecordsABI, provider);
  return await contract.getAllRecords();
}

export async function getRecord() {
    if (!window.ethereum) return ["Connect Wallet", 0, ""];
  
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PatientRecordsABI, signer);
  
    try {
      const record = await contract.getRecord();
      // Convert empty strings to "Not set"
      return [
        record[0] || "No name",
        record[1] || 0,
        record[2] || "No diagnosis"
      ];
    } catch (error) {
      console.error("Fetch error:", error);
      return ["Error fetching", 0, ""];
    }
  }