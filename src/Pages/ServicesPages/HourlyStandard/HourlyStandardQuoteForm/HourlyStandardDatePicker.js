import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCaretDown } from 'react-icons/fa';
import './HourlyStandardDatePicker.css';

const HourlyStandardDatePicker = ({ onCancel, onSet, initialDateStr }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentDate, setCurrentDate] = useState(
        initialDateStr ? new Date(initialDateStr) : new Date()
    );
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleMonthSelect = (monthIndex) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        setShowMonthDropdown(false);
    };

    const handleYearSelect = (year) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setShowYearDropdown(false);
    };

    const renderDays = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const totalDays = daysInMonth(month, year);
        const startDay = startDayOfMonth(month, year);
        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let d = 1; d <= totalDays; d++) {
            const dateObj = new Date(year, month, d);
            const isSelected = initialDateStr && new Date(initialDateStr).toDateString() === dateObj.toDateString();
            const isToday = new Date().toDateString() === dateObj.toDateString();
            const isPast = dateObj < today;

            days.push(
                <div
                    key={d}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isPast ? 'disabled' : ''}`}
                    onClick={() => !isPast && onSet(dateObj.toDateString())}
                >
                    {d}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="hourly-date-picker-overlay" onClick={onCancel}>
            <div className="hourly-date-picker-modal" onClick={e => e.stopPropagation()}>
                <div className="calendar-header">
                    <div className="header-top">
                        <div className="selector-group">
                            <div className="custom-selector" onClick={() => { setShowMonthDropdown(!showMonthDropdown); setShowYearDropdown(false); }}>
                                {months[currentDate.getMonth()]}
                                <FaCaretDown className={`caret-icon ${showMonthDropdown ? 'open' : ''}`} />
                                {showMonthDropdown && (
                                    <div className="selector-dropdown">
                                        {months.map((m, i) => (
                                            <div key={m} className="selector-option" onClick={(e) => { e.stopPropagation(); handleMonthSelect(i); }}>{m}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="custom-selector" onClick={() => { setShowYearDropdown(!showYearDropdown); setShowMonthDropdown(false); }}>
                                {currentDate.getFullYear()}
                                <FaCaretDown className={`caret-icon ${showYearDropdown ? 'open' : ''}`} />
                                {showYearDropdown && (
                                    <div className="selector-dropdown">
                                        {years.map(y => (
                                            <div key={y} className="selector-option" onClick={(e) => { e.stopPropagation(); handleYearSelect(y); }}>{y}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="nav-group">
                            <button onClick={handlePrevMonth}><FaChevronLeft /></button>
                            <button onClick={handleNextMonth}><FaChevronRight /></button>
                        </div>
                    </div>
                </div>

                <div className="calendar-grid">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                    {renderDays()}
                </div>

                <div className="calendar-footer">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default HourlyStandardDatePicker;
