import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { roles } from '../shared/constant'
import { Checkbox } from 'primereact/checkbox'
import { FileUpload } from 'primereact/fileupload'
import { InputTextarea } from 'primereact/inputtextarea'
import { Category } from '../shared/types'

export const textEditor = (options: any, type = 'text', step = 1) => {
  return (
    <InputText
      type={type}
      value={options.value}
      step={step}
      onChange={e => options.editorCallback(e.target.value)}
      className="w-full"
    />
  )
}

export const dateEditor = (options: any) => {
  return (
    <Calendar
      value={new Date(options.value)}
      onChange={e => options.editorCallback(e.target.value)}
      className="w-[8rem]"
      dateFormat="yy/mm/dd"
    ></Calendar>
  )
}

export const roleSelector = (options: any) => {
  return (
    <Dropdown
      value={options.value}
      options={roles}
      onChange={e => options.editorCallback(e.value)}
      optionLabel="name"
      placeholder="Select a Role"
      optionValue="code"
    />
  )
}

export const categorySelector = (options: any, categories: Category[]) => {
  return (
    <Dropdown
      value={options.value}
      options={categories}
      onChange={e => options.editorCallback(e.target.value)}
      optionLabel="name"
      placeholder="Select a category"
      optionValue="id"
    />
  )
}

export const checkBoxEditor = (options: any) => {
  return (
    <Checkbox
      checked={options.value}
      onChange={e => options.editorCallback(e.checked)}
      trueValue={1}
      falseValue={0}
    />
  )
}

export const textAreaEditor = (options: any) => {
  return (
    <InputTextarea
      value={options.value}
      onChange={e => options.editorCallback(e.target.value)}
      className="min-w-[24rem]"
    />
  )
}

export const imageSelector = (options: any) => {
  // const url = URL.createObjectURL()
  return (
    <div className="flex space-x-2 w-48">
      <img src={options.value} alt="image" className="max-w-[4rem]" />
      <FileUpload
        id="image_file"
        name="image_file"
        onSelect={e => options.editorCallback(e.files[0])}
        mode="basic"
        accept="image/*"
        maxFileSize={1000000}
        className="rounded-md w-2"
      />
    </div>
  )
}
