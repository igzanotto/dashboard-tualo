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
          <DialogTitle className='my-4 xl:text-2xl'>{name}</DialogTitle>
          <DialogDescription>
            <p className='xl:text-xl text-black'>{resume}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
