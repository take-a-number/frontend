import * as React from 'react';
import { mockOfficeHours } from 'src/models/mock/OfficeHours';
import IOfficeHours from '../models/IOfficeHours';

interface ICourseOfficeHours {
  officeHours?: IOfficeHours;
}

class CourseView extends React.Component<{}, ICourseOfficeHours> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    this.setState({ officeHours: mockOfficeHours });
  }

  public render() {
    return <div />;
  }
}

export default CourseView;
