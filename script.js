document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!menuButton || !navMenu) return;

    // Open and close mobile menu
    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = navMenu.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", isOpen);

        const icon = menuButton.querySelector("i");

        if (isOpen) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu when clicking a navigation link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

        if (
            !navMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }

    });

    // Close menu when pressing Escape
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    function closeMenu() {

        navMenu.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

        const icon = menuButton.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

});