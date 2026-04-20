export type StudentStatus = 'IN' | 'OUT' | 'RETURNED';
export type RecordStatus = 'Pending' | 'Resolved' | 'Closed';

export interface Student {
  id: string;
  name: string;
  class: string;
  parentName: string;
  parentPhone: string;
  status: StudentStatus;
  avatarColor: string;
  disciplineHistoryCount: number;
}

export interface DisciplineRecord {
  id: string;
  studentId: string;
  studentName: string;
  reason: string;
  exitDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: RecordStatus;
  staffName: string;
}

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

const avatarColors = ['bg-[#0F1547]', 'bg-teal', 'bg-amber', 'bg-rose-500', 'bg-indigo-500', 'bg-emerald-500'];

export const mockStudents: Student[] = [
  { id: '1', name: 'Amara Uwimana', class: 'Year 1A', parentName: 'John Uwimana', parentPhone: '+250 788 123 456', status: 'IN', avatarColor: 'bg-[#0F1547]', disciplineHistoryCount: 2 },
  { id: '2', name: 'Jean Nshimiyimana', class: 'Year 2B', parentName: 'Mary Nshimiyimana', parentPhone: '+250 788 654 321', status: 'OUT', avatarColor: 'bg-teal', disciplineHistoryCount: 5 },
  { id: '3', name: 'Marie Hakizimana', class: 'Year 3C', parentName: 'Pierre Hakizimana', parentPhone: '+250 788 999 888', status: 'RETURNED', avatarColor: 'bg-amber', disciplineHistoryCount: 1 },
  { id: '4', name: 'Eric Bizimana', class: 'Year 1A', parentName: 'Rose Bizimana', parentPhone: '+250 788 777 666', status: 'IN', avatarColor: 'bg-rose-500', disciplineHistoryCount: 0 },
  { id: '5', name: 'Chantal Mukamana', class: 'Year 2A', parentName: 'Dev Mukamana', parentPhone: '+250 788 555 444', status: 'OUT', avatarColor: 'bg-indigo-500', disciplineHistoryCount: 3 },
];

export const mockRecords: DisciplineRecord[] = [
  { id: 'r1', studentId: '2', studentName: 'Jean Nshimiyimana', reason: 'Medical Checkup', exitDate: '2024-03-20 08:00', expectedReturnDate: '2024-03-20 17:00', status: 'Pending', staffName: 'Staff Alex' },
  { id: 'r2', studentId: '5', studentName: 'Chantal Mukamana', reason: 'Family Emergency', exitDate: '2024-03-18 10:30', expectedReturnDate: '2024-03-21 08:00', status: 'Pending', staffName: 'Staff Claire' },
  { id: 'r3', studentId: '3', studentName: 'Marie Hakizimana', reason: 'Official Representation', exitDate: '2024-03-15 07:00', expectedReturnDate: '2024-03-15 19:00', actualReturnDate: '2024-03-15 18:45', status: 'Closed', staffName: 'Staff Alex' },
];

export const mockChatMessages: ChatMessage[] = [
  { id: 'msg1', role: 'ai', content: "Welcome to the RCA Discipline Management System. I can help you track student exits, returns, and discipline history.\n\nCurrently, **2 students** are marked as OUT and require monitoring for their return.", timestamp: '2024-03-20T10:30:00Z' },
  { id: 'msg2', role: 'user', content: 'Who is currently out?', timestamp: '2024-03-20T10:31:00Z' },
  { id: 'msg3', role: 'ai', content: "Currently, the following students are OUT:\n\n1. **Jean Nshimiyimana** - Exit for Medical Checkup. Expected back today at 17:00.\n2. **Chantal Mukamana** - Exit for Family Emergency. Expected back on 2024-03-21.", timestamp: '2024-03-20T10:31:30Z' },
];
