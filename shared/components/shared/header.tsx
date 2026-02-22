'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { CartButton, ProfileButton, SearchInput } from './index';
import { AuthModal } from './modals/auth-modal';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart=true, className }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={35}
              height={35}
            />
            <div>
              <h1 className="text-2xl uppercase font-black">Next pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                It couldn&#39;t be tastier
              </p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="flex flex-1 mx-4">
            <SearchInput />
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
          <ProfileButton onClickSingIn={() => setOpenAuthModal(true)}/>
          {hasCart && (
            <CartButton />
          )}
        </div>
      </Container>
    </header>
  );
};
