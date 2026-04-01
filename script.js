// Rolagem suave para os links do menu e botão de contato
document.querySelectorAll('.nav-links a, .btn-contato').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Abrir e fechar as seções de Skills com animação nas barras
const toggleBtns = document.querySelectorAll('.toggle-btn');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.parentElement.nextElementSibling;
        content.classList.toggle('active');

        const bars = content.querySelectorAll('.bar');
        if (content.classList.contains('active')) {
            bars.forEach(bar => {
                const progress = bar.querySelector('.progress div');
                const level = bar.getAttribute('data-skill');
                progress.style.width = level + '%';
            });
        } else {
            bars.forEach(bar => {
                const progress = bar.querySelector('.progress div');
                progress.style.width = '0';
            });
        }
    });
});

// --------- PORTFÓLIO CARROSSEL ----------
const wrapper = document.querySelector('.portfolio-wrapper');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const items = document.querySelectorAll('.portfolio-item');
const dotsContainer = document.querySelector('.dots');

let index = 0;

// Criar os dots dinamicamente
items.forEach((_, i) => {
    const dot = document.createElement('div');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots div');

function updateCarousel() {
    wrapper.scrollTo({
        left: index * 800,
        behavior: 'smooth'
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    if (index < items.length - 1) {
        index++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateCarousel();
    }
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
    });
});

// --------- FORMULÁRIO COM EMAILJS ----------
document.getElementById('form-contato').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const statusMsg = document.getElementById('status-msg');

    emailjs.sendForm("service_2sjq9w4", "template_jxgkhej", form)
        .then(() => {
            statusMsg.textContent = "Mensagem enviada com sucesso! 🚀";
            statusMsg.style.color = "#a7e887ff";
            form.reset();
        })
        .catch((error) => {
            console.error("Erro ao enviar email:", error);
            statusMsg.textContent = "Erro ao enviar. Tente novamente.";
            statusMsg.style.color = "#7a1717ff";
        });
});

