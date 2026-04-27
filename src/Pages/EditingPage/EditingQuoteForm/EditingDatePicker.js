import React, { useState } from 'react';
import './EditingDatePicker.css';
import { FaChevronLeft, FaChevronRight, FaCaretDown } from 'react-icons/fa';

const EditingDatePicker = ({ onCancel, onSet, initialDateStr = '' }) => {
    const parseInitialDate = (dateStr) => {
        if (!dateStr) return new Date();
        const parsed = new Date(dateStr);
        return isNaN(parsed.getTime()) ? new Date() : parsed;
    };

    const initialDate = parseInitialDate(initialDateStr);
    
    const [viewDate, setViewDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(initialDate.getDate());
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const handleSet = () => {
        const formattedDate = `${monthNames[month]} ${selectedDate}, ${year}`;
        onSet(formattedDate);
    };

    // Calendar helper days
    const days = [];
    const startDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
        days.push({ day: prevMonthTotalDays - i, type: 'outside' });
    }
    for (let i = 1; i <= totalDays; i++) {
        days.push({ day: i, type: 'current' });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
        days.push({ day: i, type: 'outside' });
    }

    return (
        <div className="editing-picker-modal" onClick={onCancel}>
            <div className="editing-picker-container" onClick={(e) => { e.stopPropagation(); setShowMonthDropdown(false); }}>
                {/* Header */}
                <div className="editing-calendar-header">
                    <button className="nav-btn" onClick={() => setViewDate(new Date(year, month - 1, 1))}><FaChevronLeft /></button>
                    <div className="current-month-year" onClick={(e) => { e.stopPropagation(); setShowMonthDropdown(!showMonthDropdown); }}>
                        {monthNames[month]} {year} <FaCaretDown className={`caret-icon ${showMonthDropdown ? 'open' : ''}`} />
                        
                        {showMonthDropdown && (
                            <div className="month-year-dropdown" onClick={(e) => e.stopPropagation()}>
                                <div className="month-grid">
                                    {monthNames.map((m, index) => (
                                        <div 
                                            key={m} 
                                            className={`month-item ${index === month ? 'active' : ''}`}
                                            onClick={() => {
                                                setViewDate(new Date(year, index, 1));
                                                setShowMonthDropdown(false);
                                            }}
                                        >
                                            {m}
                                        </div>
                                    ))}
                                </div>
                                <div className="year-selector">
                                    <button onClick={() => setViewDate(new Date(year - 1, month, 1))}><FaChevronLeft /></button>
                                    <span>{year}</span>
                                    <button onClick={() => setViewDate(new Date(year + 1, month, 1))}><FaChevronRight /></button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="nav-btn" onClick={() => setViewDate(new Date(year, month + 1, 1))}><FaChevronRight /></button>
                </div>

                <div className="picker-instruction">
                    <p>Select your preferred booking date</p>
                </div>

                {/* Weekdays */}
                <div className="calendar-grid">
                    <div className="weekday-row">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="weekday">{d}</div>
                        ))}
                    </div>

                    <div className="days-grid">
                        {days.map((d, index) => (
                            <div 
                                key={index} 
                                className={`day-cell ${d.type} ${d.day === selectedDate && d.type === 'current' ? 'selected' : ''}`}
                                onClick={() => d.type === 'current' && setSelectedDate(d.day)}
                            >
                                {d.day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Date Info */}
                <div className="picker-date-info">
                    <div className="info-label">Selected Date:</div>
                    <div className="info-value">
                        {monthNames[month]} {selectedDate}, {year}
                    </div>
                </div>

                {/* Footer */}
                <div className="picker-footer">
                    <button className="picker-cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="picker-set-btn" onClick={handleSet}>Confirm Date</button>
                </div>
            </div>
        </div>
    );
};

export default EditingDatePicker;
