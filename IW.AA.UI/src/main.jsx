import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './styles/index.css';
import Root from './routes/root';
import ErrorPage from './ui/components/exception/error-page';
import User, {
  loader as userLoader,
  action as userAction
} from "./routes/user/user";
import EditUser, {
  loader as editUserLoader,
  action as editAction
} from './routes/user/user-edit';
import { action as deleteAction } from './routes/user/user-delete';
import Index from "./routes/index";
import Users, {
  loader as usersLoader,
} from "./routes/user/users";
import CreateUser, {
  action as createUserAction
} from './routes/user/user-create';

// Prime React setup 
import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: "users",
            element: <Users />,
            loader: usersLoader,
          },
          {
            path: "users/:userId",
            element: <User />,
            loader: userLoader,
            action: userAction
          },
          {
            path: "users/:userId/edit",
            element: <EditUser />,
            loader: editUserLoader,
            action: editAction
          },
          {
            path: "users/:userId/delete",
            action: deleteAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "users/create",
            element: <CreateUser />,
            action: createUserAction
          }
        ]
      }
    ]
  },
]);
//   createRoutesFromElements(
//     <Route
//       path="/"
//       element={<Root />}
//       loader={rootLoader}
//       action={rootAction}
//       errorElement={<ErrorPage />}
//     >
//       <Route errorElement={<ErrorPage />}>
//         <Route index element={<Index />} />
//         <Route
//           path="contacts/:contactId"
//           element={<Contact />}
//           loader={contactLoader}
//           action={contactAction}
//         />
//         <Route
//           path="contacts/:contactId/edit"
//           element={<EditContact />}
//           loader={editContactLoader}
//           action={editAction}
//         />
//         <Route
//           path="contacts/:contactId/destroy"
//           action={destroyAction}
//         />
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
