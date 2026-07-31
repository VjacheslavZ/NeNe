import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateProfileInput,
  updateProfileSchema,
  UserProfile,
} from '@repo/trpc/schemas';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile;
  onSave: (updates: UpdateProfileInput) => void;
}

export function EditProfileModal({
  onSave,
  profile,
  open,
  onOpenChange,
}: EditProfileModalProps) {
  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile.name,
      bio: profile.bio || '',
      website: profile.website || '',
    },
  });

  useEffect(() => {
    form.reset({
      name: profile.name,
      bio: profile.bio || '',
      website: profile.website || '',
    });
  }, [profile, form]);

  const handleSubmit = (data: UpdateProfileInput) => {
    onSave(data);
    onOpenChange(false);
  };

  const bio = form.watch('bio');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 py-4"
        >
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  placeholder="Enter your name"
                  maxLength={50}
                />
                Message
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="bio"
            render={({ field }) => (
              <Field>
                <FieldLabel>Bio</FieldLabel>
                <Textarea
                  placeholder="Tell people about yourself..."
                  rows={4}
                  maxLength={150}
                  {...field}
                />
                <FieldDescription>
                  {bio?.length || 0}/150 characters
                </FieldDescription>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="website"
            render={({ field }) => (
              <Field>
                <FieldLabel>Website</FieldLabel>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  {...field}
                />
                <FieldDescription>
                  {bio?.length || 0}/150 characters
                </FieldDescription>
              </Field>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Save </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
