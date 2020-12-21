const navBtn = document.querySelector(".nav-phone__btn");
const navContent = document.querySelector(".nav-phone__content");

if (navBtn)
  navBtn.addEventListener("click", (e) => {
    navContent.style.transform = "translate(0rem, 0rem)";
    navBtn.style.display = "none";
  });

const closeNav = document.getElementById("closeNav");

if (closeNav)
  closeNav.addEventListener("click", (e) => {
    navContent.style.transform = "translate(-100%, 0rem)";
    navBtn.style.display = "flex";
  });
