// const express = require("express");
// const router = express.Router();

// router.post("/generate", (req, res) => {
//   const { career, hours } = req.body;

//   if (!career || !hours) {
//     return res.json({ roadmap: ["Please select career and enter hours"] });
//   }

//   let roadmap = [];

//   if (career === "Web Developer") {
//     roadmap = [
//       `Study HTML & CSS for ${hours} hrs`,
//       `Practice JavaScript`,
//       `Learn Node.js`,
//       `Build Full Stack Project`
//     ];
//   } 
//   else if (career === "Data Scientist") {
//     roadmap = [
//       `Learn Python for ${hours} hrs`,
//       `Study Pandas & Numpy`,
//       `Understand Machine Learning`,
//       `Build ML Project`
//     ];
//   } 
//   else {
//     roadmap = ["Invalid Career Selected"];
//   }

//   res.json({ roadmap });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

router.post("/generate", (req, res) => {
  const { subject, hours, level } = req.body;

  let topics = [];

  const plans = {
    DSA: {
      Easy: [
        "Basic Arrays",
        "Strings",
        "Linear Search",
        "Bubble Sort",
        "Stack Basics",
        "Queue Basics",
        "Simple Linked List"
      ],
      Medium: [
        "Recursion",
        "Binary Search",
        "Sorting Algorithms",
        "Linked List Problems",
        "Trees Basics",
        "Hashing",
        "Two Pointer Technique"
      ],
      Hard: [
        "Advanced Trees",
        "Graphs",
        "Dynamic Programming",
        "Greedy Algorithms",
        "Backtracking",
        "Trie",
        "Segment Tree"
      ]
    },

    "Web Development": {
      Easy: [
        "HTML Basics",
        "CSS Styling",
        "Flexbox",
        "JavaScript Basics",
        "DOM Manipulation",
        "Simple Form Validation",
        "Basic Project"
      ],
      Medium: [
        "Responsive Design",
        "ES6 Concepts",
        "APIs & Fetch",
        "Node.js Basics",
        "Express Routing",
        "MongoDB CRUD",
        "Authentication"
      ],
      Hard: [
        "JWT Authentication",
        "Advanced React Concepts",
        "Performance Optimization",
        "REST API Architecture",
        "Deployment",
        "Security Best Practices",
        "Scalable Project Architecture"
      ]
    },

    DBMS: {
      Easy: [
        "Database Basics",
        "ER Diagrams",
        "SQL Queries",
        "Primary & Foreign Keys",
        "Simple Joins",
        "Normalization Basics",
        "Constraints"
      ],
      Medium: [
        "Advanced Joins",
        "Indexing",
        "Transactions",
        "Triggers",
        "Stored Procedures",
        "Views",
        "Subqueries"
      ],
      Hard: [
        "Query Optimization",
        "Concurrency Control",
        "Deadlocks",
        "Distributed Databases",
        "NoSQL Concepts",
        "Database Security",
        "Data Warehousing"
      ]
    },

    "Operating System": {
      Easy: [
        "OS Introduction",
        "Process vs Thread",
        "CPU Scheduling Basics",
        "Memory Basics",
        "File Systems",
        "System Calls",
        "Basic Commands"
      ],
      Medium: [
        "Deadlocks",
        "Page Replacement",
        "Synchronization",
        "Virtual Memory",
        "Shell Programming",
        "IPC",
        "Multithreading"
      ],
      Hard: [
        "Advanced Scheduling",
        "Distributed Systems",
        "Kernel Architecture",
        "Concurrency Problems",
        "Real-Time OS",
        "Performance Tuning",
        "Advanced Memory Management"
      ]
    }
  };

  if (plans[subject] && plans[subject][level]) {
    topics = plans[subject][level];
  } else {
    topics = ["Subject not found"];
  }

  res.json({
    subject,
    hours,
    level,
    topics
  });
});

module.exports = router;
