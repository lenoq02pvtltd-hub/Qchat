// app.js

let confirmationResult = null;

// Send OTP
function sendOTP() {
    const phone = "+91" + document.getElementById("phoneNumber").value.replace(/\D/g, "");
console.log(phone);
alert(phone);

    if (phone === "") {
        alert("Enter your mobile number.");
        return;
    }

    auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
        .then((result) => {
            confirmationResult = result;
            alert("OTP sent successfully.");
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Verify OTP
function verifyOTP() {
    const otp = document.getElementById("otp").value;

    if (!confirmationResult) {
        alert("Please send the OTP first.");
        return;
    }

    confirmationResult.confirm(otp)
        .then((result) => {
            const user = result.user;

            localStorage.setItem("uid", user.uid);
            localStorage.setItem("phone", user.phoneNumber);

            document.getElementById("loginBox").style.display = "none";
            document.getElementById("profileBox").style.display = "block";
        })
        .catch(() => {
            alert("Invalid OTP.");
        });
}

// Save Profile
function saveProfile() {

    const uid = localStorage.getItem("uid");
    const phone = localStorage.getItem("phone");

    const username = document.getElementById("username").value;
    const image = document.getElementById("profileImage").files[0];

    if (username === "") {
        alert("Enter your name.");
        return;
    }

    if (image) {

        const ref = storage.ref("profiles/" + uid);

        ref.put(image).then(() => {

            ref.getDownloadURL().then((url) => {

                db.collection("users").doc(uid).set({
                    uid: uid,
                    name: username,
                    phone: phone,
                    photo: url
                }).then(() => {
                    window.location.href = "chat.html";
                });

            });

        });

    } else {

        db.collection("users").doc(uid).set({
            uid: uid,
            name: username,
            phone: phone,
            photo: ""
        }).then(() => {
            window.location.href = "chat.html";
        });

    }

}
