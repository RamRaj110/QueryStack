import React from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Star,
  TrendingUp,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const FindJobs = () => {
  // Sample job data
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      posted: "2 days ago",
      tags: ["React", "Node.js", "TypeScript"],
      featured: true,
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "Startup Labs",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $150k",
      posted: "1 week ago",
      tags: ["Vue.js", "CSS", "JavaScript"],
      featured: true,
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "CloudSystems",
      location: "New York, NY",
      type: "Contract",
      salary: "$90k - $130k",
      posted: "3 days ago",
      tags: ["Python", "Django", "PostgreSQL"],
      featured: false,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "InfraTech",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $160k",
      posted: "5 days ago",
      tags: ["AWS", "Docker", "Kubernetes"],
      featured: false,
    },
    {
      id: 5,
      title: "Mobile Developer (React Native)",
      company: "AppVentures",
      location: "Remote",
      type: "Full-time",
      salary: "$95k - $140k",
      posted: "1 week ago",
      tags: ["React Native", "iOS", "Android"],
      featured: false,
    },
    {
      id: 6,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$80k - $120k",
      posted: "4 days ago",
      tags: ["Figma", "UI Design", "Prototyping"],
      featured: false,
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-linear-to-br from-primary/5 via-background to-background p-8 sm:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Find Your Dream Job 🚀
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Discover amazing opportunities from top companies
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Job title, keywords, or company..."
                className="h-14 pl-12 rounded-xl border-border/50 bg-secondary/20 text-base"
              />
            </div>
            <div className="sm:w-64 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Location..."
                className="h-14 pl-12 rounded-xl border-border/50 bg-secondary/20 text-base"
              />
            </div>
            <Button className="h-14 px-8 rounded-xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20">
              Search Jobs
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                500+ Active Jobs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                200+ Companies
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                New jobs daily
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-yellow-500 to-yellow-500/40" />
            <h2 className="text-2xl font-bold text-foreground">
              Featured Jobs ⭐
            </h2>
          </div>
          <Button variant="ghost" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <article
              key={job.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {job.featured && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 border border-yellow-500/20">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500">
                      FEATURED
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Company & Title */}
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">
                      {job.company}
                    </span>
                  </div>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-secondary/40 px-3 py-1 text-xs font-semibold text-foreground border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">
                    Posted {job.posted}
                  </span>
                  <Button
                    size="sm"
                    className="rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-foreground">
            Don't see the perfect job? 🎯
          </h2>
          <p className="text-lg text-muted-foreground">
            Set up job alerts and we'll notify you when new opportunities match
            your skills and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="h-12 px-8 rounded-xl bg-primary font-bold shadow-lg shadow-primary/20">
              Create Job Alert
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 rounded-xl border-primary/30 hover:bg-primary/5"
            >
              Upload Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindJobs;
