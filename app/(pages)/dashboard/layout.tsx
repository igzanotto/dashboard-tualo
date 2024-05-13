import SideNav from "@/components/dashboard/sidenav";
import ReportsTableDashboard from "@/components/dashboard/table-reports";
import { InvoicesTableSkeleton } from "@/components/skeletons";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export interface ReportsPageProps {
  params: {
    id: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Layout({ children, searchParams }: { children: React.ReactNode; searchParams?: ReportsPageProps["searchParams"]; }) {
  const supabase = createClient();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

const {
  data: { user },
} = await supabase.auth.getUser();

console.log(user);
if (!user) {
  return redirect("/login");
}
return (
  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="w-full flex-none md:w-64">
      <SideNav />
    </div>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <ReportsTableDashboard query={query} currentPage={currentPage}/>
      </Suspense>
      {children}
    </div>
  </div>
);
}
