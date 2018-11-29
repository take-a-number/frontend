import fetchit from 'src/util/fetchit';

enum EUserType {
  TeachingAssistant = 'teaching_assistant',
  Student = 'student',
}

interface IUser {
  name: string;
  id: string;
  type: EUserType;
}

const fetchIdentity = (
  courseId: string,
  onSuccess: (self: IUser) => void,
) =>
  fetchit(
    `/${courseId}/office_hours/identity`,
    'GET',
    undefined,
    onSuccess,
  );

export { EUserType, IUser, fetchIdentity };
