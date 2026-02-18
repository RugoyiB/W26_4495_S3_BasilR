async function createUser() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const roleInput = document.getElementById("role");
  const msg = document.getElementById("message");

  // Validation
  if (
    !nameInput.value.trim() ||
    !emailInput.value.trim() ||
    !passwordInput.value.trim()
  ) {
    msg.style.color = "red";
    msg.innerText = "All fields are required";
    return;
  }
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
        role: roleInput.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      msg.style.color = "green";
      msg.innerText = data.message || "User created successfully";
      nameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      roleInput.value = "STAFF";
    } else {
      msg.style.color = "red";
      msg.innerText = data.message || "Failed to create user";
    }
  } catch (err) {
    msg.style.color = "red";
    msg.innerText = "Server error";
    console.error(err);
  }
}
