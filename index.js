// Variável para armazenar o número de matrícula
let studentIdCounter = 1;

// Array para armazenar os alunos
let students = [];

const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById('theme-toggle'); // Adicionado

// Função para adicionar um aluno
function addStudent(name, age, course, cpf, birthdate) {
    const studentId = studentIdCounter++;
    students.push({ id: studentId, name, age, course, cpf,birthdate });
    renderStudents();
}

// Função para renderizar a lista de alunos
function renderStudents() {
    const sortCriteria = sortSelect.value;
    const searchString = searchInput.value.toLowerCase();
        
    // Filtrar e ordenar os alunos
    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(searchString) ||
                student.course.toLowerCase().include(searchString) || // Deveria ser 'includes' em vez de 'include'
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
        li.innerHTML = `Matrícula: ${student.id} - ${student.name}- ${student.age} anos - Curso: ${student.course} - CPF: {student.cpf} - Data de Nascimento: ${student.birthdate}<button onclick="editStudent('${student.name}')"class="edit">Editar</button> <button onclick="deleteStuden('${student.name}')">Excluir</button>`; // 'deleteStuden' deveria ser 'deleteStudent'
        studentList.appendChild(li);
    });
}

// Função para editar um aluno
function editStudent(name) {
    const index = students.findIndex(student => student.name ===name); // Deveria ser '===' em vez de '==='
    const newName = prompt("Novo nome:");
    const newAge = prompt("Nova idade:");
    const newCourse = prompt("Novo curso:");
    const newBirthdate = prompt("Nova data de nascimento:");
    students[index].name = newName;
    students[index].age = newAge;
    students[index].course = newCourse;
    students[index].birthdate = newBirthdate;
    renderStudents();
}

// Função para excluir um aluno
function deleteStudent(name) {
    if (confirm(`Tem certeza que deseja excluir o aluno ${name}?`)){
        const index = students.findIndex(student => student.name=== name);
        students.splice(index, 1);
        renderStudents();
    }
}

// Evento de envio do formulário
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;
    const cpf = document.getElementById("cpf").value;
    const birthdate = document.getElementById("birthdate").value;
    addStudent(name, age, course, cpf, birthdate);
     // Limpar os campos do formulário após adicionar um aluno
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
     document.getElementById("cpf").value = "";
    document.getElementById("birthdate").value = "";
});

// Evento de alteração de critério de ordenação e busca
sortSelect.addEventListener("change", renderStudents);
searchInput.addEventListener("input", renderStudents);

// Função para alternar entre temas
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
