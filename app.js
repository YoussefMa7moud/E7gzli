const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DATALOG = require("./MODELS/loginDB.js");
const TICKETS= require("./MODELS/ADDTickets.js")
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.set('view engine', 'ejs');
app.use(express.static('public'));



app.post('/signup', async (req, res) => {
  const { Fullname, email, Password, PhoneNumber, day, month, year, Gender, type } = req.body;

  const DateOfBirth = new Date(year, month - 1, day);

  const newUser = new DATALOG({
      Fullname: Fullname,
      email: email,
      Password: Password,
      PhoneNumber: PhoneNumber,
      DateOfBirth: DateOfBirth,
      Gender: Gender,
      type: 1 
  });

  try {
      await newUser.save();
      res.status(200).send(res.render('USADD.ejs'));
  } catch (error) {
      res.status(400).send('Error registering user: ' + error.message);
  }
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === "admin" && password === "admin") {
      return res.status(200).json({ success: true, type: 2 }); 
    }

    if (email === "master" && password === "master") {
      return res.status(200).json({ success: true, type: 3 }); 
    }

    const user = await DATALOG.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }
    if (user.Password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }
    res.status(200).json({ success: true, type: user.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
//    End of LOGIN    //

//     ROUTES     //

  app.get('/index', (req, res) => {
    res.render('index.ejs');
  });




  app.get('/Master', async (req, res) => {
    try {
      const Admins = await DATALOG.find({ type: 2 });
      res.render('Master', { Admins }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });






  app.post('/Master/Creat-Admin', async (req, res) => {
    const { Fullname,Password,email, PhoneNumber, Gender ,type, Num } = req.body;

  
    const newAdmin = new DATALOG({
        Fullname: Fullname,
        Password: Password,
        email: email,
        PhoneNumber: PhoneNumber,
        Gender:Gender,
        type: 2,
        Num:Num
    });
  
       try {
      await newAdmin.save();
      const admins = await DATALOG.find({ type: 2 }); 
      res.render('Master', { Admins: admins }); 
  } catch (error) {
      res.status(400).send('Error registering user: ' + error.message);
  }
});
  






app.delete('/Master/Delete-Admin/:id', async (req, res) => {
  try {
      const adminId = req.params.id;
      await DATALOG.findByIdAndDelete(adminId);
      res.json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting admin: ' + error.message });
  }
});










  app.get('/POTM', (req, res) => {
    res.render('potm.ejs');
  });

  app.get('/MyAccount', (req, res) => {
    res.render('MyAccount.ejs');
  });


  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/Store', (req, res) => {
    res.render('store.ejs');
  });

  app.get('/BookNow', (req, res) => {
    res.render('BookNow.ejs');
  });

  
  app.get('/Browse', async (req, res) => {
    try {
      const events = await TICKETS.find();
      events.forEach(event => {
        event.totalTickets = event.cat1 + event.cat2 + event.cat3;
      });
      res.render('browse.ejs', { events: events });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  


  app.get('/Admin', async (req, res) => {
    try {
      const events = await TICKETS.find();
      events.forEach(event => {
        event.totalTickets = event.cat1 + event.cat2 + event.cat3;
      });
      res.render('admin.ejs', { events: events });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });




  app.delete('/delete-event/:id', async (req, res) => {
    try {
      await TICKETS.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  });
  


  

  app.post('/ADMIN/ADD-TICKETS', async (req, res) => {
    try {
        const newTicket = new TICKETS(req.body);
        await newTicket.save();
        res.status(200).send(res.render('ADDED.ejs'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});






app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


mongoose.connect("mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/USER-DATA?retryWrites=true&w=majority&appName=USER-DATA")
.then(() => {
  console.log('Mongo Connected!');
})
.catch(() => {
  console.log('Mongo connection failed');
})

