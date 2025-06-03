export interface Timesheet {
    Id: any;
    EmployeeId: String;
    Date: String;
    WorkDetails: String;
    Hours: String;
    Status: String;
    Reason: string;
    CreatedBy: String,
    ApprovedBy: String;
    ApprovedReason: String;
    ApprovedDate: String;
    RejectBy: String;
    RejectDate: String;
    RejectReason: String;
}