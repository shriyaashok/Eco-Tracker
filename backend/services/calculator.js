// EmissionCalculator service for calculating CO2 emissions and offsets
// Based on scientifically-backed emission factors

class EmissionCalculator {
  /**
   * Calculate vehicle emissions based on distance and fuel type
   * @param {number} distance - Distance traveled in kilometers
   * @param {string} fuelType - Type of fuel: petrol, diesel, electric, hybrid, cng
   * @returns {Object} - { co2Emissions: number, fuelConsumed: number }
   */
  static calculateVehicleEmissions(distance, fuelType) {
    if (!distance || distance <= 0) {
      return { co2Emissions: 0, fuelConsumed: 0 };
    }

    const emissionFactors = {
      petrol: { co2PerLiter: 2.31, consumptionPerKm: 0.08 },
      diesel: { co2PerLiter: 2.68, consumptionPerKm: 0.07 },
      electric: { co2PerKwh: 0.42, consumptionPerKm: 0.2 },
      hybrid: { co2PerLiter: 1.5, consumptionPerKm: 0.05 },
      cng: { co2PerKg: 2.75, consumptionPerKm: 0.06 }
    };

    const normalizedFuelType = fuelType.toLowerCase();
    const factor = emissionFactors[normalizedFuelType];

    if (!factor) {
      throw new Error(`Invalid fuel type: ${fuelType}. Must be one of: petrol, diesel, electric, hybrid, cng`);
    }

    const fuelConsumed = distance * factor.consumptionPerKm;
    const co2 = fuelConsumed * (factor.co2PerLiter || factor.co2PerKwh || factor.co2PerKg);

    return {
      co2Emissions: parseFloat(co2.toFixed(2)),
      fuelConsumed: parseFloat(fuelConsumed.toFixed(2))
    };
  }

  /**
   * Calculate plastic emissions based on quantity and type
   * @param {number} quantity - Quantity in kilograms
   * @param {string} plasticType - Type: single-use, bottles, bags, packaging
   * @returns {number} - CO2 emissions in kg
   */
  static calculatePlasticEmissions(quantity, plasticType) {
    if (!quantity || quantity <= 0) {
      return 0;
    }

    const emissionFactors = {
      'single-use': 6.0,
      'bottles': 6.0,
      'bags': 6.0,
      'packaging': 6.0
    };

    const normalizedType = plasticType.toLowerCase();
    const factor = emissionFactors[normalizedType];

    if (!factor) {
      throw new Error(`Invalid plastic type: ${plasticType}. Must be one of: single-use, bottles, bags, packaging`);
    }

    const co2 = quantity * factor;
    return parseFloat(co2.toFixed(2));
  }

  /**
   * Calculate energy emissions based on amount, source, and renewable flag
   * @param {number} amount - Energy amount in kilowatt-hours
   * @param {string} energySource - Source: natural-gas, electricity, heating-oil, coal
   * @param {boolean} isRenewable - Whether the energy is from renewable sources
   * @returns {number} - CO2 emissions in kg
   */
  static calculateEnergyEmissions(amount, energySource, isRenewable = false) {
    if (!amount || amount <= 0) {
      return 0;
    }

    if (isRenewable) {
      return 0;
    }

    const emissionFactors = {
      'natural-gas': 0.18,
      'electricity': 0.42,
      'heating-oil': 0.27,
      'coal': 0.34
    };

    const normalizedSource = energySource.toLowerCase();
    const factor = emissionFactors[normalizedSource];

    if (!factor) {
      throw new Error(`Invalid energy source: ${energySource}. Must be one of: natural-gas, electricity, heating-oil, coal`);
    }

    const co2 = amount * factor;
    return parseFloat(co2.toFixed(2));
  }

  /**
   * Calculate tree plantation offset and eco points
   * @param {number} treesPlanted - Number of trees planted
   * @returns {Object} - { co2Offset: number, ecoPoints: number }
   */
  static calculateTreeOffset(treesPlanted) {
    if (!treesPlanted || treesPlanted <= 0) {
      return { co2Offset: 0, ecoPoints: 0 };
    }

    const co2PerTreePerYear = 22; // kg CO2 absorbed per tree per year
    const pointsPerTree = 10; // Eco points awarded per tree

    const co2Offset = treesPlanted * co2PerTreePerYear;
    const ecoPoints = treesPlanted * pointsPerTree;

    return {
      co2Offset: parseFloat(co2Offset.toFixed(2)),
      ecoPoints: ecoPoints
    };
  }
}

module.exports = EmissionCalculator;
