import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Save user info
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("email", user.email);

      alert("Login successful");
      navigate("/dashboard");

    } catch (err) {
      console.error(err.code, err.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#2E7D32', // Green background
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {/* Big Welcome Text */}
      <h1 style={{
        color: 'white',
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '40px',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        🌱 WELCOME TO ECO-TRACKER
      </h1>

      {/* White Login Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{
          color: '#2E7D32',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px'
        }}>
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '20px',
              border: '2px solid #E0E0E0',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#2E7D32'}
            onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '20px',
              border: '2px solid #E0E0E0',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#2E7D32'}
            onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
          />

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#2E7D32',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1B5E20'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2E7D32'}
          >
            Login
          </button>
        </form>

        {/* Error message */}
        {error && (
          <p style={{ 
            color: '#D32F2F', 
            textAlign: 'center',
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#FFEBEE',
            borderRadius: '5px',
            border: '1px solid #FFCDD2'
          }}>
            {error}
          </p>
        )}

        {/* Signup link */}
        <p style={{
          textAlign: 'center',
          color: '#666',
          margin: 0
        }}>
          Don't have an account?{" "}
          <span
            style={{ 
              color: '#2E7D32', 
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;