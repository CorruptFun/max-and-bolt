/* Season 6 — 6th grade. Idioms, irony, varied sentence openers, inference. ~470–520 words. */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s6e1", season: 6, num: 1, title: "The Science Fair",
    blurb: "Zoe has won three years running with three volcanoes. Max is bringing weather.",
    cover: { bg: "school", cast: [{ who: "max", mood: "worried", pose: "up", x: 30 }, { who: "zoe", mood: "mad", x: 70, flip: true }], props: [{ e: "🌋", x: 85, y: 70, s: 50 }, { e: "☁️", x: 30, y: 25, s: 60 }], fx: "rain" },
    vocab: { satisfaction: "A pleased feeling that things are as they should be.", revenge: "Getting back at someone for something they did.", magnificently: "In a grand, impressive way.", expelled: "Kicked out of school for good.", gracious: "Polite and kind, especially when losing." },
    pages: [
      { art: { bg: "school", cast: [{ who: "max", mood: "sly", pose: "hold", x: 40 }], props: [{ e: "📜", x: 40, y: 60, s: 36 }] },
        lines: [{ n: "The Westfield Elementary Science Fair had rules, and Max had read all of them, which was a first. No open flames. No live animals. No projects taller than the judge. Nowhere, {he} noted with satisfaction, did the rules say anything about robots, weather, or revenge." }] },
      { art: { bg: "school", cast: [{ who: "zoe", mood: "happy", pose: "cheer", x: 30 }, { who: "max", mood: "mad", pose: "hips", x: 75, flip: true }], props: [{ e: "🌋", x: 30, y: 62, s: 44 }, { e: "🏅", x: 18, y: 40, s: 30 }, { e: "🦷", x: 88, y: 50, s: 30 }] },
        lines: [{ n: "Revenge was on the table because Zoe had won the science fair three years in a row with three different volcanoes. Everyone loved the volcanoes. The judges loved the volcanoes. Max, who had once spent a whole weekend building a working submarine out of a cooler, had come in fourth, behind a poster about teeth." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "excited", pose: "point", x: 30 }, { who: "bolt", mood: "sly", pose: "hold", x: 70, flip: true }], props: [{ e: "☁️", x: 50, y: 30, s: 50 }, { e: "🧊", x: 88, y: 76, s: 34 }] },
        lines: [{ n: "This year {he} would build a weather machine. Not a fake one with cotton-ball clouds, but a real one: a humidifier, two fans, a freezer coil, and Bolt's arm as the control unit, since Bolt had insisted on being 'part of the science.' It would make a cloud. A small one. Indoors. What could go wrong?" }] },
      { art: { bg: "school", cast: [{ who: "max", mood: "think", pose: "think", x: 50 }], props: [{ e: "📐", x: 20, y: 50, s: 40 }] },
        math: { intro: "How big should the cloud be?", q: "The gym floor is 60 feet long and 40 feet wide. Max's cloud should cover only 1/8 of the floor. How many square feet is that?", answer: "300", choices: ["100", "300", "600", "2,400"], hint: "First find the whole floor: 60 × 40 = 2,400. Then split it into 8 equal parts.", success: "Three hundred square feet. A polite cloud. Max wrote 300 on the dial and underlined it twice." } },
      { art: { bg: "school", cast: [{ who: "zoe", mood: "happy", x: 20, scale: .9 }, { who: "max", mood: "sly", pose: "point", x: 60 }, { who: "bolt", mood: "sly", pose: "hold", x: 85, flip: true, scale: .9 }], props: [{ e: "🌋", x: 20, y: 62, s: 40 }, { e: "🎛️", x: 85, y: 60, s: 30 }] },
        lines: [{ n: "On the big day, the gym smelled like glue and nervous parents. Zoe's volcano sat at the center table like a queen. Max set up in the corner, plugged in the machine, and whispered to Bolt," }, { w: "max", t: "A small cloud. Just enough to impress them." }, { n: "Bolt nodded seriously, then turned every dial to maximum when Max looked away." }] },
      { art: { bg: "school", cast: [{ who: "max", mood: "surprised", pose: "up", x: 30 }, { who: "bolt", mood: "excited", pose: "cheer", x: 70, flip: true }], props: [{ e: "☁️", x: 20, y: 20, s: 70 }, { e: "☁️", x: 55, y: 15, s: 80 }, { e: "☁️", x: 85, y: 25, s: 70 }], fx: "rain" },
        lines: [{ n: "The cloud was not small. It rolled off the table like fog off a lake, climbed the walls, and hung under the ceiling lights until the whole gym looked like a bathroom after a hot shower. Then, because that is what clouds do, it started to rain. Indoors. On the judges." }] },
      { art: { bg: "school", cast: [{ who: "zoe", mood: "surprised", pose: "up", x: 25 }, { who: "mom", mood: "worried", pose: "hold", x: 72, flip: true }], props: [{ e: "🌋", x: 25, y: 64, s: 44 }, { e: "🔴", x: 40, y: 40, s: 30 }, { e: "☂️", x: 72, y: 40, s: 44 }, { e: "📋", x: 88, y: 66, s: 26 }], fx: "rain" },
        lines: [{ n: "Zoe's volcano erupted early because the rain shorted its wires, and it did so magnificently, spraying red foam over the poster about teeth. The principal opened an umbrella. A first grader started dancing. The judge in charge of scores, whose hair had gone completely flat, wrote something on her clipboard with a hand that was shaking." }] },
      { art: { bg: "school", cast: [{ who: "mom", mood: "happy", pose: "point", x: 35 }, { who: "max", mood: "surprised", pose: "hold", x: 72, flip: true }], props: [{ e: "🏅", x: 55, y: 50, s: 40 }], fx: "sparkle" },
        lines: [{ n: "Max was certain {he} would be expelled, or at least grounded until high school. Instead, when the rain stopped and the fog cleared, the judge handed {him} a blue ribbon." }, { w: "mom", t: "In twenty years, this is the first project that actually did science to me." }, { n: "she said, wringing out her sleeve." }] },
      { art: { bg: "room", cast: [{ who: "zoe", mood: "sly", pose: "hips", x: 25 }, { who: "bolt", mood: "excited", pose: "hold", x: 72, flip: true }], props: [{ e: "🏅", x: 12, y: 40, s: 30 }, { e: "🖼️", x: 72, y: 56, s: 36 }, { e: "🚫", x: 72, y: 56, s: 20 }] },
        lines: [{ n: "Zoe got a ribbon too, for 'Most Dramatic Eruption,' which the judges invented on the spot. She was gracious about losing, which meant she only mentioned it every day for a month. Bolt was banned from the gym for life. He framed the letter and hung it next to Max's ribbon, and honestly, he seemed prouder of his." }] },
    ],
    quiz: [
      { q: "Why did Max want to beat Zoe this year?", c: ["She teased his submarine", "She had won three times in a row with volcanoes", "She broke his robot", "Mom asked him to"], a: 1 },
      { q: "What did Bolt do when Max looked away?", c: ["Ate the glue", "Unplugged the machine", "Turned every dial to maximum", "Hid under the table"], a: 2 },
      { q: "The story says Zoe was 'gracious about losing.' What does it really mean here?", c: ["She truly did not mind", "She said she was fine but kept bringing it up", "She cried", "She gave Max her ribbon"], a: 1 },
    ],
  });

  S.push({
    id: "s6e2", season: 6, num: 2, title: "The Whisker Files",
    blurb: "A gray folder under a loose board. Dr. Dullsworth is trying to cancel summer. The cat has a plan.",
    cover: { bg: "night", cast: [{ who: "cat", mood: "sly", x: 50, y: 90, scale: 1.2 }], props: [{ e: "🗂️", x: 20, y: 40, s: 50 }, { e: "🔑", x: 80, y: 40, s: 40 }], fx: "dark" },
    vocab: { reliable: "Can be counted on.", unlicensed: "Without official permission.", multitudes: "Many, many things at once.", council: "A group of people who make decisions for a town.", convinced: "Made someone believe something." },
    pages: [
      { art: { bg: "tree", cast: [{ who: "max", mood: "surprised", pose: "hold", x: 40, y: 56, scale: .8 }], props: [{ e: "🗂️", x: 40, y: 44, s: 34 }, { e: "🐾", x: 62, y: 44, s: 24 }], fx: "dark" },
        lines: [{ n: "Max found the folder on the last night of the school year, tucked under the loose board in the treehouse, exactly where Jenny's letter had said a secret hiding spot would be. It was thick, gray, and stamped with a paw print. Across the front, in neat block letters, it said: THE WHISKER FILES. DO NOT READ. Naturally, {he} read it." }] },
      { art: { bg: "tree", cast: [{ who: "max", mood: "laugh", pose: "hold", x: 32, y: 56, scale: .8 }, { who: "bolt", mood: "mad", pose: "up", x: 66, y: 56, scale: .8, flip: true }], props: [{ e: "📄", x: 32, y: 44, s: 30 }] },
        lines: [{ n: "The first page was a list of names. Max's name. Zoe's name. Mom's name, with a note that said 'reliable, brings tuna.' Bolt's name, followed by a long paragraph that Bolt refused to hear read aloud after the first sentence, which was: 'Subject is loud, shiny-obsessed, and roughly as sneaky as a marching band.'" }] },
      { art: { bg: "street", cast: [{ who: "dull", mood: "sly", pose: "hold", x: 50 }], props: [{ e: "✉️", x: 50, y: 60, s: 34 }, { e: "✉️", x: 20, y: 40, s: 30 }, { e: "✉️", x: 80, y: 40, s: 30 }, { e: "🚫", x: 88, y: 76, s: 34 }] },
        lines: [{ n: "The second page was about Dr. Dullsworth, and it was not funny at all. According to the file, the neighbor had been sending letters to the city council all summer. He wanted a new rule: no noise, no water balloons, no lemonade stands, and no 'unlicensed machinery' in any yard on the street. A vote was set for Monday. The Quiet-inator had only been the beginning." }] },
      { art: { bg: "city", cast: [{ who: "max", mood: "worried", pose: "think", x: 30 }], props: [{ e: "🗳️", x: 65, y: 60, s: 50 }] },
        math: { intro: "Max read the vote count twice.", q: "The city council has 9 members. A rule passes if more than half vote yes. Dr. Dullsworth has convinced 4 of them so far. How many more does he need?", answer: "1", choices: ["1", "2", "4", "5"], hint: "Half of 9 is 4.5. 'More than half' means 5 votes. He has 4.", success: "Just one more vote. That was too close. Max stopped reading and started planning." } },
      { art: { bg: "garage", cast: [{ who: "max", mood: "surprised", pose: "point", x: 30 }, { who: "bolt", mood: "sly", pose: "hold", x: 70, flip: true }], props: [{ e: "🔑", x: 70, y: 58, s: 30 }] },
        lines: [{ w: "max", t: "He's trying to cancel summer." }, { n: "For once Bolt did not make a joke. Instead he opened a panel in his chest and pulled out something Max had never seen: a small silver key with a paw print on it." }, { w: "bolt", t: "The cat gave me this. Last week. He said I would know when." }, { w: "max", t: "You've been keeping secrets from me?" }, { w: "bolt", t: "I contain multitudes." }, { n: "He had learned that phrase from a poster and did not know what it meant." }] },
      { art: { bg: "lab", cast: [{ who: "cat", mood: "sly", x: 70, y: 92, scale: 1.1 }, { who: "max", mood: "surprised", x: 25 }, { who: "bolt", mood: "surprised", x: 45, scale: .9 }], props: [{ e: "🎧", x: 70, y: 66, s: 26 }, { e: "▶️", x: 55, y: 25, s: 30 }] },
        lines: [{ n: "The key opened the shed, the shed opened the floor, and the floor led down to the glowing room. This time, Mr. Whiskers was waiting for them. He did not run. He did not press CLASSIFIED. He simply tapped a screen with one paw, and a video began to play." }] },
      { art: { bg: "lab", cast: [{ who: "dull", mood: "laugh", x: 60, y: 42, scale: .5 }], props: [{ e: "🎬", x: 20, y: 25, s: 36 }, { e: "🫧", x: 80, y: 30, s: 30 }, { e: "🥞", x: 85, y: 50, s: 26 }] },
        lines: [{ n: "It showed the street, filmed from a rooftop, on a hundred different days. Kids on bikes. The bubble flood. The pancake that flew out the window. Zoe's volcano in the driveway, exploding a little early. Dr. Dullsworth appeared in nearly every clip, shaking his fist, and yet in one clip, just one, he was laughing. It was the day the cloud rained on the science fair. He had been walking past the gym windows, and for a second, he'd forgotten to be angry." }] },
      { art: { bg: "lab", cast: [{ who: "max", mood: "think", pose: "point", x: 30 }, { who: "cat", mood: "happy", x: 65, y: 92 }, { who: "bolt", mood: "love", pose: "hold", x: 88, flip: true, scale: .85 }], props: [{ e: "🥄", x: 88, y: 60, s: 24 }] },
        lines: [{ w: "max", t: "That's the plan? Show the council he's actually having fun?" }, { n: "The cat blinked slowly, which Max had learned meant yes. Bolt was already copying the video onto a thumb drive shaped like a spoon, because of course he had one of those." }] },
      { art: { bg: "city", cast: [{ who: "dull", mood: "worried", x: 30 }, { who: "cat", mood: "sly", x: 75, y: 92 }], props: [{ e: "🍅", x: 20, y: 40, s: 30 }, { e: "🏆", x: 75, y: 60, s: 40 }, { e: "🗳️", x: 50, y: 78, s: 40 }], fx: "sparkle" },
        lines: [{ n: "On Monday, the council watched the video. Dr. Dullsworth turned the color of a tomato. The vote was 9 to 0, and the new rule they passed instead said that every summer, the street would hold one 'Machine Day' with a trophy. The first winner, somehow, was a cat. Nobody could explain it. Nobody tried." }] },
    ],
    quiz: [
      { q: "Where was the folder hidden?", c: ["In the shed", "Under the loose board Jenny wrote about", "In Bolt's chest", "In the mailbox"], a: 1 },
      { q: "What was Dr. Dullsworth trying to get the council to do?", c: ["Buy him a new lawn", "Ban noise, fun, and machines on the street", "Move the cat", "Cancel school"], a: 1 },
      { q: "Why did the cat's video work on the council?", c: ["It was very long", "It showed Dr. Dullsworth secretly enjoying the fun", "It had music", "It showed the cat's base"], a: 1 },
    ],
  });
})();
