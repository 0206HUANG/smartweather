import { useState } from 'react';
import './SensorInputs.css';

/**
 * Demo presets for quick testing
 */
const DEMO_PRESETS = {
    flood: {
        sensorsActive: true,
        rainfall: 'High',
        waterLevel: 'Rising',
        windSpeed: 'Weak',
        cloudDensity: 'Low',
        stormProbability: 0.3,
        temperature: 28,
        duration: 2,
        humidity: 'High'
    },
    storm: {
        sensorsActive: true,
        rainfall: 'Medium',
        waterLevel: 'Normal',
        windSpeed: 'Strong',
        cloudDensity: 'High',
        stormProbability: 0.85,
        temperature: 25,
        duration: 1,
        humidity: 'High'
    },
    heatwave: {
        sensorsActive: true,
        rainfall: 'Low',
        waterLevel: 'Normal',
        windSpeed: 'Weak',
        cloudDensity: 'Low',
        stormProbability: 0.1,
        temperature: 36,
        duration: 4,
        humidity: 'Low'
    }
};

export default function SensorInputs({ inputs, setInputs, onRunDecision }) {
    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const loadDemo = (demoType) => {
        setInputs(DEMO_PRESETS[demoType]);
    };

    return (
        <div className="sensor-inputs">
            <div className="panel-header">
                <h2>🎛️ Sensor Inputs</h2>
            </div>

            <div className="input-group">
                <label className="toggle-label">
                    <span>Sensors Active</span>
                    <div className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={inputs.sensorsActive}
                            onChange={(e) => handleInputChange('sensorsActive', e.target.checked)}
                        />
                        <span className="slider"></span>
                    </div>
                    <span className={`toggle-status ${inputs.sensorsActive ? 'active' : 'inactive'}`}>
                        {inputs.sensorsActive ? 'ON' : 'OFF'}
                    </span>
                </label>
            </div>

            <div className="input-grid">
                <div className="input-group">
                    <label>Rainfall</label>
                    <select
                        value={inputs.rainfall}
                        onChange={(e) => handleInputChange('rainfall', e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Water Level</label>
                    <select
                        value={inputs.waterLevel}
                        onChange={(e) => handleInputChange('waterLevel', e.target.value)}
                    >
                        <option value="Normal">Normal</option>
                        <option value="Rising">Rising</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Wind Speed</label>
                    <select
                        value={inputs.windSpeed}
                        onChange={(e) => handleInputChange('windSpeed', e.target.value)}
                    >
                        <option value="Weak">Weak</option>
                        <option value="Strong">Strong</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Cloud Density</label>
                    <select
                        value={inputs.cloudDensity}
                        onChange={(e) => handleInputChange('cloudDensity', e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Humidity</label>
                    <select
                        value={inputs.humidity}
                        onChange={(e) => handleInputChange('humidity', e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            <div className="slider-group">
                <label>
                    Storm Probability: <strong>{inputs.stormProbability.toFixed(2)}</strong>
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={inputs.stormProbability}
                    onChange={(e) => handleInputChange('stormProbability', parseFloat(e.target.value))}
                />
                <div className="range-labels">
                    <span>0</span>
                    <span>0.5</span>
                    <span>1</span>
                </div>
            </div>

            <div className="slider-group">
                <label>
                    Temperature: <strong>{inputs.temperature.toFixed(1)}°C</strong>
                </label>
                <input
                    type="range"
                    min="20"
                    max="45"
                    step="0.5"
                    value={inputs.temperature}
                    onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                />
                <div className="range-labels">
                    <span>20°C</span>
                    <span>32.5°C</span>
                    <span>45°C</span>
                </div>
            </div>

            <div className="input-group number-input">
                <label>Duration (days): <strong>{inputs.duration}</strong></label>
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={inputs.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                />
            </div>

            <div className="button-group">
                <button className="btn btn-primary" onClick={onRunDecision}>
                    ▶️ Run SmartWeather Decision
                </button>
            </div>

            <div className="demo-buttons">
                <span className="demo-label">Load Demo:</span>
                <button className="btn btn-demo flood" onClick={() => loadDemo('flood')}>
                    🌊 Flood
                </button>
                <button className="btn btn-demo storm" onClick={() => loadDemo('storm')}>
                    🌪️ Storm
                </button>
                <button className="btn btn-demo heatwave" onClick={() => loadDemo('heatwave')}>
                    ☀️ Heatwave
                </button>
            </div>
        </div>
    );
}
