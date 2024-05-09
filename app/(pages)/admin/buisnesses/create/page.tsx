
import AddBuisnessForm from '@/components/admin/create_buisness-form';
 
export default async function Page() {
 
  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/admin/buisnesses' },
          {
            label: 'Create Invoice',
            href: '/admin/buisnesses/create',
            active: true,
          },
        ]}
      /> */}
      <AddBuisnessForm/>
    </main>
  );
}