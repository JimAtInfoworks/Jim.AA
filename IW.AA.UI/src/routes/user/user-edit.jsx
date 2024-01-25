import React, { useState } from "react";
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useLocation
} from "react-router-dom";
import { userService } from "../../core/services";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

export async function loader({ params }) {
  const user = await userService.getById(params.userId);
  return { user };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  updates.isActive = updates.isActive === "on" ? true : false;
  await userService.update(params.userId, updates);

  const url = updates?.prevUrl === "users" ? '/users' : `/users/${params.userId}`;
  return redirect(url);
}

export default function EditUser() {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(user.isActive);
  const { state } = useLocation();

  return (
    <div className="grid px-4 pt-4 mx-0 md:mx-6 lg:mx-8 lg:px-8">
      <div className="col-12 md:col-6 card p-fluid">
        <h2>Edit User</h2>
        <Form method="post" id="edit-user-form">
          <div className="field">
            <label htmlFor="firstName">First</label>
            <InputText
              id="firstName"
              placeholder="First"
              aria-label="First name"
              type="text"
              name="firstName"
              defaultValue={user.firstName}
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last</label>
            <InputText
              id="lastName"
              placeholder="Last"
              aria-label="Last name"
              type="text"
              name="lastName"
              defaultValue={user.lastName}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="text"
              name="email"
              placeholder="test@email.com"
              defaultValue={user.email}
            />
          </div>
          <div className="field">
            <label htmlFor="role">Role</label>
            <InputText
              id="role"
              placeholder="role"
              aria-label="role"
              type="text"
              name="role"
              defaultValue={user.role}
            />
          </div>
          <div className="field flex">
            <Checkbox
              id="isActive"
              name="isActive"
              value="Is Active"
              onChange={e => setChecked(e.checked)}
              checked={checked} />
            <label htmlFor="isActive" className="ml-2">Is Active</label>
          </div>
          <div>
            <InputText
              type="text"
              name="prevUrl"
              hidden
              defaultValue={state?.from}
            />
          </div>
          <div className="flex gap-2">
            <Button label="Save" type="submit"></Button>
            <Button
              severity="secondary"
              outlined
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}