pragma solidity ^0.8.0;

contract PatientRecords {
    struct Patient {
        string fullName;
        uint256 dob; // Timestamp
        string bloodType;
        string[] allergies;
        string emergencyContact;
    }

    struct MedicalRecord {
        string diagnosis;
        string prescription;
        uint256 date;
    }

    // Mapping from patient address to their profile
    mapping(address => Patient) public patients;
    
    // Mapping from patient address to their records
    mapping(address => MedicalRecord[]) public medicalRecords;

    // Events
    event ProfileUpdated(address indexed patient);
    event RecordAdded(address indexed patient, uint256 recordId);

    function updateProfile(
        string memory _fullName,
        uint256 _dob,
        string memory _bloodType,
        string[] memory _allergies,
        string memory _emergencyContact
    ) public {
        patients[msg.sender] = Patient(
            _fullName,
            _dob,
            _bloodType,
            _allergies,
            _emergencyContact
        );
        emit ProfileUpdated(msg.sender);
    }

    function addMedicalRecord(
        string memory _diagnosis,
        string memory _prescription
    ) public {
        medicalRecords[msg.sender].push(MedicalRecord(
            _diagnosis,
            _prescription,
            block.timestamp
        ));
        emit RecordAdded(msg.sender, medicalRecords[msg.sender].length - 1);
    }

    function getPatient(address _patient) public view returns (Patient memory) {
        return patients[_patient];
    }

    function getMedicalRecords(address _patient) public view returns (MedicalRecord[] memory) {
        return medicalRecords[_patient];
    }
}