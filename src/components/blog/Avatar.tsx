const Avatar = (
  { author, size = 36 }: { author: { name: string; avatar?: string }; size?: number }
) => {
  const initial = author.name[0]?.toUpperCase() ?? "A";

  if (author.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={author.avatar}
        alt={author.name}
        title={author.name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-neutral text-xs font-semibold text-white"
      style={{ width: size, height: size }}
      title={author.name}
    >
      {initial}
    </span>
  );
};

export default Avatar;
