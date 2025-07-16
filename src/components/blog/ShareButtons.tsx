'use client';

import { Share2, Facebook, Twitter, Linkedin, Mail, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export default function ShareButtons({ url, title, description, imageUrl }: ShareButtonsProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [canShare, setCanShare] = useState(false);
  
  useEffect(() => {
    setIsBrowser(true);
    setCanShare(typeof window !== 'undefined' && 
      typeof navigator !== 'undefined' && 
      typeof navigator.share === 'function');
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%0A%0A${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}%0A%0A`,
    pinterest: imageUrl ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(imageUrl)}&description=${encodedTitle}` : '',
  };

  const handleShare = async () => {
    if (isBrowser && canShare) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const copyToClipboard = async () => {
    if (!isBrowser) return;
    
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-600 mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        className="p-2"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
        className="p-2"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => isBrowser && window.open(shareLinks.whatsapp, '_blank')}
        className="p-2"
        title="Share on WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 fill-current" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
        className="p-2"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.telegram, '_blank')}
        className="p-2"
        title="Share on Telegram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
        </svg>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.email, '_blank')}
        className="p-2"
        title="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </Button>

      {imageUrl && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => isBrowser && window.open(shareLinks.pinterest, '_blank')}
          className="p-2"
          title="Share on Pinterest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z"/>
          </svg>
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="p-2"
        title="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </Button>

      {isBrowser && canShare && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="p-2"
          title="Share using device"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
