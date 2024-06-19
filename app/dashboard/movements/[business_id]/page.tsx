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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { addBank, uploadPDF } from '@/lib/actions';
import { toast } from 'sonner';
import PdfIcon from '@/components/icons/PdfIcon';
import AddIcon from '@/components/icons/AddIcon';
import Link from 'next/link';
import SelectBank from '@/components/select-bank';
import AfirmeIcon from '@/components/icons/AfirmeIcon';
import AlboIcon from '@/components/icons/AlboIcon';
import AztecaIcon from '@/components/icons/AztecaIcon';
import BajioIcon from '@/components/icons/BajioIcon';
import BanamexIcon from '@/components/icons/BanamexIcon';
import BanorteIcon from '@/components/icons/BanorteIcon';
import BxIcon from '@/components/icons/BxIcon';
import BroxelIcon from '@/components/icons/BroxelIcon';
import ClaraIcon from '@/components/icons/ClaraIcon';
import FondeadoraIcon from '@/components/icons/FondeadoraIcon';
import HeyBancoIcon from '@/components/icons/HeyBancoIcon';
import HsbcIcon from '@/components/icons/HsbcIcon';
import IbursaIcon from '@/components/icons/IbursaIcon';
import IntercamIcon from '@/components/icons/IntercamIcon';
import RappiIcon from '@/components/icons/RappiIcon';
import SantanderIcon from '@/components/icons/SantanderIcon';
import ScotiaIcon from '@/components/icons/ScotiaIcon';
import AmexIcon from '@/components/icons/AmexIcon';
import BanRegioIcon from '@/components/icons/BanRegioIcon';
import BbbvaIcon from '@/components/icons/BbbvaIcon';

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
  const [pdfDialogOpen, setPdfDialogOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedBankName, setSelectedBankName] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const business = await fetchBusinessById(params.business_id);
        const bankAccounts = await fetchBankAccountsByBusinessId(
          params.business_id,
        );

        const documentsByBankId: { [key: string]: Document[] } = {};
        for (const account of bankAccounts) {
          const documents = await fetchDocumentsByBankId(account.id);
          documentsByBankId[account.id] = documents.map((doc) => ({
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

  const handleSelectBank = (name:string) => {
    setSelectedBankName(name)
  }

  return (
    <div>
      {business && (
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium text-[#003E52]">
            {business.name}
          </h1>
        </div>
      )}

      <div className="mt-12 flex flex-col gap-10">
        {bankAccounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between lg:gap-10 max-lg:flex-col max-lg:justify-center gap-5"
          >
            <div className="flex h-[180px] w-[250px] max-lg:w-[90%] flex-col justify-center gap-5 rounded-xl bg-[#252525]/10 p-2">
              <Link href={`/dashboard/movements/${business?.id}/${account.id}`} className='flex items-center gap-2 justify-center'>
              {account.name === "afirme" ? (
                <AfirmeIcon/>
              ) : account.name === "amex" ? (
                <AmexIcon/>
              ) : account.name === "albo" ? (
                <AlboIcon/>
              ) : account.name === "azteca" ? (
                <AztecaIcon/>
              ) : account.name === "BanBajío" ? (
                <BajioIcon/>
              ) : account.name === "banamex" ? (
                <BanamexIcon/>
              ) : account.name === "banorte" ? (
                <BanorteIcon/>
              ) : account.name === "BanRegio" ? (
                <BanRegioIcon/>
              ) : account.name === "BBVA bancomer" ? (
                <BbbvaIcon/>
              ) : account.name === "broxel" ? (
                <BroxelIcon/>
              ) : account.name === "bx+" ? (
                <BxIcon/>
              ) : account.name === "clara" ? (
                <ClaraIcon/>
              ) : account.name === "fondeadora" ? (
                <FondeadoraIcon/>
              ) : account.name === "hey banco" ? (
                <HeyBancoIcon/>
              ) : account.name === "HSBC" ? (
                <HsbcIcon/>
              ) : account.name === "inbursa" ? (
                <IbursaIcon/>
              ) : account.name === "intercam" ? (
                <IntercamIcon/>
              ) : account.name === "rappi" ? (
                <RappiIcon/>
              ) : account.name === "santander" ? (
                <SantanderIcon/>
              ) : account.name === "scotia" ? (
                <ScotiaIcon/>
              ) : null
              
            }
                <p className="text-center text-lg font-semibold capitalize">
                  {account.name}
                </p>
              </Link>
              <div className="lg:hidden flex justify-center">
                <Dialog
                  open={pdfDialogOpen[account.id] || false}
                  onOpenChange={(isOpen) =>
                    setPdfDialogOpen((prevOpen) => ({
                      ...prevOpen,
                      [account.id]: isOpen,
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex gap-2 bg-[#ec7700] text-base font-medium text-white hover:bg-[#ec7700]/80 hover:text-white"
                      onClick={() =>
                        setPdfDialogOpen((prevOpen) => ({
                          ...prevOpen,
                          [account.id]: true,
                        }))
                      }
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
            </div>
            <div className="ml-[5%] flex items-center gap-3 max-lg:w-[90%] max-lg:mx-auto">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  <>
                    {documents ? (
                      documents[account.id]?.map((doc) => (
                        <CarouselItem
                          key={doc.bank_id}
                          className={`pl-1 ${
                            documents[account.id].length < 2
                              ? 'flex-1'
                              : 'md:basis-1/2 lg:basis-1/3'
                          }`}
                        >
                          <div
                            key={doc.id}
                            className="flex flex-col gap-2 rounded-lg bg-[#252525]/10 p-3"
                          >
                            <span>
                              Fecha de cierre:{' '}
                              {new Date(doc.closing).toLocaleDateString()}
                            </span>
                            <Link href={doc.pdf} target="_blank">
                              <Button
                                variant="link"
                                className="text-blue-600 underline"
                              >
                                Ver PDF
                              </Button>
                            </Link>
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      <p>No hay movimientos en este banco.</p>
                    )}
                  </>
                </CarouselContent>
                {documents[account.id]?.length == 0 ? (
                  <p>No hay movimientos creados para este banco.</p>
                ) : (
                  <div className='max-md:hidden'>
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                )}
              </Carousel>
            </div>
            <div className="ml-[5%] max-lg:hidden">
              <Dialog
                open={pdfDialogOpen[account.id] || false}
                onOpenChange={(isOpen) =>
                  setPdfDialogOpen((prevOpen) => ({
                    ...prevOpen,
                    [account.id]: isOpen,
                  }))
                }
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex gap-2 bg-[#ec7700] text-base font-medium text-white hover:bg-[#ec7700]/80 hover:text-white"
                    onClick={() =>
                      setPdfDialogOpen((prevOpen) => ({
                        ...prevOpen,
                        [account.id]: true,
                      }))
                    }
                  >
                    <AddIcon />
                    Agregar
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
          </div>
        ))}
      </div>

      <div className="mt-[3%]">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(true)}
              className="flex h-[60px] w-[300px] items-center gap-2 bg-[#ec7700] text-base font-medium text-white hover:bg-[#ec7700]/80 hover:text-white"
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
                <SelectBank onSelect={handleSelectBank}/>
                <input type="hidden" name="name" value={selectedBankName} />
                {/* <input
                  required
                  className="w-full rounded-xl bg-[#151515]/10 p-2"
                  placeholder="Santander río"
                  type="text"
                  name="name"
                /> */}
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
    </div>
  );
}
