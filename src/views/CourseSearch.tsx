import { Button, H1, MenuItem } from '@blueprintjs/core/';
import {
  IItemRendererProps,
  ItemPredicate,
  Suggest,
} from '@blueprintjs/select';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import fetchit from 'src/util/fetchit';
import { highlightText } from 'src/util/Select';
import { ICourse } from '../models/course';

interface ICourseSearchState {
  courses: ICourse[];
}

class CourseSearch extends React.Component<
  RouteComponentProps<any>,
  ICourseSearchState
> {
  private CourseSuggest = Suggest.ofType<ICourse>();
  private noResults = <MenuItem disabled={true} text="No courses found..." />;

  public constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = {
      courses: [],
    };
    this.onCourseSelect = this.onCourseSelect.bind(this);
    this.onCreateCourseClick = this.onCreateCourseClick.bind(this);
  }

  public componentDidMount() {
    fetchit('/', 'GET', undefined, (courses: ICourse[]) =>
      this.setState({ courses }),
    );
  }

  public render() {
    return (
      <div className="app-center">
        <H1 className="brand-center">Take a Number</H1>
        <span className="flex-row-center">
          <this.CourseSuggest
            className="search-input"
            itemPredicate={this.courseFilter}
            inputValueRenderer={this.renderCourseAsInputValue}
            itemRenderer={this.renderCourseAsItem}
            items={this.state.courses}
            noResults={this.noResults}
            onItemSelect={this.onCourseSelect}
            activeItem={null}
          />
          <Button
            intent="primary"
            className="new-course"
            onClick={this.onCreateCourseClick}
            icon="folder-new"
          >
            New Course
          </Button>
        </span>
      </div>
    );
  }

  private onCourseSelect(course: ICourse) {
    this.props.history.push(`/course/officeHours/${course.id}`);
  }

  private onCreateCourseClick() {
    this.props.history.push(`/course/create/`);
  }

  private renderCourseAsInputValue = (course: ICourse) => course.abbreviation;

  private renderCourseAsItem = (
    course: ICourse,
    renderer: IItemRendererProps,
  ) => {
    if (!renderer.modifiers.matchesPredicate) {
      return null;
    }
    const courseText = `${course.abbreviation}: ${course.description}`;
    return (
      <MenuItem
        active={renderer.modifiers.active}
        disabled={renderer.modifiers.disabled}
        onClick={renderer.handleClick}
        text={highlightText(courseText, renderer.query)}
        key={course.id}
      />
    );
  };

  private courseFilter: ItemPredicate<ICourse> = (query, course: ICourse) => {
    return (
      `${course.abbreviation.toLowerCase()}: ${course.description.toLowerCase()}`.indexOf(
        query.toLowerCase(),
      ) >= 0
    );
  };
}

export default CourseSearch;
