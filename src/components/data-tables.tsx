import type { Student, Company } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { Building, Users } from "lucide-react";

interface DataTablesProps {
  students: Student[];
  companies: Company[];
}

export default function DataTables({ students, companies }: DataTablesProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <CardTitle>Student Dataset</CardTitle>
          </div>
          <CardDescription>
            Mock dataset of students seeking internships.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.skills}</TableCell>
                  <TableCell>
                    <Badge variant={student.category === 'GEN' ? 'secondary' : 'outline'}>{student.category}</Badge>
                  </TableCell>
                  <TableCell>{student.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building className="h-6 w-6" />
            <CardTitle>Company Dataset</CardTitle>
          </div>
          <CardDescription>
            Mock dataset of companies offering internships.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Required Skills</TableHead>
                <TableHead>Capacity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="font-medium">{company.name}</div>
                    <div className="text-sm text-muted-foreground">{company.title}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{company.req}</TableCell>
                  <TableCell className="font-medium">{company.capacity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
