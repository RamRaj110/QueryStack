"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  User,
  MapPin,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UpdateProfileSchema, UpdateProfileSchemaType } from "@/lib/validation";
import { updateProfile } from "@/lib/actions/user.action";
import { IUser } from "@/database/user.modules";
import UserAvatar from "@/components/UserAvtar";
import ROUTES from "@/constant/route";
import { useState, useRef } from "react";

interface EditProfileFormProps {
  user: IUser;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      image: user.image || "",
      location: user.location || "",
      portfolio: user.portfolio || "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const watchedImage = form.watch("image");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedImage(base64String);
        form.setValue("image", base64String);
        toast.success("Image uploaded successfully!");
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast.error("Failed to read image file");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to upload image");
      setIsUploading(false);
    }
  };

  const handleRemoveUploadedImage = () => {
    setUploadedImage(null);
    form.setValue("image", user.image);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (data: UpdateProfileSchemaType) => {
    const result = await updateProfile(data);

    if (result?.success) {
      toast.success("Profile updated successfully!");
      router.refresh(); // Force refresh to update session/navbar
      router.push(ROUTES.PROFILE(user._id));
    } else {
      toast.error(result?.error?.message || "Failed to update profile");
    }
  };

  const displayImage = uploadedImage || watchedImage || user.image;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Profile Image Preview */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative">
            <div className="relative rounded-full border-4 border-background p-1.5 shadow-xl ring-2 ring-primary/20">
              <UserAvatar
                id={user._id}
                name={form.watch("name") || user.name}
                imageUrl={displayImage}
                className="h-28 w-28"
                fallbackClassName="text-3xl font-bold bg-linear-to-br from-primary to-primary/60 text-primary-foreground"
              />
            </div>
            {uploadedImage && (
              <button
                type="button"
                onClick={handleRemoveUploadedImage}
                className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-110"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground">
              Profile Picture
            </h2>
            <p className="text-sm text-muted-foreground">
              Upload an image from your device or enter an image URL
            </p>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="profile-image-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-12 rounded-xl border-dashed border-2 border-primary/30 bg-primary/5 font-semibold text-primary transition-[border-color,background-color] duration-300 hover:bg-primary/10 hover:border-primary/50"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload size={18} />
                Upload Image from Device
              </span>
            )}
          </Button>
          <div className="relative flex items-center gap-4">
            <div className="flex-1 border-t border-border/40" />
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Or
            </span>
            <div className="flex-1 border-t border-border/40" />
          </div>
        </div>

        {/* Image URL Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ImageIcon size={16} className="text-primary" />
                Profile Image URL
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/your-image.jpg"
                  className="h-11 rounded-xl border-border/50 bg-secondary/20 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                  {...field}
                  value={uploadedImage || field.value}
                  onChange={(e) => {
                    setUploadedImage(null);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground">
                Enter a direct link to your profile image
              </FormDescription>
              <FormMessage className="text-destructive text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User size={16} className="text-primary" />
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  className="h-11 rounded-xl border-border/50 bg-secondary/20 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Username Field (Read-only) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="text-primary font-bold">@</span>
            Username
          </label>
          <Input
            value={user.username}
            disabled
            className="h-11 rounded-xl border-border/30 bg-muted/30 text-base text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            Username cannot be changed
          </p>
        </div>

        {/* Email Field (Read-only) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="text-muted-foreground">✉️</span>
            Email Address
          </label>
          <Input
            value={user.email}
            disabled
            className="h-11 rounded-xl border-border/30 bg-muted/30 text-base text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        {/* Bio Field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileText size={16} className="text-primary" />
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself..."
                  className="min-h-[120px] rounded-xl border-border/50 bg-secondary/20 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground">
                {field.value?.length || 0}/300 characters
              </FormDescription>
              <FormMessage className="text-destructive text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <MapPin size={16} className="text-primary" />
                Location
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="City, Country"
                  className="h-11 rounded-xl border-border/50 bg-secondary/20 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Portfolio Field */}
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <LinkIcon size={16} className="text-primary" />
                Portfolio Website
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://yourportfolio.com"
                  className="h-11 rounded-xl border-border/50 bg-secondary/20 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="min-h-[46px] rounded-xl border-border/50 font-semibold transition-[border-color,background-color] duration-300 hover:bg-secondary/50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="min-h-[46px] min-w-[140px] rounded-xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-[background-color,box-shadow,transform] duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
