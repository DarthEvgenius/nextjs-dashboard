import { lusitana } from "@/app/ui/fonts";
import { Suspense } from 'react';
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { fetchInvoicesPages } from "@/app/lib/data";
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import Pagination from "@/app/ui/invoices/pagination";
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string,
      page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page || 1)
  const totalPages = await fetchInvoicesPages(query)

  console.log('searchParams', searchParams)
  console.log('query', query)
  console.log('currentPage', currentPage)
  console.log('totalPages', totalPages)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className={`${lusitana.className} text-2xl`}>
          Invoices
        </h2>
      </div>

      <div className="mt-4 flex items-center juxtify-between gap-2 md:mt-8">
        <Search placeholder="Search incoices..." />
        <CreateInvoice />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-content">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}