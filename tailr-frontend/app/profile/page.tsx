import { requireAuth } from "@/lib/auth";
import { getProfile, upsertProfile } from "@/lib/api";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default async function ProfilePage() {
  await requireAuth();
  const profile = await getProfile();

  async function update(formData: FormData) {
    "use server";
    const headline = formData.get("headline") as string;
    const summary = formData.get("summary") as string;
    await upsertProfile({ headline, summary, skills: [] });
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardTitle>My Profile</CardTitle>
        <CardContent>
          <form action={update} className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm text-gray-700">Headline</span>
              <Input name="headline" defaultValue={profile.headline || ""} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-700">Summary</span>
              <Input name="summary" defaultValue={profile.summary || ""} />
            </label>
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


