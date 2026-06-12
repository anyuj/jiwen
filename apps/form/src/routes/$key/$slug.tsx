import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$key/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { key, slug } = Route.useParams();
  return (
    <div>
      Hello {key} {slug}!
    </div>
  );
}
