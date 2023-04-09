const usernames = [
  'testuser01',
  'testuser02',
  'testuser03',
  'testuser04',
  'testuser05',
  'testuser06',
];

const thoughts = [
  'How to create a use case document',
  `Why I believe Acura's are sportier vehicles than Lexus`,
  'Best exercises to build a thicker forearm',
  'Benefits of eating red grapes',
  'Benefits of dring coffee',
  'Why sprinting is better than steady state cardio',
];

const reactions = [
  'I absolutely agree!',
  'I absolutely disagree!',
  'This is fantastic information',
  'Thank you for the great content',
  'Thanks this was very informative',
  `I'm motivated to start sprinting now`,
];

const emails = [
  'testuser01@gmail.com',
  'testuser02@gmail.com',
  'testuser03@gmail.com',
  'testuser04@gmail.com',
  'testuser05@gmail.com',
  'testuser06@gmail.com',
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}`;

// Function to generate random Thoughts that we can add to the database. Includes reactions.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      ThoughtText: getRandomArrItem(thoughts),
      description: getRandomArrItem(descriptionsBodies),
      advertiserFriendly: Math.random() < 0.5,
      responses: [...getReactions(3)],
    });
  }
  return results;
};

// Create the responses that will be added to each video
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(reactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      responseBody: getRandomArrItem(reactions),
      username: getRandomUsername(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomVideos, getRandomVideos };
