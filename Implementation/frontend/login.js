async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("error").innerText = data.message;
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  // Redirect based on role
  if (data.role === "ADMIN") {
    window.location.href = "dashboard.html";
  } else if (data.role === "TREASURER") {
    window.location.href = "finance.html";
  } else {
    window.location.href = "dashboard.html";
  }
}
