import React, { useEffect, useState } from 'react';
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
import SkeletonMovementsMobile from '@/components/skeleton-movements-mobile';
import SkeletonMovements from '@/components/skeleton-movement';
import OtroBankIcon from '@/components/icons/OtroBankIcon';
import { CheckCircleIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { translateAccountType } from '@/lib/utils';

interface Movement {
  bank_id: number;
  closing_month: string;
  period_start: string;
  period_end: string;
  bank_accounts: {
    name: string;
    type: string;
  };
  pdf: string;
}

interface MovementsListProps {
  movements: Movement[];
  initialMonth?: number;
  selectedMonth: number;
}

const translateMonthNumber = (dateString: string | null): string => {
    if (!dateString) return '';
  
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      const month = date.getMonth();
      const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      return months[month];
    } catch (error) {
      console.error('Error al convertir la fecha:', error);
      return '';
    }
  };
  
  const MovementsList = ({ movements, selectedMonth }:MovementsListProps) => {
    const banksWithMatches = new Map<string, boolean | string>();
  
    movements.forEach((doc) => {
      const bankId = doc.bank_id.toString();
  
      const closingMonth = doc.closing_month
        ? new Date(doc.closing_month).getMonth() + 1
        : null;
      const periodStart = doc.period_start
        ? new Date(doc.period_start).getMonth() + 1
        : null;
      const periodEnd = doc.period_end
        ? new Date(doc.period_end).getMonth() + 1
        : null;
  
      const hasMatchingMonth = [closingMonth, periodStart, periodEnd].some(
        (month) => month === selectedMonth,
      );
  
      if (periodStart && periodEnd) {
        if (periodStart === selectedMonth && periodEnd === selectedMonth) {
          banksWithMatches.set(bankId, true);
        } else if (periodEnd === selectedMonth) {
          banksWithMatches.set(bankId, 'pending_with_message');
        } else {
          if (!banksWithMatches.has(bankId)) {
            banksWithMatches.set(bankId, false);
          }
        }
      } else {
        if (hasMatchingMonth) {
          banksWithMatches.set(bankId, true);
        } else {
          if (!banksWithMatches.has(bankId)) {
            banksWithMatches.set(bankId, false);
          }
        }
      }
    });

  const bankList = Array.from(banksWithMatches).map(([bankId, matchStatus]) => {
    const bankData = movements.find((doc) => doc.bank_id.toString() === bankId);
    const bankName = bankData ? bankData.bank_accounts.name : '';
    const closingMonth = bankData ? bankData.closing_month : '';
    const periodStart = bankData ? bankData.period_start : '';
    const periodEnd = bankData ? bankData.period_end : '';
    const type = bankData ? bankData.bank_accounts.type : '';
    const resume = bankData ? bankData.pdf : '';

    return (
      <li key={bankId}>
        <div
          className={`my-2 flex items-center justify-between rounded-full px-2 py-1 font-medium ${
            matchStatus === true
              ? 'bg-green-500/20'
              : matchStatus === 'pending_with_message'
              ? 'bg-[#FBD127]/20'
              : 'bg-orange-600/20'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold text-[#003E52]">
            {bankName === 'afirme' ? (
              <AfirmeIcon />
            ) : bankName === 'amex' ? (
              <AmexIcon />
            ) : bankName === 'albo' ? (
              <AlboIcon />
            ) : bankName === 'azteca' ? (
              <AztecaIcon />
            ) : bankName === 'BanBajío' ? (
              <BajioIcon />
            ) : bankName === 'banamex' ? (
              <BanamexIcon />
            ) : bankName === 'banorte' ? (
              <BanorteIcon />
            ) : bankName === 'BanRegio' ? (
              <BanRegioIcon />
            ) : bankName === 'BBVA bancomer' ? (
              <BbbvaIcon />
            ) : bankName === 'broxel' ? (
              <BroxelIcon />
            ) : bankName === 'bx+' ? (
              <BxIcon />
            ) : bankName === 'clara' ? (
              <ClaraIcon />
            ) : bankName === 'fondeadora' ? (
              <FondeadoraIcon />
            ) : bankName === 'hey banco' ? (
              <HeyBancoIcon />
            ) : bankName === 'HSBC' ? (
              <HsbcIcon />
            ) : bankName === 'inbursa' ? (
              <IbursaIcon />
            ) : bankName === 'intercam' ? (
              <IntercamIcon />
            ) : bankName === 'rappi' ? (
              <RappiIcon />
            ) : bankName === 'santander' ? (
              <SantanderIcon />
            ) : bankName === 'scotia' ? (
              <ScotiaIcon />
            ) : bankName === 'other' ? (
              <CurrencyDollarIcon width={35} height={35} className="rounded-full bg-[#F4F6FC]" />
            ) : (
              <OtroBankIcon />
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="capitalize">
                  {bankName} {matchStatus && <span> - </span>}
                </p>
                <p className="capitalize">
                  {matchStatus && translateMonthNumber(closingMonth || periodEnd)}
                  <span> - </span>
                  <span className="text-xs">{translateAccountType(type)}</span>
                </p>
              </div>
              <div>
                <Link href={resume} className="text-xs underline" target="_blank">
                  Resumen
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`rounded-full px-2 py-1 text-center text-white ${
              matchStatus === true
                ? 'bg-green-500'
                : matchStatus === 'pending_with_message'
                ? 'bg-[#fbd127e1]'
                : 'bg-orange-600'
            }`}
          >
            {matchStatus === false && (
              <div className="flex items-center gap-1">
                <ClockIcon width={20} height={20} /> pendiente
              </div>
            )}
            {matchStatus === 'pending_with_message' && (
              <div className="flex items-center gap-1">
                <ClockIcon width={20} height={20} /> falta un movimiento
              </div>
            )}
            {matchStatus === true && (
              <div className="flex items-center gap-1">
                <CheckCircleIcon width={20} height={20} /> listo
              </div>
            )}
          </div>
        </div>
      </li>
    );
  });

  return <ul>{bankList}</ul>;
};

export default MovementsList;
