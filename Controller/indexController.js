const DATALOG = require('../MODELS/loginDB.js');
const TICKETS = require('../MODELS/ADDTickets.js');
const STORE = require('../MODELS/Store.js');
const Message = require('../MODELS/Message.js');
const History=require('../MODELS/History.js');
const path = require('path');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
  try {
    if (req.session.type === 1) {
      const Users = await DATALOG.find({ type: 1 });
      res.render('index', { Users });
    } else if (req.session.type === 2) {
      const Admins = await DATALOG.find({ type: 2 });
      res.render('admin', { Admins });
    }else if (req.session.type === 3){
        const masters = await DATALOG.find({ type: 3 });
        res.render('Master', { masters });
      }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.signup = async (req, res) => {
  const { Fullname, email, Password, PhoneNumber, day, month, year, Gender } = req.body;
  const DateOfBirth = new Date(year, month - 1, day);
  try {
  const hashedPassword = await bcrypt.hash(Password, 10);
  const newUser = new DATALOG({
    Fullname,
    email,
    Password,
    PhoneNumber,
    DateOfBirth,
    Gender,
    type: 1
  });

  
    await newUser.save();
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.status(200).send(res.render('USADD.ejs'));
  } catch (error) {
     res.status(400).send('Error registering user: ' + error.message);
  }
};

exports.login = async (req, res) => {
  const { em, pass } = req.body;

  try {
    const user = await DATALOG.findOne({ email:em});

    if (!user || user.Password !== pass) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }

    req.session.isLoggedIn = true;
    req.session.type=user.type;
    req.session.user = {
      id: user._id,
      Fullname: user.Fullname,
      email: user.email
    };
    res.status(200).json({ success: true, type: user.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.browseEvents = async (req, res) => {
  try {
    const events = await TICKETS.find();
    events.forEach(event => {
      event.totalTickets = event.cat1 + event.cat2 + event.cat3;
    });
    res.render('browse.ejs', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ success: false, message: 'Failed to logout' });
      }
      res.clearCookie('session-id'); 
      log(req,res);
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ success: false, message: 'Server error during logout' });
  }
};

async function log(req,res){
  try{
  req.session.isLoggedIn=false;
  req.session.type=50;
}
catch{

}
}

exports.getEventData = async (req, res) => {
  try {
    const ticketId =  req.params.id;
    const event = await TICKETS.findById(ticketId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const event2 = await TICKETS.find(); 
    res.render('BookNow', { event, event2 }); 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching event data: ' + error.message });
  }
};


/* Store */
exports.getProfile = async (req, res) => {
  try {
      const team = await STORE.find();
      res.render('Store', { team });
  } catch (error) {
      res.status(500).send('Server error');
  }
};


exports.AddPICTURE = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  const imgFile = req.files.img;
  const validExtensions = ['.png', '.jpeg', '.jpg'];
  const fileExtension = path.extname(imgFile.name).toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
      return res.status(400).send('Invalid file type.');
  }

  const fileName = req.body.un + fileExtension;
  const uploadPath = path.join(__dirname, '../public/materials/', fileName);

  imgFile.mv(uploadPath, function (err) {
      if (err) {
          return res.status(500).send(err);
      }

      const pic = new Employees({
          UserName: req.body.un,
          Password: req.body.pw,
          Image: fileName,
          Type: req.body.type
      });

      pic.save()
          .then(() => {
              res.redirect('/master');
          })
          .catch(err => {
              console.log(err);
              res.status(500).send('Error saving employee data.');
          });
  });
};

exports.GetPICTURE = (req, res) => {
  var query = { UserName: req.body.un, Password: req.body.pw };
  STORE.findOne(query)
      .then(result => {
          if (!result) {
              return res.status(404).send('User not found.');
          }
          req.session.user = result;
          res.redirect('/master');
      })
      .catch(err => {
          console.log(err);
          res.status(500).send('Error retrieving user data.');
      });
};



exports.sendMessage = async (req, res) => {
  const userMessage = req.body.message;
  const newMessage = new Message({ content: userMessage });

  try {
    await newMessage.save();
    return res.send('<script>alert("Message received successfully. Thank you!"); window.location.href = "/index";</script>');
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving message.' });
  }
};





exports.getFeedback = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const messages = await Message.find().skip(skip).limit(limit);
    const totalMessages = await Message.countDocuments();
    const totalPages = Math.ceil(totalMessages / limit);

    res.render('feedback', { messages, page, totalPages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching messages: ' + error.message });
  }
};



exports.deletemessage = async (req, res) => {
  try {
    const messageid = req.params.id;
    await Message.findByIdAndDelete(messageid);
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting message: ' + error.message });
  }
};





exports.buyticket = async (req, res) => {
  console.log('Params:', req.params);
  const { cardHolderName, cardNumber, cvv, cat3Quantity, cat2Quantity, cat1Quantity } = req.body;
  const userId = req.session.user.id;
  const ticketId = req.params.id;

  try {
    // Validate and parse quantities
    const cat3Qty = parseInt(cat3Quantity, 10);
    const cat2Qty = parseInt(cat2Quantity, 10);
    const cat1Qty = parseInt(cat1Quantity, 10);

    if (isNaN(cat3Qty) || isNaN(cat2Qty) || isNaN(cat1Qty)) {
      return res.status(400).json({ message: 'Invalid ticket quantities' });
    }

    // Find the user by ID
    const user = await DATALOG.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the sensitive information
    const hashedCardHolderName = await bcrypt.hash(cardHolderName, 10);
    const hashedCardNumber = await bcrypt.hash(cardNumber, 10);
    const hashedCvv = await bcrypt.hash(cvv, 10);

    // Update user's card details
    user.cardHolderName = hashedCardHolderName;
    user.cardNumber = hashedCardNumber;
    user.cvv = hashedCvv;

    // Save updated user object
    await user.save();

    console.log('ticketId:', ticketId);
    const event = await TICKETS.findById(ticketId);
    console.log('Event:', event);
    if (!event) {
      console.error(`Event not found for id: ${ticketId}`);
      return res.status(404).json({ message: 'Event not found' });
    }

    // Calculate the total amount
    const totalAmount = (cat3Qty * event.cat3price) + (cat2Qty * event.cat2price) + (cat1Qty * event.cat1price);

   
    if (event.cat3quantity < cat3Qty || event.cat2quantity < cat2Qty || event.cat1quantity < cat1Qty) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    // Decrement ticket quantities
    event.cat3quantity -= cat3Qty;
    event.cat2quantity -= cat2Qty;
    event.cat1quantity -= cat1Qty;

    // Save the updated event object
    await event.save();

    const historyEntry = new History({
      userId: userId,
      eventId: ticketId,
      timestamp: new Date(),
      cat3Quantity: cat3Qty,
      cat2Quantity: cat2Qty,
      cat1Quantity: cat1Qty,
      totalAmount: totalAmount,
    });
    await historyEntry.save();
    const existingEvent = await TICKETS.findById(ticketId);
    if (!existingEvent) {
      console.log(`Event with ID ${ticketId} was deleted after purchase.`);
      

      await History.deleteOne({ _id: historyEntry._id });
      
      // Optionally, you can log or handle the deletion of history
      console.log(`History entry for event ${ticketId} deleted.`);
    }
   res.render("SUCCESSB");
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.renderMyAccount = async (req, res) => {
  try {
    if (!req.session.isLoggedIn || !req.session.user || !req.session.user.id) {
      return res.status(401).send('User not authenticated');
    }

    const user = await DATALOG.findById(req.session.user.id);

    if (!user) {
      return res.status(404).send('User not found');
    }
    const purchaseHistory = await History.find({ userId: req.session.user.id });

    res.render('MyAccount', { user, purchaseHistory }); 
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Server error');
  }
};


