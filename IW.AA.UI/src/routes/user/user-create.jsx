import {
  Form,
  redirect,
  useNavigate
} from "react-router-dom";
import { userService } from "../../core/services";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export async function action({ request }) {
  const formData = await request.formData();
  const newUserObject = Object.fromEntries(formData);
  newUserObject.confirmPassword = newUserObject.password;
  await userService.create(newUserObject);

  return redirect(`/users`);
}

export default function CreateUser() {
  const navigate = useNavigate();

  return (
    <div className="grid px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8">
      <div className="col-12 md:col-6 card p-fluid">
        <Form method="post" id="create-user-form">
          <div className="field">
            <label htmlFor="firstName">First</label>
            <InputText
              id="firstName"
              placeholder="First"
              aria-label="First name"
              type="text"
              name="firstName"
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
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="text"
              name="email"
              placeholder="test@email.com"
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
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              placeholder="password"
              aria-label="password"
              type="text"
              name="password"
            />
          </div>
          <div className="flex gap-2">
            <Button label="Create" type="submit"></Button>
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