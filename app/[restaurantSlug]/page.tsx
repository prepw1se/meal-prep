export default async function Page({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const { restaurantSlug } = await params;
  return <div>Customer page for: {restaurantSlug}</div>;
}
