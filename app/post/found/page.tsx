'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = [
  'Wallet',
  'Keys',
  'Phone',
  'Bag',
  'ID / Documents',
  'Jewelry',
  'Electronics',
  'Pet',
  'Other',
];

export default function ReportFoundPage() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [locationText, setLocationText] = useState('');
  const [foundAt, setFoundAt] = useState('');
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files).slice(0, 4));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError('You need to be logged in to post a found item.');
      setLoading(false);
      return;
    }

    // Upload photos first
    const photoUrls: string[] = [];
    for (const file of photos) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('item-photos')
        .upload(filePath, file);

      if (uploadError) {
        setError(`Photo upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('item-photos')
        .getPublicUrl(filePath);

      photoUrls.push(publicUrlData.publicUrl);
    }

    const { error: insertError } = await supabase.from('found_items').insert({
      finder_id: user.id,
      category,
      description,
      photo_urls: photoUrls,
      location_text: locationText,
      found_at: new Date(foundAt).toISOString(),
      verification_question: verificationQuestion || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push('/browse');
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="font-tag text-xs uppercase tracking-widest text-ink/50 hover:text-ink">
          ← Back to home
        </Link>

        <div className="bg-teal text-cream rounded-sm p-8 mt-6 shadow-[0_6px_0_rgba(35,38,32,0.15)]">
          <span className="font-tag text-xs tracking-[0.2em] uppercase text-cream/70">
            Stub A · No. 001
          </span>
          <h1 className="font-display font-bold text-3xl mt-2">
            Report a find
          </h1>
          <p className="font-body text-cream/85 mt-2">
            Post the details. We'll hold one identifying detail back so only the
            true owner can confirm it's theirs.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cream border-2 border-ink/15 rounded-sm p-8 mt-6 space-y-5"
        >
          <div>
            <label className="font-body text-sm text-ink/70 block mb-1">
              Category
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-body text-sm text-ink/70 block mb-1">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Color, brand, distinguishing marks…"
              className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
            />
          </div>

          <div>
            <label className="font-body text-sm text-ink/70 block mb-1">
              Where you found it
            </label>
            <input
              type="text"
              required
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="e.g. Library, 2nd floor near the elevators"
              className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
            />
          </div>

          <div>
            <label className="font-body text-sm text-ink/70 block mb-1">
              When you found it
            </label>
            <input
              type="datetime-local"
              required
              value={foundAt}
              onChange={(e) => setFoundAt(e.target.value)}
              className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
            />
          </div>

          <div>
            <label className="font-body text-sm text-ink/70 block mb-1">
              Verification question <span className="text-ink/40">(optional)</span>
            </label>
            <input
              type="text"
              value={verificationQuestion}
              onChange={(e) => setVerificationQuestion(e.target.value)}
              placeholder="e.g. What's inside the front pocket?"
              className="w-full border-2 border-ink/15 rounded-sm px-3 py-2 font-body bg-paper focus:outline-none focus:border-teal"
            />
            <p className="font-body text-xs text-ink/50 mt-1">
              Something only the true owner would know. Keep the answer out of your description.
            </p>
          </div>

          <div>
            <label className="font-body text-sm text-ink/70 block mb-1">
              Photos <span className="text-ink/40">(up to 4)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="w-full font-body text-sm"
            />
            {photos.length > 0 && (
              <p className="font-body text-xs text-ink/50 mt-1">
                {photos.length} photo{photos.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {error && <p className="text-brick text-sm font-body">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-cream font-tag text-sm uppercase tracking-wide py-3 rounded-sm hover:bg-teal transition-colors disabled:opacity-50"
          >
            {loading ? 'Posting…' : 'Post found item'}
          </button>
        </form>
      </div>
    </main>
  );
}
