import { useState } from "react";

interface DesignFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function DesignForm({ onSubmit, isLoading }: DesignFormProps) {
  const [formData, setFormData] = useState({
    size: "",
    rooms: "",
    budget: "",
    style: "Modern"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      size: Number(formData.size),
      rooms: Number(formData.rooms),
      budget: Number(formData.budget),
      style: formData.style
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Size (sq. ft or marlas) *
        </label>
        <input
          type="number"
          id="size"
          name="size"
          required
          value={formData.size}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          placeholder="e.g. 2000"
          data-testid="input-size"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
          Number of Rooms *
        </label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          required
          value={formData.rooms}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          placeholder="e.g. 4"
          data-testid="input-rooms"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Budget *
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          required
          value={formData.budget}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          placeholder="e.g. 50000"
          data-testid="input-budget"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="style" className="block text-sm font-medium text-gray-700">
          Design Style
        </label>
        <select
          id="style"
          name="style"
          value={formData.style}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          data-testid="select-style"
        >
          <option value="Modern">Modern</option>
          <option value="Classic">Classic</option>
          <option value="Minimalistic">Minimalistic</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed mt-2"
        data-testid="button-generate"
      >
        {isLoading ? "Generating..." : "Generate Design"}
      </button>
    </form>
  );
}
