import fetchit from '../util/fetchit';
import { IStudent } from './user/student';
import { ITeachingAssistant } from './user/teachingAssistant';

interface IOfficeHours {
  courseAbbreviation: string;
  studentJoinCode?: string;
  teachingAssistants: ITeachingAssistant[];
  students: IStudent[];
}

const fetchOfficeHours = (
  controller: AbortController,
  courseId: string,
  onSuccess: (officeHours: IOfficeHours) => void,
) => fetchit(controller, `/${courseId}/office_hours`, 'GET', undefined, onSuccess);

export { IOfficeHours, fetchOfficeHours };
