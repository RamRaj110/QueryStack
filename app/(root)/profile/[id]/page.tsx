import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ProfileLink from "@/components/user/ProfileLink";
import UserAvatar from "@/components/UserAvtar";
import {
  getUser,
  getUserAnswers,
  getUserQuestions,
  getUserTags,
} from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import {
  CalendarDays,
  Link as LinkIcon,
  MapPin,
  Award,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPTY_ANSWER, EMPTY_QUESTION, EMPTY_TAGS } from "@/constant/state";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import AnswerCard from "@/components/cards/AnswerCard";
import TagCard from "@/components/cards/TagCard";
import { formatNumber } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: RouteParams) {
  const { id } = await params;

  const { success, data } = await getUser({ userId: id });

  if (!success || !data) {
    return createMetadata({
      title: "User Not Found",
      description: "This user profile could not be found.",
      noIndex: true,
    });
  }

  const { user, totalQuestions, totalAnswers } = data;
  const bio = user.bio ? `${user.bio.substring(0, 100)}... ` : "";

  return createMetadata({
    title: `${user.name} (@${user.username})`,
    description: `${bio}${
      user.name
    } has ${totalQuestions} questions and ${totalAnswers} answers on Query Stack. ${
      user.location ? `Based in ${user.location}.` : ""
    } Join the discussion!`,
  });
}

const Profile = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize } = await searchParams;
  if (!id) notFound();

  const session = await auth();
  const { success, data, error } = await getUser({ userId: id });

  if (!success)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-destructive font-bold text-lg">
          {error?.message}
        </div>
      </div>
    );

  const { user, totalQuestions, totalAnswers } = data!;
  const {
    success: userQuestionSuccess,
    data: userQuestions,
    error: userQuestionError,
  } = await getUserQuestions({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });
  const {
    success: userAnswerSuccess,
    data: userAnswers,
    error: userAnswerError,
  } = await getUserAnswers({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });
  const {
    success: userTagSuccess,
    data: userTags,
    error: userTagError,
  } = await getUserTags({
    userId: id,
  });

  const { questions, isNext: hasMoreQuestion } = userQuestions!;
  const { answers, isNext: hasMoreAnswer } = userAnswers!;
  const { tags } = userTags!;

  const {
    _id,
    name,
    username,
    bio,
    location,
    portfolio,
    reputation,
    image,
    createdAt,
  } = user;

  return (
    <div className="flex flex-col gap-10">
      {/* --- HERO PROFILE CARD --- */}
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-linear-to-br from-primary/5 via-background to-background p-8 sm:p-12">
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            {/* Avatar with Glow Effect */}
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
              <div className="relative rounded-full border-4 border-background p-1.5 shadow-2xl ring-2 ring-primary/20">
                <UserAvatar
                  id={_id}
                  name={name}
                  imageUrl={image}
                  className="h-32 w-32 sm:h-40 sm:w-40"
                  fallbackClassName="text-4xl sm:text-5xl font-bold bg-linear-to-br from-primary to-primary/60 text-primary-foreground"
                />
              </div>
              {/* Reputation Badge */}
              <div className="absolute -bottom-2 -right-2 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-linear-to-br from-yellow-500 to-orange-500 shadow-lg">
                <div className="flex flex-col items-center">
                  <Award size={16} className="text-white mb-0.5" />
                  <span className="text-[10px] font-black text-white">
                    {formatNumber(reputation || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {name}
                </h1>
                <p className="text-lg text-muted-foreground font-medium mt-1">
                  @{username}
                </p>
              </div>

              {/* Profile Metadata */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                {portfolio && (
                  <ProfileLink
                    icon={LinkIcon}
                    href={portfolio}
                    title="Portfolio"
                  />
                )}
                {location && <ProfileLink icon={MapPin} title={location} />}
                {createdAt && (
                  <ProfileLink
                    icon={CalendarDays}
                    title={`Joined ${new Date(createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" }
                    )}`}
                  />
                )}
              </div>

              {/* Bio */}
              {bio && (
                <p className="text-foreground/80 max-w-2xl leading-relaxed text-base">
                  {bio}
                </p>
              )}
            </div>

            {/* Edit Profile Button */}
            {session?.user?.id === id && (
              <Link href={`/profile/${id}/edit`}>
                <Button
                  variant="outline"
                  className="min-h-[46px] min-w-[140px] rounded-xl border-primary/30 bg-primary/5 font-semibold hover:bg-primary/10"
                >
                  Edit Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* --- STATS CARDS --- */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Questions Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HelpCircle size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">
                {formatNumber(totalQuestions)}
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Questions
              </p>
            </div>
          </div>
        </div>

        {/* Answers Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 backdrop-blur-sm">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <MessageSquare size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">
                {formatNumber(totalAnswers)}
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Answers
              </p>
            </div>
          </div>
        </div>

        {/* Reputation Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/5 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Award size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">
                {formatNumber(reputation || 0)}
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Reputation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* --- LEFT: TABS CONTENT --- */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="top-posts" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 gap-2 rounded-2xl bg-secondary/20 p-1.5 backdrop-blur-sm border border-border/20">
              <TabsTrigger
                value="top-posts"
                className="rounded-xl py-3 text-sm font-bold transition-[background-color,color,box-shadow] duration-300 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg dark:data-[state=active]:bg-secondary/60"
              >
                Top Posts
              </TabsTrigger>
              <TabsTrigger
                value="answers"
                className="rounded-xl py-3 text-sm font-bold transition-[background-color,color,box-shadow] duration-300 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg dark:data-[state=active]:bg-secondary/60"
              >
                Answers
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="top-posts"
              className="animate-in fade-in duration-500"
            >
              <DataRenderer
                data={questions}
                error={userQuestionError}
                success={userQuestionSuccess}
                empty={EMPTY_QUESTION}
                render={(hotQuestion) => (
                  <div className="flex flex-col gap-6">
                    {hotQuestion.map((question) => (
                      <QuestionCard
                        key={question._id}
                        question={question}
                        showActionBtns={
                          session?.user?.id === String(question.author._id)
                        }
                      />
                    ))}
                  </div>
                )}
              />
              {questions && questions.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Pagination page={page} isNext={hasMoreQuestion} />
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="answers"
              className="animate-in fade-in duration-500"
            >
              <DataRenderer
                data={answers}
                error={userAnswerError}
                success={userAnswerSuccess}
                empty={EMPTY_ANSWER}
                render={(hotAnswer) => (
                  <div className="flex flex-col gap-6">
                    {hotAnswer.map((answer) => (
                      <AnswerCard
                        key={answer._id}
                        {...answer}
                        content={answer.content.slice(0, 150)}
                        containerClass="rounded-xl border border-border/50 bg-card p-6 hover:shadow-lg transition-[border-color,box-shadow] duration-300"
                        showMore
                        showActionBtns={
                          session?.user?.id === String(answer.author._id)
                        }
                      />
                    ))}
                  </div>
                )}
              />
              {answers && answers.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Pagination page={page} isNext={hasMoreAnswer} />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* --- RIGHT: SIDEBAR --- */}
        <aside className="w-full lg:w-[340px] shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Top Tags Card */}
            <div className="rounded-2xl border border-border/40 bg-card/40 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-primary to-primary/40" />
                <h3 className="text-xl font-bold text-foreground">Top Tags</h3>
              </div>

              <DataRenderer
                data={tags}
                error={userTagError}
                success={userTagSuccess}
                empty={EMPTY_TAGS}
                render={(hotTag) => (
                  <div className="flex flex-col gap-3">
                    {hotTag.slice(0, 8).map((tag) => (
                      <div
                        key={tag._id}
                        className="transition-transform duration-300 hover:translate-x-1"
                      >
                        <TagCard
                          id={tag._id}
                          name={tag.name}
                          questions={tag.questionCount}
                          showCount
                          compact
                        />
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Impact Card */}
            <div className="rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-6 border border-primary/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Award className="text-primary" size={20} />
                <h4 className="text-base font-bold text-foreground">
                  Community Impact
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your contributions help the community grow. Keep sharing
                knowledge and learning together! 🚀
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
