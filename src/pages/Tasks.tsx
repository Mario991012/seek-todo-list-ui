import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TaskCard from "../components/cards/TaskCard";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import EditTaskModal from "../components/modals/EditTaskModal";
import { createTask, fetchTasks, updateTask } from "../services/task.service";
import { TASK_STATUS } from "../common/enums/task";
import { ORDER_BY } from "../common/enums/common";
import { TokenService } from "../core/services/token.service";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Import recharts components

const Tasks: React.FC = () => {
  const tokenService = new TokenService();
  const { logout, loading } = useAuth();
  const token = tokenService.getToken();
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (!loading) {
      if (token) {
        loadTasks();
      } else {
        logout();
      }
    }
  }, [token, logout]);

  const loadTasks = async () => {
    try {
      const taskData = await fetchTasks(token as string);
      setAllTasks(taskData);
      applyFiltersAndPagination(taskData);
    } catch (err) {
      setError("Error while fetching tasks");
      setOpenSnackbar(true);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const applyFiltersAndPagination = (taskList: any[]) => {
    let filteredTasks = taskList;

    if (searchQuery) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === statusFilter
      );
    }

    filteredTasks = filteredTasks.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === ORDER_BY.ASCENDING ? dateA - dateB : dateB - dateA;
    });

    const start = pageIndex * pageSize;
    const end = start + pageSize;
    setTasks(filteredTasks.slice(start, end));
  };

  useEffect(() => {
    applyFiltersAndPagination(allTasks);
  }, [searchQuery, statusFilter, sortOrder, pageIndex, pageSize, allTasks]);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      await createTask(title, description, token as string);
      setIsModalOpen(false);
      loadTasks();
    } catch (err) {
      setError("Error while creating task");
      setOpenSnackbar(true);
    }
  };

  const handleEditTask = async (
    _id: string,
    title: string,
    description: string,
    status: TASK_STATUS
  ) => {
    try {
      await updateTask(_id, title, description, status, token as string);
      setIsEditModalOpen(false);
      loadTasks();
    } catch (err) {
      setError("Error while updating task");
      setOpenSnackbar(true);
    }
  };

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(allTasks.length / pageSize);
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setPageIndex(0);
  };

  const getStatusDistribution = () => {
    const statusCount: Record<TASK_STATUS, number> = {
      [TASK_STATUS.COMPLETED]: 0,
      [TASK_STATUS.PENDING]: 0,
      [TASK_STATUS.IN_PROGRESS]: 0,
      [TASK_STATUS.DELETED]: 0,
    };

    allTasks.forEach((task) => {
      if (task.status in statusCount) {
        statusCount[task.status as TASK_STATUS] += 1;  // Type assertion
      }
    });
    return Object.keys(statusCount).map((status) => ({
      name: status,
      value: statusCount[status as keyof typeof statusCount],
    }));
  };

  if (loading || loadingTasks) return <CircularProgress />;
  return (
    <Container maxWidth={false} sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">To-Do List</Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Crear nueva tarea
          </Button>
          <Button variant="outlined" color="secondary" onClick={logout}>
            Cerrar sesion
          </Button>
        </Box>
      </Box>

      {/* Pie Chart for Task Status */}
      <Box display="flex" justifyContent="center" mb={4}>
        <PieChart width={300} height={300}>
          <Pie
            data={getStatusDistribution()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            label
          >
            <Cell key="completed" fill="#4caf50" />
            <Cell key="pending" fill="#f44336" />
            <Cell key="in_progress" fill="#ff9800" />
            <Cell key="deleted" fill="red" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mb={4}
      >
        <TextField
          fullWidth
          label="Buscar tareas"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FormControl fullWidth sx={{ minWidth: { xs: "100%", sm: 120 } }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={TASK_STATUS.COMPLETED}>Completado</MenuItem>
            <MenuItem value={TASK_STATUS.PENDING}>Pendiente</MenuItem>
            <MenuItem value={TASK_STATUS.IN_PROGRESS}>En progreso</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: { xs: "100%", sm: 150 } }}>
          <InputLabel>Ordenar por fecha</InputLabel>
          <Select
            value={sortOrder}
            label="Sort by Date"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendiente</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: { xs: "100%", sm: 100 } }}>
          <InputLabel>Tareas por página</InputLabel>
          <Select
            value={pageSize}
            label="Tasks per page"
            onChange={handlePageSizeChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {tasks.length === 0 ? (
        <Typography>Sin tareas</Typography>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard
                task={task}
                onEdit={() => openEditModal(task)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <Typography>
          Page {pageIndex + 1} of {Math.ceil(allTasks.length / pageSize)} (
          {allTasks.length} tasks total)
        </Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={pageIndex >= Math.ceil(allTasks.length / pageSize) - 1}
        >
          Next
        </Button>
      </Box>

      <CreateTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
      />

      {selectedTask && (
        <EditTaskModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={selectedTask}
          onSave={handleEditTask}
        />
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Tasks;
