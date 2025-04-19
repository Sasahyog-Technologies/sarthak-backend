const express = require('express');
const cors = require('cors');
const {configDotenv} = require('dotenv');
const app = express()
const brainstormRoute = require('./api/brainstorm')
const roadmapRoute = require('./api/growth_roadmap')
const healthscoreRoute = require('./api/health_score')
const researchRoute = require('./api/research')
const templateRoute = require('./api/whatsApp')
const fs = require('fs');

configDotenv();
app.use(cors());
app.use(express.json());

// 👇 mount the brainstorm API      
app.use("/api", brainstormRoute, roadmapRoute, healthscoreRoute, researchRoute,templateRoute);

fs.readFile('filee.txt', 'utf8', (err, data) =>{
    console.log(err, data);
});


app.listen(3000, (req, res)=>{
    console.log("server runnning on 3000");
})

