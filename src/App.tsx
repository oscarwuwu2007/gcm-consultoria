import { Suspense, lazy } from "react"
import { AboutUs } from "./components/AboutUs"
import { Clients } from "./components/Clients"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Intro } from "./components/Intro"
import { ScrollProgress } from "./components/ScrollProgress"
import { SERVICE_PAGES, findServiceDetail } from "./content/servicios"
import { Mission } from "./components/Mission"
import { Vision } from "./components/Vision"
import { Years } from "./components/Years"
import { useAnchorScroll, usePath } from "./router"

// Las páginas internas se descargan solo cuando alguien entra a ellas: el inicio carga menos código.
const History = lazy(() => import("./components/History").then((m) => ({ default: m.History })))
const ContactPage = lazy(() => import("./components/ContactPage").then((m) => ({ default: m.ContactPage })))
const ServicePage = lazy(() => import("./components/ServicePage").then((m) => ({ default: m.ServicePage })))
const ServiceDetail = lazy(() => import("./components/ServicePage").then((m) => ({ default: m.ServiceDetail })))

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
          <Suspense fallback={null}><History /></Suspense>
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
          <Suspense fallback={null}><ContactPage /></Suspense>
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
          <Suspense fallback={null}><ServiceDetail data={detail.page} id={detail.id} /></Suspense>
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
          <Suspense fallback={null}><ServicePage data={SERVICE_PAGES[path]} /></Suspense>
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
