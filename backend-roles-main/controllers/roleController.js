// // controllers/roleController.js
// import Role from "../models/rolemodel.js";
// // Function to create a new role
// export const createRole = async(req, res) =>{
//   const { name, description } = req.body;

//   // Validate input data
//   if (!name || !description) {
//     return res.status(400).json({ message: 'Role name and description are required' });
//   }

//   try {
//     // Create a new role document
//     const newRole = new Role({
//       name,
//       description,
//     });

//     // Save the role to the database
//     await newRole.save();

//     return res.status(201).json({ message: 'Role created successfully', role: newRole });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Error creating role' });
//   }
// }

// export default createRole;
