// ==========================================
// Rising Talent India - Main JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                mainNav.classList.toggle("active");


                if (
                    mainNav.classList.contains("active")
                ) {

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

            }
        );


        // Close menu after clicking menu item

        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNav.classList.remove(
                        "active"
                    );

                    menuToggle.innerHTML = "☰";

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open Menu"
                    );

                }
            );

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


    // ==========================================
    // REGISTRATION FORM SUBMISSION
    // ==========================================

    const registrationForm =
        document.getElementById(
            "registrationForm"
        );


    const APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxL9crE-2T7KRcVxSiC8_vCjykrUWGJsH1K4mqRoJaU09zeC2oYZF2FK9bAnkd7e0_4/exec";


    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const submitButton =
                    registrationForm.querySelector(
                        ".submit-btn"
                    );


                const originalText =
                    submitButton.innerHTML;


                try {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        "⏳ Submitting...";


                    // ======================================
                    // GET FORM VALUES
                    // ======================================

                    const data = {

                        fullName:
                            document
                                .getElementById("fullName")
                                .value
                                .trim(),

                        age:
                            document
                                .getElementById("age")
                                .value,

                        gender:
                            document
                                .getElementById("gender")
                                .value,

                        mobile:
                            document
                                .getElementById("mobile")
                                .value
                                .trim(),

                        email:
                            document
                                .getElementById("email")
                                .value
                                .trim(),

                        state:
                            document
                                .getElementById("state")
                                .value,

                        city:
                            document
                                .getElementById("city")
                                .value
                                .trim(),

                        talentCategory:
                            document
                                .getElementById(
                                    "talentCategory"
                                )
                                .value,

                        talentDescription:
                            document
                                .getElementById(
                                    "talentDescription"
                                )
                                .value
                                .trim(),

                        socialLink:
                            document
                                .getElementById(
                                    "socialLink"
                                )
                                .value
                                .trim()

                    };


                    // ======================================
                    // PHOTO
                    // ======================================

                    const photoInput =
                        document.getElementById(
                            "photo"
                        );


                    if (
                        !photoInput ||
                        !photoInput.files.length
                    ) {

                        alert(
                            "Please upload your photo."
                        );

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalText;

                        return;

                    }


                    const photoFile =
                        photoInput.files[0];


                    data.photoName =
                        photoFile.name;


                    data.photoData =
                        await fileToDataURL(
                            photoFile
                        );


                    // ======================================
                    // VIDEO
                    // ======================================

                    const videoInput =
                        document.getElementById(
                            "video"
                        );


                    if (
                        videoInput &&
                        videoInput.files.length
                    ) {

                        const videoFile =
                            videoInput.files[0];


                        data.videoName =
                            videoFile.name;


                        data.videoData =
                            await fileToDataURL(
                                videoFile
                            );

                    }


                    // ======================================
                    // SEND TO GOOGLE APPS SCRIPT
                    // ======================================

                    const response =
                        await fetch(
                            APPS_SCRIPT_URL,
                            {
                                method: "POST",

                                body:
                                    JSON.stringify(data)
                            }
                        );


                    const result =
                        await response.json();


                    // ======================================
                    // SUCCESS
                    // ======================================

                    if (result.success) {

                        alert(
                            "🎉 Registration Successful!\n\n" +
                            "Your Registration ID is:\n" +
                            result.registrationId
                        );


                        registrationForm.reset();


                    } else {

                        throw new Error(
                            result.error ||
                            "Registration failed."
                        );

                    }


                } catch (error) {

                    console.error(
                        "Registration Error:",
                        error
                    );


                    alert(
                        "❌ Registration failed.\n\n" +
                        "Please try again.\n\n" +
                        error.message
                    );


                } finally {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalText;

                }

            }
        );

    }


    // ==========================================
    // FILE → BASE64 DATA URL
    // ==========================================

    function fileToDataURL(file) {

        return new Promise(
            function (resolve, reject) {

                const reader =
                    new FileReader();


                reader.onload =
                    function () {

                        resolve(
                            reader.result
                        );

                    };


                reader.onerror =
                    function () {

                        reject(
                            new Error(
                                "Could not read file: " +
                                file.name
                            )
                        );

                    };


                reader.readAsDataURL(file);

            }
        );

    }

});
