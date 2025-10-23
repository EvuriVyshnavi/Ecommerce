// backend/data/users.js

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    // NOTE: This password will be hashed by the User model's pre-save hook
    password: 'Password123', 
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    isAdmin: false,
  },
];

export default users;