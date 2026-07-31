//--------------------Protects Clients page to open without log in----------
const session = requireAuth();

//--------------Handles theme changing-------------
initTheme();

document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);


//---------------In the Header Active page------
highlightActiveNavLink();


// --- Load logged-in user into profile header ---
document.addEventListener("DOMContentLoaded", () => {
  const user = requireAuth(); // already redirects to index.html if nobody's logged in
  if (!user) return;

  document.getElementById("userName").textContent =
    user.fullName  || user.name;

  document.getElementById("userMail").textContent = user.email || "";

  const memberSinceEl = document.getElementById("memberSince");
  const joined = user.createdAt || user.joinDate;
  if (memberSinceEl && joined) {
    memberSinceEl.textContent =
      "Member since " + new Date(joined).toLocaleDateString();
  }
  });

  //------------Change Name, Update crm_users, ----------------

 document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const fullName = form.elements["fullName"].value.trim();
  const company = form.elements["company"].value.trim();

  let isValid = true;

  if (fullName.length < 3) {
    setError("fullName", "Full name must be at least 3 characters");
    isValid = false;
  } else {
    setValid("fullName");
  }

  setValid("company");                                                     // optional field, always valid

  if (!isValid) {
    showToast("Please fix the errors above", "error");
    return;
  }

  // --- Find and update this user in crm_users ---
  const session = getSession();
  const users = loadUsers();
  const index = users.findIndex((u) => u.id === session.id);

  if (index === -1) {
    showToast("Could not find your account", "error");
    return;
  }

  users[index].fullName = fullName;
  users[index].company = company;
  saveUsers(users);

  // --- Refresh the session so it matches the updated record ---
  setSession(users[index]);

  // --- Reflect the change immediately on this page ---
  document.getElementById("userName").textContent = users[index].fullName;

  showToast("Profile updated ✓", "success");
});


//-------------------Log Out--------
document.getElementById('logoutBtn').addEventListener('click', logout);