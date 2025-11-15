import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: false },
  createdAt: { type: Date, default: Date.now },
});

// Hashear contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseña
usuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;