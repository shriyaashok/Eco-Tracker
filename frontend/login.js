// login.js
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase.js";

const loginBtn = document.getElementById("loginBtn");
const errorText = document.getElementById("error");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    errorText.innerText = "Please enter email and password";
    return;
  }

  try {
    // STEP A: SEND EMAIL & PASSWORD TO FIREBASE
    const userCredential =
      await signInWithEmailAndPassword(auth, email, password);

    // STEP B: GET LOGGED IN USER
    const user = userCredential.user;

    // STEP C: SAVE USER INFO
    localStorage.setItem("uid", user.uid);
    localStorage.setItem("email", user.email);

    alert("Login successful");

    // STEP D: GO TO DASHBOARD
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    errorText.innerText = "Invalid email or password";
  }
});
