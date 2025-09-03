import Link from "next/link";
import Image from "next/image";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string | null;
};

async function getSchool(id: string): Promise<School | undefined> {
  const res = await fetch("http://localhost:3000/api/getSchool", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch schools");

  const schools: School[] = await res.json();
  return schools.find((s) => s.id.toString() === id);
}

export default async function SchoolDetail({ params }: { params: { id: string } }) {
  const school = await getSchool(params.id);

  if (!school) {
    return <div className="p-6">School not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link href="/showschool" className="text-blue-500 underline mb-4 inline-block">
        ← Back
      </Link>
      <div className="bg-white shadow rounded-lg p-6">
        {school.image && (
          <Image
            src={school.image}
            alt={school.name}
            width={600}
            height={240}
            className="w-full h-60 object-cover mb-4 rounded"
          />
        )}
        <h1 className="text-2xl font-bold">{school.name}</h1>
        <p className="text-gray-600 mt-2">{school.address}</p>
        <p className="text-gray-500">{school.city}</p>
      </div>
    </div>
  );
}
