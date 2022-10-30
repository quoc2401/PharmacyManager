import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

const roles = [
    {name: 'Admin', code: 'ADMIN'},
    {name: 'Employee', code: 'EMPLOYEE'}
]

export const textEditor = (options: any) => {
    return <InputText 
        type="text" value={options.value} 
        onChange={e => options.editorCallback(e.target.value) }
        className="w-32"
    />
}

export const dateEditor = (options: any) => {
    return <Calendar value={new Date(options.value)} onChange={e => 
            options.editorCallback(new Date(e.value))}
            className="w-32" dateFormat="yy/mm/dd"
        ></Calendar>
}

export const roleSelector = (options: any) => {
    return (<Dropdown value={options.value} options={roles} 
        onChange={e => options.editorCallback(e.value)}
        optionLabel="name" placeholder="Select a Role"
        optionValue='code'/>)
}