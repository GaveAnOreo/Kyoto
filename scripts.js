// Handles footer year, navbar styling, scroll animations, and back-to-top visibility.
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const navbar = document.querySelector(".navbar");
    const markNavbar = () => {
        if (!navbar) {
            return;
        }
        if (window.scrollY > 24) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    };

    markNavbar();
    window.addEventListener("scroll", markNavbar);

    const animatedElements = document.querySelectorAll("[data-animate]");
    if (animatedElements.length) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.25,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        animatedElements.forEach(element => {
            if (!element.classList.contains("animate-init")) {
                element.classList.add("animate-init");
            }
            observer.observe(element);
        });
    }

    const backToTopButton = document.getElementById("backToTop");
    if (!backToTopButton) {
        return;
    }

    const toggleButtonVisibility = () => {
        backToTopButton.style.display = window.scrollY > 320 ? "block" : "none";
    };

    window.addEventListener("scroll", toggleButtonVisibility);
    toggleButtonVisibility();

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
