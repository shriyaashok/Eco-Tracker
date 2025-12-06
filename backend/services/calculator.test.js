// Unit tests for EmissionCalculator service

const EmissionCalculator = require('./calculator');

describe('EmissionCalculator', () => {
  describe('calculateVehicleEmissions', () => {
    test('should calculate petrol vehicle emissions correctly', () => {
      const result = EmissionCalculator.calculateVehicleEmissions(100, 'petrol');
      // 100km * 0.08 L/km * 2.31 kg CO2/L = 18.48 kg CO2
      expect(result.co2Emissions).toBe(18.48);
      expect(result.fuelConsumed).toBe(8.0);
    });

    test('should calculate diesel vehicle emissions correctly', () => {
      const result = EmissionCalculator.calculateVehicleEmissions(100, 'diesel');
      // 100km * 0.07 L/km * 2.68 kg CO2/L = 18.76 kg CO2
      expect(result.co2Emissions).toBe(18.76);
      expect(result.fuelConsumed).toBe(7.0);
    });

    test('should calculate electric vehicle emissions correctly', () => {
      const result = EmissionCalculator.calculateVehicleEmissions(100, 'electric');
      // 100km * 0.2 kWh/km * 0.42 kg CO2/kWh = 8.4 kg CO2
      expect(result.co2Emissions).toBe(8.4);
      expect(result.fuelConsumed).toBe(20.0);
    });

    test('should calculate hybrid vehicle emissions correctly', () => {
      const result = EmissionCalculator.calculateVehicleEmissions(100, 'hybrid');
      // 100km * 0.05 L/km * 1.5 kg CO2/L = 7.5 kg CO2
      expect(result.co2Emissions).toBe(7.5);
      expect(result.fuelConsumed).toBe(5.0);
    });

    test('should calculate CNG vehicle emissions correctly', () => {
      const result = EmissionCalculator.calculateVehicleEmissions(100, 'cng');
      // 100km * 0.06 kg/km * 2.75 kg CO2/kg = 16.5 kg CO2
      expect(result.co2Emissions).toBe(16.5);
      expect(result.fuelConsumed).toBe(6.0);
    });

    test('should return zero for zero distance', () => {
      const result = EmissionCalculator.calculateVehicleEmissions(0, 'petrol');
      expect(result.co2Emissions).toBe(0);
      expect(result.fuelConsumed).toBe(0);
    });

    test('should throw error for invalid fuel type', () => {
      expect(() => {
        EmissionCalculator.calculateVehicleEmissions(100, 'invalid');
      }).toThrow('Invalid fuel type');
    });
  });

  describe('calculatePlasticEmissions', () => {
    test('should calculate single-use plastic emissions correctly', () => {
      const result = EmissionCalculator.calculatePlasticEmissions(1, 'single-use');
      // 1kg * 6.0 kg CO2/kg = 6.0 kg CO2
      expect(result).toBe(6.0);
    });

    test('should calculate bottles plastic emissions correctly', () => {
      const result = EmissionCalculator.calculatePlasticEmissions(0.5, 'bottles');
      // 0.5kg * 6.0 kg CO2/kg = 3.0 kg CO2
      expect(result).toBe(3.0);
    });

    test('should calculate bags plastic emissions correctly', () => {
      const result = EmissionCalculator.calculatePlasticEmissions(2, 'bags');
      // 2kg * 6.0 kg CO2/kg = 12.0 kg CO2
      expect(result).toBe(12.0);
    });

    test('should calculate packaging plastic emissions correctly', () => {
      const result = EmissionCalculator.calculatePlasticEmissions(1.5, 'packaging');
      // 1.5kg * 6.0 kg CO2/kg = 9.0 kg CO2
      expect(result).toBe(9.0);
    });

    test('should return zero for zero quantity', () => {
      const result = EmissionCalculator.calculatePlasticEmissions(0, 'bottles');
      expect(result).toBe(0);
    });

    test('should throw error for invalid plastic type', () => {
      expect(() => {
        EmissionCalculator.calculatePlasticEmissions(1, 'invalid');
      }).toThrow('Invalid plastic type');
    });
  });

  describe('calculateEnergyEmissions', () => {
    test('should calculate natural gas emissions correctly', () => {
      const result = EmissionCalculator.calculateEnergyEmissions(100, 'natural-gas', false);
      // 100 kWh * 0.18 kg CO2/kWh = 18.0 kg CO2
      expect(result).toBe(18.0);
    });

    test('should calculate electricity emissions correctly', () => {
      const result = EmissionCalculator.calculateEnergyEmissions(100, 'electricity', false);
      // 100 kWh * 0.42 kg CO2/kWh = 42.0 kg CO2
      expect(result).toBe(42.0);
    });

    test('should calculate heating oil emissions correctly', () => {
      const result = EmissionCalculator.calculateEnergyEmissions(100, 'heating-oil', false);
      // 100 kWh * 0.27 kg CO2/kWh = 27.0 kg CO2
      expect(result).toBe(27.0);
    });

    test('should calculate coal emissions correctly', () => {
      const result = EmissionCalculator.calculateEnergyEmissions(100, 'coal', false);
      // 100 kWh * 0.34 kg CO2/kWh = 34.0 kg CO2
      expect(result).toBe(34.0);
    });

    test('should return zero for renewable energy', () => {
      const result = EmissionCalculator.calculateEnergyEmissions(100, 'electricity', true);
      expect(result).toBe(0);
    });

    test('should return zero for zero amount', () => {
      const result = EmissionCalculator.calculateEnergyEmissions(0, 'electricity', false);
      expect(result).toBe(0);
    });

    test('should throw error for invalid energy source', () => {
      expect(() => {
        EmissionCalculator.calculateEnergyEmissions(100, 'invalid', false);
      }).toThrow('Invalid energy source');
    });
  });

  describe('calculateTreeOffset', () => {
    test('should calculate tree offset and eco points correctly for 1 tree', () => {
      const result = EmissionCalculator.calculateTreeOffset(1);
      // 1 tree * 22 kg CO2/tree = 22 kg CO2 offset
      // 1 tree * 10 points/tree = 10 eco points
      expect(result.co2Offset).toBe(22.0);
      expect(result.ecoPoints).toBe(10);
    });

    test('should calculate tree offset and eco points correctly for 5 trees', () => {
      const result = EmissionCalculator.calculateTreeOffset(5);
      // 5 trees * 22 kg CO2/tree = 110 kg CO2 offset
      // 5 trees * 10 points/tree = 50 eco points
      expect(result.co2Offset).toBe(110.0);
      expect(result.ecoPoints).toBe(50);
    });

    test('should calculate tree offset and eco points correctly for 10 trees', () => {
      const result = EmissionCalculator.calculateTreeOffset(10);
      // 10 trees * 22 kg CO2/tree = 220 kg CO2 offset
      // 10 trees * 10 points/tree = 100 eco points
      expect(result.co2Offset).toBe(220.0);
      expect(result.ecoPoints).toBe(100);
    });

    test('should return zero for zero trees', () => {
      const result = EmissionCalculator.calculateTreeOffset(0);
      expect(result.co2Offset).toBe(0);
      expect(result.ecoPoints).toBe(0);
    });
  });
});
