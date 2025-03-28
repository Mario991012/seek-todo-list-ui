export enum TASK_STATUS {
    COMPLETED = "completada",
    PENDING = "por hacer",
    IN_PROGRESS = "en progreso",
}

export const TASK_COLORS = {
    [TASK_STATUS.COMPLETED]: "#D1E8E2",
    [TASK_STATUS.PENDING]: "#EDAC9",
    [TASK_STATUS.IN_PROGRESS]: "#F9E79F",
}