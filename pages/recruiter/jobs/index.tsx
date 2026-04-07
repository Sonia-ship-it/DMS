import { RecruiterLayout } from "@/components/layout/RecruiterLayout";
import JobsList from "@/pages/recruiter/JobsList";

export default function RecruiterJobsRoute() {
  return (
    <RecruiterLayout>
      <JobsList />
    </RecruiterLayout>
  );
}
