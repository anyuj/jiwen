import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$key/")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: add page type
  const { key } = Route.useParams();
  return <div>Hello {key}!</div>;
}
