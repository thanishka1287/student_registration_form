const tableBody = document.getElementById("studentTableBody");

async function loadStudents() {

    try {

        const response = await fetch("http://127.0.0.1:5000/students");

        const students = await response.json();

        tableBody.innerHTML = "";

        students.forEach(function (student) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.full_name}</td>
                <td>${student.email}</td>
                <td>${student.dob}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${student.gender}</td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error("Error loading students:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    Unable to load student records.
                </td>
            </tr>
        `;
    }
}

loadStudents();