"use client";
// src/app/(auth)/sign-up/page.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/sign-in"); // Redirige al usuario a la página de inicio de sesión después del registro exitoso
      } else {
        const errorData = await response.json();
        console.error("Failed to register", errorData.message);
        // Aquí puedes manejar el error y mostrar un mensaje al usuario
      }
    } catch (error) {
      console.error("An error occurred during registration", error);
      // Aquí puedes manejar el error y mostrar un mensaje al usuario
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

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
          Sign Up
        </button>
        <hr />
        <span className="w-full flex justify-center text-white py-2 rounded-md">or, If you do have account already: </span>
        <button
        type="button"
          onClick={() => router.push('/sign-in')}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
