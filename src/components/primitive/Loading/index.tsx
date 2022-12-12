export interface ILoadingProps {
  label: string;
}

export default function Loading({ label }: ILoadingProps) {
  return <div>{label}</div>;
}
