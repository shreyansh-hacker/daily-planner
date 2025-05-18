import { DailyPlanner } from "@/components/daily-planner";
import { ThreeDBackground } from "@/components/3d-background";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <ThreeDBackground />
      <DailyPlanner />
    </main>
  );
}
