import Storefront from "../storefront";

export default async function RoutedPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return <Storefront initialPath={`/${path.join("/")}`} />;
}
