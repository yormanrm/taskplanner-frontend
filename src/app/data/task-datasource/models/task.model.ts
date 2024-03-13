export interface ITask {
    id: number | null;
    name: string;
    description: string;
    status: string;
    activities: IActivity[];
    dateCreated: string | null;
    dateUpdated: string | null;
    archived: boolean;
    percentage: number;
    userId: number;
}

interface IActivity {
    id: number | null;
    description: string;
    status: string;
    dateCreated: string | null;
    dateUpdated: string | null;
    taskId: number | null;
}