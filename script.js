const form = document.getElementById("registration");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("dob").value,
        phnumber: document.getElementById("phnumber").value,
        course: document.getElementById("course").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {

            form.reset();

            statusMessage.innerHTML = `
                🎉
                <br><br>
                <strong>Registered Successfully!</strong>
                <br>
                <small>Your registration has been completed.</small>
                <br><br>
                <button id="closeMessage" type="button">Close</button>
            `;

            statusMessage.style.display = "block";
            statusMessage.style.visibility = "visible";
            statusMessage.style.opacity = "1";

            document.getElementById("closeMessage").addEventListener("click", function () {
                statusMessage.style.display = "none";
            });

        } else {

            statusMessage.innerHTML = `
                ❌
                <br><br>
                <strong>Registration Failed</strong>
                <br>
                <small>${result.message}</small>
            `;

            statusMessage.style.display = "block";

        }

    } catch (error) {

        console.error("Error:", error);

        statusMessage.innerHTML = `
            ❌
            <br><br>
            <strong>Registration Failed</strong>
            <br>
            <small>Unable to connect to the server.</small>
        `;

        statusMessage.style.display = "block";
    }
});