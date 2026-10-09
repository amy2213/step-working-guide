(() => {
  const step11 = window.STEP_ELEVEN;
  const step12 = window.STEP_TWELVE;

  if (step11) {
    const prayerIntro = step11.blocks.find(block =>
      block.type === 'question' && block.text.startsWith('How often should we pray? Many of us set aside')
    );
    if (prayerIntro) prayerIntro.type = 'paragraph';
  }

  if (step12) {
    const narrative = step12.blocks.find(block =>
      block.type === 'question' && block.text.startsWith("We can't be all things to all people")
    );
    if (narrative) narrative.type = 'paragraph';

    const missingPromptText = 'What kind of service work am I doing to carry the message?';
    const alreadyPresent = step12.blocks.some(block => block.type === 'question' && block.text === missingPromptText);
    if (!alreadyPresent) {
      const insertBefore = step12.blocks.findIndex(block =>
        block.type === 'question' && block.text.startsWith('What are the different ways of carrying the message?')
      );
      const prompt = {type:'question', text:missingPromptText, sourcePage:91};
      if (insertBefore >= 0) step12.blocks.splice(insertBefore, 0, prompt);
      else step12.blocks.push(prompt);
    }
  }
})();
