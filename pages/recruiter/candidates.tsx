import { RecruiterLayout } from "@/components/layout/RecruiterLayout";
import CandidatesList from "@/pages/recruiter/CandidatesList";

export default function RecruiterCandidatesRoute() {
  return (
    <RecruiterLayout>
      <CandidatesList />
    </RecruiterLayout>
  );
}
