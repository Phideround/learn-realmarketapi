import {
  BookOpen,
  Compass,
  Wrench,
  AlertTriangle,
  ArrowRight,
  Database,
  Cpu,
  Sigma,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

const map: { test: RegExp; Icon: LucideIcon }[] = [
  { test: /^what is/i, Icon: BookOpen },
  { test: /why it matters/i, Icon: Compass },
  { test: /how to apply/i, Icon: Wrench },
  { test: /common mistakes/i, Icon: AlertTriangle },
  { test: /where to go next/i, Icon: ArrowRight },
  { test: /real market data|working with/i, Icon: Database },
  { test: /working system|theory to/i, Icon: Cpu },
  { test: /math behind/i, Icon: Sigma },
  { test: /faq|frequently/i, Icon: HelpCircle },
];

export function SectionIcon({ heading, className }: { heading: string; className?: string }) {
  const match = map.find((m) => m.test.test(heading));
  const Icon = match?.Icon ?? BookOpen;
  return <Icon className={className} aria-hidden />;
}
