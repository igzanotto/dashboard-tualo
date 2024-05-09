
import AddCompanyForm from '@/components/admin/form-companies';
 
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
      <AddCompanyForm/>
    </main>
  );
}