const userLanguage = navigator.language || navigator.userLanguage;
const lang = userLanguage.startsWith('fr') ? 'fr' : 'en';

try {
  localStorage.setItem('preferredLanguage', lang);
} catch (e) {}

window.location.href = '/' + lang;
