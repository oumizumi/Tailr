export default function Home() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Welcome to Tailr</h1>
      <p className="text-gray-600">Personalized resumes for every job. This is the skeleton UI.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <a href="/auth" className="rounded-lg border bg-white p-6 hover:shadow">
          <h3 className="font-semibold mb-1">Auth</h3>
          <p className="text-sm text-gray-600">Sign in to access protected pages</p>
        </a>
        <a href="/job" className="rounded-lg border bg-white p-6 hover:shadow">
          <h3 className="font-semibold mb-1">Job</h3>
          <p className="text-sm text-gray-600">Enter role, company, and JD</p>
        </a>
        <a href="/history" className="rounded-lg border bg-white p-6 hover:shadow">
          <h3 className="font-semibold mb-1">History</h3>
          <p className="text-sm text-gray-600">See your tailored docs</p>
        </a>
        <a href="/settings" className="rounded-lg border bg-white p-6 hover:shadow">
          <h3 className="font-semibold mb-1">Settings</h3>
          <p className="text-sm text-gray-600">Limits and account</p>
        </a>
      </div>
    </div>
  );
}
