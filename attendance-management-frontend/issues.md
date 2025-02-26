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
