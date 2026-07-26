document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* =====================================================
       0. MOBILE MENU TOGGLE LOGIC
       ===================================================== */
    const menuBtn = document.querySelector(".menu-button");
    const navRightGroup = document.querySelector(".nav-right-group");

    if (menuBtn && navRightGroup) {
        menuBtn.addEventListener("click", () => {
            navRightGroup.classList.toggle("active");
        });

        navRightGroup.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navRightGroup.classList.remove("active");
            });
        });
    }

    /* =====================================================
       1. SCROLL REVEAL ANIMATIONS (Fixed selector inclusion)
       ===================================================== */
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .process-node, .kpi-card, .outcome-card, .comp-card, .takeaway-item");

    if (prefersReducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add("active");
        });
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            });
        }, {
            root: null,
            rootMargin: "0px 0px -5% 0px",
            threshold: 0.05
        });

        revealElements.forEach((element) => {
            element.classList.add("reveal"); // Ensure base class exists for CSS transitions
            revealObserver.observe(element);
        });
    }

    /* =====================================================
       2. STAGGERED CARD ANIMATIONS
       ===================================================== */
    const staggerGroups = [
        ".kpi-grid .kpi-card",
        ".outcome-grid .outcome-card",
        ".comparison-grid .comp-card",
        ".process-flow .process-node",
        ".takeaways-list .takeaway-item"
    ];

    staggerGroups.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index * 80, 480)}ms`;
        });
    });

    /* =====================================================
       3. WORKFLOW ACTIVE NODE ANIMATION
       ===================================================== */
    const processNodes = [...document.querySelectorAll(".process-node")];

    if (processNodes.length && !prefersReducedMotion) {
        let currentNode = 0;
        const activateProcessNode = () => {
            processNodes.forEach((node, index) => {
                node.classList.toggle("process-active", index === currentNode);
            });
            currentNode = (currentNode + 1) % processNodes.length;
        };

        activateProcessNode();
        setInterval(activateProcessNode, 2200);
    }

    /* =====================================================
       4. SCROLL PROGRESS INDICATOR
       ===================================================== */
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    /* =====================================================
       5. IMAGE PARALLAX SCROLL EFFECT
       ===================================================== */
    const parallaxImages = document.querySelectorAll('.image-container img');

    if (parallaxImages.length && !prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 768) {
                const scrolled = window.scrollY;
                parallaxImages.forEach(img => {
                    const speed = img.getAttribute('data-speed') || 0.05;
                    const yPos = -(scrolled * speed);
                    img.style.transform = `translateY(${yPos}px)`;
                });
            } else {
                parallaxImages.forEach(img => img.style.transform = `translateY(0)`);
            }
        }, { passive: true });
    }
});