import { AboutUs } from "./components/AboutUs"
import { Clients } from "./components/Clients"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Intro } from "./components/Intro"
import { ScrollProgress } from "./components/ScrollProgress"
import { History } from "./components/History"
import { LEGAL_DOCS, LegalPage } from "./components/LegalPage"
import { Mission } from "./components/Mission"
import { Vision } from "./components/Vision"
import { Years } from "./components/Years"
import { useAnchorScroll, usePath } from "./router"

function App() {
  const path = usePath()
  useAnchorScroll()

  if (path === "/historia") {
    return (
      <>
        <Intro />
      <ScrollProgress />
      <Header path={path} />
        <main>
          <History />
        </main>
        <Footer />
      </>
    )
  }

  if (path in LEGAL_DOCS) {
    return (
      <>
        <Intro />
      <ScrollProgress />
      <Header path={path} />
        <main>
          <LegalPage path={path} />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Intro />
      <ScrollProgress />
      <Header path={path} />
      <main>
        <Hero />
        <Years />
        <div className="relative z-10">
          <AboutUs />
          <Clients />
          <Mission />
          <Vision />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
