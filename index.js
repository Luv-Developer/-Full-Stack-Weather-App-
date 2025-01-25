const express = require("express")
const app = express()
const {createClient} = require("@supabase/supabase-js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
const cookieParser = require("cookie-parser")
const { runInNewContext } = require("vm")
const supabaseurl = 'https://bqpnzguzwabqkmrrijit.supabase.co'
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcG56Z3V6d2FicWttcnJpaml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjUxMzYsImV4cCI6MjA1MzMwMTEzNn0.l_n4gah7shANQP0WMPcZkCFkiv5LGiW1LNTValeK1ak'
const supabase = createClient(supabaseurl,supabasekey)
const PORT = process.env.PORT || 3000; 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.get("/",(req,res)=>{
    res.render("homepage")
})
//Creating a register route
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/register",async(req,res)=>{
    const {username,email,password} = req.body 
    let saltround = 10
    let hashedPassword = await bcrypt.hash(password,saltround)
    let user = await supabase
    .from("users")
    .insert([{username,email,password_hash:hashedPassword}])
    let token = jwt.sign({email:email},"hehe")
    res.cookie("token",token)
    res.render("homepage")
})
//Creating a login route 
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    const { email, password } = req.body;

        // Fetch the user from the database
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (!user) {
            res.render("/register")
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            res.render("/login")
        }
        else{
            let token = jwt.sign({email:email},"hehe")
            res.cookie("token",token)
            res.render("weather")
        }
})
app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})
