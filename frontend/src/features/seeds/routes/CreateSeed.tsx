import { createSeed } from '../api/createSeed';
import { findAllPlants, findAllPlantsQueryKey } from '../api/findAllPlants';
import { queryKey as findAllSeedsQueryKey } from '../api/findAllSeeds';
import CreateSeedForm from '../components/CreateSeedForm';
import { NewSeedDto } from '@/bindings/definitions';
import { SelectOption } from '@/components/Form/SelectMenu';
import PageTitle from '@/components/Header/PageTitle';
import SimpleModal from '@/components/Modals/SimpleModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateSeed() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [createSeedError, setCreateSeedError] = useState<unknown>();
  const [formTouched, setFormTouched] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [findAllPlantsQueryKey],
    queryFn: findAllPlants,
  });

  const createSeedMutation = useMutation({
    mutationFn: createSeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [findAllSeedsQueryKey] });
      navigate('/seeds');
    },
    onError: (error) => {
      setCreateSeedError(error);
    },
  });

  const onCancel = () => {
    // There is no need to show the cancel warning modal if the user
    // has not made any changes yet.
    if (!formTouched) {
      navigate('/seeds');
      return;
    }

    setShowCancelModal(!showCancelModal);
  };

  const onSubmit = async (newSeed: NewSeedDto) => {
    createSeedMutation.mutate(newSeed);
  };

  const onChange = () => {
    setFormTouched(true);
  };

  const plants: SelectOption[] =
    data?.map((plant) => ({ value: plant.id, label: plant.species })) ?? [];

  return (
    <div className="mx-auto w-full p-4 md:w-[900px]">
      <PageTitle title="Neuer Eintrag" />
      <CreateSeedForm
        plants={plants}
        onCancel={onCancel}
        onChange={onChange}
        onSubmit={onSubmit}
        isDisabled={isLoading || createSeedMutation.isLoading}
        isLoading={isLoading}
      />

      <SimpleModal
        title="Eintrag abbrechen"
        body="Änderungen, die Sie vorgenommen haben, werden nicht gespeichert. Wollen Sie wirklich abbrechen?"
        cancelBtnTitle="Nein"
        submitBtnTitle="Ja"
        show={showCancelModal}
        setShow={setShowCancelModal}
        onCancel={() => {
          setShowCancelModal(false);
        }}
        onSubmit={() => {
          navigate('/seeds');
        }}
      />
      <SimpleModal
        title="Fehler"
        body={`Ein Fehler ist aufgetreten: ${createSeedError}`}
        show={Boolean(createSeedError)}
        submitBtnTitle="Ok"
        onSubmit={() => {
          setCreateSeedError(undefined);
        }}
      />
    </div>
  );
}
