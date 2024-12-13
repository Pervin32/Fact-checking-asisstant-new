import React, { useRef } from 'react';
import Main from '@/components/Main';
import Princip from './Princip';
import About from './About';
import WhoWeAre from './WhoWeAre';
import Navbar from '@/components/Navbar';
import MaybeNavbar from '@/components/MaybeNavbar';
import Text_Input from './Text_Input';

const Home = () => {
  // Hər bir bölmə üçün referanslar yaradılır
  const prinsiplerimizRef = useRef(null);
  const aboutRef = useRef(null);
  const whoWeAreRef = useRef(null);

  // Ümumi scroll funksiyası - səhifəni düzgün bölməyə istiqamətləndirir
  const scrollToSection = (ref) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 100; // 100px-lik yuxarı boşluq əlavə edilir
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth", // Yavaşca keçid edilməsi üçün "smooth" effekti əlavə olunur
      });
    }
  };

  return (
    <div>
      {/* Navbar komponenti və bölmələrə keçid etmək üçün funksiyalar */}
      <MaybeNavbar>
        <Navbar
          onPrinsiplerimizClick={() => scrollToSection(prinsiplerimizRef)} // "Prinsiplerimiz" bölməsinə keçid
          onAboutClick={() => scrollToSection(aboutRef)} // "Haqqımızda" bölməsinə keçid
          onWhoWeAreClick={() => scrollToSection(whoWeAreRef)} // "Kimik" bölməsinə keçid
        />
      </MaybeNavbar>

      <section className="space-y-16">
        {/* Ana səhifə bölməsi */}
        <Main />

        {/* Prinsiplərimiz bölməsi */}
        <section ref={prinsiplerimizRef} id="prinsiplerimiz" className="pt-16">
          <Princip />
        </section>

        {/* Haqqımızda bölməsi */}
        <section ref={aboutRef} id="about" className="pt-16">
          <About />
        </section>

        {/* Kimik bölməsi */}
        <section ref={whoWeAreRef} id="who-we-are" className="pt-16">
          <WhoWeAre />
        </section>
      </section>
    </div>
  );
};

export default Home;
