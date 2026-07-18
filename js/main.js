/* ==========================================================================
   NEUROBRAND — общая логика: мобильное меню, чат-виджет, формы
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* mobile menu */
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav){
    burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  /* chat widget (present only on ai.html) */
  const chatFab = document.getElementById('chatFab');
  const chatPanel = document.getElementById('chatPanel');
  function openChat(){
    if (!chatPanel) return;
    chatPanel.classList.add('open');
    if (typeof startChatDemo === 'function') startChatDemo();
  }
  function toggleChat(){
    if (!chatPanel) return;
    chatPanel.classList.toggle('open');
    if (chatPanel.classList.contains('open') && typeof startChatDemo === 'function') startChatDemo();
  }
  if (chatFab) chatFab.addEventListener('click', toggleChat);
  const heroOpen = document.getElementById('openChatFromHero');
  const demoOpen = document.getElementById('openChatFromDemo');
  if (heroOpen) heroOpen.addEventListener('click', openChat);
  if (demoOpen) demoOpen.addEventListener('click', openChat);

  /* contact form: tabs + submit */
  const tabAi = document.getElementById('tabAi');
  const tabMarketing = document.getElementById('tabMarketing');
  const directionInput = document.getElementById('directionInput');
  const companyField = document.getElementById('companyField');

  function setTab(dir){
    if (!tabAi || !tabMarketing) return;
    tabAi.classList.toggle('active', dir === 'ai');
    tabMarketing.classList.toggle('active', dir === 'marketing');
    if (directionInput) directionInput.value = dir;
    if (companyField) companyField.style.display = dir === 'ai' ? '' : 'none';
  }
  if (tabAi) tabAi.addEventListener('click', () => setTab('ai'));
  if (tabMarketing) tabMarketing.addEventListener('click', () => setTab('marketing'));
  if (tabAi){
    const hash = window.location.hash.replace('#','');
    setTab(hash === 'marketing' ? 'marketing' : 'ai');
  }

  const leadForm = document.getElementById('leadForm');
  const formSuccess = document.getElementById('formSuccess');
  if (leadForm){
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      /* TODO: подключить реальную отправку (CRM / Telegram / e-mail) на этапе бэкенда */
      leadForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    });
  }
});
