import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
{
  /**Icons Import */
}
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TextField from "@mui/material/TextField";

import { TodosContext } from "../contexts/TodosContext";
import { useContext, useState } from "react";
{
  /*import delet Dialog */
}
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

{
  /*End import delet Dialog */
}
function Todo({ todo }) {
  const [shoeDeletDialog, setShowDeletDialog] = useState(false);
  const [shoeUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    description: todo.description,
  });

  const { todos, setTodos } = useContext(TodosContext);
  //START EVENT HANDELERS
  function handelCheckClick() {
    const updatedTodo = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }

  function handelDeletClick() {
    setShowDeletDialog(true);
  }
  function handelUpdateClick() {
    setUpdateTodo({ title: todo.title, description: todo.description });
    setShowUpdateDialog(true);
  }
  function handelDeletDialogClose() {
    setShowDeletDialog(false);
  }
  function handelUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handelDeleteConfirm() {
    const updatedTodods = todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      } else {
        return true;
      }
    });

    setTodos(updatedTodods);
    localStorage.setItem("todos", JSON.stringify(updatedTodods));
  }

  function handelUpdateConfirm() {
    const updateTodods = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updateTodo.title,
          description: updateTodo.description,
        };
      } else {
        return t;
      }
    });
    setTodos(updateTodods);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updateTodods));
  }
  //END EVENT HANDELRS

  return (
    <>
      {/**start Delet Model */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelDeletDialogClose}
        open={shoeDeletDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لايمكنك التراجع عن الحذف عند اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelDeletDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handelDeleteConfirm}>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/**End Delet Model */}

      {/**start Update Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelUpdateDialogClose}
        open={shoeUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updateTodo.description}
            onChange={(e) =>
              setUpdateTodo({ ...updateTodo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelUpdateDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handelUpdateConfirm}>
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/**End Update Dialog */}
      <Card
        className="todoCard"
        sx={{
          marginTop: "30px",
          minWidth: 275,
          background: "#283593",
          color: "#fff",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "start",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "start" }}>
                {todo.description}
              </Typography>
            </Grid>
            {/*Start Action Button  */}
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {/* cheeck Icon Button*/}
              <IconButton
                onClick={() => {
                  handelCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "#fff" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "#fff",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckOutlinedIcon />
              </IconButton>
              {/* START UPDATE BUTTON*/}
              <IconButton
                onClick={handelUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "#fff",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/*=== END UPDATE BUTTON=====*/}

              {/*START DELET BUTTON */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "#fff",
                  border: "solid #b23c17 3px",
                }}
                onClick={handelDeletClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/*END DELET BUTTON */}
            </Grid>
            {/*End Action Button  */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
