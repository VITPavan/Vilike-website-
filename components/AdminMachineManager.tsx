"use client";

import { useState } from "react";
import type { Machine } from "@/lib/types";
import { formatINR } from "@/lib/data";

export default function AdminMachineManager({
  initialMachines,
}: {
  initialMachines: Machine[];
}) {
  const [list, setList] = useState(initialMachines);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ model_name: "", price: 0, hero_image: "" });

  function startEdit(m: Machine) {
    setEditing(m.id);
    setForm({ model_name: m.model_name, price: m.price, hero_image: m.hero_image });
  }

  async function save(id: string) {
    const res = await fetch("/api/machines", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...form }),
    });
    const data = await res.json();
    if (data.machines) setList(data.machines);
    setEditing(null);
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-vilike-accent/20">
          <tr>
            <th className="p-3">Model</th>
            <th className="p-3">Price</th>
            <th className="p-3">Image</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((m) => (
            <tr key={m.id} className="border-t border-white/10">
              <td className="p-3">
                {editing === m.id ? (
                  <input
                    value={form.model_name}
                    onChange={(e) => setForm({ ...form, model_name: e.target.value })}
                    className="w-full rounded border border-white/20 bg-black px-2 py-1 text-white"
                  />
                ) : (
                  m.model_name
                )}
              </td>
              <td className="p-3">
                {editing === m.id ? (
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full rounded border border-white/20 bg-black px-2 py-1 text-white"
                  />
                ) : (
                  formatINR(m.price)
                )}
              </td>
              <td className="p-3 max-w-[120px] truncate text-vilike-muted">
                {editing === m.id ? (
                  <input
                    value={form.hero_image}
                    onChange={(e) => setForm({ ...form, hero_image: e.target.value })}
                    className="w-full rounded border border-white/20 bg-black px-2 py-1 text-white"
                  />
                ) : (
                  m.hero_image
                )}
              </td>
              <td className="p-3">
                {editing === m.id ? (
                  <button onClick={() => save(m.id)} className="text-green-400 hover:underline">
                    Save
                  </button>
                ) : (
                  <button onClick={() => startEdit(m)} className="text-vilike-accent hover:underline">
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
