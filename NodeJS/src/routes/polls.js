const express = require('express');
const router = express.Router();
const Poll = require('../models/polls');

// PUT /polls/create
router.put('/create', async (req, res) => {
  const { question, option1, option2, option3, option4 } = req.body;

  if (![question, option1, option2, option3, option4].every(field => field && field.trim())) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  const options = [option1, option2, option3, option4].map(o => o.trim().toLowerCase());
  if (new Set(options).size !== options.length) {
    return res.status(400).json({ error: 'Options must be unique' });
  }

  try {
    await Poll.deleteMany({});
    await Poll.create({ question, option1, option2, option3, option4 });
    res.status(201).json({ message: 'Poll created successfully.' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create poll' });
  }
});

// GET /polls/fetch
router.get('/fetch', async (req, res) => {
  try {
    const poll = await Poll.findOne();
    if (!poll) {
      return res.status(400).json({ error: 'Poll not found. Please create a poll' });
    }
    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching poll' });
  }
});

// PATCH /polls/updateVotes
router.patch('/updateVotes', async (req, res) => {
  const { selectedOption } = req.body;

  try {
    const poll = await Poll.findOne();
    if (!poll) return res.status(400).json({ error: 'Poll not found. Please create a poll' });

    if (!['option1', 'option2', 'option3', 'option4'].includes(selectedOption)) {
      return res.status(400).json({ error: 'Invalid option' });
    }

    // Increment vote
    poll[selectedOption + 'Votes']++;

    const totalVotes =
      poll.option1Votes + poll.option2Votes + poll.option3Votes + poll.option4Votes;

    ['option1', 'option2', 'option3', 'option4'].forEach(option => {
      const voteKey = option + 'Votes';
      const percentKey = option + 'Percentage';
      poll[percentKey] = parseFloat(((poll[voteKey] / totalVotes) * 100).toFixed(2));
    });

    await poll.save();
    res.json({ message: 'Vote registered successfully.' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update vote' });
  }
});

module.exports = router;
