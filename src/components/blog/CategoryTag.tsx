const CategoryTag = ({ name }: { name: string }) => {
  return (
    <span className="rounded-full bg-base-200 px-2.5 py-0.5 text-xs font-medium text-base-content/70">
      {name}
    </span>
  );
};

export default CategoryTag;
