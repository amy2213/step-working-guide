(() => {
  'use strict';

  const steps = Array.isArray(window.CANONICAL_STEPS) ? window.CANONICAL_STEPS : [];
  if (steps.length !== 12) {
    document.body.innerHTML = '<main class="fatal"><h1>Workbook data failed to load.</h1><p>Please refresh the page.</p></main>';
    throw new Error(`Expected 12 canonical steps, found ${steps.length}`);
  }

  const STORAGE_PREFIX = 'step-working-guide:v1:';
  const state = { step: 1, hidden: false };
  const memoryStore = new Map();

  function storageGet(key) {
    try { return window.localStorage.getItem(key); }
    catch { return memoryStore.has(key) ? memoryStore.get(key) : null; }
  }
  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); }
    catch { memoryStore.set(key, value); }
  }
  function storageRemove(key) {
    try { window.localStorage.removeItem(key); }
    catch { memoryStore.delete(key); }
  }

  const el = {
    workbook: document.getElementById('workbook'),
    stepNav: document.getElementById('stepNav'),
    brandStep: document.getElementById('brandStep'),
    privacyBtn: document.getElementById('privacyBtn'),
    exportBtn: document.getElementById('exportBtn'),
    importFile: document.getElementById('importFile'),
    printBtn: document.getElementById('printBtn'),
    clearBtn: document.getElementById('clearBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    overallProgressText: document.getElementById('overallProgressText'),
    progressBar: document.querySelector('.progress-bar'),
  };

  const storageKey = id => `${STORAGE_PREFIX}${id}`;
  const getValue = id => storageGet(storageKey(id)) || '';
  const setValue = (id, value) => storageSet(storageKey(id), value);

  function answerIds(step) {
    return step.blocks.filter(b => b.type === 'question').map(b => b.id);
  }

  function allAnswerIds() {
    return steps.flatMap(answerIds);
  }

  function readHashStep() {
    const m = location.hash.match(/^#step-(\d{1,2})$/);
    if (!m) return 1;
    const n = Number(m[1]);
    return n >= 1 && n <= 12 ? n : 1;
  }

  function setStep(stepNumber, {pushHash = true, scroll = true} = {}) {
    const n = Math.min(12, Math.max(1, Number(stepNumber) || 1));
    state.step = n;
    if (pushHash && location.hash !== `#step-${n}`) history.replaceState(null, '', `#step-${n}`);
    render();
    if (scroll) window.scrollTo({top: 0, behavior: 'instant'});
  }

  function buildStepNav() {
    el.stepNav.replaceChildren();
    steps.forEach(step => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'step-tab';
      b.dataset.step = String(step.step);
      b.textContent = String(step.step);
      b.setAttribute('aria-label', step.title);
      b.addEventListener('click', () => setStep(step.step));
      el.stepNav.appendChild(b);
    });
  }

  function create(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function autoGrow(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(124, textarea.scrollHeight)}px`;
  }

  function questionCard(block, number) {
    const card = create('section', 'question-card');
    const head = create('div', 'question-head');
    const badge = create('span', 'question-number', String(number));
    const qwrap = create('div', 'question-copy');
    qwrap.append(create('div', 'question-label', 'REFLECTION'));
    const question = create('h3', 'question-text', block.text);
    qwrap.append(question);
    head.append(badge, qwrap);

    const label = create('label', 'response-label', 'YOUR RESPONSE');
    label.htmlFor = block.id;
    const area = document.createElement('textarea');
    area.className = 'response-field';
    area.id = block.id;
    area.dataset.questionId = block.id;
    area.value = getValue(block.id);
    area.placeholder = 'Write your response here...';
    area.setAttribute('aria-label', `Response to: ${block.text}`);
    area.addEventListener('input', () => {
      setValue(block.id, area.value);
      autoGrow(area);
      updateProgress();
    });
    queueMicrotask(() => autoGrow(area));

    card.append(head, label, area);
    return card;
  }

  function render() {
    const step = steps[state.step - 1];
    el.brandStep.textContent = step.title;
    document.title = `${step.title} | Interactive Step Working Guide`;

    [...el.stepNav.querySelectorAll('.step-tab')].forEach(b => {
      const active = Number(b.dataset.step) === state.step;
      b.classList.toggle('active', active);
      b.setAttribute('aria-current', active ? 'step' : 'false');
    });

    el.workbook.replaceChildren();

    const hero = create('header', 'step-hero');
    hero.append(create('div', 'step-eyebrow', `STEP ${state.step} OF 12`));
    hero.append(create('h1', 'step-title', step.title));
    const quote = create('blockquote', 'step-quote', step.quote);
    hero.append(quote);
    const meta = create('div', 'step-meta');
    meta.innerHTML = `<span>${step.sectionCount} sections</span><span>${step.questionCount} reflections</span><span>Source-verified v1.0</span>`;
    hero.append(meta);
    el.workbook.append(hero);

    let qnum = 0;
    const sectionBlocks = step.blocks.filter(b => b.type === 'section');
    if (sectionBlocks.length) {
      const sectionNav = create('nav', 'section-index');
      sectionNav.setAttribute('aria-label', `${step.title} sections`);
      sectionNav.append(create('div', 'section-index-title', 'In this step'));
      const links = create('div', 'section-index-links');
      sectionBlocks.forEach(s => {
        const a = create('a', '', s.title);
        a.href = `#${s.id}`;
        links.append(a);
      });
      sectionNav.append(links);
      el.workbook.append(sectionNav);
    }

    step.blocks.forEach(block => {
      if (block.type === 'paragraph') {
        el.workbook.append(create('p', 'body-copy', block.text));
      } else if (block.type === 'section') {
        const wrap = create('section', 'section-heading');
        wrap.id = block.id;
        wrap.append(create('div', 'section-eyebrow', step.title.toUpperCase()));
        wrap.append(create('h2', '', block.title));
        el.workbook.append(wrap);
      } else if (block.type === 'question') {
        qnum += 1;
        el.workbook.append(questionCard(block, qnum));
      }
    });

    el.workbook.classList.toggle('responses-hidden', state.hidden);
    el.privacyBtn.textContent = state.hidden ? 'Show responses' : 'Hide responses';
    el.privacyBtn.setAttribute('aria-pressed', state.hidden ? 'true' : 'false');
    el.prevBtn.disabled = state.step === 1;
    el.nextBtn.disabled = state.step === 12;
    updateProgress();
  }

  function updateProgress() {
    const step = steps[state.step - 1];
    const ids = answerIds(step);
    const answered = ids.filter(id => getValue(id).trim().length > 0).length;
    const all = allAnswerIds();
    const overall = all.filter(id => getValue(id).trim().length > 0).length;
    const pct = ids.length ? Math.round(answered / ids.length * 100) : 0;
    el.progressText.textContent = `${answered} of ${ids.length} reflections answered in this step`;
    el.overallProgressText.textContent = `${overall} of ${all.length} overall`;
    el.progressFill.style.width = `${pct}%`;
    el.progressBar.setAttribute('aria-valuenow', String(pct));
  }

  function exportAnswers() {
    const answers = {};
    allAnswerIds().forEach(id => {
      const value = getValue(id);
      if (value) answers[id] = value;
    });
    const payload = {
      format: 'step-working-guide-responses',
      version: 1,
      exportedAt: new Date().toISOString(),
      answers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `step-working-guide-responses-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importAnswers(file) {
    if (!file) return;
    let data;
    try {
      data = JSON.parse(await file.text());
    } catch {
      alert('That file is not valid JSON.');
      return;
    }
    if (!data || data.format !== 'step-working-guide-responses' || typeof data.answers !== 'object') {
      alert('That file is not a Step Working Guide response export.');
      return;
    }
    const valid = new Set(allAnswerIds());
    let imported = 0;
    Object.entries(data.answers).forEach(([id, value]) => {
      if (valid.has(id) && typeof value === 'string') {
        setValue(id, value);
        imported += 1;
      }
    });
    render();
    alert(`Imported ${imported} saved response${imported === 1 ? '' : 's'}.`);
  }

  function clearCurrentStep() {
    const step = steps[state.step - 1];
    if (!confirm(`Clear all saved responses for ${step.title}? This cannot be undone unless you exported a backup.`)) return;
    answerIds(step).forEach(id => storageRemove(storageKey(id)));
    render();
  }

  el.privacyBtn.addEventListener('click', () => {
    state.hidden = !state.hidden;
    render();
  });
  el.exportBtn.addEventListener('click', exportAnswers);
  el.importFile.addEventListener('change', async e => {
    await importAnswers(e.target.files?.[0]);
    e.target.value = '';
  });
  el.printBtn.addEventListener('click', () => window.print());
  el.clearBtn.addEventListener('click', clearCurrentStep);
  el.prevBtn.addEventListener('click', () => setStep(state.step - 1));
  el.nextBtn.addEventListener('click', () => setStep(state.step + 1));
  window.addEventListener('hashchange', () => {
    const n = readHashStep();
    if (n !== state.step) setStep(n, {pushHash: false});
  });

  buildStepNav();
  setStep(readHashStep(), {pushHash: !location.hash, scroll: false});
})();
