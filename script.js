// Sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hide");
  document.querySelector(".main").classList.toggle("full");
}

// Sections
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Profile dropdown
function toggleProfile() {
  document.getElementById("profileMenu").classList.toggle("show");
}

// Notification dropdown
function toggleNotification() {
  document.getElementById("notificationMenu").classList.toggle("show");
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Close dropdown when clicking outside
window.onclick = function(e) {
  if (!e.target.closest(".profile")) {
    document.getElementById("profileMenu").classList.remove("show");
  }
  if (!e.target.closest(".notification")) {
    document.getElementById("notificationMenu").classList.remove("show");
  }
}

// Chart
let data = [], labels = [], requests = 0, notifications = 0;

const ctx = document.getElementById("chart").getContext("2d");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Traffic",
      data: data,
      borderColor: "#38bdf8",
      tension: 0.4
    }]
  }
});

function update() {
  let val = Math.floor(Math.random() * 100);
  requests++;

  document.getElementById("traffic").innerText = val + " Mbps";
  document.getElementById("requests").innerText = requests;

  if (val > 70) {
    document.getElementById("alert").innerText = "⚠ High Traffic";

    // Add notification
    notifications++;
    document.getElementById("badge").innerText = notifications;

    let item = document.createElement("li");
    item.innerText = "High traffic detected at " + new Date().toLocaleTimeString();
    document.getElementById("notificationList").appendChild(item);

    // Add log
    let log = document.createElement("li");
    log.innerText = "Threat detected at " + new Date().toLocaleTimeString();
    document.getElementById("logs").appendChild(log);

  } else {
    document.getElementById("alert").innerText = "Normal";
  }

  if (data.length > 10) {
    data.shift();
    labels.shift();
  }

  data.push(val);
  labels.push(new Date().toLocaleTimeString());

  chart.update();
}

setInterval(update, 2000);
