// ==========================================
// Rising Talent India
// Registration + Photo + Video Upload
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==========================================
        // GOOGLE APPS SCRIPT WEB APP URL
        // ==========================================

        const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbxL9crE-2T7KRcVxSiC8_vCjykrUWGJsH1K4mqRoJaU09zeC2oYZF2FK9bAnkd7e0_4/exec";


        // ==========================================
        // SMOOTH SCROLLING
        // ==========================================

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

            }
        );


        // ==========================================
        // REGISTER BUTTONS
        // ==========================================

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


        // ==========================================
        // TALENT CARDS
        // ==========================================

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
                            this.querySelector("h3");


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


        // ==========================================
        // REGISTRATION FORM
        // ==========================================

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


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // ==================================
                // GET FORM VALUES
                // ==================================

                const fullName =
                    document.getElementById(
                        "fullName"
                    ).value.trim();


                const age =
                    document.getElementById(
                        "age"
                    ).value;


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


                const talentCategory =
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


                const declaration =
                    document.getElementById(
                        "declaration"
                    );


                // ==================================
                // BASIC VALIDATION
                // ==================================

                if (!fullName) {

                    alert(
                        "Please enter your full name."
                    );

                    return;

                }


                if (!mobile) {

                    alert(
                        "Please enter your mobile number."
                    );

                    return;

                }


                if (!photoInput.files.length) {

                    alert(
                        "Please upload your photo."
                    );

                    return;

                }


                if (!declaration.checked) {

                    alert(
                        "Please accept the declaration."
                    );

                    return;

                }


                // ==================================
                // FILES
                // ==================================

                const photo =
                    photoInput.files[0];


                const video =
                    videoInput.files.length
                        ? videoInput.files[0]
                        : null;


                // ==================================
                // FILE SIZE LIMIT
                // ==================================

                // Photo maximum 5 MB

                if (
                    photo.size >
                    5 * 1024 * 1024
                ) {

                    alert(
                        "Photo must be smaller than 5 MB."
                    );

                    return;

                }


                // Video maximum 20 MB

                if (
                    video &&
                    video.size >
                    20 * 1024 * 1024
                ) {

                    alert(
                        "Performance video must be smaller than 20 MB."
                    );

                    return;

                }


                // ==================================
                // BUTTON
                // ==================================

                const submitButton =
                    form.querySelector(
                        ".submit-btn"
                    );


                const originalText =
                    submitButton.innerHTML;


                submitButton.disabled = true;


                submitButton.innerHTML =
                    "⏳ Uploading... Please wait";


                try {


                    // ==================================
                    // CONVERT PHOTO TO BASE64
                    // ==================================

                    const photoBase64 =
                        await fileToBase64(
                            photo
                        );


                    // ==================================
                    // CONVERT VIDEO TO BASE64
                    // ==================================

                    let videoBase64 = null;


                    if (video) {

                        videoBase64 =
                            await fileToBase64(
                                video
                            );

                    }


                    // ==================================
                    // CREATE DATA
                    // ==================================

                    const registrationData = {

                        fullName: fullName,

                        age: age,

                        mobile: mobile,

                        email: email,

                        state: state,

                        city: city,

                        talentCategory:
                            talentCategory,

                        talentDescription:
                            talentDescription,

                        socialLink:
                            socialLink,


                        photo: {

                            name: photo.name,

                            mimeType: photo.type,

                            base64: photoBase64

                        },


                        video: video
                            ? {

                                name: video.name,

                                mimeType: video.type,

                                base64: videoBase64

                            }
                            : null

                    };


                    // ==================================
                    // SEND TO GOOGLE APPS SCRIPT
                    // ==================================

                    const response =
                        await fetch(
                            GOOGLE_SCRIPT_URL,
                            {

                                method: "POST",

                                body:
                                    JSON.stringify(
                                        registrationData
                                    )

                            }
                        );


                    const result =
                        await response.json();


                    // ==================================
                    // SUCCESS
                    // ==================================

                    if (
                        result.success
                    ) {


                        alert(

                            "🎉 Registration Successful!\n\n" +

                            "Your Registration ID is:\n" +

                            result.registrationId +

                            "\n\nPlease save this ID."

                        );


                        form.reset();


                        console.log(
                            "Registration ID:",
                            result.registrationId
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


                } finally {


                    submitButton.disabled =
                        false;


                    submitButton.innerHTML =
                        originalText;

                }

            }
        );


        // ==========================================
        // FILE → BASE64
        // ==========================================

        function fileToBase64(file) {

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


        // ==========================================
        // WELCOME MESSAGE
        // ==========================================

        console.log(
            "🇮🇳 Welcome to Rising Talent India"
        );

    }
);
