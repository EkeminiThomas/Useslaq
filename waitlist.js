// ===== Waitlist Frontend Logic (ProForms) =====

const form = document.getElementById("waitlistForm");
const emailInput = document.getElementById("waitlistEmail");
const msg = document.getElementById("waitlistMsg");

function setMessage(text, type) {
  if (!msg) return;
  msg.textContent = text;
  msg.classList.remove("success", "error");
  if (type) msg.classList.add(type);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Mobile Hamburger Menu =====

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn?.addEventListener("click", () => {
  navMenu?.classList.toggle("open");
});


// Validate only, then allow normal form submit to ProForms
form?.addEventListener("submit", (e) => {
  const email = (emailInput?.value || "").trim().toLowerCase();
  if (!email) {
    e.preventDefault();
    setMessage("Please type your email.", "error");
    emailInput?.focus();
    return;
  }
  if (!isValidEmail(email)) {
    e.preventDefault();
    setMessage("That email doesn’t look correct.", "error");
    emailInput?.focus();
    return;
  }
  setMessage("");
});

// Join Waitlist button triggers submit (same as Signup)
const joinBtn = document.getElementById("joinWaitlistBtn");
joinBtn?.addEventListener("click", () => form?.requestSubmit());

// Navbar button scroll + focus
const navBtn = document.getElementById("navWaitlistBtn");
navBtn?.addEventListener("click", () => setTimeout(() => emailInput?.focus(), 300));
