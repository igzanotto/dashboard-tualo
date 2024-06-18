'use client';

import {
  fetchBankAccountsByBusinessId,
  fetchBusinessById,
  fetchDocumentsByBankId,
} from '@/lib/data';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog-banks';
import { addBank, uploadPDF } from '@/lib/actions';
import { toast } from 'sonner';
import PdfIcon from '@/components/icons/PdfIcon';
import AddIcon from '@/components/icons/AddIcon';
import Link from 'next/link';

type MovementsPageProps = {
  params: {
    business_id: string;
  };
};

type Business = {
  id: string;
  name: string;
};

type BankAccount = {
  id: string;
  business_id: string;
  name: string;
};

type Document = {
  id: string;
  closing: Date;
  bank_id: string;
  pdf: string;
};

export default function MovementsPage({ params }: MovementsPageProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [documents, setDocuments] = useState<{ [key: string]: Document[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState<{ [key: string]: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const business = await fetchBusinessById(params.business_id);
        const bankAccounts = await fetchBankAccountsByBusinessId(params.business_id);

        const documentsByBankId: { [key: string]: Document[] } = {};
        for (const account of bankAccounts) {
          const documents = await fetchDocumentsByBankId(account.id);
          documentsByBankId[account.id] = documents.map(doc => ({
            ...doc,
            closing: new Date(doc.closing), // Convertir la fecha a un objeto Date
          }));
        }

        setBusiness({ ...business }); // Asegúrate de pasar un objeto simple
        setBankAccounts([...bankAccounts]); // Asegúrate de pasar un array simple
        setDocuments({ ...documentsByBankId }); // Asegúrate de pasar un objeto simple
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.business_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const bank_account = formData.get('name') as string;

    try {
      await addBank(params.business_id, bank_account);
      toast.success('Banco creado exitosamente');
      setDialogOpen(false); // Cierra el diálogo al enviar correctamente
      if (formRef.current) {
        formRef.current.reset(); // Resetea el formulario
      }
      const updatedBankAccounts = await fetchBankAccountsByBusinessId(params.business_id);
      setBankAccounts(updatedBankAccounts);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName('');
    }
  };

  const handleUploadPDF = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accountId = formData.get('id') as string;

    try {
      const response = await uploadPDF(formData);

      if (response.error) {
        toast.error(response.error.message);
      } else {
        toast.success('Movimiento creado exitosamente');
        const updatedDocuments = await fetchDocumentsByBankId(accountId);
        setDocuments((prevDocuments) => ({
          ...prevDocuments,
          [accountId]: updatedDocuments,
        }));
        setPdfDialogOpen((prevOpen) => ({
          ...prevOpen,
          [accountId]: false,
        }));
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      {business && (
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium text-[#003E52]">
            {business.name}
          </h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(true)}
                className="flex items-center gap-2 bg-[#ec7700] text-white hover:bg-[#ec7700]/80 hover:text-white"
              >
                <AddIcon />
                Añadir banco
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mb-5">
                <DialogTitle>Añadir banco</DialogTitle>
              </DialogHeader>
              <div>
                <form onSubmit={handleSubmit} ref={formRef}>
                  <input
                    type="hidden"
                    name="business_id"
                    value={params.business_id}
                  />
                  <input
                    required
                    className="w-full rounded-xl bg-[#151515]/10 p-2"
                    placeholder="Santander río"
                    type="text"
                    name="name"
                  />
                  <Button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-[#003E52]"
                  >
                    Guardar banco
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="mt-12 flex flex-col gap-10">
        {bankAccounts.map((account) => (
          <div key={account.id} className='flex items-center gap-3'>
            <div className="flex h-[180px] w-[300px] flex-col justify-center gap-5 rounded-xl bg-[#252525]/10 p-4">
              <Link href={`/dashboard/movements/${business?.id}/${account.id}`}>
                <h3 className="text-center text-lg font-medium">
                  {account.name}
                </h3>
              </Link>
              <Dialog open={pdfDialogOpen[account.id] || false} onOpenChange={(isOpen) => setPdfDialogOpen((prevOpen) => ({ ...prevOpen, [account.id]: isOpen }))}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-[#ec7700] text-white hover:bg-[#ec7700]/80 hover:text-white"
                    onClick={() => setPdfDialogOpen((prevOpen) => ({ ...prevOpen, [account.id]: true }))}
                  >
                    <AddIcon />
                    Agregar movimiento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className="mb-5">
                    <DialogTitle>
                      Agregar movimiento en {account.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div>
                    <form
                      onSubmit={handleUploadPDF}
                      className="flex flex-col justify-between gap-4"
                    >
                      <input
                        type="hidden"
                        name="business_id"
                        value={params.business_id}
                      />
                      <input type="hidden" name="id" value={account.id} />
                      <div className="flex flex-col gap-2">
                        <label>Fecha de cierre</label>
                        <input
                          type="date"
                          name="closing"
                          className="rounded-lg bg-[#252525]/10 p-2"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Movimiento</label>
                        <label
                          htmlFor="pdfUpload"
                          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#252525]/10 p-2"
                        >
                          <PdfIcon />
                          <span>Seleccionar archivo PDF</span>
                          <input
                            id="pdfUpload"
                            type="file"
                            name="pdf"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            required
                            className="hidden"
                          />
                        </label>
                        {selectedFileName && (
                          <div className="my-2 text-center text-sm text-gray-600">
                            {selectedFileName}
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-[#003E52]"
                      >
                        Guardar archivo
                      </Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className='flex items-center gap-3'>
              {documents[account.id]?.map((doc) => (
                <div key={doc.id} className="flex flex-col gap-2 bg-[#252525]/10 p-3 rounded-lg">
                  <span>
                    Fecha de cierre:{' '}
                    {new Date(doc.closing).toLocaleDateString()}
                  </span>
                  <Link href={doc.pdf} target="_blank">
                    <Button variant="link" className="text-blue-600 underline">
                      Ver PDF
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
