// components/FreelancerApproval.tsx
const freelancers = [
  { name: "Sabbir", role: "UI/UX Designer", status: "Pending" },
  { name: "Tamim", role: "Web Developer", status: "Approved" },
];

export default function FreelancerApproval() {
  return (
    <div className="glass-card p-6">
      <h1 className="text-2xl font-bold text-[#1d1b4b] mb-5">Freelancer Approval</h1>
      <div className="space-y-5">
        {freelancers.map((freelancer, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#faf9ff] border border-[#f0ebff]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold">
                {freelancer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-[#1d1b4b] text-lg">{freelancer.name}</h3>
                <p className="text-violet-500 text-sm">{freelancer.role}</p>
              </div>
            </div>
            <button
              className={`px-5 py-2 rounded-xl font-semibold text-sm transition ${
                freelancer.status === "Pending"
                  ? "bg-violet-700 text-white hover:bg-violet-800"
                  : "bg-green-100 text-green-700 cursor-default"
              }`}
            >
              {freelancer.status === "Pending" ? "Approve" : "Approved ✓"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}