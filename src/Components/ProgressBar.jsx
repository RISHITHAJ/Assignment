import React from 'react';

const ProgressBar = ({ segments }) => {
    const segmentData = segments.data;
    return (
        <>  
        <div>
            <h6 style={{fontSize:"14px",textAlign:"left",marginLeft:"5px",marginTop:"18px"}}>{segments.total}</h6>
        </div>
        <div className="progress-container">
            <div className="progress-stacked">
                {segmentData.map((segment, index) => (
                    <div
                        key={index}
                        className="progress"
                        role="progressbar"
                        aria-label={`Segment ${index + 1}`}
                        aria-valuenow={segment.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${segment.percentage}%` }}
                    >
                        <div className={`progress-bar ${segment.color}`} />
                    </div>
                ))}
            </div>
            <ul className="legend">
                {segmentData.map((segment, index) => (
                    <li key={index} className="legend-item">
                        <div className={`legend-color ${segment.color}`} />
                        <span className="legend-label">{segment.label}</span>
                    </li>
                ))}
            </ul>
        </div></>
    );
};

export default ProgressBar;
