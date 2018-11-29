import { IStudent } from './student';
import { IUser } from './user';

interface ITeachingAssistant extends IUser {
  helping?: IStudent;
}

export { ITeachingAssistant };
