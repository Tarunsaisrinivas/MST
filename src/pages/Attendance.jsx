import React, { useState, useEffect } from 'react';
import '../styles/attendance.css'; // Import your CSS file
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Attendance = () => {
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [absentNumbers, setAbsentNumbers] = useState([]);
    const [displayedAbsentNumbers, setDisplayedAbsentNumbers] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [name, setName] = useState('');

    const location = useLocation();

    const handleAddAbsent = () => {
        if (registrationNumber.trim() !== '') {
            setAbsentNumbers([...absentNumbers, { registrationNumber, date: selectedDate }]);
            setRegistrationNumber('');
        }
    };

    const handleDeleteAbsent = (index) => {
        const newAbsentNumbers = [...absentNumbers];
        newAbsentNumbers.splice(index, 1);
        setAbsentNumbers(newAbsentNumbers);
    };

    const handleDisplayAbsentNumbers = () => {
        const displayedNumbers = absentNumbers.map((item) => `Date: ${item.date}, Registration Number: ${item.registrationNumber}`).join('\n21B91A05');
        setDisplayedAbsentNumbers('21B91A05' + displayedNumbers);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleDownloadExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(absentNumbers);
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance Sheet');
        XLSX.writeFile(wb, 'attendance_sheet.xlsx');
    };

    useEffect(() => {
        const getName = () => {
            const params = new URLSearchParams(location.search);
            const email = params.get('page');
            const name = params.get('name');
            setName(name);
            console.log(name);
        };
        getName();
    },[]);

    return (
        <div className="attendance-container">
            HI{name}
            <div className="dropdowns">
                <select
                    className="dropdown"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                >
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics and Communication</option>
                    <option value="ME">Mechanical</option>
                    {/* Add more options as needed */}
                </select>
                <select
                    className="dropdown"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                >
                    <option value="">Select Section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    {/* Add more options as needed */}
                </select>
                <select
                    className="dropdown"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    <option value="">Select Year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                </select>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <div className="input-boxes">
                <input
                    type="text"
                    name="Email"
                    className="input"
                    placeholder="Enter Registration Number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                />
                <button className="add-button" onClick={handleAddAbsent}>
                    Add Absent
                </button>
            </div>
            <div className="absent-list">
                <h3>Absent List</h3>
                <ul>
                    {absentNumbers.map((item, index) => (
                        <li key={index}>
                            {`Date: ${item.date}, Registration Number: ${item.registrationNumber}`}
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteAbsent(index)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="submit-button-container">
                <button className="submit-button" onClick={handleDisplayAbsentNumbers}>
                    Submit
                </button>
                <button className="download-button" onClick={handleDownloadExcel}>
                    Download Excel
                </button>
                <p
                    className="displayed-absent-numbers"
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {displayedAbsentNumbers}
                </p>
            </div>
        </div>
    );
};

export default Attendance;
