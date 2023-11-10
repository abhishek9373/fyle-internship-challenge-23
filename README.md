Documentation For Challenge


1. User Component (user.component.ts and user.component.html):

Responsibility:

Display user information and repositories.
Handle user input, fetch data, and update the UI.
Key Code Parts:

ngOnInit() method:

Fetches user data and repositories when the component initializes.
Retrieves username from the route parameters.
changePage(newPage: number) method:
Updates the current page and fetches repositories accordingly.

goBack() method:
Navigates back to the username entry page.

fetchRepositories() method:
Fetches repositories based on the current username, page, and perPage values.

changePerPage() method:
Updates the perPage value and fetches repositories accordingly.

HTML Template (user.component.html):
Displays user information, repository cards, and pagination controls.
Includes a dropdown for selecting repositories per page.

2. User Service (user.service.ts):
Responsibility:
Handles communication with the GitHub API to fetch user data.

Code Parts:
getUserByUserName(username: string) method:
Fetches user data based on the provided username.

3. User Repository Service (user-repository.service.ts):
Responsibility:
Extends the User Service to fetch repositories specifically.

Key Code Parts:
getRepositoriesOfTheUser(username: string, page: number, perPage: number) method:
Fetches repositories for a user with pagination support.

4. Pagination Controls (pagination-controls.component.ts):
Responsibility:
Provides pagination controls for navigating between repository pages.

Key Code Parts:

(pageChange) event:
Emits the new page number when a user clicks on a different page.

5. CSS Styling (styles.scss and user.component.scss):
Responsibility:
Defines styles for user interface components.

Key Code Parts:
Styles for User Container:
Aligns user information and dropdown.
Styles for Dropdown:
Positions the dropdown and styles its appearance.
Styles for Repository Cards:
Defines the layout and appearance of individual repository cards.
