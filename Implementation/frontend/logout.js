function logout() {
  localStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "welcome.html";
}
