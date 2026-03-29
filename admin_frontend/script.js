const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";

    // ideiglenes fix login
    if (email === "admin@escape.hu" && password === "admin123") {
      window.location.href = "INF-28 Admin Main.html";
    } else {
      errorMessage.textContent = "Hibás email vagy jelszó.";
    }
  });
}