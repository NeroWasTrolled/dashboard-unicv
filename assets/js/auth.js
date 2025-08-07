const Auth = {
  defaultUsers: [
 um51cw-codex/add-authentication-and-logout-functionality
    { email: 'gabriel.simoes@unicv.edu.br', password: 'Mudar@123', name: 'Gabriel França Dutra Simões' },
    { email: 'noelle.martins@unicv.edu.br', password: 'Mudar@123', name: 'Noelle Naira Izidoro Portes Martins' }
  ],
  getUsers() {
    const data = localStorage.getItem('users');
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        // fall through to reset on parse error
      }
    }

 rgc3yt-codex/add-authentication-and-logout-functionality
    { email: 'gabriel.simoes@unicv.edu.br', password: 'Mudar@123', name: 'Gabriel França Dutra Simões' },
    { email: 'noelle.martins@unicv.edu.br', password: 'Mudar@123', name: 'Noelle Naira Izidoro Portes Martins' }
    { email: 'admin@unicv.edu.br', password: '123456', name: 'Administrador' },
    { email: 'noelle.martins@unicv.edu.br', password: 'Mudar@123', name: 'Noelle Martins' }
 main
  ],
  getUsers() {
    const data = localStorage.getItem('users');
    if (data) return JSON.parse(data);
 main
    localStorage.setItem('users', JSON.stringify(this.defaultUsers));
    return [...this.defaultUsers];
  },
  setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  },
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('auth', JSON.stringify({ email: user.email, name: user.name }));
      return true;
    }
    return false;
  },
  changePassword(oldPassword, newPassword) {
    const auth = this.getUser();
    if (!auth) return false;
    const users = this.getUsers();
    const user = users.find(u => u.email === auth.email);
    if (user && user.password === oldPassword) {
      user.password = newPassword;
      this.setUsers(users);
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

 um51cw-codex/add-authentication-and-logout-functionality
window.Auth = Auth;


 main
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
    const inputEmail = document.getElementById('input-email');
    if (user && inputEmail) {
      inputEmail.value = user.email;
    }
  }
}

function handleLogout() {
  Auth.logout();
  window.location.href = 'login.html';
}
