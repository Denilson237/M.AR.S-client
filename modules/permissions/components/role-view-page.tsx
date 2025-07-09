"use client"
import { notFound } from 'next/navigation';
import { EditRolePage } from './edit-role-page';
import { ViewRolePage } from './view-role-page';
import { NewRolePage } from './new-role-page';

type ViewPageProps = {
  roleId: string;
  edit?: boolean;
};

export default  function RoleViewPage({
  roleId,
  edit = false
}: ViewPageProps) {
  let user = null;

  if (roleId !== 'new') {
    // if (!userId) {
    //   notFound();
    // }
    if (edit) {
      return <EditRolePage id={roleId} />
    }
    return <ViewRolePage id={roleId} />
  }

  return <NewRolePage />

}
