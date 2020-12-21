const numberOfAdult = document.getElementById("numberOfAdult");

if (numberOfAdult)
  numberOfAdult.addEventListener("click", (e) => {
    document.getElementById(
      "adults"
    ).innerHTML = `<span>Liczba dorosłych:</span>${numberOfAdult.value}`;
  });

const numberOfChildren = document.getElementById("numberOfChildren");

if (numberOfChildren)
  numberOfChildren.addEventListener("click", (e) => {
    document.getElementById(
      "children"
    ).innerHTML = `<span>Liczba dzieci:</span>${numberOfChildren.value}`;
  });