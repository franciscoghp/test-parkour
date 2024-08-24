"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import TranslateText from "@/components/translateText/page";

// Definir el esquema de validación usando Zod
const schema = z.object({
  name: z.string().nonempty("Name is required"),
  cedula: z
    .number({ required_error: "Cedula is required" })
    .int("Cedula must be a valid integer")
    .min(100000, "Cedula must be at least 6 digits")
    .max(99999999, "Cedula must be at most 8 digits"),
  telefono: z
    .number({ required_error: "Telefono is required" })
    .int("Telefono must be a valid integer")
    .min(1000000000, "Telefono must be a 10-digit number")
    .max(9999999999, "Telefono must be a 10-digit number"),
  direccion: z.string().nonempty("Direccion is required"),
  salario: z
    .number({ required_error: "Salario is required" })
    .min(1, "Salario must be a positive number")
    .nonnegative("Salario must not be negative"),
});

type FormData = z.infer<typeof schema>;

const AddPersonalInfoPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/personal-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/dashboard');
    } else {
      console.error('Failed to submit data');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold"><TranslateText id={'personalInfo'}/></h1>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          <TranslateText id={'addPersonalInfo'}/>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              <TranslateText id={'name'}/>
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
              <TranslateText id={'cedula'}/>
            </label>
            <input
              {...register("cedula", { valueAsNumber: true })}
              id="cedula"
              type="number"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.cedula ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.cedula && (
              <p className="mt-1 text-sm text-red-600">{errors.cedula.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              <TranslateText id={'telefono'}/>
            </label>
            <input
              {...register("telefono", { valueAsNumber: true })}
              id="telefono"
              type="number"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.telefono ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
              <TranslateText id={'direccion'}/>
            </label>
            <input
              {...register("direccion")}
              id="direccion"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.direccion ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.direccion && (
              <p className="mt-1 text-sm text-red-600">{errors.direccion.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
              <TranslateText id={'salario'}/>
            </label>
            <input
              {...register("salario", { valueAsNumber: true })}
              id="salario"
              type="number"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.salario ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.salario && (
              <p className="mt-1 text-sm text-red-600">{errors.salario.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonalInfoPage;
