import Intro from "@/components/Intro";
import { IntroProvider } from "@/components/IntroHandoff";
import Nav from "@/components/Nav";
import Opening from "@/components/Opening";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:text-paper"
      >
        Skip to content
      </a>
      <IntroProvider>
        <Intro />
        <Nav />
        <main id="main">
          <Opening />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </IntroProvider>
    </>
  );
}
