/**
 * Rule Engine for SmartWeather POC
 * Implements rule-based risk detection as per Assignment 2 specifications
 */

/**
 * Evaluate risks based on sensor inputs
 * @param {Object} inputs - Sensor input values
 * @returns {Object} - Risk evaluation results
 */
export function evaluateRisks(inputs) {
    const {
        sensorsActive,
        rainfall,
        waterLevel,
        windSpeed,
        cloudDensity,
        stormProbability,
        temperature,
        duration,
        humidity
    } = inputs;

    // If sensors are inactive, no risks can be evaluated
    if (!sensorsActive) {
        return {
            risks: {
                floodRisk: false,
                stormRisk: false,
                heatwaveRisk: false
            },
            alerts: {
                floodWarning: false,
                stormAlert: false,
                healthWarning: false,
                emergencyMode: false,
                notifyAuthority: false,
                sendNotification: false
            },
            summary: {
                riskLevel: 'Low',
                confidence: 0
            },
            notificationMessage: 'Sensors are inactive. No data available.'
        };
    }

    // Rule-based risk detection
    const floodRisk = rainfall === 'High' && waterLevel === 'Rising';
    const stormRisk = windSpeed === 'Strong' && cloudDensity === 'High' && stormProbability > 0.8;
    const heatwaveRisk = temperature > 35 && duration >= 3 && humidity === 'Low';

    // Alerts logic
    const floodWarning = floodRisk;
    const stormAlert = stormRisk;
    const healthWarning = heatwaveRisk;
    const emergencyMode = floodRisk;
    const notifyAuthority = stormAlert;
    const sendNotification = floodWarning || stormAlert || healthWarning;

    // Calculate risk level and confidence
    const activeRisks = [floodRisk, stormRisk, heatwaveRisk].filter(Boolean).length;
    let riskLevel = 'Low';
    let confidence = 75;

    if (activeRisks === 0) {
        riskLevel = 'Low';
        confidence = 90;
    } else if (activeRisks === 1) {
        riskLevel = 'Medium';
        confidence = 85;
    } else {
        riskLevel = 'High';
        confidence = 80;
    }

    // Adjust confidence based on storm probability if storm risk is a factor
    if (stormRisk) {
        confidence = Math.round(stormProbability * 100);
    }

    // Generate notification message
    const notificationMessage = generateNotificationMessage({
        floodRisk,
        stormRisk,
        heatwaveRisk,
        emergencyMode,
        temperature
    });

    return {
        risks: {
            floodRisk,
            stormRisk,
            heatwaveRisk
        },
        alerts: {
            floodWarning,
            stormAlert,
            healthWarning,
            emergencyMode,
            notifyAuthority,
            sendNotification
        },
        summary: {
            riskLevel,
            confidence
        },
        notificationMessage
    };
}

/**
 * Generate a human-friendly notification message
 */
function generateNotificationMessage(risks) {
    const messages = [];

    if (risks.floodRisk) {
        messages.push('⚠️ FLOOD WARNING: High rainfall and rising water levels detected. Seek higher ground immediately.');
    }
    if (risks.stormRisk) {
        messages.push('🌪️ STORM ALERT: Severe storm conditions expected. Stay indoors and secure loose objects.');
    }
    if (risks.heatwaveRisk) {
        messages.push(`🌡️ HEALTH WARNING: Heatwave conditions detected (${risks.temperature}°C). Stay hydrated and avoid outdoor activities.`);
    }
    if (risks.emergencyMode) {
        messages.push('🚨 EMERGENCY MODE ACTIVATED: Emergency services have been notified.');
    }

    if (messages.length === 0) {
        return '✅ All conditions normal. No weather alerts at this time.';
    }

    return messages.join('\n\n');
}
