import { getStudentsAPI } from "./api/get-stidents-api.js";
import { delStudAPI } from "./api/dellsudents.js";
import { postStudAPI } from "./api/postSud.js";
import { updateStudApi } from "./api/updateStud.js";

const tableRef = document.querySelector("tbody");
const getBtn = document.querySelector("#get-students-btn");
const addStudentsForm = document.getElementById("add-student-form");

let currentEdit = null;


// =====================
// Render
// =====================
function renderStudents(arr) {
  tableRef.innerHTML = arr.map(
    ({ id, name, age, course, skills, email, isEnrolled }) => `
      <tr data-id="${id}">
        <td>${id}</td>
        <td>${name}</td>
        <td>${age}</td>
        <td>${course}</td>
        <td>${skills}</td>
        <td>${email}</td>
        <td>${isEnrolled ? "Активний" : "Неактивний"}</td>
        <td>
          <button type="button" data-action="delete">Видалити</button>
          <button type="button" data-action="edit">Редагувати</button>
        </td>
      </tr>
    `
  ).join("");
}


// =====================
// Get students
// =====================
getBtn.addEventListener("click", async () => {
  const students = await getStudentsAPI();
  renderStudents(students);
});


// =====================
// Add / Update student
// =====================
async function addStudent(event) {
  event.preventDefault();

  const elements = event.currentTarget.elements;

  const studentData = {
    name: elements.name.value.trim(),
    age: elements.age.value.trim(),
    course: elements.course.value.trim(),
    skills: elements.skills.value.trim(),
    email: elements.email.value.trim(),
    isEnrolled: elements.isEnrolled.checked
  };

  if (currentEdit) {
    await updateStudApi(currentEdit, studentData);
    currentEdit = null;
  } else {
    await postStudAPI(studentData);
  }

  const students = await getStudentsAPI();
  renderStudents(students);

  addStudentsForm.reset();
}

addStudentsForm.addEventListener("submit", addStudent);


// =====================
// Delete / Edit (Event Delegation)
// =====================
tableRef.addEventListener("click", async (event) => {
  const action = event.target.dataset.action;
  if (!action) return;

  const row = event.target.closest("tr");
  const id = row.dataset.id;

  if (action === "delete") {
    await delStudAPI(id);

    const students = await getStudentsAPI();
    renderStudents(students);
  }

  if (action === "edit") {
    currentEdit = id;

    const cells = row.children;

    addStudentsForm.elements.name.value = cells[1].textContent;
    addStudentsForm.elements.age.value = cells[2].textContent;
    addStudentsForm.elements.course.value = cells[3].textContent;
    addStudentsForm.elements.skills.value = cells[4].textContent;
    addStudentsForm.elements.email.value = cells[5].textContent;
    addStudentsForm.elements.isEnrolled.checked =
      cells[6].textContent === "Активний";
  }
});
