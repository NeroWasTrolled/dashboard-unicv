const Auth = {
  defaultUsers: [
    { email: 'gabriel.simoes@unicv.edu.br', password: 'Mudar@123', name: 'Gabriel França Dutra Simões' },
    { email: 'noelle.martins@unicv.edu.br', password: 'Mudar@123', name: 'Noelle Naira Izidoro Portes Martins' },
    { email: 'admin@unicv.edu.br', password: '123456', name: 'Administrador' }
  ],

  getUsers() {
    const data = localStorage.getItem('users');
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Erro ao carregar usuários, resetando...");
      }
    }
    // Resetar usuários caso não existam ou falhem
    localStorage.setItem('users', JSON.stringify(this.defaultUsers));
    return [...this.defaultUsers];
  },

  setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  },

  login(email, password, remember = false) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const authData = JSON.stringify({ email: user.email, name: user.name });

      if (remember) {
        localStorage.setItem('auth', authData);
      } else {
        sessionStorage.setItem('auth', authData);
      }

      return true;
    }

    return false;
  },

  logout() {
    sessionStorage.removeItem('auth');
    localStorage.removeItem('auth');
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  getUser() {
    let data = sessionStorage.getItem('auth');
    if (!data) {
      data = localStorage.getItem('auth');
      if (data) {
        sessionStorage.setItem('auth', data);
      }
    }
    return data ? JSON.parse(data) : null;
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
  }
};

window.Auth = Auth;

// Helper functions
function requireAuth() {
  if (!Auth.isLoggedIn()) {
    window.location.href = 'login.html';
  } else {
    const user = Auth.getUser();
    document.querySelectorAll('.user-name').forEach(el => {
      if (user && el) el.textContent = user.name;
    });

    const inputName = document.getElementById('input-name');
    if (user && inputName) inputName.value = user.name;

    const inputEmail = document.getElementById('input-email');
    if (user && inputEmail) inputEmail.value = user.email;
  }
}

function handleLogout() {
  Auth.logout();
  window.location.href = 'login.html';
}
