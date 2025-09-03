import Link from "next/link";

async function getSchool(id: string) {
  const res = await fetch("http://localhost:3000/api/getSchool", {
    cache: "no-store",
  });
  const schools = await res.json();
  return schools.find((s: any) => s.id.toString() === id);
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
          <img
            src={school.image}
            alt={school.name}
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
