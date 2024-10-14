
export default function Home() {
  const posts = ['The last supper', 'Davinci', 'Mike', 'Afework']
  return (
    <div className="">
        <div>
          <h1>Recent Posts</h1>
          <div className="flex gap-3">
            {posts.map((posts) => {
              return (
                <div className="bg-white w-32 h-32 shadow-md  ">

                </div>
              )
            })}
          </div>
        </div>
    </div>
  );
}
