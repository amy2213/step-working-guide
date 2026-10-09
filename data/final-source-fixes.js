(() => {
  const step3 = window.STEP_THREE;
  const step5 = window.STEP_FIVE;
  const step6 = window.STEP_SIX;
  const step7 = window.STEP_SEVEN;
  const step11 = window.STEP_ELEVEN;
  const step12 = window.STEP_TWELVE;

  const replaceParagraph = (step, contains, text) => {
    if (!step || !Array.isArray(step.blocks)) return;
    const block = step.blocks.find(item => item.type === 'paragraph' && item.text.includes(contains));
    if (block) block.text = text;
  };

  const insertParagraphBefore = (step, matcher, text) => {
    if (!step || !Array.isArray(step.blocks)) return;
    if (step.blocks.some(item => item.type === 'paragraph' && item.text === text)) return;
    const index = step.blocks.findIndex(matcher);
    if (index >= 0) step.blocks.splice(index, 0, {type:'paragraph', text});
  };

  if (step3) {
    replaceParagraph(
      step3,
      "At this point we can come to some very simple conclusions about our Higher Power's will for us:",
      "God's will for us is something we will gradually come to know as we work the steps. At this point we can come to some very simple conclusions about our Higher Power's will for us that will serve us well for the time being. It is our Higher Power's will for us to stay clean. It is our Higher Power's will for us to do things that will help us stay clean, such as going to meetings and talking to our sponsor regularly."
    );

    replaceParagraph(
      step3,
      "For us to be comfortable with allowing our Higher Power to care for our lives",
      "For us to be comfortable with allowing our Higher Power to care for our lives, we will have to develop some trust. We may have no trouble turning over our addiction, but want to remain in control of the rest of our lives. We may trust our Higher Power to care for our work lives, but not our relationships. We may trust our Higher Power to care for our partners but not our children. We may trust our Higher Power with our safety, but not our finances. Many of us have trouble letting go completely. We think we trust our Higher Power with certain areas of our lives, but immediately take back control the first time we get scared or things aren't going the way we think they should. It's necessary for us to examine our progress in turning it over."
    );

    replaceParagraph(
      step3,
      "Practicing the principle of surrender is easy for us when everything is going along as we'd like",
      "Practicing the principle of surrender is easy for us when everything is going along as we'd like-we think. Actually, when things are going smoothly, it's more likely that we are being lulled into a belief that we're in charge, which doesn't require much \"surrendering.\" Keeping the principle of surrender to the care of the God of our understanding alive in our spirits is essential, even when things are going well."
    );

    replaceParagraph(
      step3,
      "There is a spiritual progression from hope to faith to trust in the Third Step",
      "There is a spiritual progression from hope to faith to trust in the Third Step. As we begin Step Three, we carry with us the sense of hope that was born in us as we worked the Second Step. Hope springs from the knowledge that our life is full of possibilities-there are no hard certainties yet, just the first whispers of anticipation that we just may be able to fulfill our heart's deepest desires. Emerging doubts fade as hope becomes faith. Faith propels us forward into action; we actually do the work that those who have faith in us are telling us is necessary if we are to achieve what we want. In the Third Step, faith gives us the capacity to actually make a decision and carry that decision into action. Trust comes into play after faith has been applied. We have probably made significant progress toward fulfilling our goals; now we have evidence that we can influence the course of our lives through taking positive action."
    );
  }

  if (step5) {
    replaceParagraph(
      step5,
      "At some point in this process, we will probably begin calling certain patterns of behavior our",
      "At some point in this process, we will probably begin calling certain patterns of behavior our \"character defects.\" Though it won't be until the Sixth Step that we begin an in-depth examination of how each one of our defects plays a role in keeping us sick, it certainly won't hurt to begin this knowledge forming in us now."
    );
  }

  if (step6) {
    replaceParagraph(
      step6,
      "We begin working Step Six full of the hope we have developed in the first five steps",
      "We begin working Step Six full of the hope we have developed in the first five steps. If we have been thorough, we have also developed some humility. In Step Six, \"humility\" means that we're able to see ourselves more clearly. We've seen the exact nature of our wrongs. We've seen how we've harmed ourselves and others by acting on our defects of character. We've seen the patterns of our behavior, and we've come to understand how we are likely to act on the same defects over and over. Now we have to become entirely ready to have our defects of character removed."
    );

    insertParagraphBefore(
      step6,
      item => item.type === 'section' && item.title === 'Entirely Ready For What?',
      "The inventory process itself has raised our awareness about our character defects; working the Sixth Step will do so even more. To be entirely ready is to reach a spiritual state where we are not just aware of our defects, not just tired of them, not just confident that the God of our understanding will remove what should go-but all these things."
    );

    insertParagraphBefore(
      step6,
      item => item.type === 'section' && item.title === 'Entirely Ready For What?',
      "In order to become entirely ready, we'll need to address our fears about the Sixth Step. We'll also need to take a look at how our defects will be removed. The Sixth Step says that only a Higher Power can remove them, but what does that mean in practical terms? What is our responsibility in the Sixth Step? These questions, when reviewed with a sponsor, will help give us direction in working this step."
    );

    insertParagraphBefore(
      step6,
      item => item.type === 'question' && item.text.startsWith('How am I trying to remove or control my own character defects?'),
      "What we need to do in the Sixth Step is much like what we had to do in the first two steps. We have to admit that we have been defeated by an internal force that has brought nothing but pain and degradation to our lives; then, we have to admit we need help in dealing with that force. We must completely accept the fact that we cannot remove our own shortcomings, and we must prepare ourselves to ask in the Seventh Step for God to remove them for us."
    );
  }

  if (step7) {
    replaceParagraph(
      step7,
      "Many of us came to NA with a certain street mentality",
      "Many of us came to NA with a certain \"street\" mentality. The only way we knew to get what we wanted was by approaching it indirectly and manipulating people. We didn't realize that we could just be forthright and have the same chance, if not better, of fulfilling our needs. We spent years learning to blank our facial expressions, hide our compassion, and harden ourselves. By the time we arrived in NA, we were very good at it-so good, in fact, that novice addicts were probably looking to our example the same way we looked to older addicts when we first started using. We learned to suppress all humanity and became, in many cases, completely inhuman."
    );
  }

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
