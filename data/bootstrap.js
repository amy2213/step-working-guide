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
    const blocks = (source.blocks || []).map(block => {
      const b = {...block};
      if (b.sourcePage != null && b.source_pdf_page == null) b.source_pdf_page = b.sourcePage;
      delete b.sourcePage;
      return b;
    });
    window.CANONICAL_STEPS.push({
      step: source.step,
      title: source.title,
      quote: source.quote,
      blocks,
      questionCount: 0,
      sectionCount: 0,
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

  function stepByNumber(n) {
    return window.CANONICAL_STEPS.find(s => s.step === n);
  }

  function patchStepOne() {
    const step = stepByNumber(1);
    if (!step || !Array.isArray(step.blocks) || step.blocks.length < 68) return;
    const b = step.blocks;
    b[34] = {type:'paragraph', text:'We may have tried to abstain from drug use or other compulsive behaviors-perhaps with some success-for a period of time without a program, only to find that our untreated addiction eventually takes us right back to where we were before. In order to work the First Step, we need to prove our own individual powerlessness to ourselves on a deep level.', source_pdf_page:10};
    b[43] = {type:'paragraph', text:'The First Step asks us to admit two things: one, that we are powerless over our addiction; and two, that our lives have become unmanageable. Actually, we would be hard pressed to admit one and not the other. Our unmanageability is the outward evidence of our powerlessness. There are two general types of unmanageability: outward unmanageability, the kind that can be seen by others; and inner, or personal, unmanageability.', source_pdf_page:13};
    b[45] = {type:'paragraph', text:"Inner or personal unmanageability is often identified by unhealthy or untrue belief systems about ourselves, the world we live in, and the people in our lives. We may believe we're worthless. We may believe that the world revolves around us-not just that it should, but that it does. We may believe that it isn't really our job to take care of ourselves; someone else should do that. We may believe that the responsibilities the average person takes on as a matter of course are just too large a burden for us to bear. We may over or under react to events in our lives. Emotional volatility is often one of the most obvious ways in which we can identify personal unmanageability.", source_pdf_page:13};
    b[47] = {type:'question', text:'Have I ever been arrested or had legal trouble as a result of my addiction? Have I ever done anything I could have been arrested for if only I was caught? What have those things been?', source_pdf_page:14};
    b.splice(48, 2, {type:'question', text:'What trouble have I had at work or school because of my addiction? What trouble have I had with my family as a result of my addiction?', source_pdf_page:14});
    b[57] = {type:'question', text:'When in real danger, have I ever been either indifferent to that danger or somehow unable to protect myself as a result of my addiction? Describe.', source_pdf_page:17};
    b[60] = {type:'question', text:'Did I take drugs or act out on my addiction to change or suppress my feelings? What was I trying to change or suppress?', source_pdf_page:18};
    b[62] = {type:'paragraph', text:'Reservations are places in our program that we have reserved for relapse. They may be built around the idea that we can retain a small measure of control, something like, "Okay, I accept that I can\'t control my using, but I can still sell drugs, can\'t I?" Or we may think we can remain friends with the people we used with or bought drugs from. We may think that certain parts of the program don\'t apply to us. We may think there\'s something we just can\'t face clean-a serious illness, for instance, or the death of a loved one-and plan to use if it ever happens. We may think that after we\'ve accomplished some goal, made a certain amount of money, or been clean for a certain number of years, then we\'ll be able to control our using. Reservations are usually tucked away in the back of our minds; we are not fully conscious of them. It is essential that we expose any reservations we may have and cancel them, right here, right now.', source_pdf_page:19};
  }

  function patchStepFive() {
    const step = stepByNumber(5);
    if (!step || !Array.isArray(step.blocks) || step.blocks.length < 33) return;
    const b = step.blocks;
    b.splice(27, 4,
      {type:'question', text:'What qualities does my listener have that are attractive to me?', source_pdf_page:8},
      {type:'question', text:'How will his or her possession of these qualities help me make my admissions more effectively?', source_pdf_page:8},
      {type:'paragraph', text:"For most of us, developing an honest relationship is something new. We're very good at running away from relationships the first time someone tells us a painful truth. We're also good at having polite, distant interactions with no real depth. The Fifth Step helps us to develop honest relationships. We tell the truth about who we are-then, the hard part-we listen to the response. Most of us have been terrified of having a relationship like this. The Fifth Step gives us a unique opportunity to try such a relationship in a safe context. We can be pretty much assured that we won't be judged.", source_pdf_page:8},
      {type:'question', text:'Am I willing to trust the person who is to hear my Fifth Step?', source_pdf_page:9}
    );
    b.splice(32, 0, {type:'question', text:'How will working the Fifth Step help me begin to develop new ways of having relationships?', source_pdf_page:9});
  }

  function patchStepEight() {
    const step = stepByNumber(8);
    if (!step || !Array.isArray(step.blocks) || step.blocks.length < 30) return;
    const b = step.blocks;
    b.splice(20, 2,
      {type:'paragraph', text:"Finally, we get to the deeper types of harm. These types of harm may be the most damaging, for they strike at the most vulnerable places in the human heart. For instance, we had a friend. The friendship was perhaps an old one, spanning many years. Emotions, trust, even personal identity-all these were engaged in the friendship we shared. This relationship really mattered to our friend, and to us as well. Then, without explanation, because of some real or imagined slight, we withdrew from the friendship and never tried to renew it. Losing a friend is painful enough; without the added burden of not knowing why, but many of us inflicted just this type of harm on someone. We damaged that person's sense of trust, and it may have taken many years to heal. A variation on this is that we may have allowed someone to take the blame for a relationship ending when the person felt unlovable, when in reality we had just grown tired of the relationship and were too lazy to maintain it.", source_pdf_page:5},
      {type:'paragraph', text:'There are many different ways we can inflict deep emotional harm: neglect, withdrawal, exploitation, manipulation, and humiliation, to name but a few. The victims and nice people among us may find that we made others feel inferior when we passed ourselves off as better than everyone else, projecting an attitude of moral superiority. The competent and self-sufficient among us may find names for the Eighth Step list by thinking about the people whose offers of help and gestures of support we rejected.', source_pdf_page:6},
      {type:'paragraph', text:"An additional struggle that many of us face when we identify types of harm arises from an automatic tendency to focus only on the time before we stopped using. It's a little easier for us to be rigorously honest about the harm we caused in our active addiction. We were using drugs, we were different people then. However, we have all caused harm during our recovery. In fact, we've probably all caused harm to people with whom we share our recovery-other NA members. We may have gossiped about them, withdrawn from them, responded with insensitivity to their pain, interfered in a sponsorship relationship, tried to control a sponsee's behavior, behaved like an ingrate with a sponsor, stolen Seventh Tradition money, manipulated people by using our clean time as a source of credibility in a service argument, or sexually exploited a newcomer, to name a few relatively common examples. Most of us have an extremely hard time placing these situations on our Eighth", source_pdf_page:6},
      {type:'paragraph', text:"Step list because the thought of making the amends makes us so uncomfortable. We hold ourselves accountable to a higher standard of behavior around NA, and we're sure that others expect more from us, also. The fact is that our fellow NA members are likely to be especially forgiving because they know what we're trying to do-but again, we should avoid worrying about the Ninth Step now.", source_pdf_page:6}
    );
    b.splice(25, 3,
      {type:'paragraph', text:"The first thing to know is that this is not a list that we can keep in our heads. We need to put each name and what we did to harm the person down on paper. Once it's on paper, it's hard to forget anyone or go back into denial about an amends we'd rather avoid. If for some reason we can't use paper, we can use a tape recorder or any other method our sponsor has agreed will help us get the most out of this step.", source_pdf_page:7},
      {type:'paragraph', text:"When we're ready to begin our list, we sit down, recall all we've learned about harm, and start writing. Some names are going to spring to mind immediately. Others may come to mind as we think about the types of harm we have caused. We absolutely need to go back through our Fourth Step and search out any information we can extract from that.", source_pdf_page:7},
      {type:'paragraph', text:"We should include every name and situation we think of, even if we're relatively, but not entirely, sure that our sponsor is going to tell us we don't owe any amends in that particular situation. It's almost always better to delete names than to try to recall names we should have added, but didn't, when we're going over the list with our sponsor. In addition, there may be times when we remember an incident in which we caused harm, but not the names of the people involved. We can at least list the incident.", source_pdf_page:7},
      {type:'paragraph', text:"Putting ourselves on the list may seem awkward to some of us. We may have been informed in our early recovery that making amends to ourselves was a self-centered idea, that we needed to stop thinking about ourselves all the time and start thinking about the people we had harmed. Then, the whole notion of making amends to ourselves may have been confusing. Some of us probably thought that making amends should involve rewarding ourselves for staying clean or some other accomplishment. We may have tried to do this by buying ourselves things we couldn't afford, or by indulging other compulsions. In reality, the way we make amends to ourselves is by stopping irresponsible or destructive behavior. We need to identify the ways we've created our own problems-that is, harmed ourselves-through our inability to accept personal responsibility. Then, when we add ourselves to the list, we can list the harm we caused to our finances, our self-image, our health, etc.", source_pdf_page:7}
    );
  }

  patchStepOne();
  patchStepFive();
  patchStepEight();

  function reindex(step) {
    let qi = 0;
    let si = 0;
    for (const block of step.blocks || []) {
      if (block.type === 'question') {
        qi += 1;
        block.id = `step${step.step}-q${String(qi).padStart(3, '0')}`;
      } else if (block.type === 'section') {
        si += 1;
        block.id = `step${step.step}-section-${String(si).padStart(2, '0')}`;
      }
    }
    step.questionCount = qi;
    step.sectionCount = si;
  }

  window.CANONICAL_STEPS.forEach(reindex);
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
