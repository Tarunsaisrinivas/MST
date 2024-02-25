import React, { useState } from 'react';
import '../styles/attendance.css'; // Import your CSS file

const Attendance = () => {
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [absentNumbers, setAbsentNumbers] = useState([]);
    const [displayedAbsentNumbers, setDisplayedAbsentNumbers] = useState('');

    const handleAddAbsent = () => {
        if (registrationNumber.trim() !== '') {
            setAbsentNumbers([...absentNumbers, registrationNumber]);
            setRegistrationNumber('');
        }
    };

    const handleDeleteAbsent = (index) => {
        const newAbsentNumbers = [...absentNumbers];
        newAbsentNumbers.splice(index, 1);
        setAbsentNumbers(newAbsentNumbers);
    };

    const handleDisplayAbsentNumbers = () => {
        const displayedNumbers = absentNumbers.join('\n21B91A05');
        setDisplayedAbsentNumbers('21B91A05' + displayedNumbers);
    };
    
    function Submit(e) {
        const formEle = document.querySelector("form");
        const formDatab = new FormData(formEle);
        fetch(
          "https://script.google.com/macros/s/AKfycbyATvWtuSJ9ZiN7tjLw5xrMEG8Gws4R3Svrdh-NkIUpxAGm0rk0N3I-8ATfbG-DLrzG/exec",
          {
            method: "POST",
            body: formDatab,
          }
        ).then((res) => res.json());
        alert("Form Sent Successfully. Thank You!!")
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
    

    return (
        <div className="attendance-container">
            <div className="dropdowns">
                <select className="dropdown" value={branch} onChange={(e) => setBranch(e.target.value)}>
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics and Communication</option>
                    <option value="ME">Mechanical</option>
                    {/* Add more options as needed */}
                </select>
                <select className="dropdown" value={section} onChange={(e) => setSection(e.target.value)}>
                    <option value="">Select Section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div className="input-boxes">
                <input
                    type="text"
                    name='Email'
                    className="input"
                    placeholder="Enter Registration Number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                />
                <button className="add-button" onClick={handleAddAbsent}>Add Absent</button>
            </div>
            <div className="absent-list">
                <h3>Absent List</h3>
                <ul>
                    {absentNumbers.map((number, index) => (
                        <li key={index}>
                            {number}
                            <button className="delete-button" onClick={() => handleDeleteAbsent(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="submit-button-container">
                <button className="submit-button" onClick={handleDisplayAbsentNumbers}>Submit</button>
                <p className="displayed-absent-numbers" style={{ whiteSpace: 'pre-line' }}>{displayedAbsentNumbers}</p>
            </div>
        </div>
    );
    
}

export default Attendance;
