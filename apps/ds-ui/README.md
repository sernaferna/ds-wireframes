# ds-ui: Devouring Scripture UI

This is the "main" application for the overall suite of applications, serving up the user interface. It's a wireframe for what the **Devouring Scripture** app could look like, with some rudimentary functionality built in to show how different parts of the app might interact with one another.

The front-end UI doesn't supply its own data, it gets it from a set of APIs (see the **ds-api** and **ds-vapi** projects), because it was considered just as easy to do it that way as to try to hard-code data into the front-end app.

Leverages the following technologies:

- The heart of the project is [**React**](https://reactjs.org/) (and the other obvious stuff like **ReactDOM** etc.)
- **Typescript**
- Styling is provided by [**Bootstrap**](https://getbootstrap.com/), made simpler via the [**React-Bootstrap**](https://react-bootstrap.github.io/) libary, along with [**React Bootstrap Icons**](https://github.com/ismamz/react-bootstrap-icons) for an easier form of working with Bootstrap Icons, and _some_ amount of **Sass** for fonts, cases where the Bootstrap classes weren't fine-grained enough, and other areas where actual CSS is required
- [**Redux**](https://redux.js.org/) and [**Redux Toolkit**](https://redux-toolkit.js.org/), including **RTK Query** for talking to the APIs

No DevOps, little-to-no automation, just the React app and the basic, bare-bones scripts to start it in dev mode.
