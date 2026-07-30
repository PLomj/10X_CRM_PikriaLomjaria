//--------------------Protects Clients page to open without log in----------
const session = requireAuth();

//--------------Handles theme changing-------------
initTheme();

document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);


//---------------In the Header Active page------
highlightActiveNavLink();




 


//-------------------Log Out--------
document.getElementById('logoutBtn').addEventListener('click', logout);