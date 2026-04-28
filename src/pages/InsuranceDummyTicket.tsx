"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DummyTicketProcess from "@/components/dummyticket/Process";

import DummyTicketInsuranceService from "@/components/dummyticket/DummyTicketInsurenceService";
import DummyHero from "@/components/dummyticket/DummyHero";
import TravelInsurancePackages from "@/components/dummyticket/TravelInsurencePackage";

const HERO_IMAGE_URL = "/dummyticket.jpg";
const HEADING_TEXT = "Travel Insurance & Dummy Ticket Services";

const DummyTicketBanner: React.FC = () => {
  const [typedHeading, setTypedHeading] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedHeading(HEADING_TEXT.slice(0, index + 1));
      index++;
      if (index >= HEADING_TEXT.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <DummyHero />
      <DummyTicketInsuranceService/>
      <TravelInsurancePackages/>
      <DummyTicketProcess/>
      <Footer />
    </>
  );
};

export default DummyTicketBanner;
