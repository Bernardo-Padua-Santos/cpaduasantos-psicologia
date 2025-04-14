let lang = localStorage.getItem('lang') || 'pt';
localStorage.setItem('lang', lang);

let testimonials = []; // This will hold the array of testimonials from the JSON
let currentIndex = 0;

const testimonialEl = document.querySelector(".testimonial");
const authorEl = document.querySelector(".author");
const dots = document.querySelectorAll(".dot");

function updateTestimonial(index) {
  if (testimonials.length > 0) {
    testimonialEl.innerHTML = testimonials[index];
  }

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let translations = {};

  fetch("translations.json")
    .then((response) => response.json())
    .then((data) => {
      translations = data;
      setLanguage(localStorage.getItem('lang'));
    })
    .catch((error) => console.error("Error loading translations:", error));

  function setLanguage(lang) {
    if (!translations[lang]) {
      console.error(`Language ${lang} not found in translations.`);
      return;
    }

    current_language = lang;

    document.getElementById("subtitle").innerText = translations[lang].title;
    document.getElementById("menu-home").innerText = translations[lang].menu.home;
    document.getElementById("menu-about-me").innerText = translations[lang].menu.about_me;
    document.getElementById("menu-consultations").innerText = translations[lang].menu.consultations;
    document.getElementById("menu-contacts").innerText = translations[lang].menu.contacts;

    document.getElementById("online_consultations").innerText = translations[lang].online_consultations;
    document.getElementById("book_your_consultation").innerText = translations[lang].book_your_consultation;
    document.getElementById("book_now").innerText = translations[lang].book_now;

    document.getElementById("quote-jung").innerText = translations[lang].quotes.jung;
    document.getElementById("quote-jung-author").innerText = `${translations[lang].quotes.jung_author}`;

    const imageMappings = {
      "pt": {
        mission: "images/CastanhoMontagemFotografiaClássicaPublicaçãoFacebook.png",
      },
      "en": {
        mission: "images/mission_english.png"
      }
    };

    document.getElementById("missionImage").src = imageMappings[current_language].mission;
    document.getElementById("testimonials_title").innerText = translations[lang].testimonials_title;

    // Update testimonials array and render first one
    testimonials = translations[lang].testimonials;
    currentIndex = 0;
    updateTestimonial(currentIndex);

    // Termos de utilização
    document.getElementById("terms-title").innerText = translations[lang].terms.title;
    document.getElementById("terms-intro").innerText = translations[lang].terms.intro;

    document.getElementById("privacy-link").innerText = translations[lang].footer.privacy_policy;
    document.getElementById("terms-link").innerText = translations[lang].footer.terms_of_use;

    const termsList = document.getElementById("terms-list");
    termsList.innerHTML = "";

    translations[lang].terms.items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.split(":")[0]}:</strong> ${item.split(":").slice(1).join(":")}`;
      termsList.appendChild(li);
    });

    // Modal - Política de Privacidade
    document.getElementById("privacy-title").innerText = translations[lang].privacy.title;
    document.getElementById("privacy-intro").innerText = translations[lang].privacy.intro;

    const privacyList = document.getElementById("privacy-list");
    privacyList.innerHTML = "";

    translations[lang].privacy.items.forEach(item => {
      const section = document.createElement("div");
      const [title, ...bodyParts] = item.split("\n");
      const body = bodyParts.join("<br>");
      const processedBody = body.replace(
        /psi\.carolinapaduasantos@gmail\.com/g,
        '<a href="mailto:psi.carolinapaduasantos@gmail.com">psi.carolinapaduasantos@gmail.com</a>'
      );
      section.innerHTML = `<p><strong>${title}</strong><br>${processedBody}</p>`;
      privacyList.appendChild(section);
    });

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

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial(currentIndex);
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonial(currentIndex);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = parseInt(dot.getAttribute("data-index"));
    updateTestimonial(currentIndex);
  });
});

fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;

    const modal = document.getElementById("terms-modal");
    const openBtn = document.getElementById("terms-link");
    const closeBtn = modal.querySelector(".close");

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