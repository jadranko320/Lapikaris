/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const signup = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users/signup',
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Rejestracja przebiegła pomyślnie');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err.message);
    showAlert(
      'error',
      'Nie udało Ci się zarejestrować - Hasła są różne lub użytkownik o takim adresie email już istnieje'
    );
  }
};

export const login = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users/login',
      data
    });

    console.log(res.data);

    if (res.data.status === 'success') {
      showAlert('success', 'Logowanie przebiegło pomyślnie');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Nie udało Ci się zalogować - Hasło lub email się nie zgadzają'
    );
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/users/logout'
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Pomyślnie się wylogowałeś');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Nie udało Ci się wylogować');
  }
};
