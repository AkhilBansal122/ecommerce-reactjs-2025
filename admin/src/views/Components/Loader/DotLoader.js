import React from 'react';
import './DotLoader.scss';
export const DotLoader = ({ className }) => {
    return (
        <div className={`snippet ${className}`} data-title="dot-flashing">
            <div className="stage">
                <div className="dot-flashing"></div>
            </div>
        </div>
    );
};