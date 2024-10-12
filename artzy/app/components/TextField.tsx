

const TextField = ({id, title, type} : {id: string, title: string, type: string}) => {
  return (
    <div className="w-full">
        <label className="block text-gray-600" htmlFor={id}>{title}</label>
        <input name={id} className="border border-gray-300 h-10 w-full rounded-md hover:border-emerald-400 focus:ring-2 focus:outline-none focus:ring-emerald-600 p-2 " type={type} />
    </div>
  )
}

export default TextField