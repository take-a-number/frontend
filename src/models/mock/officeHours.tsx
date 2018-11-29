import { IOfficeHours } from '../officeHours';

const mockOfficeHours: IOfficeHours = {
  courseAbbreviation: 'CS3251',
  instructorJoinCode: 'B7S48H',
  studentJoinCode: 'AHD78N',
  students: [
    { id: 'afb09b10-f031-4d79-8ce2-da2e1d9119ff', name: 'John' },
    { id: '6457da2c-82e8-4df0-869e-183d528b379c', name: 'Jacob' },
    { id: 'c6d8d334-9ee9-47c9-ac83-f3ee444e4369', name: 'Jingle' },
    { id: 'a41774bb-0a40-421b-82bb-4353299b170b', name: 'Heimer' },
    { id: '13dcb12c-55fe-428c-b38a-5142bed5f63f', name: 'Schmidt' },
  ],
  teachingAssistants: [
    {
      id: '1409ba6d-647e-4daa-80a3-019a2c8a2cca',
      name: 'Emily',
    },
    { id: '953a4cdf-6995-4ff8-add9-2baf6beba8fc', name: 'Joao' },
    {
      id: '054128b8-6d14-4695-85ee-3c76a979adc8',
      name: 'AReallyLongFirstName',
    },
  ],
};

export { mockOfficeHours };
