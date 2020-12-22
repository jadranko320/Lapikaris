/* eslint-disable */

const fetch = require('node-fetch');
import { showAlert } from './alert';

export const signup = async obj => {
  fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (data.status === 'success') {
        showAlert('success', 'Rejestracja przebiegła pomyślnie');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } else
        showAlert(
          'error',
          'Nie udało Ci się zarejestrować - Hasła są różne lub użytkownik o takim adresie email już istnieje'
        );
    })
    .catch(error => console.log(error));
};

export const login = async obj => {
  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (data.status === 'success') {
        showAlert('success', 'Logowanie przebiegło pomyślnie');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } else showAlert('error', 'Nie udało Ci się zalogować');
    })
    .catch(error => console.log(error));
};

export const changePhoto = async obj => {
  fetch('/api/users/updateMe', {
    method: 'PATCH',
    body: obj
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono zdjęcie profilowe');
      else showAlert('error', 'Nie udało się zmienić zdjęcia profilowego');
    })
    .catch(error => console.log(error));
};

export const forgotPassword = async obj => {
  fetch('/api/users/forgotPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (data.status === 'success') {
        showAlert('success', 'Sprawdź skrzynkę email');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } else showAlert('error', 'Nie udało się wysłać wiadomości');
    })
    .catch(error => console.log(error));
};

export const resetPassword = async (obj, token) => {
  fetch(`/api/users/resetPassword/${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (data.status === 'success') {
        showAlert('success', 'Pomyślnie zresetowano hasło');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } else
        showAlert(
          'error',
          'Nie udało się zresetować hasła. Sprawdź, czy hasła są identyczne!'
        );
    })
    .catch(error => console.log(error));
};

export const changeMyAddress = async obj => {
  fetch('/api/users/updateMe', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono adres');
      else showAlert('error', 'Nie udało się zmienić adresu');
    })
    .catch(error => console.log(error));
};

export const changeAddress = async (obj, id) => {
  fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono adres');
      else showAlert('error', 'Nie udało się zmienić adresu');
    })
    .catch(error => console.log(error));
};

export const changePassword = async obj => {
  fetch('/api/users/updateMyPassword', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono hasło');
      else showAlert('error', 'Nie udało się zmienić hasła');
    })
    .catch(error => console.log(error));
};

export const changeEmail = async obj => {
  fetch('/api/users/updateMe', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono adres email');
      else showAlert('error', 'Nie udało się zmienić adresu email');
    })
    .catch(error => console.log(error));
};

export const changePhone = async obj => {
  fetch('/api/users/updateMe', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono dane');
      else showAlert('error', 'Nie udało się wprowadzić zmian');
    })
    .catch(error => console.log(error));
};

export const changeNumber = async (obj, id) => {
  fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono dane');
      else showAlert('error', 'Nie udało się wprowadzić zmian');
    })
    .catch(error => console.log(error));
};

export const deleteMe = async () => {
  fetch(`/api/users/deleteMe`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie usunięto konto');
      else showAlert('error', 'Nie udało się usunąć konta');
    })
    .catch(error => console.log(error));
};

export const deleteUser = async id => {
  fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie usunięto konto');
      else showAlert('error', 'Nie udało się usunąć konta');
    })
    .catch(error => console.log(error));
};

export const changeStatus = async id => {
  fetch(`/api/users/changeStatus/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono status konta');
      else showAlert('error', 'Nie udało się zmienić statusu konta');
    })
    .catch(error => console.log(error));
};

export const changeRole = async id => {
  fetch(`/api/users/changeRole/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zmieniono rolę użytkownika');
      else showAlert('error', 'Nie udało się zmienić roli użytkownika');
    })
    .catch(error => console.log(error));
};
