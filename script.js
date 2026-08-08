// ==========================================
// Rising Talent India - Website JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Register Now Button
    const registerButtons = document.querySelectorAll(".btn");

    registerButtons.forEach(function (button) {

        const text = button.textContent.trim().toLowerCase();

        if (text.includes("register")) {
            button.addEventListener("click", function (event) {
                event.preventDefault();

                alert(
                    "Welcome to Rising Talent India!\n\n" +
                    "Registration section will be available soon."
                );
            });
        }

        // Learn More Button
        if (text.includes("learn")) {
            button.addEventListener("click", function (event) {
                event.preventDefault();

                alert(
                    "Rising Talent India\n\n" +
                    "India's Digital Talent Platform\n" +
                    "Discover • Perform • Shine"
                );
            });
        }
    });

    // Talent Category Click
    const categories = document.querySelectorAll(".categories span");

    categories.forEach(function (category) {

        category.addEventListener("click", function () {

            const talentName = this.textContent.trim();

            alert(
                talentName +
                " category selected!\n\n" +
                "Talent registration for this category will be available soon."
            );

        });

    });

});
