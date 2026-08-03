// ============================================
// CHATBOT DEMO
// ============================================

const botResponses = {
  'привет': 'Привет! 👋 Добро пожаловать в NeuroBrand. Чем я могу вам помочь?',
  'чат-бот': 'Чат-бот это AI помощник, который работает 24/7 в Инстаграме, WhatsApp и других каналах. Он записывает клиентов, отвечает на вопросы и квалифицирует лидов.',
  'цена': 'У нас нет стандартной цены — всё зависит от вашего бизнеса. Бесплатная консультация и расчёт стоимости за 10 минут.',
  'консультация': 'Консультация полностью бесплатная! Обсудим ваш бизнес, покажем решение и дадим дорожную карту. Запишитесь по ссылке ниже!',
  'как работает': 'Бот автоматически принимает сообщения, распознаёт намерение, даёт ответ или записывает консультацию. Всё работает 24/7 без вашего участия.',
  'результаты': 'Средний результат клиентов: +40% новых клиентов, 40+ часов сэкономлено, ROI 3.2x',
  'помощь': 'Я помогу ответить на вопросы о чат-ботах, маркетинге, воронке продаж. Спросите о чем-нибудь! 😊'
};

const defaultResponse = 'Интересный вопрос! 🤔 Лучше всего об этом расскажет наша команда. Запишитесь на консультацию выше!';

function sendMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  
  if (!input.value.trim()) return;
  
  // Добавляем сообщение пользователя
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message message-user';
  userMsg.textContent = input.value;
  messages.appendChild(userMsg);
  
  // Чистим инпут
  const userText = input.value.toLowerCase();
  input.value = '';
  
  // Прокручиваем вниз
  messages.scrollTop = messages.scrollHeight;
  
  // Ответ бота (с задержкой)
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message message-bot';
    
    // Ищем ключевые слова в ответах
    let response = defaultResponse;
    for (const [key, value] of Object.entries(botResponses)) {
      if (userText.includes(key)) {
        response = value;
        break;
      }
    }
    
    botMsg.textContent = response;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 600);
}

// Enter для отправки
document.getElementById('chatInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

// ============================================
// SIMPLE FADE-IN ANIMATION
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections and cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section, .service, .case, .testimonial').forEach(el => {
    observer.observe(el);
  });

  // Handle form submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Спасибо, мы свяжемся с вами!';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

console.log('✨ NeuroBrand loaded');
