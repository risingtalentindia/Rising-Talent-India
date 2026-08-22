// ==========================================
// Rising Talent India - Main JavaScript
// Registration + Google Sheet + Drive Upload
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("RTI SCRIPT LOADED");


    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

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
        document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (targetId && targetId !== "#") {

                const target =
                    document.querySelector(targetId);

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
    // REGISTRATION FORM
    // ==========================================

    const registrationForm =
        document.getElementById("registrationForm");

    console.log(
        "Registration form found:",
        !!registrationForm
    );


    // ==========================================
    // GOOGLE APPS SCRIPT URL
    // ==========================================

    const APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxL9crE-2T7KRcVxSiC8_vCjykrUWGJsH1K4mqRoJaU09zeC2oYZF2FK9bAnkd7e0_4/exec";


    if (!registrationForm) {

        console.error(
            "Registration form not found."
        );

        return;

    }


    // ==========================================
    // FILE → BASE64
    // ==========================================

    function fileToBase64(file) {

        return new Promise(function (resolve, reject) {

            const reader = new FileReader();

            reader.onload = function () {

                resolve(reader.result);

            };

            reader.onerror = function () {

                reject(
                    new Error(
                        "Unable to read file: " +
                        file.name
                    )
                );

            };

            reader.readAsDataURL(file);

        });

    }


    // ==========================================
    // FORM SUBMIT
    // ==========================================

    registrationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            event.stopPropagation();

            console.log(
                "Registration form submitted."
            );


            // ==================================
            // SUBMIT BUTTON
            // ==================================

            const submitButton =
                registrationForm.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );


            if (!submitButton) {

                alert(
                    "Submit button not found."
                );

                return;

            }


            const originalText =
                submitButton.innerHTML ||
                submitButton.value;


            try {

                // ==================================
                // BUTTON LOADING
                // ==================================

                submitButton.disabled = true;

                if (
                    submitButton.tagName === "INPUT"
                ) {

                    submitButton.value =
                        "Submitting...";

                } else {

                    submitButton.innerHTML =
                        "⏳ Submitting...";

                }


                // ==================================
                // GET FORM DATA
                // ==================================

                const formData =
                    new FormData(registrationForm);


                // ==================================
                // GET FILES
                // ==================================

                const photoFile =
                    formData.get("photo");

                const videoFile =
                    formData.get("video");


                // ==================================
                // PHOTO VALIDATION
                // ==================================

                if (
                    !photoFile ||
                    !(photoFile instanceof File) ||
                    photoFile.size === 0
                ) {

                    throw new Error(
                        "Please upload your photo."
                    );

                }


                // ==================================
                // CREATE DATA OBJECT
                // ==================================

                const data = {

                    fullName:
                        formData.get("fullName") || "",

                    age:
                        formData.get("age") || "",

                    gender:
                        formData.get("gender") || "",

                    mobile:
                        formData.get("mobile") || "",

                    email:
                        formData.get("email") || "",

                    state:
                        formData.get("state") || "",

                    city:
                        formData.get("city") || "",

                    talentCategory:
                        formData.get("talentCategory") || "",

                    talentDescription:
                        formData.get("talentDescription") || "",

                    socialLink:
                        formData.get("socialLink") || ""

                };


                // ==================================
                // PHOTO → BASE64
                // ==================================

                data.photoName =
                    photoFile.name;

                data.photoData =
                    await fileToBase64(photoFile);


                console.log(
                    "Photo prepared."
                );


                // ==================================
                // VIDEO → BASE64
                // ==================================

                if (
                    videoFile &&
                    videoFile instanceof File &&
                    videoFile.size > 0
                ) {

                    data.videoName =
                        videoFile.name;

                    data.videoData =
                        await fileToBase64(videoFile);

                    console.log(
                        "Video prepared."
                    );

                }


                // ==================================
                // DEBUG
                // ==================================

                console.log(
                    "Participant data prepared:",
                    data
                );


                // ==================================
                // SEND TO GOOGLE APPS SCRIPT
                // ==================================

                console.log(
                    "Sending registration to Google..."
                );


                const response =
                    await fetch(
                        APPS_SCRIPT_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );


                console.log(
                    "Google response received."
                );


                // ==================================
                // HTTP CHECK
                // ==================================

                if (!response.ok) {

                    throw new Error(
                        "Google server returned HTTP " +
                        response.status
                    );

                }


                // ==================================
                // READ RESPONSE
                // ==================================

                const result =
                    await response.json();


                console.log(
                    "Registration response:",
                    result
                );


                // ==================================
                // SUCCESS
                // ==================================

                if (
                    result &&
                    result.success === true
                ) {

                    alert(
                        "🎉 Registration Successful!\n\n" +
                        "Registration ID:\n" +
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
                    "❌ Registration Failed\n\n" +
                    error.message
                );


            } finally {

                submitButton.disabled = false;


                if (
                    submitButton.tagName === "INPUT"
                ) {

                    submitButton.value =
                        originalText;

                } else {

                    submitButton.innerHTML =
                        originalText;

                }

            }

        }
    );


    // ==========================================
    // WELCOME MESSAGE
    // ==========================================

    console.log(
        "Welcome to Rising Talent India 🇮🇳"
    );

});
