import IStudent from './IStudent';
import IUser from './IUser';

interface ITeachingAssistant extends IUser {
    helping?: IStudent;
}

export default ITeachingAssistant;
