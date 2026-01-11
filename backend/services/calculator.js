// Calculator functions to compute emissions
// TODO: load emission factors from data/emission_factors.json or DB

const emissionFactors = require('../data/emission_factors.json');

/**
 * Calculate vehicle emissions (kg CO2)
 * @param {number} km
 * @param {string} vehicleType - e.g. 'car', 'motorcycle', 'bus'
 * @param {string} fuelType - e.g. 'petrol', 'diesel'
 */
function calcVehicleEmission(km, vehicleType, fuelType) {
  // Normalize inputs
  if (!km || km <= 0) return 0;
  vehicleType = (vehicleType || '').toLowerCase();
  fuelType = (fuelType || '').toLowerCase();

  // Try to find a matching factor key
  let key = null;

  // Common keys in emissionFactors.vehicle: car_petrol, car_diesel, motorcycle, bus
  if (vehicleType === 'car') {
    if (fuelType === 'petrol' || fuelType === 'gasoline') key = 'car_petrol';
    else if (fuelType === 'diesel') key = 'car_diesel';
  } else if (vehicleType === 'motorcycle' || vehicleType === 'motorbike') {
    key = 'motorcycle';
  } else if (vehicleType === 'bus') {
    key = 'bus';
  }

  // Fallback: if fuelType alone matches a key
  if (!key) {
    const combined = `${vehicleType}_${fuelType}`.trim();
    if (emissionFactors.vehicle[combined]) key = combined;
  }

  // Last resort: pick car_petrol
  if (!key) key = 'car_petrol';

  const factor = emissionFactors.vehicle[key] || 0;
  return factor * km; // kg CO2
}

/**
 * Calculate plastics emissions (kg CO2)
 * @param {number} numItems
 * @param {string} itemType - e.g. 'plastic_bottle'
 */
function calcPlasticsEmission(numItems, itemType) {
  if (!numItems || numItems <= 0) return 0;
  itemType = (itemType || '').toLowerCase();
  let factor = emissionFactors.plastics[itemType];
  if (!factor) {
    // fallback to bottle
    factor = emissionFactors.plastics['plastic_bottle'] || 0;
  }
  return factor * numItems;
}

/**
 * Calculate heating emissions (kg CO2)
 * @param {number} kwh - if using electricity, this is kWh; if using fuels, interpret as liters or m3 depending on fuelType
 * @param {string} fuelType - 'electricity'|'lpg'|'natural_gas'
 * @param {number} days - optional multiplier (e.g., kwh per day * days)
 */
function calcHeatingEmission(kwh, fuelType, days) {
  if (!kwh || kwh <= 0) return 0;
  days = days || 1;
  fuelType = (fuelType || '').toLowerCase();

  if (fuelType === 'electricity') {
    const factor = emissionFactors.heating['electricity_kwh'] || 0;
    return factor * kwh * days; // assume kwh may be per day
  }

  if (fuelType === 'lpg' || fuelType === 'lpg_per_liter') {
    const factor = emissionFactors.heating['lpg_per_liter'] || 0;
    return factor * kwh * days; // interpret kwh as liters when fuelType is lpg
  }

  if (fuelType === 'natural_gas' || fuelType === 'natural_gas_per_m3') {
    const factor = emissionFactors.heating['natural_gas_per_m3'] || 0;
    return factor * kwh * days; // interpret kwh as m3 when fuelType is natural_gas
  }

  // default: treat as electricity
  const factor = emissionFactors.heating['electricity_kwh'] || 0;
  return factor * kwh * days;
}

/**
 * Calculate tree offset (annual offset in kg CO2)
 * @param {number} numTrees
 * @param {string} species
 */
function calcTreeOffset(numTrees, species) {
  if (!numTrees || numTrees <= 0) return 0;
  const perTree = emissionFactors.tree_offset['tree_species_default_annual_offset_kg'] || 0;
  return perTree * numTrees;
}

/**
 * Calculate vehicle emissions (kg CO2)
 * @param {number} distance - distance in km
 * @param {string} fuelType - e.g. 'petrol', 'diesel', 'electric', 'hybrid', 'cng'
 */
function calculateVehicleEmissions(distance, fuelType) {
  if (!distance || distance <= 0) return { co2Emissions: 0, fuelConsumed: 0 };
  
  fuelType = (fuelType || '').toLowerCase();
  
  // Emission factors (kg CO2 per km)
  const factors = {
    petrol: 0.18,     // ~18 kg CO2 per 100km
    diesel: 0.19,     // ~19 kg CO2 per 100km  
    electric: 0.08,   // ~8 kg CO2 per 100km
    hybrid: 0.075,    // ~7.5 kg CO2 per 100km
    cng: 0.165        // ~16.5 kg CO2 per 100km
  };
  
  const factor = factors[fuelType] || factors.petrol;
  const co2Emissions = factor * distance;
  const fuelConsumed = distance * 0.08; // Approximate fuel consumption
  
  return { co2Emissions, fuelConsumed };
}

/**
 * Calculate plastic emissions (kg CO2)
 * @param {number} quantity - quantity in kg
 * @param {string} plasticType - type of plastic
 */
function calculatePlasticEmissions(quantity, plasticType) {
  if (!quantity || quantity <= 0) return 0;
  
  // 6 kg CO2 per kg of plastic (standard factor)
  const factor = 6;
  return factor * quantity;
}

/**
 * Calculate energy emissions (kg CO2)
 * @param {number} amount - amount in kWh
 * @param {string} energySource - type of energy
 * @param {boolean} isRenewable - whether it's renewable
 */
function calculateEnergyEmissions(amount, energySource, isRenewable) {
  if (!amount || amount <= 0) return 0;
  if (isRenewable) return 0; // Renewable energy has 0 emissions
  
  energySource = (energySource || '').toLowerCase();
  
  // Emission factors (kg CO2 per kWh)
  const factors = {
    electricity: 0.42,
    naturalgas: 0.18,
    heatingoil: 0.27,
    coal: 0.34
  };
  
  const factor = factors[energySource] || factors.electricity;
  return factor * amount;
}

/**
 * Calculate tree offset (kg CO2 offset and eco points)
 * @param {number} treesPlanted - number of trees
 */
function calculateTreeOffset(treesPlanted) {
  if (!treesPlanted || treesPlanted <= 0) return { co2Offset: 0, ecoPoints: 0 };
  
  const co2PerTree = 22; // kg CO2 offset per tree per year
  const pointsPerTree = 10; // eco points per tree
  
  return {
    co2Offset: co2PerTree * treesPlanted,
    ecoPoints: pointsPerTree * treesPlanted
  };
}

module.exports = {
  // Keep old functions for backward compatibility
  calcVehicleEmission,
  calcPlasticsEmission,
  calcHeatingEmission,
  calcTreeOffset,
  
  // New functions that match controller expectations
  calculateVehicleEmissions,
  calculatePlasticEmissions,
  calculateEnergyEmissions,
  calculateTreeOffset
};
