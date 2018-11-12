import { Button, Card, Classes, H1, H2, H4 } from '@blueprintjs/core';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { mockOfficeHours } from 'src/models/mock/OfficeHours';
import IStudent from 'src/models/user/IStudent';
import ITeachingAssistant from 'src/models/user/ITeachingAssistant';
import IOfficeHours from '../models/IOfficeHours';

interface ICourseOfficeHours {
  officeHours?: IOfficeHours;
}

class CourseView extends React.Component<
  RouteComponentProps<any>,
  ICourseOfficeHours
> {
  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    setTimeout(() => this.setState({ officeHours: mockOfficeHours }), 1000);
  }

  public render() {
    let it = 0;
    const skele = this.applySkeletonStyleIfDefined(this.state.officeHours);
    return (
      <div className="app-center">
        <H1 className={skele('brand-center')}>
          {this.state.officeHours
            ? this.state.officeHours.courseAbbreviation
            : mockOfficeHours.courseAbbreviation}{' '}
          Office Hours
        </H1>
        <H2 className={skele()}>Teaching Assistants</H2>
        <div className={skele('flex-row-space-evenly')}>
          {this.state.officeHours
            ? this.state.officeHours.teachingAssistants.map(
                this.renderTeachingAssistantCard,
              )
            : mockOfficeHours.teachingAssistants.map(
                this.renderTeachingAssistantCard,
              )}
        </div>
        <H2 className={skele('brand-center')}>Queue</H2>
        <ol className={skele('student-queue')}>
          {(this.state.officeHours
            ? this.state.officeHours.students
            : mockOfficeHours.students
          ).map(student => this.renderStudentInList(it++, student))}
        </ol>
        <Button className={skele()} large={true} intent="success">
          Get in Line
        </Button>
        <Card className="join-code">
          {this.state.officeHours &&
            this.state.officeHours.studentJoinCode &&
            `Join Code: ${this.state.officeHours.studentJoinCode}`}
        </Card>
      </div>
    );
  }

  private renderTeachingAssistantCard(teachingAssistant: ITeachingAssistant) {
    return (
      <Card
        className={
          teachingAssistant.helping
            ? 'teaching-assistant-busy'
            : 'teaching-assistant-free'
        }
        elevation={2}
      >
        <H4>{teachingAssistant.name}</H4>
        <p className={Classes.UI_TEXT}>
          Helping{' '}
          {teachingAssistant.helping
            ? teachingAssistant.helping.name
            : 'no one'}
        </p>
      </Card>
    );
  }

  private renderStudentInList(index: number, student: IStudent) {
    return (
      <li key={index}>
        <Card className="student" elevation={2}>
          {student.name}
        </Card>
      </li>
    );
  }

  private applySkeletonStyleIfDefined<T>(item: T | undefined) {
    return item
      ? (style?: string) => style || ''
      : (style?: string) =>
          style ? `${style} ${Classes.SKELETON}` : Classes.SKELETON;
  }
}

export default CourseView;
