"use client";
import { useForm } from "react-hook-form";
import axios from "axios";

type SchoolForm = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList; // react-hook-form stores <input type="file"> as FileList
};

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm<SchoolForm>();

  const onSubmit = async (data: SchoolForm) => {
    const formData = new FormData();

    // Append text fields
    (Object.keys(data) as (keyof SchoolForm)[]).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key] as string);
      }
    });

    // Append image if uploaded
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    await axios.post("/api/addSchool", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("School added successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Add School</h1>

        <input placeholder="School Name" {...register("name", { required: true })} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input placeholder="Address" {...register("address", { required: true })} className="border p-2 w-full" />
        <input placeholder="City" {...register("city", { required: true })} className="border p-2 w-full" />
        <input placeholder="State" {...register("state", { required: true })} className="border p-2 w-full" />

        <input placeholder="Contact" type="number" {...register("contact", { required: true })} className="border p-2 w-full" />

        <input placeholder="Email" type="email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} className="border p-2 w-full" />
        {errors.email_id && <p className="text-red-500">Enter a valid email</p>}

        <input type="file" {...register("image", { required: true })} className="border p-2 w-full" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add School</button>
      </form>
    </div>
  );
}
