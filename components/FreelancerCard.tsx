type Props = {
  name: string;
  status: string;
};

export default function FreelancerCard({
  name,
  status,
}: Props) {
  return (
    <div className="glass p-6 rounded-[30px] shadow-purple flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-violet-200"></div>

        <div>
          <h1 className="font-black text-xl text-violet-900">
            {name}
          </h1>

          <p className="text-violet-500">
            {status}
          </p>
        </div>
      </div>

      <button className="bg-violet-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-violet-800 transition-all">
        Approve
      </button>
    </div>
  );
}