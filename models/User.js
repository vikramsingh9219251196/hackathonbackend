import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'rag picker'], 
    default: 'user'
  },
  location: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

export default User;
