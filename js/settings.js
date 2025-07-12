// settings.js — Gère thème + langue
document.addEventListener("DOMContentLoaded", () => {
  // Lire les préférences sauvegardées
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedLang = localStorage.getItem("lang") || "fr";

  applyTheme(savedTheme);
  applyLanguage(savedLang);

  // Gestion du thème (si le sélecteur est présent)
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.value = savedTheme;
    themeToggle.addEventListener("change", () => {
      const selected = themeToggle.value;
      localStorage.setItem("theme", selected);
      applyTheme(selected);
    });
  }


  // Gestion de la langue
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener("change", () => {
      const selectedLang = langSelect.value;
      localStorage.setItem("lang", selectedLang);
      applyLanguage(selectedLang);
    });
  }

  // Gestion de l'ouverture/fermeture des paramètres
  const openSettings = document.getElementById("open-settings");
  const closeSettings = document.getElementById("close-settings");
  const panel = document.getElementById("settings-panel");

  if (openSettings && panel) {
    openSettings.addEventListener("click", () => {
      panel.style.display = "block";
    });
  }


  if (closeSettings && panel) {
    closeSettings.addEventListener("click", () => {
      panel.style.display = "none";
    });
  }
});

// Appliquer un thème clair ou sombre
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }
}

// Appliquer une langue à partir du fichier JSON
function applyLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      for (const key in data) {
                const el = document.getElementById(key);
        if (el) {
          el.textContent = data[key];
        }
      }
    })
    .catch(err => console.error("Erreur chargement langue :", err));
}
