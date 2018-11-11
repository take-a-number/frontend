import { Button, ButtonGroup, H1, MenuItem } from '@blueprintjs/core/';
import {
  IItemRendererProps,
  ItemPredicate,
  Suggest,
} from '@blueprintjs/select';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { highlightText } from 'src/util/Select';
import ICourse from './ICourse';

class Search extends React.Component<RouteComponentProps<any>, {}> {
  private CourseSuggest = Suggest.ofType<ICourse>();
  private noResults = (
    <MenuItem
      active={true}
      disabled={true}
      labelElement={<span>No courses found...</span>}
    />
  );

  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.onCourseSelect = this.onCourseSelect.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <H1 className="brand">Take a Number</H1>
        <p>
          <this.CourseSuggest
            itemPredicate={this.courseFilter}
            inputValueRenderer={this.renderCourseAsInputValue}
            itemRenderer={this.renderCourseAsItem}
            items={[
              {
                abbreviation: 'CS3251',
                description: 'Intermediate Software Design',
              },
            ]}
            noResults={this.noResults}
            onItemSelect={this.onCourseSelect}
          />
          <Button intent="primary">Create a Course</Button>
        </p>
      </div>
    );
  }

  private onCourseSelect(course: ICourse) {
    this.props.history.push(`/course/${course.abbreviation}/view`);
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
        key={course.abbreviation}
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

export default Search;
