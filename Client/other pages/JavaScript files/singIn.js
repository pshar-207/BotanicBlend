function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Login successful") {
        alert("You logged in!");
        window.location.reload();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error logging in:", error));
}
