import React, { useState } from 'react'

const FrmInactiveUserAcs = () => {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [userId, setUserId] = useState('')
    const [userType, setUserType] = useState('Inactive')

    return (
        <div style={{
            backgroundColor: '#eef2f7',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '40px'
        }}>

            {/* CARD */}
            <div style={{
                backgroundColor: '#fff',
                padding: '25px 30px',
                borderRadius: '10px',
                width: '500px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>

                {/* Header */}
                <h2 style={{ marginBottom: '15px', color: '#333' }}>
                    Users Unallocated Accounts
                </h2>

                {/* Top Button */}
                <button style={{
                    backgroundColor: '#e53935',
                    color: '#fff',
                    padding: '10px 18px',
                    border: 'none',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    Unallocate All Accounts
                </button>

                {/* FORM */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                    {/* Row 1 */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Start Date</label>
                            <input
                                type="date"
                                style={inputStyle}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>End Date</label>
                            <input
                                type="date"
                                style={inputStyle}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* User ID */}
                    <div>
                        <label style={labelStyle}>User ID</label>
                        <input
                            type="text"
                            placeholder="Enter User ID"
                            style={inputStyle}
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>

                    {/* Dropdown */}
                    <div>
                        <label style={labelStyle}>Select User</label>
                        <select
                            style={inputStyle}
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option>Inactive</option>
                            <option>All</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                            style={searchBtn}
                            onClick={() => {
                                console.log({ startDate, endDate, userId, userType })
                            }}
                        >
                            Search
                        </button>

                        <button
                            style={closeBtn}
                            onClick={() => {
                                setStartDate('')
                                setEndDate('')
                                setUserId('')
                                setUserType('Inactive')
                            }}
                        >
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

// 🔥 Reusable Styles (VERY IMPORTANT CLEAN CODE PRACTICE)

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
    fontWeight: '500'
}

const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px'
}

const searchBtn = {
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer'
}

const closeBtn = {
    backgroundColor: '#757575',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer'
}

export default FrmInactiveUserAcs