import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/$workspace/pages")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(protected)/$workspace/pages"!</div>;
}
