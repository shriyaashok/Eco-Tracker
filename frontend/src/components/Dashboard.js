import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalEmissions: 0,
    totalOffsets: 0,
    netFootprint: 0,
    ecoPoints: 0,
    entriesCount: 0,
    treesPlanted: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // 🔐 AUTH GUARD
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/");
      return;
    }

    // Fetch dashboard data
    fetchDashboardData(uid);
  }, [navigate]);

  const fetchDashboardData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/dashboard/summary?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.summary);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCO2Level = (co2, ecoPoints) => {
    if (co2 <= 50 || ecoPoints >= 100) {
      return {
        level: 'Excellent',
        color: '#2E7D32',
        bgColor: '#E8F5E9',
        emoji: '😊',
        message: 'You are doing great! Very low emissions.',
        avatarColor: '#4CAF50',
        avatarBgColor: '#C8E6C9',
        statusIcon: '☀️',
        congratsMessage: "🎉 You're at the best level! Keep it up!"
      };
    } else if (co2 <= 150 || ecoPoints >= 50) {
      return {
        level: 'Good',
        color: '#4CAF50',
        bgColor: '#F1F8E9',
        emoji: '🙂',
        message: 'Great job! Keep up the good work!',
        avatarColor: '#66BB6A',
        avatarBgColor: '#DCEDC8',
        statusIcon: '☀️',
        congratsMessage: "🌟 You're doing well! Keep going!"
      };
    } else if (co2 <= 300) {
      return {
        level: 'Moderate',
        color: '#FFA726',
        bgColor: '#FFF3E0',
        emoji: '😐',
        message: 'You\'re doing okay, but there\'s room for improvement.',
        avatarColor: '#FFA726',
        avatarBgColor: '#FFE0B2',
        statusIcon: '⛅',
        congratsMessage: "💪 You can do better! Try planting more trees!"
      };
    } else if (co2 <= 500) {
      return {
        level: 'High',
        color: '#FF7043',
        bgColor: '#FBE9E7',
        emoji: '😟',
        message: 'Your carbon footprint is high. Consider reducing emissions.',
        avatarColor: '#FF7043',
        avatarBgColor: '#FFCCBC',
        statusIcon: '☁️',
        congratsMessage: "🌱 Time to take action! Plant trees to offset emissions!"
      };
    } else {
      return {
        level: 'Very High',
        color: '#8D6E63',
        bgColor: '#EFEBE9',
        emoji: '😰',
        message: 'Your carbon footprint is very high. Take action now!',
        avatarColor: '#8D6E63',
        avatarBgColor: '#D7CCC8',
        statusIcon: '🌧️',
        congratsMessage: "🚨 Urgent action needed! Start reducing emissions now!"
      };
    }
  };

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
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#2E7D32',
        backgroundColor: '#F1F8E9'
      }}>
        Loading your dashboard...
      </div>
    );
  }

  const co2Status = getCO2Level(dashboardData.netFootprint, dashboardData.ecoPoints);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F1F8E9',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px 30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ color: '#2E7D32', margin: 0, fontSize: '24px' }}>🌱 EcoTracker</h1>
        </div>
        
        {/* Navigation Menu */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            style={navItemStyle(activeSection === 'home')}
            onClick={() => setActiveSection('home')}
          >
            🏠 Home
          </button>
          <button 
            style={navItemStyle(false)}
            onClick={() => navigate('/add-entry')}
          >
            ➕ Add Entry
          </button>
          <button 
            style={navItemStyle(activeSection === 'history')}
            onClick={() => setActiveSection('history')}
          >
            📊 History
          </button>
          <button 
            style={navItemStyle(activeSection === 'profile')}
            onClick={() => setActiveSection('profile')}
          >
            👤 Profile
          </button>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#D32F2F',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px' }}>
        {activeSection === 'home' && (
          <>
            {/* BIG Welcome Section */}
            <div style={{
              backgroundColor: 'white',
              padding: '60px 40px',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              marginBottom: '40px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #F1F8E9, #E8F5E9)',
              border: '3px solid #4CAF50'
            }}>
              <div style={{ fontSize: '6rem', marginBottom: '30px' }}>🌱</div>
              <h1 style={{ 
                color: '#2E7D32', 
                marginBottom: '20px', 
                fontSize: '64px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '2px'
              }}>
                WELCOME TO ECO-TRACKER
              </h1>
              <p style={{ 
                fontSize: '24px', 
                color: '#666', 
                marginBottom: '30px',
                fontWeight: '500',
                maxWidth: '600px',
                margin: '0 auto 30px auto'
              }}>
                Track your carbon footprint by logging vehicles, plastics, energy usage, and tree plantations.
              </p>
              <button
                onClick={() => navigate('/add-entry')}
                style={{
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  border: 'none',
                  padding: '20px 40px',
                  borderRadius: '12px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)'
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
                Add Your First Entry
              </button>
            </div>

            {/* Dynamic Avatar Section */}
            <div style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              marginBottom: '30px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Eco Points Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#FFF3E0',
                padding: '10px 20px',
                borderRadius: '25px',
                border: '2px solid #FFA726',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '16px', color: '#666' }}>Eco Points:</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFA726' }}>
                  ⭐ {dashboardData.ecoPoints}
                </span>
              </div>

              {/* Congratulations Message */}
              <div style={{
                backgroundColor: co2Status.bgColor,
                padding: '15px 25px',
                borderRadius: '15px',
                border: `2px solid ${co2Status.color}`,
                marginBottom: '30px',
                display: 'inline-block'
              }}>
                <p style={{ 
                  margin: 0, 
                  color: co2Status.color, 
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  {co2Status.congratsMessage}
                </p>
              </div>

              {/* Dynamic Avatar */}
              <div style={{
                position: 'relative',
                display: 'inline-block',
                marginBottom: '30px'
              }}>
                {/* Avatar Background Glow */}
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  backgroundColor: co2Status.avatarBgColor,
                  opacity: 0.3,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1.2)'
                }}></div>

                {/* Main Avatar Circle */}
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  backgroundColor: co2Status.avatarColor,
                  position: 'relative',
                  margin: '0 auto',
                  boxShadow: `0 8px 25px ${co2Status.avatarColor}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Avatar Face */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: co2Status.avatarColor === '#4CAF50' ? '#66BB6A' : co2Status.avatarColor,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Eyes */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      width: '8px',
                      height: '12px',
                      backgroundColor: '#2E2E2E',
                      borderRadius: '50%'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '8px',
                      height: '12px',
                      backgroundColor: '#2E2E2E',
                      borderRadius: '50%'
                    }}></div>
                    
                    {/* Smile */}
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '25px',
                      height: '12px',
                      border: '3px solid #2E2E2E',
                      borderTop: 'none',
                      borderRadius: '0 0 25px 25px'
                    }}></div>
                  </div>
                </div>

                {/* Sparkle Effects */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '30px',
                  fontSize: '20px'
                }}>✨</div>
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '20px',
                  fontSize: '16px'
                }}>⭐</div>
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '40px',
                  fontSize: '18px'
                }}>✨</div>
              </div>

              {/* Status and Stats */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '24px' }}>{co2Status.statusIcon}</span>
                <h2 style={{ 
                  color: co2Status.color, 
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}>
                  {co2Status.level}
                </h2>
              </div>

              {/* CO2 Value */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#2E2E2E'
                }}>
                  {dashboardData.netFootprint.toFixed(1)}
                </span>
                <span style={{ fontSize: '20px', color: '#666', marginLeft: '5px' }}>
                  kg CO₂
                </span>
              </div>

              {/* Message */}
              <p style={{ 
                fontSize: '18px', 
                color: co2Status.color,
                fontWeight: '500',
                margin: 0,
                maxWidth: '400px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                {co2Status.message}
              </p>
            </div>

            {/* Main Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '2px solid #FF7043'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏭</div>
                <h3 style={{ color: '#FF7043', margin: '0 0 10px 0', fontSize: '18px' }}>
                  Total CO₂ Emissions
                </h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#FF7043' }}>
                  {dashboardData.totalEmissions.toFixed(2)} kg
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '2px solid #4CAF50'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌳</div>
                <h3 style={{ color: '#4CAF50', margin: '0 0 10px 0', fontSize: '18px' }}>
                  CO₂ Offset
                </h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#4CAF50' }}>
                  {dashboardData.totalOffsets.toFixed(2)} kg
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '2px solid #2E7D32'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
                <h3 style={{ color: '#2E7D32', margin: '0 0 10px 0', fontSize: '18px' }}>
                  Net Carbon Footprint
                </h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2E7D32' }}>
                  {dashboardData.netFootprint.toFixed(2)} kg
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '2px solid #FFA726'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⭐</div>
                <h3 style={{ color: '#FFA726', margin: '0 0 10px 0', fontSize: '18px' }}>
                  Eco Points
                </h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#FFA726' }}>
                  {dashboardData.ecoPoints}
                </p>
              </div>
            </div>

            {/* Additional Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#2E7D32', margin: '0 0 10px 0' }}>Trees Planted</h4>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                  🌳 {dashboardData.treesPlanted}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#2E7D32', margin: '0 0 10px 0' }}>Total Entries</h4>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                  📊 {dashboardData.entriesCount}
                </p>
              </div>
            </div>
          </>
        )}

        {activeSection === 'history' && (
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 History</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Your carbon footprint history and trends will appear here.
            </p>
            <p style={{ color: '#999', marginTop: '20px' }}>
              Feature coming soon! Track your progress over time.
            </p>
          </div>
        )}

        {activeSection === 'profile' && (
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#2E7D32', marginBottom: '20px' }}>👤 Profile</h2>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👤</div>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
              Email: {localStorage.getItem('email') || 'user@ecotracker.com'}
            </p>
            <p style={{ fontSize: '16px', color: '#999' }}>
              Member since: {new Date().toLocaleDateString()}
            </p>
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>Lifetime Stats</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginTop: '20px'
              }}>
                <div style={{ padding: '15px', backgroundColor: '#F1F8E9', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#2E7D32' }}>
                    Total Emissions: {dashboardData.totalEmissions.toFixed(1)} kg
                  </p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#F1F8E9', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#2E7D32' }}>
                    Trees Planted: {dashboardData.treesPlanted}
                  </p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#F1F8E9', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#2E7D32' }}>
                    Eco Points: {dashboardData.ecoPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}