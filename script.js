// ==========================================
// Rising Talent India - Main JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("active");

            if (mainNav.classList.contains("active")) {
                menuToggle.innerHTML = "✕";
                menuToggle.setAttribute(
                    "aria-label",
                    "Close Menu"
                );
            } else {
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute(
                    "aria-label",
                    "Open Menu"
                );
            }

        });


        // Close menu after clicking a menu item

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                menuToggle.innerHTML = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            });

        });

    }


    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId &&
                    targetId !== "#"
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    });


    // ==========================================
    // WELCOME MESSAGE
    // ==========================================

    console.log(
        "Welcome to Rising Talent India 🇮🇳"
    );

});
