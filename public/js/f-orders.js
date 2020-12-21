/* eslint-disable */

const fetch = require('node-fetch');
import { showAlert } from './alert';
// const stripe = Stripe('pk_test_51HlyQvGkugAs5EX35Teloi36MGc7ematvNyZ4azQ2pz3mNbJbtisFZNUmLF2GcC64xiCvizsVanDzFM2IEeV9PkW00sUhpaDEV');

export const deleteOrder = async id => {
    fetch(`/api/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie usunięto zamówienie');
      else
        showAlert('error', 'Nie udało się usunąć zamówienia');
    })
    .catch(error => console.log(error));
  }

export const createOrder = async obj => {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(res => {
      return res.json()
    })
    .then(data => {
      if (data.status === 'success')
        showAlert('success', 'Pomyślnie zakupiłeś wycieczkę');
      else
        showAlert('error', 'Nie udało się dokonać zakupu');
    })
    .catch(error => console.log(error));
  }