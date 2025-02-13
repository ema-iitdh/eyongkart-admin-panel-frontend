import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { CopyIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CopyableText({ text }) {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
    });
  };

  return (
    <div className='flex items-center flex-wrap  gap-2'>
      <span className='font-bold text-muted-foreground break-words w-full'>
        {text}
      </span>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant='secondary'
              size='sm'
              onClick={handleCopyToClipboard}
            >
              <CopyIcon className='w-4 h-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
