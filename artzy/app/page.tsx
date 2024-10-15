import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  const posts = ['The last supper', 'Davinci', 'Mike', 'Afework']
  return (
    <div className="">
      <div className="min-h-screen flex flex-col font-poppins">
        <Header />
        <main className=" w-full flex-grow  ">
        <h1>Recent Posts</h1>
          <div className="flex gap-3">
            {posts.map((index, posts) => {
              return (
                <div key={index} className="bg-white w-32 h-32 shadow-md  ">

                </div>
              )
            })}
          </div>
        </main>
        <Footer />
      </div>

    </div>
  );
}
