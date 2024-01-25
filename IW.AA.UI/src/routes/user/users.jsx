import React, { useEffect, useState } from 'react';
import { Form, Link, useLoaderData } from "react-router-dom";
import { userService } from "../../core/services";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

export async function loader() {
  const users = await userService.getAll();
  if (!users) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { users };
}

export default function User() {
  const { users } = useLoaderData();
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({});

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" size="small" outlined onClick={clearFilter} />
        <span className="p-input-icon-left ml-2 md:ml-0">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className="p-inputtext-sm" />
        </span>
      </div>
    );
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      fullName: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      role: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
      },
    });
    setGlobalFilterValue('');
  };

  const header = renderHeader();

  useEffect(() => {
    initFilters();
  }, []);

  const nameBodyTemplate = (rowData) => {
    return (
      <Link to={`/users/${rowData.userId}`}>{rowData.fullName}</Link>
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center justify-content-center">
        <Link to={`/users/${rowData.userId}/edit`} state={{ from: "users" }}>
          <Button icon="pi pi-pencil" rounded outlined />
        </Link>
      </div>
    );
  };

  return (
    <div className="grid px-4 pt-4 mx-0 md:mx-6 lg:mx-8 lg:px-8">
      <div className="col-12">
        <div className="flex align-items-center justify-content-between">
          <h2 className="text-2xl">All Users</h2>
          <Form action="create">
            <Button type="submit" size="small" icon="pi pi-plus" label="New" />
          </Form>
        </div>
        <DataTable
          value={users}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={10}
          dataKey="userId"
          filters={filters}
          filterDisplay="menu"
          emptyMessage="No users found."
          header={header}
          removableSort
          stripedRows
          size="small"
        >
          <Column field="fullName" header="Name" body={nameBodyTemplate} filter sortable filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
          <Column field="email" header="Email" filter sortable filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} />
          <Column field="role" header="Role" filter sortable filterPlaceholder="Search by role" style={{ minWidth: '12rem' }} />
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '1rem' }}></Column>
        </DataTable>
      </div>
    </div>
  )
}