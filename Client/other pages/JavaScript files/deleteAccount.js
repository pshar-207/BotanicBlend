document.addEventListener("DOMContentLoaded", () => {
  const deleteUserButton = document.getElementById("deleteUserButton");
  deleteUserButton.addEventListener("click", () => {
    const result = confirm("Are you sure you want to delete user data?");
    if (result) {
      fetch(`/deleteUserData`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to delete user data");
        })
        .then((data) => {
          if (data.message === "User data deleted successfully") {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error("Error:", error); // Log error message
        });
    }
  });
});
