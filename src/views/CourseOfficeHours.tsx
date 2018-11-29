import {
  Button,
  ButtonGroup,
  Card,
  Classes,
  H1,
  H2,
  H4,
} from '@blueprintjs/core';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { mockOfficeHours } from 'src/models/mock/officeHours';
import { IStudent } from 'src/models/user/student';
import { ITeachingAssistant } from 'src/models/user/teachingAssistant';
import { fetchIdentity, IUser } from 'src/models/user/user';
import { IOfficeHours } from '../models/officeHours';

interface ICourseOfficeHoursState {
  officeHours?: IOfficeHours;
  identity?: IUser;
}

class CourseView extends React.Component<
  RouteComponentProps<any>,
  ICourseOfficeHoursState
> {
  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = {};
    this.addSelfToQueue = this.addSelfToQueue.bind(this);
    this.removeSelfFromQueue = this.removeSelfFromQueue.bind(this);
    this.isSelfInQueue = this.isSelfInQueue.bind(this);
  }

  public componentDidMount() {
    fetchIdentity(identity => this.setState({ identity }));
  }

  public render() {
    let it = 0;
    const applySkele = this.applySkeletonStyleIfDefined(this.state.officeHours);
    const isSelfInQueue = this.isSelfInQueue();
    return (
      <div className="app-center">
        <H1 className={applySkele('brand-center')}>
          {`${
            this.state.officeHours
              ? this.state.officeHours.courseAbbreviation
              : mockOfficeHours.courseAbbreviation
          } 
          Office Hours`}
        </H1>
        <H2 className={applySkele()}>Teaching Assistants</H2>
        <div className={applySkele('flex-row-center')}>
          {this.state.officeHours
            ? this.state.officeHours.teachingAssistants.map(
                this.renderTeachingAssistantCard,
              )
            : mockOfficeHours.teachingAssistants.map(
                this.renderTeachingAssistantCard,
              )}
        </div>
        <H2 className={applySkele('brand-center')}>Student Queue</H2>
        <ButtonGroup large={true}>
          <Button
            icon="arrow-left"
            className={applySkele()}
            intent="danger"
            onClick={this.props.history.goBack}
          >
            Leave Office Hours
          </Button>
          <Button
            icon={isSelfInQueue ? 'graph-remove' : 'new-object'}
            className={applySkele()}
            intent={isSelfInQueue ? 'warning' : 'success'}
            onClick={
              isSelfInQueue ? this.removeSelfFromQueue : this.addSelfToQueue
            }
          >
            {isSelfInQueue ? 'Leave Queue' : 'Join Queue'}
          </Button>
        </ButtonGroup>
        <ol className={applySkele('student-queue')}>
          {(this.state.officeHours
            ? this.state.officeHours.students
            : mockOfficeHours.students
          ).map((student: IStudent) => this.renderStudentInList(it++, student))}
        </ol>
        {this.state.officeHours && this.state.officeHours.studentJoinCode && (
          <Card className="join-code">
            Join Code: {this.state.officeHours.studentJoinCode}
          </Card>
        )}
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
          {teachingAssistant.helping
            ? `Helping ${teachingAssistant.helping.name}`
            : 'Free'}
        </p>
      </Card>
    );
  }

  private renderStudentInList(index: number, student: IStudent) {
    return (
      <li key={index}>
        <Card
          className="student"
          id={
            this.state.identity && this.state.identity.id === student.id
              ? 'self'
              : undefined
          }
          elevation={2}
        >
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

  private addSelfToQueue() {
    if (!this.state.identity || !this.state.officeHours) {
      return;
    }
    const identity = this.state.identity;
    const officeHours = this.state.officeHours;
    officeHours.students.push(identity);
    this.setState({
      officeHours,
    });
  }

  private removeSelfFromQueue() {
    if (!this.state.identity || !this.state.officeHours) {
      return;
    }
    const officeHours = this.state.officeHours;
    const self = this.state.identity;
    const selfIndex = officeHours.students.findIndex(
      student => self.id === student.id,
    );
    officeHours.students.splice(selfIndex, 1);
    this.setState({
      officeHours,
    });
  }

  private isSelfInQueue(): boolean {
    if (!!this.state.identity && !!this.state.officeHours) {
      const self = this.state.identity;
      return this.state.officeHours.students.some(
        student => self.id === student.id,
      );
    }
    return false;
  }
}

export default CourseView;
