export type ClassResponse = {
    class_id: string;
    class_name: string;
    attached_code: string;
    class_type: string;
    lecturer_name: string;
    lecturer_account_id: string;
    student_count: string;
    start_date: string;
    end_date: string;
    status: "ACTIVE" | "UPCOMING" | "COMPLETE" | undefined;
}