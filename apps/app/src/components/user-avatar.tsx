import Avatar from "boring-avatars";

export default function UserAvatar({ name }: { name?: string }) {
  return (
    <div className="shrink-0">
      <Avatar
        name={name}
        colors={["#9d9382", "#ffc1b2", "#ffdbc8", "#fff6c7", "#dcd7c2"]}
        size={32}
      />
    </div>
  );
}
