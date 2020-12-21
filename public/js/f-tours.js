/* eslint-disable */

const fetch = require('node-fetch');
import { showAlert } from './alert';

export const addTour = async obj => {
  fetch('/api/tours', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(res => {
    return res.json()
  })
  .then(data => {
    if (data.status === 'success') {
      showAlert('success', 'Pamiętaj o dodaniu zdjęć w sekcji edycji wycieczki!')
      window.setTimeout(() => {
        location.assign('/tours');
      }, 2000);
    }
    else {
      const e = data.error.errors[Object.keys(data.error.errors)[0]].message;
      showAlert('error', `Nie udało się dodać wycieczki - ${e}`);
    }
  })
  .catch(error => console.log(error));
}

export const editTour = async (obj, id) => {
  fetch(`/api/tours/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(res => {
    return res.json()
  })
  .then(data => {
    if (data.status === 'success') {
      showAlert('success', 'Pomyślnie edytowano wycieczkę');
      window.setTimeout(() => {
        location.assign('/tours');
      }, 1500);
    }
    else
      showAlert('error', 'Nie udało się edytować wycieczki');
  })
  .catch(error => console.log(error));
}

export const editTourPhotos = async (obj, id) => {
  fetch(`/api/tours/${id}`, {
    method: 'PATCH',
    body: obj
  }).then(res => {
    return res.json()
  })
  .then(data => {
    if (data.status === 'success') {
      showAlert('success', 'Pomyślnie edytowano wycieczkę');
      window.setTimeout(() => {
        location.assign('/tours');
      }, 1500);
    }
    else
      showAlert('error', 'Nie udało się edytować wycieczki');
  })
  .catch(error => console.log(error));
}

export const deleteTour = async id => {
  fetch(`/api/tours/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
  .then(data => {
    if (data.status === 'success')
      showAlert('success', 'Pomyślnie usunięto wycieczkę');
    else
      showAlert('error', 'Nie udało się usunąć wycieczki');
  })
  .catch(error => console.log(error));
}
