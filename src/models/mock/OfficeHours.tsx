import IOfficeHours from '../IOfficeHours';

const mockOfficeHours: IOfficeHours = {
  courseAbbreviation: 'CS3251',
  studentJoinCode: 'ABCDEF',
  students: [
    { name: 'John' },
    { name: 'Jacob' },
    { name: 'Jingle' },
    { name: 'Heimer' },
    { name: 'Schmidt' },
  ],
  teachingAssistants: [
    { name: 'Emily', helping: { name: 'Jack' } },
    { name: 'Joao' },
  ],
};

export { mockOfficeHours };
