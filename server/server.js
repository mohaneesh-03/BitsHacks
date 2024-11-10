const express = require('express');
const connectDB = require('./config/db');
const hackathonRoutes = require('./routes/hackathonRoutes');
const teamRoutes = require('./routes/teamRoutes');
const cors = require("cors");
const Student = require('./models/Student');
const Team = require('./models/Team');
const Hackathon = require('./models/Hackathon');

const app = express();


// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/teams', teamRoutes);

app.post('/api/students/login', async(req, res) =>{
    const {email, passowrd} = req.body;

    let student = await Student.findOne({email});

    if(student && passowrd === student.passowrd){
        return res.status(200).json({ message: 'Login successful', student });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
})

app.post('/api/teams/getid', async(req,res)=>{
    const {teamName} = req.body;

    const team = await Team.findOne({teamName});

    if(team){
        return res.status(200).json({message: 'sucess', team});

    } else{
        return res.status(401).json({message: 'fail'});
    }
})

app.post('/api/events/team', async(req,res)=>{
    const {idteam} = req.body;
    

    const team = await Team.findById(idteam);

    if(team){
        return res.status(200).json({message: 'sucess', team});

    } else{
        return res.status(401).json({message: 'fail'});
    }
})

app.post('/api/events/hackathon', async(req,res)=>{
    const {eventid} = req.body;

    const hackathon = await Hackathon.findById(eventid);

    if(hackathon){
        return res.status(200).json({message: 'sucess', hackathon});

    } else{
        return res.status(401).json({message: 'fail'});
    }
})

app.post('/api/students/participate', async(req, res) =>{
    const {studentid, hackathon, team} = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
        studentid,
        {
            $push: {
                hackathonid: hackathon,
                teamid: team
            }
        },
        {
            new: true, useFindAndModify: false
        }
    )

    if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
    res.status(200).json({ message: 'Hackathon and team added successfully', updatedStudent });
})

// const PORT = process.env.PORT || 5000;
// PORT, () => console.log(`Server running on port ${PORT}`)/
app.listen(5000);
