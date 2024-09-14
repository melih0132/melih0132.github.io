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

// Retour au debut lors de l'appuie au logo
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = '/'
});

// Ouverture des pages des projets
function openW(url) {
  window.open(url + ".html", "_blank")
};

function closeW() {
  if (window.opener && !window.opener.closed) {
    window.close();
  } else {
    window.location.href = "https://melih0132.github.io/";
  }
};

// Serveur php
document.querySelector('.contact__form').addEventListener('submit', function(event) {
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    alert("Veuillez remplir tous les champs.");
    event.preventDefault();
  }
});

// Petit clein d'oeil au développer ;)
(function () {
  console.log("Connexion établie. Récupération des informations...");

  setTimeout(() => {
      console.clear();
      console.log("Analyse terminée.");
      console.log("Adresse IP : inconnue (masquée)");
      console.log("Système d'exploitation : " + navigator.platform);
      console.log("Navigateur : " + navigator.userAgent);
      console.log("Langue préférée : " + navigator.language);
      console.log("Fuseau horaire : " + Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, 3000);

  setTimeout(() => {
      console.clear();
      console.log("Localisation en cours...");
      navigator.geolocation.getCurrentPosition(function (position) {
          console.clear();
          console.log("Coordonnées détectées.");
          console.log("Latitude : " + position.coords.latitude);
          console.log("Longitude : " + position.coords.longitude);
          console.log("Une analyse plus approfondie sera effectuée plus tard.");
      }, function () {
          console.clear();
          console.log("Localisation refusée. Suivi par d'autres moyens...");
      });
  }, 6000);

  setTimeout(() => {
      console.clear();
      console.log("Communication interrompue temporairement.");
      console.log("Nous vous surveillons...");
  }, 9000);
})();