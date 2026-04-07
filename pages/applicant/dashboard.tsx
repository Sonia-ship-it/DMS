import { ApplicantShell } from "@/components/layout/ApplicantShell";
import ApplicantDashboardPage from "@/pages/applicant/ApplicantDashboardPage";

export default function ApplicantDashboardRoute() {
  return (
    <ApplicantShell>
      <ApplicantDashboardPage />
    </ApplicantShell>
  );
}
