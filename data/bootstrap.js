(() => {
  'use strict';

  window.CANONICAL_STEPS = Array.isArray(window.CANONICAL_STEPS) ? window.CANONICAL_STEPS : [];

  function patchStepTwo(step) {
    if (!step || !Array.isArray(step.blocks)) return;
    const narrative = 'Finding ourselves able to act sanely, even once, in a situation with which we were never able to deal successfully before is evidence of sanity.';
    const actualQuestion = 'Have I had any experiences like that in my recovery? What were they?';
    const idx = step.blocks.findIndex(b => b && b.text === narrative);
    if (idx >= 0) {
      step.blocks[idx] = {...step.blocks[idx], type: 'paragraph'};
      const hasQuestion = step.blocks.some(b => b && b.type === 'question' && b.text === actualQuestion);
      if (!hasQuestion) step.blocks.splice(idx + 1, 0, {type:'question', text:actualQuestion, sourcePage:16});
    }
  }

  patchStepTwo(window.STEP_TWO);

  const legacy = [window.STEP_TWO, window.STEP_THREE, window.STEP_FOUR, window.STEP_SEVEN].filter(Boolean);
  const existing = new Set(window.CANONICAL_STEPS.map(s => s.step));

  for (const source of legacy) {
    if (existing.has(source.step)) continue;
    let qi = 0;
    let si = 0;
    const blocks = (source.blocks || []).map(block => {
      const b = {...block};
      if (b.sourcePage != null && b.source_pdf_page == null) b.source_pdf_page = b.sourcePage;
      delete b.sourcePage;
      if (b.type === 'question') {
        qi += 1;
        b.id = `step${source.step}-q${String(qi).padStart(3, '0')}`;
      } else if (b.type === 'section') {
        si += 1;
        b.id = `step${source.step}-section-${String(si).padStart(2, '0')}`;
      }
      return b;
    });
    window.CANONICAL_STEPS.push({
      step: source.step,
      title: source.title,
      quote: source.quote,
      blocks,
      questionCount: qi,
      sectionCount: si,
    });
    existing.add(source.step);
  }

  if (window.CANONICAL_PARTS) {
    for (const n of [9, 10, 11, 12]) {
      if (existing.has(n)) continue;
      const part = window.CANONICAL_PARTS[n];
      if (!part || !part.meta || !Array.isArray(part.blocks)) continue;
      window.CANONICAL_STEPS.push({...part.meta, blocks: part.blocks});
      existing.add(n);
    }
  }

  window.CANONICAL_STEPS.sort((a, b) => a.step - b.step);

  const questionTotal = window.CANONICAL_STEPS.reduce((sum, s) => sum + (s.questionCount || 0), 0);
  const sectionTotal = window.CANONICAL_STEPS.reduce((sum, s) => sum + (s.sectionCount || 0), 0);
  if (window.CANONICAL_STEPS.length !== 12 || questionTotal !== 460 || sectionTotal !== 86) {
    console.error('Canonical workbook validation failed', {
      steps: window.CANONICAL_STEPS.length,
      questions: questionTotal,
      sections: sectionTotal,
    });
  }
})();
