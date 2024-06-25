import Movements from '@/components/movements/movements';

interface MyBusinessPageProps {
  params: {
    business_id: string;
  };
};


export default function MyBusinessPage({ params }: MyBusinessPageProps) {
  const { business_id } = params;


  return (
    <h1>business</h1>
  );
}
