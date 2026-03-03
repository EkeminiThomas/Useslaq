// ===== Waitlist Frontend Logic =====
const API_BASE =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5000"
    : "https://slaq-api.pxxl.click";

const form = document.getElementById("waitlistForm");
const emailInput = document.getElementById("waitlistEmail");
const msg = document.getElementById("waitlistMsg");
const submitBtn = document.getElementById("waitlistSubmitBtn");

function setMessage(text, type) {
  msg.textContent = text;
  msg.classList.remove("success", "error");
  if (type) msg.classList.add(type);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();

  if (!email) return setMessage("Please type your email.", "error");
  if (!isValidEmail(email)) return setMessage("That email doesn’t look correct.", "error");

  submitBtn.disabled = true;
  submitBtn.textContent = "Joining...";
  setMessage("");

  try {
    const res = await fetch(`${API_BASE}/api/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "landing-page" }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.message || "Something went wrong.", "error");
      return;
    }

    setMessage(data.message || "Joined successfully!", "success");
    form.reset();
  } catch (err) {
    setMessage("Could not connect to server. Is the backend running?", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Signup";
  }
});

// ===== "Join Waitlist" button inside the waitlist section =====
const joinBtn = document.getElementById("joinWaitlistBtn");

if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    if (!emailInput.value.trim()) {
      emailInput.focus();
      setMessage("Type your email first.", "error");
      return;
    }

    form.requestSubmit();
  });
}

// ===== Navbar "Join Waitlist" link: scroll + focus input =====
const navBtn = document.getElementById("navWaitlistBtn");

if (navBtn) {
  navBtn.addEventListener("click", () => {
    setTimeout(() => emailInput.focus(), 300);
  });
}

// ==========================
// HAMBURGER TOGGLE
// ==========================
const hamburger = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

/* ✅ FIX: guard against null so it never crashes */
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// ✅ Close menu after clicking any nav link (mobile friendly)
if (navMenu) {
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}