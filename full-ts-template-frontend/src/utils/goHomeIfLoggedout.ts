import { NextRouter } from "next/router";

export default function goHomeIfLoggedout(
  router: NextRouter,
  currentUserName: string | null
) {
  if (currentUserName === null) {
    router.push("/");
  }
}
