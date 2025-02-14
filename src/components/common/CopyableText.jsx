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
    <div className='flex items-center  gap-2'>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <span className='font-bold tracking-wider text-gray-700 break-words w-full'>
              {text.length > 12
                ? `${text.slice(0, 3)}...${text.slice(-3)}`
                : text}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
