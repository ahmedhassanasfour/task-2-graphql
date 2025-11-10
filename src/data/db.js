// In-memory data
let users = [];
let students = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed@iti.edu",
    age: 22,
    major: "Computer Science",
  },
  {
    id: "2",
    name: "Fatma Ali",
    email: "fatma@iti.edu",
    age: 21,
    major: "Information Systems",
  },
];

let courses = [
  {
    id: "1",
    title: "Data Structures",
    code: "CS201",
    credits: 3,
    instructor: "Dr. Mohamed",
  },
  {
    id: "2",
    title: "Database Systems",
    code: "CS301",
    credits: 4,
    instructor: "Dr. Sarah",
  },
];

// Map studentId → [courseIds]
let enrollments = {
  1: ["1", "2"],
  2: ["2"],
};

module.exports = { users, students, courses, enrollments };
