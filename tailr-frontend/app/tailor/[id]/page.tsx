import { requireAuth } from "@/lib/auth";
import { getJobById, tailor } from "@/lib/api";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";

export default async function TailorPage({ params }: { params: { id: string } }) {
  await requireAuth();
  const job = await getJobById(params.id);

  async function runTailor() {
    "use server";
    await tailor({ jobTargetId: params.id });
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardTitle>Tailoring for {job.role} @ {job.company}</CardTitle>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Fit score</span>
              <span className="text-sm">0%</span>
            </div>
            <Progress value={0} />
            <form action={runTailor}>
              <Button type="submit">Run Tailor (stub)</Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardTitle>Requirements</CardTitle>
          <CardContent>
            <ul className="list-disc ml-5 text-sm">
              <li>Must-have: []</li>
              <li>Nice-to-have: []</li>
              <li>Responsibilities: []</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>Artifacts</CardTitle>
          <CardContent>
            <div className="text-sm text-gray-600">DOCX/PDF links TBD</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


