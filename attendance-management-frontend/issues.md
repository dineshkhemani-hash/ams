## ISSUE 1

#### When Clicking on mark out it shows toast and then if i click on mark in it was not showing

#### Problem Explained

###### The root issue lies in how toast notifications work in React components. When you have multiple components each defining their own toast notification methods (notify and errorToast), you're essentially creating separate instances of these functions. Here's what's happening in your workflow:

###### You click "Mark In Time" button, which triggers attendanceInMutation If there's an error (like "You already marked attendance for today"), the error handler tries to show a toast Then you open "Mark Out Time" popup (the AttendanceEntryPopup component) This component has its own toast notification methods When you close this popup and try "Mark In" again, the toast isn't appearing because React's rendering cycle has prioritized the most recent toast configuration

###### The toast appears after refresh because the component tree is completely re-initialized, giving you a "clean slate" for the toast system.

#### Problem Solution Centralize Your Toast Notifications

###### The best practice is to centralize your toast notifications to avoid these conflicts.

Why This Solution Works

Single Source of Truth: By centralizing toast notifications, you ensure all components use the same toast configuration and rendering logic.
Consistent Error Handling: The centralized utility can standardize error handling, reducing code duplication and ensuring consistent user experience.
Prevents Conflicts: No more issues with multiple toast configurations competing with each other.
Better Maintainability: If you want to change how toasts look or behave, you only need to update one file.

Think of it like having two different remote controls for the same TV. If one person uses remote A and another uses remote B at almost the same time, the TV might get confused about which commands to follow. The solution is to use just one remote control (the centralized toast utility) that everyone shares.

## Issue 2

#### Problem When clicking on go home button url changes but ui not updating

```ErrorBoundary State Persistence
The ErrorBoundary is a class component with its own state:

Once an error is caught, hasError becomes true.
The render method checks this.state.hasError and, if true, returns <ErrorPage /> instead of this.props.children.
Key Insight: The ErrorBoundary doesn’t automatically reset hasError when the location changes. Its state persists across renders and navigation events because:

React doesn’t reset component state when props (like location) change unless you explicitly code it to do so.
Navigation via navigate() updates the URL and triggers a re-render, but it doesn’t unmount or reset the ErrorBoundary.
So, even though the URL changes to "/login" and Routes wants to render Login, the ErrorBoundary is still in an "error state" (hasError: true). Its render method short-circuits and returns ErrorPage, bypassing the Routes component entirely.
Since your ErrorBoundary wraps the entire Routes and doesn’t reset on navigation, it locks the UI into showing ErrorPage until the app restarts.
```

#### Brute force solution

When you call window.location.reload():

The entire page reloads from scratch.
The React app re-mounts, resetting all component states—including ErrorBoundary’s hasError back to false (via the constructor).
With hasError: false, the ErrorBoundary renders this.props.children (the Routes), and the /login route correctly displays the Login component.

```js
const handleGoHome = () => {
  if (resetError) {
    resetError(); // Reset the ErrorBoundary state first
  }
  navigate("/login", { replace: true });
  // window.location.reload();
};
```

#### Better solution

Add resetError using useState in ErrorBoundary

```js
resetError = () => {
  this.setState({ hasError: false, error: null });
};
const handleGoHome = () => {
  if (resetError) {
    resetError(); // Reset the ErrorBoundary state first
  }
  navigate("/login", { replace: true }); // Then navigate
};
```
