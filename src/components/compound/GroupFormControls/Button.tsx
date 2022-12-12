export interface ButtonProps {
  label: string;
}

export default function GroupFromButton({ label }: ButtonProps) {
  return <button>{label}</button>;
}
