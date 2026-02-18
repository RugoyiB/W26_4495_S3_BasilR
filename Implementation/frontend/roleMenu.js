function applyRoleMenu() {
  const role = localStorage.getItem("role");

  if (!role) {
    logout();
    return;
  }

  // Hide everything first
  document.querySelectorAll(".navbar li").forEach(item => {
    item.style.display = "none";
  });

  // Show allowed items
  const allowedMenus = ROLE_PERMISSIONS[role] || [];

  allowedMenus.forEach(menuId => {
    const el = document.getElementById(menuId);
    if (el) el.style.display = "block";
  });

  // Logout is always visible
  const logoutMenu = document.getElementById("menu-logout");
  if (logoutMenu) logoutMenu.style.display = "block";
}
