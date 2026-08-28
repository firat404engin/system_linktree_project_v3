/**
 * SYSTEM ACCESSORIES - Dynamic Multi-Language, Web Share & QR Code Controller
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
    footerText: `© ${currentYear} System Aksesuarları. Tüm hakları saklıdır.`,
    modalTitle: "QR KOD İLE PAYLAŞ",
    modalDesc: "Kameranız ile okutarak hızlıca bağlantıyı açın",
    modalCopyBtn: "Bağlantıyı Kopyala",
    toastCopied: "Bağlantı panoya kopyalandı!",
    shareTitle: "System Mobilya & Banyo Aksesuarları",
    shareText: "System Mobilya ve Banyo Aksesuarları resmi bağlantı portalı"
  },
  EN: {
    pageTitle: "SYSTEM FURNITURE & BATHROOM ACCESSORIES",
    mainTitle: "SYSTEM FURNITURE & BATHROOM ACCESSORIES",
    link1Text: "SYSTEM FURNITURE ACCESSORIES",
    link1Url: "https://www.systemhandle.com/en-US/HomePage",
    link2Text: "SYSTEM HANDLES",
    link3Text: "SYSTEM BATHROOM ACCESSORIES",
    link3Url: "https://systembanyo.com/home/index.html",
    link4Text: "SYSTEM BANYO",
    footerText: `© ${currentYear} System Accessories. All rights reserved.`,
    modalTitle: "SHARE VIA QR CODE",
    modalDesc: "Scan with your phone camera to quickly open",
    modalCopyBtn: "Copy Link",
    toastCopied: "Link copied to clipboard!",
    shareTitle: "System Furniture & Bathroom Accessories",
    shareText: "System Furniture & Bathroom Accessories official links portal"
  }
};

let activeLang = "TR";

/**
 * Sayfa dilini, metinleri, alt telif bilgisini ve yönlendirme linklerini dinamik olarak değiştirir.
 * @param {'TR' | 'EN'} lang
 */
function setLanguage(lang) {
  if (!translations[lang]) return;
  activeLang = lang;
  const data = translations[lang];

  // Başlık ve metinleri güncelle
  document.title = data.pageTitle;
  document.getElementById("main-title").innerText = data.mainTitle;
  document.getElementById("link-1").innerText = data.link1Text;
  document.getElementById("link-2").innerText = data.link2Text;
  document.getElementById("link-3").innerText = data.link3Text;
  document.getElementById("link-4").innerText = data.link4Text;

  // Alt bilgi (Footer) telif yazısını güncelle
  document.getElementById("footer-text").innerHTML = data.footerText;

  // QR Modal metinlerini güncelle
  document.getElementById("modal-title").innerText = data.modalTitle;
  document.getElementById("modal-desc").innerText = data.modalDesc;
  document.getElementById("modal-copy-btn").innerText = data.modalCopyBtn;

  // Web sitelerinin URL bağlantılarını dile göre güncelle
  document.getElementById("link-furniture").href = data.link1Url;
  document.getElementById("link-bathroom").href = data.link3Url;

  // Buton aktiflik durumlarını ve aria etiketlerini güncelle
  const isTR = lang === "TR";
  const btnTR = document.getElementById("btn-tr");
  const btnEN = document.getElementById("btn-en");

  btnTR.classList.toggle("active", isTR);
  btnTR.setAttribute("aria-selected", isTR);

  btnEN.classList.toggle("active", !isTR);
  btnEN.setAttribute("aria-selected", !isTR);

  // HTML lang özniteliğini ve kullanıcı tercihini sakla
  document.documentElement.lang = lang.toLowerCase();
  localStorage.setItem("system_preferred_lang", lang);
}

/**
 * Modern Web Share API ile sayfayı yerel olarak paylaşır (Desteklenmiyorsa kopyalar)
 */
async function sharePage() {
  const currentUrl = window.location.href;
  const data = translations[activeLang];

  if (navigator.share) {
    try {
      await navigator.share({
        title: data.shareTitle,
        text: data.shareText,
        url: currentUrl
      });
    } catch (err) {
      // Kullanıcı iptal ettiğinde sessizce devam et
      if (err.name !== "AbortError") {
        copyCurrentUrl();
      }
    }
  } else {
    // Tarayıcı desteklemiyorsa panoya kopyala
    copyCurrentUrl();
  }
}

/**
 * QR Kod Modalını açar ve anlık QR görselini API üzerinden çeker
 */
function openQrModal() {
  const currentUrl = encodeURIComponent(window.location.href);
  const qrImg = document.getElementById("qr-code-img");
  
  // Yüksek çözünürlüklü ve koyu renkli QR Kod üretici
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${currentUrl}&color=11-11-11&bgcolor=ffffff&margin=1`;

  const modal = document.getElementById("qr-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Arka plan kaydırmayı engelle
}

/**
 * QR Kod Modalını kapatır
 */
function closeQrModal(event) {
  if (event && event.target.id !== "qr-modal" && !event.target.closest(".modal-close-btn")) {
    return;
  }
  const modal = document.getElementById("qr-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ESC Tuşu ile Modalı kapatma
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("qr-modal");
    if (modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});

/**
 * Sayfa URL'sini panoya kopyalar ve Toast bildirimi gösterir
 */
function copyCurrentUrl() {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl).then(() => {
    showToast(translations[activeLang].toastCopied);
  }).catch(() => {
    // Eski tarayıcılar için fallback
    const tempInput = document.createElement("input");
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast(translations[activeLang].toastCopied);
  });
}

/**
 * Toast bildirim mesajı gösterir
 */
function showToast(message) {
  const toast = document.getElementById("toast-message");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Sayfa yüklendiğinde çalışacak başlangıç kontrolleri
document.addEventListener("DOMContentLoaded", () => {
  // URL parametresi ile dil kontrolü (Örn: ?lang=en)
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
