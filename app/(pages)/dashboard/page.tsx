import ChartSection from "@/components/Dashboard/Chart";
import Chat from "@/components/Dashboard/Chat";
import Menu from "@/components/Dashboard/Menu";
import Overview from "@/components/Dashboard/Overview";

export default function Page() {
  return (
    <main className="container mx-auto flex min-h-screen gap-4 px-6 md:px-0">
      <div className="mx-auto w-full space-y-8 pt-24 pb-12">
        <Overview />
        <ChartSection />
        <Menu />
      </div>

      <Chat />
    </main>
  );
}
