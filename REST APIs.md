## Definitions

Parameters: `/v1/foo/:bar` indicates that `bar` is a parameter and may be any string

A field with a question mark after its name is optional, meaning it can be `undefined`/`None`.

All request and response payloads should be JSON encoded.

`name`: the name of the student or instructor

`code`: 6-character case-insensitive alphanumeric join code, for ~2 billion possibilities. **Must be unique** among temporary session codes and permanent instructor codes

`className`: the human-readable name of the class, i.e. Human-Computer Interaction

`classPath`: the alphanumeric + dash string representing the class, i.e.
vanderbilt-university-human-computer-interaction-f18. Will be auto-generated as roughly:
`[school, className, (semester[0] + year[-2:])].join("-").toLowerCase().replace(" ", "-")`
```
type Line = Array<{
  id: number, // randomly generated
  name?: string,
  estimatedTime: number,
  question?: string
}>

type ClassInfo = { 
  instructor: string, 
  email: string, 
  school: string, 
  className: string, 
  semester: Semester,
  year: number,
  keywords: Array<string>
}

// Sent only to inform the client; the client should not receive data it is not authorized to have
enum SessionType { "none", “student”, “instructor” }
enum Semester { "fall", “spring”, “summer” “year” }
```

## Client-side Endpoints

These URLs do not matter to the back-end, but outline functionality as seen by the client.

<table>
  <tr>
    <td>domain/</td>
    <td>Navigates to the main page, the class search page. Users may search for their class or enter a join code to be redirected directly to their class.</td>
  </tr>
  <tr>
    <td>domain/create/</td>
    <td>Navigates to the class creation page.</td>
  </tr>
  <tr>
    <td>domain/class/:classPath
Optional: ...?join=code</td>
    <td>Navigates to the class page, displaying dynamic content based on whether the user has joined.</td>
  </tr>
</table>


## REST Endpoints
```
/*
 * Retrieves class information for the class page; information depends on join code.
 * 
 * Success: 200 OK, { className: string, instructors: Array<string>, line: Line, 
 *                                   sessionType: SessionType, id: number }
 * Failure: 404 Not Found
 */
GET /v1/classes/:classPath?join=code

/**
 * Create a new class. 
 * To authenticate and to ensure the instructor join code doesn’t get lost, send an email to
 * the user with a link to the url to the class with the join code, i.e. 
 * <domain>/class/:classPath?join=code
 * This link will cause a GET to /v1/classes/:classPath
 * Requires: ClassInfo
 * Success: 202 Accepted
 *          Send an email to validate the instructor.
 * Failure: 409 Conflict if class already exists
 */
POST /v1/classes

/**
 * Modifies an existing class.
 * Only makes the modification if the join code is for a valid instructor.
 * Completely modifies data; fields not provided will be set to defaults. PUT is idempotent.
 * Requires: ClassInfo
 * Success: 200 OK
 */
PUT /v1/classes?join=****code**

/**
 * Deletes an existing class.
 * 
 * Success: 204 Deleted
 * Failure: 401 Unauthorized if not joined, 403 Forbidden if joined as student
 */
DELETE /v1/classes/:classPath?join=code

/**
 * Searches for classes.
 * Supports both basic searching and advanced searching. Searches all fields of ClassInfo.
 * Requires: join xor (basic query and/or any combination of fields of ClassInfo). 
 * If join is given, return the only class. 
 * Additional options may be given, such as limit=5 or fields=className,semester. Use sensible defaults.
 * Needs to be lightning-fast and prefix-based for autocomplete to work (<100ms round-trip)
 * Success: 200 OK, Array<className: string>; may be empty
 * Failure: 404 Not Found if join code not found
 */
GET /v1/search?field1=val1&... or GET /v1/search?join=code
```