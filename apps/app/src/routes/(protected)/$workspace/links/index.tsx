import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/$workspace/links/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Content Here</div>;
}
