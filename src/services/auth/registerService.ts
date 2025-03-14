import { zodRegisterType } from '../../zodSchema/zodRegisterSchema';
import bcrypt from 'bcrypt';
import { AppError } from '../../middleware/errorhandler';
import validator from 'validator';
import { User } from '../../models/userModel';

export async function registerService(input: zodRegisterType) {
  // Check if user exists by email
  const userExist = await User.findOne({ email: input.email });

  // Validate email
  if (!validator.isEmail(input.email)) {
    throw new AppError('Email must be a valid email', 400);
  }

  if (userExist) {
    throw new AppError('User exist', 400);
  }

  // Validate password strength
  if (!validator.isStrongPassword(input.password)) {
    throw new AppError('Please enter a strong password to continue', 400);
  }

  // Hash password before saving to database
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(input.password, salt);

  // Create new user
  const newUser = new User({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role: input.role || 'USER',
  });

  await newUser.save();

  const { password, ...rest } = newUser.toObject();

  return { message: 'User registered successfully', user: rest };
}
