const Auth = {
  allowedUsers: [
    { email: 'admin@unicv.edu.br', password: '123456', name: 'Administrador' }
  ],
  login(email, password) {
    const user = this.allowedUsers.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('auth', JSON.stringify({ email: user.email, name: user.name }));
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem('auth');
  },
  isLoggedIn() {
    return !!localStorage.getItem('auth');
  },
  getUser() {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
  }
};

function requireAuth() {
  if (!Auth.isLoggedIn()) {
    window.location.href = 'login.html';
  } else {
    const user = Auth.getUser();
    document.querySelectorAll('.user-name').forEach(el => {
      if (user && el) el.textContent = user.name;
    });
    const inputName = document.getElementById('input-name');
    if (user && inputName) {
      inputName.value = user.name;
    }
  }
}

function handleLogout() {
  Auth.logout();
  window.location.href = 'login.html';
}
