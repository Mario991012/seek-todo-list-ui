export enum TASK_STATUS {
    COMPLETED = "completada",
    PENDING = "por hacer",
    IN_PROGRESS = "en progreso",
    DELETED = "borrado",
}

export const TASK_COLORS = {
    [TASK_STATUS.COMPLETED]: "success",
    [TASK_STATUS.PENDING]: "warning",
    [TASK_STATUS.IN_PROGRESS]: "info",
    [TASK_STATUS.DELETED]: "error",
} as const