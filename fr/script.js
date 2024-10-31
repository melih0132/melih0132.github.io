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
  location.href = '/fr/#home';
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
  langElement.classList.add('slide-out');

  setTimeout(() => {
    langElement.textContent = translations[currentIndex];
    currentIndex = (currentIndex + 1) % translations.length;

    langElement.classList.remove('slide-out');
  }, 500);
}

setInterval(changeLanguage, 2000);

// Coulzurs des compétences
const skillColors = {
  "HTML": "#E34C26",
  "CSS": "#1572B6",
  "JavaScript": "#F7DF1E",
  "PHP": "#777BB4",
  "Python": "#306998",
  "C#": "#9B4F96",
  "PGSQL": "#336791",
  "PostgreSQL": "#336791",
  "MySQL": "#00758F",
  "Git": "#F05032",
  "GitHub": "#181717",
  "Unity": "#222C37",
  "WPF": "#512BD4",
  "Unit Tests": "#55606E",
  "UML": "#007ACC",
  "Phaser": "#00BCB4",
  "Terminal": "#111111",
  "Bash": "#4EAA25",
  "Powershell": "#012456",
  "Microsoft Teams": "#6264A7",
  "Trello": "#0079BF",
  "Figma": "#42498c",
  "Adobe Illustrator": "#FF9A00",
  "WordPress": "#21759B",
  "Power BI": "#F2C811",
  "Excel": "#217346",
  "Nodemon": "#76D04B",
  "Express": "#4B8BBE",
  "Socket.io": "#24c29f",
  "Node.js": "#3C873A",
  "VS Code": "#007ACC",
  "Linux": "#ffc200",
  "XAML": "#0C54C2",
  "SQL": "#CC2927",
  "3D Modeling": "#FF5733"
};

document.querySelectorAll(".skills__skill").forEach(skill => {
  const skillName = skill.textContent.trim();
  const color = skillColors[skillName];
  if (color) {
    skill.style.backgroundColor = color;
    skill.style.color = '#ffffff';
  }
});

// Formulaire
const form = document.querySelector('.contact__form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      showMessage("Merci ! Votre message a été envoyé.", "success");
      form.reset();
    } else {
      showMessage("Une erreur est survenue. Veuillez réessayer.", "error");
    }
  }).catch(error => {
    showMessage("Une erreur est survenue. Veuillez réessayer.", "error");
  });
});

function showMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.className = `contact__message ${type}`;
  messageElement.textContent = message;

  document.body.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 3000);
};

// Changement de language
document.getElementById('selectLang').addEventListener('change', function() {
  const selectedLang = this.value;
  
  if (selectedLang === 'fr') {
    location.href = '/fr/#home';
  } else if (selectedLang === 'en') {
    location.href = '/en/#home';
  }
});