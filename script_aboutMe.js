let lang = localStorage.getItem('lang') || 'pt';
localStorage.setItem('lang', lang); // Make sure it's saved

document.addEventListener("DOMContentLoaded", () => {
  let translations = {}; // Store translations here

  // Load translations from the JSON file
  fetch("translations.json")
    .then((response) => response.json())
    .then((data) => {
      translations = data;
      setLanguage(localStorage.getItem('lang'));
    })
    .catch((error) => console.error("Error loading translations:", error));

  // Function to update the page content based on the selected language
  function setLanguage(lang) {

    if (!translations[lang]) {
      console.error(`Language ${lang} not found in translations.`);
      return;
    }

    current_language = lang;

    // Update header content
    document.getElementById("subtitle").innerText = translations[lang].title;

    // Update navigation menu
    document.getElementById("menu-home").innerText = translations[lang].menu.home;
    document.getElementById("menu-about-me").innerText = translations[lang].menu.about_me;
    document.getElementById("menu-consultations").innerText = translations[lang].menu.consultations;
    document.getElementById("menu-contacts").innerText = translations[lang].menu.contacts;

      // Update "Sobre Mim / About Me" section
      document.getElementById("about-title").innerText = translations[lang].about_me.heading;
      document.getElementById("about-intro").innerHTML = translations[lang].about_me.intro;
      document.getElementById("about-purpose").innerText = translations[lang].about_me.purpose;
      document.getElementById("about-approach").innerText = translations[lang].about_me.approach;
  
      // Update first quote
      document.getElementById("quote-1").innerText = translations[lang].about_me.quote_1.text;
      document.getElementById("author-1").innerText = translations[lang].about_me.quote_1.author;

      // Update closing statement
      document.getElementById("about-closing").innerText = translations[lang].about_me.closing;
      document.getElementById("about-invite").innerText = translations[lang].about_me.invite;
  
      // Update signature
      document.getElementById("signature-name").innerText = translations[lang].about_me.signature.name;
      document.getElementById("signature-position").innerText = translations[lang].about_me.signature.position;
      document.getElementById("signature-license").innerText = translations[lang].about_me.signature.license;

          // Termos de utilização
      document.getElementById("terms-title").innerText = translations[lang].terms.title;
      document.getElementById("terms-intro").innerText = translations[lang].terms.intro;

      const termsList = document.getElementById("terms-list");
      termsList.innerHTML = ""; // limpar antes de preencher

      translations[lang].terms.items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.split(":")[0]}:</strong> ${item.split(":").slice(1).join(":")}`;
        termsList.appendChild(li);
      });

      const lastUpdate = document.getElementById("last-update");
      lastUpdate.innerHTML = ""; // Clear previous content
      const p = document.createElement("p");
      p.innerHTML = `<strong>${translations[lang].terms.last_update.split(":")[0]}:</strong> ${translations[lang].terms.last_update.split(":").slice(1).join(":")}`;
      lastUpdate.appendChild(p);

    // Modal - Política de Privacidade
    document.getElementById("privacy-title").innerText = translations[lang].privacy.title;
    document.getElementById("privacy-intro").innerText = translations[lang].privacy.intro;

    const privacyList = document.getElementById("privacy-list");
    privacyList.innerHTML = "";
    
    translations[lang].privacy.items.forEach(item => {
      const section = document.createElement("div");
    
      // Detetar quebra de título e conteúdo
      const [title, ...bodyParts] = item.split("\n");
      const body = bodyParts.join("<br>");
    
      // Substituir email por link
      const processedBody = body.replace(
        /psi\.carolinapaduasantos@gmail\.com/g,
        '<a href="mailto:psi.carolinapaduasantos@gmail.com">psi.carolinapaduasantos@gmail.com</a>'
      );
    
      section.innerHTML = `<p><strong>${title}</strong><br>${processedBody}</p>`;
      privacyList.appendChild(section);
    });

      document.getElementById("privacy-link").innerText = translations[lang].footer.privacy_policy;
      document.getElementById("terms-link").innerText = translations[lang].footer.terms_of_use;

      const lastReview = document.getElementById("last-review");
      lastReview.innerHTML = ""; // Clear previous content
      const p2 = document.createElement("p");
      p2.innerHTML = `<strong>${translations[lang].privacy.last_review.split(":")[0]}:</strong> ${translations[lang].privacy.last_review.split(":").slice(1).join(":")}`;
      lastReview.appendChild(p2);
    // Log for testing
    console.log(`Language set to ${lang}`);
  }

  const langSwitcher = document.getElementById("lang-switch");
  if (langSwitcher) {
    langSwitcher.value = lang;

    langSwitcher.addEventListener("change", (e) => {
      lang = e.target.value;
      localStorage.setItem('lang', lang);
      setLanguage(lang);
    });
  }
});

fetch("footer.html")
.then(response => response.text())
.then(data => {
  document.getElementById("footer-placeholder").innerHTML = data;

  // Modal logic
  const modal = document.getElementById("terms-modal");
  const openBtn = document.getElementById("terms-link");
  const closeBtn = modal.querySelector(".close");

    // PRIVACY MODAL
  const privacyModal = document.getElementById("privacy-modal");
  const privacyBtn = document.getElementById("privacy-link");
  const privacyCloseBtn = privacyModal.querySelector(".close");

  privacyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    privacyModal.classList.remove("hidden");
  });

  privacyCloseBtn.addEventListener("click", function () {
    privacyModal.classList.add("hidden");
  });

  window.addEventListener("click", function (e) {
    if (e.target === privacyModal) {
      privacyModal.classList.add("hidden");
    }
  });

  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
})
.catch(error => console.error("Error loading footer:", error));




