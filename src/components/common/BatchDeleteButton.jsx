import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function BatchDeleteButton({
  selectedRows,
  handleBatchDelete,
  isLoading,
}) {
  const [open, setOpen] = useState(false);

  return (
    selectedRows.length > 0 && (
      // biome-ignore lint/complexity/noUselessFragments: <explanation>
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='destructive' size='sm'>
              {isLoading ? (
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              ) : (
                'Delete Selected'
              )}
              ({selectedRows.length})
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete{' '}
                <span className='font-bold'>{selectedRows.length}</span> items.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                variant='destructive'
                onClick={handleBatchDelete}
              >
                {isLoading ? (
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                ) : (
                  'Delete'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  );
}
