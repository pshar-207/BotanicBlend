//SingUp
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const emailuser = document.querySelector(".userEmail").value;
    console.log(emailuser);

    if (!emailuser) {
      console.log("emial empty");
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
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
  });
});
