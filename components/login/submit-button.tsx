"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "../button";
import { ArrowRightIcon } from '@heroicons/react/20/solid';

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending} className="flex items-center justify-between bg-[#0065A1] rounded-lg px-5 py-2 text-white font-medium">
      {isPending ? pendingText : children}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}
