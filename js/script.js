/**
 * CHHON OUDOM - Portfolio Website
 * JavaScript functionality for animations, navigation, and theme toggle
 */

// ========== DOM Elements ==========
const navMenu = document.getElementById("nav-menu")
const navToggle = document.getElementById("nav-toggle")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav-link")
const themeToggle = document.getElementById("theme-toggle")
const header = document.getElementById("header")
const skillBars = document.querySelectorAll(".skill-progress")

// ========== Mobile Navigation ==========
// Show mobile menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
    document.body.style.overflow = "hidden"
  })
}

// Hide mobile menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    document.body.style.overflow = ""
  })
}

// Close menu when clicking nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    document.body.style.overflow = ""
  })
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu.classList.contains("show-menu") && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("show-menu")
    document.body.style.overflow = ""
  }
})

// ========== Active Navigation Link ==========
function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]")
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        navLink.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", updateActiveLink)

// ========== Header Shadow on Scroll ==========
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 30px var(--shadow-color)"
  } else {
    header.style.boxShadow = "0 2px 20px var(--shadow-color)"
  }
}

window.addEventListener("scroll", handleHeaderScroll)

// ========== Theme Toggle ==========
function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme)
  } else if (prefersDark) {
    document.documentElement.setAttribute("data-theme", "dark")
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
}

// Initialize theme on page load
initTheme()

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme)
}

// Listen for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light")
  }
})

// ========== Scroll Animations ==========
function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-up")

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Animate skill bars when they become visible
        if (entry.target.closest(".skills-group")) {
          animateSkillBars()
        }
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// ========== Skill Bars Animation ==========
function animateSkillBars() {
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    if (!bar.classList.contains("animated")) {
      bar.style.width = `${progress}%`
      bar.classList.add("animated")
    }
  })
}

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")

    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const headerHeight = header.offsetHeight
      const targetPosition = targetElement.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ========== Page Load Animations ==========
function initPageAnimations() {
  // Add initial fade-in class to hero elements
  const heroElements = document.querySelectorAll(".hero .fade-in")

  setTimeout(() => {
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible")
      }, index * 200)
    })
  }, 100)
}

// ========== Initialize ==========
document.addEventListener("DOMContentLoaded", () => {
  initPageAnimations()
  handleScrollAnimations()
  updateActiveLink()
})

// Handle resize events
let resizeTimer
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 992) {
      navMenu.classList.remove("show-menu")
      document.body.style.overflow = ""
    }
  }, 250)
})

// Prevent transition on page load
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
