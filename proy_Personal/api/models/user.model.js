import mongoose from 'mongoose';

const schemaUser = {
  name: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now() },
};

const User = mongoose.model('User', schemaUser, 'users');

export default User;
