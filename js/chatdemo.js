/* ==========================================================================
   NEUROBRAND — сценарий демо-чата (иллюстрация, не настоящий AI)
   ========================================================================== */
const CHAT_SCRIPT = {
  start: {
    bot: "Здравствуйте! Это студия «Пример». Хотите записаться на тренировку?",
    options: [
      { text: "Да, хочу записаться", next: "askType" },
      { text: "Сколько стоит абонемент?", next: "price" }
    ]
  },
  price: {
    bot: "Абонемент на 8 занятий — от 25 000 ₸. Хотите подобрать удобное время?",
    options: [
      { text: "Да, давайте", next: "askType" },
      { text: "Пока нет, спасибо", next: "end" }
    ]
  },
  askType: {
    bot: "Отлично! Какое направление интересует?",
    options: [
      { text: "Групповые тренировки", next: "askTime" },
      { text: "Персональные занятия", next: "askTime" }
    ]
  },
  askTime: {
    bot: "Записал. В какое время вам удобнее — утро или вечер?",
    options: [
      { text: "Утро", next: "confirm" },
      { text: "Вечер", next: "confirm" }
    ]
  },
  confirm: {
    bot: "Готово! Заявка передана администратору, он свяжется с вами для подтверждения времени. Так бот забирает клиента с первого сообщения — без пропущенных заявок.",
    options: [
      { text: "Начать заново", next: "start" }
    ]
  },
  end: {
    bot: "Хорошо, если возникнут вопросы — я всегда на связи. Хотите посмотреть направления?",
    options: [
      { text: "Начать заново", next: "start" }
    ]
  }
};

function renderChatStep(key){
  const step = CHAT_SCRIPT[key];
  const body = document.getElementById('chatBody');
  const optionsWrap = document.getElementById('chatOptions');
  if (!body || !optionsWrap) return;

  const botMsg = document.createElement('div');
  botMsg.className = 'msg bot';
  botMsg.textContent = step.bot;
  body.appendChild(botMsg);
  body.scrollTop = body.scrollHeight;

  optionsWrap.innerHTML = '';
  step.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chat-opt';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      const userMsg = document.createElement('div');
      userMsg.className = 'msg user';
      userMsg.textContent = opt.text;
      body.appendChild(userMsg);
      body.scrollTop = body.scrollHeight;
      optionsWrap.innerHTML = '';
      setTimeout(() => renderChatStep(opt.next), 380);
    });
    optionsWrap.appendChild(btn);
  });
}

function startChatDemo(){
  const body = document.getElementById('chatBody');
  if (!body) return;
  if (body.dataset.started === '1') return;
  body.dataset.started = '1';
  renderChatStep('start');
}
