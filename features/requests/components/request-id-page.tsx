"use client"
import { notFound } from 'next/navigation';
import { EditRequestPage } from './edit-request-page';
import { NewAssignmentRequestPage } from '../../../modules/tickets/ui/components/form/form-card';

type ViewPageProps = {
  requestId: string;
  edit?: boolean;
};

export default  function RequestIdPage({
  requestId,
  edit = false
}: ViewPageProps) {
  let user = null;

  // if (requestId !== 'new') {
  //   // if (!userId) {
  //   //   notFound();
  //   // }
  //   if (edit) {
  //     return <EditRequestPage id={userId} />
  //   }
  //   return <ViewUserPage id={userId} />
  // }

  return <NewAssignmentRequestPage />

}
