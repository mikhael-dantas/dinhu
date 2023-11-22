"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/uiElstar"
import { useConfig } from "@/components/uiElstar/ConfigProvider"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import DINHU1Header from "./Header"

export default function DINHU1ListPage(
  // generic params
  {
    data,
    columns,
    entityName,
    mainInfo,
    editFn,
    deleteFn,
    createFn,
    actions,
  }: {
    data: any[]
    columns: ColumnDef<any>[]
    entityName: {
      singular: string
      plural: string
    }
    editFn?: (row: any) => void
    deleteFn?: (row: any) => void
    createFn?: () => void
    actions?: {
      name: string
      fn: (row: any) => void
    }[]
    mainInfo: string
  }
) {
  const { themeColor, primaryColorLevel } = useConfig()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const [universalSearch, setUniversalSearch] = React.useState("")
  const [filteredData, setFilteredData] = React.useState<any[]>(data)

  React.useEffect(() => {
    const filtered = data.filter((row) => {
      return (
        Object.values(row).some((value) => {
          return String(value).toLowerCase().includes(universalSearch.toLowerCase())
        }) || universalSearch === ""
      )
    })

    setFilteredData(filtered)
  }, [universalSearch])

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>
      <DINHU1Header name={entityName.plural} />
      <div className={`w-full p-6 shadow-md rounded-lg`}>
        {/* header of the page */}
        {/* line of actions */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            className={`px-4 py-3 text-sm  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-90 bg-${themeColor}-${primaryColorLevel} text-white`}
            onClick={createFn}
          >
            <i className={`fa fa-plus mr-2`} />
            Criar {entityName.singular}
          </Button>
          <div className={`flex flex-col sm:flex-row items-center space-x-2`}>
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <>
                {editFn && (
                  <Button
                    variant="outline"
                    className={`px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-90 bg-${themeColor}-${primaryColorLevel} text-white`}
                    onClick={() => editFn(table.getFilteredSelectedRowModel().rows[0])}
                  >
                    <i className={`fa fa-edit mr-2`} />
                    Ver/Editar {entityName.singular}
                  </Button>
                )}
                {deleteFn && (
                  <Button
                    variant="outline"
                    className={`px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-90 bg-${themeColor}-${primaryColorLevel} text-white`}
                    onClick={() => deleteFn(table.getFilteredSelectedRowModel().rows[0])}
                  >
                    <i className={`fa fa-trash mr-2`} />
                    Excluir {entityName.singular}
                  </Button>
                )}
                {actions && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-90 bg-${themeColor}-${primaryColorLevel} text-white`}
                      >
                        <i className={`fa fa-ellipsis-v mr-2`} />
                        Outras Ações
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {actions.map((action) => (
                        <DropdownMenuItem
                          key={action.name}
                          onClick={() => action.fn(table.getFilteredSelectedRowModel().rows[0])}
                        >
                          {action.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
          </div>
        </div>
        <div className={`flex items-center py-4 mb-4`}>
          {/* <Input
            placeholder="Search"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className={`max-w-sm`}
          /> */}
          <div className={`flex items-center`}>
            <i
              className={`
            fa fa-search h-[100%] ml-1 mr-6
          `}
            />
            <Input
              placeholder="Search"
              value={universalSearch}
              onChange={(event) => {
                setUniversalSearch(event.target.value.trim())
              }}
              className={`max-w-sm`}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`ml-auto px-4 py-2 bg-${themeColor}-${primaryColorLevel} text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-${themeColor}-${primaryColorLevel} focus:ring-opacity-50`}
              >
                Campos <ChevronDown className={`ml-2 h-4 w-4`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className={`capitalize`}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className={`rounded-md border border-gray-600 dark:border-gray-200`}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className={`bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-slate-100
                `}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    // data-state={row.getIsSelected() && "selected"}
                    onClick={() => row.toggleSelected()}
                    className={`hover:opacity-90 cursor-pointer dark:text-white ${
                      row.getIsSelected()
                        ? `bg-${themeColor}-${primaryColorLevel} text-white`
                        : `
                    even:bg-slate-100 dark:even:bg-slate-700
                    `
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className={`h-24 text-center`}>
                    Sem Registros.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className={`flex items-center justify-end space-x-2 py-4`}>
          <div className={`flex-1 text-sm text-muted-foreground text-gray-600`}>
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
              <span>
                {entityName.singular} Selecionado(a):{" "}
                <strong>{table.getFilteredSelectedRowModel().rows[0].original[mainInfo]}</strong>
              </span>
            ) : (
              <span>{table.getFilteredRowModel().rows.length} registros</span>
            )}
          </div>
          <div className={`space-x-2`}>
            <Button
              variant="outline"
              className={`px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50`}
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              className={`px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50`}
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
