import Movements from '@/components/movements/movements';

interface MovementsPageProps {
  params: {
    business_id: string;
  };
};


export default function MovementsPage({ params }: MovementsPageProps) {
  const { business_id } = params;

  return (
    <Movements params={{business_id}}/>
  );
}
