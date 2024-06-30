const { userModel } = require("../models/user.model");
const {chatModel}=require("../models/chat.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const signUp = async (request, response) => {
    const { name, email, password, role,city} = request.body;
    console.log(email);
console.log(city);
    const user = await userModel.findOne({ email });
console.log("jjj0");
    if (user) {
        console.log("jjj1");

        response.json({ message: "Account already exists" });

    } else {
        bcrypt.hash(password, 5, async function (err, hash) {
            await userModel.insertMany({ email, name, role,city, password: hash });
            const newUser = await userModel.findOne({ email });
            console.log("jjj2");

            if (role === "doctor") {
                const chat = await chatModel.create({ users: [newUser._id],name});
                const patients = await userModel.find({ role: "patient" });
                const patientIds = patients.map(patient => patient._id);
                await chatModel.updateOne({ _id: chat._id }, { $addToSet: { users: { $each: patientIds } } });
                console.log("jjj2");

                response.json({ message: "Registration successful", newUser, chat });
            } else if(role=="patient"){            console.log("jjj2");

                await chatModel.updateMany({}, { $addToSet: { users: newUser._id } }, { new: true });
                console.log("jjj2");

                response.json({ message: "Registration successful", newUser });
            }
        });
    }
}
const getDoctors = async (request,response) =>{
    
        response.json(await userModel.find({role:"doctor"}));
}

const signIn = async (request,response) =>{
    const {email , password} = request.body;
    const user = await userModel.findOne({email});
    console.log(email);
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            let token = jwt.sign({
                _id:user._id,
                name:user.name,
                email:user.email,
                password:user.password,
                picture:user.picture,
                role:user.role,
                description:user.description
            },
            'SecretKey');
            response.json({message : "Login Success", token});
        } else {
            console.log("la");

            response.json({message : "Wrong Password"});
        }
    } else {
        response.json({message : "Account doesn't exist"})
    }
}
 const updateUserName = async (request, response) => {
    const { name ,email} = request.body;
    await userModel.updateOne(
        { email },
        { $set: { name: name } }
    );
    response.json({ message: "Success" })
}
const updateEmail = async (request, response) => {
    const { newEmail ,email} = request.body;
    await userModel.updateOne(
        { email },
        { $set: { email: newEmail } }
    );
    response.json({ message: "Success" })
}
const sendVerification = async (request, response) => {
   
    const {  email} = request.body;
    const user = await userModel.findOne({ email });

    if(user){
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
               user: "ahmaad.ali.abdulrahman@gmail.com",
               pass: 'sfrlrwwdzglxfone'
            }
         });
         const message = Math.floor(Math.random() * 9000) + 1000;
        
         const mailOptions = {
            from: "ahmaad.ali.abdulrahman@gmail.com",
            to:email,
            subject: "Glaucoma verification",
            html: "this message from Glaucoma app "+message
         };
         
         transporter.sendMail(mailOptions, function(error, info){
            if(error){
                response.json({ message: "error" })
            }else{
                response.json({ message: "Success" ,message})
            }
         });
     
    }else{
        response.json({ message: "emailNotFound" })

    }    
       

}
const updatePassword = async (request, response) => {
    const { password ,email} = request.body;
    bcrypt.hash(password, 5, async function (err, hash) {
        await userModel.updateOne({ email },
            { $set: { password: hash }});
    });
  
    response.json({ message: "Success" })
}


module.exports = { signUp ,signIn,updateUserName,updateEmail,updatePassword,sendVerification,getDoctors}; // Export the signUp function
