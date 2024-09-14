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
  console.log("%cSalut, développeur curieux ! 👀", "color: green; font-size: 20px; font-weight: bold;");
  
  setTimeout(() => {
      console.clear();
      console.log("%cTu ne t'y attendais pas, n'est-ce pas ? 😎", "color: red; font-size: 18px;");
  }, 3000);
  
  setTimeout(() => {
      console.clear();
      console.log("%cTu as activé une énigme secrète... 🌀", "color: purple; font-size: 16px;");
      console.log("Tape la commande suivante dans la console : %cdéveloppeurSecret()", "color: blue; font-size: 16px;");
  }, 6000);

  setTimeout(() => {
      for (let i = 0; i < 5; i++) {
          console.log(`%cMessage ${i+1}: Toujours là... 👁️`, `color: hsl(${i * 72}, 70%, 50%); font-size: 14px;`);
      }
  }, 9000);
  
  setTimeout(() => {
      console.clear();
      console.log("%cC'est tout pour l'instant... 🔥", "color: orange; font-size: 22px;");
  }, 15000);

  window.developpeurSecret = function () {
      console.clear();
      console.log("%cBravo, tu as trouvé la commande secrète ! 🎉", "color: gold; font-size: 22px; font-weight: bold;");
      console.log("%cMaintenant, continue à explorer... ou arrête de fouiner 😏", "color: blue; font-size: 16px;");
  };

})();