// Variável para armazenar o número de matrícula
let studentIdCounter = 1;

// Array para armazenar os alunos
let students = [];

const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Função para adicionar um aluno
function addStudent(name, age, course, cpf, birthdate) {
    const studentId = studentIdCounter++;
    students.push({ id: studentId, name, age, course, cpf, birthdate });
    renderStudents();
}

// Função para renderizar a lista de alunos
function renderStudents() {
    const sortCriteria = sortSelect.value;
    const searchString = searchInput.value.toLowerCase();

    // Filtrar e ordenar os alunos
    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(searchString) ||
            student.course.toLowerCase().includes(searchString) ||
            student.cpf.includes(searchString) ||
            student.birthdate.includes(searchString);
    }).sort((a, b) => {
        if (a[sortCriteria] < b[sortCriteria]) return -1;
        if (a[sortCriteria] > b[sortCriteria]) return 1;
        return 0;
    });

    studentList.innerHTML = "";
    filteredStudents.forEach(student => {
        const li = document.createElement("li");
        li.innerHTML = `Matrícula: ${student.id} - ${student.name} - ${student.age} anos - Curso: ${student.course} - CPF: ${student.cpf} - Data de Nascimento: ${student.birthdate} 
            <button onclick="editStudent(${student.id})" class="edit">Editar</button> 
            <button onclick="deleteStudent(${student.id})">Excluir</button>`;
        studentList.appendChild(li);
    });
}

// Função para editar um aluno
function editStudent(id) {
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        const student = students[index];
        const newName = prompt("Novo nome:", student.name);
        const newAge = prompt("Nova idade:", student.age);
        const newCourse = prompt("Novo curso:", student.course);
        const newCpf = prompt("Novo CPF:", student.cpf);
        const newBirthdate = prompt("Nova data de nascimento:", student.birthdate);

        if (newName !== null && newAge !== null && newCourse !== null && newCpf !== null && newBirthdate !== null) {
            students[index] = {
                ...student,
                name: newName,
                age: newAge,
                course: newCourse,
                cpf: newCpf,
                birthdate: newBirthdate
            };
            renderStudents();
        }
    }
}

// Função para excluir um aluno
function deleteStudent(id) {
    const index = students.findIndex(student => student.id === id);
    if (index !== -1 && confirm(`Tem certeza que deseja excluir o aluno ${students[index].name}?`)) {
        students.splice(index, 1);
        renderStudents();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        console.log('Theme toggled:', body.classList.contains('dark-theme'));
    });
});



// Evento de envio do formulário
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;
    const cpf = document.getElementById("cpf").value;
    const birthdate = document.getElementById("birthdate").value;

    if (name && age && course && cpf && birthdate) {
        addStudent(name, age, course, cpf, birthdate);

        // Limpar os campos do formulário após adicionar um aluno
        studentForm.reset();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Evento de alteração de critério de ordenação e busca
sortSelect.addEventListener("change", renderStudents);
searchInput.addEventListener("input", renderStudents);

// Inicializar a lista de alunos ao carregar a página
renderStudents();
