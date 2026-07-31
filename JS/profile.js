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

 


//-------------------Log Out--------
document.getElementById('logoutBtn').addEventListener('click', logout);