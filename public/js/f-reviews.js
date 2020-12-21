/* eslint-disable */

const fetch = require('node-fetch');
import { showAlert } from './alert';

export const addReview = async obj => {
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data);
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie dodano recenzję');
      else
        showAlert('error', 'Wystąpił błąd lub już dodałeś recenzję do tej wycieczki!');
    })
    .catch(error => console.log(error));
  }