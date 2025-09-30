import { requireAuth } from "@/lib/auth";
import { createJob } from "@/lib/api";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { redirect } from "next/navigation";

export default async function JobPage() {
  await requireAuth();

  async function submit(formData: FormData) {
    "use server";
    const role = String(formData.get("role") || "");
    const company = String(formData.get("company") || "");
    const res = await createJob({ role, company });
    redirect(`/tailor/${res.jobTargetId}`);
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardTitle>New Job Target</CardTitle>
        <CardContent>
          <form action={submit} className="grid gap-3">
            <Input name="role" placeholder="Role (e.g., Backend SWE)" />
            <Input name="company" placeholder="Company (e.g., Acme)" />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


