"use client"
import { notFound } from 'next/navigation';
import { NewUserPage } from './new-user-page';
import { EditUserPage } from './edit-user-page';
import { ViewUserPage } from './view-user-page';

type ViewPageProps = {
  userId: string;
  edit?: boolean;
};

export default  function UserViewPage({
  userId,
  edit = false
}: ViewPageProps) {
  let user = null;

  if (userId !== 'new') {
    // if (!userId) {
    //   notFound();
    // }
    if (edit) {
      return <EditUserPage id={userId} />
    }
    return <ViewUserPage id={userId} />
  }

  return <NewUserPage />

}
