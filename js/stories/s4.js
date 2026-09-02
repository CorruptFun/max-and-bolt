/* Season 4 — 4th grade. Complex sentences (because/although/while/until), inference, richer description. ~300–340 words. */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s4e1", season: 4, num: 1, title: "Blackout",
    blurb: "The power is out, Bolt is at twelve percent, and Zoe's bike is about to become very important.",
    cover: { bg: "room", cast: [{ who: "max", mood: "worried", pose: "hold", x: 35 }, { who: "bolt", mood: "worried", x: 68, flip: true }], props: [{ e: "🕯️", x: 35, y: 60, s: 30 }], fx: "dark" },
    vocab: { rattled: "Shook with a clattering sound.", dynamo: "A small machine that makes electricity when it spins.", flickered: "Blinked on and off quickly.", braced: "Got ready for something unpleasant.", grumpy: "In a bad mood." },
    pages: [
      { art: { bg: "room", cast: [{ who: "max", mood: "surprised", pose: "hold", x: 40 }, { who: "bolt", mood: "surprised", x: 72, flip: true }], props: [{ e: "📖", x: 40, y: 62, s: 30 }, { e: "⚡", x: 15, y: 20, s: 50 }], fx: "rain" },
        lines: [{ n: "The storm arrived at 8:15, right after Mom said goodnight and right before Max finished {his} comic. Thunder rattled the windows so hard that the rocket posters flapped against the wall. Then, with a sad little click, every light in the house went out." }] },
      { art: { bg: "room", cast: [{ who: "bolt", mood: "worried", pose: "hips", x: 50 }], fx: "dark" },
        lines: [{ w: "bolt", t: "This is fine." }, { n: "said Bolt from the dark. His eyes glowed green, which was helpful for seeing and terrible for sleeping." }, { w: "bolt", t: "I have a flashlight built in. I have music. I have a battery that will last for..." }, { n: "He paused." }, { w: "bolt", t: "Twelve percent." }] },
      { art: { bg: "room", cast: [{ who: "max", mood: "worried", pose: "think", x: 35 }, { who: "bolt", mood: "sleepy", x: 70, flip: true }], props: [{ e: "🪫", x: 70, y: 40, s: 40 }], fx: "dark" },
        lines: [{ n: "Twelve percent was not a lot. Bolt could not charge without power, and without charge, Bolt would shut down until morning. Max had seen it happen once. Bolt woke up grumpy and missing three hours of memories, which he blamed on Zoe." }] },
      { art: { bg: "room", cast: [{ who: "bolt", mood: "worried", x: 50 }], props: [{ e: "🪫", x: 50, y: 36, s: 44 }], fx: "dark" },
        math: { intro: "Max did the math in {his} head.", q: "Bolt's battery drains 4 percent every hour. He has 12 percent left. How many hours until he shuts down?", answer: "3", choices: ["2", "3", "4", "48"], hint: "How many 4s fit in 12? 4, 8, 12. That is three.", success: "Three hours. Max looked at the clock. It was going to be a long night." } },
      { art: { bg: "garage", cast: [{ who: "max", mood: "think", pose: "hold", x: 30 }, { who: "bolt", mood: "worried", x: 60, flip: true }], props: [{ e: "🕯️", x: 30, y: 62, s: 30 }, { e: "🚲", x: 84, y: 82, s: 70 }], fx: "dark" },
        lines: [{ n: "Max lit a candle, which Mom had said never to do, and carried Bolt to the garage. Although the flashlight in Bolt's chest was bright, it also used battery, so they moved quickly. Zoe's bike leaned in the corner. Its front wheel had a little dynamo that powered the headlight when you pedaled." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "excited", pose: "point", x: 30 }, { who: "bolt", mood: "mad", x: 72, flip: true }], props: [{ e: "🚲", x: 50, y: 82, s: 70 }, { e: "🔌", x: 62, y: 60, s: 30 }], fx: "dark" },
        lines: [{ w: "max", t: "If pedaling makes light, then pedaling makes power." }, { n: "{He} clipped two wires from the dynamo to Bolt's charging port, which Bolt did not enjoy, and started to pedal. Nothing happened. {He} pedaled faster. Bolt's eyes flickered." }] },
      { art: { bg: "garage", cast: [{ who: "zoe", mood: "mad", pose: "point", x: 22 }, { who: "max", mood: "worried", x: 60, flip: true }, { who: "bolt", mood: "sleepy", x: 84, flip: true, scale: .9 }], props: [{ e: "🔦", x: 22, y: 60, s: 30 }, { e: "🚲", x: 60, y: 84, s: 60 }], fx: "dark" },
        lines: [{ w: "zoe", t: "You are in my garage, on my bike, with a candle." }, { n: "Zoe stood in the doorway in her raincoat, holding a real flashlight. Max braced for yelling. Instead, she sighed, climbed on, and began to pedal like she was in a race." }] },
      { art: { bg: "garage", cast: [{ who: "zoe", mood: "mad", pose: "hold", x: 40 }], props: [{ e: "🚲", x: 40, y: 84, s: 70 }, { e: "🔋", x: 78, y: 50, s: 44 }], fx: "speed" },
        math: { intro: "Zoe pedaled hard.", q: "Zoe pedals for 25 minutes. Every 5 minutes adds 2 percent of battery. How much battery does she add?", answer: "10", choices: ["5", "10", "12", "50"], hint: "25 minutes is five groups of 5. Five groups of 2 percent is 10.", success: "Ten percent! Bolt's eyes stopped flickering and started glowing." } },
      { art: { bg: "garage", cast: [{ who: "zoe", mood: "sleepy", x: 25 }, { who: "max", mood: "happy", pose: "wave", x: 55 }, { who: "bolt", mood: "sleepy", x: 82, flip: true }], props: [{ e: "💡", x: 50, y: 15, s: 50 }], fx: "sparkle" },
        lines: [{ n: "By the time the lights came back on, Bolt was at 23 percent, Zoe's legs were jelly, and Max had learned two things. First, dynamos work. Second, {his} sister was a lot more than a person who yelled 'MOM.' Bolt learned nothing. He fell asleep and blamed Zoe for it in the morning." }] },
    ],
    quiz: [
      { q: "Why did Bolt's low battery matter so much?", c: ["He would explode", "He would shut down and lose memories", "He would get louder", "Mom would find out"], a: 1 },
      { q: "What did Max use to charge Bolt?", c: ["A candle", "A phone", "The bike's dynamo", "The storm"], a: 2 },
      { q: "What did Max learn about Zoe?", c: ["She likes bikes", "She helps when it really counts", "She is afraid of storms", "She hates Bolt"], a: 1 },
    ],
  });

  S.push({
    id: "s4e2", season: 4, num: 2, title: "The Quiet-inator",
    blurb: "Dr. Dullsworth has a machine that turns every sound into a hum. Bolt has never been this upset.",
    cover: { bg: "street", cast: [{ who: "dull", mood: "sly", pose: "point", x: 70, flip: true }, { who: "bolt", mood: "mad", pose: "up", x: 30 }], props: [{ e: "📡", x: 88, y: 30, s: 60 }] },
    vocab: { suffered: "Put up with something painful or annoying.", satellite: "A machine that circles Earth, or a dish that talks to one.", reasoned: "Figured out by thinking step by step.", echoed: "Bounced back as a repeated sound.", stumbled: "Tripped or walked unsteadily." },
    pages: [
      { art: { bg: "street", cast: [{ who: "dull", mood: "mad", pose: "hips", x: 50 }], props: [{ e: "📬", x: 85, y: 78, s: 40 }] },
        lines: [{ n: "Dr. Dullsworth hated three things: noise, fun, and children, in that order. He lived in the gray house next door, where the grass was cut in perfect lines and the mailbox had never once held a birthday card. For years he had suffered through Max's rockets, bubbles, and pancakes. This summer, he decided, would be different." }] },
      { art: { bg: "lab", cast: [{ who: "dull", mood: "sly", pose: "point", x: 35 }], props: [{ e: "📡", x: 72, y: 62, s: 70 }, { e: "🧹", x: 84, y: 82, s: 40 }] },
        lines: [{ n: "In his basement, behind a shelf of very boring books, Dr. Dullsworth had built a machine. It looked like a satellite dish glued to a vacuum cleaner. He called it the Quiet-inator, and when he switched it on, every sound within a mile turned into a dull hum. No laughing. No shouting. No music. Just... hum." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "surprised", pose: "up", x: 35 }, { who: "max", mood: "worried", x: 70, flip: true }], props: [{ e: "🐦", x: 15, y: 30, s: 30 }], bubble: { text: "hmmmm", x: 35, y: 20 } },
        lines: [{ n: "Max noticed it first because Bolt stopped talking, which had never happened before. Bolt's mouth moved, but only a soft hum came out. Somewhere down the street, an ice-cream truck played a song that sounded like a refrigerator. Even the birds seemed bored." }] },
      { art: { bg: "street", cast: [{ who: "max", mood: "think", pose: "think", x: 30 }], props: [{ e: "🏠", x: 65, y: 50, s: 50 }, { e: "🏠", x: 80, y: 50, s: 50 }, { e: "🏠", x: 95, y: 50, s: 50 }] },
        math: { intro: "How far away is the hum coming from?", q: "The gray house is 3 blocks away. Each block is 400 feet long. How many feet away is the Quiet-inator?", answer: "1,200", choices: ["700", "1,200", "1,600", "403"], hint: "3 blocks of 400 feet. 400 + 400 + 400.", success: "One thousand two hundred feet. Close enough to hum, far enough to plan." } },
      { art: { bg: "yard", cast: [{ who: "cat", mood: "sly", x: 75, y: 50, scale: .8 }, { who: "max", mood: "surprised", pose: "point", x: 30 }], props: [{ e: "🃏", x: 55, y: 40, s: 36 }, { e: "🪞", x: 62, y: 62, s: 30 }] },
        lines: [{ n: "Mr. Whiskers appeared on the fence with his tiny headset, which Max still did not fully understand. The cat pointed one paw at the gray house, then at a drawing on a card: a fan, a kite, and a mirror. Bolt hummed excitedly. Max understood. Sound was a wave, and waves could be bounced." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "excited", pose: "hold", x: 30 }, { who: "bolt", mood: "happy", pose: "hold", x: 70, flip: true }], props: [{ e: "🪞", x: 50, y: 56, s: 60 }, { e: "🗑️", x: 88, y: 78, s: 40 }] },
        lines: [{ n: "They built a dish out of a trash-can lid and Zoe's old mirror, which she would not learn about until much later. If the Quiet-inator sent out hum, Max reasoned, then a mirror could send it back. It took thirty minutes and all of the tape in the house." }] },
      { art: { bg: "street", cast: [{ who: "max", mood: "surprised", pose: "point", x: 20 }, { who: "bolt", mood: "laugh", pose: "cheer", x: 45 }], props: [{ e: "🪞", x: 32, y: 60, s: 50 }, { e: "🎵", x: 75, y: 30, s: 40 }, { e: "🎶", x: 88, y: 50, s: 40 }], fx: "boom" },
        lines: [{ n: "They pointed the dish at the gray house and waited. At first, nothing happened. Then a hum went into the basement window and came back out as the loudest, silliest sound ever recorded: Bolt's laugh, echoed nine times, mixed with the ice-cream song. Dr. Dullsworth's windows rattled. His perfect grass lay flat." }] },
      { art: { bg: "street", cast: [{ who: "dull", mood: "worried", pose: "up", x: 65, flip: true }, { who: "bolt", mood: "happy", pose: "wave", x: 25 }], props: [{ e: "📡", x: 88, y: 84, s: 40, r: 90 }, { e: "💨", x: 90, y: 66, s: 30 }] },
        lines: [{ n: "Dr. Dullsworth stumbled onto his porch with his hands over his ears. The Quiet-inator smoked behind him, then fell over with a sad clunk." }, { w: "dull", t: "You children are a disaster." }, { w: "bolt", t: "Thank you." }, { n: "said Bolt, who could talk again and had missed it very much." }] },
      { art: { bg: "kitchen", cast: [{ who: "max", mood: "excited", pose: "point", x: 25 }, { who: "mom", mood: "happy", x: 55, flip: true }, { who: "zoe", mood: "mad", pose: "hips", x: 84, flip: true, scale: .9 }], props: [{ e: "📝", x: 12, y: 60, s: 30 }] },
        lines: [{ n: "That evening, Mr. Whiskers left a note on Max's pillow. It said: 'Good work. Never speak of this. — W.' Max spoke of it immediately, to everyone, at dinner. Zoe asked where her mirror was. Nobody answered." }] },
    ],
    quiz: [
      { q: "What did the Quiet-inator do?", c: ["Made everything louder", "Turned every sound into a hum", "Cut the grass", "Stopped time"], a: 1 },
      { q: "How did Max and Bolt beat it?", c: ["Unplugged it", "Bounced the hum back with a mirror dish", "Asked Mom for help", "Waited for it to break"], a: 1 },
      { q: "Why did Bolt say 'Thank you' when he was called a disaster?", c: ["He misheard", "He is proud of being loud and messy", "He was being polite", "He was scared"], a: 1 },
    ],
  });
})();
