/**
 * SYSTEM AKSESUARLARI - Dinamik Çoklu Dil & Etkileşim Yöneticisi
 */
const currentYear = new Date().getFullYear();

const translations = {
  TR: {
    pageTitle: "SYSTEM MOBİLYA & BANYO AKSESUARLARI",
    mainTitle: "SYSTEM MOBİLYA & BANYO AKSESUARLARI",
    link1Text: "SYSTEM MOBİLYA AKSESUARLARI",
    link1Url: "https://www.systemhandle.com/tr-TR/AnaSayfa",
    link2Text: "SYSTEM HANDLES",
    link3Text: "SYSTEM BANYO AKSESUARLARI",
    link3Url: "https://systembanyo.com/anasayfa/index.html",
    link4Text: "SYSTEM BANYO",
    footerText: `© ${currentYear} System Aksesuarları. Tüm hakları saklıdır.`
  },
  EN: {
    pageTitle: "SYSTEM FURNITURE & BATHROOM ACCESSORIES",
    mainTitle: "SYSTEM FURNITURE & BATHROOM ACCESSORIES",
    link1Text: "SYSTEM FURNITURE ACCESSORIES",
    link1Url: "https://www.systemhandle.com/en-US/HomePage",
    link2Text: "SYSTEM HANDLES",
    link3Text: "SYSTEM BATHROOM ACCESSORIES",
    link3Url: "https://systembanyo.com/home/index.html",
    link4Text: "SYSTEM BATHROOM",
    footerText: `© ${currentYear} System Accessories. All rights reserved.`
  }
};

/**
 * Sayfa dilini, metinleri, alt telif bilgisini ve linkleri günceller.
 * @param {'TR' | 'EN'} lang
 */
function setLanguage(lang) {
  if (!translations[lang]) return;

  const data = translations[lang];

  document.title = data.pageTitle;
  document.getElementById("main-title").innerText = data.mainTitle;
  document.getElementById("link-1").innerText = data.link1Text;
  document.getElementById("link-2").innerText = data.link2Text;
  document.getElementById("link-3").innerText = data.link3Text;
  document.getElementById("link-4").innerText = data.link4Text;

  document.getElementById("footer-text").innerHTML = data.footerText;

  document.getElementById("link-furniture").href = data.link1Url;
  document.getElementById("link-bathroom").href = data.link3Url;

  const isTR = lang === "TR";
  const btnTR = document.getElementById("btn-tr");
  const btnEN = document.getElementById("btn-en");

  btnTR.classList.toggle("active", isTR);
  btnTR.setAttribute("aria-selected", isTR);

  btnEN.classList.toggle("active", !isTR);
  btnEN.setAttribute("aria-selected", !isTR);

  document.documentElement.lang = lang.toLowerCase();
  localStorage.setItem("system_preferred_lang", lang);
}

// Sayfa yüklendiğinde çalışacak kontroller
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");

  let initialLang = "TR";
  if (langParam && (langParam.toUpperCase() === "EN" || langParam.toUpperCase() === "TR")) {
    initialLang = langParam.toUpperCase();
  } else {
    initialLang = localStorage.getItem("system_preferred_lang") || "TR";
  }

  setLanguage(initialLang);
});