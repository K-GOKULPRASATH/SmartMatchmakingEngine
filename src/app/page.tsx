import AppHeader from "@/components/header";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard />
      </main>
    </div>
  );
}
