const { use } = require("../apis/hospital.api");
const { hospitalModel } = require("../models/hospital.model");
const { userModel } = require("../models/user.model");



const addHospitals = async (request, response) => {
 
        const {hospitals} = request.body; // Assuming request.body contains an array of hospitals
try{
        await Promise.all(hospitals.map(async (hospital) => {
            await hospitalModel.create(hospital); // Assuming hospitalModel.create() inserts a single hospital
        }));

        response.json({ message: "Success" });
    } catch (error) {
        // Handle errors
        response.status(500).json({ message: "Error adding hospitals", error: error.message });
    }
}
const getHospitals = async (request, response) => {
    const email = request.headers.email; // Get the city from the request headers
    console.log(email);
    try {
        const user = await userModel.findOne({ email });
console.log(user.city);
        // Find hospitals based on the city
        const hospitals = await hospitalModel.find({ city: user.city });
        console.log(hospitals);
        response.json(hospitals);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

module.exports ={addHospitals,getHospitals};