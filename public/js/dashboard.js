// ================= STUDY DATA =================
let studyData = JSON.parse(localStorage.getItem("studyData")) || [0,0,0,0,0,0,0];

// Get today's index (0 = Sunday, 1 = Monday...)
function getTodayIndex() {
  let day = new Date().getDay();
  return day === 0 ? 6 : day - 1; // Make Monday first
}

// ================= CREATE CHART =================
let chart;

function createChart() {
  const ctx = document.getElementById("progressChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Study Hours",
        data: studyData,
        backgroundColor: "rgba(0,198,255,0.7)"
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// ================= UPDATE CHART =================
function updateChart() {
  chart.data.datasets[0].data = studyData;
  chart.update();
  localStorage.setItem("studyData", JSON.stringify(studyData));
}

// ================= TIMER =================
let time = 1500; // 25 minutes
let interval;

function startTimer() {
  if (interval) return; // prevent multiple timers

  interval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    document.getElementById("timer").innerText =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    time--;

    if (time < 0) {
      clearInterval(interval);
      interval = null;

      alert("Study Session Completed! 🎉");


//       alert("Session Completed!");

// completedHours += 1;  // add 1 hour after session
// updateGoalDisplay();

      // Add 0.5 hours to today
      let today = getTodayIndex();
      studyData[today] += 0.5;

      updateChart();
      resetTimer();
    }

  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 1500;
  document.getElementById("timer").innerText = "25:00";
}

// ================= GOALS =================
function addGoal() {
  const goalInput = document.getElementById("goalInput");
  const goalList = document.getElementById("goalList");

  if (goalInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.innerText = goalInput.value;
    goalList.appendChild(li);
    goalInput.value = "";
  }
}



// let weeklyGoal = 0;
// let completedHours = 0;

// function setGoal() {
//   const goalInput = document.getElementById("goalInput");
//   weeklyGoal = parseInt(goalInput.value);

//   if (!weeklyGoal) {
//     alert("Please enter goal hours");
//     return;
//   }

//   updateGoalDisplay();
// }

// function updateGoalDisplay() {
//   const remaining = weeklyGoal - completedHours;
//   const percentage = ((completedHours / weeklyGoal) * 100).toFixed(1);

//   document.getElementById("goalDisplay").innerHTML = `
//     <b>Weekly Goal:</b> ${weeklyGoal} hours <br>
//     <b>Completed:</b> ${completedHours} hours <br>
//     <b>Remaining:</b> ${remaining > 0 ? remaining : 0} hours <br>
//     <b>Progress:</b> ${percentage > 100 ? 100 : percentage}% 
//   `;
// }

// ================= WEEKLY PLAN =================
function savePlan() {
  const plan = document.getElementById("weeklyPlan").value;
  localStorage.setItem("weeklyPlan", plan);
  alert("Plan Saved!");
}

window.onload = function () {
  document.getElementById("weeklyPlan").value =
    localStorage.getItem("weeklyPlan") || "";
  createChart();
};
const userId = localStorage.getItem("userId");

async function savePlan() {
  const content = document.getElementById("weeklyPlan").value;

  const response = await fetch("/api/weeklyPlan/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, content })
  });

  const data = await response.json();
  alert(data.message);
}

async function loadPlan() {
  const response = await fetch(`/api/weeklyPlan/${userId}`);
  const data = await response.json();

  if (data.content) {
    document.getElementById("weeklyPlan").value = data.content;
  }
}

window.onload = function () {
  loadPlan();
  createChart();
};

// ================= LOGOUT =================
function logout() {
  window.location.href = "index.html";
}
function generatePlan() {

  const subjectInput = document.getElementById("subject");
  const hoursInput = document.getElementById("hours");

  if (!subjectInput || !hoursInput) {
    alert("Input fields not found in HTML");
    return;
  }

  const subject = subjectInput.value;
  const hours = hoursInput.value;

  if (!subject || !hours) {
    alert("Please enter subject and hours");
    return;
  }

  document.getElementById("planOutput").innerHTML =
    `<p><b>Study Plan for ${subject}</b><br>
     Study ${hours} hours daily<br>
     Revise important topics<br>
     Practice problems daily</p>`;
}




function generateSubjectPlan() {
  const subject = document.getElementById("subject").value;
  const hours = document.getElementById("hours").value;
  const level = document.getElementById("level").value;

  if (!hours) {
    alert("Please enter study hours");
    return;
  }

  let topics = [];

  if (subject === "DSA") {
    topics = [
      "Arrays & Strings",
      "Linked List",
      "Stack & Queue",
      "Recursion",
      "Sorting & Searching",
      "Trees",
      "Graphs"
    ];
  }

  if (subject === "DBMS") {
    topics = [
      "ER Model",
      "Relational Model",
      "SQL Queries",
      "Normalization",
      "Transactions",
      "Indexing",
      "NoSQL Basics"
    ];
  }

  if (subject === "OS") {
    topics = [
      "Process Management",
      "CPU Scheduling",
      "Deadlocks",
      "Memory Management",
      "Paging & Segmentation",
      "File System",
      "Virtual Memory"
    ];
  }

  if (subject === "CN") {
    topics = [
      "OSI Model",
      "TCP/IP",
      "Subnetting",
      "Routing Protocols",
      "Congestion Control",
      "DNS & HTTP",
      "Network Security"
    ];
  }

  if (subject === "Web") {
    topics = [
      "HTML & CSS",
      "JavaScript",
      "DOM & Events",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Project Building"
    ];
  }

  let plan = `Subject: ${subject}\nLevel: ${level}\nHours per day: ${hours}\n\n`;

  topics.forEach((topic, index) => {
    plan += `Day ${index + 1}: ${topic} (${hours} hrs)\n`;
  });

  document.getElementById("weeklyPlan").value = plan;
}




// document.addEventListener("DOMContentLoaded", () => {

//   document.getElementById("generateBtn").addEventListener("click", generatePlan);

// });


document.addEventListener("DOMContentLoaded", function () {

  const generateBtn = document.getElementById("generateBtn");

  if (generateBtn) {
    generateBtn.addEventListener("click", generateSubjectPlan);
  }

});

// async function generatePlan() {

//   const subjectElement = document.getElementById("subject");
//   const levelElement = document.getElementById("level");
//   const hoursElement = document.getElementById("hours");

//   if (!subjectElement || !levelElement || !hoursElement) {
//     alert("Some input fields are missing!");
//     return;
//   }

//   const subject = subjectElement.value;
//   const level = levelElement.value;
//   const hours = hoursElement.value;

//   if (!hours) {
//     alert("Please enter study hours");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:5000/api/ai/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         subject,
//         level,
//         hours
//       })
//     });

//     const data = await response.json();

//     let output = `
//       <h3>📘 ${data.subject} (${data.level})</h3>
//       <p>⏳ Study Hours: ${data.hours}</p>
//       <ul>
//     `;

//     data.topics.forEach(topic => {
//       output += `<li>${topic}</li>`;
//     });

//     output += "</ul>";

//     document.getElementById("planOutput").innerHTML = output;

//   } catch (error) {
//     console.error(error);
//     alert("Error generating plan");
//   }
// }



// function generateSubjectPlan() {

//   const subjectInput = document.getElementById("subject");
//   const levelInput = document.getElementById("level");
//   const hoursInput = document.getElementById("hours");
//   const output = document.getElementById("planOutput");

//   if (!subjectInput || !levelInput || !hoursInput) {
//     console.log("Input elements not found");
//     return;
//   }

//   const subject = subjectInput.value;
//   const level = levelInput.value;
//   const hours = hoursInput.value;

//   fetch("http://localhost:5000/api/ai/generate", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ subject, level, hours })
//   })
//   .then(res => res.json())
//   .then(data => {
//     output.innerHTML = `<p>${data.plan}</p>`;
//   })
//   .catch(err => {
//     console.log(err);
//     output.innerHTML = "Error generating plan";
//   });
// }
