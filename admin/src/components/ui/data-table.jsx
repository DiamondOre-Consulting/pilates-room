import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { Button } from "./button";

export const DataTable = ({ columns = [], data = [], page = 1, setPage, limit = 10 }) => {
    // Ensure data is an array
    const tableData = Array.isArray(data) ? data : [];
    console.log(tableData)
    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableHead key={column?.accessorKey || column?.id}>
                                    {column?.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns?.length} className="text-center py-4">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData?.map((row, i) => (
                                <TableRow key={i}>
                                    {columns?.map((column) => (
                                        <TableCell key={column.accessorKey || column.id}>
                                            {column?.cell
                                                ? column?.cell({ row })
                                                : row[column?.accessorKey]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={tableData.length < limit}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}; 