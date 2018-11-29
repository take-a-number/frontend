import fetchit from 'src/util/fetchit';
import { IStudent } from './user/student';
import { ITeachingAssistant } from './user/teachingAssistant';

interface IOfficeHours {
  courseAbbreviation: string;
  studentJoinCode?: string;
  teachingAssistants: ITeachingAssistant[];
  students: IStudent[];
}

const fetchOfficeHours = (
  courseId: string,
  onSuccess: (officeHours: IOfficeHours) => void,
) => fetchit(`/${courseId}/office_hours`, 'GET', undefined, onSuccess);

export { IOfficeHours, fetchOfficeHours };
