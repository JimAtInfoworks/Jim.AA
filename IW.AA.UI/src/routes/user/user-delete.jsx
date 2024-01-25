import { redirect } from "react-router-dom";
import { userService } from "../../core/services";

export async function action({ params }) {
  await userService.delete(params.userId);
  return redirect("/users");
}