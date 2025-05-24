// Archivo: components/pages/HomePage.jsx
// Importa los nuevos componentes de sección
import HeroSection from '../home/HeroSection';
import TrustedCompanies from '../home/TrustedCompanies';
import ProjectPreview from '../home/ProjectPreview';
import BotsSection from '../home/BotsSection';
import CommunityStats from '../home/CommunityStats';
import ServicesSection from '../home/ServicesSection';
import ReviewsSection from '../home/ReviewsSection';
import CTACSection from '../home/CTASection';

const HomePage = ({ heroScrollY, navigateTo }) => {
  return (
    <>
      {/* Sección Hero con Parallax de Fondo y Texto - Estilo Revolut/Apple */}
      <HeroSection heroScrollY={heroScrollY} navigateTo={navigateTo} />

      {/* Sección "Trusted Companies" */}
      <TrustedCompanies />

      {/* Sección de Imagen con Animación al Scroll (Kodalogic-like) */}
      <ProjectPreview />

      {/* Sección "Nuestros Bots" (anteriormente Especialidades) */}
      <BotsSection />

      {/* Sección de Contadores */}
      <CommunityStats />

      {/* Sección de Servicios - Estilo Apple (grandes bloques de características) */}
      <ServicesSection />

      {/* Sección de Clientes/Testimonios - Más pequeña y compacta */}
      <ReviewsSection />

      {/* Sección de Llamada a la Acción (CTA) */}
      <CTACSection navigateTo={navigateTo} />
    </>
  );
};

export default HomePage;