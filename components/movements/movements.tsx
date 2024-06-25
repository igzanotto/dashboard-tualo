'use client';

import getReportsByLastMovements, {
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addBank, updateBank, updateMovement, uploadPDF } from '@/lib/actions';
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
import SelectAccount from '@/components/select-account';
import SelectClosingType from '@/components/select-closing-type';
import SelectClosingMonth from '@/components/select-closing-month';
import { translateMonths } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletonMovementsMobile from '@/components/skeleton-movements-mobile';
import SkeletonMovements from '@/components/skeleton-movement';
import OtroBankIcon from '@/components/icons/OtroBankIcon';
import {
  BuildingLibraryIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import Attachment from '@/components/icons/Attachment';
import { useParams } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
  type: string;
  closing_type: string;
  details: string;
};

type Document = {
  id: string;
  closing_month: Date;
  period_start: Date;
  period_end: Date;
  bank_id: string;
  pdf: string;
};

export default function Movements({ params }: MovementsPageProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [documents, setDocuments] = useState<{ [key: string]: Document[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const [bankDialogOpen, setDialogBankOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const [movementDialogOpen, setDialogMovementOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedBankName, setSelectedBankName] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedClosingType, setSelectedClosingType] = useState('');
  const [selectedClosingMonth, setSelectedClosingMonth] = useState('');

  const url = new URL(window.location.href);
  const pathname = url.pathname;

  // Divide el pathname en segmentos
  const segments = pathname.split('/');

  // Filtra y une los segmentos que te interesan
  const filteredPath = `/${segments[1]}/${segments[2]}`;

  console.log(filteredPath);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const business = await fetchBusinessById(params.business_id);
        const bankAccounts = await fetchBankAccountsByBusinessId(params.business_id,);
        const lastReport = await getReportsByLastMovements(params.business_id)
        console.log(lastReport);
        

        const documentsByBankId: { [key: string]: Document[] } = {};
        for (const account of bankAccounts) {
          const documents = await fetchDocumentsByBankId(account.id);
          documentsByBankId[account.id] = documents.map((doc) => ({
            ...doc,
            closing_month: doc.closing_month,
            period_start: new Date(doc.period_start),
            period_end: new Date(doc.period_end),
          }));
        }

        setBusiness({ ...business });
        setBankAccounts([...bankAccounts]);
        setDocuments({ ...documentsByBankId });
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.business_id]);

  if (loading)
    return (
      <div>
        <SkeletonMovements />
        <SkeletonMovementsMobile />
      </div>
    );

  if (error) return <div>{error}</div>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const bank_account = formData.get('name') as string;
    const type = formData.get('type') as string;
    const closing_type = formData.get('closing_type') as string;
    const details = formData.get('details') as string;

    try {
      await addBank(
        params.business_id,
        bank_account,
        type,
        closing_type,
        details,
      );
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

  const handleUploadMovement = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = formData.get('id') as string;

    try {
      const response = await updateMovement(formData);

      if (response.error) {
        throw new Error(response.error.message); // Lanza el error para manejarlo más abajo
      }

      toast.success('Movimiento actualizado exitosamente');
      window.location.reload();

      if (formRef.current) {
        formRef.current.reset(); // Resetea el formulario
      }

      setDialogMovementOpen((prevOpen) => ({
        ...prevOpen,
        [id]: false,
      }));
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleUpdateBank = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const bank_account = formData.get('name') as string;
    const type = formData.get('type') as string;
    const closing_type = formData.get('closing_type') as string;
    const details = formData.get('details') as string;
    const id = formData.get('id') as string;

    try {
      await updateBank(id, bank_account, type, closing_type, details);
      toast.success('Banco actualizado exitosamente');
      setDialogBankOpen((prevOpen) => ({
        ...prevOpen,
        [id]: false,
      }));
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

    console.log('Uploading PDF for account:', accountId);

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

  const handleSelectBank = (name: string) => {
    setSelectedBankName(name);
  };

  const handleSelectAccount = (type: string) => {
    setSelectedAccount(type);
  };

  const handleSelectClosingType = (closing_type: string) => {
    setSelectedClosingType(closing_type);
  };

  const handleSelectClosingMonth = (closing_month: any) => {
    setSelectedClosingMonth(closing_month);
  };

  function formatDate(closing_month: any): string {
    const date = new Date(closing_month);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return date.toLocaleDateString('es-ES', options);
  }

  function formatDateForInput(date: any) {
    if (!date) return '';
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  return (
    <div className="my-10 px-4 lg:w-[95%]">
      {business && (
        <div
          className={`flex items-center justify-between max-md:justify-center ${
            filteredPath === '/admin/businesses' ? 'hidden' : ''
          }`}
        >
          <h1 className="text-2xl font-semibold text-[#003E52]">
            {business.name}
          </h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 rounded-full bg-yellow-500 p-1 px-2">
              <ClockIcon width={16} height={16} />
              pendiente
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="rounded-xl bg-[#003E52] p-2 text-white">
                    Enviar de documentos de mes para revisión
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px]">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="text-[#003E52]">Editar</DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 flex flex-col gap-10">
        {bankAccounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between gap-3 max-lg:mx-auto max-lg:w-[95%] max-lg:flex-col max-lg:justify-center max-lg:rounded-xl max-lg:bg-[#252525]/10 max-lg:py-4 lg:gap-10"
          >
            <div className="flex min-w-[200px] flex-col justify-center gap-5 rounded-xl max-lg:h-[100px] max-lg:w-[90%] lg:h-[200px] lg:bg-[#252525]/10">
              <div className="flex items-center justify-center gap-2 max-lg:mt-5">
                {account.name === 'afirme' ? (
                  <AfirmeIcon />
                ) : account.name === 'amex' ? (
                  <AmexIcon />
                ) : account.name === 'albo' ? (
                  <AlboIcon />
                ) : account.name === 'azteca' ? (
                  <AztecaIcon />
                ) : account.name === 'BanBajío' ? (
                  <BajioIcon />
                ) : account.name === 'banamex' ? (
                  <BanamexIcon />
                ) : account.name === 'banorte' ? (
                  <BanorteIcon />
                ) : account.name === 'BanRegio' ? (
                  <BanRegioIcon />
                ) : account.name === 'BBVA bancomer' ? (
                  <BbbvaIcon />
                ) : account.name === 'broxel' ? (
                  <BroxelIcon />
                ) : account.name === 'bx+' ? (
                  <BxIcon />
                ) : account.name === 'clara' ? (
                  <ClaraIcon />
                ) : account.name === 'fondeadora' ? (
                  <FondeadoraIcon />
                ) : account.name === 'hey banco' ? (
                  <HeyBancoIcon />
                ) : account.name === 'HSBC' ? (
                  <HsbcIcon />
                ) : account.name === 'inbursa' ? (
                  <IbursaIcon />
                ) : account.name === 'intercam' ? (
                  <IntercamIcon />
                ) : account.name === 'rappi' ? (
                  <RappiIcon />
                ) : account.name === 'santander' ? (
                  <SantanderIcon />
                ) : account.name === 'scotia' ? (
                  <ScotiaIcon />
                ) : account.type === 'other' ? (
                  <CurrencyDollarIcon
                    width={35}
                    height={35}
                    className="rounded-full bg-[#F4F6FC]"
                  />
                ) : (
                  <OtroBankIcon />
                )}
                <p className="text-center text-lg font-semibold capitalize">
                  {account.name}
                </p>
              </div>
              <div className="flex justify-center">
                {account.type === 'credit' ? (
                  <p className="font-bold">Crédito</p>
                ) : account.type === 'debit' ? (
                  <p className="font-bold">Débito</p>
                ) : null}
              </div>
              <div>
                <Dialog
                  open={bankDialogOpen[account.id] || false}
                  onOpenChange={(isOpen) =>
                    setDialogBankOpen((prevOpen) => ({
                      ...prevOpen,
                      [account.id]: isOpen,
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <button className="mx-auto flex items-center gap-2 rounded-xl border-2 border-[#003E52] bg-transparent px-3 py-1 text-sm font-medium text-[#003E52]">
                      <PencilSquareIcon width={16} height={16} />
                      Editar
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="mb-5">
                      <DialogTitle className="text-[#003E52]">
                        Editar {account.name}
                      </DialogTitle>
                    </DialogHeader>
                    {account.type === 'other' ? (
                      <form
                        onSubmit={handleSubmit}
                        ref={formRef}
                        className="flex flex-col gap-8"
                      >
                        <input
                          type="hidden"
                          name="business_id"
                          value={params.business_id}
                        />

                        <input
                          type="hidden"
                          name="closing_type"
                          value="monthly"
                        />
                        <input type="hidden" name="type" value="other" />

                        <div className="flex flex-col gap-8">
                          <div className="flex flex-col gap-2">
                            <label>Ingrese un tipo de origen</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="ej. efectivo, cuentas internas, export de Stripe, etc."
                              defaultValue={account.name}
                              className="w-full rounded-lg border p-2"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label>Descripción</label>
                            <textarea
                              name="details"
                              placeholder="Descripción..."
                              defaultValue={account.details}
                              className="w-full rounded-lg border p-2"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="mt-4 w-full rounded-xl bg-[#003E52]"
                        >
                          Actualizar origen
                        </Button>
                      </form>
                    ) : (
                      <form
                        onSubmit={handleUpdateBank}
                        ref={formRef}
                        className="flex flex-col gap-8"
                      >
                        <input type="hidden" name="id" value={account.id} />
                        <div className="flex flex-col gap-2">
                          <label>Selecciona un banco</label>
                          <SelectBank
                            onSelect={handleSelectBank}
                            defaultValue={account.name}
                          />
                          <input
                            type="hidden"
                            name="name"
                            defaultValue={account.name}
                            value={selectedBankName}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label>Selecciona un tipo de cuenta</label>
                          <SelectAccount
                            onSelect={handleSelectAccount}
                            defaultValue={account.type}
                          />
                          <input
                            type="hidden"
                            name="type"
                            defaultValue={account.type}
                            value={selectedAccount}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm">
                            ¿El período que contabiliza tu banco ocupa todo el
                            mes?
                          </label>
                          <SelectClosingType
                            onSelect={handleSelectClosingType}
                            defaultValue={account.closing_type}
                          />
                          <input
                            type="hidden"
                            name="closing_type"
                            value={selectedClosingType}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="mt-4 w-full rounded-xl bg-[#003E52]"
                        >
                          Actualizar banco
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="mx-auto ml-[5%] flex w-[90%] items-center max-lg:mx-auto max-lg:w-[70%]">
              <Carousel className="w-full max-lg:mt-10">
                <CarouselContent className="-ml-1">
                  <>
                    {documents[account.id]?.length > 0
                      ? documents[account.id]?.map((doc) => (
                          <CarouselItem
                            key={doc.bank_id}
                            className={`basis-1/3 pl-1 max-md:basis-1/2`}
                          >
                            <div
                              key={doc.id}
                              className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[#252525]/10 p-3 lg:h-[200px]"
                            >
                              {doc.closing_month !== null ? (
                                <div className="flex flex-col items-center gap-2 text-center font-medium">
                                  <p className="font-bold">Fecha de cierre</p>
                                  <p className="font-medium capitalize">
                                    {formatDate(doc.closing_month)}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-2 text-center font-medium">
                                  <div>
                                    <p className="font-bold">Fecha de inicio</p>
                                    {new Date(
                                      doc.period_start,
                                    ).toLocaleDateString()}
                                  </div>
                                  <div>
                                    <p className="font-bold">Fecha de cierre</p>
                                    {new Date(
                                      doc.period_end,
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center justify-center gap-2 max-xl:flex-col">
                                <Link
                                  href={doc.pdf}
                                  target="_blank"
                                  className="rounded-xl bg-[#003E52] px-3 py-1 text-center text-sm font-medium text-white"
                                >
                                  Ver resumen
                                </Link>
                                <Dialog
                                  open={movementDialogOpen[doc.id] || false}
                                  onOpenChange={(isOpen) =>
                                    setDialogMovementOpen((prevOpen) => ({
                                      ...prevOpen,
                                      [doc.id]: isOpen,
                                    }))
                                  }
                                >
                                  <DialogTrigger className="flex items-center gap-2 rounded-xl border-2 border-[#003E52] bg-transparent px-3 py-1 text-sm font-medium text-[#003E52]">
                                    Editar
                                    <PencilSquareIcon width={16} height={16} />
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader className="mb-5">
                                      <DialogTitle>
                                        Editar movimiento de {account.name}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div>
                                      <form
                                        onSubmit={handleUploadMovement}
                                        className="flex flex-col justify-between gap-4"
                                      >
                                        <input
                                          type="hidden"
                                          name="business_id"
                                          value={params.business_id}
                                        />
                                        <input
                                          type="hidden"
                                          name="id"
                                          value={doc.id}
                                        />
                                        {account.closing_type === 'monthly' ? (
                                          <div className="flex flex-col gap-2">
                                            <label>Fecha de cierre</label>
                                            <SelectClosingMonth
                                              onSelect={
                                                handleSelectClosingMonth
                                              }
                                              defaultValue={formatDate(
                                                doc.closing_month,
                                              )}
                                            />
                                            <input
                                              type="hidden"
                                              name="closing_month"
                                              value={selectedClosingMonth}
                                            />
                                          </div>
                                        ) : (
                                          <div className="flex flex-col gap-2">
                                            <label>Fecha de inicio</label>
                                            <input
                                              defaultValue={formatDateForInput(
                                                doc.period_start,
                                              )}
                                              type="date"
                                              name="period_start"
                                              className="rounded-lg bg-[#252525]/10 p-2"
                                            />

                                            <label>Fecha de cierre</label>
                                            <input
                                              type="date"
                                              name="period_end"
                                              defaultValue={formatDateForInput(
                                                doc.period_end,
                                              )}
                                              className="rounded-lg bg-[#252525]/10 p-2"
                                            />
                                          </div>
                                        )}
                                        <div className="flex flex-col gap-2">
                                          <label>Movimiento</label>
                                          <label
                                            htmlFor="pdfUpload"
                                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#252525]/10 p-2"
                                          >
                                            <Attachment />

                                            <input
                                              id="pdfUpload"
                                              type="file"
                                              name="pdf"
                                              onChange={handleFileChange}
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
                                          Actualizar archivo
                                        </Button>
                                      </form>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </CarouselItem>
                        ))
                      : null}
                    <CarouselItem className={`basis-1/3 pl-1 max-md:basis-1/2`}>
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
                          <button
                            className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-[#ec7700]/80 p-3 text-base font-medium text-white hover:bg-[#ec7700]/60 lg:h-[200px]"
                            onClick={() =>
                              setPdfDialogOpen((prevOpen) => ({
                                ...prevOpen,
                                [account.id]: true,
                              }))
                            }
                          >
                            <AddIcon />
                            Agregar <br /> movimiento
                          </button>
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
                              <input
                                type="hidden"
                                name="id"
                                value={account.id}
                              />
                              {account.closing_type === 'monthly' ? (
                                <div className="flex flex-col gap-2">
                                  <label>Fecha de cierre</label>
                                  <SelectClosingMonth
                                    onSelect={handleSelectClosingMonth}
                                  />
                                  <input
                                    type="hidden"
                                    name="closing_month"
                                    value={selectedClosingMonth}
                                  />
                                </div>
                              ) : (
                                <div className="flex flex-col gap-2">
                                  <label>Fecha de inicio</label>
                                  <input
                                    type="date"
                                    name="period_start"
                                    className="rounded-lg bg-[#252525]/10 p-2"
                                  />

                                  <label>Fecha de cierre</label>
                                  <input
                                    type="date"
                                    name="period_end"
                                    className="rounded-lg bg-[#252525]/10 p-2"
                                  />
                                </div>
                              )}
                              <div className="flex flex-col gap-2">
                                <label>Movimiento</label>
                                <label
                                  htmlFor="pdfUpload"
                                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#252525]/10 p-2"
                                >
                                  <Attachment />

                                  <input
                                    id="pdfUpload"
                                    type="file"
                                    name="pdf"
                                    // accept="application/pdf"
                                    onChange={handleFileChange}
                                    required
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
                    </CarouselItem>
                  </>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[3%]">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setDialogOpen(true)}
              className="flex h-[180px] min-w-[200px] items-center justify-center gap-2 rounded-xl bg-[#ec7700] p-2 text-lg font-medium text-white max-lg:mx-auto max-lg:h-[80px] max-lg:w-[95%]"
            >
              <AddIcon />
              Añadir origen
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            {/* <DialogHeader className="mb-5">
              <DialogTitle>Añadir banco</DialogTitle>
            </DialogHeader>
            <div>
              <form
                onSubmit={handleSubmit}
                ref={formRef}
                className="flex flex-col gap-8"
              >
                <input
                  type="hidden"
                  name="business_id"
                  value={params.business_id}
                />
                <div className="flex flex-col gap-2">
                  <label>Selecciona un banco</label>
                  <SelectBank onSelect={handleSelectBank} />
                  <input type="hidden" name="name" value={selectedBankName} />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Selecciona un tipo de cuenta</label>
                  <SelectAccount onSelect={handleSelectAccount} />
                  <input type="hidden" name="type" value={selectedAccount} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    ¿El período que contabiliza tu banco ocupa todo el mes?
                  </label>
                  <SelectClosingType onSelect={handleSelectClosingType} />
                  <input
                    type="hidden"
                    name="closing_type"
                    value={selectedClosingType}
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-4 w-full rounded-xl bg-[#003E52]"
                >
                  Guardar banco
                </Button>
              </form>
            </div> */}
            <Tabs defaultValue="banco">
              <TabsList className="mb-5 self-center">
                <TabsTrigger value="banco" className="flex items-center gap-1">
                  <BuildingLibraryIcon width={20} height={20} />
                  Banco
                </TabsTrigger>
                <TabsTrigger value="otro" className="flex items-center gap-1">
                  <CurrencyDollarIcon width={20} height={20} />
                  Otro
                </TabsTrigger>
              </TabsList>
              <TabsContent value="banco">
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="flex flex-col gap-8"
                >
                  <input
                    type="hidden"
                    name="business_id"
                    value={params.business_id}
                  />
                  <div className="flex flex-col gap-2">
                    <label>Selecciona un banco</label>
                    <SelectBank onSelect={handleSelectBank} />
                    <input type="hidden" name="name" value={selectedBankName} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Selecciona un tipo de cuenta</label>
                    <SelectAccount onSelect={handleSelectAccount} />
                    <input type="hidden" name="type" value={selectedAccount} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm">
                      ¿El período que contabiliza tu banco ocupa todo el mes?
                    </label>
                    <SelectClosingType onSelect={handleSelectClosingType} />
                    <input
                      type="hidden"
                      name="closing_type"
                      value={selectedClosingType}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-[#003E52]"
                  >
                    Guardar banco
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="otro">
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="flex flex-col gap-8"
                >
                  <input
                    type="hidden"
                    name="business_id"
                    value={params.business_id}
                  />

                  <input type="hidden" name="closing_type" value="monthly" />
                  <input type="hidden" name="type" value="other" />

                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <label>Ingrese un tipo de origen</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Efectivo..."
                        className="w-full rounded-lg border p-2"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label>Descripción</label>
                      <textarea
                        name="details"
                        placeholder="Descripción..."
                        className="w-full rounded-lg border p-2"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-[#003E52]"
                  >
                    Guardar origen
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
