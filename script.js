// ==========================================
// Rising Talent India - Main JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


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
    // REGISTRATION FORM
    // ==========================================

    const form =
        document.getElementById(
            "registrationForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const submitButton =
                    form.querySelector(
                        ".submit-btn"
                    );


                // ==================================
                // FILE INPUTS
                // ==================================

                const photoInput =
                    document.getElementById(
                        "photo"
                    );

                const videoInput =
                    document.getElementById(
                        "video"
                    );


                const photo =
                    photoInput.files[0];

                const video =
                    videoInput.files[0];


                // ==================================
                // BASIC FILE SIZE CHECK
                // ==================================

                if (photo) {

                    const photoSizeMB =
                        photo.size /
                        (1024 * 1024);

                    if (photoSizeMB > 5) {

                        alert(
                            "Photo size should be less than 5 MB."
                        );

                        return;

                    }

                }


                if (video) {

                    const videoSizeMB =
                        video.size /
                        (1024 * 1024);

                    if (videoSizeMB > 15) {

                        alert(
                            "Performance video should be less than 15 MB."
                        );

                        return;

                    }

                }


                // ==================================
                // BUTTON
                // ==================================

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    "⏳ Uploading... Please wait";


                try {


                    // ==================================
                    // READ PHOTO
                    // ==================================

                    let photoData = "";

                    if (photo) {

                        photoData =
                            await fileToBase64(
                                photo
                            );

                    }


                    // ==================================
                    // READ VIDEO
                    // ==================================

                    let videoData = "";

                    if (video) {

                        videoData =
                            await fileToBase64(
                                video
                            );

                    }


                    // ==================================
                    // FORM DATA
                    // ==================================

                    const data = {

                        fullName:
                            document.getElementById(
                                "fullName"
                            ).value,

                        age:
                            document.getElementById(
                                "age"
                            ).value,

                        mobile:
                            document.getElementById(
                                "mobile"
                            ).value,

                        email:
                            document.getElementById(
                                "email"
                            ).value,

                        state:
                            document.getElementById(
                                "state"
                            ).value,

                        city:
                            document.getElementById(
                                "city"
                            ).value,

                        talentCategory:
                            document.getElementById(
                                "talentCategory"
                            ).value,

                        talentDescription:
                            document.getElementById(
                                "talentDescription"
                            ).value,

                        socialLink:
                            document.getElementById(
                                "socialLink"
                            ).value,

                        photoData:
                            photoData,

                        photoName:
                            photo
                                ? photo.name
                                : "",

                        videoData:
                            videoData,

                        videoName:
                            video
                                ? video.name
                                : ""

                    };


                    // ==================================
                    // GOOGLE APPS SCRIPT URL
                    // ==================================

                    const API_URL =
                        "https://script.google.com/macros/s/AKfycbxL9crE-2T7KRcVxSiC8_vCjykrUWGJsH1K4mqRoJaU09zeC2oYZF2FK9bAnkd7e0_4/exec";


                    // ==================================
                    // SEND DATA
                    // ==================================

                    const response =
                        await fetch(
                            API_URL,
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "text/plain;charset=utf-8"
                                },

                                body:
                                    JSON.stringify(
                                        data
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


                    } else {

                        throw new Error(
                            result.error ||
                            "Registration failed."
                        );

                    }


                } catch (error) {


                    console.error(
                        error
                    );


                    alert(
                        "❌ Registration failed.\n\n" +
                        "Please try again.\n\n" +
                        error.message
                    );


                } finally {


                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        "🚀 Submit Registration";

                }

            }
        );

    }


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
                                "File reading failed."
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
    // TALENT CARD
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


    console.log(
        "Welcome to Rising Talent India 🇮🇳"
    );

});
