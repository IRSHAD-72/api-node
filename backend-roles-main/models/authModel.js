//  import mongoose from "mongoose";
// // // import bcrypt from "bcryptjs";

// // const authSchema = new mongoose.Schema({
// //   _id: mongoose.Schema.Types.ObjectId,
// //   firstname: { type: String, required: true },
// //   lastname: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { 
// //     type: String, 
// //     enum: ['admin', 'employee', 'user'], 
// //     default: 'user'  // ✅ Set default role to "user"
// // }, // Ensure roles is an array of strings
// //   //dateOfBirth: { type: Date },
// //   //dateOfJoining: { type: Date },
// // });

// // // Hash password before saving the user document
// // // authSchema.pre('save', async function (next) {
// // //   if (!this.isModified('password')) return next();
// // //   try {
// // //     const salt = await bcrypt.genSalt(10);
// // //     const hashedPassword = await bcrypt.hash(this.password, salt);
// // //     this.password = hashedPassword;
// // //     next();
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // });

// // // authSchema.methods.comparePassword = async function (password) {
// // //   return bcrypt.compare(password, this.password);
// // // };

// // const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);

// // export default Auth;
// const authSchema = new mongoose.Schema({
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "employee", "user"], default: "user" }
// });

// export default mongoose.model("Auth", authSchema);
import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "employee","user"],default:"user" }
}, { timestamps: true });

export default mongoose.model("Auth", authSchema);
