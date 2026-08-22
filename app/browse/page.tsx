import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

type FoundItem = {
  id: string;
  category: string;
  description: string;
  photo_urls: string[];
  location_text: string;
  found_at: string;
  status: string;
};

type LostItem = {
  id: string;
  category: string;
  description: string;
  photo_urls: string[];
  location_text: string;
  lost_at: string;
  reward: string | null;
  status: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = searchParams.type === 'lost' ? 'lost' : 'found';
  const supabase = createClient();

  const { data: foundItems } = await supabase
    .from('found_items')
    .select('id, category, description, photo_urls, location_text, found_at, status')
    .order('created_at', { ascending: false });

  const { data: lostItems } = await supabase
    .from('lost_items')
    .select('id, category, description, photo_urls, location_text, lost_at, reward, status')
    .order('created_at', { ascending: false });

  const items = type === 'found' ? (foundItems as FoundItem[]) : (lostItems as LostItem[]);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="font-tag text-xs uppercase tracking-widest text-ink/50 hover:text-ink">
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mt-6 mb-8 flex-wrap gap-4">
          <h1 className="font-display font-bold text-3xl">Browse items</h1>

          <div className="flex rounded-sm border-2 border-ink/15 overflow-hidden font-tag text-xs uppercase tracking-wide">
            <Link
              href="/browse?type=found"
              className={`px-4 py-2 transition-colors ${
                type === 'found' ? 'bg-teal text-cream' : 'bg-cream text-ink/60 hover:bg-paper'
              }`}
            >
              Found
            </Link>
            <Link
              href="/browse?type=lost"
              className={`px-4 py-2 transition-colors ${
                type === 'lost' ? 'bg-brick text-cream' : 'bg-cream text-ink/60 hover:bg-paper'
              }`}
            >
              Lost
            </Link>
          </div>
        </div>

        {(!items || items.length === 0) && (
          <div className="text-center py-24">
            <span className="font-tag text-xs tracking-widest uppercase text-brass">
              Nothing here yet
            </span>
            <h2 className="font-display font-bold text-2xl mt-3">
              No {type} items posted
            </h2>
            <p className="font-body text-ink/60 mt-2">
              Be the first — <Link href={type === 'found' ? '/post/found' : '/post/lost'} className="text-teal underline underline-offset-2">
                report a {type === 'found' ? 'find' : 'loss'}
              </Link>.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item) => {
            const dateLabel =
              type === 'found'
                ? formatDate((item as FoundItem).found_at)
                : formatDate((item as LostItem).lost_at);
            const accent = type === 'found' ? 'bg-teal' : 'bg-brick';

            return (
              <div
                key={item.id}
                className="bg-cream border-2 border-ink/15 rounded-sm overflow-hidden shadow-[0_4px_0_rgba(35,38,32,0.12)]"
              >
                <div className="relative aspect-[4/3] bg-paper">
                  {item.photo_urls && item.photo_urls.length > 0 ? (
                    <Image
                      src={item.photo_urls[0]}
                      alt={item.category}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-tag text-xs uppercase tracking-widest text-ink/30">
                        No photo
                      </span>
                    </div>
                  )}
                  <span
                    className={`absolute top-2 left-2 ${accent} text-cream font-tag text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm`}
                  >
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <p className="font-body text-sm text-ink/90 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="font-tag text-xs text-ink/50 uppercase tracking-wide mt-3">
                    {item.location_text}
                  </p>
                  <p className="font-tag text-xs text-ink/40 uppercase tracking-wide mt-1">
                    {dateLabel}
                  </p>
                  {type === 'lost' && (item as LostItem).reward && (
                    <p className="font-body text-xs text-brass mt-2">
                      Reward: {(item as LostItem).reward}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
