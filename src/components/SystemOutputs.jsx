import './SystemOutputs.css';

export default function SystemOutputs({ results, trace, totalCost, hasRun }) {
    if (!hasRun) {
        return (
            <div className="system-outputs">
                <div className="panel-header">
                    <h2>📊 System Outputs</h2>
                </div>
                <div className="no-data">
                    <div className="no-data-icon">🔄</div>
                    <p>Click "Run SmartWeather Decision" or load a demo to see results</p>
                </div>
            </div>
        );
    }

    const { risks, alerts, summary, notificationMessage } = results;

    return (
        <div className="system-outputs">
            <div className="panel-header">
                <h2>📊 System Outputs</h2>
            </div>

            {/* Risk Cards */}
            <div className="section">
                <h3>Risk Assessment</h3>
                <div className="risk-cards">
                    <RiskCard
                        title="Flood Risk"
                        icon="🌊"
                        active={risks.floodRisk}
                    />
                    <RiskCard
                        title="Storm Risk"
                        icon="🌪️"
                        active={risks.stormRisk}
                    />
                    <RiskCard
                        title="Heatwave Risk"
                        icon="☀️"
                        active={risks.heatwaveRisk}
                    />
                </div>
            </div>

            {/* Alerts and Actions */}
            <div className="section">
                <h3>Alerts & Actions</h3>
                <div className="alerts-grid">
                    <AlertItem label="FloodWarning" active={alerts.floodWarning} />
                    <AlertItem label="StormAlert" active={alerts.stormAlert} />
                    <AlertItem label="HealthWarning" active={alerts.healthWarning} />
                    <AlertItem label="EmergencyMode" active={alerts.emergencyMode} />
                    <AlertItem label="NotifyAuthority" active={alerts.notifyAuthority} yesNo />
                    <AlertItem label="SendNotification" active={alerts.sendNotification} yesNo />
                </div>
            </div>

            {/* Risk Summary */}
            <div className="section">
                <h3>Risk Summary</h3>
                <div className="risk-summary">
                    <div className={`risk-level level-${summary.riskLevel.toLowerCase()}`}>
                        <span className="level-label">Risk Level</span>
                        <span className="level-value">{summary.riskLevel}</span>
                    </div>
                    <div className="confidence">
                        <span className="confidence-label">Confidence</span>
                        <div className="confidence-bar">
                            <div
                                className="confidence-fill"
                                style={{ width: `${summary.confidence}%` }}
                            ></div>
                        </div>
                        <span className="confidence-value">{summary.confidence}%</span>
                    </div>
                </div>
            </div>

            {/* Notification Message */}
            <div className="section">
                <h3>📢 Notification Message</h3>
                <div className="notification-box">
                    {notificationMessage.split('\n\n').map((msg, idx) => (
                        <p key={idx}>{msg}</p>
                    ))}
                </div>
            </div>

            {/* Decision Trace */}
            <div className="section">
                <h3>🔍 Decision Trace (State Space Path)</h3>
                <div className="trace-panel">
                    {trace.map((item, idx) => (
                        <div key={idx} className="trace-step">
                            <span className="step-number">{idx + 1}</span>
                            <span className="step-text">{item.step}</span>
                            {item.cost > 0 && (
                                <span className="step-cost">+{item.cost}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Total Path Cost */}
            <div className="section">
                <div className="total-cost">
                    <span className="cost-label">Total Path Cost:</span>
                    <span className="cost-value">{totalCost}</span>
                </div>
            </div>
        </div>
    );
}

function RiskCard({ title, icon, active }) {
    return (
        <div className={`risk-card ${active ? 'active' : 'inactive'}`}>
            <span className="risk-icon">{icon}</span>
            <span className="risk-title">{title}</span>
            <span className={`risk-status ${active ? 'true' : 'false'}`}>
                {active ? 'TRUE' : 'FALSE'}
            </span>
        </div>
    );
}

function AlertItem({ label, active, yesNo }) {
    const statusText = yesNo
        ? (active ? 'Yes' : 'No')
        : (active ? 'Active' : 'Inactive');

    return (
        <div className={`alert-item ${active ? 'active' : 'inactive'}`}>
            <span className="alert-label">{label}</span>
            <span className={`alert-status ${active ? 'on' : 'off'}`}>
                {statusText}
            </span>
        </div>
    );
}
