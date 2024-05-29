import { createUser } from "@/lib/actions";


export default async function CreateUserPage() {

  return (
    <form action={createUser}
      className='flex flex-col gap-4 w-[100%]'
      >
      <input type="text" name="name" placeholder='Nombre' className='rounded-xl bg-slate-100 px-2'/>
      <input type="text" name="email" placeholder='Email' className='rounded-xl bg-slate-100 px-2'/>
      <button type="submit" className='p-3 rounded-xl bg-blue-500 text-white'>Invitar usuario a negocio</button>
    </form>
  );
}
