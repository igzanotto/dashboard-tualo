'use client';

import { fetchBankAccountsByBusinessId, fetchBusinessById, fetchDocumentsByBankId } from '@/lib/data';
import { EventHandler, useEffect, useRef, useState } from 'react';
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
import { EventEmitter } from 'stream';
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
    bank_id:string;
    pdf:string
}

export default function MovementsPage({ params }: MovementsPageProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [document, setDocument] = useState<Document[] | null>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const business = await fetchBusinessById(params.business_id);
        const bankAccounts = await fetchBankAccountsByBusinessId(params.business_id);
        setBusiness(business);
        setBankAccounts(bankAccounts);
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
      const updatedBankAccounts = await fetchBankAccountsByBusinessId(
        params.business_id,
      );
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

  return (
    <div>
      {business && (
        <div className='flex justify-between'>
          <h1 className='font-medium text-2xl text-[#003E52]'>{business.name}</h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setDialogOpen(true)} className='bg-[#ec7700] flex items-center gap-2 text-white hover:bg-[#ec7700]/80 hover:text-white'>
                <AddIcon/>
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

      <div className="flex items-center flex-wrap gap-10 mt-12">
        {bankAccounts.map((account) => (
          <div
            key={account.id}
            className="flex h-[180px] w-[300px] flex-col justify-center gap-5 rounded-xl bg-[#252525]/10 p-4"
          >
            <Link href={`/dashboard/movements/${business?.id}/${account.id}`}>
                <h3 className="text-lg font-medium text-center">{account.name}</h3>
            </Link>
            <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className='bg-[#ec7700] flex items-center gap-2 text-white hover:bg-[#ec7700]/80 hover:text-white'>
                <AddIcon/>
                Agregar movimiento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mb-5">
                <DialogTitle>Agregar movimiento en {account.name}</DialogTitle>
              </DialogHeader>
              <div>
              <form action={uploadPDF} className="flex flex-col justify-between">
              <input
                type="hidden"
                name="business_id"
                value={params.business_id}
              />
              <input type="hidden" name="id" value={account.id} />
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
                <div className="my-2 text-sm text-gray-600 text-center">
                  {selectedFileName}
                </div>
              )}
              <Button type="submit" className="w-full rounded-xl bg-[#003E52] mt-4">
                Guardar archivo
              </Button>
            </form>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
