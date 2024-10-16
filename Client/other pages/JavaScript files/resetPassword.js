document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate the form
    // if (!validateForm()) {
    //   return; // Stop form submission if validation fails
    // }

    const emailuser = document.querySelector(".userEmail").value;
    console.log(emailuser);

    if (!emailuser) {
      console.log("email empty");
    }

    fetch("/PasswordReset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: emailuser,
        new_password: document.getElementById("new_password").value,
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
        if (data.message === "Password changed successfully") {
          alert("Password Changed");
          console.log("Password Changed");
        } // Handle success response
        if (data.message === "User not found") {
          alert("User not found");
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
  });
});
