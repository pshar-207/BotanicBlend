// Function to handle user login
function loginUser() {
  // Get user credentials from the login form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Make a fetch request to the server-side login endpoint
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
        alert("Login successful!");
        // Redirect or reload as needed
        window.location.reload(); // Refresh the page or redirect as needed
      } else {
        alert(data.message); // Display error message
      }
    })
    .catch((error) => console.error("Error logging in:", error));
}
