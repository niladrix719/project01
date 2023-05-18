import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Bio from '../components/Bio';
import Featured from '../components/Featured';
import Footer from '@/components/Footer';
import VerifiedExplore from '@/components/VerifiedExplore';
import Features from '@/components/Features';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Index() {
  return (
    <div className='app'>
      <Head>
        <title>Fipezo</title>
      </Head>
      <Navbar color='white' />
      <Header />
      <Categories />
      <Bio />
      <VerifiedExplore />
      <Features />
      {/* <Featured /> */}
      <Footer />
    </div>
  )
}