export const VOWELS = new Set(['A','E','I','O','U']);
export const DIGRAPHS = new Set(['SH','CH','TH','WH','PH']);
export const BLENDS = new Set(['BL','FL','CL','GL','PL','SL','BR','CR','DR','FR','GR','PR','TR','SC','SK','SM','SN','SP','ST','SW','TW','QU','STR']);

export const WORDS = {
  beginner:[
    {word:'CAT',   phonics:['C','A','T'],          sentence:'The cat sat on the warm mat.',     hint:'🐱 A fluffy pet'},
    {word:'DOG',   phonics:['D','O','G'],          sentence:'The dog loves to fetch the ball.',  hint:'🐶 Man\'s best friend'},
    {word:'HAT',   phonics:['H','A','T'],          sentence:'I wear a hat in the sunny park.',   hint:'🎩 You wear it on your head'},
    {word:'SUN',   phonics:['S','U','N'],          sentence:'The sun shines bright in the sky.', hint:'☀️ It gives us light'},
    {word:'CUP',   phonics:['C','U','P'],          sentence:'Pour some warm tea in the cup.',    hint:'☕ You drink from it'},
    {word:'PIG',   phonics:['P','I','G'],          sentence:'The pig plays in the mud.',         hint:'🐷 A pink farm animal'},
    {word:'BAG',   phonics:['B','A','G'],          sentence:'Put your books in the bag.',        hint:'👜 You carry things in it'},
    {word:'BED',   phonics:['B','E','D'],          sentence:'I sleep in my cosy bed.',           hint:'🛏️ You sleep in it'},
    {word:'RUN',   phonics:['R','U','N'],          sentence:'Let us run fast in the park.',      hint:'🏃 Moving quickly on foot'},
    {word:'MAP',   phonics:['M','A','P'],          sentence:'Use the map to find your way.',     hint:'🗺️ Shows you where to go'},
    {word:'TOP',   phonics:['T','O','P'],          sentence:'Spin the top on the floor.',        hint:'🎪 Something that spins'},
    {word:'SIT',   phonics:['S','I','T'],          sentence:'Please sit down on the chair.',     hint:'🪑 Rest in a chair'},
    {word:'HOP',   phonics:['H','O','P'],          sentence:'Frogs love to hop around.',         hint:'🐸 A small jump'},
    {word:'PET',   phonics:['P','E','T'],          sentence:'I have a pet cat and dog.',         hint:'🐠 An animal you keep at home'},
    {word:'BUG',   phonics:['B','U','G'],          sentence:'A small bug crawled on the leaf.',  hint:'🐛 A tiny insect'},
    {word:'FAN',   phonics:['F','A','N'],          sentence:'The fan keeps me cool indoors.',    hint:'🌀 Blows cool air'},
    {word:'LEG',   phonics:['L','E','G'],          sentence:'My leg is tired after the walk.',   hint:'🦵 Part of your body'},
    {word:'PIN',   phonics:['P','I','N'],          sentence:'Use a pin to hold the paper.',      hint:'📌 A sharp little object'},
    {word:'POT',   phonics:['P','O','T'],          sentence:'Cook the soup in the big pot.',     hint:'🍲 Used for cooking'},
    {word:'WEB',   phonics:['W','E','B'],          sentence:'A spider spun a beautiful web.',    hint:'🕸️ A spider makes this'},
  ],
  intermediate:[
    {word:'APPLE',  phonics:['A','PP','LE'],       sentence:'I eat a crunchy apple every day.',    hint:'🍎 A red or green fruit'},
    {word:'BLACK',  phonics:['BL','A','CK'],       sentence:'The night sky is very black.',        hint:'⬛ The darkest colour'},
    {word:'CLOUD',  phonics:['CL','OU','D'],       sentence:'A fluffy white cloud floated by.',    hint:'☁️ Floats in the sky'},
    {word:'DRINK',  phonics:['DR','I','NK'],       sentence:'Please drink your water slowly.',     hint:'💧 What you do with juice'},
    {word:'FLAME',  phonics:['FL','A','ME'],       sentence:'The flame of the candle flickered.',  hint:'🔥 Hot glowing fire'},
    {word:'GRASS',  phonics:['GR','A','SS'],       sentence:'The grass in the garden is green.',   hint:'🌿 Green plants underfoot'},
    {word:'HAPPY',  phonics:['H','A','PP','Y'],    sentence:'She felt very happy on her birthday.',hint:'😊 Feeling joyful'},
    {word:'JUICE',  phonics:['J','UI','CE'],       sentence:'Orange juice is sweet and healthy.',  hint:'🍊 A fruity drink'},
    {word:'LIGHT',  phonics:['L','IGH','T'],       sentence:'Turn on the light so we can see.',    hint:'💡 Helps us see in the dark'},
    {word:'PLANT',  phonics:['PL','A','NT'],       sentence:'Water your plant every morning.',     hint:'🌱 A living green thing'},
    {word:'SLEEP',  phonics:['SL','EE','P'],       sentence:'You need to sleep to grow strong.',   hint:'😴 What you do at night'},
    {word:'SWEET',  phonics:['SW','EE','T'],       sentence:'The sweet candy melted in my mouth.', hint:'🍬 Something sugary'},
    {word:'TRAIN',  phonics:['TR','AI','N'],       sentence:'The red train runs on long tracks.',  hint:'🚂 Travels on rails'},
    {word:'BREAD',  phonics:['BR','EA','D'],       sentence:'Warm fresh bread smells wonderful.',  hint:'🍞 Made from wheat flour'},
    {word:'CHAIR',  phonics:['CH','AI','R'],       sentence:'Please sit on the comfortable chair.',hint:'🪑 You sit on this'},
    {word:'DREAM',  phonics:['DR','EA','M'],       sentence:'I had a magical dream last night.',   hint:'💭 What happens when you sleep'},
    {word:'FLOOR',  phonics:['FL','OO','R'],       sentence:'Sweep the kitchen floor every day.',  hint:'🧹 The ground inside a room'},
    {word:'HEART',  phonics:['H','EAR','T'],       sentence:'Your heart pumps blood around you.',  hint:'❤️ Keeps you alive'},
    {word:'MAGIC',  phonics:['M','A','G','IC'],    sentence:'The magic show amazed everyone!',     hint:'🪄 Something wonderfully mysterious'},
    {word:'QUIET',  phonics:['QU','IE','T'],       sentence:'Please be quiet in the library.',     hint:'🤫 Making very little noise'},
  ],
  advanced:[
    {word:'BEAUTIFUL', phonics:['B','EAU','T','I','FUL'],   sentence:'The flowers in the garden are beautiful.',      hint:'🌸 Very pleasing to see'},
    {word:'CHILDREN',  phonics:['CH','I','LDR','EN'],        sentence:'The children played happily outside.',           hint:'👶 Young boys and girls'},
    {word:'COMPLETE',  phonics:['C','OM','PL','ETE'],        sentence:'Please complete all your homework today.',       hint:'✅ To finish fully'},
    {word:'ELEPHANT',  phonics:['EL','E','PH','ANT'],        sentence:'The elephant trumpeted loudly at the zoo.',      hint:'🐘 The largest land animal'},
    {word:'FRIENDLY',  phonics:['FR','I','END','LY'],        sentence:'She is the most friendly person I know.',       hint:'🤝 Kind and warm to others'},
    {word:'LANGUAGE',  phonics:['L','AN','GU','AGE'],        sentence:'English is a widely spoken language.',          hint:'💬 A way people communicate'},
    {word:'MOUNTAIN',  phonics:['M','OU','NT','A','IN'],     sentence:'We climbed to the top of the tall mountain.',   hint:'⛰️ A very tall hill'},
    {word:'NOTHING',   phonics:['N','O','TH','ING'],         sentence:'There was absolutely nothing in the box.',      hint:'🕳️ Not anything at all'},
    {word:'OUTSIDE',   phonics:['OU','T','S','IDE'],         sentence:'Let us play outside in the fresh air.',         hint:'🌞 Beyond the walls of a building'},
    {word:'PICTURE',   phonics:['P','I','CT','URE'],         sentence:'Draw a colourful picture for your mum.',        hint:'🎨 A drawing or photograph'},
    {word:'PRINCESS',  phonics:['PR','I','NC','ESS'],        sentence:'The princess wore a glittering gold crown.',    hint:'👸 A royal young woman'},
    {word:'QUESTION',  phonics:['QU','EST','ION'],           sentence:'Ask your teacher a thoughtful question.',       hint:'❓ Something you ask to find out'},
    {word:'SHOULDER',  phonics:['SH','OUL','DER'],           sentence:'He gently tapped her on the shoulder.',         hint:'🫱 The top of your arm'},
    {word:'STRAIGHT',  phonics:['STR','AIGH','T'],           sentence:'Walk in a perfectly straight line.',            hint:'📏 Not curved or bent'},
    {word:'TREASURE',  phonics:['TR','EA','S','URE'],        sentence:'Pirates searched for the hidden treasure.',     hint:'💎 Something precious and valuable'},
    {word:'UMBRELLA',  phonics:['UM','BR','ELL','A'],        sentence:'Bring your umbrella because it may rain.',      hint:'☂️ Keeps you dry in the rain'},
    {word:'VILLAGE',   phonics:['V','I','LL','AGE'],         sentence:'The little village was peaceful and quiet.',    hint:'🏘️ A small community of homes'},
    {word:'WHISPER',   phonics:['WH','I','SP','ER'],         sentence:'Please whisper so you don\'t wake the baby.',   hint:'🤫 Speaking very softly'},
    {word:'JOURNEY',   phonics:['J','OUR','N','EY'],         sentence:'It was a long and exciting journey abroad.',    hint:'🗺️ A long trip somewhere'},
    {word:'KITCHEN',   phonics:['K','I','TCH','EN'],         sentence:'Mum cooks delicious meals in the kitchen.',    hint:'👨‍🍳 Room where you cook food'},
  ]
};

export const getPhClass = (ph) => {
  const vp = ['A','E','I','O','U','EE','AI','EA','OO','OU','IE','UI','IGH','EAR','EAU','OUR','AIGH','AU','OI'];
  if (vp.includes(ph)) return 'vowel';
  if (DIGRAPHS.has(ph)) return 'digraph';
  if (BLENDS.has(ph)) return 'blend';
  return 'consonant';
};
