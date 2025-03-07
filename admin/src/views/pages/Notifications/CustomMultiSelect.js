import React, { useState, useEffect } from 'react';
import './custom-select.css'; // Ensure this path matches your actual CSS file

const CustomMultiSelect = ({ options, value, onChange, labelledBy }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Effect to sync selected options with the value prop
    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        const isSelected = selectedOptions.some(o => o.id === option.id);
        const newSelectedOptions = isSelected
            ? selectedOptions.filter(o => o.id !== option.id)
            : [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    const handleSelectAll = () => {
        if (selectedOptions.length === options.length) {
            setSelectedOptions([]);
            onChange([]);
        } else {
            setSelectedOptions(options);
            onChange(options);
        }
        setIsOpen(false); // Close the dropdown when Select All is clicked
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleCloseDropdown = () => {
        setIsOpen(false);
    };

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(search.toLowerCase())
    );

    const selectedLabels = selectedOptions.length === options.length
        ? 'Selected All'
        : selectedOptions.map(o => o.name).join(', ') || `Select ${labelledBy}`;

    return (
        <div className={`custom-multi-select ${isOpen ? 'open' : ''}`}>
            <button type="button" onClick={handleToggle} className="select-button">
                {selectedLabels}
            </button>
            {isOpen && (
                <div className="select-dropdown">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearch}
                        className="search-box"
                    />
                    <i onClick={handleCloseDropdown} className="close-button">&times;</i>
                    <div className="select-all">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedOptions.length === options.length}
                                onChange={handleSelectAll}
                            />
                            Select All
                        </label>
                    </div>
                    {filteredOptions.map(option => (
                        <div
                            key={option.id}
                            className={`option-item ${selectedOptions.some(o => o.id === option.id) ? 'selected' : ''}`}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.some(o => o.id === option.id)}
                                    onChange={() => handleSelect(option)}
                                />
                                {option.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomMultiSelect;
