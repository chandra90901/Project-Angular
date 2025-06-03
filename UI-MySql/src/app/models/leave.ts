export interface Leave {
    Id: any;
    EmployeeId: number;
    LeaveTypeId: number;
    LeaveType: String;
    FromDate: String;
    FromDateHalfDay: boolean;
    ToDate: String;
    ToDateHalfDay: String;
    Reason: String;
    Status: String;
    ApprovedBy: number;
    ApprovedReason : String;
    ApprovedDate : String;
    RejectedBy : number;
    RejectedReason : String;
    RejectedDate: string;

    
}