type Props = {
  name: string;
  owner: string;
  location: string;
};

export default function ShopCard({
  name,
  owner,
  location,
}: Props) {
  return (
    <div className="glass rounded-[30px] p-6 shadow-purple">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-black text-violet-900">
            {name}
          </h1>

          <p className="mt-3 text-violet-500">
            Owner : {owner}
          </p>

          <p className="text-violet-500">
            Location : {location}
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-violet-100"></div>
      </div>
    </div>
  );
}