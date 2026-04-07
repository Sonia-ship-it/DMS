import { ApplicantShell } from "@/components/layout/ApplicantShell";
import JobDetailPage from "@/pages/jobs/JobDetailPage";

export default function JobDetailRoute() {
  return (
    <ApplicantShell>
      <JobDetailPage />
    </ApplicantShell>
  );
}
