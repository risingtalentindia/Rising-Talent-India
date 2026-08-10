// ==========================================
// Rising Talent India - Main JavaScript
// Registration + Google Sheet Connection
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GOOGLE APPS SCRIPT WEB APP URL
    // ==========================================

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxL9crE-2T7KRcVxSiC8_vCjykrUWGJsH1K4mqRoJaU09zeC2oYZF2FK9bAnkd7e0_4/exec";


    // ==========================================
    // Smooth Scrolling
    // ==========================================

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


    // ==========================================
    // Register Buttons
    // ==========================================

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


    // ==========================================
    // Talent Category Interaction
    // ==========================================

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


    // ==========================================
    // REGISTRATION FORM
    // ==========================================

    const registrationForm =
        document.getElementById("registrationForm") ||
        document.getElementById("registerForm");

    if (registrationForm) {

        registrationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // ------------------------------------------
            // Submit Button
            // ------------------------------------------

            const submitButton =
                registrationForm.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );

            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "";

            if (submitButton) {

                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";

            }


            // ------------------------------------------
            // Collect Form Data
            // ------------------------------------------

            const formData =
                new FormData(registrationForm);

            const data = {

                name:
                    formData.get("name") ||
                    formData.get("fullName") ||
                    "",

                age:
                    formData.get("age") ||
                    "",

                gender:
                    formData.get("gender") ||
                    "",

                mobile:
                    formData.get("mobile") ||
                    formData.get("phone") ||
                    formData.get("mobileNumber") ||
                    "",

                email:
                    formData.get("email") ||
                    "",

                category:
                    formData.get("category") ||
                    formData.get("talent") ||
                    "",

                city:
                    formData.get("city") ||
                    "",

                state:
                    formData.get("state") ||
                    "",

                videoLink:
                    formData.get("videoLink") ||
                    formData.get("video") ||
                    formData.get("videoURL") ||
                    ""

            };


            // ------------------------------------------
            // Basic Validation
            // ------------------------------------------

            if (!data.name) {

                alert("Please enter your name.");

                resetButton();

                return;

            }


            if (!data.mobile) {

                alert("Please enter your mobile number.");

                resetButton();

                return;

            }


            if (!data.category) {

                alert("Please select your talent category.");

                resetButton();

                return;

            }


            // ------------------------------------------
            // Send Data to Google Sheet
            // ------------------------------------------

            fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body: JSON.stringify(data)

            })

            .then(function () {

                // --------------------------------------
                // Registration Successful
                // --------------------------------------

                alert(
                    "🎉 Registration Successful!\n\n" +
                    "Thank you for registering with Rising Talent India 🇮🇳"
                );

                registrationForm.reset();

                resetButton();

            })

            .catch(function (error) {

                console.error(
                    "Registration Error:",
                    error
                );

                alert(
                    "❌ Registration failed.\n\n" +
                    "Please try again later."
                );

                resetButton();

            });


            // ------------------------------------------
            // Reset Submit Button
            // ------------------------------------------

            function resetButton() {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        originalButtonText || "Register Now";

                }

            }

        });

    } else {

        console.log(
            "Registration form not found."
        );

    }


    // ==========================================
    // Welcome Message
    // ==========================================

    console.log(
        "🇮🇳 Welcome to Rising Talent India"
    );

});
