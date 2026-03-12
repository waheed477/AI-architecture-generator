import { ChevronDown, Info } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface DesignFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  size: Yup.number()
    .typeError("Must be a number")
    .required("Size is required")
    .positive("Size must be positive")
    .min(50, "Minimum size is 50"),
  sizeUnit: Yup.string().required(),
  rooms: Yup.number()
    .typeError("Must be a number")
    .required("Number of rooms is required")
    .positive("Must be at least 1")
    .integer("Must be an integer")
    .max(20, "Maximum 20 rooms"),
  budget: Yup.number()
    .typeError("Must be a number")
    .required("Budget is required")
    .positive("Budget must be positive")
    .min(1000, "Minimum budget is 1000"),
  style: Yup.string().required(),
});

export default function DesignForm({ onSubmit, isLoading }: DesignFormProps) {
  const formik = useFormik({
    initialValues: {
      size: "",
      sizeUnit: "sqft",
      rooms: "",
      budget: "",
      style: "Modern",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        size: Number(values.size),
        rooms: Number(values.rooms),
        budget: Number(values.budget),
        style: values.style,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {/* Size Input */}
      <div className="space-y-2">
        <label htmlFor="size" className="block text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center justify-between">
          <span>Property Size <span className="text-red-600 dark:text-red-400">*</span></span>
          <div className="group relative cursor-help">
            <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="absolute right-0 w-48 p-2 mt-1 text-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl border border-gray-300 dark:border-gray-700">
              Total area of the property to be designed
            </div>
          </div>
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              id="size"
              name="size"
              value={formik.values.size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full bg-white dark:bg-gray-700/50 border ${formik.touched.size && formik.errors.size ? 'border-red-600 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              placeholder="e.g. 2000"
              data-testid="input-size"
            />
          </div>
          <select
            name="sizeUnit"
            value={formik.values.sizeUnit}
            onChange={formik.handleChange}
            className="appearance-none bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer"
            data-testid="select-size-unit"
          >
            <option value="sqft">sq. ft</option>
            <option value="marla">marla</option>
          </select>
        </div>
        {formik.touched.size && formik.errors.size && (
          <p className="text-red-600 dark:text-red-400 text-xs mt-1">{formik.errors.size as string}</p>
        )}
      </div>

      {/* Number of Rooms */}
      <div className="space-y-2">
        <label htmlFor="rooms" className="block text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center justify-between">
          <span>Number of Rooms <span className="text-red-600 dark:text-red-400">*</span></span>
          <div className="group relative cursor-help">
            <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="absolute right-0 w-48 p-2 mt-1 text-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl border border-gray-300 dark:border-gray-700">
              Total distinct rooms excluding bathrooms
            </div>
          </div>
        </label>
        <input
          type="text"
          id="rooms"
          name="rooms"
          value={formik.values.rooms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-white dark:bg-gray-700/50 border ${formik.touched.rooms && formik.errors.rooms ? 'border-red-600 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
          placeholder="e.g. 4"
          data-testid="input-rooms"
        />
        {formik.touched.rooms && formik.errors.rooms && (
          <p className="text-red-600 dark:text-red-400 text-xs mt-1">{formik.errors.rooms as string}</p>
        )}
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label htmlFor="budget" className="block text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center justify-between">
          <span>Budget <span className="text-red-600 dark:text-red-400">*</span></span>
          <div className="group relative cursor-help">
            <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="absolute right-0 w-48 p-2 mt-1 text-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl border border-gray-300 dark:border-gray-700">
              Estimated budget in PKR for the project
            </div>
          </div>
        </label>
        <div className="relative">
          <input
            type="text"
            id="budget"
            name="budget"
            value={formik.values.budget}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full bg-white dark:bg-gray-700/50 border ${formik.touched.budget && formik.errors.budget ? 'border-red-600 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
            placeholder="e.g. 50000"
            data-testid="input-budget"
          />
          <span className="absolute right-4 top-3 text-gray-600 dark:text-gray-400 text-sm pointer-events-none">PKR</span>
        </div>
        {formik.touched.budget && formik.errors.budget && (
          <p className="text-red-600 dark:text-red-400 text-xs mt-1">{formik.errors.budget as string}</p>
        )}
      </div>

      {/* Design Style */}
      <div className="space-y-2">
        <label htmlFor="style" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          Design Style
        </label>
        <div className="relative">
          <select
            id="style"
            name="style"
            value={formik.values.style}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full appearance-none bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-10"
            data-testid="select-style"
          >
            <option value="Modern">Modern</option>
            <option value="Classic">Classic</option>
            <option value="Minimalistic">Minimalistic</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
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
