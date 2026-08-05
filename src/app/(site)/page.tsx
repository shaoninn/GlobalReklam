import { HomePageView } from "@/components/home/HomePageView";

export const revalidate = 60;

export default async function HomePage() {
  return <HomePageView />;
}
