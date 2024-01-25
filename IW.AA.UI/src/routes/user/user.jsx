import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { userService } from "../../core/services";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export async function loader({ params }) {
  const user = await userService.getById(params.userId);
  if (!user) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { user };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const userToUpdate = await userService.getById(params.userId);

  if (!userToUpdate) throw new Error("No user found for", params.userId);

  const updatedUser = {
    firstName: userToUpdate.firstName,
    lastName: userToUpdate.lastName,
    role: userToUpdate.role.toString(),
    email: userToUpdate.email,
    isActive: updates.isActive === "true"
  };
  return await userService.update(params.userId, updatedUser);
}

export default function User() {
  const { user } = useLoaderData();

  return (
    <div className="grid px-4 pt-4 mx-0 md:mx-6 lg:mx-8 lg:px-8">
      <Card className="col-12 lg:col-10 xl:col-8">
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>

        <div className="py-3">
          Example of <a href="https://reactrouter.com/en/main/start/tutorial#optimistic-ui" target="_blank">Optimistically rendered UI</a> 
          <IsActive user={user} />
        </div>

        <div className="flex align-items-center gap-2">
          <Form action="edit">
            <Button type="submit" size="small">Edit</Button>
          </Form>
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <Button type="submit" severity="danger" size="small" outlined>Delete</Button>
          </Form>
        </div>
      </Card>
    </div>
  )
}

function IsActive({ user }) {
  const fetcher = useFetcher();

  let isActive = user.isActive;
  if (fetcher.formData) {
    // Optimistically render UI https://reactrouter.com/en/main/start/tutorial#optimistic-ui
    isActive = fetcher.formData.get("isActive") === "true";
  }

  return (
    <fetcher.Form method="post">
      <Button
        name="isActive"
        value={isActive ? "false" : "true"}
        aria-label={
          isActive
            ? "deactivate user"
            : "reactivate user"
        }
        size="small"
      >
        {isActive ? "active ★" : "not active ☆"}
      </Button>
    </fetcher.Form>
  );
}