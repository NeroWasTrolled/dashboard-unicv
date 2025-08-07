const Auth = {
  defaultUsers: [
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
      sessionStorage.setItem('auth', authData);
      if (remember) {
        localStorage.setItem('auth', authData);
      } else {
        localStorage.removeItem('auth');
      }
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
  }
};

window.Auth = Auth;

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
