import {
  Button,
  ButtonGroup,
  FormGroup,
  H1,
  InputGroup,
  MenuItem,
  Position,
  Toaster,
} from '@blueprintjs/core';
import {
  IItemRendererProps,
  ItemPredicate,
  Suggest,
} from '@blueprintjs/select';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { mockSchools } from '../models/mock/school';
import { ISchool } from '../models/school';
import fetchit from '../util/fetchit';
import { formDataToJSON } from '../util/form';
import { highlightText } from '../util/Select';

interface ICreateCourseFormState {
  schools: ISchool[];
  selectedSchool?: ISchool;
}

class CreateCourseForm extends React.Component<
  RouteComponentProps<any>,
  ICreateCourseFormState
> {
  private toaster: Toaster;
  private refHandlers = {
    toaster: (ref: Toaster) => (this.toaster = ref),
  };
  private SchoolSuggest = Suggest.ofType<ISchool>();
  private noResults = <MenuItem disabled={true} text="No schools found..." />;
  private controller = new AbortController();

  public constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = { schools: [] };
    this.onSchoolSelect = this.onSchoolSelect.bind(this);
    this.onCreateCourseFormSubmit = this.onCreateCourseFormSubmit.bind(this);
  }

  public componentDidMount() {
    this.setState({
      schools: mockSchools,
      selectedSchool: mockSchools.length > 0 ? mockSchools[0] : undefined,
    });
  }

  public componentWillUnmount() {
    this.controller.abort();
  }

  public render() {
    return (
      <div className="app-center">
        <H1 className="brand-center">New Course</H1>
        <form onSubmit={this.onCreateCourseFormSubmit}>
          <FormGroup label="School">
            <this.SchoolSuggest
              selectedItem={this.state.selectedSchool}
              inputValueRenderer={this.renderSchoolAsInputValue}
              itemPredicate={this.schoolFilter}
              items={this.state.schools}
              itemRenderer={this.renderSchoolAsItem}
              noResults={this.noResults}
              onItemSelect={this.onSchoolSelect}
            />
          </FormGroup>
          <FormGroup label="Course Name">
            <InputGroup
              placeholder="e.g. Intermediate Software Design"
              name="description"
              required={true}
            />
          </FormGroup>
          <FormGroup label="Course Abbreviation">
            <InputGroup
              placeholder="e.g. CS 3251"
              required={true}
              name="abbreviation"
            />
          </FormGroup>
          <FormGroup label="Email">
            <InputGroup
              placeholder="e.g. john.doe@site.com"
              type="email"
              name="email"
              required={true}
            />
          </FormGroup>
          <ButtonGroup>
            <Button
              icon="arrow-left"
              text="Go Back"
              intent="danger"
              onClick={this.props.history.goBack}
            />
            <Button
              icon="folder-new"
              text="Create Course"
              type="submit"
              intent="success"
            />
          </ButtonGroup>
        </form>
        <Toaster position={Position.BOTTOM} ref={this.refHandlers.toaster}>
          {}
        </Toaster>
      </div>
    );
  }

  private renderSchoolAsItem = (
    school: ISchool,
    renderer: IItemRendererProps,
  ) => {
    if (!renderer.modifiers.matchesPredicate) {
      return null;
    }
    const schoolText = `${school.name}`;
    return (
      <MenuItem
        active={renderer.modifiers.active}
        disabled={renderer.modifiers.disabled}
        onClick={renderer.handleClick}
        text={highlightText(schoolText, renderer.query)}
        key={school.id}
      />
    );
  };

  private renderSchoolAsInputValue = (school: ISchool) => school.name;

  private onSchoolSelect(selectedSchool: ISchool) {
    this.setState({
      selectedSchool,
    });
  }

  private onCreateCourseFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formDataToJSON(formData);
    fetchit(
      this.controller,
      '',
      'PUT',
      formDataToJSON(formData),
      (uuid: string) => {
        this.props.history.push(`/course/officeHours/${uuid}`);
      },
      reason =>
        this.toaster.show({
          icon: 'error',
          intent: 'danger',
          message: `A course could not be created: ${reason}. Please try again.`,
        }),
    );
  }

  private schoolFilter: ItemPredicate<ISchool> = (
    query: string,
    school: ISchool,
  ) => {
    return school.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  };
}

export default CreateCourseForm;
