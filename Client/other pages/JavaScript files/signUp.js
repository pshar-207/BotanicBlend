// SignUp
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate the form
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    const emailuser = document.querySelector(".userEmail").value;
    console.log(emailuser);

    if (!emailuser) {
      console.log("email empty");
    }

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: emailuser,
        password: document.querySelector(".user_password").value,
      }),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url; // Follow redirect
        } else {
          return response.json(); // Handle other responses
        }
      })
      .then((data) => {
        if (data.message === "User created successfully") {
          alert("Your account has been created!");
          console.log("created");
        } // Handle success response
        if (data.message === "User is already logged in") {
          alert("You are already login");
        }
        if (data.message === "Email already exists") {
          alert("Account already exits");
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
        alert("Your account not created!");
      });
  });
});

function validateForm() {
  var password = document.querySelector(".user_password").value;
  var confirmPassword = document.querySelector(".userConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }
  return true;
}
