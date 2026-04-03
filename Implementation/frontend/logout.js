async function logout() {
  const token = localStorage.getItem("token");

  try {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error("Logout API failed");
  }

  localStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "welcome.html";
}

