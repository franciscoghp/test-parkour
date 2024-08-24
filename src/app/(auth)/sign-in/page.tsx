"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn, } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Loading from "@/app/loading";

const schema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard'
    });
    setLoading(false)
    if (result?.error && result.status == 401) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    } else if (result?.ok) {
      const session = await getSession();
      if( session?.user.emailVerified ) router.push(result.url || '/dashboard' );
      else setError("Por favor, verifica tu correo electrónico antes de continuar.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Sign In
        </button>
        { loading && <Loading/> }
        <hr />
        <span className="w-full flex justify-center  py-2 rounded-md">or, If you do not have account yet: </span>
        <button
        type="button"
          onClick={() => router.push('/sign-up')}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
