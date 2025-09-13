// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Typing effect
const roles = ["Java Developer", "Software Engineer", "Cybersecurity Enthusiast"];
let roleIndex = 0, charIndex = 0;
const typingElement = document.getElementById("typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 120);
  } else {
    setTimeout(erase, 1500);
  }
}
function erase() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 80);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}
type();

// Observer for fade-in animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

// Apply to sections, cards, timeline
document.querySelectorAll(".fade-section, .card, .timeline-item")
  .forEach(el => observer.observe(el));

// Email + Form submission
const form = document.getElementById("contactForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // stop default HTML form submit

  // ✅ Email validation
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!emailPattern.test(emailInput.value)) {
    emailError.style.display = "block";
    emailInput.style.border = "1px solid #ff5e62";
    return;
  } else {
    emailError.style.display = "none";
    emailInput.style.border = "none";
  }

  // ✅ Collect form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const response = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.ok) {
      window.location.href = result.next || "/thanks.html"; // redirect to thanks.html
    } else {
      alert("Something went wrong. Please try again.");
      console.error(result);
    }
  } catch (error) {
    console.error("Form submit error:", error);
    alert("Error submitting form. Please try again later.");
  }
});

// Hide error message when typing again
emailInput.addEventListener("input", function () {
  emailError.style.display = "none";
  emailInput.style.border = "none";
});