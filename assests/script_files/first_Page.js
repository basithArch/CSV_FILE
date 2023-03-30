function togglePassword() {
    const passwordInput = document.getElementById("password");
    const ConfirmpasswordInput = document.getElementById("confirm_password");

    const toggleIcon = document.getElementById("toggle-icon");
    if (passwordInput.type === "password" || ConfirmpasswordInput.type === "confirm_password") {
      passwordInput.type = "text";
      ConfirmpasswordInput.type = "text";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      ConfirmpasswordInput.type = "password";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    }
  }
  const passwordToggle = document.querySelector(".password-toggle");
  passwordToggle.addEventListener("click", togglePassword);