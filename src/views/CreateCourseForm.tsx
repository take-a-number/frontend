import {
  Button,
  ButtonGroup,
  FormGroup,
  H1,
  InputGroup,
  MenuItem,
} from '@blueprintjs/core';
import {
  IItemRendererProps,
  ItemPredicate,
  Suggest,
} from '@blueprintjs/select';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ISchool from 'src/models/ISchool';
import { mockSchools } from 'src/models/mock/School';
import { highlightText } from 'src/util/Select';

interface ICreateCourseFormState {
  schools: ISchool[];
  selectedSchool?: ISchool;
}

class CreateCourseForm extends React.Component<
  RouteComponentProps<any>,
  ICreateCourseFormState
> {
  private SchoolSuggest = Suggest.ofType<ISchool>();
  private noResults = <MenuItem disabled={true} text="No schools found..." />;

  public constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = { schools: [] };
    this.onSchoolSelect = this.onSchoolSelect.bind(this);
  }

  public componentDidMount() {
    this.setState({
      schools: mockSchools,
    });
  }

  public render() {
    return (
      <div className="app-center">
        <H1 className="brand-center">New Course</H1>
        <form onSubmit={this.onCreateCourseFormSubmit}>
          <FormGroup label="School">
            <this.SchoolSuggest
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
              required={true}
            />
          </FormGroup>
          <FormGroup label="Course Abbreviation">
            <InputGroup placeholder="e.g. CS 3251" required={true} />
          </FormGroup>
          <FormGroup label="Email">
            <InputGroup
              placeholder="e.g. john.doe@site.com"
              type="email"
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
    this.formDataToJSON(formData);
    // TODO: send to backend
  }

  private schoolFilter: ItemPredicate<ISchool> = (
    query: string,
    school: ISchool,
  ) => {
    return school.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  };

  // Adapted from https://stackoverflow.com/a/49826736
  private formDataToJSON(formData: FormData): string {
    const json = {};
    formData.forEach((value, key) => {
      // Check if property already exists
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        let current = json[key];
        if (!Array.isArray(current)) {
          // If it's not an array, convert it to an array.
          current = json[key] = [current];
        }
        current.push(value); // Add the new value to the array.
      } else {
        json[key] = value;
      }
    });
    return JSON.stringify(json);
  }
}

export default CreateCourseForm;
