import fetchit from 'src/util/fetchit';
import { IStudent } from './user/student';
import { ITeachingAssistant } from './user/teachingAssistant';

interface IOfficeHours {
  courseAbbreviation: string;
  instructorJoinCode?: string;
  teachingAssistants: ITeachingAssistant[];
  students: IStudent[];
  studentJoinCode?: string;
}

const fetchOfficeHours = (
  courseAbbreviation: string,
  onSuccess: (officeHours: IOfficeHours) => void,
) => fetchit(`/course/${courseAbbreviation}`, 'GET', onSuccess);

export { IOfficeHours, fetchOfficeHours };
