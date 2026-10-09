(() => {
  const data = window.STEP_ONE;
  const workbook = document.getElementById('workbook');
  const privacyBtn = document.getElementById('privacyBtn');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const clearBtn = document.getElementById('clearBtn');
  const printBtn = document.getElementById('printBtn');
  const storagePrefix = 'step-working-guide:v1:step1:';
  let privateMode = false;
  let questionIndex = 0;

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));

  function answerKey(index){ return `${storagePrefix}q${index}`; }

  function render(){
    questionIndex = 0;
    const blocks = data.blocks.map(block => {
      if(block.type === 'paragraph'){
        return `<p class="reading">${escapeHtml(block.text)}</p>`;
      }
      if(block.type === 'section'){
        return `<section class="section-heading"><div class="section-eyebrow">Step One</div><h2>${escapeHtml(block.title)}</h2><span class="source-ref">Source page ${block.sourcePage}</span></section>`;
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
      return '';
    }).join('');

    workbook.innerHTML = `<header class="step-hero"><div class="step-label">Narcotics Anonymous Step Working Guide</div><h1 class="step-title">${escapeHtml(data.title)}</h1><blockquote class="step-quote">“${escapeHtml(data.quote)}”</blockquote></header><div class="content">${blocks}</div>`;

    workbook.querySelectorAll('textarea').forEach(area => {
      grow(area);
      area.addEventListener('input', () => {
        localStorage.setItem(area.dataset.key, area.value);
        grow(area);
        updateProgress();
      });
    });
    updateProgress();
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
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${answered} of ${total} reflections answered`;
  }

  privacyBtn.addEventListener('click', () => {
    privateMode = !privateMode;
    document.body.classList.toggle('private', privateMode);
    privacyBtn.textContent = privateMode ? 'Show responses' : 'Hide responses';
  });

  clearBtn.addEventListener('click', () => {
    if(!confirm('Clear all Step One responses saved on this device?')) return;
    Object.keys(localStorage).filter(key => key.startsWith(storagePrefix)).forEach(key => localStorage.removeItem(key));
    render();
  });

  printBtn.addEventListener('click', () => window.print());

  render();
})();
