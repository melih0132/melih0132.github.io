// Dépliage du hamburger
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
);
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
};

// Retour au début lors de l'appuie sur le logo
const headerLogoContainer = document.querySelector('.header__logo-container');

headerLogoContainer.addEventListener('click', () => {
  location.href = '../';
});

// Bonjour en différentes langues
const translations = [
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "Merhaba",
  "Привет",
  "こんにちは",
  "안녕하세요",
  "欢迎",
  "Olá",
];

let currentIndex = 0;

function changeLanguage() {
  const langElement = document.getElementById('dynamic-lang');
  langElement.classList.add('slide-out'); // Changer fade-out en slide-out

  setTimeout(() => {
    langElement.textContent = translations[currentIndex];
    currentIndex = (currentIndex + 1) % translations.length;

    langElement.classList.remove('slide-out'); // Enlever slide-out
  }, 500);
}

setInterval(changeLanguage, 2000);

// Serveur php
const form = document.querySelector('.contact__form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      alert("Merci ! Votre message a été envoyé.");
      form.reset();
    } else {
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  }).catch(error => {
    alert("Une erreur est survenue. Veuillez réessayer.");
  });
});