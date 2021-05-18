export default class validator {
  static register = (must = true) => ({
    username: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static todo = (must = true) => ({
    categoryId: {
      presence: must,
      type: "number",
    },
    title: {
      presence: must,
      type: "string",
    },
    description: {
      presence: must,
      type: "string",
    },
  });

  static category = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
  });

  static removeTodo = (must = true) => ({
    todoId: {
      presence: must,
      type: "number",
    },
  });

  static updateTodo = (must = true) => ({
    todoId: {
      presence: must,
      type: "number",
    },
    newStatus: {
      presence: must,
      type: "string",
      inclusion: {
        within: ["to-do", "in-progress", "done"],
        message:
          "^%{value} is an invalid status, please choose from the default values",
      },
    },
  });

  static categoryFilter = (must = true) => ({
    categoryId: {
      presence: must,
      type: "number",
    },
  });
}
