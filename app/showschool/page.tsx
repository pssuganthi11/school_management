"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string | null;
};

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    fetch("/api/getSchool")
      .then((res) => res.json())
      .then((data: School[]) => setSchools(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Schools</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {schools.map((school) => (
          <Link href={`/showschool/${school.id}`} key={school.id}>
            <div className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
              {school.image && (
                <Image
                  src={school.image}
                  alt={school.name}
                  width={400}  // required for next/image
                  height={160} // required for next/image
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{school.name}</h2>
                <p className="text-gray-600">{school.address}</p>
                <p className="text-gray-500 text-sm">{school.city}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
