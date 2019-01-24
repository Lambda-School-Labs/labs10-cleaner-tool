import { Request, Response, NextFunction } from 'express';
import { stripe } from '../util/stripe.setup';
import { updateUser } from '../models/users';
import axios from 'axios';

const deleteL = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'connection removed' });
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  const { authorizationCode } = req.body;
  if (!authorizationCode) {
    res.status(400).send({ message: 'Please include a valid token!' });
    return;
  }
  try {
    const url = `https://connect.stripe.com/oauth/token?`;
    const headers = {
      headers: {
        Authorization: `BEARER ${process.env.stripe_secret}`,
      },
    };
    const response = await axios.post(
      url,
      { grant_type: 'authorization_code', code: authorizationCode },
      headers,
    );
    if (response !== undefined) {
      console.log(response.data);
    }
    if (response !== undefined) {
      await updateUser('d7DXFYsNwTUKFAz3acyeUkMmtYQ2', {
        stripeUID: response.data.stripe_user_id,
      });
    }

    res.status(201).send({ message: 'Account succesfully connected!' });
  } catch (e) {
    console.log(e);
    e.statusCode = 500;
    next(e);
  }
};

export { post, deleteL };