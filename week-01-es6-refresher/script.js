// --- 1. OBJECTS ---
// An array of objects — each object represents a student
const students = [
  { name: "Amaka", score: 78 },
  { name: "Tunde", score: 45 },
  { name: "Chiamaka", score: 92 },
  { name: "Bello", score: 40 },
  { name: "Ifeoma", score: 38 },
];

// --- 2. LET vs CONST ---
// const: value never reassigned (the pass mark won't change)
const PASS_MARK = 50;

// let: value that WILL change as we loop/accumulate
let totalScore = 0;

// --- 3. SCOPE ---
// Block scope: `let` and `const` only exist inside the {} they're declared in
function scopeDemo() {
  let insideFunction = "I only exist inside scopeDemo()";
  if (true) {
    let insideBlock = "I only exist inside this if-block";
    console.log(insideBlock); // works here
  }
  // console.log(insideBlock); // would throw an error here — out of scope
  console.log(insideFunction);
}
scopeDemo();

// --- 4. ARROW FUNCTIONS ---
// Traditional function vs arrow function, doing the same job
function isPassTraditional(score) {
  return score >= PASS_MARK;
}
const isPass = (score) => score >= PASS_MARK; // arrow function, same logic

// --- 5. ARRAY METHODS: map, filter, reduce, forEach ---

// map(): transform every student into a new object with a "result" field
const gradedStudents = students.map((student) => {
  return {
    ...student,
    result: isPass(student.score) ? "Pass" : "Fail",
  };
});

// filter(): get only students who passed
const passedStudents = students.filter((student) => isPass(student.score));

// reduce(): sum all scores down to a single total
totalScore = students.reduce((accumulator, student) => accumulator + student.score, 0);
const averageScore = (totalScore / students.length).toFixed(1);

// forEach(): loop through and log each student (no return value, just an action)
students.forEach((student) => {
  console.log(`${student.name}: ${student.score} (${isPass(student.score) ? "Pass" : "Fail"})`);
});

// --- 6. RENDER TO THE WEBPAGE ---
const tableBody = document.getElementById("studentTable");

gradedStudents.forEach((student) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.score}</td>
    <td class="${student.result === "Pass" ? "pass" : "fail"}">${student.result}</td>
  `;
  tableBody.appendChild(row);
});

document.getElementById("summary").innerHTML = `
  <p><strong>Total students:</strong> ${students.length}</p>
  <p><strong>Passed:</strong> ${passedStudents.length}</p>
  <p><strong>Average score:</strong> ${averageScore}</p>
`;

// --- Console summary for demonstration ---
console.log("=== SUMMARY ===");
console.log("Passed students:", passedStudents);
console.log("Total score:", totalScore);
console.log("Average score:", averageScore);