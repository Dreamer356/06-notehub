import { dehydrate, QueryClient } from '@tanstack/react-query';
import TanStackProvider from '../../components/TanStackProvider/TanStackProvider';
import NotesClient from './Notes.client';
import { fetchNotes } from '../../lib/api';

export default async function NotesPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery(['notes'], fetchNotes);
  const dehydratedState = dehydrate(qc);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NotesClient />
    </TanStackProvider>
  );
}
