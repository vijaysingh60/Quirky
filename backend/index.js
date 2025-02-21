const express = require('express');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')
const user = require("./module/userModule")
const bcrypt = require("bcrypt");
const complaint = require('./module/complainModule');
 
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://quirky-tau.vercel.app', 
    credentials: true,
}));
//app.use(express.urlencoded{});


app.post("/signup",async(req,res)=>{
    const {name,email,password,flatCode} = req.body
    console.log(req.body)
    try{
        const user1 = await user.findOne({email});
        if(user1)res.send("404");
        //const token = jwt.sign(email,"vijay");
        else{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                const newUser = await user.create({name,email,password:hash,flatCode})
                await newUser.save();
                let token = jwt.sign({email},process.env.SECRET);
                res.cookie("token", token, {
                    httpOnly: true,
                })
                res.json({name,token,id:newUser._id})
            })
        })}
        

    }catch(e){
        console.log(e)
    }
    
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let usr = await user.findOne({email});
        if(!usr)return res.send("404");
        else{
            bcrypt.compare(password, usr.password, function(err, result) {
                if(result){
                    let token = jwt.sign({email},process.env.SECRET);
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
                    })
                    const username = usr.name;
                    res.json({username,token,id:usr._id})
                }
                else res.send("404")
            });
        }
        
    }catch(e){
        console.log(e)
    }
})

app.get("/logout", async (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true, path: '/' });
    res.send('Logged out');
});



app.get('/api/check-auth', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ authenticated: false });

    jwt.verify(token, process.env.SECRET, async(err, decoded) => {
        if (err) return res.json({ authenticated: false });
        try{
            const usr = await user.findOne({email:decoded.email});
            res.json({ authenticated: true , user: decoded.email , id:usr._id});
        }catch(e){

        }
       
    });
});

app.get("/dashboard/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    let usr = null;
    let mostVotedComplaint = null;
    let topFlatmate = null;

    // Get usr details
    usr = await user.findById(userId).select("-password");
    if (!usr) {
      return res.status(404).json({ error: "usr not found" });
    }

    // Find the most voted complaint (sorted by votes array length)
    mostVotedComplaint = await complaint.findOne().sort({ "votes.length": -1 });

    // Find the usr with the highest karma points
    topFlatmate = await user.findOne().sort({ karmaPoints: -1 });

    res.json({
      usr: usr,
      complaint: mostVotedComplaint || {},
      topFlatmate: topFlatmate || {},
    });

  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/getComplaints",async(req,res)=>{
    try{
        const responce = await complaint.find();
        res.send(responce)
    }catch(e){

    }
})

app.post("/submitComplain",async(req,res)=>{
    const data = req.body
    try{
        const findResposible = await user.findOne({ name: data.resposible });

        

        // Update karma points
        if(findResposible){
            findResposible.karmaPoints -= 1;
            await findResposible.save(); }
        
        const responce = await complaint.create(data);
        res.send({message:"complain submited"})
    }catch(e){
        console.log(e); 
    }
})

app.get("/leaderboard",async(req,res)=>{
    try{
        const usrs = await user.find().sort({ karmaPoints: 1 }); 
        res.send(usrs)

    }catch(e){

    }
})

app.listen(3001);
