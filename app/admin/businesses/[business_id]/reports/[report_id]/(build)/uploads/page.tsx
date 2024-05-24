import FileUpload from "@/components/admin/reports/file-uploads";


export default async function UploadFilePage({ params }: { params: any }) {
  const { business_id, report_id } = params;

  return (
    <main>
      <div className="mt-3">
       <FileUpload />

      </div>
    </main>
  );
}