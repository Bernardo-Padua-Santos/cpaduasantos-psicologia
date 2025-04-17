let lang = localStorage.getItem('lang') || 'pt';
localStorage.setItem('lang', lang); // Make sure it's saved

document.addEventListener("DOMContentLoaded", () => {
  let translations = {}; // Store translations here
  const faqQuestions = document.querySelectorAll(".faq-question");

  // Loop through each question button
  faqQuestions.forEach(question => {
  // Add a click event listener to each question
  question.addEventListener('click', () => {
      // Close any other open answers except the one clicked
      faqQuestions.forEach(item => {
          if (item !== question) {
              item.classList.remove('active'); // Remove 'active' class to reset arrow rotation
              item.nextElementSibling.style.maxHeight = null; // Collapse the answer
          }
      });

      // Toggle 'active' class on the clicked question to rotate the arrow
      question.classList.toggle('active');

      // Select the corresponding answer div
      const answer = question.nextElementSibling;

      // Check if the answer is already open
      if (answer.style.maxHeight) {
          // If open, close it by resetting max-height
          answer.style.maxHeight = null;
      } else {
          // If closed, set max-height to scrollHeight to expand it
          answer.style.maxHeight = answer.scrollHeight + 'px';
      }
  });
});

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

    document.getElementById("menu-home-mobile").innerText = translations[lang].menu.home;
    document.getElementById("menu-about-me-mobile").innerText = translations[lang].menu.about_me;
    document.getElementById("menu-consultations-mobile").innerText = translations[lang].menu.consultations;
    document.getElementById("menu-contacts-mobile").innerText = translations[lang].menu.contacts;

    // Update "Faqs" section
    document.getElementById("faq-question-1").innerHTML = translations[lang].faqs.faq_question_1 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-1").innerText = translations[lang].faqs.faq_answer_1;
    document.getElementById("faq-question-2").innerHTML = translations[lang].faqs.faq_question_2 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-2.1").innerText = translations[lang].faqs.faq_answer_2_1;
    document.getElementById("formButtonFAQ").innerText = translations[lang].faqs.formButton;
    document.getElementById("faq-answer-2.2").innerText = translations[lang].faqs.faq_answer_2_2;
    document.getElementById("faq-question-3").innerHTML = translations[lang].faqs.faq_question_3 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-3").innerText = translations[lang].faqs.faq_answer_3;
    document.getElementById("faq-question-4").innerHTML = translations[lang].faqs.faq_question_4 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-4").innerText = translations[lang].faqs.faq_answer_4;
    document.getElementById("faq-question-5").innerHTML = translations[lang].faqs.faq_question_5 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-5").innerText = translations[lang].faqs.faq_answer_5;
    document.getElementById("faq-question-6").innerHTML = translations[lang].faqs.faq_question_6 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-6").innerText = translations[lang].faqs.faq_answer_6;
    document.getElementById("faq-question-7").innerHTML = translations[lang].faqs.faq_question_7 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-7").innerText = translations[lang].faqs.faq_answer_7;
    document.getElementById("faq-question-8").innerHTML = translations[lang].faqs.faq_question_8 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-8").innerText = translations[lang].faqs.faq_answer_8;
    document.getElementById("faq-question-9").innerHTML = translations[lang].faqs.faq_question_9 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-9").innerText = translations[lang].faqs.faq_answer_9;
    document.getElementById("faq-question-10").innerHTML = translations[lang].faqs.faq_question_10 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-10").innerText = translations[lang].faqs.faq_answer_10;
    document.getElementById("faq-question-11").innerHTML = translations[lang].faqs.faq_question_11 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-11").innerText = translations[lang].faqs.faq_answer_11;
    document.getElementById("faq-question-12").innerHTML = translations[lang].faqs.faq_question_12 + ' <span class="arrow">&#9660;</span>';
    document.getElementById("faq-answer-12").innerText = translations[lang].faqs.faq_answer_12;
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
      const [title, ...bodyParts] = item.split("\n");
      const body = bodyParts.join("<br>");
      let processedBody = body.replace(
        /psi\.carolinapaduasantos@gmail\.com/g,
        '<a href="mailto:psi.carolinapaduasantos@gmail.com">psi.carolinapaduasantos@gmail.com</a>'
      );
      processedBody = processedBody.replace(/www\.carolinasantos\-psicologia\.com/g, '<a href="https://www.carolinasantos-psicologia.com">www.carolinasantos-psicologia.com</a>');
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
  const langSwticherMobile = document.getElementById("lang-switch-mobile");
  if (langSwitcher && langSwticherMobile) {
    langSwitcher.value = lang;
    langSwticherMobile.value = lang;
    langSwitcher.addEventListener("change", (e) => {
      lang = e.target.value;
      langSwticherMobile.value = lang; // Sync mobile switcher
      localStorage.setItem('lang', lang);
      setLanguage(lang);
    });
    langSwticherMobile.addEventListener("change", (e) => {
      lang = e.target.value;
      langSwitcher.value = lang; // Sync desktop switcher
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

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("show");
  overlay.classList.add("show");
  mobileMenu.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
  setTimeout(() => {
    mobileMenu.classList.add("hidden");
    overlay.classList.add("hidden");
  }, 300);
  document.body.style.overflow = "auto";
});