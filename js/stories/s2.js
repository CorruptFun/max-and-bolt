/* Season 2 — 2nd grade. Compound sentences (and/but/so), past tense, two-syllable words. ~130–170 words. */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s2e1", season: 2, num: 1, title: "The Bubble Machine",
    blurb: "More soap means more bubbles. Bolt was right. That was the problem.",
    cover: { bg: "yard", cast: [{ who: "max", mood: "surprised", pose: "up", x: 30 }, { who: "bolt", mood: "excited", pose: "cheer", x: 65, flip: true }], props: [{ e: "🫧", x: 20, y: 30, s: 50 }, { e: "🫧", x: 80, y: 25, s: 60 }, { e: "🫧", x: 50, y: 15, s: 40 }] },
    vocab: { bored: "Having nothing fun to do.", floated: "Moved gently through the air.", mustache: "Hair that grows above the top lip.", notebook: "A small book for writing notes.", stuck: "Cannot move." },
    pages: [
      { art: { bg: "garage", cast: [{ who: "max", mood: "sleepy", pose: "hips", x: 30 }, { who: "bolt", mood: "excited", pose: "run", x: 68 }], props: [{ e: "🪲", x: 88, y: 60, s: 30 }] },
        lines: [{ n: "It was a hot day, and Max was bored. Bolt was not bored. Bolt was chasing a shiny bug." }, { w: "max", t: "Let's build a bubble machine!" }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "sly", pose: "hold", x: 70, flip: true }], props: [{ e: "🪣", x: 50, y: 78, s: 50 }, { e: "🧼", x: 82, y: 76, s: 40 }, { e: "🧼", x: 90, y: 66, s: 34 }] },
        lines: [{ n: "They used a fan, a bucket, and a lot of soap. Bolt added ten more cups of soap when Max was not looking." }] },
      { art: { bg: "garage", cast: [{ who: "bolt", mood: "happy", pose: "point", x: 30 }, { who: "max", mood: "worried", pose: "think", x: 70, flip: true }] },
        lines: [{ w: "bolt", t: "More soap means more bubbles." }, { w: "max", t: "That is true, but it is also a bad idea." }] },
      { art: { bg: "garage", cast: [{ who: "bolt", mood: "sly", pose: "hold", x: 50 }], props: [{ e: "🧼", x: 20, y: 80, s: 40 }, { e: "🧼", x: 80, y: 80, s: 40 }] },
        math: { intro: "How much soap went in?", q: "Max poured 5 cups of soap. Bolt added 10 more. How many cups in all?", answer: "15", choices: ["5", "10", "15", "20"], hint: "Start at 5 and add 10. That is 15.", success: "Fifteen cups! That is a LOT of soap." } },
      { art: { bg: "yard", cast: [{ who: "max", mood: "surprised", pose: "up", x: 25 }, { who: "bolt", mood: "excited", pose: "cheer", x: 60, flip: true }], props: [{ e: "🫧", x: 45, y: 30, s: 50 }, { e: "🫧", x: 80, y: 40, s: 90 }, { e: "🫧", x: 65, y: 15, s: 30 }, { e: "🫧", x: 15, y: 20, s: 40 }] },
        lines: [{ n: "Max flipped the switch. Bubbles came out fast. Big ones, small ones, and one as big as a car." }] },
      { art: { bg: "street", cast: [{ who: "dull", mood: "mad", pose: "up", x: 50 }], props: [{ e: "🫧", x: 40, y: 30, s: 50 }, { e: "🫧", x: 62, y: 45, s: 60 }, { e: "🫧", x: 50, y: 70, s: 40 }, { e: "🫧", x: 25, y: 60, s: 45 }] },
        lines: [{ n: "The bubbles floated over the fence. They landed on Dr. Dullsworth. He was not happy." }, { w: "dull", t: "My lawn! My hat! My MUSTACHE!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "worried", pose: "hold", x: 30 }, { who: "bolt", mood: "mad", pose: "up", x: 68, flip: true }], props: [{ e: "🔨", x: 75, y: 40, s: 40, r: 30 }, { e: "🫧", x: 50, y: 30, s: 50 }], fx: "shake" },
        lines: [{ n: "Max tried to turn it off, but the switch was stuck. Bolt tried to help, so he hit it with a hammer. That did not help." }] },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "mad", pose: "point", x: 30 }, { who: "max", mood: "worried", x: 62 }, { who: "bolt", mood: "worried", x: 84, scale: .9 }], props: [{ e: "💦", x: 50, y: 50, s: 50 }], fx: "rain" },
        lines: [{ n: "Zoe ran out with the hose. She sprayed the machine until it stopped." }, { w: "zoe", t: "You two owe me ice cream." }] },
      { art: { bg: "street", cast: [{ who: "dull", mood: "worried", x: 40 }, { who: "cat", mood: "sly", x: 78, y: 32, scale: .7 }], props: [{ e: "🫧", x: 40, y: 50, s: 60 }, { e: "📓", x: 88, y: 28, s: 24 }] },
        lines: [{ n: "Dr. Dullsworth was still covered in bubbles. Mr. Whiskers watched from the roof. He wrote something in a tiny notebook." }] },
    ],
    quiz: [
      { q: "What did Max and Bolt build?", c: ["A bubble machine", "A rocket", "A boat", "A robot dog"], a: 0 },
      { q: "Why did the machine make so many bubbles?", c: ["It was hot out", "Bolt added extra soap", "Zoe broke it", "The fan was big"], a: 1 },
      { q: "Who stopped the machine?", c: ["Max", "Dr. Dullsworth", "The cat", "Zoe"], a: 3 },
    ],
  });

  S.push({
    id: "s2e2", season: 2, num: 2, title: "Bolt Goes to School",
    blurb: "Robots can't go to school. Bolt did not get that memo.",
    cover: { bg: "school", cast: [{ who: "bolt", mood: "excited", pose: "cheer", x: 50 }], props: [{ e: "📎", x: 20, y: 40, s: 40 }, { e: "📎", x: 80, y: 30, s: 40 }] },
    vocab: { gasped: "Took in a quick, surprised breath.", genius: "Someone who is very, very smart.", magnet: "Something that pulls metal to it.", stapler: "A tool that pins papers together.", heavy: "Weighs a lot." },
    pages: [
      { art: { bg: "room", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "worried", x: 70, flip: true }], props: [{ e: "🎒", x: 30, y: 82, s: 46 }] },
        lines: [{ n: "Max packed {his} bag for school. Bolt was sad." }, { w: "bolt", t: "Can I come?" }, { w: "max", t: "Robots can't go to school." }] },
      { art: { bg: "school", cast: [{ who: "max", mood: "surprised", pose: "hold", x: 50 }], props: [{ e: "🎒", x: 50, y: 88, s: 60 }], bubble: { text: "Ouch", x: 62, y: 62 } },
        lines: [{ n: "But when Max got to class, {his} bag felt heavy. It also said 'Ouch' when {he} set it down." }] },
      { art: { bg: "school", cast: [{ who: "bolt", mood: "excited", pose: "up", x: 40, y: 80 }, { who: "max", mood: "worried", x: 75, flip: true }], props: [{ e: "🎒", x: 40, y: 90, s: 60 }], fx: "boom" },
        lines: [{ n: "Bolt popped out. The class gasped. Ms. Perez dropped her chalk." }] },
      { art: { bg: "school", cast: [{ who: "bolt", mood: "happy", pose: "wave", x: 40 }, { who: "mom", mood: "surprised", x: 78, flip: true }] },
        lines: [{ w: "bolt", t: "Hello! I am Bolt. I know math." }, { n: "Ms. Perez asked him a question." }] },
      { art: { bg: "school", cast: [{ who: "bolt", mood: "think", pose: "think", x: 50 }] },
        math: { intro: "Help Bolt answer!", q: "What is 7 plus 8?", answer: "15", choices: ["13", "14", "15", "16"], hint: "7 + 7 is 14. One more is 15.", success: "Fifteen! Bolt looks very smart now." } },
      { art: { bg: "school", cast: [{ who: "bolt", mood: "excited", pose: "cheer", x: 40 }, { who: "max", mood: "happy", pose: "cheer", x: 70 }], fx: "sparkle" },
        lines: [{ n: "Bolt got every answer right. The class cheered. Ms. Perez smiled." }, { w: "mom", t: "Max, your robot is a genius." }] },
      { art: { bg: "school", cast: [{ who: "bolt", mood: "love", pose: "up", x: 40 }], props: [{ e: "📎", x: 65, y: 55, s: 40 }, { e: "📎", x: 78, y: 62, s: 34 }, { e: "📎", x: 72, y: 76, s: 30 }] },
        lines: [{ n: "Then Bolt saw the paper clips. There were a lot of shiny paper clips." }] },
      { art: { bg: "school", cast: [{ who: "bolt", mood: "excited", pose: "up", x: 50 }], props: [{ e: "📎", x: 20, y: 40, s: 40, r: 40 }, { e: "✂️", x: 75, y: 35, s: 40, r: -30 }, { e: "🔑", x: 28, y: 65, s: 36 }, { e: "📎", x: 80, y: 68, s: 34, r: 80 }], fx: "zap" },
        lines: [{ n: "Bolt's magnet arm turned on. Paper clips flew across the room. So did the scissors, the stapler, and Ms. Perez's keys." }] },
      { art: { bg: "street", cast: [{ who: "max", mood: "mad", pose: "hold", x: 35 }, { who: "bolt", mood: "happy", x: 70, flip: true }], props: [{ e: "🎒", x: 35, y: 82, s: 50 }, { e: "📎", x: 68, y: 60, s: 26 }, { e: "📎", x: 76, y: 70, s: 26 }] },
        lines: [{ n: "Max carried Bolt home in the bag. Bolt was covered in paper clips." }, { w: "bolt", t: "Best day ever." }, { w: "max", t: "You are never going back." }] },
      { art: { bg: "school", cast: [{ who: "bolt", mood: "sly", pose: "wave", x: 50 }] },
        lines: [{ n: "Bolt went back the next day." }] },
    ],
    quiz: [
      { q: "How did Bolt get to school?", c: ["He walked", "He hid in Max's bag", "Mom drove him", "He flew"], a: 1 },
      { q: "What did Bolt's magnet arm pull?", c: ["Paper clips", "Books", "Kids", "Chairs"], a: 0 },
      { q: "What did Ms. Perez call Bolt?", c: ["A pest", "A toaster", "A genius", "A cat"], a: 2 },
    ],
  });

  S.push({
    id: "s2e3", season: 2, num: 3, title: "The Treehouse Rocket",
    blurb: "The treehouse is not high enough. Max knows how to fix that.",
    cover: { bg: "tree", cast: [{ who: "max", mood: "excited", pose: "point", x: 35, y: 56, scale: .8 }, { who: "bolt", mood: "worried", x: 62, y: 56, scale: .8, flip: true }], props: [{ e: "🚀", x: 85, y: 30, s: 50 }] },
    vocab: { whole: "All of it.", tied: "Held together with string or rope.", thump: "A heavy, dull bump sound.", strange: "Odd, not normal.", proud: "Happy about something you did." },
    pages: [
      { art: { bg: "tree", cast: [{ who: "max", mood: "think", pose: "think", x: 35, y: 56, scale: .8 }, { who: "bolt", mood: "happy", x: 62, y: 56, scale: .8, flip: true }] },
        lines: [{ n: "Max and Bolt had a treehouse, but it was not high enough. Max wanted to see the whole town." }] },
      { art: { bg: "tree", cast: [{ who: "max", mood: "excited", pose: "up", x: 35, y: 56, scale: .8 }, { who: "bolt", mood: "sleepy", x: 62, y: 56, scale: .8, flip: true }] },
        lines: [{ w: "max", t: "We need a rocket." }, { w: "bolt", t: "We need a nap." }] },
      { art: { bg: "tree", cast: [{ who: "zoe", mood: "worried", pose: "hips", x: 20, y: 96, scale: .9 }], props: [{ e: "🚀", x: 30, y: 52, s: 40, r: 10 }, { e: "🚀", x: 50, y: 52, s: 40 }, { e: "🚀", x: 66, y: 52, s: 40 }, { e: "🚀", x: 82, y: 52, s: 40, r: -10 }] },
        lines: [{ n: "They tied four bottle rockets to the treehouse. Zoe watched from the yard and shook her head." }] },
      { art: { bg: "garage", cast: [{ who: "bolt", mood: "think", pose: "hold", x: 40 }], props: [{ e: "🔋", x: 65, y: 76, s: 40 }, { e: "🔋", x: 78, y: 76, s: 40 }] },
        math: { intro: "Every rocket needs batteries.", q: "Each rocket needs 2 batteries. There are 4 rockets. How many batteries do they need?", answer: "8", choices: ["4", "6", "8", "10"], hint: "Count by 2s: 2, 4, 6, 8.", success: "Eight batteries! Bolt found them in his own tail." } },
      { art: { bg: "tree", cast: [{ who: "max", mood: "surprised", pose: "up", x: 35, y: 50, scale: .8 }, { who: "bolt", mood: "surprised", pose: "up", x: 62, y: 50, scale: .8, flip: true }], fx: "boom" },
        lines: [{ n: "Three, two, one! The rockets fired. The treehouse went up... two feet. Then it came back down with a THUMP." }] },
      { art: { bg: "yard", cast: [{ who: "cat", mood: "sly", x: 78, y: 70, scale: .7 }, { who: "max", mood: "surprised", pose: "point", x: 22, y: 60, scale: .7 }], props: [{ e: "🛖", x: 80, y: 62, s: 80 }] },
        lines: [{ n: "But from up there, Max saw something. Mr. Whiskers was walking into the shed. Then the shed floor opened like a door!" }] },
      { art: { bg: "tree", cast: [{ who: "max", mood: "surprised", x: 30, y: 56, scale: .8 }, { who: "bolt", mood: "sly", pose: "hips", x: 55, y: 56, scale: .8, flip: true }, { who: "zoe", mood: "think", x: 85, y: 96, scale: .8 }] },
        lines: [{ w: "max", t: "Did you see that?" }, { w: "bolt", t: "I told you. Spy." }, { w: "zoe", t: "You two are very strange." }] },
      { art: { bg: "room", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "love", pose: "hold", x: 70, flip: true }], props: [{ e: "🗺️", x: 30, y: 78, s: 40 }, { e: "🥄", x: 70, y: 78, s: 40 }], fx: "sparkle" },
        lines: [{ n: "That night, Max drew a map of the shed. Bolt drew a picture of a spoon. They were both very proud." }] },
    ],
    quiz: [
      { q: "Why did Max want a rocket?", c: ["To go to space", "To see the whole town", "To scare Zoe", "To wake up Bolt"], a: 1 },
      { q: "How high did the treehouse go?", c: ["Two feet", "Two miles", "To the moon", "It did not move"], a: 0 },
      { q: "What did Max see from up high?", c: ["A bird", "Dr. Dullsworth", "The cat going into the shed", "A spoon"], a: 2 },
    ],
  });
})();

/* Season 2 — episodes 4–6 (added 2026-09-02). */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s2e4", season: 2, num: 4, title: "The Robot Dog",
    blurb: "Bolt wanted a pet. Max built one. It has four wheels and one job.",
    cover: { bg: "yard", cast: [{ who: "bolt", mood: "surprised", pose: "run", x: 30 }], props: [{ p: "robodog", x: 65, y: 82, s: 70 }], fx: "speed" },
    vocab: { fetch: "To go get something and bring it back.", wag: "To swing a tail side to side.", stare: "To look at something for a long time without blinking.", chase: "To run after." },
    pages: [
      { art: { bg: "room", cast: [{ who: "bolt", mood: "mad", pose: "hips", x: 30 }, { who: "max", mood: "sly", x: 70, flip: true }] }, lines: [{ n: "Bolt wanted a pet. Max said Bolt was already a pet, and Bolt did not talk to {him} for an hour." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "happy", pose: "point", x: 25 }, { who: "bolt", mood: "love", x: 80, flip: true }], props: [{ p: "robodog", x: 55, y: 80, s: 60 }] }, lines: [{ n: "So Max built a robot dog. It had four wheels, a wagging tail, and one job: to fetch. Bolt named it Chomp." }] },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "mad", pose: "point", x: 30 }], props: [{ p: "robodog", x: 70, y: 82, s: 60 }, { e: "📱", x: 70, y: 66, s: 26 }, { e: "⚽", x: 15, y: 90, s: 26 }, { e: "👟", x: 88, y: 90, s: 26 }] }, lines: [{ n: "Chomp fetched a ball. Then a shoe. Then Zoe's phone, which was a problem." }, { w: "zoe", t: "GIVE THAT BACK!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "think", pose: "think", x: 30 }], props: [{ p: "robodog", x: 65, y: 82, s: 60 }, { e: "🧦", x: 50, y: 60, s: 26 }, { e: "🥄", x: 80, y: 55, s: 26 }, { e: "🧢", x: 88, y: 75, s: 26 }] },
        math: { intro: "Max kept a list.", q: "Chomp fetched 14 things before lunch and 9 more after lunch. How many things did Chomp fetch?", answer: "23", choices: ["21", "22", "23", "25"], hint: "14 + 9. Take 1 from the 9 to make 15, then add 8 more.", success: "Twenty-three things. Three of them were Zoe's." } },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "surprised", x: 35 }], props: [{ p: "robodog", x: 75, y: 82, s: 60 }, { e: "👀", x: 75, y: 62, s: 26 }], fx: "sparkle" }, lines: [{ n: "Then Chomp saw Bolt's tail. It was shiny. It was wagging. To Chomp, it looked like a ball." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "worried", pose: "run", x: 25 }, { who: "max", mood: "surprised", pose: "run", x: 75 }, { who: "zoe", mood: "laugh", pose: "hold", x: 92, scale: .8 }], props: [{ p: "robodog", x: 50, y: 84, s: 56 }, { e: "📱", x: 92, y: 60, s: 20 }], fx: "speed" }, lines: [{ n: "Chomp chased Bolt around the yard six times. Bolt yelled. Max chased Chomp. Zoe filmed it." }] },
      { art: { bg: "yard", cast: [{ who: "cat", mood: "sly", x: 35, y: 92 }], props: [{ p: "robodog", x: 70, y: 82, s: 60 }] }, lines: [{ n: "Mr. Whiskers stopped it. He just sat down in front of Chomp and stared. Chomp stopped." }] },
      { art: { bg: "room", cast: [{ who: "bolt", mood: "sleepy", x: 40 }], props: [{ p: "robodog", x: 72, y: 88, s: 50 }, { e: "💤", x: 80, y: 70, s: 26 }], fx: "dark" }, lines: [{ n: "Bolt hid his tail for a week." }, { w: "bolt", t: "I do not want a pet." }, { n: "Chomp sleeps by his bed now." }] },
    ],
    quiz: [
      { q: "What was Chomp's one job?", c: ["To bark", "To fetch", "To dig", "To guard"], a: 1 },
      { q: "Why did Chomp chase Bolt?", c: ["Bolt was mean", "Bolt's tail looked like a ball", "Max told it to", "Bolt had a snack"], a: 1 },
      { q: "Who stopped Chomp?", c: ["Zoe", "Max", "Mr. Whiskers", "Mom"], a: 2 },
    ],
  });

  S.push({
    id: "s2e5", season: 2, num: 5, title: "Camp Backyard",
    blurb: "A tent, six marshmallows, and a plan to stay up all night. Then: tick. Tick. Sssss.",
    cover: { bg: "night", cast: [{ who: "max", mood: "worried", pose: "hold", x: 35 }, { who: "bolt", mood: "surprised", x: 68, flip: true }], props: [{ e: "⛺", x: 20, y: 70, s: 70 }, { e: "🔦", x: 35, y: 62, s: 30 }] },
    vocab: { tent: "A little cloth house you sleep in outside.", hiss: "A long 'ssss' sound.", brave: "Not letting fear stop you.", sprinkler: "A machine that sprays water on grass." },
    pages: [
      { art: { bg: "night", cast: [{ who: "max", mood: "excited", pose: "hold", x: 35 }, { who: "bolt", mood: "excited", x: 68, flip: true }], props: [{ e: "⛺", x: 15, y: 72, s: 70 }, { e: "🔦", x: 35, y: 62, s: 30 }, { e: "🍡", x: 85, y: 70, s: 34 }] }, lines: [{ n: "Max and Bolt set up a tent in the yard. They had a flashlight, six marshmallows, and a plan to stay up all night." }] },
      { art: { bg: "night", cast: [{ who: "bolt", mood: "worried", x: 30 }, { who: "max", mood: "think", x: 70, flip: true }], bubble: { text: "tick tick", x: 50, y: 18 } }, lines: [{ n: "At nine, they heard a noise. Tick. Tick. Tick." }, { w: "bolt", t: "It's a monster." }, { w: "max", t: "It's a clock." }, { w: "bolt", t: "A monster clock." }] },
      { art: { bg: "night", cast: [{ who: "max", mood: "worried", pose: "hold", x: 50 }], props: [{ e: "🔦", x: 50, y: 62, s: 30 }, { e: "🛌", x: 20, y: 86, s: 50 }], bubble: { text: "Sssss", x: 75, y: 25 }, fx: "dark" }, lines: [{ n: "At ten, they heard a hiss. Sssss. Bolt jumped into Max's sleeping bag. Max was not brave either, but {he} held the flashlight." }] },
      { art: { bg: "night", cast: [{ who: "max", mood: "think", pose: "point", x: 40 }] },
        math: { intro: "Max counted stars to feel brave.", q: "Max counted 25 stars, then 18 more. How many stars is that?", answer: "43", choices: ["33", "42", "43", "53"], hint: "25 + 18. Add 20 to get 45, then take away 2.", success: "Forty-three stars. Max felt a little braver. Bolt did not." } },
      { art: { bg: "night", cast: [{ who: "bolt", mood: "surprised", pose: "up", x: 30 }, { who: "max", mood: "surprised", pose: "up", x: 65, flip: true }], props: [{ e: "🔦", x: 88, y: 30, s: 30, r: 60 }, { e: "💧", x: 20, y: 40, s: 24 }], fx: "dark" }, lines: [{ n: "At eleven, something touched the tent. Something wet. Bolt screamed. Max screamed. The flashlight flew out the door." }] },
      { art: { bg: "night", cast: [{ who: "max", mood: "surprised", x: 30 }, { who: "bolt", mood: "surprised", x: 55, flip: true }], props: [{ e: "⛺", x: 20, y: 90, s: 50, r: 70 }, { e: "💦", x: 82, y: 70, s: 50 }] }, lines: [{ n: "The tent fell down. And there, in the light from the house, was Dr. Dullsworth's sprinkler. Tick. Tick. Sssss." }] },
      { art: { bg: "night", cast: [{ who: "dull", mood: "mad", pose: "point", x: 75, flip: true }, { who: "bolt", mood: "mad", pose: "point", x: 30 }] }, lines: [{ w: "dull", t: "Some of us are trying to SLEEP." }, { w: "bolt", t: "Some of us are trying to LIVE." }] },
      { art: { bg: "room", cast: [{ who: "max", mood: "sleepy", x: 35 }, { who: "bolt", mood: "sleepy", x: 65, flip: true }], fx: "dark" }, lines: [{ n: "They finished the night on the couch. Bolt said he was never scared. He said it four times." }] },
    ],
    quiz: [
      { q: "Where did Max and Bolt camp?", c: ["At a lake", "In the backyard", "In the garage", "On the roof"], a: 1 },
      { q: "What made the tick and the hiss?", c: ["A monster", "The cat", "A clock", "Dr. Dullsworth's sprinkler"], a: 3 },
      { q: "Who was scared?", c: ["Only Bolt", "Only Max", "Both of them", "Nobody"], a: 2 },
    ],
  });

  S.push({
    id: "s2e6", season: 2, num: 6, title: "The Lemonade Stand",
    blurb: "Max needs a battery. Bolt makes the sign. The sign is mostly about Bolt.",
    cover: { bg: "street", cast: [{ who: "max", mood: "happy", pose: "wave", x: 30 }, { who: "bolt", mood: "excited", pose: "cheer", x: 65, flip: true }], props: [{ e: "🍋", x: 50, y: 30, s: 50 }, { e: "🥤", x: 85, y: 40, s: 40 }] },
    vocab: { customer: "Someone who buys something.", squeeze: "To press hard to get the juice out.", quarter: "A coin worth 25 cents.", fresh: "Just made; new." },
    pages: [
      { art: { bg: "street", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "excited", pose: "hold", x: 70, flip: true }], props: [{ e: "🍋", x: 30, y: 60, s: 34 }, { e: "🪧", x: 70, y: 56, s: 50 }, { e: "✨", x: 78, y: 44, s: 24 }] }, lines: [{ n: "Max needed money for a new battery, so {he} opened a lemonade stand. Bolt made the sign. It said LEMONADE in glitter, and also BOLT IS GREAT in bigger letters." }] },
      { art: { bg: "kitchen", cast: [{ who: "zoe", mood: "sly", pose: "hold", x: 35 }, { who: "max", mood: "worried", x: 72, flip: true }], props: [{ e: "🍋", x: 35, y: 58, s: 30 }, { e: "🍋", x: 15, y: 70, s: 30 }, { e: "🍋", x: 55, y: 74, s: 30 }] }, lines: [{ n: "Zoe helped squeeze the lemons, but only after Max said she could keep half the money. She was a tough sister to work with." }] },
      { art: { bg: "street", cast: [{ who: "max", mood: "think", pose: "hold", x: 30 }], props: [{ e: "🥤", x: 60, y: 62, s: 34 }, { e: "🥤", x: 72, y: 62, s: 34 }, { e: "🥤", x: 84, y: 62, s: 34 }, { e: "🪙", x: 72, y: 84, s: 30 }] },
        math: { intro: "The first real customer came.", q: "A cup of lemonade costs 25 cents. A boy buys 3 cups. How much does he pay?", answer: "75 cents", choices: ["50 cents", "75 cents", "28 cents", "100 cents"], hint: "Count by 25s: 25, 50, 75.", success: "Seventy-five cents! Max put the quarters in a jar. Bolt tried to put them in his chest." } },
      { art: { bg: "street", cast: [{ who: "mom", mood: "happy", pose: "hold", x: 25 }, { who: "max", mood: "happy", pose: "hold", x: 65, flip: true }], props: [{ e: "🥤", x: 25, y: 60, s: 30 }, { e: "🐝", x: 85, y: 40, s: 34 }] }, lines: [{ n: "The first customer was Mom. The second was Mom again. The third was a bee, and it did not pay." }] },
      { art: { bg: "street", cast: [{ who: "bolt", mood: "excited", pose: "cheer", x: 40 }], props: [{ e: "🚗", x: 85, y: 84, s: 50 }, { e: "🚲", x: 15, y: 86, s: 40 }, { e: "🐕", x: 70, y: 88, s: 30 }], bubble: { text: "FRESH!", x: 40, y: 18 } }, lines: [{ n: "Bolt tried to help. He waved at cars. He jumped at bikes. He yelled 'FRESH!' so loud that a dog ran home. Nobody stopped." }] },
      { art: { bg: "street", cast: [{ who: "dull", mood: "think", x: 70, flip: true }, { who: "max", mood: "surprised", x: 25 }], props: [{ e: "🪙", x: 48, y: 76, s: 30 }, { e: "🥤", x: 80, y: 56, s: 26 }] }, lines: [{ n: "Then Dr. Dullsworth walked by. He did not look at the stand. He did not look at Max. But a quarter landed on the table, and a cup of lemonade was gone." }] },
      { art: { bg: "street", cast: [{ who: "max", mood: "excited", pose: "hold", x: 40 }], props: [{ e: "🫙", x: 40, y: 58, s: 40 }, { e: "🪙", x: 65, y: 70, s: 26 }, { e: "🪙", x: 75, y: 76, s: 26 }, { e: "🪙", x: 85, y: 70, s: 26 }] },
        math: { intro: "Max counted the jar.", q: "By the end, Max had 12 quarters. Each quarter is 25 cents. How much money is that?", answer: "$3.00", choices: ["$3.00", "$1.20", "$2.50", "$12.00"], hint: "Four quarters make one dollar. 12 quarters is three groups of four.", success: "Three dollars! Enough for a battery and one cup of lemonade for Zoe." } },
      { art: { bg: "garage", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "love", x: 70, flip: true }], props: [{ e: "🔋", x: 30, y: 60, s: 34 }, { e: "🪧", x: 85, y: 40, s: 50 }, { e: "🐝", x: 12, y: 30, s: 26 }] }, lines: [{ n: "Max got {his} battery. Zoe got her half. Bolt got the sign, which he hung in the garage. Mr. Whiskers got the bee." }] },
    ],
    quiz: [
      { q: "Why did Max open the lemonade stand?", c: ["It was hot", "To buy a battery", "Zoe asked", "For the bee"], a: 1 },
      { q: "Who paid without looking at the stand?", c: ["Mom", "The bee", "Dr. Dullsworth", "Zoe"], a: 2 },
      { q: "What did Bolt yell?", c: ["HELP!", "FRESH!", "MINE!", "STOP!"], a: 1 },
    ],
  });
})();
