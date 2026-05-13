// components/UserTable.tsx
const users = [
  { name: "Rahim", email: "rahim@gmail.com", status: "Active" },
  { name: "Karim", email: "karim@gmail.com", status: "Active" },
  { name: "Jannat", email: "jannat@email.com", status: "Active" },
];

export default function UserTable() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-5 border-b border-[#f1efff] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1d1b4b]">Users</h2>
          <p className="text-[#8a86b3] mt-1">Customer List</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl border border-[#ece8ff] text-violet-700 font-semibold text-sm">
          View All
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-[#faf9ff] border-b border-[#f1efff]">
          <tr className="text-left text-[#8a86b3]">
            <th className="px-5 py-5 font-semibold">Customer</th>
            <th className="px-5 py-5 font-semibold">Email</th>
            <th className="px-5 py-5 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition">
              <td className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-700">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-[#1d1b4b]">{user.name}</span>
                </div>
              </td>
              <td className="p-6 text-[#6f6c99]">{user.email}</td>
              <td className="p-6">
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}