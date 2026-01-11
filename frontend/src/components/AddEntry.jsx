import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddEntry() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vehicles');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Vehicle form state
  const [vehicleData, setVehicleData] = useState({
    distance: '',
    fuelType: 'petrol'
  });

  // Plastic form state
  const [plasticData, setPlasticData] = useState({
    type: 'bottles',
    quantity: ''
  });

  // Energy form state
  const [energyData, setEnergyData] = useState({
    type: 'electricity',
    amount: '',
    renewable: false
  });

  // Plantation form state
  const [plantationData, setPlantationData] = useState({
    trees: ''
  });

  // 🔐 Auth guard
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    navigate("/");
  };

  const navItemStyle = (isActive) => ({
    padding: '12px 20px',
    backgroundColor: isActive ? '#2E7D32' : 'transparent',
    color: isActive ? 'white' : '#2E7D32',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  // 🔥 MAIN SUBMIT HANDLER
  const handleSubmit = async (type, data) => {
    setLoading(true);
    setMessage('');

    const userId = localStorage.getItem("uid");
    
    if (!userId) {
      setMessage('Error: No user ID found. Please log in again.');
      setLoading(false);
      return;
    }
    
    console.log('Submitting entry:', { type, data, userId });

    // Test if backend is reachable
    try {
      const testResponse = await fetch('http://localhost:4000/api/dashboard/summary?userId=test');
      console.log('Backend test response status:', testResponse.status);
    } catch (testError) {
      console.error('Backend not reachable:', testError);
      setMessage('Error: Cannot connect to backend server. Please check if it\'s running on port 4000.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/entries/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...data }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response result:', result);

      if (result.success) {
        setMessage('Entry added successfully! 🎉');

        // Reset forms
        if (type === 'vehicle') setVehicleData({ distance: '', fuelType: 'petrol' });
        if (type === 'plastic') setPlasticData({ type: 'bottles', quantity: '' });
        if (type === 'energy') setEnergyData({ type: 'electricity', amount: '', renewable: false });
        if (type === 'plantation') setPlantationData({ trees: '' });

        // 🔁 AUTO NAVIGATE TO DASHBOARD
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setMessage(`Error: ${result.error || 'Failed to add entry. Please try again.'}`);
        console.error('Backend error:', result);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      console.error('Error details:', error.message);
      setMessage(`Network error: ${error.message}. Please check if backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleSubmit = (e) => {
    e.preventDefault();
    handleSubmit('vehicle', vehicleData);
  };

  const handlePlasticSubmit = (e) => {
    e.preventDefault();
    // Fix field names to match backend
    const plasticPayload = {
      plasticType: plasticData.type,
      quantity: plasticData.quantity
    };
    handleSubmit('plastic', plasticPayload);
  };

  const handleEnergySubmit = (e) => {
    e.preventDefault();
    // Fix field names to match backend
    const energyPayload = {
      energySource: energyData.type,
      amount: energyData.amount,
      isRenewable: energyData.renewable
    };
    handleSubmit('energy', energyPayload);
  };

  const handlePlantationSubmit = (e) => {
    e.preventDefault();
    // Fix field names to match backend
    const plantationPayload = {
      treesPlanted: plantationData.trees
    };
    handleSubmit('plantation', plantationPayload);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F1F8E9' }}>

      {/* 🔝 HEADER */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#2E7D32' }}>🌱 EcoTracker</h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={navItemStyle(false)} onClick={() => navigate('/dashboard')}>
            🏠 Dashboard
          </button>
          <button style={navItemStyle(true)}>
            ➕ Add Entry
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#D32F2F',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔔 MESSAGE */}
      {message && (
        <div style={{
          margin: '20px',
          padding: '15px',
          backgroundColor: '#E8F5E9',
          color: '#2E7D32',
          borderRadius: '8px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {message}
          <div style={{ marginTop: '10px' }}>
            Redirecting to Dashboard...
          </div>
        </div>
      )}

      {/* 📄 CONTENT */}
      <div style={{ padding: '30px', backgroundColor: 'white', margin: '20px', borderRadius: '12px' }}>
        {/* PROMINENT BACK BUTTON */}
        <div style={{ 
          marginBottom: '30px', 
          paddingBottom: '20px', 
          borderBottom: '2px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#2E7D32',
              color: 'white',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1B5E20';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#2E7D32';
              e.target.style.transform = 'translateY(0px)';
            }}
          >
            ← Back to Dashboard
          </button>
          
          <div style={{ color: '#666', fontSize: '16px' }}>
            Add your carbon footprint entries
          </div>
        </div>
        
        <h1 style={{ color: '#2E7D32' }}>Add New Entry</h1>
        <p>Choose a category and submit your data</p>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setActiveTab('vehicles')}>🚗 Vehicle</button>
          <button onClick={() => setActiveTab('plastics')}>♻️ Plastic</button>
          <button onClick={() => setActiveTab('energy')}>🔥 Energy</button>
          <button onClick={() => setActiveTab('plantations')}>🌳 Plantation</button>
        </div>

        {/* FORMS */}
        {activeTab === 'vehicles' && (
          <form onSubmit={handleVehicleSubmit}>
            <input
              type="number"
              placeholder="Distance (km)"
              value={vehicleData.distance}
              onChange={(e) => setVehicleData({ ...vehicleData, distance: e.target.value })}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Vehicle Entry'}
            </button>
          </form>
        )}

        {activeTab === 'plastics' && (
          <form onSubmit={handlePlasticSubmit}>
            <input
              type="number"
              placeholder="Quantity (kg)"
              value={plasticData.quantity}
              onChange={(e) => setPlasticData({ ...plasticData, quantity: e.target.value })}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Plastic Entry'}
            </button>
          </form>
        )}

        {activeTab === 'energy' && (
          <form onSubmit={handleEnergySubmit}>
            <input
              type="number"
              placeholder="Energy (kWh)"
              value={energyData.amount}
              onChange={(e) => setEnergyData({ ...energyData, amount: e.target.value })}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Energy Entry'}
            </button>
          </form>
        )}

        {activeTab === 'plantations' && (
          <form onSubmit={handlePlantationSubmit}>
            <input
              type="number"
              placeholder="Trees planted"
              value={plantationData.trees}
              onChange={(e) => setPlantationData({ ...plantationData, trees: e.target.value })}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Plantation Entry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
