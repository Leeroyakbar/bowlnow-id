const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute("data-animate")
        entry.target.classList.add(`animate-${animation}`)
        entry.target.classList.remove("opacity-0", "translate-x-[100px]", "translate-x-[-100px]")
      }
    })
  },
  { threshold: 1 }
) // Trigger saat 10% element terlihat

document.querySelectorAll("[data-animate]").forEach((el) => {
  observer.observe(el)
})
