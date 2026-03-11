import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
      {/* Size Input */}
      <div className="space-y-2">
        <label htmlFor="size" className="block text-sm font-medium text-slate-200">
          Property Size <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            id="size"
            name="size"
            required
            value={formData.size}
            onChange={handleChange}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="e.g. 2000"
            data-testid="input-size"
          />
          <span className="absolute right-4 top-3 text-slate-400 text-sm">sq. ft</span>
        </div>
      </div>

      {/* Number of Rooms */}
      <div className="space-y-2">
        <label htmlFor="rooms" className="block text-sm font-medium text-slate-200">
          Number of Rooms <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          required
          value={formData.rooms}
          onChange={handleChange}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          placeholder="e.g. 4"
          data-testid="input-rooms"
        />
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label htmlFor="budget" className="block text-sm font-medium text-slate-200">
          Budget <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            id="budget"
            name="budget"
            required
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="e.g. 50000"
            data-testid="input-budget"
          />
          <span className="absolute right-4 top-3 text-slate-400 text-sm">USD</span>
        </div>
      </div>

      {/* Design Style */}
      <div className="space-y-2">
        <label htmlFor="style" className="block text-sm font-medium text-slate-200">
          Design Style
        </label>
        <div className="relative">
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-10"
            data-testid="select-style"
          >
            <option value="Modern">Modern</option>
            <option value="Classic">Classic</option>
            <option value="Minimalistic">Minimalistic</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
        data-testid="button-generate"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Generating...
          </span>
        ) : (
          "Generate Design"
        )}
      </button>
    </form>
  );
}
