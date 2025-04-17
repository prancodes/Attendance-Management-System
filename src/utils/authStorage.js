// src/utils/authStorage.js
// Hardcoded student list for demo purposes

/**
 * Returns a hardcoded list of users (only students for now)
 */
// src/utils/authStorage.js

export function getUsers() {
  return [
    {
      role: 'student',
      userId: 'itc001',
      name: 'Alice Johnson',
      branch: 'IT',
      division: 'C',
      subjects: ['Maths', 'DSA', 'OS']
    },
    {
      role: 'student',
      userId: 'itc002',
      name: 'Bob Singh',
      branch: 'IT',
      division: 'C',
      subjects: ['Maths', 'DSA', 'DBMS']
    },
    {
      role: 'student',
      userId: 'itc003',
      name: 'Charlie Patel',
      branch: 'IT',
      division: 'C',
      subjects: ['CN', 'OS', 'DBMS']
    },
    {
      role: 'student',
      userId: 'itc004',
      name: 'Daisy Fernandes',
      branch: 'IT',
      division: 'C',
      subjects: ['Maths', 'CN', 'AI']
    },
    {
      role: 'student',
      userId: 'itc005',
      name: 'Ethan Verma',
      branch: 'IT',
      division: 'C',
      subjects: ['DSA', 'AI', 'DBMS']
    },
    {
      role: 'student',
      userId: 'eceA01',
      name: 'Fiona D’Souza',
      branch: 'ECE',
      division: 'A',
      subjects: ['VLSI', 'Signals', 'Control Systems']
    },
    {
      role: 'student',
      userId: 'eceA02',
      name: 'Gautam Bhosale',
      branch: 'ECE',
      division: 'A',
      subjects: ['Signals', 'Embedded', 'Networks']
    },
    {
      role: 'student',
      userId: 'eceA03',
      name: 'Harini Menon',
      branch: 'ECE',
      division: 'A',
      subjects: ['VLSI', 'Embedded', 'AI']
    },
    {
      role: 'student',
      userId: 'mechB01',
      name: 'Ishaan Kulkarni',
      branch: 'MECH',
      division: 'B',
      subjects: ['Thermo', 'Mechanics', 'CAD']
    },
    {
      role: 'student',
      userId: 'mechB02',
      name: 'Jaya Sen',
      branch: 'MECH',
      division: 'B',
      subjects: ['Mechanics', 'Design', 'Robotics']
    }
  ];
}


/**
 * (Optional stub functions if you need them later)
 */
export function saveUser(user) {
  console.warn('saveUser() is a no-op in hardcoded mode');
}

export function setCurrentUser(user) {
  console.warn('setCurrentUser() is a no-op in hardcoded mode');
}

export function getCurrentUser() {
  console.warn('getCurrentUser() returns null in hardcoded mode');
  return null;
}
