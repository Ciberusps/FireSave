declare module "node-wmi" {
  interface TProccess {
    Caption: string;
    CreationClassName: "Win32_Process";
    CreationDate: string;
    CSCreationClassName: "Win32_ComputerSystem";
    CSName: string;
    Description: string;
    Handle: string;
    HandleCount: number;
    KernelModeTime: number;
    Name: string;
    OSCreationClassName: "Win32_OperatingSystem";
    OSName: string;
    OtherOperationCount: number;
    OtherTransferCount: number;
    PageFaults: number;
    PageFileUsage: number;
    ParentProcessId: number;
    PeakPageFileUsage: number;
    PeakVirtualSize: number;
    PeakWorkingSetSize: number;
    Priority: number;
    PrivatePageCount: number;
    ProcessId: number;
    QuotaNonPagedPoolUsage: number;
    QuotaPagedPoolUsage: number;
    QuotaPeakNonPagedPoolUsage: number;
    QuotaPeakPagedPoolUsage: number;
    ReadOperationCount: number;
    ReadTransferCount: number;
    SessionId: number;
    ThreadCount: number;
    UserModeTime: number;
    VirtualSize: number;
    WindowsVersion: string;
    WorkingSetSize: number;
    WriteOperationCount: number;
    WriteTransferCount: number;
    MaximumWorkingSetSize?: number;
    MinimumWorkingSetSize?: number;
    CommandLine?: string;
    ExecutablePath?: string;
  }

  const wmi: WMI;

  export default wmi;
  export { TProccess };
}

interface WMI {
  Query(query: TQueryOptions): Promise<any>;
}

type TQueryOptions = {
  host?: string; // Hostname or IP of the client to get information from. Defaults to localhost.
  namespace?: string; // Namespace of the class to query. Defaults to root\CIMV2.
  class?: "Win32_Process"; // Class to be queried for information. (required)
  props?: string[]; // List of properties of the class to query for. If not set, all properties will be returned for the given class. (optional)
  username?: string; // Username to use to perform query. (optional)
  password?: string; // Password for the above username. (optional)
  where?: string | string[]; // Where clause for the query. The where clause can come in multiple different types. If you pass in a string, it will be accepted as a literal text to go in the where clause. If you pass in an array of strings, they will be And'ed together. (optional)
};
