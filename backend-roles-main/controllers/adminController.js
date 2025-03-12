// import Role from '../models/rolemodel.js';

// class AdminController {
//   async createRole(req, res) {
//     try {
    
//       if (req.body.name === 'admin') {
//         const adminRole = await Role.findOne({ name: 'admin' });
//         if (adminRole) {
//           return res.status(400).send({ error: 'Admin role already exists' });
//         }
//       }

//       const role = new Role(req.body);
//       await role.save();
//       res.status(201).send(role);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   }

//   async getRoles(req, res) {
//     try {
//       const roles = await Role.find({});
//       res.status(200).send(roles);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }

//   async updateRole(req, res) {
//     try {
//       const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//       if (!role) {
//         return res.status(404).send();
//       }
//       res.status(200).send(role);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   }

//   async deleteRole(req, res) {
//     try {
//       const role = await Role.findByIdAndDelete(req.params.id);
//       if (!role) {
//         return res.status(404).send();
//       }
//       res.status(200).send(role);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }
// }

// export default AdminController;