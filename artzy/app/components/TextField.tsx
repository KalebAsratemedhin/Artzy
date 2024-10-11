

const TextField = ({id, title, type} : {id: string, title: string, type: string}) => {
  return (
    <div>
        <label htmlFor={id}>{title}</label>
        <input type={type} />

    </div>
  )
}

export default TextField