import config from "@/config";

const AvatarGroup = () => {
  const proof = config.socialProof;

  if (!proof.showAvatarGroup || !proof.avatarGroupMembers.length) {
    return null;
  }

  const avatars = proof.avatarGroupMembers.slice(0, 5);

  return (
    <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-base-content/[0.03] px-3 py-2">
      <div className="flex items-center">
        {avatars.map((member, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={member.src + member.alt + i}
            src={member.src}
            alt={member.alt}
            loading="lazy"
            className={`h-8 w-8 rounded-full object-cover ring-2 ring-base-100 ${
              i === 0 ? "" : "-ml-2"
            }`}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-base-content/65">{proof.avatarGroupText}</p>
    </div>
  );
};

export default AvatarGroup;
