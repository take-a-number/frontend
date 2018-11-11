import IStudent from './user/IStudent';
import ITeachingAssistant from './user/ITeachingAssistant';

interface IOfficeHours {
  courseAbbreviation: string;
  teachingAssistants: ITeachingAssistant[];
  students: IStudent[];
}

export default IOfficeHours;
