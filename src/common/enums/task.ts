export enum TASK_STATUS {
    COMPLETED = "completada",
    PENDING = "por hacer",
    IN_PROGRESS = "en progreso",
}

export const TASK_COLORS = {
    [TASK_STATUS.COMPLETED]: "success",
    [TASK_STATUS.PENDING]: "warning",
    [TASK_STATUS.IN_PROGRESS]: "info",
} as const