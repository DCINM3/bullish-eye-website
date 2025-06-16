'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Link as LinkIcon,
  Code,
  Quote,
  Undo,
  Redo
} from 'lucide-react';

interface QuillEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  placeholder?: string;
}

export default function QuillEditor({ content, onUpdate, placeholder = 'Start writing your blog content...' }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  useEffect(() => {
    const loadQuill = async () => {
      const { default: Quill } = await import('quill');

      if (editorRef.current && !quillRef.current) {
        const toolbarOptions = [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          ['clean'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }]
        ];

        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: placeholder,
          modules: {
            toolbar: toolbarOptions,
          },
        });

        // Set initial content
        if (content) {
          quillRef.current.root.innerHTML = content;
        }

        // Listen for text changes
        quillRef.current.on('text-change', () => {
          const html = quillRef.current.root.innerHTML;
          onUpdate(html);
        });
      }
    };

    loadQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // Update content when prop changes
  useEffect(() => {
    if (quillRef.current && content !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = content;
    }
  }, [content]);

  const insertImage = () => {
    if (imageUrl && quillRef.current) {
      const range = quillRef.current.getSelection();
      quillRef.current.insertEmbed(range ? range.index : 0, 'image', imageUrl);
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  const insertLink = () => {
    if (linkUrl && quillRef.current) {
      const range = quillRef.current.getSelection();
      if (range) {
        if (linkText) {
          quillRef.current.insertText(range.index, linkText);
          quillRef.current.setSelection(range.index, linkText.length);
        }
        quillRef.current.format('link', linkUrl);
      }
      setLinkUrl('');
      setLinkText('');
      setShowLinkDialog(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-t-lg border border-b-0 border-gray-200">
        <div className="flex gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowImageDialog(true)}
            className="h-8 px-2"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowLinkDialog(true)}
            className="h-8 px-2"
          >
            <LinkIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quill Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          className="min-h-[400px] bg-white"
          style={{ 
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Image Dialog */}
      {showImageDialog && (
        <Card className="p-4 border-2 border-blue-200 bg-blue-50">
          <h3 className="font-medium mb-3">Insert Image</h3>
          <div className="space-y-3">
            <Input
              type="url"
              placeholder="https://i.postimg.cc/your-image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <p className="text-sm text-gray-600">
              Upload your image to <a href="https://postimg.cc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PostImage</a> and paste the direct link here.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={insertImage}
                disabled={!imageUrl}
              >
                Insert Image
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowImageDialog(false);
                  setImageUrl('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <Card className="p-4 border-2 border-blue-200 bg-blue-50">
          <h3 className="font-medium mb-3">Insert Link</h3>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Link text (optional)"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
            <Input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={insertLink}
                disabled={!linkUrl}
              >
                Insert Link
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl('');
                  setLinkText('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <style jsx global>{`
        .ql-toolbar {
          border-top: none !important;
          border-left: 1px solid #d1d5db !important;
          border-right: 1px solid #d1d5db !important;
          border-bottom: 1px solid #d1d5db !important;
          background: white;
        }
        
        .ql-container {
          border: 1px solid #d1d5db !important;
          border-top: none !important;
          font-family: inherit;
        }
        
        .ql-editor {
          min-height: 400px;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
        }
        
        .ql-snow .ql-tooltip {
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}
