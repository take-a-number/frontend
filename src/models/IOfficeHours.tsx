import IStudent from './user/IStudent';
import ITeachingAssistant from './user/ITeachingAssistant';
import IUser from './user/IUser';

interface IOfficeHours {
  courseAbbreviation: string;
  teachingAssistants: ITeachingAssistant[];
  students: IStudent[];
  studentJoinCode?: string;
  self: IUser;
}

export default IOfficeHours;
