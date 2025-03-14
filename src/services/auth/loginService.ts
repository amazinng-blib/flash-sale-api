import { zodLoginType } from '../../zodSchema/zodLoginSchema';
import { AppError } from '../../middleware/errorhandler';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../../utils/generateToken';
import { User } from '../../models/userModel';

export async function loginService(input: zodLoginType) {
  const userExist = await User.findOne({
    email: input.email,
  });

  if (!userExist) {
    throw new AppError('User not found', 404);
  }

  const passwordMatch = await bcrypt.compare(
    input.password,
    userExist.password
  );

  if (!passwordMatch) {
    throw new AppError('Wrong credentials', 400);
  }
  const accessToken = await generateAccessToken(userExist);
  const { password, ...rest } = userExist.toObject();
  return { message: 'Logged in successfully', accessToken, user: rest };
}
