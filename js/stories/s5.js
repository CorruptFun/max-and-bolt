/* Season 5 — 5th grade. Figurative language, longer paragraphs, mixed feelings. ~400–440 words. */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s5e1", season: 5, num: 1, title: "The Time Capsule",
    blurb: "A time machine that only goes forward, one year per year. Also: a cookie tin from 1998.",
    cover: { bg: "yard", cast: [{ who: "bolt", mood: "excited", pose: "hold", x: 35 }, { who: "max", mood: "surprised", x: 70, flip: true }], props: [{ e: "🪣", x: 35, y: 78, s: 50 }, { e: "📼", x: 70, y: 40, s: 40 }] },
    vocab: { exception: "Someone or something the rule does not apply to.", brilliant: "Extremely clever.", hollow: "Empty inside.", horror: "A feeling of shock and dread.", sealed: "Closed up tight so nothing gets in or out." },
    pages: [
      { art: { bg: "garage", cast: [{ who: "max", mood: "think", pose: "think", x: 35 }, { who: "bolt", mood: "sly", pose: "hips", x: 70, flip: true }], props: [{ e: "⏰", x: 12, y: 40, s: 40 }] },
        lines: [{ n: "Every inventor dreams of building a time machine, and Max was no exception. The trouble was that time machines were, as far as anyone knew, impossible. Bolt did not care about impossible." }, { w: "bolt", t: "We built me, and I am basically impossible." }, { n: "It was hard to argue with that." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "love", pose: "hold", x: 70, flip: true }], props: [{ e: "🪣", x: 50, y: 78, s: 56 }, { e: "⏰", x: 42, y: 62, s: 26 }, { e: "🥄", x: 70, y: 62, s: 26 }] },
        lines: [{ n: "They started with a plastic tub, because all great inventions start with a plastic tub. Max added a clock, three wires that went nowhere, and a dial that said PAST on one side and FUTURE on the other. Bolt added a spoon. When asked why, he said the spoon was 'for luck,' and then he hid it in the tub before anyone could take it back." }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "excited", pose: "point", x: 30 }, { who: "bolt", mood: "surprised", x: 70, flip: true }], props: [{ e: "🪣", x: 50, y: 82, s: 50 }, { e: "🕳️", x: 50, y: 92, s: 60 }] },
        lines: [{ w: "max", t: "A time machine has to travel through time. So we bury it, and in ten years we dig it up, and it will have traveled ten years into the future." }, { n: "Bolt looked at {him} with something like respect." }, { w: "bolt", t: "That is either brilliant or cheating. I love it." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "think", pose: "hold", x: 40 }], props: [{ e: "⛏️", x: 40, y: 60, s: 36 }, { e: "🕳️", x: 70, y: 90, s: 70 }] },
        math: { intro: "How deep should the hole be?", q: "They dig a hole 2.5 feet deep. The tub is 1.25 feet tall. How much dirt will cover the top of the tub?", answer: "1.25 feet", choices: ["1.25 feet", "1.5 feet", "2.5 feet", "3.75 feet"], hint: "Take the tub's height away from the hole's depth: 2.5 − 1.25.", success: "One and a quarter feet of dirt. Enough to hide it from Zoe, which was the real goal." } },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "surprised", pose: "hold", x: 45 }, { who: "max", mood: "surprised", x: 78, flip: true }], props: [{ e: "⛏️", x: 45, y: 58, s: 36 }, { e: "🕳️", x: 45, y: 92, s: 70 }], fx: "shake" },
        lines: [{ n: "Digging was Bolt's job, since his claws were built for it, or at least he claimed they were. Two feet down, the shovel hit something with a hollow CLONK. Bolt froze." }, { w: "bolt", t: "Treasure." }, { n: "he whispered, his eyes glowing brighter than a traffic light." }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "think", pose: "hold", x: 35 }, { who: "bolt", mood: "worried", x: 70, flip: true }], props: [{ e: "🍪", x: 35, y: 60, s: 36 }, { e: "📼", x: 60, y: 76, s: 30 }, { e: "📷", x: 76, y: 76, s: 30 }, { e: "✉️", x: 50, y: 88, s: 30 }] },
        lines: [{ n: "It was not treasure. It was a rusty cookie tin sealed with old tape, and it was heavier than it should have been. Inside were a cassette tape, a friendship bracelet, a photo of two girls with enormous hair, and a folded letter that began: 'To whoever finds this in the year 2020...'" }] },
      { art: { bg: "tree", cast: [{ who: "max", mood: "surprised", pose: "hold", x: 35, y: 56, scale: .8 }, { who: "bolt", mood: "sly", x: 62, y: 56, scale: .8, flip: true }], props: [{ e: "✉️", x: 35, y: 40, s: 30 }, { e: "🐱", x: 85, y: 30, s: 30 }] },
        lines: [{ n: "The letter was signed by someone named Jenny, age ten, who lived in this exact house and wanted the finder to know three things. One, the loose board in the treehouse was a secret hiding spot. Two, the neighbor's cat was 'definitely up to something.' Three, do not trust boys named Kevin." }] },
      { art: { bg: "kitchen", cast: [{ who: "mom", mood: "laugh", pose: "hold", x: 40 }, { who: "max", mood: "worried", x: 75, flip: true }], props: [{ e: "🍪", x: 40, y: 58, s: 34 }, { e: "💧", x: 30, y: 46, s: 18 }], fx: "hearts" },
        lines: [{ n: "Max brought the tin inside, and Mom went very quiet when she saw it. Then she laughed, and then, to Max's horror, she cried a little, and then she laughed again." }, { w: "mom", t: "Jenny was my best friend. We buried that the summer before we moved. I forgot it was even here." }] },
      { art: { bg: "kitchen", cast: [{ who: "mom", mood: "happy", x: 40 }, { who: "max", mood: "think", pose: "think", x: 75, flip: true }], props: [{ e: "📅", x: 15, y: 50, s: 40 }] },
        math: { intro: "Max did some quick math.", q: "Mom buried the tin 28 years ago, in 1998. What year is it now in the story?", answer: "2026", choices: ["2020", "2026", "2028", "2036"], hint: "Add 28 to 1998. 1998 + 2 = 2000, then 26 more.", success: "2026. 'So Jenny's letter was six years late,' Max said. 'Time machines,' said Bolt, 'are unreliable.'" } },
      { art: { bg: "tree", cast: [{ who: "max", mood: "surprised", pose: "point", x: 35, y: 56, scale: .8 }, { who: "bolt", mood: "surprised", x: 62, y: 56, scale: .8, flip: true }], props: [{ e: "🪵", x: 50, y: 62, s: 30 }, { e: "❓", x: 50, y: 40, s: 40 }], fx: "sparkle" },
        lines: [{ n: "That night, Max and Bolt wrote their own letter, sealed it with the spoon, and buried the tub next to the hole. Max wrote about rockets and shrink rays. Bolt wrote one sentence: 'The cat is a spy. Jenny was right.' Then they checked the loose board in the treehouse. It was not empty." }] },
    ],
    quiz: [
      { q: "How was Max's time machine supposed to 'travel'?", c: ["By rocket", "By burying it and waiting", "By spinning the dial", "It never worked"], a: 1 },
      { q: "Who wrote the letter in the cookie tin?", c: ["Zoe", "Mr. Whiskers", "Jenny, Mom's best friend", "Dr. Dullsworth"], a: 2 },
      { q: "Why did Mom laugh and cry at the same time?", c: ["The tin was heavy", "It brought back happy memories she had forgotten", "Max was in trouble", "She was tired"], a: 1 },
    ],
  });

  S.push({
    id: "s5e2", season: 5, num: 2, title: "Bolt's Jetpack",
    blurb: "Forty drawings. One Safety Officer with a clipboard. Ten feet, no higher. Sure.",
    cover: { bg: "yard", cast: [{ who: "bolt", mood: "excited", pose: "cheer", x: 50, y: 55 }], props: [{ e: "🔥", x: 44, y: 68, s: 40 }, { e: "🔥", x: 56, y: 68, s: 40 }], fx: "whoosh" },
    vocab: { subtle: "Not obvious; quiet about it.", suspiciously: "In a way that makes you wonder what is really going on.", condition: "A rule that must be followed for a deal to happen.", wobbling: "Moving unsteadily from side to side.", roared: "Made a loud, deep sound." },
    pages: [
      { art: { bg: "room", cast: [{ who: "bolt", mood: "love", pose: "point", x: 40 }, { who: "max", mood: "sleepy", x: 78, flip: true }], props: [{ e: "🖼️", x: 15, y: 30, s: 36 }, { e: "🖼️", x: 30, y: 25, s: 36 }, { e: "🖼️", x: 60, y: 28, s: 36 }, { e: "🖼️", x: 88, y: 24, s: 36 }] },
        lines: [{ n: "Bolt had wanted a jetpack for exactly as long as he had known what a jetpack was, which was eleven days. Since then he had drawn forty pictures of himself flying, taped them to every wall, and started calling Max 'my future jetpack builder.' It was not subtle." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "worried", pose: "point", x: 30 }, { who: "bolt", mood: "happy", pose: "hold", x: 70, flip: true }], props: [{ e: "🌈", x: 70, y: 56, s: 40 }] },
        lines: [{ w: "max", t: "Jetpacks are dangerous. You could crash. You could catch fire. You could fly into Dr. Dullsworth's house, and then we would have to move." }, { n: "{He} sounded suspiciously like Mom. Bolt held up a drawing of himself flying over a rainbow." }, { w: "bolt", t: "Or... this." }] },
      { art: { bg: "garage", cast: [{ who: "zoe", mood: "sly", pose: "hold", x: 30 }, { who: "max", mood: "think", x: 62, flip: true }, { who: "bolt", mood: "excited", x: 85, flip: true, scale: .9 }], props: [{ e: "📋", x: 30, y: 58, s: 34 }] },
        lines: [{ n: "Max gave in, as {he} always did, but with a rule: every part would be tested before Bolt went anywhere near the sky. Zoe was hired as Safety Officer, a job she accepted on the condition that she could say 'I told you so' as many times as she wanted. She got a clipboard. She was thrilled." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "think", pose: "hold", x: 40 }], props: [{ e: "🧪", x: 40, y: 60, s: 36 }, { e: "🥤", x: 70, y: 74, s: 34 }, { e: "🥤", x: 80, y: 74, s: 34 }, { e: "🥤", x: 90, y: 74, s: 34 }] },
        math: { intro: "Max measured the fuel.", q: "The jetpack needs 3/4 of a tank to fly for one minute. The tank holds 4 cups. How many cups is 3/4 of the tank?", answer: "3 cups", choices: ["1 cup", "2 cups", "3 cups", "4 cups"], hint: "Split 4 cups into 4 equal parts. Each part is 1 cup. Three parts is 3 cups.", success: "Three cups. Bolt asked if the fuel could be lemonade. It could not." } },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "surprised", pose: "up", x: 25 }, { who: "max", mood: "worried", x: 60, flip: true }], props: [{ e: "📋", x: 45, y: 20, s: 34, r: 40 }, { e: "🥔", x: 82, y: 70, s: 44 }, { e: "💨", x: 40, y: 55, s: 40 }], fx: "zap" },
        lines: [{ n: "Test one: the fans. They worked so well that they blew Zoe's clipboard over the fence. Test two: the straps. They held, although the test dummy, a sack of potatoes wearing Bolt's antenna, did not survive. Test three: the fuel. Nobody talks about test three." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "excited", pose: "hips", x: 40 }, { who: "max", mood: "worried", pose: "point", x: 75, flip: true }], props: [{ e: "🎒", x: 40, y: 74, s: 40 }] },
        lines: [{ n: "By Friday the jetpack was ready, which is to say it had passed every test and Zoe had run out of things to write down. Bolt strapped it on. His eyes were doing the thing where they glowed so bright they buzzed." }, { w: "max", t: "Ten feet. No higher." }, { w: "bolt", t: "Ten feet." }, { n: "Bolt agreed, in a voice that meant nothing of the kind." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "surprised", pose: "up", x: 50, y: 45 }, { who: "max", mood: "surprised", x: 20, scale: .8 }, { who: "zoe", mood: "worried", x: 82, flip: true, scale: .8 }], props: [{ e: "🔥", x: 44, y: 58, s: 36 }, { e: "🔥", x: 56, y: 58, s: 36 }], fx: "whoosh" },
        lines: [{ n: "The fans roared. Bolt rose one foot, then five, then ten, then stopped exactly where he promised, wobbling like a balloon on a string. For a full minute, he simply hung there, looking at the yard from above, and said nothing at all. It was the quietest anyone had ever seen him." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "worried", pose: "up", x: 60, y: 96 }, { who: "zoe", mood: "laugh", pose: "point", x: 25 }], props: [{ e: "💦", x: 60, y: 70, s: 60 }, { e: "🛟", x: 60, y: 96, s: 90 }], fx: "splat" },
        lines: [{ w: "bolt", t: "It's small. The yard. From up here it's so small." }, { n: "Then a fan coughed, and he dropped into the kiddie pool with a splash that soaked everyone, including the clipboard, which had returned. Zoe said 'I told you so' twice, but she was smiling when she said it." }] },
      { art: { bg: "garage", cast: [{ who: "bolt", mood: "happy", pose: "hold", x: 40 }, { who: "max", mood: "happy", x: 75, flip: true }], props: [{ e: "🖼️", x: 40, y: 58, s: 40 }, { e: "📦", x: 88, y: 78, s: 40 }] },
        lines: [{ n: "Bolt dried off in the sun and drew one more picture, his forty-first. It was the yard from ten feet up, with three tiny people looking up at him. Under it he wrote: 'Worth it.' Max hung it in the garage, right next to the box that said DO NOT." }] },
    ],
    quiz: [
      { q: "What was Zoe's job?", c: ["Pilot", "Safety Officer", "Fuel mixer", "Artist"], a: 1 },
      { q: "How high did Max say Bolt could fly?", c: ["Ten feet", "Ten miles", "As high as the roof", "Over the rainbow"], a: 0 },
      { q: "Why was Bolt so quiet in the air?", c: ["The jetpack was too loud", "He was scared", "He was amazed at how small the yard looked", "His battery was low"], a: 2 },
    ],
  });
})();
