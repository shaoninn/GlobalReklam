import { HomePageView } from "@/components/home/HomePageView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  return <HomePageView />;
}
