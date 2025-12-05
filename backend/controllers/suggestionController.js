// Controller for suggestions (rule-based and ML-backed)
// Provides simple rule-based suggestions. Can be extended to call ML microservice.

const calculator = require('../services/calculator');

exports.getSuggestions = async (req, res) => {
  try {
    // Example: accept optional query ?co2=NUMBER to compute tree offsets
    const co2 = Number(req.query.co2) || 0;
    const trees_needed = co2 > 0 ? Math.ceil(co2 / (calculator.calcTreeOffset(1))) : 0;

    const suggestions = [
      {
        title: 'Reduce vehicle miles',
        description: 'Consider carpooling, using public transit, or switching to an efficient vehicle.',
        impact_kgCO2: 5,
        recommended_action: 'Try to reduce single-occupancy trips by 20%'
      },
      {
        title: 'Reduce single-use plastics',
        description: 'Use reusable bottles and bags to reduce plastic waste and embedded emissions.',
        impact_kgCO2: 0.5,
        recommended_action: 'Replace disposable bottles with a reusable one'
      },
      {
        title: 'Plant trees to offset emissions',
        description: 'Planting trees offsets CO2 over years. Use the planting calculator to estimate numbers.',
        impact_kgCO2: -calculator.calcTreeOffset(1),
        recommended_action: `Plant ${trees_needed} tree(s) to offset ${co2} kg CO2`
      }
    ];

    return res.json({ suggestions, trees_to_offset: trees_needed });
  } catch (err) {
    console.error('getSuggestions error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

