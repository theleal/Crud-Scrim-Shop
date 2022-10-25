import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogContentText';
import Axios from 'axios';

export default function FormDialog(props) {

    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category
    });

    const handleEditGame = () => {
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category
        });
            
        handleClose();
    };

    const handleDeleteGame = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
        handleClose();
    };
    
    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value
        }))
    }

    return (
            <Dialog 
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">editar</DialogTitle>
                    <DialogContent>
                   
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        Label="nome do jogo"
                        defaultValue={props.name}
                        onChange={handleChangeValues}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        Label="Categoria do jogo"
                        defaultValue={props.category}
                        onChange={handleChangeValues}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cost"
                        defaultValue={props.cost}
                        onChange={handleChangeValues}
                        Label="Preço"
                        type="text"
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteGame} color="primary">
                            Excluir
                        </Button>
                        <Button onClick={handleEditGame} color="primary">
                            Salvar
                        </Button>
                    </DialogActions>
            </Dialog>
    );
}