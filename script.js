// Détéction langage utilisateur
const userLanguage = navigator.language || navigator.userLanguage;

if (userLanguage.startsWith('fr')) {
  window.location.href = '/fr';
} else if (userLanguage.startsWith('en')) {
  window.location.href = '/en';
} else {
  window.location.href = '/fr';
}