let Clear = document.querySelector(".clear")

document.getElementById('add-student-btn').addEventListener('click', function () {
    document.getElementById('student-modal').style.display = 'flex';
});

function closeModal() {
    document.getElementById('student-modal').style.display = 'none';
}

function addStudent() {
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    const phone = document.getElementById('student-phone').value;
    const enroll = document.getElementById('student-enroll').value;
    const date = document.getElementById('student-date').value;

    if (!name || !email || !phone || !enroll || !date) {
        alert('Please fill in all fields.');
        return;
    }

    const studentList = document.getElementById('student-list');
    const newStudent = document.createElement('li');
    newStudent.classList.add('flex', 'items-center', 'justify-between', 'mx-[32px]', 'py-[21px]', 'pl-[20px]', 'pr-[19px]', 'bg-white', 'rounded-[8px]');
    newStudent.innerHTML = `
            <img src="./images/Avatar-Free-PNG-Image.png" alt="" width="65px" height="55px">
            <p>${name}</p>
            <p>${email}</p>
            <p>${phone}</p>
            <p>${enroll}</p>
            <p>${date}</p>
        `;

    studentList.appendChild(newStudent);

    storeStudentData(name, email, phone, enroll, date);

    document.getElementById('student-form').reset();

    closeModal();
}

function storeStudentData(name, email, phone, enroll, date) {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    students.push({ name, email, phone, enroll, date });

    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudentData() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentList = document.getElementById('student-list');

    students.forEach(student => {
        const newStudent = document.createElement('li');
        newStudent.classList.add('flex', 'items-center', 'justify-between', 'mx-[32px]', 'py-[21px]', 'pl-[20px]', 'pr-[19px]', 'bg-white', 'rounded-[8px]');
        newStudent.innerHTML = `
                <img src="./images/Avatar-Free-PNG-Image.png" alt="" width="65px" height="55px">
                <p>${student.name}</p>
                <p>${student.email}</p>
                <p>${student.phone}</p>
                <p>${student.enroll}</p>
                <p>${student.date}</p>
                <div class="flex items-center gap-[15px]">
                <img src="./images/Vector (13).svg" alt="" width="19.5px" height="4.5px">
                <img class="adit" src="./images/Vector (14).svg" alt="" width="19px" height="19px">
                <img class="delete" src="./images/trash 1.svg" alt="" width="19.5px" height="4.5px">
                </div>
            `;

        studentList.appendChild(newStudent);
    });
}
window.onload = loadStudentData;

Clear.addEventListener("click", function (){
    localStorage.removeItem(user)
})
document.addEventListener('DOMContentLoaded', function() {
    loadStudentData();

    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterStudentList(searchTerm);
    });

    // Add your existing event listener for adding students
    document.getElementById('add-student-btn').addEventListener('click', function () {
        document.getElementById('student-modal').style.display = 'flex';
    });
});

function loadStudentData() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = ''; // Clear the list before reloading

    students.forEach((student, index) => {
        const newStudent = document.createElement('li');
        newStudent.classList.add('flex', 'items-center', 'justify-between', 'mx-[32px]', 'py-[21px]', 'pl-[20px]', 'pr-[19px]', 'bg-white', 'rounded-[8px]');
        newStudent.dataset.index = index; // Add index as data attribute
        newStudent.innerHTML = `
            <img src="./images/Avatar-Free-PNG-Image.png" alt="" width="65px" height="55px">
            <p>${student.name}</p>
            <p>${student.email}</p>
            <p>${student.phone}</p>
            <p>${student.enroll}</p>
            <p>${student.date}</p>
            <div class="flex items-center gap-[15px]">
                <img src="./images/Vector (13).svg" alt="" width="19.5px" height="4.5px">
                <img class="edit" src="./images/Vector (14).svg" alt="" width="19px" height="19px" data-index="${index}">
                <img class="delete" src="./images/trash 1.svg" alt="" width="19.5px" height="4.5px" data-index="${index}">
            </div>
        `;
        studentList.appendChild(newStudent);
    });

    // Attach event listeners to edit and delete buttons
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editStudent(index);
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteStudent(index);
        });
    });
}

function filterStudentList(searchTerm) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = ''; // Clear the list before reloading

    students.forEach((student, index) => {
        if (student.name.toLowerCase().includes(searchTerm)) {
            const newStudent = document.createElement('li');
            newStudent.classList.add('flex', 'items-center', 'justify-between', 'mx-[32px]', 'py-[21px]', 'pl-[20px]', 'pr-[19px]', 'bg-white', 'rounded-[8px]');
            newStudent.dataset.index = index; 
            newStudent.innerHTML = `
                <img src="./images/Avatar-Free-PNG-Image.png" alt="" width="65px" height="55px">
                <p>${student.name}</p>
                <p>${student.email}</p>
                <p>${student.phone}</p>
                <p>${student.enroll}</p>
                <p>${student.date}</p>
                <div class="flex items-center gap-[15px]">
                    <img src="./images/Vector (13).svg" alt="" width="19.5px" height="4.5px">
                    <img class="edit" src="./images/Vector (14).svg" alt="" width="19px" height="19px" data-index="${index}">
                    <img class="delete" src="./images/trash 1.svg" alt="" width="19.5px" height="4.5px" data-index="${index}">
                </div>
            `;
            studentList.appendChild(newStudent);
        }
    });

    // Reattach event listeners to new elements
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editStudent(index);
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteStudent(index);
        });
    });
}

function addStudent() {
    // Your existing code to add a student
}

function editStudent(index) {
    // Your existing code to edit a student
}

function deleteStudent(index) {
    // Your existing code to delete a student
}

function closeModal() {
    document.getElementById('student-modal').style.display = 'none';
}

let currentStudentIndex = null; // To track the index of the student being edited

// Open the modal for adding a new student
document.getElementById('add-student-btn').addEventListener('click', function () {
    document.getElementById('student-modal').style.display = 'flex';
    document.getElementById('modal-title').textContent = 'Add Student';
    currentStudentIndex = null; // Reset current student index
    document.getElementById('student-form').reset();
});

// Function to save student (either add or edit)
function saveStudent() {
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    const phone = document.getElementById('student-phone').value;
    const enroll = document.getElementById('student-enroll').value;
    const date = document.getElementById('student-date').value;

    if (!name || !email || !phone || !enroll || !date) {
        alert('Please fill in all fields.');
        return;
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];

    if (currentStudentIndex === null) {
        // Adding new student
        students.push({ name, email, phone, enroll, date });
    } else {
        // Editing existing student
        students[currentStudentIndex] = { name, email, phone, enroll, date };
    }

    localStorage.setItem('students', JSON.stringify(students));
    loadStudentData();
    closeModal();
}

// Function to open the modal for editing a student
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students'));
    const student = students[index];

    document.getElementById('student-name').value = student.name;
    document.getElementById('student-email').value = student.email;
    document.getElementById('student-phone').value = student.phone;
    document.getElementById('student-enroll').value = student.enroll;
    document.getElementById('student-date').value = student.date;

    document.getElementById('student-modal').style.display = 'flex';
    document.getElementById('modal-title').textContent = 'Edit Student';
    currentStudentIndex = index;
}

// Function to load student data from localStorage
function loadStudentData() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = ''; // Clear the list before reloading

    students.forEach((student, index) => {
        const newStudent = document.createElement('li');
        newStudent.classList.add('flex', 'items-center', 'justify-between', 'mx-[32px]', 'py-[21px]', 'pl-[20px]', 'pr-[19px]', 'bg-white', 'rounded-[8px]');
        newStudent.innerHTML = `
            <img src="./images/Avatar-Free-PNG-Image.png" alt="" width="65px" height="55px">
            <p>${student.name}</p>
            <p>${student.email}</p>
            <p>${student.phone}</p>
            <p>${student.enroll}</p>
            <p>${student.date}</p>
            <div class="flex items-center gap-[15px]">
                <img class="more" src="./images/Vector (13).svg" alt="" width="19.5px" height="4.5px">
                <img class="edit" src="./images/Vector (14).svg" alt="" width="19px" height="19px" data-index="${index}">
                <img class="delete" src="./images/trash 1.svg" alt="" width="19.5px" height="4.5px" data-index="${index}">
            </div>
        `;

        studentList.appendChild(newStudent);
    });

    // Attach event listeners to edit and delete buttons
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editStudent(index);
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteStudent(index);
        });
    });
}

// Function to delete a student
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudentData();
}

function closeModal() {
    document.getElementById('student-modal').style.display = 'none';
}

window.onload = loadStudentData;
