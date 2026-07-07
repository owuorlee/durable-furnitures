interface BrandMarkProps {
  className?: string;
}

const BrandMark = ({ className }: BrandMarkProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 4 88 88"
    className={className}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M14 11h37a7 7 0 0 1 0 14H14zM14 31h53a7 7 0 0 1 0 14H14zM14 51h53a7 7 0 0 1 0 14H14zM14 71h37a7 7 0 0 1 0 14H14z"
    />
  </svg>
);

export default BrandMark;
