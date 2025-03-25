import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import TodoLists from "./components/TodoLists";
import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

const intialTodos = [
  {
    id: uuidv4(),
    title: "قرأة",
    description: "تعلم الكتابة والقراءة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الكتابة",
    description: "تعلم الكتابة والقراءة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قرأة",
    description: "تعلم الكتابة والقراءة",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(intialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#191b1f",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoLists />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
