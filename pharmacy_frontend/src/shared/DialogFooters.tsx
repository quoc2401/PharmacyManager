import { MouseEventHandler } from 'react'
import { Button } from 'primereact/button'

export const deleteDialogFooter = (
  yesAction: MouseEventHandler,
  noAction: MouseEventHandler
) => {
  return (
    <>
      <Button
        label="Yes"
        icon="pi pi-plus"
        className="rounded-md mr-2"
        onClick={yesAction}
      />
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-danger rounded-md mr-2"
        onClick={noAction}
      />
    </>
  )
}

export const newDialogFooter = (
  saveAction: MouseEventHandler,
  cancelAction: MouseEventHandler
) => {
  return (
    <>
      <Button
        label="Create"
        icon="pi pi-plus"
        className="rounded-md mr-2"
        onClick={saveAction}
      />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-danger rounded-md mr-2"
        onClick={cancelAction}
      />
    </>
  )
}
