import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const form = document.getElementById("registerForm");
const errorText = document.getElementById("regError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = regEmail.value;
  const password = regPassword.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "signin.html";
  } catch (error) {
    errorText.textContent = error.message;
  }
});