import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props{
    name:string,
    resume:JSX.Element
}

export default function ModalDashboard({name, resume}:Props) {
  return (
    <Dialog>
      <DialogTrigger className='underline w-[100px] text-white'>Ver más...</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='my-4'>Resumen {name}</DialogTitle>
          <DialogDescription>
            {resume}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
