import { Button } from '@/components/ui/button';

export default function BatchDeleteButton({ selectedRows, handleBatchDelete }) {
  return (
    selectedRows.length > 0 && (
      <Button variant='destructive' size='sm' onClick={handleBatchDelete}>
        Delete Selected ({selectedRows.length})
      </Button>
    )
  );
}
