
import AddCompanyForm from '@/components/admin/form-companies';
 
export default async function Page() {
 
  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/admin/negocios' },
          {
            label: 'Create Invoice',
            href: '/admin/negocios/create',
            active: true,
          },
        ]}
      /> */}
      <AddCompanyForm/>
    </main>
  );
}