import {
  Button,
  ButtonGroup,
  Card,
  Classes,
  FormGroup,
  H1,
  H2,
  H3,
  H4,
  InputGroup,
  Popover,
  PopoverInteractionKind,
  Position,
  Toaster,
} from '@blueprintjs/core';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { mockOfficeHours } from 'src/models/mock/officeHours';
import { IStudent } from 'src/models/user/student';
import { ITeachingAssistant } from 'src/models/user/teachingAssistant';
import { EUserType, fetchIdentity, IUser } from 'src/models/user/user';
import fetchit from 'src/util/fetchit';
import { formDataToJSON } from 'src/util/form';
import { fetchOfficeHours, IOfficeHours } from '../models/officeHours';

interface ICourseOfficeHoursState {
  officeHours?: IOfficeHours;
  identity?: IUser;
}

class CourseView extends React.Component<
  RouteComponentProps<any>,
  ICourseOfficeHoursState
> {
  private toaster: Toaster;
  private refHandlers = {
    toaster: (ref: Toaster) => (this.toaster = ref),
  };

  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = {};
    this.addSelfToQueue = this.addSelfToQueue.bind(this);
    this.removeSelfFromQueue = this.removeSelfFromQueue.bind(this);
    this.isSelfInQueue = this.isSelfInQueue.bind(this);
    this.pollQueue = this.pollQueue.bind(this);
    this.handleJoinCodeSubmit = this.handleJoinCodeSubmit.bind(this);
    this.isSelfInTeachingAssistants = this.isSelfInTeachingAssistants.bind(
      this,
    );
    this.beginOfficeHours = this.beginOfficeHours.bind(this);
    this.endOfficeHours = this.endOfficeHours.bind(this);
  }

  public componentDidMount() {
    fetchIdentity(this.props.match.params.courseId, identity =>
      this.setState({ identity }),
    );
    setInterval(() => {
      fetchOfficeHours(this.props.match.params.courseId, officeHours =>
        this.setState({ officeHours }),
      );
    }, 500);
  }

  public render() {
    let it = 0;
    const applySkele = this.applySkeletonStyleIfDefined(this.state.officeHours);
    const isSelfInQueue = this.isSelfInQueue();
    const isSelfInTeachingAssistants = this.isSelfInTeachingAssistants();
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
          {this.state.officeHours &&
            this.state.officeHours.teachingAssistants.length === 0 && (
              <H3>There are no teaching assistants at this time.</H3>
            )}
        </div>
        <H2 className={applySkele('brand-center')}>Student Queue</H2>
        <ButtonGroup large={true}>
          <Button
            icon="arrow-left"
            className={applySkele()}
            intent="danger"
            onClick={this.props.history.goBack}
            text="Leave Office Hours"
          />
          {this.state.identity &&
            this.state.officeHours &&
            this.state.identity.type === EUserType.Student && (
              <Button
                icon={isSelfInQueue ? 'graph-remove' : 'new-object'}
                className={applySkele()}
                intent={isSelfInQueue ? 'warning' : 'success'}
                onClick={
                  isSelfInQueue ? this.removeSelfFromQueue : this.addSelfToQueue
                }
                text={isSelfInQueue ? 'Leave Queue' : 'Join Queue'}
              />
            )}
          {this.state.identity &&
            this.state.officeHours &&
            this.state.identity.type === EUserType.TeachingAssistant && (
              <Button
                icon={
                  isSelfInTeachingAssistants ? 'graph-remove' : 'new-object'
                }
                className={applySkele()}
                intent={isSelfInTeachingAssistants ? 'warning' : 'success'}
                onClick={
                  isSelfInTeachingAssistants
                    ? this.endOfficeHours
                    : this.beginOfficeHours
                }
                text={
                  isSelfInTeachingAssistants
                    ? 'End Your Office Hours'
                    : 'Begin Your Office Hours'
                }
              />
            )}
          {this.state.identity &&
            this.state.officeHours &&
            this.state.identity.type === EUserType.TeachingAssistant &&
            isSelfInTeachingAssistants && (
              <Button
                icon="arrow-up"
                className={applySkele()}
                intent="primary"
                onClick={this.pollQueue}
                disabled={this.state.officeHours.students.length === 0}
                text="Next Student"
              />
            )}
          {!this.state.identity && (
            <Popover
              interactionKind={PopoverInteractionKind.CLICK}
              popoverClassName="bp3-popover-content-sizing"
              position={Position.RIGHT}
            >
              <Button
                icon="key"
                className={applySkele()}
                intent="primary"
                text="Enter Join Code"
                disabled={!this.state.officeHours}
              />
              <div>
                <form onSubmit={this.handleJoinCodeSubmit}>
                  <FormGroup label="Name">
                    <InputGroup name="name" placeholder="e.g. Johnny Test" />
                  </FormGroup>
                  <FormGroup label="Join Code">
                    <InputGroup name="joinCode" placeholder="e.g. ABC123" />
                  </FormGroup>
                  <Button text="Join" intent="primary" type="submit" />
                  {this.props.children}
                </form>
              </div>
            </Popover>
          )}
        </ButtonGroup>
        {this.state.officeHours &&
          this.state.officeHours.students.length === 0 && (
            <H3>There are no students in the queue at this time.</H3>
          )}
        <ol className={applySkele('student-queue')}>
          {(this.state.officeHours
            ? this.state.officeHours.students
            : mockOfficeHours.students
          ).map(student => this.renderStudentInList(it++, student))}
        </ol>
        {this.state.officeHours && this.state.officeHours.studentJoinCode && (
          <Card className="join-code">
            Join Code: {this.state.officeHours.studentJoinCode}
          </Card>
        )}
        <Toaster position={Position.BOTTOM} ref={this.refHandlers.toaster}>
          {}
        </Toaster>
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
    let displayName = "Student"
    if (this.state.identity && this.state.identity.type === EUserType.TeachingAssistant) {
        displayName = student.name
    } 
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
            {displayName}
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
    fetchit(
      `/${this.props.match.params.courseId}/office_hours/students`,
      'PUT',
      undefined,
    ).then(() =>
      fetchOfficeHours(this.props.match.params.courseId, officeHours =>
        this.setState({ officeHours }),
      ),
    );
  }

  private removeSelfFromQueue() {
    if (!this.state.identity || !this.state.officeHours) {
      return;
    }
    fetchit(
      `/${this.props.match.params.courseId}/office_hours/students`,
      'DELETE',
      undefined,
    ).then(() =>
      fetchOfficeHours(this.props.match.params.courseId, officeHours =>
        this.setState({ officeHours }),
      ),
    );
  }

  private isSelfInQueue(): boolean {
    if (
      !!this.state.identity &&
      !!this.state.officeHours &&
      this.state.identity.type === EUserType.Student
    ) {
      const self = this.state.identity;
      return this.state.officeHours.students.some(
        student => self.id === student.id,
      );
    }
    return false;
  }

  private pollQueue() {
    if (
      !this.state.officeHours ||
      this.state.officeHours.students.length === 0
    ) {
      return;
    }
    fetchit(
      `/${this.props.match.params.courseId}/office_hours/teaching_assistants`,
      'POST',
      this.state.officeHours.students[0],
    ).then(() =>
      fetchOfficeHours(this.props.match.params.courseId, officeHours =>
        this.setState({ officeHours }),
      ),
    );
  }

  private isSelfInTeachingAssistants(): boolean {
    if (
      !!this.state.identity &&
      !!this.state.officeHours &&
      this.state.identity.type === EUserType.TeachingAssistant
    ) {
      const identity = this.state.identity;
      return this.state.officeHours.teachingAssistants.some(
        ta => identity.id === ta.id,
      );
    }
    return false;
  }

  private handleJoinCodeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!this.state.officeHours) {
      return;
    }
    const formData = new FormData(event.currentTarget);
    fetchit(
      `/${this.props.match.params.courseId}/office_hours`,
      'PUT',
      formDataToJSON(formData),
      (identity: IUser) => this.setState({ identity }),
      (_: any) =>
        this.toaster.show({
          icon: 'error',
          intent: 'danger',
          message: 'The join code you entered was incorrect. Please try again.',
        }),
    )
      .then(() =>
        fetchIdentity(this.props.match.params.courseId, identity =>
          this.setState({ identity }),
        ),
      )
      .then(() =>
        fetchOfficeHours(this.props.match.params.courseId, officeHours =>
          this.setState({ officeHours }),
        ),
      );
  }

  private beginOfficeHours() {
    if (!this.state.identity || !this.state.officeHours) {
      return;
    }
    fetchit(
      `/${this.props.match.params.courseId}/office_hours/teaching_assistants`,
      'PUT',
      undefined,
    ).then(() =>
      fetchOfficeHours(this.props.match.params.courseId, officeHours =>
        this.setState({ officeHours }),
      ),
    );
  }

  private endOfficeHours() {
    if (!this.state.identity || !this.state.officeHours) {
      return;
    }
    fetchit(
      `/${this.props.match.params.courseId}/office_hours/teaching_assistants`,
      'DELETE',
      undefined,
    ).then(() =>
      fetchOfficeHours(this.props.match.params.courseId, officeHours =>
        this.setState({ officeHours }),
      ),
    );
  }
}

export default CourseView;
