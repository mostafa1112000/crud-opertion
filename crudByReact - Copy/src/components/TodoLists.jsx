import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import { TodosContext } from "../contexts/TodosContext";

export default function TodoLists() {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    try {
      const storageTodos = JSON.parse(localStorage.getItem("todos"));
      if (Array.isArray(storageTodos)) {
        setTodos(storageTodos);
      }
    } catch (error) {
      console.error("Error loading todos from localStorage", error);
    }
  }, [setTodos]);

  const filterTodos = (type) => {
    switch (type) {
      case "completed":
        return todos.filter((todo) => todo.isCompleted);
      case "non-completed":
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  };

  const handleAddClick = () => {
    if (!titleInput.trim()) return;
    const newTodo = {
      id: uuidv4(),
      title: titleInput.trim(),
      description: descriptionInput.trim(),
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    setDescriptionInput("");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
        <CardContent>
          <Typography variant="h2" align="center" fontWeight="bold">
            مهامي
          </Typography>
          <Divider />

          <ToggleButtonGroup
            sx={{ direction: "ltr", mt: 3 }}
            value={displayTodosType}
            exclusive
            onChange={(event, newValue) =>
              newValue && setDisplayTodosType(newValue)
            }
            aria-label="Filter Tasks"
            color="primary"
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {filterTodos(displayTodosType).map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddClick}
                disabled={!titleInput.trim()}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
