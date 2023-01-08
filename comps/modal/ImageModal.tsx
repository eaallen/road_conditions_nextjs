import { ClickAwayListener, Modal, Box } from "@mui/material"
import { ReactNode, useState } from "react"

export default function ImageModal(props: {
    children?: ReactNode
}) {
    const [open, setOpen] = useState(false)

    if (!open) {
        return <span onClick={() => setOpen(true)}>{props.children}</span>
    }

    return <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={() => setOpen(false)}
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                textAlign: 'center'
,            }}>
                {props.children}
            </Box>
        </Modal>
    </ClickAwayListener>
}