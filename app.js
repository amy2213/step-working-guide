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
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const clearBtn = document.getElementById('clearBtn');
  const printBtn = document.getElementById('printBtn');
  const brandStep = document.getElementById('brandStep');
  const stepTabs = [...document.querySelectorAll('.step-tab')];

  let activeStep = Number(localStorage.getItem('step-working-guide:active-step') || 1);
  if (!steps[activeStep]) activeStep = 1;
  let privateMode = false;
  let questionIndex = 0;

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  const storagePrefix = stepNumber => `step-working-guide:v1:step${stepNumber}:`;
  const answerKey = index => `${storagePrefix(activeStep)}q${index}`;
  const questionCountFor = stepNumber => steps[stepNumber].blocks.filter(block => block.type === 'question').length;

  function overallProgress(){
    let total = 0;
    let answered = 0;
    Object.keys(steps).forEach(key => {
      const stepNumber = Number(key);
      const count = questionCountFor(stepNumber);
      total += count;
      for(let i = 1; i <= count; i += 1){
        if((localStorage.getItem(`${storagePrefix(stepNumber)}q${i}`) || '').trim()) answered += 1;
      }
    });
    return {total, answered, percent: total ? Math.round(answered / total * 100) : 0};
  }

  function render(){
    const data = steps[activeStep];
    questionIndex = 0;

    const blocks = data.blocks.map(block => {
      if(block.type === 'paragraph'){
        return `<p class="reading">${escapeHtml(block.text)}</p>`;
      }
      if(block.type === 'section'){
        return `<section class="section-heading"><div class="section-eyebrow">${escapeHtml(data.title)}</div><h2>${escapeHtml(block.title)}</h2><span class="source-ref">Source page ${block.sourcePage}</span></section>`;
      }
      if(block.type === 'question'){
        questionIndex += 1;
        const saved = localStorage.getItem(answerKey(questionIndex)) || '';
        return `<section class="reflection" data-question="${questionIndex}">
          <div class="reflection-top">
            <div class="reflection-number">${questionIndex}</div>
            <div><div class="reflection-label">Reflection</div><div class="question">${escapeHtml(block.text)}</div></div>
          </div>
          <div class="response-label">Your response</div>
          <textarea data-key="${answerKey(questionIndex)}" aria-label="Response to reflection ${questionIndex}" placeholder="Begin writing here...">${escapeHtml(saved)}</textarea>
          <div class="save-row"><span class="saved-dot">Saved on this device</span><span class="source-ref">Source page ${block.sourcePage}</span></div>
        </section>`;
      }
      if(block.type === 'batchEnd'){
        return `<aside class="batch-end"><div class="batch-end-label">Build milestone</div><div>${escapeHtml(block.text)}</div></aside>`;
      }
      return '';
    }).join('');

    const previous = activeStep > 1 ? `<button class="step-move" type="button" data-move="${activeStep - 1}">← Step ${activeStep - 1}</button>` : '<span></span>';
    const next = activeStep < 12 ? `<button class="step-move primary" type="button" data-move="${activeStep + 1}">Step ${activeStep + 1} →</button>` : '<span></span>';

    workbook.innerHTML = `<header class="step-hero"><div class="step-label">Narcotics Anonymous Step Working Guide · Step ${activeStep} of 12</div><h1 class="step-title">${escapeHtml(data.title)}</h1><blockquote class="step-quote">“${escapeHtml(data.quote)}”</blockquote></header><div class="content">${blocks}<nav class="step-footer-nav" aria-label="Previous and next step">${previous}${next}</nav></div>`;

    brandStep.textContent = data.title;
    document.title = `${data.title} · Step Working Guide`;
    stepTabs.forEach(tab => {
      tab.classList.toggle('active', Number(tab.dataset.step) === activeStep);
      if(Number(tab.dataset.step) === activeStep) tab.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
    });

    workbook.querySelectorAll('textarea').forEach(area => {
      grow(area);
      area.addEventListener('input', () => {
        localStorage.setItem(area.dataset.key, area.value);
        grow(area);
        updateProgress();
      });
    });
    workbook.querySelectorAll('[data-move]').forEach(button => button.addEventListener('click', () => switchStep(Number(button.dataset.move))));
    updateProgress();
    document.body.classList.toggle('private', privateMode);
  }

  function grow(area){
    area.style.height = 'auto';
    area.style.height = `${Math.max(154, area.scrollHeight)}px`;
  }

  function updateProgress(){
    const fields = [...workbook.querySelectorAll('textarea')];
    const answered = fields.filter(field => field.value.trim().length > 0).length;
    const total = fields.length;
    const percent = total ? Math.round(answered / total * 100) : 0;
    const overall = overallProgress();
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${answered} of ${total} in this step · ${overall.answered} of ${overall.total} overall`;
  }

  function switchStep(stepNumber){
    if(!steps[stepNumber]) return;
    activeStep = stepNumber;
    localStorage.setItem('step-working-guide:active-step', String(activeStep));
    render();
    window.scrollTo({top:0, behavior:'smooth'});
  }

  stepTabs.forEach(tab => tab.addEventListener('click', () => switchStep(Number(tab.dataset.step))));

  privacyBtn.addEventListener('click', () => {
    privateMode = !privateMode;
    document.body.classList.toggle('private', privateMode);
    privacyBtn.textContent = privateMode ? 'Show responses' : 'Hide responses';
  });

  clearBtn.addEventListener('click', () => {
    if(!confirm(`Clear all ${steps[activeStep].title} responses saved on this device?`)) return;
    Object.keys(localStorage).filter(key => key.startsWith(storagePrefix(activeStep))).forEach(key => localStorage.removeItem(key));
    render();
  });

  printBtn.addEventListener('click', () => window.print());

  render();
})();