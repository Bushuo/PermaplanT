import { findAllSeeds } from '../api/findAllSeeds';
import SimpleModal from '@/components/Modals/SimpleModal';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const ViewSeeds = () => {
  const { data, isError, refetch } = useQuery({ queryKey: ['seeds'], queryFn: findAllSeeds });

  return (
    <div>
      <h1>Seeds</h1>
      <ul>
        {data?.map((seed) => (
          <li key={seed.id}>{seed.name}</li>
        ))}
      </ul>
      <div className="w-[200px]">
        <Link
          to="/seeds/new"
          className="text-blue-600 underline visited:text-blue-600 hover:text-blue-800"
        >
          Neuer Eintrag
        </Link>
      </div>

      <SimpleModal
        title="Error"
        body="Seeds could not be loaded"
        show={isError}
        onSubmit={refetch}
        submitBtnTitle="Ok"
      />
    </div>
  );
};
