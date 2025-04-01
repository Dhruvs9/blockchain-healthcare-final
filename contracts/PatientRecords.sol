// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract PatientRecords {
    struct Record {
        string name;
        uint256 age;
        string diagnosis;
    }

    mapping(address => Record) private records;
    address[] public patients;

    function addRecord(string memory _name, uint256 _age, string memory _diagnosis) public {
        records[msg.sender] = Record(_name, _age, _diagnosis);
        patients.push(msg.sender);
    }

    function getRecord() public view returns (string memory, uint256, string memory) {
        Record memory record = records[msg.sender];
        return (record.name, record.age, record.diagnosis);
    }
}