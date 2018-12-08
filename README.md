# Frontend - Take a Number
React-Typescript Progressive Web App for take a number.

- To install needed packages, run `yarn install`.

- To build, run `yarn build`.

- For development, run `yarn run` to start the development server. Change the endpoint in `src/conf.tsx` from the herokuapp one to your local api development server if needed.


# Background

As teaching assistants (TAs) for Computer Science courses at Vanderbilt University, we often find that our office hours
environments can get extremely busy. This is doubly true on busy days (read: the day before an assignment is due) when the 
situation can become very hectic with dozens of students vying for our attention. The current solution to the problem is a 
heavily manual approach of either trying to maintain a manual list of who needs to be helped on a piece of paper or 
whiteboard, or otherwise trying to memorize the order that students come in. This solution clearly does not scale, 
especially with the rapid rate at which Computer Science classes at Vanderbilt are currently growing. Take a Number seeks to 
solve all of these problems. This application maintains a web interface an internal queue to improve the office hours 
experience for students and instructors alike. All a TA or professor needs to do is navigate to our website, select their 
class, enter their specific class code, and start their queue. Helping a student is just a click of a button away. Students 
only need to navigate to our home page, find their class, enter a specially generated student join code, and then join the 
queue to get helped. 


# Potential Future Features

* Ability for TAs to remove arbitrary students in the queue
* Ability for TAs to drag students around and rearrange the queue (by GUI card)
* Ability for students to move backwards in the queue
* Addition of metrics like average time to be helped
	* Corollary: Addition of a tag with expected time to be helped