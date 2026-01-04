import { useState } from 'react';
import SensorInputs from './components/SensorInputs';
import SystemOutputs from './components/SystemOutputs';
import { evaluateRisks } from './utils/ruleEngine';
import { generateDecisionTrace } from './utils/decisionTrace';
import './App.css';

// Default sensor values
const DEFAULT_INPUTS = {
  sensorsActive: true,
  rainfall: 'Low',
  waterLevel: 'Normal',
  windSpeed: 'Weak',
  cloudDensity: 'Low',
  stormProbability: 0.2,
  temperature: 25,
  duration: 1,
  humidity: 'High'
};

function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [results, setResults] = useState(null);
  const [trace, setTrace] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  const handleRunDecision = () => {
    // Evaluate risks using rule engine
    const evaluationResults = evaluateRisks(inputs);

    // Generate decision trace
    const { trace: newTrace, totalCost: newCost } = generateDecisionTrace(inputs, evaluationResults);

    setResults(evaluationResults);
    setTrace(newTrace);
    setTotalCost(newCost);
    setHasRun(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🌤️</span>
          <h1>SmartWeather POC</h1>
        </div>
        <p className="subtitle">AI-Powered Weather Risk Assessment System</p>
      </header>

      <main className="app-main">
        <div className="column left-column">
          <SensorInputs
            inputs={inputs}
            setInputs={setInputs}
            onRunDecision={handleRunDecision}
          />
        </div>

        <div className="column right-column">
          <SystemOutputs
            results={results}
            trace={trace}
            totalCost={totalCost}
            hasRun={hasRun}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>SmartWeather POC • University AI Course Assignment 2 • State Space Search Demo</p>
      </footer>
    </div>
  );
}

export default App;
