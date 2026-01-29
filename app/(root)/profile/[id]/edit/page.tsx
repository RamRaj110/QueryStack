import { auth } from "@/auth";
import { getUser } from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import { notFound, redirect } from "next/navigation";
import EditProfileForm from "@/components/forms/EditProfileForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EditProfile = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) notFound();

  const session = await auth();
  if (!session?.user?.id || session.user.id !== id) {
    redirect(`/profile/${id}`);
  }

  const { success, data, error } = await getUser({ userId: id });

  if (!success || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-destructive font-bold text-lg">
          {error?.message || "User not found"}
        </div>
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/profile/${id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground transition-[background-color,color] duration-300 hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Edit Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update your personal information
          </p>
        </div>
      </div>

      {/* Edit Form Card */}
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-linear-to-br from-primary/5 via-background to-background p-8 sm:p-10">
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10">
          <EditProfileForm user={user} />
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
