/* Source-fidelity corrections found during visual QA against the supplied PDF.
   This file intentionally patches existing step data without changing stored answer keys. */
(function(){
  function replaceParagraph(step, contains, text){
    if(!step || !Array.isArray(step.blocks)) return;
    const block = step.blocks.find(b => b.type === 'paragraph' && b.text.includes(contains));
    if(block) block.text = text;
  }

  replaceParagraph(
    window.STEP_THREE,
    "At this point we can come to some very simple conclusions about our Higher Power's will for us:",
    "God's will for us is something we will gradually come to know as we work the steps. At this point we can come to some very simple conclusions about our Higher Power's will for us that will serve us well for the time being. It is our Higher Power's will for us to stay clean. It is our Higher Power's will for us to do things that will help us stay clean, such as going to meetings and talking to our sponsor regularly."
  );

  replaceParagraph(
    window.STEP_THREE,
    "For us to be comfortable with allowing our Higher Power to care for our lives",
    "For us to be comfortable with allowing our Higher Power to care for our lives, we will have to develop some trust. We may have no trouble turning over our addiction, but want to remain in control of the rest of our lives. We may trust our Higher Power to care for our work lives, but not our relationships. We may trust our Higher Power to care for our partners but not our children. We may trust our Higher Power with our safety, but not our finances. Many of us have trouble letting go completely. We think we trust our Higher Power with certain areas of our lives, but immediately take back control the first time we get scared or things aren't going the way we think they should. It's necessary for us to examine our progress in turning it over."
  );

  replaceParagraph(
    window.STEP_THREE,
    "Practicing the principle of surrender is easy for us when everything is going along as we'd like",
    "Practicing the principle of surrender is easy for us when everything is going along as we'd like-we think. Actually, when things are going smoothly, it's more likely that we are being lulled into a belief that we're in charge, which doesn't require much \"surrendering.\" Keeping the principle of surrender to the care of the God of our understanding alive in our spirits is essential, even when things are going well."
  );

  replaceParagraph(
    window.STEP_THREE,
    "There is a spiritual progression from hope to faith to trust in the Third Step",
    "There is a spiritual progression from hope to faith to trust in the Third Step. As we begin Step Three, we carry with us the sense of hope that was born in us as we worked the Second Step. Hope springs from the knowledge that our life is full of possibilities-there are no hard certainties yet, just the first whispers of anticipation that we just may be able to fulfill our heart's deepest desires. Emerging doubts fade as hope becomes faith. Faith propels us forward into action; we actually do the work that those who have faith in us are telling us is necessary if we are to achieve what we want. In the Third Step, faith gives us the capacity to actually make a decision and carry that decision into action. Trust comes into play after faith has been applied. We have probably made significant progress toward fulfilling our goals; now we have evidence that we can influence the course of our lives through taking positive action."
  );
})();
