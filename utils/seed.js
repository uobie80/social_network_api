const connection = require('../config/connection');
const { User, Thought } = require('../models');

//Define user and thoughts data
const usernamesList = [
  'testuser01',
  'testuser02',
  'testuser03',
  'testuser04',
  'testuser05',
  'testuser06',
  'testuser07',
  'testuser08',
  'testuser09',
  'testuser10',
];

const thoughtsList = [
  'How to create a use case document',
  `Why I believe Acura's are sportier vehicles than Lexus`,
  'Best exercises to build a thicker forearm',
  'Benefits of eating red grapes',
  'Benefits of dring coffee',
  'Why sprinting is better than steady state cardio',
  'Why Oauth 2.0 is more secure than SAML',
  'My opinion on JavaScript',
  'How iPhone ushered in era of mobile computing',
  'Why resilience matters',
];

const reactionsList = [
  'I absolutely agree!',
  'I absolutely disagree!',
  'This is fantastic information',
  'Thank you for the great content',
  'Thanks this was very informative',
  `I'm motivated to start sprinting now`,
  `I'm happy to hear about that`,
  `That's amazing`,
  'This post is brillant!',
  'This post helped me better understand the subject',
];

const emailsList = [
  'testuser01@gmail.com',
  'testuser02@gmail.com',
  'testuser03@gmail.com',
  'testuser04@gmail.com',
  'testuser05@gmail.com',
  'testuser06@gmail.com',
  'testuser07@gmail.com',
  'testuser08@gmail.com',
  'testuser09@gmail.com',
  'testuser10@gmail.com',
];


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const userObjs = [];

  for (let i = 0; i < usernamesList.length; i++) {
    let user = {
      username: usernamesList[i],
      email: emailsList[i],
      thoughts: [],
      friends: [],
    }
    userObjs.push(user);   
  }

 await User.collection.insertMany(userObjs);

const reactionObjs = [];

 for (let i = 0; i < reactionsList.length; i++) {

         let reaction = {
              reactionBody: reactionsList[i],
              username: usernamesList[i],
           } 

  reactionObjs.push(reaction);
}


const thoughtObjs = [];

for (let i = 0; i < thoughtsList.length; i++) {

  let item = reactionObjs[i];
  let index = reactionObjs.indexOf(item);
  reactionObjs.splice(index, 1);
     
  let thought = {
    ThoughtText: thoughtsList[i],
    username: usernamesList[i],
    reactions: [...reactionObjs],
  }

   thoughtObjs.push(thought);
   reactionObjs.splice(index, 0, item);
}

  
 await Thought.collection.insertMany(thoughtObjs);

 
  console.table(userObjs);
  console.table(thoughtObjs);
  console.info('Seeding complete!');
  process.exit(0);
});
