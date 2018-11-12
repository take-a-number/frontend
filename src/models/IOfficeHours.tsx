import IStudent from './user/IStudent';
import ITeachingAssistant from './user/ITeachingAssistant';

interface IOfficeHours {
  courseAbbreviation: string;
  teachingAssistants: ITeachingAssistant[];
  students: IStudent[];
  studentJoinCode?: string;
}

export default IOfficeHours;
