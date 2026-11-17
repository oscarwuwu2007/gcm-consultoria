import { AboutUs } from "./components/AboutUs"
import { Clients } from "./components/Clients"
import { ContactPage } from "./components/ContactPage"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Intro } from "./components/Intro"
import { ScrollProgress } from "./components/ScrollProgress"
import { History } from "./components/History"
import { ServiceDetail, ServicePage } from "./components/ServicePage"
import { SERVICE_PAGES, findServiceDetail } from "./content/servicios"
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
        <main key={path} className="page-enter">
          <History />
        </main>
        <Footer />
      </>
    )
  }

  if (path === "/contacto") {
    return (
      <>
        <Intro />
        <ScrollProgress />
        <Header path={path} />
        <main key={path} className="page-enter">
          <ContactPage />
        </main>
      </>
    )
  }

  const detail = findServiceDetail(path)
  if (detail) {
    return (
      <>
        <Intro />
        <ScrollProgress />
        <Header path={path} />
        <main key={path} className="page-enter">
          <ServiceDetail data={detail.page} id={detail.id} />
        </main>
        <Footer />
      </>
    )
  }

  if (path in SERVICE_PAGES) {
    return (
      <>
        <Intro />
        <ScrollProgress />
        <Header path={path} />
        <main key={path} className="page-enter">
          <ServicePage data={SERVICE_PAGES[path]} />
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
          <Mission />
          <Vision />
          <Clients />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
