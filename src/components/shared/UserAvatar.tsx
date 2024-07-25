import { useState } from "react";

type UserAvatarProps = {
  photo: string;
  firstName: string;
  lastName: string;
};

export default function UserAvatar({
  firstName,
  lastName,
  photo,
}: UserAvatarProps): JSX.Element {
  const [showInitial, setShowInitial] = useState(false);

  function handleImageError(): void {
    setShowInitial(true);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="h-10 w-10">
        {showInitial ? (
          <div className="flex items-center text-center justify-center text-md h-full w-full rounded-full ring ring-indigo-600 bg-indigo-600">
            <div className="w-full">{`${firstName[0]}${lastName[0]}`}</div>
          </div>
        ) : (
          <img
            className="h-full w-full rounded-full object-cover ring ring-indigo-600 object-center bg-indigo-600"
            onError={handleImageError}
            src={photo}
            alt={`${lastName} ${lastName}`}
          />
        )}
      </div>
    </div>
  );
}
