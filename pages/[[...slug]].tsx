import dynamic from "next/dynamic";

const ClientOnlyApp = dynamic(() => import("../src/App"), {
  ssr: false,
});

export default function CatchAllPage() {
  return <ClientOnlyApp />;
}
