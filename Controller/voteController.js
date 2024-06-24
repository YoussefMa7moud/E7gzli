const Player = require('../MODELS/POTM');

exports.votePlayer = async (req, res) => {
    const { player } = req.body;

    console.log('Received vote request for player:', player);
  
    try {
      // Find the player in the database
      let foundPlayer = await Player.findOne({ name: player });
  
      if (!foundPlayer) {
        console.log('Player not found:', player);
        return res.status(404).send('Player not found');
      }
  
      // Increment the vote count
      foundPlayer.votes += 1;
  
      // Save updated player data
      await foundPlayer.save();
  
      console.log('Successfully voted for player:', player, 'Total votes:', foundPlayer.votes);
  
      // Send back the updated vote count
      res.status(200).json(foundPlayer.votes);
    } catch (err) {
      console.error('Error voting for player:', player, err);
      res.status(500).send('Server Error');
    }
};


