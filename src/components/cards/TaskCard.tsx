import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box, Chip } from '@mui/material';
import moment from 'moment';
import { TASK_COLORS, TASK_STATUS } from '../../common/enums/task';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: TASK_STATUS;
    createdAt: number;
  };
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { title, description, status, createdAt } = task;
  const formattedDate = moment(createdAt).format('DD MMM YYYY, h:mm a');

  return (
    <Card
      sx={{
        backgroundColor: TASK_COLORS[status],
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
        },
        padding: '16px',
        position: 'relative',
      }}
    >
      <Chip
        label={task.status}
        color={TASK_COLORS[task.status]}
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      />
      <CardContent onClick={onEdit}>
        <Box sx={{ paddingRight: '40px' }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: '600',
              color: status === TASK_STATUS.COMPLETED ? '#2E7D32' : '#9C640C',
              textTransform: 'capitalize',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created on: {formattedDate}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: '#1565C0',
              borderColor: '#1565C0',
              '&:hover': {
                backgroundColor: '#1565C0',
                color: '#fff',
              },
            }}
            onClick={onEdit}
          >
            Details
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
