// ==========================================
// Rising Talent India
// Registration + Photo + Video Upload
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ======================================
        // GOOGLE APPS SCRIPT WEB APP URL
        // ======================================

        const WEB_APP_URL =
            "https://script.google.com/macros/s/AKfycbxL9crE-2T7KRcVxSiC8_vCjykrUWGJsH1K4mqRoJaU09zeC2oYZF2FK9bAnkd7e0_4/exec";


        // ======================================
        // SMOOTH SCROLLING
        // ======================================

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute(
                                "href"
                            );

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

            }
        );


        // ======================================
        // REGISTER BUTTONS
        // ======================================

        const registerButtons =
            document.querySelectorAll(
                '.btn[href="#register"], .register-btn'
            );

        registerButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const registerSection =
                            document.getElementById(
                                "register"
                            );

                        if (registerSection) {

                            registerSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }
        );


        // ======================================
        // TALENT CARD
        // ======================================

        const talentCards =
            document.querySelectorAll(
                ".talent-card"
            );

        talentCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        const talentName =
                            this.querySelector(
                                "h3"
                            );

                        if (talentName) {

                            console.log(
                                "Selected Talent: " +
                                talentName.textContent
                            );

                        }

                    }
                );

            }
        );


        // ======================================
        // REGISTRATION FORM
        // ======================================

        const form =
            document.getElementById(
                "registrationForm"
            );


        if (!form) {

            console.log(
                "Registration form not found."
            );

            return;

        }


        // ======================================
        // FORM SUBMIT
        // ======================================

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // --------------------------------
                // Submit Button
                // --------------------------------

                const submitButton =
                    form.querySelector(
                        ".submit-btn"
                    );


                const originalButtonText =
                    submitButton.innerHTML;


                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    "⏳ Uploading... Please wait";


                try {


                    // ==============================
                    // GET FORM VALUES
                    // ==============================

                    const name =
                        document.getElementById(
                            "fullName"
                        ).value.trim();


                    const age =
                        document.getElementById(
                            "age"
                        ).value;


                    const genderElement =
                        document.getElementById(
                            "gender"
                        );

                    const gender =
                        genderElement
                            ? genderElement.value
                            : "";


                    const mobile =
                        document.getElementById(
                            "mobile"
                        ).value.trim();


                    const email =
                        document.getElementById(
                            "email"
                        ).value.trim();


                    const state =
                        document.getElementById(
                            "state"
                        ).value;


                    const city =
                        document.getElementById(
                            "city"
                        ).value.trim();


                    const category =
                        document.getElementById(
                            "talentCategory"
                        ).value;


                    const talentDescription =
                        document.getElementById(
                            "talentDescription"
                        ).value.trim();


                    const socialLink =
                        document.getElementById(
                            "socialLink"
                        ).value.trim();


                    const photoInput =
                        document.getElementById(
                            "photo"
                        );


                    const videoInput =
                        document.getElementById(
                            "video"
                        );


                    // ==============================
                    // PHOTO CHECK
                    // ==============================

                    if (
                        !photoInput.files ||
                        !photoInput.files[0]
                    ) {

                        alert(
                            "Please upload your photo."
                        );

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalButtonText;

                        return;

                    }


                    // ==============================
                    // FILE SIZE CHECK
                    // ==============================

                    const photoFile =
                        photoInput.files[0];


                    const videoFile =
                        videoInput.files &&
                        videoInput.files[0]
                            ? videoInput.files[0]
                            : null;


                    // Photo maximum: 5 MB
                    if (
                        photoFile.size >
                        5 * 1024 * 1024
                    ) {

                        alert(
                            "Photo size must be less than 5 MB."
                        );

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalButtonText;

                        return;

                    }


                    // Video maximum: 20 MB
                    if (
                        videoFile &&
                        videoFile.size >
                        20 * 1024 * 1024
                    ) {

                        alert(
                            "Video size must be less than 20 MB."
                        );

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalButtonText;

                        return;

                    }


                    // ==============================
                    // READ PHOTO
                    // ==============================

                    const photoData =
                        await fileToBase64(
                            photoFile
                        );


                    // ==============================
                    // READ VIDEO
                    // ==============================

                    let videoData = "";

                    if (videoFile) {

                        videoData =
                            await fileToBase64(
                                videoFile
                            );

                    }


                    // ==============================
                    // CREATE DATA
                    // ==============================

                    const registrationData = {

                        name:
                            name,

                        age:
                            age,

                        gender:
                            gender,

                        mobile:
                            mobile,

                        email:
                            email,

                        category:
                            category,

                        city:
                            city,

                        state:
                            state,

                        talentDescription:
                            talentDescription,

                        socialLink:
                            socialLink,

                        photoData:
                            photoData,

                        photoType:
                            photoFile.type,

                        videoData:
                            videoData,

                        videoType:
                            videoFile
                                ? videoFile.type
                                : ""

                    };


                    // ==============================
                    // SEND TO APPS SCRIPT
                    // ==============================

                    const response =
                        await fetch(
                            WEB_APP_URL,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "text/plain;charset=utf-8"

                                },

                                body:
                                    JSON.stringify(
                                        registrationData
                                    )

                            }
                        );


                    const result =
                        await response.json();


                    // ==============================
                    // SUCCESS
                    // ==============================

                    if (
                        result.success
                    ) {

                        form.reset();


                        submitButton.innerHTML =
                            "✅ Registration Successful";


                        alert(
                            "🎉 Registration Successful!\n\n" +
                            "Your Registration ID is:\n" +
                            result.registrationId
                        );


                        // Restore button
                        setTimeout(
                            function () {

                                submitButton.disabled =
                                    false;

                                submitButton.innerHTML =
                                    originalButtonText;

                            },
                            3000
                        );


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
                        "Error: " +
                        error.message
                    );


                    submitButton.disabled =
                        false;


                    submitButton.innerHTML =
                        originalButtonText;

                }

            }
        );


        // ======================================
        // FILE → BASE64
        // ======================================

        function fileToBase64(file) {

            return new Promise(
                function (
                    resolve,
                    reject
                ) {

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
                                    "Could not read file."
                                )
                            );

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
            );

        }


        // ======================================
        // WELCOME
        // ======================================

        console.log(
            "Welcome to Rising Talent India 🇮🇳"
        );

    }
);
