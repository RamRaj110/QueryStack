import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { UserFilters } from "@/constant/filters";
import ROUTES from "@/constant/route";
import { EMPTY_USER } from "@/constant/state";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Community - Connect with Developers",
  description:
    "Join a thriving community of developers on Query Stack. Connect with talented programmers, explore developer profiles, build your professional network, and collaborate with peers worldwide.",
});

async function Community({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users, isNext } = data || {};

  return (
    <div className="flex flex-col gap-10">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-background to-background p-8 border border-border/40 sm:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="h1-bold text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              All Users
            </h1>
            <p className="body-regular text-muted-foreground max-w-lg text-lg leading-relaxed">
              Find and connect with incredible developers from around the world.
              Discover amazing minds and grow your network.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEARCH & FILTERS --- */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <LocalSearch
              route={ROUTES.COMMUNITY}
              placeholder="Search for amazing minds..."
              otherClasses="h-14 bg-card border-border/50 shadow-sm focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
            />
          </div>

          <CommonFilter
            filters={UserFilters}
            otherClasses="h-14 sm:min-w-[170px]"
            containerClasses="flex"
          />
        </div>
      </section>

      {/* --- USERS GRID --- */}
      <section>
        <DataRenderer
          success={success}
          data={users}
          error={error}
          empty={EMPTY_USER}
          render={(users) => (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          )}
        />

        {users && users.length > 0 && (
          <div className="mt-10 flex justify-center border-t border-border/50 pt-10">
            <Pagination page={page} isNext={isNext || false} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Community;
