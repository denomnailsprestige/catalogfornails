const WHATSAPP_NUMBER = "";
const BUSINESS_NAME = "Denom Nails Prestige";

const generalMessage = `Hi ${BUSINESS_NAME}, I want to order a press-on nail set.`;
const toast = document.querySelector(".toast");
let toastTimer;

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function showSetupToast() {
  if (!toast) return;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 3600);
}

function handleWhatsAppClick(event, message) {
  if (!WHATSAPP_NUMBER) {
    event.preventDefault();
    showSetupToast();
    return;
  }

  event.currentTarget.href = buildWhatsAppUrl(message);
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    handleWhatsAppClick(event, generalMessage);
  });
});

document.querySelectorAll(".whatsapp-product-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const product = link.dataset.product || "a press-on nail set";
    handleWhatsAppClick(event, `Hi ${BUSINESS_NAME}, I want to order the ${product}.`);
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter-button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    document.querySelectorAll(".product-card").forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});
