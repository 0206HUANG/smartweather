/**
 * Decision Trace Generator for SmartWeather POC
 * Implements state space search visualization as per Assignment 2
 */

// Path cost model
const COSTS = {
    Activate: 1,
    Collect_data: 1,
    Read_Rainfall: 1,
    Read_WaterLevel: 1,
    Read_WindSpeed: 1,
    Read_CloudDensity: 1,
    Read_StormProbability: 1,
    Read_Temperature: 1,
    Read_Duration: 1,
    Read_Humidity: 1,
    Evaluate_risk: 1,
    Trigger_FloodWarning: 2,
    Trigger_StormAlert: 2,
    Trigger_HealthWarning: 2,
    EmergencyMode: 4,
    NotifyAuthority: 3,
    SendNotification: 2,
    Deactivate: 1
};

/**
 * Generate decision trace based on sensor inputs and evaluation results
 * @param {Object} inputs - Sensor input values
 * @param {Object} results - Evaluation results from ruleEngine
 * @returns {Object} - Trace steps and total path cost
 */
export function generateDecisionTrace(inputs, results) {
    const trace = [];
    let totalCost = 0;

    // Always start with Load_sensors
    trace.push({ step: 'S0: Load_sensors', cost: 0 });

    // Check if sensors are active
    if (!inputs.sensorsActive) {
        trace.push({ step: 'Action: Deactivate -> Off', cost: COSTS.Deactivate });
        totalCost += COSTS.Deactivate;
        return { trace, totalCost };
    }

    // Sensors are active - proceed with full trace
    trace.push({ step: 'Action: Activate -> Collect_data', cost: COSTS.Activate });
    totalCost += COSTS.Activate;

    trace.push({ step: 'Action: Collect_data', cost: COSTS.Collect_data });
    totalCost += COSTS.Collect_data;

    // Read all sensor values
    const sensorReads = [
        'Read_Rainfall',
        'Read_WaterLevel',
        'Read_WindSpeed',
        'Read_CloudDensity',
        'Read_StormProbability',
        'Read_Temperature',
        'Read_Duration',
        'Read_Humidity'
    ];

    sensorReads.forEach(sensor => {
        trace.push({ step: `Action: ${sensor}`, cost: COSTS[sensor] });
        totalCost += COSTS[sensor];
    });

    // Evaluate risk
    trace.push({ step: 'Action: Evaluate_risk', cost: COSTS.Evaluate_risk });
    totalCost += COSTS.Evaluate_risk;

    // Trigger actions based on risks
    const { alerts } = results;

    if (alerts.floodWarning) {
        trace.push({ step: 'Action: Trigger_FloodWarning', cost: COSTS.Trigger_FloodWarning });
        totalCost += COSTS.Trigger_FloodWarning;
    }

    if (alerts.emergencyMode) {
        trace.push({ step: 'Action: EmergencyMode', cost: COSTS.EmergencyMode });
        totalCost += COSTS.EmergencyMode;
    }

    if (alerts.stormAlert) {
        trace.push({ step: 'Action: Trigger_StormAlert', cost: COSTS.Trigger_StormAlert });
        totalCost += COSTS.Trigger_StormAlert;
    }

    if (alerts.healthWarning) {
        trace.push({ step: 'Action: Trigger_HealthWarning', cost: COSTS.Trigger_HealthWarning });
        totalCost += COSTS.Trigger_HealthWarning;
    }

    if (alerts.notifyAuthority) {
        trace.push({ step: 'Action: NotifyAuthority', cost: COSTS.NotifyAuthority });
        totalCost += COSTS.NotifyAuthority;
    }

    if (alerts.sendNotification) {
        trace.push({ step: 'Action: SendNotification', cost: COSTS.SendNotification });
        totalCost += COSTS.SendNotification;
    }

    return { trace, totalCost };
}

/**
 * Get the cost breakdown for display
 */
export function getCostBreakdown() {
    return COSTS;
}
