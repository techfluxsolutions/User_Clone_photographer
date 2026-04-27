import React, { useState } from 'react'; 
import './BookingDateTimePicker.css';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaCaretDown } from 'react-icons/fa';

const BookingDateTimePicker = ({ onCancel, onSet, initialStartDate = '', initialEndDate = '' }) => {
    const parseInitialDate = (dateStr) => {
        if (!dateStr) return new Date();
        const parsed = new Date(dateStr);
        return isNaN(parsed.getTime()) ? new Date() : parsed;
    };

    const initialDate = parseInitialDate(initialStartDate);
    
    const [viewDate, setViewDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(initialDate.getDate());
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(0);
    const [period, setPeriod] = useState('AM');
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const handleSet = () => {
        const formattedDate = `${monthNames[month]} ${selectedDate}, ${year}`;
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        onSet(formattedDate, formattedTime);
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
        <div className="booking-picker-modal" onClick={onCancel}>
            <div className="booking-picker-container" onClick={(e) => { e.stopPropagation(); setShowMonthDropdown(false); }}>
                {/* Header */}
                <div className="picker-calendar-header" style={{ position: 'relative' }}>
                    <button className="nav-btn" onClick={() => setViewDate(new Date(year, month - 1, 1))}><FaChevronLeft /></button>
                    <div className="current-month-year" onClick={(e) => { e.stopPropagation(); setShowMonthDropdown(!showMonthDropdown); }} style={{ cursor: 'pointer' }}>
                        {monthNames[month]} {year} <FaCaretDown style={{fontSize: '12px', transform: showMonthDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}} />
                        
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
                                <div className="year-selector" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={(e) => { e.stopPropagation(); setViewDate(new Date(year - 1, month, 1)); }}><FaChevronLeft /></button>
                                    <span>{year}</span>
                                    <button onClick={(e) => { e.stopPropagation(); setViewDate(new Date(year + 1, month, 1)); }}><FaChevronRight /></button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="nav-btn" onClick={() => setViewDate(new Date(year, month + 1, 1))}><FaChevronRight /></button>
                </div>

                <div style={{ padding: '0 20px', marginTop: '10px' }}>
                    <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Select your preferred booking date and time slot</p>
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

                {/* Time Picker */}
                <div className="picker-time-section">
                    <div className="time-unit-col">
                        <button className="unit-nav-btn" onClick={() => setHour(h => h < 12 ? h + 1 : 1)}><FaChevronUp /></button>
                        <div className="time-input-box">{hour.toString().padStart(2, '0')}</div>
                        <button className="unit-nav-btn" onClick={() => setHour(h => h > 1 ? h - 1 : 12)}><FaChevronDown /></button>
                    </div>
                    <div className="time-separator">:</div>
                    <div className="time-unit-col">
                        <button className="unit-nav-btn" onClick={() => setMinute(m => (m + 15) % 60)}><FaChevronUp /></button>
                        <div className="time-input-box">{minute.toString().padStart(2, '0')}</div>
                        <button className="unit-nav-btn" onClick={() => setMinute(m => (m - 15 + 60) % 60)}><FaChevronDown /></button>
                    </div>
                    <div className="period-toggle" onClick={() => setPeriod(p => p === 'AM' ? 'PM' : 'AM')}>
                        {period}
                    </div>
                </div>

                {/* Date Info */}
                <div className="picker-date-info">
                    <div className="info-label">New selection:</div>
                    <div className="info-value" style={{ color: '#4A3326', fontWeight: '700' }}>
                        {monthNames[month]} {selectedDate}, {year} at {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')} {period}
                    </div>
                    <div className="info-label" style={{ marginTop: '8px' }}>Current booking:</div>
                    <div className="info-value">{initialStartDate}</div>
                </div>

                {/* Footer */}
                <div className="picker-footer">
                    <button className="picker-cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="picker-set-btn" onClick={handleSet}>Confirm Selection</button>
                </div>
            </div>
        </div>
    );
};

export default BookingDateTimePicker;
