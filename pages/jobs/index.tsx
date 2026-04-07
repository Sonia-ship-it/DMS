import { ApplicantShell } from "@/components/layout/ApplicantShell";
import JobBoardPage from "@/pages/jobs/JobBoardPage";

export default function JobsPage() {
  return (
    <ApplicantShell>
      <JobBoardPage />
    </ApplicantShell>
  );
}
