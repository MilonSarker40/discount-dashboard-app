type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-6 mt-10">
      <h1 className="text-3xl font-black text-violet-900">
        {title}
      </h1>

      <p className="text-violet-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}