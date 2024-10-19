"use client";

export const PrimaryButton = ({
  text,
  onClick,
  small = false,
}: {
  text: string;
  onClick: () => void;
  small?: boolean;
}) => {
  return (
    <button
      className={`z-10 bg-button-primary cursor-pointer text-black px-8 rounded-full font-inriaSans ${
        small ? "py-1.5" : "py-2"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const SecondaryButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="z-10 bg-button-secondary cursor-pointer text-black px-8 py-2 rounded-full font-inriaSans"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
