window.addEventListener('load', function () {
  console.log('La page complète est chargée.');
});

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

  // Analyse des informations système
  setTimeout(() => {
    console.clear();
    console.log("Analyse terminée.");
    console.log("Adresse IP : inconnue (masquée)");
    console.log("Système d'exploitation : " + navigator.platform);
    console.log("Navigateur : " + navigator.userAgent);
    console.log("Langue préférée : " + navigator.language);
    console.log("Fuseau horaire : " + Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, 10000);

  // Tentative de récupération du nom d'utilisateur
  setTimeout(() => {
    console.clear();
    console.log("Tentative de récupération du nom d'utilisateur...");
    console.log("Impossible d'accéder directement à vos fichiers.");
  }, 30000);

  // Scan des fichiers en cours
  setTimeout(() => {
    console.clear();
    console.log("Scan des fichiers en cours...");
    setTimeout(() => {
      console.log("Historique de navigation : accès refusé.");
      console.log("Données locales : partiellement corrompues.");
    }, 4000);
  }, 35000);

  // Liste des fichiers détectés
  setTimeout(() => {
    console.clear();
    console.log("Liste des fichiers détectés :");
    console.log("1. Dossier personnel");
    console.log("2. Historique de navigation");
    console.log("3. Informations confidentielles...");
    console.log("Tentative de récupération en cours...");
  }, 50000);

  // Alerte d'activité suspecte et comportement suivi
  setTimeout(() => {
    console.clear();
    console.log("Alerte : Activité suspecte détectée.");
    console.log("Votre comportement est suivi.");
    console.log("Conséquences potentielles en cas de détection prolongée.");
  }, 60000);

  // Accès système et prise de contrôle simulée
  setTimeout(() => {
    console.clear();
    console.log("Accès système requis.");
    console.log("Système en cours d'analyse...");
    setTimeout(() => {
      console.clear();
      console.log("Vous n'avez plus le contrôle.");
      console.log("Opérations critiques en cours.");
    }, 5000);
  }, 65000);

  // Localisation géographique
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
  }, 75000);

  // Communication interrompue temporairement
  setTimeout(() => {
    console.clear();
    console.log("Communication interrompue temporairement.");
    console.log("Nous vous surveillons...");
  }, 90000);

  // Surveillance d'inactivité (10 secondes d'inactivité)
  let lastActivity = Date.now();

  document.addEventListener("mousemove", () => {
    lastActivity = Date.now();
  });

  document.addEventListener("click", () => {
    lastActivity = Date.now();
  });

  setTimeout(() => {
    setInterval(() => {
      if (Date.now() - lastActivity > 10000) {
        console.log("Aucune activité détectée depuis 10 secondes.");
        console.log("Vous êtes toujours sous surveillance.");
      }
    }, 10000);
  }, 100000);

  setTimeout(() => {
    setInterval(() => {
      console.log("Nouvelle analyse en cours...");
      console.log("Heure locale : " + new Date().toLocaleTimeString());
      console.log("Activité suspecte détectée. Surveillance renforcée.");
    }, 60000);
  }, 100000);
})();