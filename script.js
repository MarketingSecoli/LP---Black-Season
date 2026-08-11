//Formulário//

const segments = [
  "Varejo",
  "Moda e vestuário",
  "Cosméticos e beleza",
  "Farma e saúde",
  "Suplementos e nutrição",
  "Pet",
  "Produtos infantis",
  "Esportes",
  "Eletrônicos",
  "Telecom",
  "Shopping centers",
  "Outro",
];

const personas = [
  "Marketing",
  "RH",
  "Comercial / Vendas",
  "CRM / Relacionamento",
  "Compras",
  "Outro",
];

//Seção 4 - Aplicações//

const applications = [
  {
    id: "kit-boas-vindas",
    title: "Kit de boas-vindas",
    description: "Composição de produtos personalizados para recepção de clientes em campanhas de aquisição.",
    image: "imagens/kit boas vindas.jpeg"
  },
  {
    id: "compre-e-ganhe",
    title: "Compre e ganhe",
    description: "Brindes aplicados em mecânicas promocionais de compre e ganhe no ponto de venda e e-commerce.",
    image: "imagens/compre e ganhe.jpeg"
  },
  {
    id: "ativacao-loja",
    title: "Ativação em loja",
    description: "Materiais promocionais personalizados para ativação de marca em lojas físicas e stands.",
    image: "imagens/ativação em loja.jpeg"
  },
  {
    id: "campanha-digital",
    title: "Campanha digital",
    description: "Produtos aplicados em unboxing e campanhas de influenciadores para redes sociais.",
    image: "imagens/campanha digital.jpeg"
  },
];

//ícone de imagem da seção 4//

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// -----------------------------------------------------------
// NAVEGAÇÃO (Header / botões com data-scroll-to)
// -----------------------------------------------------------
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    scrollToId(btn.getAttribute("data-scroll-to"));
  });
});

// -----------------------------------------------------------
// REFLEXÃO — Dobra 2 (opções renderizadas dinamicamente)
// -----------------------------------------------------------
const reflectionOptions = [
  "Pelo maior desconto?",
  "Pela experiência que criou?",
  "Pela marca que deixou?",
];

function renderReflectionOptions() {
  const container = document.getElementById("reflection-options");
  if (!container) return;

  container.innerHTML = reflectionOptions
    .map(
      (option, index) => `
      <div class="reflection__option" data-index="${index}" role="checkbox" aria-checked="false" tabindex="0">
        <span class="reflection__checkbox"></span>
        <span class="reflection__option-text">${option}</span>
      </div>
    `
    )
    .join("");

  // Adiciona o comportamento de clique
  const optionElements = container.querySelectorAll(".reflection__option");

  optionElements.forEach((optionEl) => {
    optionEl.addEventListener("click", () => toggleOption(optionEl));

    // Acessibilidade: permitir marcar com Enter/Espaço
    optionEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleOption(optionEl);
      }
    });
  });
}

function toggleOption(optionEl) {
  const allOptions = optionEl.parentElement.querySelectorAll(".reflection__option");
  
  allOptions.forEach((el) => {
    el.classList.remove("is-checked");
    el.setAttribute("aria-checked", "false");
  });

  optionEl.classList.add("is-checked");
  optionEl.setAttribute("aria-checked", "true");
}

renderReflectionOptions();

// -----------------------------------------------------------
// APLICAÇÕES — Dobra 4 (carrossel)
// -----------------------------------------------------------
function renderApplications() {
  const track = document.getElementById("applications-track");
  if (!track) return;

  const cardsHTML = applications
    .map(
      (app) => `
      <div class="app-card" data-card>
        <div class="app-card__image">
          <img src="${app.image}" alt="${app.title}" loading="lazy">
        </div>
        <div>
          <h3 class="app-card__title">${app.title}</h3>
          <p class="app-card__text">${app.description}</p>
        </div>
      </div>
    `
    )
    .join("");

  track.innerHTML = cardsHTML;
}

function setupCarousel() {
  const track = document.getElementById("applications-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  if (!track || !prevBtn || !nextBtn) return;

  const scrollByCard = (direction) => {
    const card = track.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));
}

// Modal iframe catálogo

const btnCatalogo = document.getElementById('btn-catalogo');
const modalCatalogo = document.getElementById('modal-catalogo');
const closeModal = document.querySelector('.close-modal');
const iframeCatalogo = document.getElementById('iframe-catalogo');

const urlCatalogo = "https://drive.google.com/file/d/1WYoLNu6DnBN75tnfp64iSWnvZNYc8FH2/preview";

function abrirModal() {
    iframeCatalogo.src = urlCatalogo;
    modalCatalogo.classList.add('active');
    document.body.classList.add('modal-open');
}

function fecharModal() {
    modalCatalogo.classList.remove('active');
    document.body.classList.remove('modal-open');
    iframeCatalogo.src = '';
}

if (btnCatalogo) {
    btnCatalogo.addEventListener('click', (e) => {
        e.preventDefault();
        abrirModal();
    });
}

if (closeModal) {
    closeModal.addEventListener('click', fecharModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modalCatalogo) {
        fecharModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalCatalogo.classList.contains('active')) {
        fecharModal();
    }
});

// -----------------------------------------------------------
// LEAD FORM (usado na seção Conversão)
// -----------------------------------------------------------
const NETLIFY_FORM_NAME = "contato-secoli";

function buildLeadFormHTML({ id, submitLabel, variant = "light" }) {
  const isDark = variant === "dark";
  const formClass = isDark ? "lead-form lead-form--dark" : "lead-form";

  const segmentOptions = segments
    .map((s) => `<option value="${s}">${s}</option>`)
    .join("");

  const personaOptions = personas
    .map((p) => `<option value="${p}">${p}</option>`)
    .join("");

  return `
    <form
      id="${id}"
      name="${NETLIFY_FORM_NAME}"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="${formClass}"
      novalidate
    >
      <input type="hidden" name="form-name" value="${NETLIFY_FORM_NAME}" />

      <p style="display:none;">
        <label>Não preencha este campo: <input name="bot-field" /></label>
      </p>

      <div class="lead-form__row">
        <div>
          <label>Nome completo</label>
          <input required type="text" name="nome" placeholder="Seu nome" />
        </div>
        <div>
          <label>E-mail corporativo</label>
          <input required type="email" name="email" placeholder="voce@empresa.com.br" />
        </div>
      </div>

      <div class="lead-form__row">
        <div>
          <label>Empresa</label>
          <input required type="text" name="empresa" placeholder="Nome da empresa" />
        </div>
        <div>
          <label>Telefone / WhatsApp</label>
          <input required type="tel" name="telefone" placeholder="(00) 00000-0000" />
        </div>
      </div>

      <div class="lead-form__row">
        <div>
          <label>Segmento</label>
          <select required name="segmento" defaultValue="">
            <option value="" disabled selected>Selecione seu segmento</option>
            ${segmentOptions}
          </select>
        </div>
        <div>
          <label>Sua área / cargo</label>
          <select required name="area" defaultValue="">
            <option value="" disabled selected>Selecione uma opção</option>
            ${personaOptions}
          </select>
        </div>
      </div>

      <div>
        <label>Conte um pouco sobre sua campanha (opcional)</label>
        <textarea rows="3" name="mensagem" placeholder="Ex: queremos uma ação de compre e ganhe para o e-commerce..."></textarea>
      </div>

      <button type="submit" class="btn ${isDark ? "btn--light" : "btn--dark"} lead-form__submit">
        ${submitLabel}
      </button>

      <p class="lead-form__disclaimer">
        Ao enviar, você concorda com a Política de Privacidade da Secoli.
      </p>
    </form>
  `;
}

function buildLeadFormSuccessHTML({ id, variant = "light" }) {
  const isDark = variant === "dark";
  return `
    <div id="${id}" class="lead-form__success" ${isDark ? 'style="border-color:var(--neutral-700);background:var(--neutral-900);"' : ""}>
      <div class="lead-form__success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p class="lead-form__success-title" ${isDark ? 'style="color:#fff;"' : ""}>Recebemos seu contato!</p>
      <p class="lead-form__success-text">
        Em breve, um especialista Secoli vai falar com você.
      </p>
    </div>
  `;
}

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function mountLeadForm({ mountId, formId, submitLabel, variant = "light" }) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = buildLeadFormHTML({ id: formId, submitLabel, variant });

  const form = document.getElementById(formId);
  if (!form) return;

  // Remove mensagens de erro ao digitar/selecionar novamente
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("is-invalid");
    });
    field.addEventListener("change", () => {
      field.classList.remove("is-invalid");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validação nativa do HTML5 (respeita os atributos "required")
    if (!form.checkValidity()) {
      // Marca visualmente os campos inválidos
      form.querySelectorAll("input, select, textarea").forEach((field) => {
        if (!field.checkValidity()) {
          field.classList.add("is-invalid");
        }
      });

      // Mostra a mensagem nativa do navegador no primeiro campo inválido
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector(".lead-form__submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(data),
    })
      .then(() => {
        mount.innerHTML = buildLeadFormSuccessHTML({ id: formId, variant });
      })
      .catch((error) => {
        console.error("Erro ao enviar formulário:", error);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        }
        alert("Ocorreu um erro ao enviar. Tente novamente em instantes.");
      });
  });
}

// -----------------------------------------------------------
// FOOTER — ano dinâmico + link de e-book (placeholder)
// -----------------------------------------------------------
function updateFooterYear() {
  const el = document.getElementById("footer-year-text");
  if (!el) return;
  const year = new Date().getFullYear();
  el.textContent = `© ${year} Secoli. Todos os direitos reservados.`;
}

function setupEbookLink() {
  const link = document.getElementById("download-ebook");
  if (!link) return;
  link.addEventListener("click", (e) => e.preventDefault());
}

// -----------------------------------------------------------
// INIT
// -----------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderReflectionOptions();
  renderApplications();
  setupCarousel();

  mountLeadForm({
    mountId: "lead-form-conversion",
    formId: "lead-form-conversion-el",
    submitLabel: "Quero falar com um especialista",
    variant: "light",
  });

  updateFooterYear();
  setupEbookLink();
});
