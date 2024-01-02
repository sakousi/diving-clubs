import { Person } from "./person";

export interface Monitor extends Person {
    monitorNumber?: number;
    grade?: string;
}