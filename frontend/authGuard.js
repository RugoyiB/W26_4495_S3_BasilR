console.log("authGuard loaded");

window.authToken = localStorage.getItem("token");
window.userRole = localStorage.getItem("role");

if (!window.authToken) {
  window.location.href = "login.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "welcome.html";
}

function requireRole(...allowedRoles) {
  if (!allowedRoles.includes(window.userRole)) {
    alert("Access denied");
    window.location.href = "dashboard.html";
  }
}
/* MAKE FUNCTIONS GLOBAL */
window.logout = logout;
window.requireRole = requireRole;