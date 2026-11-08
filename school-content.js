/* Gidro School content.
   Malagasy words: checked and confirmed by Nene (Preschool list) or taken from Nene's own story (Kindergarten).
   To add a month: add its words to WORDS, then give the month 3 weeks of word ids and set ready:true. */

const WORDS = {
  /* Preschool, Month 1: greetings */
  salama:   { mg:'salama',   en:'hello',               fr:'bonjour',               pic:'👋' },
  veloma:   { mg:'veloma',   en:'goodbye',             fr:'au revoir',             pic:'🚪' },
  misaotra: { mg:'misaotra', en:'thank you',           fr:'merci',                 pic:'💝' },
  azafady:  { mg:'azafady',  en:'please / excuse me',  fr:"s'il te plaît / pardon", pic:'🙏' },
  eny:      { mg:'eny',      en:'yes',                 fr:'oui',                   pic:'👍' },
  tsia:     { mg:'tsia',     en:'no',                  fr:'non',                   pic:'👎' },
  /* colors */
  mena:     { mg:'mena',     en:'red',    fr:'rouge',  color:'#d93a3a' },
  mavo:     { mg:'mavo',     en:'yellow', fr:'jaune',  color:'#f5c518' },
  maitso:   { mg:'maitso',   en:'green',  fr:'vert',   color:'#3e9b4f' },
  manga_c:  { mg:'manga',    en:'blue',   fr:'bleu',   color:'#2f6fd0' },
  fotsy:    { mg:'fotsy',    en:'white',  fr:'blanc',  color:'#ffffff' },
  mainty:   { mg:'mainty',   en:'black',  fr:'noir',   color:'#1b1b1b' },
  voasary:  { mg:'voasary',  en:'orange', fr:'orange', color:'#f28a1e' },
  mavokely: { mg:'mavokely', en:'pink',   fr:'rose',   color:'#f29ac0' },
  /* Month 2: numbers */
  iray:   { mg:'iray',   en:'one',   fr:'un',     count:1 },
  roa:    { mg:'roa',    en:'two',   fr:'deux',   count:2 },
  telo:   { mg:'telo',   en:'three', fr:'trois',  count:3 },
  efatra: { mg:'efatra', en:'four',  fr:'quatre', count:4 },
  dimy:   { mg:'dimy',   en:'five',  fr:'cinq',   count:5 },
  enina:  { mg:'enina',  en:'six',   fr:'six',    count:6 },
  fito:   { mg:'fito',   en:'seven', fr:'sept',   count:7 },
  valo:   { mg:'valo',   en:'eight', fr:'huit',   count:8 },
  sivy:   { mg:'sivy',   en:'nine',  fr:'neuf',   count:9 },
  folo:   { mg:'folo',   en:'ten',   fr:'dix',    count:10 },
  /* Month 3: family */
  reny:     { mg:'reny',     en:'mother',      fr:'maman',       pic:'👩🏾' },
  ray:      { mg:'ray',      en:'father',      fr:'papa',        pic:'👨🏾' },
  zazakely: { mg:'zazakely', en:'baby',        fr:'bébé',        pic:'👶🏾' },
  rahalahy: { mg:'rahalahy', en:'brother (a boy says)',  fr:'frère (dit par un garçon)', pic:'👦🏾', group:'brother' },
  anadahy:  { mg:'anadahy',  en:'brother (a girl says)', fr:'frère (dit par une fille)', pic:'👦🏾', group:'brother' },
  rahavavy: { mg:'rahavavy', en:'sister (a girl says)',  fr:'sœur (dit par une fille)',  pic:'👧🏾', group:'sister' },
  anabavy:  { mg:'anabavy',  en:'sister (a boy says)',   fr:'sœur (dit par un garçon)',  pic:'👧🏾', group:'sister' },
  renibe:   { mg:'renibe',   en:'grandmother', fr:'grand-mère',  pic:'👵🏾', alt:'nenibe' },
  raibe:    { mg:'raibe',    en:'grandfather', fr:'grand-père',  pic:'👴🏾' },
  fianakaviana: { mg:'fianakaviana', en:'family', fr:'famille', pic:'👨‍👩‍👧' },
  /* Month 4: my body */
  loha:     { mg:'loha',     en:'head',  fr:'tête',    pic:'🙂' },
  maso:     { mg:'maso',     en:'eye',   fr:'œil',     pic:'👁️' },
  sofina:   { mg:'sofina',   en:'ear',   fr:'oreille', pic:'👂🏾' },
  orona:    { mg:'orona',    en:'nose',  fr:'nez',     pic:'👃🏾' },
  vava:     { mg:'vava',     en:'mouth', fr:'bouche',  pic:'👄' },
  volo:     { mg:'volo',     en:'hair',  fr:'cheveux', pic:'💇🏾' },
  tanana:   { mg:'tanana',   en:'hand',  fr:'main',    pic:'✋🏾' },
  tongotra: { mg:'tongotra', en:'foot',  fr:'pied',    pic:'🦶🏾' },
  /* Month 5: animals */
  gidro:    { mg:'gidro',    en:'lemur',     fr:'lémurien',  pic:'gidro' },
  alika:    { mg:'alika',    en:'dog',       fr:'chien',     pic:'🐕' },
  saka:     { mg:'saka',     en:'cat',       fr:'chat',      pic:'🐈' },
  vorona:   { mg:'vorona',   en:'bird',      fr:'oiseau',    pic:'🐦' },
  akoho:    { mg:'akoho',    en:'chicken',   fr:'poule',     pic:'🐔' },
  omby:     { mg:'omby',     en:'zebu / cow', fr:'zébu / vache', pic:'🐄' },
  trondro:  { mg:'trondro',  en:'fish',      fr:'poisson',   pic:'🐟' },
  tanalahy: { mg:'tanalahy', en:'chameleon', fr:'caméléon',  pic:'🦎', alt:'amboalava' },
  /* Month 6: food */
  vary:     { mg:'vary',     en:'rice',   fr:'riz',    pic:'🍚' },
  rano:     { mg:'rano',     en:'water',  fr:'eau',    pic:'💧' },
  mofo:     { mg:'mofo',     en:'bread',  fr:'pain',   pic:'🍞' },
  akondro:  { mg:'akondro',  en:'banana', fr:'banane', pic:'🍌' },
  manga_f:  { mg:'manga',    en:'mango',  fr:'mangue', pic:'🥭', note:{en:'"manga" also means blue', fr:'« manga » veut aussi dire bleu'} },
  atody:    { mg:'atody',    en:'egg',    fr:'œuf',    pic:'🥚' },
  ronono:   { mg:'ronono',   en:'milk',   fr:'lait',   pic:'🥛' },

  /* Kindergarten, Month 1: from Nene's story "Raha manakaiky ny vitsika" */
  vitsika:  { mg:'vitsika',  en:'ant',        fr:'fourmi',     pic:'🐜' },
  frezy:    { mg:'frezy',    en:'strawberry', fr:'fraise',     pic:'🍓' },
  sifotra:  { mg:'sifotra',  en:'snail',      fr:'escargot',   pic:'🐌' },
  totozy:   { mg:'totozy',   en:'mouse',      fr:'souris',     pic:'🐭' },
  kiraro:   { mg:'kiraro',   en:'shoe',       fr:'chaussure',  pic:'👡' },
  boky:     { mg:'boky',     en:'book',       fr:'livre',      pic:'📘' },
  baolina:  { mg:'baolina',  en:'ball',       fr:'ballon',     pic:'⚽' },
  kitapo:   { mg:'kitapo',   en:'bag',        fr:'sac',        pic:'👜' },
  alika_k:  { mg:'alika',    en:'dog',        fr:'chien',      pic:'🐕' },
  zandriko: { mg:'zandriko', en:'my little brother or sister', fr:'mon petit frère ou ma petite sœur', pic:'🧒🏾' },
  izaho:    { mg:'izaho',    en:'me / I',     fr:'moi / je',   pic:'🙋🏾‍♀️' },
  lava:     { mg:'lava',     en:'long / tall', fr:'long / grand', pic:'📏' }
};

/* Nene's story. Pictures 01–12 in /learn/stories/raha-manakaiky-ny-vitsika/ */
const STORIES = {
  vitsika: {
    title: 'Raha manakaiky ny vitsika',
    by: 'Nene Andriananjason',
    sub: { en:'When the ant comes close', fr:'Quand la fourmi s’approche' },
    pages: [
      { mg:'Ny vitsika no lehibe indrindra, izany ve?', en:'Is the ant the biggest of all?', fr:'La fourmi est-elle la plus grande de toutes ?' },
      { mg:'Raha manakaiky ny vitsika ny frezy dia ny frezy mbola lava noho ny vitsika.', en:'When the strawberry comes close to the ant, the strawberry is longer than the ant.', fr:'Quand la fraise s’approche de la fourmi, la fraise est plus longue que la fourmi.' },
      { mg:'Raha manakaiky ny frezy ny sifotra dia ny sifotra mbola lava noho ny frezy.', en:'When the snail comes close to the strawberry, the snail is longer than the strawberry.', fr:'Quand l’escargot s’approche de la fraise, l’escargot est plus long que la fraise.' },
      { mg:'Raha manakaiky ny sifotra ny totozy dia ny totozy mbola lava noho ny sifotra.', en:'When the mouse comes close to the snail, the mouse is longer than the snail.', fr:'Quand la souris s’approche de l’escargot, la souris est plus longue que l’escargot.' },
      { mg:'Raha manakaiky ny totozy ny kiraro dia ny kiraro mbola lava noho ny totozy.', en:'When the shoe comes close to the mouse, the shoe is longer than the mouse.', fr:'Quand la chaussure s’approche de la souris, la chaussure est plus longue que la souris.' },
      { mg:'Raha manakaiky ny kiraro ny boky dia ny boky mbola lava noho ny kiraro.', en:'When the book comes close to the shoe, the book is longer than the shoe.', fr:'Quand le livre s’approche de la chaussure, le livre est plus long que la chaussure.' },
      { mg:'Raha manakaiky ny boky ny baolina dia ny baolina mbola lava noho ny boky.', en:'When the ball comes close to the book, the ball is bigger than the book.', fr:'Quand le ballon s’approche du livre, le ballon est plus grand que le livre.' },
      { mg:'Raha manakaiky ny baolina ny kitapo dia ny kitapo mbola lava noho ny baolina.', en:'When the bag comes close to the ball, the bag is taller than the ball.', fr:'Quand le sac s’approche du ballon, le sac est plus grand que le ballon.' },
      { mg:'Raha manakaiky ny kitapo ny alika dia ny alika mbola lava noho ny kitapo.', en:'When the dog comes close to the bag, the dog is taller than the bag.', fr:'Quand le chien s’approche du sac, le chien est plus grand que le sac.' },
      { mg:'Raha manakaiky ny alika ny zandriko dia ny zandriko mbola lava noho ny alika.', en:'When my little brother comes close to the dog, my little brother is taller than the dog.', fr:'Quand mon petit frère s’approche du chien, mon petit frère est plus grand que le chien.' },
      { mg:'Ary izaho? Raha manakaiky ahy ny zandriko, dia izaho mbola lava noho izy.', en:'And me? When my little brother comes close to me, I am taller than him.', fr:'Et moi ? Quand mon petit frère s’approche de moi, je suis plus grande que lui.' },
      { mg:'Izaho izany no lava indrindra!', en:'So I am the tallest of all!', fr:'C’est donc moi la plus grande !' }
    ],
    /* order from smallest to biggest, used for "which is longer?" questions */
    order: ['vitsika','frezy','sifotra','totozy','kiraro','boky','baolina','kitapo','alika_k','zandriko','izaho']
  }
};

const SOON = { ready:false };
const CLASSES = [
  { id:'pre', age:'3', color:'#e07a3f', tint:'#fde6d6', en:'Preschool', fr:'Petite section',
    blurb:{ en:'First words with pictures, colors and numbers', fr:'Premiers mots en images, couleurs et chiffres' },
    months: [
      { ready:true, en:'Hello and colors', fr:'Bonjour et couleurs', icon:'👋',
        weeks:[ { words:['salama','veloma','misaotra','azafady','eny','tsia'], game:'match' },
                { words:['mena','mavo','maitso','manga_c'], game:'paint' },
                { words:['fotsy','mainty','voasary','mavokely'], game:'paint' } ] },
      { ready:true, en:'Numbers 1 to 10', fr:'Les nombres de 1 à 10', icon:'🔢',
        weeks:[ { words:['iray','roa','telo'], game:'count' },
                { words:['efatra','dimy','enina'], game:'count' },
                { words:['fito','valo','sivy','folo'], game:'count' } ] },
      { ready:true, en:'My family', fr:'Ma famille', icon:'🏠',
        weeks:[ { words:['reny','ray','zazakely'], game:'match' },
                { words:['rahalahy','anadahy','rahavavy','anabavy'], game:'match' },
                { words:['renibe','raibe','fianakaviana'], game:'match' } ] },
      { ready:true, en:'My body', fr:'Mon corps', icon:'🧒🏾',
        weeks:[ { words:['loha','maso','sofina'], game:'match' },
                { words:['orona','vava','volo'], game:'match' },
                { words:['tanana','tongotra'], game:'match' } ] },
      { ready:true, en:'Animals', fr:'Les animaux', icon:'🐾',
        weeks:[ { words:['gidro','alika','saka'], game:'match' },
                { words:['vorona','akoho','omby'], game:'match' },
                { words:['trondro','tanalahy'], game:'match' } ] },
      { ready:true, en:'Food', fr:'La nourriture', icon:'🍚',
        weeks:[ { words:['vary','rano','mofo'], game:'match' },
                { words:['akondro','manga_f','atody'], game:'match' },
                { words:['ronono'], game:'match' } ] },
      Object.assign({ en:'Weather', fr:'La météo', icon:'🌦️' }, SOON),
      Object.assign({ en:'Clothes', fr:'Les vêtements', icon:'👕' }, SOON),
      Object.assign({ en:'My home', fr:'Ma maison', icon:'🏡' }, SOON),
      Object.assign({ en:'At school', fr:'À l’école', icon:'🎒' }, SOON),
      Object.assign({ en:'Feelings', fr:'Les émotions', icon:'😊' }, SOON),
      Object.assign({ en:'Big review', fr:'Grande révision', icon:'🎓' }, SOON)
    ] },
  { id:'prek', age:'4', color:'#d9a031', tint:'#fbefd2', en:'Pre-K', fr:'Moyenne section',
    blurb:{ en:'Letter, color and number of the week', fr:'La lettre, la couleur et le chiffre de la semaine' }, months:[] },
  { id:'k', age:'5', color:'#3a7ca5', tint:'#e3eef5', en:'Kindergarten', fr:'Grande section',
    blurb:{ en:'Letter sounds, first reading and story time', fr:'Le son des lettres, premières lectures et histoires' },
    months: [
      { ready:true, en:'Story: Raha manakaiky ny vitsika', fr:'Histoire : Raha manakaiky ny vitsika', icon:'🐜', story:'vitsika',
        weeks:[ { words:['vitsika','frezy','sifotra','totozy'], game:'story', pages:[0,4] },
                { words:['kiraro','boky','baolina','kitapo'], game:'story', pages:[4,8] },
                { words:['alika_k','zandriko','izaho','lava'], game:'story', pages:[8,12] } ] }
    ] },
  { id:'g1', age:'6', color:'#5a9fc9', tint:'#e5f1f8', en:'1st grade', fr:'CP · 11ème',
    blurb:{ en:'Reading and writing sentences', fr:'Lire et écrire des phrases' }, months:[] },
  { id:'g2', age:'7', color:'#3e8c63', tint:'#e1f0e6', en:'2nd grade', fr:'CE1 · 10ème',
    blurb:{ en:'Grammar and short stories', fr:'Grammaire et petites histoires' }, months:[] },
  { id:'g3', age:'8', color:'#6aa883', tint:'#e6f3ea', en:'3rd grade', fr:'CE2 · 9ème',
    blurb:{ en:'Stories, angano and ohabolana', fr:'Histoires, angano et ohabolana' }, months:[] }
];
/* every class has 12 months; the ones not written yet show as "being prepared" */
CLASSES.forEach(c => { while (c.months.length < 12) c.months.push(Object.assign({ en:'Being prepared', fr:'En préparation', icon:'✏️' }, SOON)); });
