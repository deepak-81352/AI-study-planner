// async function signup() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const res = await fetch("/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await res.json();
//   document.getElementById("message").innerText = data.message;
// }

// async function login() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await res.json();

//   if (data.success) {
//     window.location.href = "dashboard.html";
//   } else {
//     document.getElementById("message").innerText = data.message;
//   }
// }
const BASE_URL = "https://ai-study-planner.onrender.com"; // your Render URL

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("message").innerText = data.message;
  }
}
