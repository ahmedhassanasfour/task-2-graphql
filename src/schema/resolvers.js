const { users, students, courses, enrollments } = require("../data/db");
const {
  generateId,
  isValidEmail,
  sortData,
  paginate,
} = require("../data/helpers");
const { generateToken } = require("../auth/auth");

const resolvers = {
  Query: {
    getAllStudents: (_, { filter, options }) => {
      let result = [...students];

      if (filter) {
        if (filter.major)
          result = result.filter((s) => s.major === filter.major);
        if (filter.nameContains)
          result = result.filter((s) =>
            s.name.toLowerCase().includes(filter.nameContains.toLowerCase()),
          );
      }

      if (options?.sortBy)
        result = sortData(result, options.sortBy, options.sortOrder);

      return paginate(result, options?.limit, options?.offset);
    },

    getStudent: (_, { id }) => students.find((s) => s.id === id),

    getAllCourses: (_, { filter, options }) => {
      let result = [...courses];
      if (filter?.titleContains)
        result = result.filter((c) =>
          c.title.toLowerCase().includes(filter.titleContains.toLowerCase()),
        );

      if (options?.sortBy)
        result = sortData(result, options.sortBy, options.sortOrder);

      return paginate(result, options?.limit, options?.offset);
    },

    getCourse: (_, { id }) => courses.find((c) => c.id === id),
  },

  Mutation: {
    signup: (_, { email, password }) => {
      if (!isValidEmail(email)) throw new Error("Invalid email");
      if (password.length < 6) throw new Error("Password too short");

      const exists = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (exists) throw new Error("Email already exists");

      const newUser = { id: generateId(), email, password };
      users.push(newUser);
      const token = generateToken(newUser);
      return { token, user: newUser };
    },

    login: (_, { email, password }) => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (!user || user.password !== password)
        throw new Error("Invalid credentials");

      const token = generateToken(user);
      return { token, user };
    },
  },

  Student: {
    courses: (parent) => {
      const courseIds = enrollments[parent.id] || [];
      return courses.filter((c) => courseIds.includes(c.id));
    },
    coursesCount: (parent) => (enrollments[parent.id] || []).length,
  },

  Course: {
    students: (parent) => {
      return students.filter((s) =>
        (enrollments[s.id] || []).includes(parent.id),
      );
    },
    studentsCount: (parent) =>
      students.filter((s) => (enrollments[s.id] || []).includes(parent.id))
        .length,
  },
};

module.exports = resolvers;
