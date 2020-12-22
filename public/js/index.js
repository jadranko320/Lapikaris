/* eslint-disable */

import '@babel/polyfill';
import { logout } from './a-auth';
import { addTour, editTour, deleteTour, editTourPhotos } from './f-tours';
import { addReview } from './f-reviews';
import { payForTour } from './stripe';
import { deleteOrder, createOrder } from './f-orders';
import {
  resetPassword,
  forgotPassword,
  changeAddress,
  changeMyAddress,
  changePassword,
  changeEmail,
  changePhone,
  deleteMe,
  changeNumber,
  deleteUser,
  changeStatus,
  changeRole,
  changePhoto,
  signup,
  login
} from './f-users';

const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');
const logOutBtn = document.getElementById('logout');
const logOutBtnTwo = document.getElementById('logout-two');
const searchOverview = document.getElementById('searchOverview');
const page = document.querySelector('.page');
const selectTagUsers = document.querySelector('.select-tag-users');
const selectTagTours = document.querySelector('.select-tag-tours');
const addTourForm = document.querySelector('.add-tour-form');
const editTourForm = document.querySelector('.editt-tour-form');
const changeAddressProfForm = document.querySelector('.address-form-prof');
const delTourBtn = document.querySelector('.edit-tour-buttons__img');
const changePaddwordForm = document.querySelector('.change-password-form');
const changeEmailForm = document.querySelector('.change-email-form');
const addReviewForm = document.querySelector('.review-form');
const deleteUserAccount = document.querySelector('.del-user-account');
const deleteMyAccount = document.getElementById('delMyAcc');
const closeReview = document.getElementById('closeReview');
const idArrDelOrder = document.getElementById('idArrDelOrder');
const idArrDelOrderInOrders = document.getElementById('idArrDelOrderInOrders');
const accountStatus = document.querySelector('.account-status');
const accountRole = document.querySelector('.account-role');
const searchUsers = document.querySelector('.search-users');
const searchTours = document.querySelector('.search-tours');
const changeNameForm = document.querySelector('.change-name-form');
const changeProfilePic = document.querySelector('.change-profile-pic-form');
const forgotPasswordForm = document.querySelector('.forgot-password-form');
const resetPasswordForm = document.querySelector('.reset-password-form');
const acceptPhone = document.getElementById('acceptPhone');
const payTour = document.getElementById('make-pay-tour');
const changeUserNumber = document.getElementById('changeUserNumber');
const changeUserAddress = document.getElementById('changeUserAddress');

// -------------- USER -------------- \\

const getId = () => {
  const pathname = window.location.pathname;
  return pathname.substring(pathname.lastIndexOf('/') + 1);
};

const reload = route => {
  window.setTimeout(() => {
    location.assign(route);
  }, 1500);
};

if (accountStatus)
  accountStatus.addEventListener('click', () => {
    const id = getId();
    changeStatus(id);
    window.setTimeout(() => {
      location.reload();
    }, 1500);
  });

if (accountRole)
  if (accountRole.checked === true)
    accountRole.addEventListener('click', () => {
      const id = getId();
      changeRole(id);
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    });
  else
    accountRole.addEventListener('click', () => {
      const id = getId();
      changeRole(id);
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    });

if (changeUserNumber)
  changeUserNumber.addEventListener('click', e => {
    e.preventDefault();
    const data = {};
    data.phone = document.getElementById('phoneNumberChangeNumber').value;
    const id = getId();

    changeNumber(data, id);
    reload(`/user/${id}`);
  });

if (changeUserAddress)
  changeUserAddress.addEventListener('click', e => {
    e.preventDefault();
    console.log('siema');
    const data = {};
    const address = document.getElementById('addressChangeAddress').value;
    if (address !== '') data.address = address;
    const city = document.getElementById('cityChangeAddress').value;
    if (city !== '') data.city = city;
    const code = document.getElementById('codeChangeAddress').value;
    if (code !== '') data.code = code;

    const id = getId();

    changeAddress(data, id);
    reload(`/user/${id}`);
  });

if (payTour)
  payTour.addEventListener('click', e => {
    e.preventDefault();
    const data = {};
    data.adults = document.getElementById('numberOfAdult').value;
    data.children = document.getElementById('numberOfChildren').value;
    data.tour = document.getElementById('tourIdk').textContent;

    const people = data.adults * 1 + data.children * 1;
    const { tourId } = e.target.dataset;

    createOrder(data);
    payForTour(tourId, people);
  });

if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.password = document.getElementById('passwordResetPassword').value;
    data.passwordConfirm = document.getElementById(
      'passwordConfirmResetPassword'
    ).value;

    const token = getId();

    resetPassword(data, token);
  });

if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.email = document.getElementById('emailForgotPassword').value;

    forgotPassword(data);
  });

if (idArrDelOrderInOrders) {
  const idStr = idArrDelOrderInOrders.textContent;
  const idArr = idStr.split(',');

  const arrDOM = [];

  for (let i = 0; i < idArr.length; i++) {
    arrDOM[i] = document.getElementById(`${idArr[i]}`);
    arrDOM[i].addEventListener('click', () => {
      if (confirm('Czy jesteś pewien, że chcesz usunąć to zamówienie?')) {
        const id = idArr[i];
        deleteOrder(id);
        reload('/orders');
      }
    });
  }
}

if (acceptPhone)
  acceptPhone.addEventListener('click', e => {
    e.preventDefault();
    const data = {};
    data.phone = document.getElementById('phoneNumberChangePhone').value;

    changePhone(data);
    reload('/my-account');
  });

if (changeAddressProfForm)
  changeAddressProfForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    const address = document.getElementById('addressChangeAddressProf').value;
    if (address !== '') data.address = address;
    const city = document.getElementById('cityChangeAddressProf').value;
    if (city !== '') data.city = city;
    const code = document.getElementById('codeChangeAddressProf').value;
    if (code !== '') data.code = code;

    changeMyAddress(data);
    reload('/my-account');
  });

if (changeProfilePic)
  changeProfilePic.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('photo', document.getElementById('photoPic').files[0]);

    changePhoto(form);
    reload('/my-account');
  });

if (changeNameForm)
  changeNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.name = document.getElementById('nameChangeName').value;

    changePhone(data);
    reload('/my-account');
  });

if (searchTours)
  searchTours.addEventListener('submit', e => {
    e.preventDefault();
    const queryString = window.location.search;
    const usp = new URLSearchParams(queryString);
    const tour = document.getElementById('searching').value;
    usp.set('country', tour);
    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

if (searchUsers)
  searchUsers.addEventListener('submit', e => {
    e.preventDefault();
    const queryString = window.location.search;
    const usp = new URLSearchParams(queryString);
    const email = document.getElementById('searching').value;
    usp.set('email', email);
    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

if (deleteUserAccount)
  deleteUserAccount.addEventListener('click', () => {
    const id = getId();
    if (confirm('Czy jesteś pewien, że chcesz usunąć tego użytkownika?')) {
      deleteUser(id);
      reload('/users');
    }
  });

if (idArrDelOrder) {
  const idStr = idArrDelOrder.textContent;
  const idArr = idStr.split(',');

  const arrDOM = [];

  for (let i = 0; i < idArr.length; i++) {
    arrDOM[i] = document.getElementById(`${idArr[i]}`);
    arrDOM[i].addEventListener('click', () => {
      if (
        confirm(
          'Czy jesteś pewien, że chcesz usunąć tą wycieczkę z zakupionych?'
        )
      ) {
        const id = idArr[i];
        deleteOrder(id);
        reload('/');
      }
    });
  }
}

if (closeReview)
  closeReview.addEventListener('click', () => {
    location.assign('/my-account');
  });

if (addReviewForm)
  addReviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.review = document.getElementById('reviewContent').value;
    const id = getId();
    data.tour = id;

    addReview(data);
    reload('/my-account');
  });

if (deleteMyAccount)
  deleteMyAccount.addEventListener('click', () => {
    if (confirm('Czy jesteś pewien, że chcesz usunąć swoje konto?')) {
      deleteMe();
      logout();
      reload('/');
    }
  });

if (changeEmailForm)
  changeEmailForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.email = document.getElementById('emailChangeEmail').value;

    changeEmail(data);
    logout();
    reload('/');
  });

if (changeEmailForm)
  changeEmailForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.email = document.getElementById('emailChangeEmail').value;

    changeEmail(data);
    logout(); // ?
    reload('/');
  });

if (changePaddwordForm)
  changePaddwordForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.passwordCurrent = document.getElementById(
      'passwordChangePassword'
    ).value;
    data.password = document.getElementById('newPasswordChangePassword').value;
    data.passwordConfirm = document.getElementById(
      'passwordConfirmChangePassword'
    ).value;

    changePassword(data);
    logout();
    reload('/');
  });

// -------------- TOURS -------------- \\

if (addTourForm)
  addTourForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.country = document.getElementById('country').value;
    data.english = document.getElementById('english').value;
    data.city = document.getElementById('city').value;
    data.startDate = document.getElementById('startDate').value;
    data.flight = document.getElementById('flight').value;
    data.price = document.getElementById('price').value;
    data.duration = document.getElementById('duration').value;
    data.limit = document.getElementById('limit').value;

    const categoryTag = document.getElementById('category');
    if (categoryTag.selectedIndex === 1) data.category = 'summer';
    if (categoryTag.selectedIndex === 2) data.category = 'winter';
    if (categoryTag.selectedIndex === 3) data.category = 'tour';
    if (categoryTag.selectedIndex === 4) data.category = 'exotic';

    const selectTagFeeding = document.getElementById('feeding');
    if (selectTagFeeding.selectedIndex === 1) data.feeding = '2 posiłki';
    if (selectTagFeeding.selectedIndex === 2) data.feeding = '3 posiłki';
    if (selectTagFeeding.selectedIndex === 3) data.feeding = 'All Inclusive';

    const attraction1 = document.getElementById('attraction-1-text').value;
    const attraction2 = document.getElementById('attraction-2-text').value;
    const attraction3 = document.getElementById('attraction-3-text').value;
    const attraction4 = document.getElementById('attraction-4-text').value;
    data.descriptionText = [attraction1, attraction2, attraction3, attraction4];

    addTour(data);
  });

if (editTourForm)
  editTourForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    const country = document.getElementById('country').value;
    if (country !== '') data.country = country;
    const english = document.getElementById('english').value;
    if (english !== '') data.english = english;
    const city = document.getElementById('city').value;
    if (city !== '') data.city = city;
    const startDate = document.getElementById('startDate').value;
    if (startDate !== '') data.startDate = startDate;
    const flight = document.getElementById('flight').value;
    if (flight !== '') data.flight = flight;
    const price = document.getElementById('price').value;
    if (price !== '') data.price = price;
    const duration = document.getElementById('duration').value;
    if (duration !== '') data.duration = duration;
    const limit = document.getElementById('limit').value;
    if (limit !== '') data.limit = limit;

    const categoryTag = document.getElementById('category');
    if (categoryTag.selectedIndex === 1) data.category = 'summer';
    if (categoryTag.selectedIndex === 2) data.category = 'winter';
    if (categoryTag.selectedIndex === 3) data.category = 'tour';
    if (categoryTag.selectedIndex === 4) data.category = 'exotic';

    const selectTagFeeding = document.getElementById('feeding');
    if (selectTagFeeding.selectedIndex === 1) data.feeding = '2 posiłki';
    if (selectTagFeeding.selectedIndex === 2) data.feeding = '3 posiłki';
    if (selectTagFeeding.selectedIndex === 3) data.feeding = 'All Inclusive';

    const attraction1 = document.getElementById('attraction-1-text').value;
    const attraction2 = document.getElementById('attraction-2-text').value;
    const attraction3 = document.getElementById('attraction-3-text').value;
    const attraction4 = document.getElementById('attraction-4-text').value;
    data.descriptionText = [attraction1, attraction2, attraction3, attraction4];

    const form = new FormData();
    for (let i = 0; i < 100; i++)
      if (document.getElementById('addGalleryField').files[i])
        form.append(
          'gallery',
          document.getElementById('addGalleryField').files[i]
        );

    const id = getId();

    editTourPhotos(form, id);
    editTour(data, id);
  });

if (delTourBtn)
  delTourBtn.addEventListener('click', () => {
    if (confirm('Czy jesteś pewien, że chcesz usunąć tą wycieczkę?')) {
      const id = getId();

      deleteTour(id);

      window.setTimeout(() => {
        location.assign('/tours');
      }, 1500);
    }
  });

// -------------- SEARCHING OPTIONS -------------- \\

if (searchOverview)
  searchOverview.addEventListener('submit', e => {
    e.preventDefault();
    let minPriceRange = document.getElementById('minPriceRange');
    let maxPriceRange = document.getElementById('maxPriceRange');

    console.log(`min: ${minPriceRange.value} / max: ${maxPriceRange.value}`);
    const queryString = window.location.search;
    const usp = new URLSearchParams(queryString);
    usp.set('price[gte]', minPriceRange.value);
    usp.set('price[lte]', maxPriceRange.value);

    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

// -------------- PAGINATION -------------- \\

if (page) {
  const next = document.getElementById('next');
  const previous = document.getElementById('previous');
  const sumObjects = document.getElementById('sumObjects').textContent * 1;
  const queryString = window.location.search;
  const usp = new URLSearchParams(queryString);
  let pageNum = usp.get('page') || 1;
  let limitNum = usp.get('limit') || 100;
  let maxRes = Math.ceil(sumObjects / limitNum);

  next.addEventListener('click', () => {
    if (pageNum < maxRes) pageNum++;
    usp.set('page', `${pageNum}`);
    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

  previous.addEventListener('click', () => {
    pageNum--;
    if (pageNum === 0) pageNum = 1;
    usp.set('page', `${pageNum}`);
    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });
}

// -------------- SELECT TAGS - SORTING -------------- \\

if (selectTagUsers)
  selectTagUsers.addEventListener('change', () => {
    const queryString = window.location.search;
    const usp = new URLSearchParams(queryString);

    if (selectTagUsers.selectedIndex === 1) usp.set('sort', 'name');
    if (selectTagUsers.selectedIndex === 2) usp.set('sort', '-name');
    if (selectTagUsers.selectedIndex === 3) usp.set('sort', '-createdAt');
    if (selectTagUsers.selectedIndex === 4) usp.set('sort', 'createdAt');

    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

if (selectTagTours)
  selectTagTours.addEventListener('change', () => {
    const queryString = window.location.search;
    const usp = new URLSearchParams(queryString);

    if (selectTagTours.selectedIndex === 1) usp.set('sort', 'country');
    if (selectTagTours.selectedIndex === 2) usp.set('sort', '-country');
    if (selectTagTours.selectedIndex === 3) usp.set('sort', '-createdAt');
    if (selectTagTours.selectedIndex === 4) usp.set('sort', 'createdAt');

    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

// -------------- AXIOS -------------- \\
// -------------- AUTH -------------- \\

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.email = document.getElementById('emailSignup').value;
    data.password = document.getElementById('passwordSignup').value;
    data.passwordConfirm = document.getElementById(
      'passwordConfirmSignup'
    ).value;
    signup(data);
  });

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.email = document.getElementById('emailLogin').value;
    data.password = document.getElementById('passwordLogin').value;
    login(data);
  });

if (logOutBtn)
  logOutBtn.addEventListener('click', e => {
    logout();
  });

if (logOutBtnTwo)
  logOutBtnTwo.addEventListener('click', e => {
    logout();
  });

// -------------- DARK MODE -------------- \\

let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const darkModeTogglePhone = document.querySelector('#dark-mode-toggle-phone');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', 'disabled');
};

if (darkMode === 'enabled') {
  enableDarkMode();
}

const content = () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') enableDarkMode();
  else disableDarkMode();
  location.reload();
};

darkModeToggle.addEventListener('click', () => {
  content();
});

darkModeTogglePhone.addEventListener('click', () => {
  content();
});

// -------------- NAV PHONE -------------- \\

const navBtn = document.querySelector('.nav-phone__btn');
const navContent = document.querySelector('.nav-phone__content');

if (navBtn)
  navBtn.addEventListener('click', e => {
    console.log('siema');
    navContent.style.transform = 'translate(0rem, 0rem)';
    navBtn.style.display = 'none';
  });

const closeNav = document.getElementById('closeNav');

if (closeNav)
  closeNav.addEventListener('click', e => {
    navContent.style.transform = 'translate(-100%, 0rem)';
    navBtn.style.display = 'flex';
  });
