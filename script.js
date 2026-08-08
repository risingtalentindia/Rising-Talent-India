// ==========================================
// Rising Talent India - Main JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------------------
    // Smooth scrolling
    // ------------------------------------------

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId !== "#") {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    // ------------------------------------------
    // Register buttons
    // ------------------------------------------

    const registerButtons =
        document.querySelectorAll(
            '.btn[href="#register"], .register-btn'
        );

    registerButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const registerSection =
                document.getElementById("register");

            if (registerSection) {

                registerSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ------------------------------------------
    // Talent category interaction
    // ------------------------------------------

    const talentCards =
        document.querySelectorAll(".talent-card");

    talentCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const talentName =
                this.querySelector("h3");

            if (talentName) {

                console.log(
                    "Selected Talent: " +
                    talentName.textContent
                );

            }

        });

    });


    // ------------------------------------------
    // Welcome message
    // ------------------------------------------

    console.log(
        "Welcome to Rising Talent India 🇮🇳"
    );

});
