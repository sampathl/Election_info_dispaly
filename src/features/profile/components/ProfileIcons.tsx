import { Icon, type IconProps } from '@chakra-ui/react';

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function CompareIcon(props: IconProps) {
  return (
    <Icon
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M8 7h9" />
      <path d="m13 3 4 4-4 4" />
      <path d="M16 17H7" />
      <path d="m11 13-4 4 4 4" />
    </Icon>
  );
}

export function EducationIcon(props: IconProps) {
  return (
    <Icon
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11.5v4.2c0 .4.2.8.6 1 1.6 1 3.1 1.5 4.4 1.5s2.8-.5 4.4-1.5c.4-.2.6-.6.6-1v-4.2" />
      <path d="M19 10v4" />
    </Icon>
  );
}

export function GavelIcon(props: IconProps) {
  return (
    <Icon
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m14.5 4.5 5 5" />
      <path d="m7 12 5 5" />
      <path d="m4.5 14.5 10-10" />
      <path d="m12 16 5.5-5.5" />
      <path d="m3 21 6-6" />
      <path d="M13 19h8" />
    </Icon>
  );
}

export function LedgerIcon(props: IconProps) {
  return (
    <Icon
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect height="14" rx="2.5" width="18" x="3" y="5" />
      <path d="M3 10h18" />
      <path d="M8 14h3" />
      <path d="M16.5 14h.01" />
    </Icon>
  );
}

export function PolicyIcon(props: IconProps) {
  return (
    <Icon
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M8 3h7l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M15 3v5h5" />
      <path d="M10 13h6" />
      <path d="M10 17h6" />
    </Icon>
  );
}
