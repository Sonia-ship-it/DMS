import { DisciplineLayout } from "@/components/layout/DisciplineLayout";
import RecordsList from "@/pages/discipline/RecordsList";

export default function DisciplineRecordsRoute() {
  return (
    <DisciplineLayout>
      <RecordsList />
    </DisciplineLayout>
  );
}
