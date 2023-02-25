module.exports = {
  user_seed_data: [
    { f: "admin", l: "", r: "Admin" },
    { f: "john", l: "doe", r: "User" },
  ],
  question_seed_data: [
    {
      items: ["Item 2", "Item 3"],
      gender: "Male",
      age: 19,
      email: "abc3@gmail.com",
      zipCode: "80882",
    },
    {
      items: ["Item 1", "Item 2"],
      gender: "Male",
      age: 20,
      email: "abc2@gmail.com",
      zipCode: "80882",
    },
    {
      items: ["Item 1", "Item 3"],
      gender: "Female",
      age: 28,
      email: "abc1@gmail.com",
      zipCode: "80882",
    },
    {
      items: ["Item 1", "Item 2", "Item 3"],
      gender: "Female",
      age: 23,
      email: "abc@gmail.com",
      zipCode: "80882",
    },
  ],
  company_seed_data: [
    {
      name: "ABC Inc",
      password: "ABC123",
    },
    {
      name: "XYZ LLC",
      password: "XYZ123",
    },
    {
      name: "Demo Consulting",
      password: "DemoConsulting",
    },
  ],
  category_seed_data: [
    {
      name: "This",
    },
    {
      name: "That",
    },
    {
      name: "Other",
    },
  ],
};
