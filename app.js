(() => {
  const steps = {
    1: window.STEP_ONE,
    2: window.STEP_TWO,
    3: window.STEP_THREE,
    4: window.STEP_FOUR,
    5: window.STEP_FIVE,
    6: window.STEP_SIX,
    7: window.STEP_SEVEN,
    8: window.STEP_EIGHT,
    9: window.STEP_NINE,
    10: window.STEP_TEN,
    11: window.STEP_ELEVEN,
    12: window.STEP_TWELVE
  };

  const workbook = document.getElementById('workbook');
  const privacyBtn = document.getElementById('privacyBtn');
  const exportBtn = document.getElementById('exportBtn');
  const progressFill = document.getElementById('progressFill');
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.getElementById('progressText');
  const clearBtn = document.getElementById('clearBtn');
  const printBtn = document.getElementById('printBtn');
  const brandStep = document.getElementById('brandStep');
  const stepTabs = [...document.querySelectorAll('.step-tab')];

  let activeStep = Number(localStorage.getItem('step-working-guide:active-step') || 1);
  if (!steps[activeStep]) activeStep = 1;
  let privateMode = localStorage.getItem('step-working-guide:private-mode') === '1';

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  const storagePrefix = stepNumber => `step-working-guide:v2:step${stepNumber}:`;
  const legacyPrefix = stepNumber => `step-working-guide:v1:step${stepNumber}:`;
  const questionBlocksFor = stepNumber => steps[stepNumber].blocks.filter(block => block.type === 'question');
  const normalizeQuestion = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
  const answerKey = (stepNumber, block, ordinal) => `${storagePrefix(stepNumber)}${normalizeQuestion(block.text)}:${ordinal}`;

  function migrateLegacyAnswers(stepNumber){
    const questions = questionBlocksFor(stepNumber);
    questions.forEach((block, index) => {
      const legacyKey = `${legacyPrefix(stepNumber)}q${index + 1}`;
      const newKey = answerKey(stepNumber, block, index + 1);
      if(localStorage.getItem(newKey) === null && localStorage.getItem(legacyKey) !== null){
        localStorage.setItem(newKey, localStorage.getItem(legacyKey));
      }
    });
  }

  Object.keys(steps).forEach(key => migrateLegacyAnswers(Number(key)));

  function overallProgress(){
    let total = 0;
    let answered = 0;
    Object.keys(steps).forEach(key => {
      const stepNumber = Number(key);
      const questions = questionBlocksFor(stepNumber);
      total += questions.length;
      questions.forEach((block, index) => {
        if((localStorage.getItem(answerKey(stepNumber, block, index + 1)) || '').trim()) answered += 1;
      });
    });
    return {total, answered, percent: total ? Math.round(answered / total * 100) : 0};
  }

  function render(){
    const data = steps[activeStep];
    let questionIndex = 0;

    const blocks = data.blocks.map(block => {
      if(block.type === 'paragraph') return `<p class="reading">${escapeHtml(block.text)}</p>`;
      if(block.type === 'section') return `<section class="section-heading"><div class="section-eyebrow">${escapeHtml(data.title)}</div><h2>${escapeHtml(block.title)}</h2><span class="source-ref">Source page ${block.sourcePage}</span></section>`;
      if(block.type === 'question'){
        questionIndex += 1;
        const key = answerKey(activeStep, block, questionIndex);
        const saved = localStorage.getItem(key) || '';
        return `<section class="reflection" data-question="${questionIndex}">
          <div class="reflection-top">
            <div class="reflection-number" aria-hidden="true">${questionIndex}</div>
            <div class="reflection-copy"><div class="reflection-label">Reflection</div><div class="question">${escapeHtml(block.text)}</div></div>
          </div>
          <label class="response-label" for="response-${activeStep}-${questionIndex}">Your response</label>
          <textarea id="response-${activeStep}-${questionIndex}" data-key="${escapeHtml(key)}" aria-label="Response to reflection ${questionIndex}" placeholder="Begin writing here...">${escapeHtml(saved)}</textarea>
          <div class="save-row"><span class="saved-dot">Saved on this device</span><span class="source-ref">Source page ${block.sourcePage}</span></div>
        </section>`;
      }
      return '';
    }).join('');

    const previous = activeStep > 1 ? `<button class="step-move" type="button" data-move="${activeStep - 1}">← Step ${activeStep - 1}</button>` : '<span></span>';
    const next = activeStep < 12 ? `<button class="step-move primary" type="button" data-move="${activeStep + 1}">Step ${activeStep + 1} →</button>` : '<span></span>';

    workbook.innerHTML = `<header class="step-hero"><div class="step-label">Narcotics Anonymous Step Working Guide · Step ${activeStep} of 12</div><h1 class="step-title">${escapeHtml(data.title)}</h1><blockquote class="step-quote">“${escapeHtml(data.quote)}”</blockquote></header><div class="content">${blocks}<nav class="step-footer-nav" aria-label="Previous and next step">${previous}${next}</nav></div>`;

    brandStep.textContent = data.title;
    document.title = `${data.title} · Step Working Guide`;
    stepTabs.forEach(tab => {
      const isActive = Number(tab.dataset.step) === activeStep;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-current', isActive ? 'step' : 'false');
      if(isActive) tab.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
    });

    workbook.querySelectorAll('textarea').forEach(area => {
      grow(area);
      let saveTimer;
      area.addEventListener('input', () => {
        grow(area);
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
          localStorage.setItem(area.dataset.key, area.value);
          updateProgress();
          flashSaved(area);
        }, 150);
      });
      area.addEventListener('blur', () => {
        localStorage.setItem(area.dataset.key, area.value);
        updateProgress();
      });
    });

    workbook.querySelectorAll('[data-move]').forEach(button => button.addEventListener('click', () => switchStep(Number(button.dataset.move))));
    document.body.classList.toggle('private', privateMode);
    privacyBtn.textContent = privateMode ? 'Show responses' : 'Hide responses';
    privacyBtn.setAttribute('aria-pressed', privateMode ? 'true' : 'false');
    updateProgress();
  }

  function grow(area){
    area.style.height = 'auto';
    area.style.height = `${Math.max(168, area.scrollHeight)}px`;
  }

  function flashSaved(area){
    const row = area.nextElementSibling;
    const status = row?.querySelector('.saved-dot');
    if(!status) return;
    status.textContent = 'Saved just now';
    clearTimeout(status._timer);
    status._timer = setTimeout(() => status.textContent = 'Saved on this device', 1200);
  }

  function updateProgress(){
    const fields = [...workbook.querySelectorAll('textarea')];
    const answered = fields.filter(field => field.value.trim().length > 0).length;
    const total = fields.length;
    const percent = total ? Math.round(answered / total * 100) : 0;
    const overall = overallProgress();
    progressFill.style.width = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', String(percent));
    progressText.textContent = `${answered} of ${total} in this step · ${overall.answered} of ${overall.total} overall`;
  }

  function switchStep(stepNumber){
    if(!steps[stepNumber]) return;
    activeStep = stepNumber;
    localStorage.setItem('step-working-guide:active-step', String(activeStep));
    render();
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function exportResponses(){
    const payload = {
      exportedAt: new Date().toISOString(),
      workbook: 'Step Working Guide',
      steps: Object.keys(steps).map(key => {
        const stepNumber = Number(key);
        const data = steps[stepNumber];
        let ordinal = 0;
        const responses = data.blocks.filter(block => block.type === 'question').map(block => {
          ordinal += 1;
          return {
            number: ordinal,
            question: block.text,
            response: localStorage.getItem(answerKey(stepNumber, block, ordinal)) || ''
          };
        });
        return {step: stepNumber, title: data.title, responses};
      })
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'step-working-guide-responses.json';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  stepTabs.forEach(tab => tab.addEventListener('click', () => switchStep(Number(tab.dataset.step))));

  privacyBtn.addEventListener('click', () => {
    privateMode = !privateMode;
    localStorage.setItem('step-working-guide:private-mode', privateMode ? '1' : '0');
    document.body.classList.toggle('private', privateMode);
    privacyBtn.textContent = privateMode ? 'Show responses' : 'Hide responses';
    privacyBtn.setAttribute('aria-pressed', privateMode ? 'true' : 'false');
  });

  clearBtn.addEventListener('click', () => {
    if(!confirm(`Clear all ${steps[activeStep].title} responses saved on this device?`)) return;
    Object.keys(localStorage).filter(key => key.startsWith(storagePrefix(activeStep)) || key.startsWith(legacyPrefix(activeStep))).forEach(key => localStorage.removeItem(key));
    render();
  });

  exportBtn.addEventListener('click', exportResponses);
  printBtn.addEventListener('click', () => window.print());

  render();
})();