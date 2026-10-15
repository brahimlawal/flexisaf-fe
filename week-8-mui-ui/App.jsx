import { useMemo, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const PASS_MARK = 50;

const initialStudents = [
  { id: 1, name: "Amaka", score: 78 },
  { id: 2, name: "Tunde", score: 45 },
  { id: 3, name: "Chiamaka", score: 92 },
  { id: 4, name: "Bello", score: 60 },
  { id: 5, name: "Ifeoma", score: 38 },
];

// Small reusable component: one stat card for the summary row
function StatCard({ label, value }) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [mode, setMode] = useState("light");
  const [students, setStudents] = useState(initialStudents);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  // ThemeProvider: one theme object styles every MUI component below it
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode, primary: { main: "#1565c0" } },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  const passed = students.filter((s) => s.score >= PASS_MARK).length;
  const average = students.length
    ? (students.reduce((sum, s) => sum + s.score, 0) / students.length).toFixed(1)
    : 0;

  function handleAdd(e) {
    e.preventDefault();
    const numeric = Number(score);
    if (!name.trim() || Number.isNaN(numeric) || numeric < 0 || numeric > 100) {
      setToast({ open: true, message: "Enter a name and a score between 0 and 100", severity: "error" });
      return;
    }
    setStudents((prev) => [...prev, { id: Date.now(), name: name.trim(), score: numeric }]);
    setName("");
    setScore("");
    setToast({ open: true, message: "Student added", severity: "success" });
  }

  function handleDelete(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setToast({ open: true, message: "Student removed", severity: "info" });
  }

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline resets browser defaults and applies the theme background */}
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="toggle theme"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Grid: responsive layout — 12 columns, stacks on phones */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Total students" value={students.length} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Passed" value={passed} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Average score" value={average} />
          </Grid>
        </Grid>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add a student
            </Typography>
            <form onSubmit={handleAdd}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Score (0-100)"
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  fullWidth
                />
                <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ minWidth: 120 }}>
                  Add
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell>Result</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell align="right">{s.score}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={s.score >= PASS_MARK ? "Pass" : "Fail"}
                      color={s.score >= PASS_MARK ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete" onClick={() => handleDelete(s.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity} variant="filled" onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
