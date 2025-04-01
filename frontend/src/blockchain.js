import { ethers } from 'ethers';
import PatientRecordsABI from './PatientRecordsABI.json';

const CONTRACT_ADDRESS = "0xa5211701d00a5c6fD53aDBaFCf16930dEaaa2633";

export async function addRecord(name, age, diagnosis) {
    if (!window.ethereum) {
      alert("MetaMask not detected! Please install it.");
      return false;
    }
  
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, PatientRecordsABI, signer);
  
      console.log("Sending transaction...");
      const tx = await contract.addRecord(name, age, diagnosis);
      console.log("Transaction hash:", tx.hash);
      
      await tx.wait();
      console.log("Transaction confirmed!");
      return true;
      
    } catch (error) {
      console.error("Transaction failed:", error);
      alert(`Error: ${error.message}`);
      return false;
    }
  }

export async function getRecord() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PatientRecordsABI, signer);
    
    try {
      return await contract.getRecord();
    } catch (error) {
      console.error("Error fetching record:", error);
      return ["", 0, ""];
    }
  }
}