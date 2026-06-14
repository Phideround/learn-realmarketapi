import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { SVGProps } from "react";

function XIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function BlueskyIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M5.6 3.2C8.5 5.4 11.6 9.7 12 12c.4-2.3 3.5-6.6 6.4-8.8C20.4 1.7 23 .6 23 3.5c0 .6-.3 4.8-.5 5.5-.7 2.4-3.1 3-5.3 2.6 3.8.7 4.8 2.8 2.7 5-3.9 4-5.6-1-6-2.3-.1-.2-.2-.3-.2-.2 0-.1-.1 0-.2.2-.5 1.3-2.2 6.3-6 2.3-2.1-2.2-1.1-4.3 2.7-5C8 11.9 5.6 11.4 4.9 9 4.7 8.3 4.4 4.1 4.4 3.5c0-2.9 2.6-1.8 4.6-.3z" />
    </svg>
  );
}
function ThreadsIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12.2 2C6.6 2 2.5 5.7 2.4 11.9c0 6.3 4.2 10.1 9.7 10.1 4.9 0 8.3-2.8 8.6-7 .2-3-1.5-5.3-4.6-6-.2-2.5-2-3.9-4.7-3.9-1.9 0-3.6.9-4.5 2.4l1.6 1.1c.6-1 1.7-1.6 2.9-1.6 1.6 0 2.7.8 2.9 2.3-.7-.1-1.4-.2-2.2-.1-3.2.2-5.1 1.8-5 4.1 0 2.3 1.9 3.8 4.5 3.6 2.7-.2 4.3-1.9 4.6-4.7 1.2.6 1.9 1.8 1.8 3.3-.2 2.9-2.7 5-6.4 5C7.7 20.5 4.4 17.4 4.4 12s3.3-8 7.8-8c4 0 6.7 2.3 7.4 6.2l1.9-.3C20.7 5 17.2 2 12.2 2zm-.5 11.1c1 0 1.8.2 2.6.5-.2 2.1-1.3 3.2-3.1 3.3-1.5.1-2.5-.7-2.5-1.8 0-1.1 1-1.9 3-2z" />
    </svg>
  );
}

export const socials = [
  { name: "X / Twitter", href: "https://x.com/realmarketapi", Icon: XIcon },
  { name: "Facebook", href: "https://www.facebook.com/realmarketapi", Icon: Facebook },
  { name: "Bluesky", href: "https://bsky.app/profile/realmarketapi.bsky.social", Icon: BlueskyIcon },
  { name: "Threads", href: "https://www.threads.com/@realmarketapi2026", Icon: ThreadsIcon },
  { name: "Instagram", href: "https://www.instagram.com/realmarketapi2026/", Icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/pham-trung-phi-thanh", Icon: Linkedin },
];
