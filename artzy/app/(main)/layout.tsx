import Footer from "../components/Footer"
import Header from "../components/Header"

const layout = ({children}: {children: React.ReactNode}) => {
  return (

    <div className="min-h-screen flex flex-col font-poppins">
        <Header />
        <main className=" w-full flex-grow  ">
            {children}
        </main>
        <Footer />
  </div>
  )
}

export default layout